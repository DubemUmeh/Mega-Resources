"use server";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { db } from "@/db/db";
import { authorizedAdmins, businessSettings } from "@/db/schema";
import { requireAdmin } from "@/lib/admin-auth";

export async function addAuthorizedUser(formData: FormData) {
  await requireAdmin("SUPER_ADMIN");
  const email = String(formData.get("email") || "").trim().toLowerCase();
  const name = String(formData.get("name") || "").trim();
  const role = String(formData.get("role")) === "SUPER_ADMIN" ? "SUPER_ADMIN" : "ADMIN";
  if (email && name) await db.insert(authorizedAdmins).values({ googleEmail: email, name, role }).onConflictDoNothing();
  revalidatePath("/admin/settings");
}
export async function disableAuthorizedUser(id: string) { await requireAdmin("SUPER_ADMIN"); await db.update(authorizedAdmins).set({ active: false }).where(eq(authorizedAdmins.id, id)); revalidatePath("/admin/settings"); }
export async function removeAuthorizedUser(id: string) { await requireAdmin("SUPER_ADMIN"); await db.delete(authorizedAdmins).where(eq(authorizedAdmins.id, id)); revalidatePath("/admin/settings"); }
export async function saveBusinessSettings(formData: FormData) {
  await requireAdmin();
  const values = { businessName: String(formData.get("businessName") || ""), businessEmail: String(formData.get("businessEmail") || ""), phone: String(formData.get("phone") || ""), address: String(formData.get("address") || ""), logoUrl: String(formData.get("logoUrl") || ""), updatedAt: new Date() };
  const existing = await db.select().from(businessSettings).limit(1);
  if (existing[0]) await db.update(businessSettings).set(values).where(eq(businessSettings.id, existing[0].id)); else await db.insert(businessSettings).values(values);
  revalidatePath("/admin/settings");
}
