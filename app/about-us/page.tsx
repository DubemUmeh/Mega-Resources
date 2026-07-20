"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  FaArrowRight,
  FaHandshake,
  FaSearchLocation,
  FaShieldAlt,
  FaMapMarkedAlt,
} from "react-icons/fa";
import HowItWorks from "@/app/about-us/_components/how-it-works";
import HeroSurveyDiagram from "@/app/about-us/_components/hero-survey-diagram";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function ArrowCta({
  href,
  label,
  className = "",
}: {
  href: string;
  label: string;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`w-fit inline-flex items-center cursor-pointer rounded-2xl z-0 group pl-1 py-1.5 pr-4 gap-3 bg-blue-600 hover:bg-blue-700 active:scale-95 h-12 transition-all duration-300 ease-out ${className}`}
    >
      <div className="flex justify-start items-center">
        <div className="flex justify-center items-center size-10 flex-none rounded-xl bg-white">
          <div
            className="-rotate-45 group-hover:rotate-0 transition-transform duration-300 ease-in-out text-blue-600"
            style={{ fontSize: "1rem", position: "relative" }}
          >
            <FaArrowRight />
          </div>
        </div>
      </div>
      <span className="text-base leading-[1.2] font-medium text-center text-white">
        {label}
      </span>
    </Link>
  );
}

const BG_GLOW =
  "pointer-events-none absolute inset-0 -z-10 [background:radial-gradient(circle_at_10%_10%,rgba(255,205,112,0.16),transparent_38%),radial-gradient(circle_at_90%_20%,rgba(255,184,142,0.14),transparent_40%)]";

const stats = [
  { value: "15+", label: "Years in the Field" },
  { value: "3,000+", label: "Boreholes Completed" },
  { value: "10", label: "Regions Served" },
  { value: "2-Yr", label: "Warranty on Every Job" },
];

const values = [
  {
    icon: FaSearchLocation,
    title: "We Measure, We Don't Guess",
    desc: "Every job starts with a real geophysical survey, not a hopeful drill point. It's why our first-time success rate stays high while others gamble with your budget.",
  },
  {
    icon: FaHandshake,
    title: "Transparent, Upfront Pricing",
    desc: "You get depth, yield, and total cost before you commit — in writing, before any deposit changes hands.",
  },
  {
    icon: FaShieldAlt,
    title: "We Stand Behind Our Work",
    desc: "A 2-year warranty on every borehole, and a rehabilitation service if yield ever drops. We don't disappear once the invoice is paid.",
  },
  {
    icon: FaMapMarkedAlt,
    title: "Ghana-Wide Reach",
    desc: "From Greater Accra to the Northern and Ashanti regions, our crews and equipment travel to where the water is — not just where it's convenient.",
  },
];

export default function AboutPage() {
  return (
    <div className="w-full bg-background/50">
      {/* ---------------------------------------------------------- HERO */}
      <div className={BG_GLOW} />
      <section className="relative overflow-hidden px-5 pb-16 pt-32 md:px-10 md:pb-24 md:pt-40">
        <div className={BG_GLOW} />
        <div className="mx-auto w-[min(100%,76rem)]">
          <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <Reveal>
                <div className="inline-flex items-center gap-[0.45rem] rounded-full border border-foreground/20 bg-background/72 px-[0.8rem] py-[0.45rem] text-[0.85rem] font-semibold uppercase tracking-[0.12em] text-[#e4eff3] shadow-[0_8px_20px_rgba(15,23,42,0.05)]">
                  About Us
                </div>
              </Reveal>

              <Reveal delay={0.08} className="mt-6 max-w-3xl">
                <h1 className="font-display text-[2.25rem] font-semibold leading-[1.1] tracking-tight text-foreground md:text-[3.5rem]">
                  We don&apos;t guess where the water is.{" "}
                  <span className="text-muted-foreground">We find it.</span>
                </h1>
              </Reveal>

              <Reveal delay={0.16} className="mt-6 max-w-2xl">
                <p className="text-[1.05rem] leading-[1.75] text-muted-foreground">
                  For over 15 years, we&apos;ve surveyed, drilled, and
                  commissioned boreholes for homes, farms, schools, and
                  businesses across Ghana. No shortcuts, no disappearing
                  after the deposit — just water you can rely on, backed by
                  a warranty that actually means something.
                </p>
              </Reveal>

              <Reveal delay={0.24} className="mt-9 flex flex-wrap items-center gap-4">
                <ArrowCta href="/quote" label="Get a Free Survey" />
                <Link
                  href="/services"
                  className="text-sm font-semibold text-foreground underline decoration-accent decoration-2 underline-offset-4"
                >
                  See our services
                </Link>
              </Reveal>
            </div>

            {/* Technical survey visual — desktop only, fills the empty right column */}
            <Reveal delay={0.14} className="hidden lg:block">
              <HeroSurveyDiagram />
            </Reveal>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------- OUR STORY */}
      <section className="relative overflow-hidden px-5 py-16 md:px-10 md:py-20">
        <div className={BG_GLOW} />
        <div className="mx-auto grid w-[min(100%,76rem)] gap-10 md:grid-cols-[0.9fr_1.1fr] md:gap-16">
          <Reveal>
            <span className="text-[0.8rem] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
              Our Story
            </span>
            <h2 className="mt-4 font-display text-[1.9rem] font-semibold leading-[1.15] tracking-tight text-foreground md:text-[2.5rem]">
              From one rig to a name families trust
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="flex flex-col gap-5">
            <p className="text-[1.02rem] leading-[1.8] text-muted-foreground">
              We started with a single rig and a simple belief: a borehole
              is only as good as the survey that came before it. Too many
              families were paying for dry holes and dropped promises, and
              we set out to do it differently — test first, quote
              honestly, drill properly, and stand behind the result.
            </p>
            <p className="text-[1.02rem] leading-[1.8] text-muted-foreground">
              That approach is why we&apos;re now one of the largest
              borehole drilling operations in Ghana, with crews and
              equipment working across ten regions. The rigs have gotten
              bigger, but the promise hasn&apos;t changed — we don&apos;t
              leave until you have water you can rely on.
            </p>
          </Reveal>
        </div>
      </section>

      {/* -------------------------------------------------------- STATS */}
      <section className="relative overflow-hidden bg-background/90 px-5 py-16 md:px-10 md:py-20">
        <div className={BG_GLOW} />
        <div className="mx-auto w-[min(100%,76rem)]">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-6">
            {stats.map((stat, i) => (
              <Reveal key={stat.label} delay={(i % 4) * 0.06}>
                <div className="flex flex-col gap-1 text-center md:text-left">
                  <span className="font-display text-4xl font-bold tracking-tight text-foreground md:text-5xl">
                    {stat.value}
                  </span>
                  <span className="text-[0.85rem] uppercase tracking-[0.08em] text-muted-foreground">
                    {stat.label}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* --------------------------------------- HOW IT WORKS / PROCESS */}
      <HowItWorks />

      {/* -------------------------------------------------------- VALUES */}
      <section className="relative overflow-hidden px-5 py-16 md:px-10 md:py-20">
        <div className={BG_GLOW} />
        <div className="mx-auto w-[min(100%,76rem)]">
          <Reveal className="max-w-2xl">
            <span className="text-[0.8rem] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
              Why We&apos;re Different
            </span>
            <h2 className="mt-4 font-display text-[1.9rem] font-semibold leading-[1.2] tracking-tight text-foreground md:text-[2.5rem]">
              What sets us apart from other drillers
            </h2>
            <p className="mt-4 text-[1.02rem] leading-[1.75] text-muted-foreground">
              Most borehole disappointments in Ghana trace back to the same
              handful of shortcuts. Here&apos;s what we do instead.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <Reveal key={v.title} delay={(i % 2) * 0.08}>
                  <div className="flex h-full flex-col gap-4 rounded-[1.5rem] border border-[rgba(10,10,10,0.08)] bg-[rgba(36,35,35,0.5)] p-6">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-600/10">
                      <Icon className="h-4.5 w-4.5 text-blue-600" />
                    </div>
                    <h3 className="font-display text-lg font-semibold text-foreground">
                      {v.title}
                    </h3>
                    <p className="text-[0.92rem] leading-[1.65] text-muted-foreground">
                      {v.desc}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------ CTA */}
      <section className="px-5 pb-24 md:px-10">
        <Reveal className="mx-auto w-[min(100%,76rem)]">
          <div className="relative overflow-hidden rounded-[2rem] bg-foreground/80 px-8 py-14 text-center md:px-16 md:py-20">
            <div className={BG_GLOW} />
            <div className="pointer-events-none absolute inset-0 opacity-40 [background:radial-gradient(circle_at_top,rgba(255,184,142,0.25),transparent_55%)]" />
            <div className="relative flex flex-col items-center gap-5">
              <h2 className="max-w-xl font-display text-2xl font-semibold text-primary-foreground md:text-3xl">
                Ready to find out what&apos;s under your land?
              </h2>
              <p className="max-w-lg text-[0.98rem] leading-[1.7] text-primary-foreground/75">
                Book a free site visit and survey — no obligation, and
                you&apos;ll know your depth, yield, and cost before you
                decide anything.
              </p>
              <ArrowCta
                href="/quote"
                label="Get a Free Consultation"
                className="mt-2"
              />
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}