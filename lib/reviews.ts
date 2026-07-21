import { avg, count, desc, eq } from "drizzle-orm";
import { db } from "@/db/db";
import { reviews } from "@/db/schema";
import type { Review } from "@/db/types";

export function formatReview(row: typeof reviews.$inferSelect): Review {
  return {
    id: row.id,
    name: row.name,
    title: row.title ?? undefined,
    location: row.location,
    services: row.services as Review["services"],
    rating: row.rating,
    message: row.message,
    date:
      row.date ??
      new Date(row.createdAt).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      }),
    status: row.status,
  };
}

export async function getReviews() {
  const rows = await db.select().from(reviews).orderBy(desc(reviews.createdAt));
  return rows.map(formatReview);
}

export async function getApprovedReviews() {
  const rows = await db
    .select()
    .from(reviews)
    .where(eq(reviews.status, "approved"))
    .orderBy(desc(reviews.createdAt));

  return rows.map(formatReview);
}

export async function getReviewById(id: string) {
  const [row] = await db
    .select()
    .from(reviews)
    .where(eq(reviews.id, id))
    .limit(1);
  return row ? formatReview(row) : null;
}

export async function getReviewStats() {
  const [stats] = await db
    .select({
      totalReviews: count(),
      averageRating: avg(reviews.rating),
    })
    .from(reviews);

  const [pending] = await db
    .select({ value: count() })
    .from(reviews)
    .where(eq(reviews.status, "pending"));

  const [approved] = await db
    .select({ value: count() })
    .from(reviews)
    .where(eq(reviews.status, "approved"));

  const [rejected] = await db
    .select({ value: count() })
    .from(reviews)
    .where(eq(reviews.status, "rejected"));

  return {
    totalReviews: stats.totalReviews,
    averageRating: Number(stats.averageRating ?? 0),
    pendingReviews: pending.value,
    approvedReviews: approved.value,
    rejectedReviews: rejected.value,
  };
}
