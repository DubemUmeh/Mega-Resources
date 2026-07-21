"use client";

import { FaStar, FaCheckCircle, FaPen, FaTrash, FaTimesCircle, FaClock } from "react-icons/fa";
import type { IconType } from "react-icons";
import { Review, ReviewStatus } from "@/db/types";
import { RowActionsMenu } from "./row-action-menu";

const STATUS_META: Record<ReviewStatus, { label: string; className: string; iconClassName: string; icon: IconType }> = {
  pending: {
    label: "Pending",
    className: "bg-foreground/8 text-muted-foreground",
    iconClassName: "text-muted-foreground/50",
    icon: FaClock,
  },
  approved: {
    label: "Approved",
    className: "bg-blue-600/10 text-blue-600",
    iconClassName: "text-blue-600",
    icon: FaCheckCircle,
  },
  rejected: {
    label: "Rejected",
    className: "bg-red-500/10 text-red-500",
    iconClassName: "text-red-500",
    icon: FaTimesCircle,
  },
};

export function ReviewRow({
  review,
  onEdit,
  onDelete,
  onUpdateStatus,
}: {
  review: Review;
  onEdit: () => void;
  onDelete: () => void;
  onUpdateStatus: (status: ReviewStatus) => void;
}) {
  const status = STATUS_META[review.status];
  const StatusIcon = status.icon;
  const statusActions: ReviewStatus[] = ["pending", "approved", "rejected"];

  return (
    <div className="group relative grid grid-cols-1 gap-3 rounded-2xl border border-[rgba(10,10,10,0.08)] bg-[rgba(36,35,35,0.5)] p-5 transition-colors hover:border-blue-600/25 md:grid-cols-[1.6fr_0.9fr_0.6fr_0.9fr] md:items-center md:gap-4">
      {/* Reviewer + message */}
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <h4 className="truncate font-display text-[0.92rem] font-semibold text-foreground">
            {review.name}
          </h4>
          <StatusIcon className={`h-3 w-3 flex-none ${status.iconClassName}`} title={status.label} />
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
        <span className="block font-medium text-foreground">{review.services.join(", ")}</span>
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
          className={`rounded-full px-3 py-1 text-[0.72rem] font-semibold uppercase tracking-[0.06em] ${status.className}`}
        >
          {status.label}
        </span>
      </div>

      {/* Hover action cluster */}
      <div className="absolute right-4 top-4 md:top-1/2 md:-translate-y-1/2">
        <RowActionsMenu
          actions={[
            ...statusActions
              .filter((nextStatus) => nextStatus !== review.status)
              .map((nextStatus) => {
                const meta = STATUS_META[nextStatus];
                return {
                  icon: meta.icon,
                  label: `Mark as ${meta.label.toLowerCase()}`,
                  onClick: () => onUpdateStatus(nextStatus),
                  tone: nextStatus === "rejected" ? "danger" as const : "accent" as const,
                };
              }),
            { icon: FaPen, label: "Edit review", onClick: onEdit, tone: "accent" },
            { icon: FaTrash, label: "Delete review", onClick: onDelete, tone: "danger" },
          ]}
        />
      </div>
    </div>
  );
}
