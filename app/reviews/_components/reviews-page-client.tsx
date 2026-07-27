"use client";

import { useMemo, useState } from "react";
import { ReviewsHero } from "./reviews-hero";
import { ReviewsMarquee } from "./reviews-marquee";
import { ReviewsStats } from "./review-stats";
import { ReviewsFilterGrid } from "./reviews-filter-grid";
import { AddReviewDialog } from "./add-review-dialog";
import { ToastProvider } from "@/components/ui/toast";
import { ReviewsCta } from "./review-cta";
import { Reveal, BG_GLOW } from "@/components/motion-kit";
import { Review } from "@/db/types";

export function ReviewsPageClient({ initialReviews }: { initialReviews: Review[] }) {
  const reviews = initialReviews;
  const [dialogOpen, setDialogOpen] = useState(false);

  const averageRating = useMemo(() => {
    if (!reviews.length) return 0;
    return reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
  }, [reviews]);

  return (
    <ToastProvider>
      <div className="w-full bg-linear-to-b from-foreground/10 via-foreground/50 to-foreground/25">
        <ReviewsHero
          averageRating={averageRating}
          totalReviews={reviews.length}
          onWriteReview={() => setDialogOpen(true)}
        />

        {/* -------------------------------------------------- FEATURED WALL */}
        <section className="relative overflow-hidden bg-background/30 px-5 py-16 md:px-10 md:py-20">
          <div className={BG_GLOW} />
          <div className="mx-auto w-[min(100%,76rem)]">
            <Reveal className="max-w-2xl mb-10">
              <span className="text-base font-semibold uppercase tracking-[0.12em] text-popover">
                From Our Clients
              </span>
              <h2 className="mt-4 font-display text-[1.9rem] font-semibold leading-[1.2] tracking-tight text-neutral-900 md:text-[2.5rem]">
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
        />
      </div>
    </ToastProvider>
  );
}