import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/db/db";
import { adminSessions, authorizedAdmins, googleOAuthTokens } from "@/db/schema";
import { ADMIN_SESSION_COOKIE, createSessionToken, hashToken } from "@/lib/admin-auth";
import { encryptSecret, exchangeGoogleCode, getGoogleUser } from "@/lib/google-oauth";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const store = await cookies();
  if (!code || !state || state !== store.get("google_oauth_state")?.value) return NextResponse.redirect(new URL("/admin/login?error=oauth", request.url));
  try {
    const tokens = await exchangeGoogleCode(code);
    const profile = await getGoogleUser(tokens.access_token);
    const [admin] = await db.select().from(authorizedAdmins).where(eq(authorizedAdmins.googleEmail, profile.email.toLowerCase())).limit(1);
    if (!admin || !admin.active) return NextResponse.redirect(new URL("/admin/login?error=unauthorized", request.url));
    const expiresAt = new Date(Date.now() + tokens.expires_in * 1000);
    const existing = await db.select().from(googleOAuthTokens).where(eq(googleOAuthTokens.adminId, admin.id)).limit(1);
    const tokenValues = { googleEmail: profile.email.toLowerCase(), accessToken: encryptSecret(tokens.access_token), refreshToken: tokens.refresh_token ? encryptSecret(tokens.refresh_token) : existing[0]?.refreshToken, scope: tokens.scope, expiresAt, revokedAt: null, updatedAt: new Date() };
    if (existing[0]) await db.update(googleOAuthTokens).set(tokenValues).where(eq(googleOAuthTokens.adminId, admin.id));
    else await db.insert(googleOAuthTokens).values({ adminId: admin.id, ...tokenValues });
    const sessionToken = createSessionToken();
    await db.insert(adminSessions).values({ adminId: admin.id, tokenHash: hashToken(sessionToken), expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7) });
    store.set(ADMIN_SESSION_COOKIE, sessionToken, { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", maxAge: 60 * 60 * 24 * 7, path: "/" });
    store.delete("google_oauth_state");
    return NextResponse.redirect(new URL("/admin", request.url));
  } catch {
    return NextResponse.redirect(new URL("/admin/login?error=oauth", request.url));
  }
}
