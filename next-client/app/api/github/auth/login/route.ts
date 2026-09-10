import { NextResponse } from "next/server";
import {
  createOAuthState,
  getGitHubAuthConfig,
  getGitHubCookieOptions,
  GITHUB_OAUTH_STATE_COOKIE,
  GITHUB_OAUTH_STATE_MAX_AGE_SECONDS,
} from "@/app/services/github-auth";

export const runtime = "nodejs";

export async function GET() {
  try {
    const config = getGitHubAuthConfig();
    const state = createOAuthState();
    const authorizationUrl = new URL("https://github.com/login/oauth/authorize");
    authorizationUrl.searchParams.set("client_id", config.clientId);
    authorizationUrl.searchParams.set("redirect_uri", new URL("/api/github/auth/callback", config.appUrl).toString());
    authorizationUrl.searchParams.set("state", state);
    authorizationUrl.searchParams.set("scope", "repo");

    const response = NextResponse.redirect(authorizationUrl);
    response.cookies.set(
      GITHUB_OAUTH_STATE_COOKIE,
      state,
      getGitHubCookieOptions(GITHUB_OAUTH_STATE_MAX_AGE_SECONDS),
    );
    return response;
  } catch {
    return NextResponse.json({ error: "GitHub authentication is unavailable." }, { status: 503 });
  }
}
