import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { randomBytes } from "crypto";
import { buildGoogleAuthUrl } from "@/lib/google-oauth";

export async function GET() {
  const state = randomBytes(24).toString("base64url");
  const store = await cookies();
  store.set("google_oauth_state", state, { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", maxAge: 600, path: "/" });
  return NextResponse.redirect(buildGoogleAuthUrl(state));
}
