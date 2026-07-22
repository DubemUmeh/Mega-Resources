export const dynamic = "force-dynamic";

import { getApprovedReviews } from "@/lib/reviews";
import { ReviewsPageClient } from "./_components/reviews-page-client";

export default async function ReviewsPage() {
  const reviews = await getApprovedReviews();
  return <ReviewsPageClient initialReviews={reviews} />;
}
