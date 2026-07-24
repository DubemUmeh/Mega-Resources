"use server";

import { eq, and, desc, ne, type SQL } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "@/db/db";
import { portfolioProjects } from "@/db/schema";
import { portfolioSchema } from "@/db/validation-schema";
import { generateUniqueSlug, slugify } from "@/lib/slug";
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

export async function getPublishedPortfolioBySlug(slug: string) {
  const [project] = await db
    .select()
    .from(portfolioProjects)
    .where(and(eq(portfolioProjects.slug, slug), eq(portfolioProjects.status, "published")))
    .limit(1);

  return project ?? null;
}

export async function getRelatedPortfolioProjects(project: { id: string; service: string; region: string }, limit = 3) {
  return db
    .select()
    .from(portfolioProjects)
    .where(and(eq(portfolioProjects.status, "published"), eq(portfolioProjects.service, project.service), ne(portfolioProjects.id, project.id)))
    .orderBy(desc(portfolioProjects.createdAt))
    .limit(limit);
}

async function portfolioSlugExists(slug: string, ignoreId?: string) {
  const conditions: SQL[] = [eq(portfolioProjects.slug, slug)];
  if (ignoreId) conditions.push(ne(portfolioProjects.id, ignoreId));
  const [existing] = await db.select({ id: portfolioProjects.id }).from(portfolioProjects).where(and(...conditions)).limit(1);
  return Boolean(existing);
}

async function resolvePortfolioSlug(data: { slug?: string; service?: string; location?: string; title?: string }, ignoreId?: string) {
  const requested = slugify(data.slug ?? "");
  const base = requested || [data.service, data.location, data.title].filter(Boolean).join(" ");
  return generateUniqueSlug(base, (slug) => portfolioSlugExists(slug, ignoreId));
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
      .values({
        ...parsed.data,
        slug: await resolvePortfolioSlug(parsed.data),
      })
      .returning();
    revalidatePath("/portfolio");
    revalidatePath("/sitemap.xml");
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
      .set({
        ...parsed.data,
        slug: await resolvePortfolioSlug(parsed.data, id),
      })
      .where(eq(portfolioProjects.id, id));
    revalidatePath("/portfolio");
    revalidatePath("/sitemap.xml");
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
