import { NextRequest, NextResponse } from "next/server";
import { GITHUB_SESSION_COOKIE, openGitHubSession } from "@/app/services/github-auth";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const session = openGitHubSession(request.cookies.get(GITHUB_SESSION_COOKIE)?.value);
  return NextResponse.json({
    authenticated: Boolean(session),
    expiresAt: session?.expiresAt ?? null,
  });
}
