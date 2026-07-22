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
                  <div className="inline-flex items-center gap-[0.45rem] rounded-full border border-foreground/20 bg-background/72 px-[0.8rem] py-[0.45rem] text-[0.85rem] font-semibold uppercase tracking-[0.12em] text-[#e4eff3] shadow-[0_8px_20px_rgba(15,23,42,0.05)]">
                    Get a Quote
                  </div>
                </Reveal>

                <Reveal delay={0.08} className="mt-6 max-w-2xl">
                  <h1 className="font-display text-[2.25rem] font-semibold leading-[1.1] tracking-tight text-foreground md:text-[3.25rem]">
                    No pricing games.{" "}
                    <span className="text-muted-foreground">Just a real answer, in writing.</span>
                  </h1>
                </Reveal>

                <Reveal delay={0.16} className="mt-6 max-w-xl">
                  <p className="text-[1.02rem] leading-[1.75] text-muted-foreground">
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
        <section className="relative overflow-hidden bg-background/90 px-5 py-10 md:px-10">
          <div className="mx-auto w-[min(100%,76rem)]">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {included.map((item, i) => (
                <Reveal key={item} delay={(i % 4) * 0.05} className="flex items-start gap-2.5">
                  <FaCheckCircle className="mt-0.5 h-3.5 w-3.5 flex-none text-blue-600" />
                  <p className="text-[0.85rem] leading-snug text-muted-foreground">{item}</p>
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
              <div className="rounded-[2rem] border border-[rgba(10,10,10,0.08)] bg-[rgba(36,35,35,0.35)] p-6 shadow-[0_18px_50px_rgba(0,0,0,0.15)] md:p-10">
                <span className="text-[0.8rem] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                  Request A Survey
                </span>
                <h2 className="mt-3 font-display text-xl font-semibold text-foreground md:text-2xl">
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