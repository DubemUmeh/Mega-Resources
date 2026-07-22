import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { eq, and } from "drizzle-orm";
import { createHash, randomBytes } from "crypto";
import { db } from "@/db/db";
import { adminSessions, authorizedAdmins } from "@/db/schema";

export const SUPER_ADMIN_EMAIL = "raphaelumeh21@gmail.com";
export const ADMIN_SESSION_COOKIE = "mega_admin_session";
export type AdminRole = "SUPER_ADMIN" | "ADMIN";

export async function getAdminSession() {
  const store = await cookies();
  const token = store.get(ADMIN_SESSION_COOKIE)?.value;
  if (!token) return null;
  const tokenHash = hashToken(token);
  const [session] = await db
    .select({
      id: adminSessions.id,
      expiresAt: adminSessions.expiresAt,
      adminId: authorizedAdmins.id,
      email: authorizedAdmins.googleEmail,
      name: authorizedAdmins.name,
      role: authorizedAdmins.role,
      active: authorizedAdmins.active,
    })
    .from(adminSessions)
    .innerJoin(authorizedAdmins, eq(adminSessions.adminId, authorizedAdmins.id))
    .where(and(eq(adminSessions.tokenHash, tokenHash), eq(authorizedAdmins.active, true)))
    .limit(1);
  if (!session || session.expiresAt.getTime() <= Date.now()) return null;
  return session;
}

export async function requireAdmin(requiredRole?: AdminRole) {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");
  if (requiredRole === "SUPER_ADMIN" && session.role !== "SUPER_ADMIN") redirect("/admin?error=forbidden");
  return session;
}

export function createSessionToken() {
  return randomBytes(32).toString("base64url");
}

export function hashToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}
