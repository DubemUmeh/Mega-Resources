import { FaQuoteLeft, FaCheckCircle } from "react-icons/fa";
import { Review } from "@/db/types";
import { StarRatingDisplay } from "./star-rating";

export function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="relative flex h-full flex-col gap-4 rounded-[1.5rem] border border-neutral-200 bg-neutral-100 p-6 shadow-[0_18px_50px_rgba(15,23,42,0.05)]">
      <div className="flex items-start justify-between gap-3">
        <div className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-white shadow-[0_6px_18px_rgba(15,23,42,0.06)]">
          <FaQuoteLeft className="h-3.5 w-3.5 text-blue-600" />
        </div>
        <StarRatingDisplay rating={review.rating} />
      </div>

      <p className="text-[0.92rem] leading-[1.65] text-neutral-600">
        {review.message}
      </p>

      <div className="mt-auto flex items-end justify-between gap-2 pt-2">
        <div>
          <div className="flex items-center gap-1.5">
            <h4 className="font-display text-sm font-semibold text-neutral-900">
              {review.name}
            </h4>
            {review.status === "approved" && (
              <FaCheckCircle className="h-3 w-3 text-blue-600" title="Approved review" />
            )}
          </div>
          {review.title && (
            <p className="text-[0.78rem] text-neutral-500">{review.title}</p>
          )}
          <p className="text-[0.72rem] text-neutral-400">{review.location}</p>
        </div>
        <div className="text-right">
          <span className="block max-w-40 text-[0.72rem] uppercase tracking-[0.08em] text-blue-600 font-semibold">
            {review.services.join(" · ")}
          </span>
          <span className="text-[0.72rem] text-neutral-400">{review.date}</span>
        </div>
      </div>
    </div>
  );
}