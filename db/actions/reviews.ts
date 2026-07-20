"use server";

import { eq, desc } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "@/db/db";
import { reviews } from "@/db/schema";
import { reviewSchema } from "@/db/validation-schema";
import {
  createEmailTransporter,
  generateReviewPendingNotification,
} from "@/lib/email";
import type { ActionResult } from "@/db/action-types";

/* ------------------------------------------------------ Public: submit */
export async function createReview(input: {
  name: string;
  title?: string;
  location: string;
  services: string[];
  rating: number;
  message: string;
}): Promise<ActionResult<{ id: string }>> {
  const parsed = reviewSchema.safeParse(input);
  if (!parsed.success) {
    return {
      success: false,
      message: "Please fix the errors below.",
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    const [inserted] = await db
      .insert(reviews)
      .values({ ...parsed.data, status: "pending" })
      .returning();

    // Best-effort admin notification — doesn't block the response.
    try {
      if (process.env.BREVO_SMTP_USER && process.env.BREVO_SMTP_PASSWORD) {
        const transporter = createEmailTransporter();
        await transporter.sendMail(
          generateReviewPendingNotification(parsed.data),
        );
      }
    } catch (err) {
      console.error(
        "Review notification email failed (review was still saved):",
        err,
      );
    }

    return {
      success: true,
      message:
        "Thanks — your review has been submitted and will appear once it's approved.",
      data: { id: inserted.id },
    };
  } catch (err) {
    console.error("Review submission failed:", err);
    return {
      success: false,
      message: "Failed to submit your review. Please try again.",
      errors: {},
    };
  }
}

/* ------------------------------------------------------- Public: read */
// Also exposed via GET /api/reviews for client components that fetch()
// the way your Wishes component does. This is here for server
// components / server actions that want it directly.
export async function getApprovedReviews() {
  const rows = await db
    .select()
    .from(reviews)
    .where(eq(reviews.status, "approved"))
    .orderBy(desc(reviews.createdAt));

  return rows.map((r) => ({
    id: r.id,
    name: r.name,
    title: r.title ?? undefined,
    location: r.location,
    services: r.services,
    rating: r.rating,
    message: r.message,
    date: new Date(r.createdAt).toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    }),
    verified: r.verified,
  }));
}

/* -------------------------------------------------------- Admin only */
export async function getAllReviewsForAdmin() {
  return db.select().from(reviews).orderBy(desc(reviews.createdAt));
}

export async function updateReviewStatus(
  id: string,
  status: "pending" | "approved" | "rejected",
): Promise<ActionResult> {
  try {
    await db
      .update(reviews)
      .set({ status, verified: status === "approved" })
      .where(eq(reviews.id, id));
    // Invalidates the cached /reviews page so the *next* visit reflects
    // the change. Does not push updates to tabs already open — see note
    // on live updates if that's needed later.
    revalidatePath("/reviews");
    revalidatePath("/admin/reviews");
    return { success: true, message: `Review marked as ${status}.` };
  } catch (err) {
    console.error("Failed to update review status:", err);
    return {
      success: false,
      message: "Failed to update review status.",
      errors: {},
    };
  }
}

export async function updateReview(
  id: string,
  input: unknown,
): Promise<ActionResult> {
  const parsed = reviewSchema.safeParse(input);
  if (!parsed.success) {
    return {
      success: false,
      message: "Please fix the errors below.",
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  const raw = input as { verified?: unknown };
  const verified = typeof raw.verified === "boolean" ? raw.verified : undefined;

  try {
    await db
      .update(reviews)
      .set({
        name: parsed.data.name,
        title: parsed.data.title,
        location: parsed.data.location,
        services: parsed.data.services,
        rating: parsed.data.rating,
        message: parsed.data.message,
        ...(verified === undefined
          ? {}
          : { verified, status: verified ? "approved" : "pending" }),
      })
      .where(eq(reviews.id, id));
    revalidatePath("/reviews");
    revalidatePath("/admin/reviews");
    return { success: true, message: "Review updated." };
  } catch (err) {
    console.error("Failed to update review:", err);
    return { success: false, message: "Failed to update review.", errors: {} };
  }
}

export async function deleteReview(id: string): Promise<ActionResult> {
  try {
    await db.delete(reviews).where(eq(reviews.id, id));
    revalidatePath("/reviews");
    revalidatePath("/admin/reviews");
    return { success: true, message: "Review deleted." };
  } catch (err) {
    console.error("Failed to delete review:", err);
    return { success: false, message: "Failed to delete review.", errors: {} };
  }
}
