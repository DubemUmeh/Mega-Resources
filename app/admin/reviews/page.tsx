import { getAllReviewsForAdmin } from "@/db/actions/reviews";
import { AdminReviewsClient } from "./admin-reviews-client";

export default async function AdminReviewsPage() {
  const reviews = await getAllReviewsForAdmin();
  return <AdminReviewsClient initialReviews={reviews} />;
}
