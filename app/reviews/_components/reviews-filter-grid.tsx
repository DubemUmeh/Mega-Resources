"use client";

import { useMemo, useState } from "react";
import * as Select from "@radix-ui/react-select";
import { FaChevronDown, FaCheck } from "react-icons/fa";
import { Reveal, BG_GLOW } from "@/components/motion-kit";
import { ReviewCard } from "./review-card";
import { Review, SERVICE_TYPES } from "@/db/types";

const RATING_FILTERS = [
  { value: "all", label: "All Ratings" },
  { value: "5", label: "5 Stars" },
  { value: "4", label: "4 Stars & Up" },
  { value: "3", label: "3 Stars & Up" },
];

function SelectField({
  value,
  onChange,
  items,
  ariaLabel,
}: {
  value: string;
  onChange: (v: string) => void;
  items: { value: string; label: string }[];
  ariaLabel: string;
}) {
  return (
    <Select.Root value={value} onValueChange={onChange}>
      <Select.Trigger
        aria-label={ariaLabel}
        className="inline-flex items-center gap-2 rounded-full border border-[rgba(10,10,10,0.08)] bg-[rgba(36,35,35,0.5)] px-4 py-2.5 text-[0.85rem] font-medium text-foreground outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
      >
        <Select.Value />
        <Select.Icon>
          <FaChevronDown className="h-2.5 w-2.5 text-muted-foreground" />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content
          position="popper"
          sideOffset={8}
          className="z-50 overflow-hidden rounded-xl border border-[rgba(10,10,10,0.08)] bg-background shadow-xl"
        >
          <Select.Viewport className="p-1.5">
            {items.map((item) => (
              <Select.Item
                key={item.value}
                value={item.value}
                className="flex cursor-pointer items-center justify-between gap-3 rounded-lg px-3 py-2 text-[0.85rem] text-foreground outline-none data-highlighted:bg-blue-600/10 data-highlighted:text-blue-600"
              >
                <Select.ItemText>{item.label}</Select.ItemText>
                <Select.ItemIndicator>
                  <FaCheck className="h-2.5 w-2.5 text-blue-600" />
                </Select.ItemIndicator>
              </Select.Item>
            ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}

export function ReviewsFilterGrid({ reviews }: { reviews: Review[] }) {
  const [service, setService] = useState("all");
  const [rating, setRating] = useState("all");
  const [visible, setVisible] = useState(9);

  const serviceItems = [
    { value: "all", label: "All Services" },
    ...SERVICE_TYPES.map((s) => ({ value: s, label: s })),
  ];

  const filtered = useMemo(() => {
    return reviews.filter((r) => {
      const serviceMatch = service === "all" || r.services.includes(service as Review["services"][number]);
      const ratingMatch = rating === "all" || r.rating >= Number(rating);
      return serviceMatch && ratingMatch;
    });
  }, [reviews, service, rating]);

  return (
    <section id="all-reviews" className="relative overflow-hidden px-5 py-16 md:px-10 md:py-20 scroll-mt-24">
      <div className={BG_GLOW} />
      <div className="mx-auto w-[min(100%,76rem)]">
        <Reveal className="max-w-2xl">
          <span className="text-[0.8rem] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
            All Reviews
          </span>
          <h2 className="mt-4 font-display text-[1.9rem] font-semibold leading-[1.2] tracking-tight text-foreground md:text-[2.5rem]">
            Browse by service or rating
          </h2>
        </Reveal>

        <Reveal delay={0.08} className="mt-8 flex flex-wrap gap-3">
          <SelectField value={service} onChange={setService} items={serviceItems} ariaLabel="Filter by service" />
          <SelectField value={rating} onChange={setRating} items={RATING_FILTERS} ariaLabel="Filter by rating" />
          {(service !== "all" || rating !== "all") && (
            <button
              onClick={() => {
                setService("all");
                setRating("all");
              }}
              className="text-[0.85rem] font-medium text-blue-600 underline underline-offset-4"
            >
              Clear filters
            </button>
          )}
        </Reveal>

        {filtered.length === 0 ? (
          <p className="mt-16 text-center text-muted-foreground">
            No reviews match those filters yet.
          </p>
        ) : (
          <>
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.slice(0, visible).map((review, i) => (
                <Reveal key={review.id} delay={(i % 3) * 0.06}>
                  <ReviewCard review={review} />
                </Reveal>
              ))}
            </div>

            {visible < filtered.length && (
              <div className="mt-10 flex justify-center">
                <button
                  onClick={() => setVisible((v) => v + 9)}
                  className="rounded-full border border-[rgba(10,10,10,0.08)] bg-[rgba(36,35,35,0.5)] px-6 py-3 text-[0.85rem] font-medium text-foreground hover:bg-blue-600/10 hover:text-blue-600 transition-colors"
                >
                  Load More Reviews
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}