"use client";

import { useEffect, useState } from "react";
import { FaDesktop, FaArrowLeft } from "react-icons/fa";
import Link from "next/link";
import { BG_GLOW } from "@/components/motion-kit";

/**
 * Wraps admin "add" / "edit" screens. These forms are dense (image
 * uploads, multi-field layouts, live previews) and aren't worth
 * cramming onto a phone — so below the `lg` breakpoint we swap the
 * form out for a friendly redirect message instead of a broken layout.
 */
export function DesktopGate({
  children,
  backHref,
  backLabel = "Back to list",
}: {
  children: React.ReactNode;
  backHref: string;
  backLabel?: string;
}) {
  const [isDesktop, setIsDesktop] = useState<boolean | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const frame = requestAnimationFrame(() => setIsDesktop(mq.matches));
    const listener = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener("change", listener);
    return () => {
      cancelAnimationFrame(frame);
      mq.removeEventListener("change", listener);
    };
  }, []);

  // Avoid a flash of the wrong state during hydration.
  if (isDesktop === null) return null;

  if (!isDesktop) {
    return (
      <div className="relative flex min-h-[70vh] items-center justify-center overflow-hidden px-6 py-16">
        <div className={BG_GLOW} />
        <div className="relative flex max-w-sm flex-col items-center gap-5 rounded-[1.5rem] border border-[rgba(10,10,10,0.08)] bg-[rgba(36,35,35,0.5)] p-8 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-600/10">
            <FaDesktop className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <h2 className="font-display text-lg font-semibold text-foreground">
              Switch to a larger screen
            </h2>
            <p className="mt-2 text-[0.9rem] leading-[1.6] text-muted-foreground">
              Adding and editing content needs a bit more room to work with —
              please continue on a desktop or laptop.
            </p>
          </div>
          <Link
            href={backHref}
            className="mt-1 inline-flex items-center gap-2 rounded-full border border-[rgba(10,10,10,0.08)] px-5 py-2.5 text-[0.85rem] font-medium text-foreground transition-colors hover:bg-blue-600/10 hover:text-blue-600"
          >
            <FaArrowLeft className="h-2.5 w-2.5" />
            {backLabel}
          </Link>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}