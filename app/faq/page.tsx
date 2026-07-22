"use client";

import Link from "next/link";
import { Reveal, ArrowCta, BG_GLOW } from "@/components/motion-kit";
import { FaqTabs } from "./_faq-tabs";

export default function FaqPage() {
  return (
    <div className="w-full bg-background/50">
      {/* ---------------------------------------------------------- HERO */}
      <div className={BG_GLOW} />
      <section className="relative overflow-hidden px-5 pb-16 pt-32 md:px-10 md:pb-20 md:pt-40">
        <div className={BG_GLOW} />
        <div className="mx-auto w-[min(100%,76rem)]">
          <Reveal>
            <div className="inline-flex items-center gap-[0.45rem] rounded-full border border-foreground/20 bg-background/72 px-[0.8rem] py-[0.45rem] text-[0.85rem] font-semibold uppercase tracking-[0.12em] text-[#e4eff3] shadow-[0_8px_20px_rgba(15,23,42,0.05)]">
              FAQ
            </div>
          </Reveal>

          <Reveal delay={0.08} className="mt-6 max-w-3xl">
            <h1 className="font-display text-[2.25rem] font-semibold leading-[1.1] tracking-tight text-foreground md:text-[3.5rem]">
              Answers before you even{" "}
              <span className="text-muted-foreground">have to ask.</span>
            </h1>
          </Reveal>

          <Reveal delay={0.16} className="mt-6 max-w-2xl">
            <p className="text-[1.05rem] leading-[1.75] text-muted-foreground">
              Everything people ask us before booking a survey — who we
              are, how the process actually works, and the general
              questions worth asking any borehole drilling company in
              Ghana, not just us.
            </p>
          </Reveal>
        </div>
      </section>

      {/* --------------------------------------------------------- TABS */}
      <FaqTabs />

      {/* ------------------------------------------------------------ CTA */}
      <section className="px-5 pb-24 md:px-10">
        <Reveal className="mx-auto w-[min(100%,76rem)]">
          <div className="relative overflow-hidden rounded-[2rem] bg-foreground/80 px-8 py-14 text-center md:px-16 md:py-20">
            <div className={BG_GLOW} />
            <div className="pointer-events-none absolute inset-0 opacity-40 [background:radial-gradient(circle_at_top,rgba(255,184,142,0.25),transparent_55%)]" />
            <div className="relative flex flex-col items-center gap-5">
              <h2 className="max-w-xl font-display text-2xl font-semibold text-primary-foreground md:text-3xl">
                Still have a question?
              </h2>
              <p className="max-w-lg text-[0.98rem] leading-[1.7] text-primary-foreground/75">
                If it&apos;s specific to your land, your budget, or your
                timeline, the fastest answer is a real conversation — not
                another FAQ entry.
              </p>
              <ArrowCta href="/contact" label="Ask Us Directly" className="mt-2" />
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}