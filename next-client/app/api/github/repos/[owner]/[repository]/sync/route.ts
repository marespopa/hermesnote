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
const MAX_TOTAL_BYTES = 5 * 1024 * 1024;
const shaSchema = z.string().regex(/^[a-f0-9]{40}$/i);
const changeSchema = z.object({
  path: z.string().min(1).max(4096),
  content: z.string().max(MAX_BLOB_BYTES).nullable(),
});
const requestSchema = z.object({
  baseHeadSha: shaSchema.nullable(),
  message: z.string().trim().min(1).max(500),
  operationId: z.string().uuid(),
  changes: z.array(changeSchema).min(1).max(MAX_FILES),
});
const refSchema = z.object({ object: z.object({ sha: shaSchema }) }).passthrough();
const commitSchema = z.object({
  tree: z.object({ sha: shaSchema }),
  message: z.string().optional(),
}).passthrough();
const shaResponseSchema = z.object({ sha: shaSchema }).passthrough();
const contentsResponseSchema = z.object({ commit: z.object({ sha: shaSchema }) }).passthrough();

type RouteContext = { params: Promise<{ owner: string; repository: string }> };

function mapSyncFailure(response: Response, operation: string) {
  console.warn("GitHub vault sync request failed", {
    operation,
    status: response.status,
    requestId: response.headers.get("x-github-request-id"),
  });
  if (response.status === 422) {
    return githubError(422, `GitHub rejected the ${operation}. Confirm that you can write to this branch.`);
  }
  return mapGitHubFailure(response);
}

function validChanges(changes: z.infer<typeof changeSchema>[]): boolean {
  const paths = new Set<string>();
  let byteLength = 0;
  for (const change of changes) {
    try {
      if (!isGitHubVaultPathAllowed(change.path) || paths.has(change.path)) return false;
    } catch {
      return false;
    }
    paths.add(change.path);
    if (change.content !== null) byteLength += Buffer.byteLength(change.content, "utf8");
  }
  return byteLength <= MAX_TOTAL_BYTES;
}

export async function POST(request: NextRequest, context: RouteContext) {
  const params = await context.params;
  const routeParams = z.object({
    owner: githubOwnerSchema,
    repository: githubRepositoryNameSchema,
  }).safeParse(params);
  if (!routeParams.success) return githubError(400, "Invalid repository.");

  const payload = requestSchema.safeParse(await request.json().catch(() => null));
  if (!payload.success || !validChanges(payload.data.changes)) {
    return githubError(400, "Invalid sync request.");
  }

  const accessToken = getGitHubAccessToken(request);
  if (!accessToken) return githubError(401, "GitHub authentication is required.");

  const { owner, repository } = routeParams.data;
  const repositoryPath = `/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repository)}`;
  const branch = request.nextUrl.searchParams.get("branch");
  if (!branch || branch.length > 255 || branch.includes("\0")) return githubError(400, "Invalid branch.");
  const refPath = `${repositoryPath}/git/ref/heads/${encodeURIComponent(branch)}`;

  try {
    const refResponse = await fetchGitHub(accessToken, refPath);
    let branchExists = refResponse.ok;
    // GitHub reports an empty newly-created repository as 409 because its
    // default branch has no ref yet. It becomes a real branch after this
    // route creates the initial commit and ref below.
    if (!branchExists && refResponse.status !== 404 && refResponse.status !== 409) {
      return mapSyncFailure(refResponse, "branch lookup");
    }
    if (branchExists) {
      const ref = refSchema.safeParse(await readJson(refResponse));
      if (!ref.success) return githubError(502, "GitHub returned an invalid branch response.");
      if (ref.data.object.sha !== payload.data.baseHeadSha) {
        const headCommitResponse = await fetchGitHub(accessToken, `${repositoryPath}/git/commits/${ref.data.object.sha}`);
        if (!headCommitResponse.ok) return mapSyncFailure(headCommitResponse, "commit lookup");
        const headCommit = commitSchema.safeParse(await readJson(headCommitResponse));
        if (!headCommit.success) return githubError(502, "GitHub returned an invalid commit response.");
        if (headCommit.data.message?.includes(`Hermes-Sync-Operation: ${payload.data.operationId}`)) {
          return NextResponse.json({ headSha: ref.data.object.sha, reconciled: true });
        }
        return githubError(409, "This branch changed remotely. Reopen the vault before committing.");
      }
    } else if (payload.data.baseHeadSha !== null) {
      return githubError(409, "This branch changed remotely. Reopen the vault before committing.");
    }

    let baseHeadSha = payload.data.baseHeadSha;
    let changes = payload.data.changes;
    if (!branchExists) {
      const initialChange = changes.find((change) => change.content !== null);
      if (!initialChange?.content) {
        return githubError(400, "An empty repository needs a file before it can be initialized.");
      }
      const encodedPath = initialChange.path.split("/").map(encodeURIComponent).join("/");
      const initialResponse = await fetchGitHub(accessToken, `${repositoryPath}/contents/${encodedPath}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: "Initialize GitHub vault",
          content: Buffer.from(initialChange.content, "utf8").toString("base64"),
          branch,
        }),
      });
      if (!initialResponse.ok) return mapSyncFailure(initialResponse, "repository initialization");
      const initial = contentsResponseSchema.safeParse(await readJson(initialResponse));
      if (!initial.success) return githubError(502, "GitHub returned an invalid initialization response.");

      baseHeadSha = initial.data.commit.sha;
      branchExists = true;
      changes = changes.filter((change) => change.path !== initialChange.path);
      if (changes.length === 0) {
        return NextResponse.json({
          headSha: baseHeadSha,
          changes: [{ path: initialChange.path, blobSha: null }],
        });
      }
    }

    let baseTree: string | undefined;
    if (branchExists && baseHeadSha) {
      const commitResponse = await fetchGitHub(accessToken, `${repositoryPath}/git/commits/${baseHeadSha}`);
      if (!commitResponse.ok) return mapSyncFailure(commitResponse, "commit lookup");
      const commit = commitSchema.safeParse(await readJson(commitResponse));
      if (!commit.success) return githubError(502, "GitHub returned an invalid commit response.");
      baseTree = commit.data.tree.sha;
    }

    const writtenChanges: { path: string; blobSha: string | null }[] = [];
    const treeEntries = [];
    for (const change of changes) {
      if (change.content === null) {
        treeEntries.push({ path: change.path, mode: "100644", type: "blob", sha: null });
        writtenChanges.push({ path: change.path, blobSha: null });
        continue;
      }
      const blobResponse = await fetchGitHub(accessToken, `${repositoryPath}/git/blobs`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: change.content, encoding: "utf-8" }),
      });
      if (!blobResponse.ok) return mapSyncFailure(blobResponse, "blob upload");
      const blob = shaResponseSchema.safeParse(await readJson(blobResponse));
      if (!blob.success) return githubError(502, "GitHub returned an invalid blob response.");
      treeEntries.push({ path: change.path, mode: "100644", type: "blob", sha: blob.data.sha });
      writtenChanges.push({ path: change.path, blobSha: blob.data.sha });
    }

    const treeResponse = await fetchGitHub(accessToken, `${repositoryPath}/git/trees`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...(baseTree ? { base_tree: baseTree } : {}), tree: treeEntries }),
    });
    if (!treeResponse.ok) return mapSyncFailure(treeResponse, "tree creation");
    const tree = shaResponseSchema.safeParse(await readJson(treeResponse));
    if (!tree.success) return githubError(502, "GitHub returned an invalid tree response.");

    const commitResponse = await fetchGitHub(accessToken, `${repositoryPath}/git/commits`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: `${payload.data.message}\n\nHermes-Sync-Operation: ${payload.data.operationId}`,
        tree: tree.data.sha,
        ...(baseHeadSha ? { parents: [baseHeadSha] } : {}),
      }),
    });
    if (!commitResponse.ok) return mapSyncFailure(commitResponse, "commit creation");
    const commit = shaResponseSchema.safeParse(await readJson(commitResponse));
    if (!commit.success) return githubError(502, "GitHub returned an invalid commit response.");

    const updateResponse = branchExists
      ? await fetchGitHub(accessToken, refPath, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sha: commit.data.sha, force: false }),
      })
      : await fetchGitHub(accessToken, `${repositoryPath}/git/refs`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ref: `refs/heads/${branch}`, sha: commit.data.sha }),
      });
    if (updateResponse.status === 409 || updateResponse.status === 422) {
      return githubError(409, "This branch changed remotely. Reopen the vault before committing.");
    }
    if (!updateResponse.ok) return mapSyncFailure(updateResponse, "branch update");

    return NextResponse.json({ headSha: commit.data.sha, changes: writtenChanges });
  } catch {
    return githubError(503, "GitHub is temporarily unavailable.");
  }
}
