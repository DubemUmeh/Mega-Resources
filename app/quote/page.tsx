"use client";

import { FaCheckCircle } from "react-icons/fa";
import { Reveal, ArrowCta, BG_GLOW } from "@/components/motion-kit";
import { ToastProvider } from "@/components/ui/toast";
import HeroSurveyDiagram from "@/app/about-us/_components/hero-survey-diagram";
import QuoteForm from "./_components/quote-form";
import QuoteSidebar from "./_components/quote-sidebar";

const included = [
  "Free geophysical survey — no charge, no obligation",
  "One fixed, written quote before any deposit",
  "Every cost explained, nothing verbal or vague",
  "24-hour response on every request",
];

export default function QuotePage() {
  return (
    <ToastProvider>
      <div className="w-full bg-background/50">
        {/* ---------------------------------------------------------- HERO */}
        <div className={BG_GLOW} />
        <section className="relative overflow-hidden px-5 pb-16 pt-32 md:px-10 md:pb-20 md:pt-40">
          <div className={BG_GLOW} />
          <div className="mx-auto w-[min(100%,76rem)]">
            <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
              <div>
                <Reveal>
                  <div className="inline-flex items-center gap-[0.45rem] tracking-wider rounded-full border border-neutral-200 bg-white px-[0.8rem] py-[0.45rem] text-[0.85rem] font-semibold uppercase text-neutral-600 shadow-[0_8px_20px_rgba(15,23,42,0.05)]">
                    Get a Quote
                  </div>
                </Reveal>

                <Reveal delay={0.08} className="mt-6 max-w-2xl">
                  <h1 className="font-display text-[2.25rem] font-semibold leading-[1.1] tracking-tight text-foreground md:text-[3.25rem]">
                    No pricing games.{" "}
                    <span className="text-neutral-600">Just a real answer, in writing.</span>
                  </h1>
                </Reveal>

                <Reveal delay={0.16} className="mt-6 max-w-xl">
                  <p className="text-base tracking-wider leading-[1.75] text-foreground/80">
                    Tell us about your land below. We&apos;ll schedule a free
                    site survey, confirm what&apos;s actually under the
                    ground, and hand you a fixed, written quote — before
                    you commit to anything.
                  </p>
                </Reveal>

                <Reveal delay={0.24} className="mt-9">
                  <ArrowCta href="#quote-form" label="Fill Out The Form" />
                </Reveal>
              </div>

              <Reveal delay={0.14} className="hidden lg:block">
                <HeroSurveyDiagram />
              </Reveal>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------ INCLUDED STRIP */}
        <section className="relative overflow-hidden bg-background/30 px-5 py-10 md:px-10">
          <div className="mx-auto w-[min(100%,76rem)]">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {included.map((item, i) => (
                <Reveal
                  key={item}
                  delay={(i % 4) * 0.05}
                  className="flex items-start gap-2.5 rounded-2xl border border-neutral-200 bg-background px-4 py-4"
                >
                  <FaCheckCircle className="mt-0.5 h-3.5 w-3.5 flex-none text-blue-600" />
                  <p className="text-[0.85rem] leading-snug text-foreground/70 tracking-wider">
                    {item}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* --------------------------------------------- FORM + SIDEBAR */}
        <section id="quote-form" className="relative overflow-hidden px-5 py-16 md:px-10 md:py-20 scroll-mt-24">
          <div className={BG_GLOW} />
          <div className="mx-auto grid w-[min(100%,76rem)] gap-10 md:grid-cols-[1.15fr_0.85fr] md:gap-10">
            <Reveal>
              <div className="rounded-[2rem] border border-neutral-200 bg-neutral-100 p-6 shadow-[0_18px_50px_rgba(15,23,42,0.05)] md:p-10">
                <span className="text-[0.8rem] font-semibold uppercase tracking-[0.12em] text-neutral-400">
                  Request A Survey
                </span>
                <h2 className="mt-3 font-display text-xl font-semibold text-neutral-900 md:text-2xl">
                  Tell us about your land
                </h2>
                <div className="mt-8">
                  <QuoteForm />
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <QuoteSidebar />
            </Reveal>
          </div>
        </section>
      </div>
    </ToastProvider>
  );
}