"use client";

import { useState } from "react";
import { ReviewCard } from "./review-card";
import { Review } from "@/db/types";

function Column({
  reviews,
  direction,
  columnKey,
}: {
  reviews: Review[];
  direction: "up" | "down";
  columnKey: string;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const duration = Math.max((reviews.length / 2) * 10, 30);
  const animationName = direction === "up" ? "scroll-up-desktop" : "scroll-down-desktop";

  return (
    <div
      className="space-y-6 overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="space-y-6"
        style={{
          animationName,
          animationDuration: `${duration}s`,
          animationTimingFunction: "linear",
          animationIterationCount: "infinite",
          animationPlayState: isHovered ? "paused" : "running",
        }}
      >
        {reviews.map((review, index) => (
          <ReviewCard key={`${columnKey}-${review.id}-${index}`} review={review} />
        ))}
      </div>
    </div>
  );
}

export function ReviewsMarquee({ reviews }: { reviews: Review[] }) {
  const [isPaused, setIsPaused] = useState(false);

  const reversed = [...reviews].reverse();
  const allNormal = [...reviews, ...reviews];
  const allReversed = [...reversed, ...reversed];
  const mobileDuration = Math.max(reviews.length * 10, 30);

  return (
    <>
      {/* Mobile — single column */}
      <div className="md:hidden relative h-140 overflow-hidden rounded-[1.5rem]">
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-16 bg-linear-to-b from-background to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-16 bg-linear-to-t from-background to-transparent" />
        <div
          className="space-y-4"
          style={{
            animationName: "scroll-up-mobile",
            animationDuration: `${mobileDuration}s`,
            animationTimingFunction: "linear",
            animationIterationCount: "infinite",
            animationPlayState: isPaused ? "paused" : "running",
          }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {allNormal.map((review, index) => (
            <ReviewCard key={`mobile-${review.id}-${index}`} review={review} />
          ))}
        </div>
      </div>

      {/* Tablet — two columns */}
      <div className="hidden md:grid lg:hidden relative grid-cols-2 gap-6 h-140 overflow-hidden rounded-[1.5rem]">
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-16 bg-linear-to-b from-background to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-16 bg-linear-to-t from-background to-transparent" />
        <Column reviews={allNormal} direction="up" columnKey="tablet-col1" />
        <Column reviews={allReversed} direction="down" columnKey="tablet-col2" />
      </div>

      {/* Desktop — three columns */}
      <div className="hidden lg:grid relative grid-cols-3 gap-6 h-140 overflow-hidden rounded-[1.5rem]">
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-16 bg-linear-to-b from-background to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-16 bg-linear-to-t from-background to-transparent" />
        <Column reviews={allNormal} direction="up" columnKey="col1" />
        <Column reviews={allReversed} direction="down" columnKey="col2" />
        <Column reviews={allNormal} direction="up" columnKey="col3" />
      </div>
    </>
  );
}