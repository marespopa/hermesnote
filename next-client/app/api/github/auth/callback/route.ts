import { NextRequest, NextResponse } from "next/server";
import {
  getGitHubAuthConfig,
  getGitHubCookieOptions,
  GITHUB_OAUTH_STATE_COOKIE,
  GITHUB_SESSION_COOKIE,
  GITHUB_SESSION_MAX_AGE_SECONDS,
  isValidOAuthState,
  sealGitHubSession,
} from "@/app/services/github-auth";

export const runtime = "nodejs";

function redirectToEditor(config: ReturnType<typeof getGitHubAuthConfig>, status: string) {
  const url = new URL("/editor", config.appUrl);
  url.searchParams.set("githubAuth", status);
  return NextResponse.redirect(url);
}

export async function GET(request: NextRequest) {
  let config: ReturnType<typeof getGitHubAuthConfig>;
  try {
    config = getGitHubAuthConfig();
  } catch {
    return NextResponse.json({ error: "GitHub authentication is unavailable." }, { status: 503 });
  }

  const response = redirectToEditor(config, "failed");
  response.cookies.delete(GITHUB_OAUTH_STATE_COOKIE);
  const oauthError = request.nextUrl.searchParams.get("error");
  const code = request.nextUrl.searchParams.get("code");
  const state = request.nextUrl.searchParams.get("state");
  if (oauthError || !code || !isValidOAuthState(request.cookies.get(GITHUB_OAUTH_STATE_COOKIE)?.value, state)) {
    return response;
  }

  try {
    const tokenResponse = await fetch("https://github.com/login/oauth/access_token", {
      method: "POST",
      headers: { Accept: "application/json", "Content-Type": "application/json" },
      body: JSON.stringify({
        client_id: config.clientId,
        client_secret: config.clientSecret,
        code,
        redirect_uri: new URL("/api/github/auth/callback", config.appUrl).toString(),
      }),
      cache: "no-store",
    });
    const tokenData = await tokenResponse.json() as { access_token?: string };
    if (!tokenResponse.ok || !tokenData.access_token) return response;

    const complete = redirectToEditor(config, "success");
    complete.cookies.delete(GITHUB_OAUTH_STATE_COOKIE);
    complete.cookies.set(
      GITHUB_SESSION_COOKIE,
      sealGitHubSession(tokenData.access_token, Date.now(), config.sessionSecret),
      getGitHubCookieOptions(GITHUB_SESSION_MAX_AGE_SECONDS),
    );
    return complete;
  } catch {
    return response;
  }
}
