"use client";

import * as Progress from "@radix-ui/react-progress";
import { FaStar } from "react-icons/fa";
import { Reveal, BG_GLOW } from "@/components/motion-kit";
import { Review } from "@/db/types";

function ratingBreakdown(reviews: Review[]) {
  const counts = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: reviews.filter((r) => r.rating === star).length,
  }));
  const total = reviews.length || 1;
  return counts.map((c) => ({ ...c, pct: Math.round((c.count / total) * 100) }));
}

export function ReviewsStats({ reviews }: { reviews: Review[] }) {
  const total = reviews.length;
  const avg = total ? reviews.reduce((s, r) => s + r.rating, 0) / total : 0;
  const regions = new Set(reviews.map((r) => r.location.split(",").pop()?.trim())).size;
  const breakdown = ratingBreakdown(reviews);

  const stats = [
    { value: avg.toFixed(1), label: "Average Rating" },
    { value: String(total), label: "Total Reviews" },
    { value: `${total ? 100 : 0}%`, label: "Approved Reviews" },
    { value: String(regions), label: "Regions Represented" },
  ];

  return (
    <section className="relative overflow-hidden bg-background/90 px-5 py-16 md:px-10 md:py-20">
      <div className={BG_GLOW} />
      <div className="mx-auto w-[min(100%,76rem)] grid gap-12 md:grid-cols-[1.1fr_0.9fr] md:gap-16">
        <div className="grid grid-cols-2 gap-8 md:gap-6">
          {stats.map((stat, i) => (
            <Reveal key={stat.label} delay={(i % 4) * 0.06}>
              <div className="flex flex-col gap-1 text-center md:text-left">
                <span className="font-display text-4xl font-bold tracking-tight text-foreground md:text-5xl">
                  {stat.value}
                </span>
                <span className="text-[0.85rem] uppercase tracking-[0.08em] text-muted-foreground">
                  {stat.label}
                </span>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1} className="flex flex-col gap-3">
          {breakdown.map((row) => (
            <div key={row.star} className="flex items-center gap-3">
              <span className="flex w-10 flex-none items-center gap-1 text-[0.8rem] text-muted-foreground">
                {row.star} <FaStar className="h-2.5 w-2.5 text-amber-400" />
              </span>
              <Progress.Root
                value={row.pct}
                className="relative h-2 flex-1 overflow-hidden rounded-full bg-foreground/10"
              >
                <Progress.Indicator
                  className="h-full rounded-full bg-blue-600 transition-transform duration-500 ease-out"
                  style={{ transform: `translateX(-${100 - row.pct}%)` }}
                />
              </Progress.Root>
              <span className="w-9 flex-none text-right text-[0.78rem] text-muted-foreground">
                {row.pct}%
              </span>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}