import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import {
  fetchGitHub,
  getGitHubAccessToken,
  githubError,
  githubRepositoryNameSchema,
  mapGitHubFailure,
  readJson,
} from "@/app/services/github-api";

export const runtime = "nodejs";

const listQuerySchema = z.object({
  page: z.coerce.number().int().min(1).max(10_000).default(1),
  perPage: z.coerce.number().int().min(1).max(100).default(30),
}).strict();

const repositorySchema = z.object({
  id: z.number().int().positive(),
  name: githubRepositoryNameSchema,
  full_name: z.string().min(1).max(200),
  owner: z.object({ login: z.string().min(1).max(39) }),
  default_branch: z.string().min(1).max(255).nullable().optional(),
  private: z.boolean(),
}).passthrough();

const createRepositorySchema = z.object({
  name: githubRepositoryNameSchema,
}).strict();

function toRepository(repository: z.infer<typeof repositorySchema>) {
  return {
    id: repository.id,
    name: repository.name,
    fullName: repository.full_name,
    owner: repository.owner.login,
    defaultBranch: repository.default_branch ?? null,
    private: repository.private,
  };
}

export async function GET(request: NextRequest) {
  const query = listQuerySchema.safeParse(Object.fromEntries(request.nextUrl.searchParams));
  if (!query.success) return githubError(400, "Invalid repository list query.");

  const accessToken = getGitHubAccessToken(request);
  if (!accessToken) return githubError(401, "GitHub authentication is required.");

  try {
    const response = await fetchGitHub(
      accessToken,
      `/user/repos?affiliation=owner%2Ccollaborator%2Corganization_member&sort=updated&direction=desc&page=${query.data.page}&per_page=${query.data.perPage}`,
    );
    if (!response.ok) return mapGitHubFailure(response);

    const parsed = z.array(repositorySchema).safeParse(await readJson(response));
    if (!parsed.success) return githubError(502, "GitHub returned an invalid repository response.");

    return NextResponse.json({
      repositories: parsed.data.map(toRepository),
      page: query.data.page,
      hasNextPage: parsed.data.length === query.data.perPage,
    });
  } catch {
    return githubError(503, "GitHub is temporarily unavailable.");
  }
}

export async function POST(request: NextRequest) {
  const accessToken = getGitHubAccessToken(request);
  if (!accessToken) return githubError(401, "GitHub authentication is required.");

  const body = await request.json().catch(() => null);
  const parsedBody = createRepositorySchema.safeParse(body);
  if (!parsedBody.success) return githubError(400, "Invalid repository name.");

  try {
    const response = await fetchGitHub(accessToken, "/user/repos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: parsedBody.data.name, private: true }),
    });
    if (!response.ok) return mapGitHubFailure(response);

    const repository = repositorySchema.safeParse(await readJson(response));
    if (!repository.success) return githubError(502, "GitHub returned an invalid repository response.");
    return NextResponse.json({ repository: toRepository(repository.data) }, { status: 201 });
  } catch {
    return githubError(503, "GitHub is temporarily unavailable.");
  }
}
