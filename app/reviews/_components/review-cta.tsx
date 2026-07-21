"use client";

import { Reveal, ArrowCta, BG_GLOW } from "@/components/motion-kit";

export function ReviewsCta({ onWriteReview }: { onWriteReview: () => void }) {
  return (
    <section className="px-5 pb-24 md:px-10">
      <Reveal className="mx-auto w-[min(100%,76rem)]">
        <div className="relative overflow-hidden rounded-[2rem] bg-foreground/80 px-8 py-14 text-center md:px-16 md:py-20">
          <div className={BG_GLOW} />
          <div className="pointer-events-none absolute inset-0 opacity-40 [background:radial-gradient(circle_at_top,rgba(255,184,142,0.25),transparent_55%)]" />
          <div className="relative flex flex-col items-center gap-5">
            <h2 className="max-w-xl font-display text-2xl font-semibold text-primary-foreground md:text-3xl">
              Worked with us? We&apos;d love to hear about it.
            </h2>
            <p className="max-w-lg text-[0.98rem] leading-[1.7] text-primary-foreground/75">
              Your feedback helps the next family or business know exactly
              what to expect — and helps us keep getting better.
            </p>
            <ArrowCta as="button" onClick={onWriteReview} label="Write a Review" className="mt-2" />
          </div>
        </div>
      </Reveal>
    </section>
  );
}