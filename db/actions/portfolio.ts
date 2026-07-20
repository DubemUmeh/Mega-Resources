"use server";

import { eq, and, desc, type SQL } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "@/db/db";
import { portfolioProjects } from "@/db/schema";
import { portfolioSchema } from "@/db/validation-schema";
import type { ActionResult } from "@/db/action-types";

/* ------------------------------------------------------- Public: read */
// Also exposed via GET /api/portfolio for the public filter grid.
export async function getPublishedPortfolio(filters?: {
  region?: string;
  service?: string;
}) {
  const conditions: SQL[] = [eq(portfolioProjects.status, "published")];
  if (filters?.region && filters.region !== "all") {
    conditions.push(eq(portfolioProjects.region, filters.region));
  }
  if (filters?.service && filters.service !== "all") {
    conditions.push(eq(portfolioProjects.service, filters.service));
  }

  return db
    .select()
    .from(portfolioProjects)
    .where(and(...conditions))
    .orderBy(desc(portfolioProjects.createdAt));
}

/* -------------------------------------------------------- Admin only */
export async function getAllPortfolioForAdmin() {
  return db
    .select()
    .from(portfolioProjects)
    .orderBy(desc(portfolioProjects.createdAt));
}

export async function createPortfolioProject(
  input: unknown,
): Promise<ActionResult<{ id: string }>> {
  const parsed = portfolioSchema.safeParse(input);
  if (!parsed.success) {
    return {
      success: false,
      message: "Please fix the errors below.",
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    const [inserted] = await db
      .insert(portfolioProjects)
      .values(parsed.data)
      .returning();
    revalidatePath("/portfolio");
    revalidatePath("/admin/portfolio");
    return {
      success: true,
      message: "Project created.",
      data: { id: inserted.id },
    };
  } catch (err) {
    console.error("Failed to create portfolio project:", err);
    return {
      success: false,
      message: "Failed to create project. Please try again.",
      errors: {},
    };
  }
}

export async function updatePortfolioProject(
  id: string,
  input: unknown,
): Promise<ActionResult> {
  const parsed = portfolioSchema.partial().safeParse(input);
  if (!parsed.success) {
    return {
      success: false,
      message: "Please fix the errors below.",
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    await db
      .update(portfolioProjects)
      .set(parsed.data)
      .where(eq(portfolioProjects.id, id));
    revalidatePath("/portfolio");
    revalidatePath("/admin/portfolio");
    return { success: true, message: "Project updated." };
  } catch (err) {
    console.error("Failed to update portfolio project:", err);
    return {
      success: false,
      message: "Failed to update project. Please try again.",
      errors: {},
    };
  }
}

export async function deletePortfolioProject(
  id: string,
): Promise<ActionResult> {
  try {
    await db.delete(portfolioProjects).where(eq(portfolioProjects.id, id));
    revalidatePath("/portfolio");
    revalidatePath("/admin/portfolio");
    return { success: true, message: "Project deleted." };
  } catch (err) {
    console.error("Failed to delete portfolio project:", err);
    return { success: false, message: "Failed to delete project.", errors: {} };
  }
}
