"use client";

import { useMemo, useState } from "react";
import { ReviewsHero } from "./_components/reviews-hero";
import { ReviewsMarquee } from "./_components/reviews-marquee";
import { ReviewsStats } from "./_components/review-stats";
import { ReviewsFilterGrid } from "./_components/reviews-filter-grid";
import { AddReviewDialog } from "./_components/add-review-dialog";
import { ToastProvider } from "@/components/ui/toast";
import { ReviewsCta } from "./_components/review-cta";
import { Reveal, BG_GLOW } from "@/components/motion-kit";
import { Review } from "@/db/types";
import { reviewsData } from "@/db/reviews";

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>(reviewsData as Review[]);
  const [dialogOpen, setDialogOpen] = useState(false);

  const averageRating = useMemo(() => {
    if (!reviews.length) return 0;
    return reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
  }, [reviews]);

  function handleReviewAdded(review: Review) {
    setReviews((prev) => [review, ...prev]);
  }

  return (
    <ToastProvider>
      <div className="w-full bg-background/50">
        <ReviewsHero
          averageRating={averageRating}
          totalReviews={reviews.length}
          onWriteReview={() => setDialogOpen(true)}
        />

        {/* -------------------------------------------------- FEATURED WALL */}
        <section className="relative overflow-hidden px-5 py-16 md:px-10 md:py-20">
          <div className={BG_GLOW} />
          <div className="mx-auto w-[min(100%,76rem)]">
            <Reveal className="max-w-2xl mb-10">
              <span className="text-[0.8rem] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                From Our Clients
              </span>
              <h2 className="mt-4 font-display text-[1.9rem] font-semibold leading-[1.2] tracking-tight text-foreground md:text-[2.5rem]">
                Reviews from real projects, across Ghana
              </h2>
            </Reveal>

            <ReviewsMarquee reviews={reviews} />
          </div>
        </section>

        <ReviewsStats reviews={reviews} />

        <ReviewsFilterGrid reviews={reviews} />

        <ReviewsCta onWriteReview={() => setDialogOpen(true)} />

        <AddReviewDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          onReviewAdded={handleReviewAdded}
        />
      </div>
    </ToastProvider>
  );
}