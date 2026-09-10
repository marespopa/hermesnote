import {
  createCipheriv,
  createDecipheriv,
  createHash,
  randomBytes,
  timingSafeEqual,
} from "node:crypto";

export const GITHUB_OAUTH_STATE_COOKIE = "hermes_github_oauth_state";
export const GITHUB_SESSION_COOKIE = "hermes_github_session";
export const GITHUB_SESSION_MAX_AGE_SECONDS = 8 * 60 * 60;
export const GITHUB_OAUTH_STATE_MAX_AGE_SECONDS = 10 * 60;

interface GitHubSessionPayload {
  accessToken: string;
  expiresAt: number;
}

export interface GitHubAuthConfig {
  appUrl: URL;
  clientId: string;
  clientSecret: string;
  sessionSecret: string;
}

type Environment = { readonly [key: string]: string | undefined };

export function getGitHubAuthConfig(env: Environment = process.env): GitHubAuthConfig {
  const clientId = env.GITHUB_OAUTH_CLIENT_ID;
  const clientSecret = env.GITHUB_OAUTH_CLIENT_SECRET;
  const sessionSecret = env.GITHUB_SESSION_SECRET;
  const configuredAppUrl = env.GITHUB_OAUTH_APP_URL;

  if (!clientId || !clientSecret || !sessionSecret || !configuredAppUrl) {
    throw new Error("GitHub OAuth is not configured.");
  }
  if (sessionSecret.length < 32) {
    throw new Error("GITHUB_SESSION_SECRET must be at least 32 characters.");
  }

  let appUrl: URL;
  try {
    appUrl = new URL(configuredAppUrl);
  } catch {
    throw new Error("GITHUB_OAUTH_APP_URL must be an absolute URL.");
  }
  if (appUrl.protocol !== "https:" && appUrl.hostname !== "localhost") {
    throw new Error("GITHUB_OAUTH_APP_URL must use HTTPS outside localhost.");
  }
  appUrl.pathname = "/";
  appUrl.search = "";
  appUrl.hash = "";

  return { appUrl, clientId, clientSecret, sessionSecret };
}

export function getGitHubCookieOptions(maxAge: number) {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge,
  };
}

export function createOAuthState(): string {
  return randomBytes(32).toString("base64url");
}

export function isValidOAuthState(expected: string | undefined, received: string | null): boolean {
  if (!expected || !received) return false;
  const expectedBuffer = Buffer.from(expected);
  const receivedBuffer = Buffer.from(received);
  return expectedBuffer.length === receivedBuffer.length &&
    timingSafeEqual(expectedBuffer, receivedBuffer);
}

function getEncryptionKey(secret: string): Buffer {
  return createHash("sha256").update(secret).digest();
}

function decodeBase64Url(value: string): Buffer | null {
  try {
    const decoded = Buffer.from(value, "base64url");
    return decoded.toString("base64url") === value ? decoded : null;
  } catch {
    return null;
  }
}

export function sealGitHubSession(accessToken: string, now = Date.now(), secret = process.env.GITHUB_SESSION_SECRET): string {
  if (!secret || !accessToken) throw new Error("GitHub session cannot be created.");
  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", getEncryptionKey(secret), iv);
  const payload: GitHubSessionPayload = {
    accessToken,
    expiresAt: now + GITHUB_SESSION_MAX_AGE_SECONDS * 1000,
  };
  const ciphertext = Buffer.concat([cipher.update(JSON.stringify(payload), "utf8"), cipher.final()]);
  return `v1.${iv.toString("base64url")}.${cipher.getAuthTag().toString("base64url")}.${ciphertext.toString("base64url")}`;
}

export function openGitHubSession(value: string | undefined, now = Date.now(), secret = process.env.GITHUB_SESSION_SECRET): GitHubSessionPayload | null {
  if (!secret || !value) return null;
  const [version, ivValue, tagValue, ciphertextValue, ...extra] = value.split(".");
  if (version !== "v1" || !ivValue || !tagValue || !ciphertextValue || extra.length > 0) return null;

  try {
    const iv = decodeBase64Url(ivValue);
    const tag = decodeBase64Url(tagValue);
    const ciphertext = decodeBase64Url(ciphertextValue);
    if (!iv || !tag || !ciphertext || iv.length !== 12 || tag.length !== 16) return null;

    const decipher = createDecipheriv("aes-256-gcm", getEncryptionKey(secret), iv);
    decipher.setAuthTag(tag);
    const plaintext = Buffer.concat([
      decipher.update(ciphertext),
      decipher.final(),
    ]);
    const payload = JSON.parse(plaintext.toString("utf8")) as GitHubSessionPayload;
    if (typeof payload.accessToken !== "string" || !payload.accessToken || !Number.isSafeInteger(payload.expiresAt) || payload.expiresAt <= now) {
      return null;
    }
    return payload;
  } catch {
    return null;
  }
}
