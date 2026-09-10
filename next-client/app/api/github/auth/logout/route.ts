import { NextResponse } from "next/server";
import { GITHUB_SESSION_COOKIE } from "@/app/services/github-auth";

export const runtime = "nodejs";

export async function POST() {
  const response = NextResponse.json({ authenticated: false });
  response.cookies.delete(GITHUB_SESSION_COOKIE);
  return response;
}
