"use client";

import { BG_GLOW, Reveal, ArrowCta } from "@/components/motion-kit";
import { StarRatingDisplay } from "./star-rating";

export function ReviewsHero({
  averageRating,
  totalReviews,
  onWriteReview,
}: {
  averageRating: number;
  totalReviews: number;
  onWriteReview: () => void;
}) {
  return (
    <section className="relative overflow-hidden px-5 pb-16 pt-32 md:px-10 md:pb-24 md:pt-40">
      <div className={BG_GLOW} />
      <div className="mx-auto w-[min(100%,76rem)]">
        <Reveal>
          <div className="inline-flex items-center gap-[0.45rem] tracking-wider rounded-full border border-neutral-200 bg-white px-[0.8rem] py-[0.45rem] text-[0.85rem] font-semibold uppercase text-neutral-600 shadow-[0_8px_20px_rgba(15,23,42,0.05)]">
            Client Reviews
          </div>
        </Reveal>

        <Reveal delay={0.08} className="mt-6 max-w-3xl">
          <h1 className="font-display text-[2.25rem] font-semibold leading-[1.1] tracking-tight text-foreground md:text-[3.5rem]">
            What it&apos;s actually like{" "}
            <span className="text-neutral-600">to work with us.</span>
          </h1>
        </Reveal>

        <Reveal delay={0.16} className="mt-6 max-w-2xl">
          <p className="text-base tracking-wider leading-[1.75] text-foreground/80">
            This page is a running record of feedback from the homes, farms,
            schools, and businesses we&apos;ve drilled for across Ghana —
            the good, and anything we could have done better. Browse what
            past clients have said, or add your own if you&apos;ve worked
            with us.
          </p>
        </Reveal>

        <Reveal delay={0.22} className="mt-8 flex flex-wrap items-center gap-5">
          <div className="flex items-center gap-3 rounded-2xl border border-neutral-200 bg-neutral-100 px-5 py-3 shadow-[0_8px_20px_rgba(15,23,42,0.05)]">
            <span className="font-display text-2xl font-bold text-neutral-900">
              {averageRating.toFixed(1)}
            </span>
            <div className="flex flex-col gap-0.5">
              <StarRatingDisplay rating={Math.round(averageRating)} />
              <span className="text-[0.75rem] text-neutral-500">
                from {totalReviews} reviews
              </span>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.28} className="mt-9 flex flex-wrap items-center gap-4">
          <ArrowCta as="button" onClick={onWriteReview} label="Write a Review" />
          <a
            href="#all-reviews"
            className="text-sm font-semibold text-foreground underline decoration-blue-600 decoration-2 underline-offset-4"
          >
            Read all reviews
          </a>
        </Reveal>
      </div>
    </section>
  );
}