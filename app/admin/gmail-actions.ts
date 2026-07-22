"use server";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { db } from "@/db/db";
import { gmailMessageMetadata, googleOAuthTokens } from "@/db/schema";
import { requireAdmin } from "@/lib/admin-auth";
import { getGoogleConnection } from "@/lib/gmail";

export async function markHandled(messageId: string) {
  const admin = await requireAdmin();
  const existing = await db.select().from(gmailMessageMetadata).where(eq(gmailMessageMetadata.gmailMessageId, messageId)).limit(1);
  if (existing[0]) await db.update(gmailMessageMetadata).set({ handled: true, handledBy: admin.adminId, handledAt: new Date() }).where(eq(gmailMessageMetadata.gmailMessageId, messageId));
  else await db.insert(gmailMessageMetadata).values({ gmailMessageId: messageId, handled: true, handledBy: admin.adminId, handledAt: new Date() });
  revalidatePath("/admin/contact-requests");
}

export async function disconnectGoogle() {
  const admin = await requireAdmin();
  const token = await getGoogleConnection(admin.adminId);
  if (token) await db.update(googleOAuthTokens).set({ revokedAt: new Date(), updatedAt: new Date() }).where(eq(googleOAuthTokens.adminId, admin.adminId));
  revalidatePath("/admin/settings");
}
