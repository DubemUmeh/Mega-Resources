"use client";

import Image from "next/image";
import Link from "next/link";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
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

export interface ServiceFaq {
  question: string;
  answer: string;
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
  faqs: ServiceFaq[];
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
              className="font-brand inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm font-semibold uppercase tracking-[0.12em] text-neutral-600 shadow-[0_8px_20px_rgba(15,23,42,0.05)] transition-colors hover:text-blue-600"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              All Services
            </Link>
          </Reveal>

          <div className="mt-10 grid gap-10 md:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] md:items-center md:gap-16">
            <Reveal delay={0.05}>
              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-3">
                  <span className="font-brand text-lg font-semibold text-blue-600">
                    {data.num}
                  </span>
                  <span className="h-px w-10 bg-neutral-300" />
                  <span className="font-brand inline-flex items-center gap-2 rounded-full bg-blue-600/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-blue-600">
                    {data.eyebrow}
                  </span>
                </div>

                <h1 className="font-display text-[2.25rem] font-semibold leading-[1.08] tracking-tight text-foreground md:text-[3.25rem]">
                  {data.title}
                  <span className="block text-neutral-600 font-display">
                    {data.titleAccent}
                  </span>
                </h1>

                <p className="font-body max-w-lg text-base leading-[1.7] text-foreground/70 tracking-wider">
                  {data.heroDescription}
                </p>

                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <ArrowCta href="/#contact" label="Request This Service" />
                  <span className="font-body text-base text-foreground/60">
                    {data.tagline}
                  </span>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="relative overflow-hidden rounded-4xl border border-neutral-200 bg-neutral-100 p-3 shadow-[0_25px_65px_rgba(15,23,42,0.15)]">
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
                <div className="absolute left-6 top-6 flex h-11 w-11 items-center justify-center rounded-full bg-white/90 shadow-[0_18px_45px_rgba(15,23,42,0.1)]">
                  {HeroIcon ? (
                    <HeroIcon className="size-6 text-blue-600" />
                  ) : null}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------ OVERVIEW */}
      <section className="relative px-5 py-16 md:px-10 md:py-24 bg-background/30">
        <div className="mx-auto grid w-[min(100%,76rem)] gap-8 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:gap-12">
          <Reveal className="rounded-[1.8rem] border border-neutral-200 bg-neutral-100 p-7 shadow-[0_18px_50px_rgba(15,23,42,0.05)] md:p-12">
            <span className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-neutral-500">
              Service Explained
            </span>

            <h2 className="mt-5 font-display tracking-wide capitalize text-2xl font-semibold text-neutral-900 md:text-3xl">
              {data.overviewHeading}
            </h2>

            <div className="mt-5 space-y-5">
              {data.overviewParagraphs.map((p, i) => (
                <p
                  key={i}
                  className="text-base leading-[1.75] text-neutral-600"
                >
                  {p}
                </p>
              ))}
            </div>

            <ul className="mt-6 space-y-3">
              {data.overviewBullets.map((b) => (
                <li key={b} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 rounded-full bg-blue-600/10 shrink-0 text-blue-600" />
                  <span className="text-[0.98rem] leading-[1.6] text-neutral-500 tracking-wide">
                    {b}
                  </span>
                </li>
              ))}
            </ul>

            <blockquote className="mt-8 rounded-2xl rounded-l-none border-l-4 border-blue-600 bg-blue-50 px-6 py-5">
              <p className="text-[0.98rem] italic leading-[1.7] text-foreground/80">
                {data.quote}
              </p>
            </blockquote>
          </Reveal>

          <Reveal
            delay={0.1}
            className="sticky md:top-25 h-fit flex flex-col justify-center gap-6 overflow-hidden rounded-[1.8rem] border border-neutral-200 bg-neutral-100 p-7 md:p-10"
          >
            <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,0.08),transparent_55%)]" />
            <h3 className="font-display text-xl font-semibold text-neutral-900 underline underline-offset-3 decoration-blue-600 capitalize tracking-wide">
              Why it matters
            </h3>
            <p className="text-base leading-[1.75] text-neutral-600">
              {data.tagline} Every job is scoped to your land, your geology,
              and your budget — no guesswork, no oversized quotes.
            </p>
            <ArrowCta href="/#contact" label="Get a Free Quote" className="w-fit" />
          </Reveal>
        </div>
      </section>

      {/* -------------------------------------------------------- PROCESS */}
      <section className="relative overflow-hidden px-5 py-16 md:px-10">
        <div className="mx-auto w-[min(100%,76rem)]">
          <Reveal className="flex flex-col gap-3 md:max-w-xl">
            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-white">
              Our Process
            </span>
            <h2 className="font-display text-2xl tracking-wide font-semibold text-foreground md:text-3xl">
              How we deliver {data.title.replace("\n", " ").toLowerCase()}
              {data.titleAccent
                ? ` ${data.titleAccent.replace("\n", " ").toLowerCase()}`
                : ""}
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-8 md:grid-cols-3 md:gap-6">
            {data.process.map((step, i) => (
              <Reveal key={step.title} delay={i * 0.08}>
                <div className="relative flex flex-col gap-4 rounded-[1.6rem] border border-neutral-200 bg-neutral-100 p-6">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-600/10 font-display text-lg font-semibold text-blue-600 ring-1 ring-neutral-200">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <h3 className="font-display tracking-wide text-lg font-bold text-neutral-900">
                    {step.title}
                  </h3>
                  <p className="text-sm md:text-base tracking-normal leading-6 text-neutral-500">
                    {step.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------- BENEFITS */}
      <section className="relative bg-background/30 px-5 py-16 md:px-10 ">
        <div className="mx-auto w-[min(100%,76rem)]">
          <Reveal className="flex flex-col gap-3 text-center md:mx-auto md:max-w-xl">
            <span className="mx-auto inline-flex w-fit items-center gap-2 rounded-full border border-neutral-200 bg-white px-3 py-1 text-base font-semibold uppercase tracking-wider text-neutral-600">
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
                  <div className="hover-lift h-full rounded-[1.6rem] border border-neutral-200 bg-neutral-100 p-6">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-600/10">
                      {BenefitIcon ? (
                        <BenefitIcon className="h-5 w-5 text-blue-600" />
                      ) : null}
                    </div>
                    <h3 className="mt-4 font-display tracking-wider capitalize text-base font-semibold text-neutral-900">
                      {benefit.title}
                    </h3>
                    <p className="mt-2 text-sm tracking-wider leading-[1.65] text-neutral-500">
                      {benefit.description}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>



      {/* ----------------------------------------------------------- FAQ */}
      <section className="relative bg-background/40 px-5 py-16 md:px-10 md:py-20">
        <div className="mx-auto w-[min(100%,76rem)]">
          <Reveal className="flex flex-col gap-3 md:max-w-2xl">
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-neutral-200 bg-white px-3 py-1 text-sm font-semibold uppercase tracking-wider text-neutral-600">
              FAQs
            </span>
            <h2 className="font-display text-2xl font-semibold text-foreground md:text-3xl">
              Frequently asked questions about {serviceName}
            </h2>
          </Reveal>
          <AccordionPrimitive.Root
            type="multiple"
            defaultValue={["0"]}
            className="mt-8 flex flex-col gap-3"
          >
            {data.faqs.map((faq, i) => (
              <AccordionPrimitive.Item
                key={faq.question}
                value={String(i)}
                className="overflow-hidden rounded-[1.5rem] border border-neutral-200 bg-neutral-100 shadow-[0_18px_50px_rgba(15,23,42,0.05)] transition-colors data-[state=open]:border-blue-600/25 data-[state=open]:bg-white"
              >
                <AccordionPrimitive.Header>
                  <AccordionPrimitive.Trigger className="group flex w-full items-center justify-between gap-4 px-5 py-5 text-left md:px-6">
                    <span className="font-display text-base tracking-wider font-semibold text-neutral-900 md:text-[1.05rem]">
                      {faq.question}
                    </span>
                    <ChevronDown className="h-4 w-4 flex-none text-neutral-400 transition-all duration-300 group-data-[state=open]:rotate-180 group-data-[state=open]:text-blue-600" />
                  </AccordionPrimitive.Trigger>
                </AccordionPrimitive.Header>
                <AccordionPrimitive.Content className="overflow-hidden px-5 text-sm tracking-wide leading-[1.7] text-neutral-500 transition-[height] duration-300 ease-out data-[state=closed]:h-0 data-[state=open]:h-(--radix-accordion-content-height) md:px-6">
                  <p className="pb-6">{faq.answer}</p>
                </AccordionPrimitive.Content>
              </AccordionPrimitive.Item>
            ))}
          </AccordionPrimitive.Root>
        </div>
      </section>

      {/* ----------------------------------------------- INTERNAL LINKS */}
      {relatedLinks.length > 0 ? (
        <section className="relative px-5 pb-16 md:px-10">
          <Reveal className="mx-auto w-[min(100%,76rem)] rounded-xl border border-neutral-200 bg-neutral-100 p-7 md:p-10">
            <span className="text-sm font-semibold leading-8 uppercase tracking-wider text-neutral-400">
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
                  className="group rounded-2xl border border-neutral-200 bg-white p-5 transition-colors hover:border-blue-600/40 hover:bg-neutral-50"
                >
                  <span className="font-display text-lg font-semibold text-foreground group-hover:text-blue-600">
                    {link.title}
                  </span>
                  <p className="mt-2 text-sm leading-6 tracking-wider text-foreground/70">
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
          <div className="relative overflow-hidden rounded-[2rem] bg-neutral-900 px-8 py-14 text-center md:px-16 md:py-20">
            <div className={BG_GLOW} />
            <div className="pointer-events-none absolute inset-0 opacity-40 [background:radial-gradient(circle_at_top,rgba(255,184,142,0.25),transparent_55%)]" />
            <div className="relative flex flex-col items-center gap-5">
              <h2 className="max-w-xl font-display text-2xl font-semibold text-white md:text-3xl">
                {data.ctaHeading}
              </h2>
              <p className="max-w-lg text-[0.98rem] leading-[1.7] text-neutral-300">
                {data.ctaBody}
              </p>
              <div className="mt-2 flex flex-wrap items-center justify-center gap-4">
                <ArrowCta href="/#contact" label="Get a Quote" />
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 rounded-2xl border border-white/25 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
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
              className="group flex items-center justify-between rounded-[1.6rem] border border-neutral-200 bg-neutral-100 px-7 py-6 transition-colors hover:bg-neutral-200"
            >
              <span className="text-sm font-semibold uppercase tracking-wider text-neutral-400">
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