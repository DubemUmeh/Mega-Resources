"use client";

import Image from "next/image";
import Link from "next/link";
import { FaPen, FaTrash, FaStar, FaPlay, FaExternalLinkAlt } from "react-icons/fa";
import { Portfolio } from "@/db/types";
import { RowActionButton } from "../_components/row-action-button";

export function PortfolioRow({
  portfolio,
  onDelete,
  onToggleFeatured,
}: {
  portfolio: Portfolio;
  onDelete: () => void;
  onToggleFeatured: () => void;
}) {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-[1.5rem] border border-[rgba(10,10,10,0.08)] bg-[rgba(36,35,35,0.5)] transition-colors hover:border-blue-600/25">
      <div className="relative aspect-4/3 w-full overflow-hidden">
        <Image
          src={portfolio.img}
          alt={portfolio.title}
          fill
          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
          className="object-cover"
        />
        {portfolio.isVideo && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-background">
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
              ? "bg-black/40 text-white"
              : "bg-amber-400/90 text-black"
          }`}
        >
          {portfolio.status === "published" ? portfolio.year : "Draft"}
        </span>

        {/* Hover action cluster */}
        <div className="pointer-events-none absolute inset-0 flex items-start justify-center gap-1.5 bg-black/0 pt-3 opacity-0 transition-all duration-150 group-hover:pointer-events-auto group-hover:bg-black/25 group-hover:opacity-100">
          <div className="flex translate-y-1 gap-1.5 transition-transform duration-150 group-hover:translate-y-0">
            <RowActionButton
              icon={FaStar}
              label={portfolio.featured ? "Unfeature project" : "Feature project"}
              onClick={onToggleFeatured}
              tone={portfolio.featured ? "accent" : "default"}
            />
            {/* Editing needs more room than a phone gives — desktop/laptop only */}
            <span className="hidden lg:inline-flex">
              <Link href={`/admin/portfolio/${portfolio.id}/edit`}>
                <RowActionButton icon={FaPen} label="Edit project" onClick={() => {}} tone="accent" />
              </Link>
            </span>
            <RowActionButton icon={FaTrash} label="Delete project" onClick={onDelete} tone="danger" />
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-1.5 p-5">
        <div className="flex items-center gap-1.5 text-[0.72rem] text-muted-foreground">
          {portfolio.location}
          {portfolio.featured && (
            <span className="ml-auto flex items-center gap-1 text-[0.7rem] font-semibold text-amber-400">
              <FaStar className="h-2.5 w-2.5" /> Featured
            </span>
          )}
        </div>
        <h3 className="font-display text-[0.98rem] font-semibold leading-snug text-foreground">
          {portfolio.title}
        </h3>
        <div className="mt-2 flex items-center justify-between border-t border-[rgba(10,10,10,0.08)] pt-3 text-[0.75rem] text-muted-foreground">
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