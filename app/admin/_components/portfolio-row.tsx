"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaPen, FaTrash, FaStar, FaPlay, FaExternalLinkAlt } from "react-icons/fa";
import { Portfolio } from "@/db/types";
import { RowActionsMenu } from "./row-action-menu";

export function PortfolioRow({
  portfolio,
  onDelete,
  onToggleFeatured,
}: {
  portfolio: Portfolio;
  onDelete: () => void;
  onToggleFeatured: () => void;
}) {
  const router = useRouter();

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-[1.5rem] border border-neutral-200 bg-white shadow-[0_8px_20px_rgba(15,23,42,0.04)] transition-colors hover:border-blue-600/25">
      <div className="relative aspect-4/3 w-full overflow-hidden">
        <Image
          src={portfolio.img}
          alt={portfolio.title}
          fill
          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
          className="object-cover"
        />
        {portfolio.isVideo && (
          <div className="absolute inset-0 flex items-center justify-center bg-neutral-900/20">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-neutral-900">
              <FaPlay className="ml-0.5 h-3 w-3" />
            </span>
          </div>
        )}

        <span className="absolute left-3 top-3 rounded-full bg-blue-600 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.06em] text-white">
          {portfolio.service}
        </span>
        <span
          className={`absolute right-3 top-3 rounded-full px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.06em] backdrop-blur-sm ${
            portfolio.status === "published"
              ? "bg-neutral-900/60 text-white"
              : "bg-amber-400/90 text-neutral-900"
          }`}
        >
          {portfolio.status === "published" ? portfolio.year : "Draft"}
        </span>

        {/* Hover action cluster */}
        <div className="absolute right-3 top-3">
        <RowActionsMenu
          actions={[
            {
              icon: FaStar,
              label: portfolio.featured ? "Unfeature project" : "Feature project",
              onClick: onToggleFeatured,
              tone: portfolio.featured ? "accent" : "default",
            },
            {
              icon: FaPen,
              label: "Edit project",
              onClick: () => router.push(`/admin/portfolio/${portfolio.id}/edit`),
              tone: "accent",
            },
            { icon: FaTrash, label: "Delete project", onClick: onDelete, tone: "danger" },
          ]}
        />
      </div>
      </div>

      <div className="flex flex-1 flex-col gap-1.5 p-5">
        <div className="flex items-center gap-1.5 text-[0.72rem] text-neutral-500">
          {portfolio.location}
          {portfolio.featured && (
            <span className="ml-auto flex items-center gap-1 text-[0.7rem] font-semibold text-amber-500">
              <FaStar className="h-2.5 w-2.5" /> Featured
            </span>
          )}
        </div>
        <h3 className="font-display text-[0.98rem] font-semibold leading-snug text-neutral-900">
          {portfolio.title}
        </h3>
        <div className="mt-2 flex items-center justify-between border-t border-neutral-200 pt-3 text-[0.75rem] text-neutral-500">
          <span>{portfolio.depth} · {portfolio.duration}</span>
          <Link
            href={`/portfolio#${portfolio.id}`}
            target="_blank"
            className="flex items-center gap-1 font-medium text-blue-600"
          >
            View <FaExternalLinkAlt className="h-2 w-2" />
          </Link>
        </div>
      </div>
    </div>
  );
}