import { getReviewStats } from "@/src/lib/reviews";
import { AdminOverviewClient } from "./admin-overview-client";

export default async function AdminOverviewPage() {
  const { totalReviews, averageRating, pendingReviews } = await getReviewStats();

  return (
    <AdminOverviewClient
      totalReviews={totalReviews}
      avgRating={averageRating}
      pendingReviews={pendingReviews}
    />
  );
}
