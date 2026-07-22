import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/db/db";
import { adminSessions } from "@/db/schema";
import { ADMIN_SESSION_COOKIE, hashToken } from "@/lib/admin-auth";

export async function POST(request: Request) {
  const store = await cookies();
  const token = store.get(ADMIN_SESSION_COOKIE)?.value;
  if (token) await db.delete(adminSessions).where(eq(adminSessions.tokenHash, hashToken(token)));
  store.delete(ADMIN_SESSION_COOKIE);
  return NextResponse.redirect(new URL("/admin/login", request.url));
}

export async function GET(request: Request) {
  return POST(request);
}
