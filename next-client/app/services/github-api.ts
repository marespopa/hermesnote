import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { GITHUB_SESSION_COOKIE, openGitHubSession } from "./github-auth";

const GITHUB_API_URL = "https://api.github.com";

export const githubRepositoryNameSchema = z
  .string()
  .min(1)
  .max(100)
  .regex(/^(?!\.{1,2}$)[A-Za-z0-9_.-]+$/, "Use letters, numbers, periods, hyphens, or underscores.");

export const githubOwnerSchema = z
  .string()
  .min(1)
  .max(39)
  .regex(/^[A-Za-z0-9](?:[A-Za-z0-9-]{0,37}[A-Za-z0-9])?$/);

export function githubError(status: number, error: string) {
  return NextResponse.json({ error }, { status });
}

export function getGitHubAccessToken(request: NextRequest): string | null {
  return openGitHubSession(request.cookies.get(GITHUB_SESSION_COOKIE)?.value)?.accessToken ?? null;
}

export async function fetchGitHub(
  accessToken: string,
  path: string,
  init: RequestInit = {},
): Promise<Response> {
  return fetch(`${GITHUB_API_URL}${path}`, {
    ...init,
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${accessToken}`,
      "X-GitHub-Api-Version": "2022-11-28",
      ...init.headers,
    },
    cache: "no-store",
  });
}

export function mapGitHubFailure(response: Response) {
  if (response.status === 401) return githubError(401, "GitHub session is invalid. Please connect again.");
  if (response.status === 403) return githubError(403, "GitHub access was denied.");
  if (response.status === 404) return githubError(404, "GitHub repository was not found.");
  if (response.status === 413) return githubError(413, "GitHub vault is too large to import.");
  return githubError(502, "GitHub request failed.");
}

export async function readJson(response: Response): Promise<unknown> {
  try {
    return await response.json();
  } catch {
    return null;
  }
}
