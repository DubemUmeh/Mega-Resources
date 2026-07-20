"use client";

import { FaStar, FaCheckCircle, FaPen, FaTrash, FaTimesCircle } from "react-icons/fa";
import { Review } from "@/db/types";
import { RowActionsMenu } from "./row-action-menu";

export function ReviewRow({
  review,
  onEdit,
  onDelete,
  onToggleVerified,
}: {
  review: Review;
  onEdit: () => void;
  onDelete: () => void;
  onToggleVerified: () => void;
}) {
  return (
    <div className="group relative grid grid-cols-1 gap-3 rounded-2xl border border-[rgba(10,10,10,0.08)] bg-[rgba(36,35,35,0.5)] p-5 transition-colors hover:border-blue-600/25 md:grid-cols-[1.6fr_0.9fr_0.6fr_0.9fr] md:items-center md:gap-4">
      {/* Reviewer + message */}
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <h4 className="truncate font-display text-[0.92rem] font-semibold text-foreground">
            {review.name}
          </h4>
          {review.verified ? (
            <FaCheckCircle className="h-3 w-3 flex-none text-blue-600" title="Verified" />
          ) : (
            <FaTimesCircle className="h-3 w-3 flex-none text-muted-foreground/50" title="Unverified" />
          )}
        </div>
        <p className="mt-0.5 truncate text-[0.78rem] text-muted-foreground">
          {review.title ? `${review.title} · ` : ""}
          {review.location}
        </p>
        <p className="mt-1.5 line-clamp-2 text-[0.82rem] leading-normal text-muted-foreground/90 md:hidden">
          {review.message}
        </p>
      </div>

      {/* Service + date */}
      <div className="text-[0.8rem]">
        <span className="block font-medium text-foreground">{review.service}</span>
        <span className="text-muted-foreground">{review.date}</span>
      </div>

      {/* Rating */}
      <div className="flex items-center gap-1 text-[0.8rem] text-foreground">
        <FaStar className="h-2.5 w-2.5 text-amber-400" />
        {review.rating.toFixed(1)}
      </div>

      {/* Status pill (desktop) */}
      <div className="hidden md:flex md:justify-end">
        <span
          className={`rounded-full px-3 py-1 text-[0.72rem] font-semibold uppercase tracking-[0.06em] ${
            review.verified
              ? "bg-blue-600/10 text-blue-600"
              : "bg-foreground/8 text-muted-foreground"
          }`}
        >
          {review.verified ? "Verified" : "Pending"}
        </span>
      </div>

      {/* Hover action cluster */}
      <div className="absolute right-4 top-4 md:top-1/2 md:-translate-y-1/2">
        <RowActionsMenu
          actions={[
            {
              icon: review.verified ? FaTimesCircle : FaCheckCircle,
              label: review.verified ? "Mark as pending" : "Mark as verified",
              onClick: onToggleVerified,
              tone: "accent",
            },
            { icon: FaPen, label: "Edit review", onClick: onEdit, tone: "accent" },
            { icon: FaTrash, label: "Delete review", onClick: onDelete, tone: "danger" },
          ]}
        />
      </div>
    </div>
  );
}