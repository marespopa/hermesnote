import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import {
  fetchGitHub,
  getGitHubAccessToken,
  githubError,
  githubOwnerSchema,
  githubRepositoryNameSchema,
  mapGitHubFailure,
  readJson,
} from "@/app/services/github-api";
import { isGitHubVaultPathAllowed } from "@/app/services/github-vault-workspace";

export const runtime = "nodejs";

const MAX_FILES = 250;
const MAX_BLOB_BYTES = 1024 * 1024;
const shaSchema = z.string().regex(/^[a-f0-9]{40}$/i);
const repositorySchema = z.object({
  id: z.number().int().positive(),
  name: githubRepositoryNameSchema,
  owner: z.object({ login: githubOwnerSchema }),
  default_branch: z.string().min(1).max(255),
}).passthrough();
const refSchema = z.object({ object: z.object({ sha: shaSchema }) }).passthrough();
const treeSchema = z.object({
  truncated: z.boolean().optional(),
  tree: z.array(z.object({
    path: z.string().min(1).max(4096),
    type: z.string(),
    sha: shaSchema,
  }).passthrough()),
}).passthrough();
const blobSchema = z.object({
  encoding: z.literal("base64"),
  content: z.string(),
  size: z.number().int().min(0).max(MAX_BLOB_BYTES),
}).passthrough();
const querySchema = z.object({
  branch: z.string().min(1).max(255).optional(),
  ref: shaSchema.optional(),
}).strict();

type RouteContext = { params: Promise<{ owner: string; repository: string }> };

function isAllowedPath(path: string) {
  try {
    return isGitHubVaultPathAllowed(path);
  } catch {
    return false;
  }
}

function decodeBlob(content: string): string | null {
  try {
    const bytes = Buffer.from(content.replace(/\s/g, ""), "base64");
    if (bytes.length > MAX_BLOB_BYTES) return null;
    return new TextDecoder("utf-8", { fatal: true }).decode(bytes);
  } catch {
    return null;
  }
}

export async function GET(request: NextRequest, context: RouteContext) {
  const params = await context.params;
  const routeParams = z.object({
    owner: githubOwnerSchema,
    repository: githubRepositoryNameSchema,
  }).safeParse(params);
  if (!routeParams.success) return githubError(400, "Invalid repository.");
  const query = querySchema.safeParse(Object.fromEntries(request.nextUrl.searchParams));
  if (!query.success) return githubError(400, "Invalid GitHub tree query.");

  const accessToken = getGitHubAccessToken(request);
  if (!accessToken) return githubError(401, "GitHub authentication is required.");

  const { owner, repository } = routeParams.data;
  const repositoryPath = `/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repository)}`;
  try {
    const repoResponse = await fetchGitHub(accessToken, repositoryPath);
    if (!repoResponse.ok) return mapGitHubFailure(repoResponse);
    const repo = repositorySchema.safeParse(await readJson(repoResponse));
    if (!repo.success) return githubError(502, "GitHub returned an invalid repository response.");

    const branch = query.data.branch ?? repo.data.default_branch;
    const refResponse = await fetchGitHub(accessToken, query.data.ref
      ? `${repositoryPath}/git/commits/${query.data.ref}`
      : `${repositoryPath}/git/ref/heads/${encodeURIComponent(branch)}`);
    // Empty repositories have a default branch but no ref/tree yet.
    if (!query.data.ref && (refResponse.status === 404 || refResponse.status === 409)) {
      return NextResponse.json({
        repository: {
          repositoryId: repo.data.id,
          owner: repo.data.owner.login,
          repository: repo.data.name,
          branch,
          displayName: repo.data.name,
          baseHeadSha: null,
        },
        files: [],
      });
    }
    if (!refResponse.ok) return mapGitHubFailure(refResponse);
    let headSha: string;
    if (query.data.ref) {
      if (!refResponse.ok) return mapGitHubFailure(refResponse);
      headSha = query.data.ref;
    } else {
      const ref = refSchema.safeParse(await readJson(refResponse));
      if (!ref.success) return githubError(502, "GitHub returned an invalid branch response.");
      headSha = ref.data.object.sha;
    }

    const treeResponse = await fetchGitHub(accessToken, `${repositoryPath}/git/trees/${headSha}?recursive=1`);
    if (!treeResponse.ok) return mapGitHubFailure(treeResponse);
    const tree = treeSchema.safeParse(await readJson(treeResponse));
    if (!tree.success) return githubError(502, "GitHub returned an invalid tree response.");
    if (tree.data.truncated) return githubError(413, "GitHub vault is too large to import.");

    const blobs = tree.data.tree.filter((entry) => entry.type === "blob" && isAllowedPath(entry.path));
    if (blobs.length > MAX_FILES) return githubError(413, "GitHub vault is too large to import.");

    const files = [];
    for (const blob of blobs) {
      const blobResponse = await fetchGitHub(accessToken, `${repositoryPath}/git/blobs/${blob.sha}`);
      if (!blobResponse.ok) return mapGitHubFailure(blobResponse);
      const parsedBlob = blobSchema.safeParse(await readJson(blobResponse));
      if (!parsedBlob.success) return githubError(502, "GitHub returned an invalid file response.");
      const content = decodeBlob(parsedBlob.data.content);
      if (content === null) return githubError(413, "GitHub vault is too large to import.");
      files.push({ path: blob.path, content, blobSha: blob.sha });
    }

    return NextResponse.json({
      repository: {
        repositoryId: repo.data.id,
        owner: repo.data.owner.login,
        repository: repo.data.name,
        branch,
        displayName: repo.data.name,
        baseHeadSha: headSha,
      },
      files,
    });
  } catch {
    return githubError(503, "GitHub is temporarily unavailable.");
  }
}
