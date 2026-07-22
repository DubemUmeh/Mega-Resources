"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Droplets,
  Gauge,
  Layers,
  MapPin,
  RefreshCcw,
  Wind,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { Reveal, ArrowCta, BG_GLOW } from "@/components/motion-kit";
import { StructuredData } from "@/components/structured-data";
import { serviceSchema } from "@/lib/seo";

// Map string keys -> icon components so page.tsx files (server components)
// can stay plain data files without importing framer-motion / lucide directly.
const ICONS: Record<string, LucideIcon> = {
  droplets: Droplets,
  wrench: Wrench,
  refresh: RefreshCcw,
  layers: Layers,
  map: MapPin,
  gauge: Gauge,
  wind: Wind,
};

export interface ServiceStep {
  title: string;
  description: string;
}

export interface ServiceBenefit {
  icon: keyof typeof ICONS;
  title: string;
  description: string;
}

export interface ServiceData {
  num: string;
  slug: string;
  eyebrow: string;
  title: string;
  titleAccent: string;
  tagline: string;
  heroDescription: string;
  img: string;
  icon: keyof typeof ICONS;
  overviewHeading: string;
  overviewParagraphs: string[];
  overviewBullets: string[];
  quote: string;
  process: ServiceStep[];
  benefits: ServiceBenefit[];
  ctaHeading: string;
  ctaBody: string;
  next?: { slug: string; title: string };
  related?: { slug: string; title: string; reason: string }[];
}

export default function ServiceTemplate({ data }: { data: ServiceData }) {
  const HeroIcon = ICONS[data.icon];

  const serviceName = `${data.title.replace(/\s*\/\s*$/, "")} ${data.titleAccent}`.trim();
  const relatedLinks = data.related ?? [];

  return (
    <div className="w-full bg-background/50">
      <StructuredData data={serviceSchema(data)} />
      {/* ---------------------------------------------------------- HERO */}
      <div className={BG_GLOW} />
      <section className="relative overflow-hidden px-5 pt-32 pb-16 md:px-10 md:pt-40 md:pb-24">
        <div className={BG_GLOW} />
        <div className="mx-auto w-[min(100%,76rem)]">
          <Reveal>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 rounded-full border border-foreground/20 bg-background/72 px-4 py-2 text-sm font-semibold uppercase tracking-[0.12em] text-muted-foreground shadow-[0_8px_20px_rgba(15,23,42,0.05)] transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              All Services
            </Link>
          </Reveal>

          <div className="mt-10 grid gap-10 md:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] md:items-center md:gap-16">
            <Reveal delay={0.05}>
              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-3">
                  <span className="font-display text-lg font-semibold text-blue-600">
                    {data.num}
                  </span>
                  <span className="h-px w-10 bg-foreground/15" />
                  <span className="inline-flex items-center gap-2 rounded-full bg-foreground/5 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    {data.eyebrow}
                  </span>
                </div>

                <h1 className="font-display text-[2.25rem] font-semibold leading-[1.08] tracking-tight text-foreground md:text-[3.25rem]">
                  {data.title}
                  <span className="block text-muted-foreground">
                    {data.titleAccent}
                  </span>
                </h1>

                <p className="max-w-lg text-[1.05rem] leading-[1.7] text-muted-foreground">
                  {data.heroDescription}
                </p>

                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <ArrowCta href="/#contact" label="Request This Service" />
                  <span className="text-sm text-muted-foreground">
                    {data.tagline}
                  </span>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="relative overflow-hidden rounded-4xl border border-[rgba(10,10,10,0.08)] bg-[rgba(36,35,35,0.4)] p-3 shadow-[0_25px_65px_rgba(15,23,42,0.15)]">
                <div className={BG_GLOW} />
                <div className="relative aspect-4/3 w-full overflow-hidden rounded-[1.6rem]">
                  <Image
                    src={data.img}
                    alt={`${data.title} ${data.titleAccent}`}
                    fill
                    sizes="(min-width: 768px) 40vw, 90vw"
                    className="object-cover"
                    priority
                  />
                </div>
                <div className="absolute left-6 top-6 flex h-11 w-11 items-center justify-center rounded-full bg-[rgba(255,255,255,0.9)] shadow-[0_18px_45px_rgba(15,23,42,0.1)]">
                  {HeroIcon ? (
                    <HeroIcon className="h-5 w-5 text-background" />
                  ) : null}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------ OVERVIEW */}
      <section className="relative px-5 py-16 md:px-10 md:py-24">
        <div className="mx-auto grid w-[min(100%,76rem)] gap-8 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:gap-12">
          <Reveal className="rounded-[1.8rem] border border-[rgba(10,10,10,0.08)] bg-[rgba(36,35,35,0.5)] p-7 shadow-[0_18px_50px_rgba(15,23,42,0.05)] md:p-12">
            <span className="inline-flex items-center gap-2 rounded-full border border-[rgba(10,10,10,0.1)] bg-foreground/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
              Service Explained
            </span>

            <h2 className="mt-5 font-display text-2xl font-semibold text-foreground md:text-3xl">
              {data.overviewHeading}
            </h2>

            <div className="mt-5 space-y-5">
              {data.overviewParagraphs.map((p, i) => (
                <p
                  key={i}
                  className="text-[1.02rem] leading-[1.75] text-muted-foreground"
                >
                  {p}
                </p>
              ))}
            </div>

            <ul className="mt-6 space-y-3">
              {data.overviewBullets.map((b) => (
                <li key={b} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" />
                  <span className="text-[0.98rem] leading-[1.6] text-foreground/80">
                    {b}
                  </span>
                </li>
              ))}
            </ul>

            <blockquote className="mt-8 rounded-2xl rounded-l-none border-l-4 border-blue-600 bg-blue-600/10 px-6 py-5">
              <p className="text-[0.98rem] italic leading-[1.7] text-foreground/80">
                {data.quote}
              </p>
            </blockquote>
          </Reveal>

          <Reveal
            delay={0.1}
            className="sticky md:top-25 h-fit flex flex-col justify-center gap-6 overflow-hidden rounded-[1.8rem] border border-[rgba(10,10,10,0.08)] bg-[rgba(36,35,35,0.5)] p-7 md:p-10"
          >
            <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,0.14),transparent_55%)]" />
            <h3 className="font-display text-xl font-semibold text-foreground">
              Why it matters
            </h3>
            <p className="text-[0.98rem] leading-[1.75] text-muted-foreground">
              {data.tagline} Every job is scoped to your land, your geology,
              and your budget — no guesswork, no oversized quotes.
            </p>
            <ArrowCta href="/#contact" label="Get a Free Quote" className="w-fit" />
          </Reveal>
        </div>
      </section>

      {/* -------------------------------------------------------- PROCESS */}
      <section className="relative overflow-hidden bg-background/90 px-5 py-16 md:px-10 md:py-24">
        <div className={BG_GLOW} />
        <div className="mx-auto w-[min(100%,76rem)]">
          <Reveal className="flex flex-col gap-3 md:max-w-xl">
            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-white">
              Our Process
            </span>
            <h2 className="font-display text-2xl font-semibold text-foreground md:text-3xl">
              How we deliver {data.title.replace("\n", " ").toLowerCase()}
              {data.titleAccent
                ? ` ${data.titleAccent.replace("\n", " ").toLowerCase()}`
                : ""}
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-8 md:grid-cols-3 md:gap-6">
            {data.process.map((step, i) => (
              <Reveal key={step.title} delay={i * 0.08}>
                <div className="relative flex flex-col gap-4 rounded-[1.6rem] border border-[rgba(10,10,10,0.08)] bg-[rgba(36,35,35,0.5)] p-6">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-background/60 font-display text-lg font-semibold text-blue-600 ring-1 ring-[rgba(10,10,10,0.08)]">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <h3 className="font-display text-lg font-semibold text-foreground">
                    {step.title}
                  </h3>
                  <p className="text-[0.95rem] leading-[1.7] text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------- BENEFITS */}
      <section className="relative px-5 py-16 md:px-10 md:py-24">
        <div className="mx-auto w-[min(100%,76rem)]">
          <Reveal className="flex flex-col gap-3 text-center md:mx-auto md:max-w-xl">
            <span className="mx-auto inline-flex w-fit items-center gap-2 rounded-full bg-foreground/5 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Benefits
            </span>
            <h2 className="font-display text-2xl font-semibold text-foreground md:text-3xl">
              What you gain
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {data.benefits.map((benefit, i) => {
              const BenefitIcon = ICONS[benefit.icon];
              return (
                <Reveal key={benefit.title} delay={i * 0.06}>
                  <div className="hover-lift h-full rounded-[1.6rem] border border-[rgba(10,10,10,0.08)] bg-[rgba(36,35,35,0.5)] p-6">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-600/10">
                      {BenefitIcon ? (
                        <BenefitIcon className="h-5 w-5 text-blue-600" />
                      ) : null}
                    </div>
                    <h3 className="mt-4 font-display text-base font-semibold text-foreground">
                      {benefit.title}
                    </h3>
                    <p className="mt-2 text-[0.9rem] leading-[1.65] text-muted-foreground">
                      {benefit.description}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>



      {/* ----------------------------------------------- INTERNAL LINKS */}
      {relatedLinks.length > 0 ? (
        <section className="relative px-5 pb-16 md:px-10 md:pb-20">
          <Reveal className="mx-auto w-[min(100%,76rem)] rounded-[1.8rem] border border-[rgba(10,10,10,0.08)] bg-[rgba(36,35,35,0.45)] p-7 md:p-10">
            <span className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
              Plan the complete water system
            </span>
            <h2 className="mt-3 font-display text-2xl font-semibold text-foreground md:text-3xl">
              Services commonly paired with {serviceName}
            </h2>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {relatedLinks.map((link) => (
                <Link
                  key={link.slug}
                  href={`/services/${link.slug}`}
                  className="group rounded-2xl border border-foreground/10 bg-background/40 p-5 transition-colors hover:border-blue-600/40 hover:bg-background/60"
                >
                  <span className="font-display text-lg font-semibold text-foreground group-hover:text-blue-600">
                    {link.title}
                  </span>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {link.reason}
                  </p>
                </Link>
              ))}
            </div>
          </Reveal>
        </section>
      ) : null}

      {/* ------------------------------------------------------------ CTA */}
      <section className="px-5 pb-24 md:px-10">
        <Reveal className="mx-auto w-[min(100%,76rem)]">
          <div className="relative overflow-hidden rounded-[2rem] bg-foreground/80 px-8 py-14 text-center md:px-16 md:py-20">
            <div className={BG_GLOW} />
            <div className="pointer-events-none absolute inset-0 opacity-40 [background:radial-gradient(circle_at_top,rgba(255,184,142,0.25),transparent_55%)]" />
            <div className="relative flex flex-col items-center gap-5">
              <h2 className="max-w-xl font-display text-2xl font-semibold text-primary-foreground md:text-3xl">
                {data.ctaHeading}
              </h2>
              <p className="max-w-lg text-[0.98rem] leading-[1.7] text-primary-foreground/70">
                {data.ctaBody}
              </p>
              <div className="mt-2 flex flex-wrap items-center justify-center gap-4">
                <ArrowCta href="/#contact" label="Get a Quote" />
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 rounded-2xl border border-primary-foreground/25 px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-foreground/10"
                >
                  Browse All Services
                </Link>
              </div>
            </div>
          </div>
        </Reveal>

        {data.next ? (
          <Reveal className="mx-auto mt-8 w-[min(100%,76rem)]">
            <Link
              href={`/services/${data.next.slug}`}
              className="group flex items-center justify-between rounded-[1.6rem] border border-[rgba(10,10,10,0.08)] bg-[rgba(36,35,35,0.5)] px-7 py-6 transition-colors hover:bg-[rgba(36,35,35,0.7)]"
            >
              <span className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                Next Service
              </span>
              <span className="flex items-center gap-2 font-display text-lg font-semibold text-foreground transition-colors group-hover:text-blue-600">
                {data.next.title}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          </Reveal>
        ) : null}
      </section>
    </div>
  );
}