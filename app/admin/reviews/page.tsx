import { getReviews } from "@/src/lib/reviews";
import { AdminReviewsClient } from "./admin-reviews-client";

export default async function AdminReviewsPage() {
  const reviews = await getReviews();
  return <AdminReviewsClient initialReviews={reviews} />;
}
