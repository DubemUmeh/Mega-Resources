"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Home,
  Tractor,
  Building2,
  Factory,
  School,
  Landmark,
  CheckCircle2,
  type LucideIcon,
} from "lucide-react";
import ProcessSection from "@/app/services/_components/process-section";
import ServiceShowcase from "@/app/services/_components/service-showcase";
import FaqSection from "@/app/services/_components/faq-section";
import { FaArrowRight } from "react-icons/fa";

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

const clientTypes: { icon: LucideIcon; title: string; desc: string }[] = [
  {
    icon: Home,
    title: "Residential",
    desc: "Reliable water supply for homes and estates.",
  },
  {
    icon: Tractor,
    title: "Agriculture",
    desc: "Irrigation, livestock, and farming operations.",
  },
  {
    icon: Building2,
    title: "Commercial",
    desc: "Hotels, offices, and shopping centres.",
  },
  {
    icon: Factory,
    title: "Industrial",
    desc: "Factories and production facilities.",
  },
  {
    icon: School,
    title: "Institutions",
    desc: "Schools, churches, and hospitals.",
  },
  {
    icon: Landmark,
    title: "Government Projects",
    desc: "Community and municipal water systems.",
  },
];

const advantages = [
  "Experienced drilling crews and licensed hydrogeologists",
  "Modern rigs and calibrated testing equipment",
  "Accurate groundwater investigation before any drilling starts",
  "Quality PVC casing and certified materials",
  "Correctly sized pump selection based on real yield data",
  "Single point of contact from survey to commissioning",
  "Ongoing rehabilitation and maintenance support",
];

export default function ServicesPage() {
  return (
    <div className="w-full bg-background/50">
      {/* ---------------------------------------------------------- HERO */}
      <div className={BG_GLOW} />
      <section className="relative overflow-hidden px-5 pb-16 pt-32 md:px-10 md:pb-24 md:pt-40">
        <div className={BG_GLOW} />

        <div className="mx-auto w-[min(100%,76rem)]">
          <Reveal>
            <div className="inline-flex items-center gap-[0.45rem] rounded-full border border-foreground/20 bg-background/72 px-[0.8rem] py-[0.45rem] text-[0.85rem] font-semibold uppercase tracking-[0.12em] text-[#e4eff3] shadow-[0_8px_20px_rgba(15,23,42,0.05)]">
              What We Do
            </div>
          </Reveal>

          <Reveal delay={0.08} className="mt-6 max-w-3xl">
            <h1 className="font-display text-[2.25rem] font-semibold leading-[1.1] tracking-tight text-foreground md:text-[3.5rem]">
              Seven services. One goal:{" "}
              <span className="text-muted-foreground">
                water you can rely on.
              </span>
            </h1>
          </Reveal>

          <Reveal delay={0.16} className="mt-6 max-w-2xl">
            <p className="text-[1.05rem] leading-[1.75] text-muted-foreground">
              From the first geophysical reading on your land to the final
              airlift that clears your borehole for use, every stage of a
              water project is its own craft. Explore each service below to
              see exactly what we do, how we do it, and why it matters for
              the reliability of your water supply.
            </p>
          </Reveal>

          <Reveal delay={0.24} className="mt-9 flex flex-wrap items-center gap-4">
            <ArrowCta href="#service-grid" label="Explore Services" />
            <Link
              href="/#contact"
              className="text-sm font-semibold text-foreground underline decoration-accent decoration-2 underline-offset-4"
            >
              Talk to our team
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ------------------------------------------------ COMPANY OVERVIEW */}
      <section className="relative overflow-hidden px-5 py-16 md:px-10 md:py-20">
        <div className={BG_GLOW} />
        <div className="mx-auto grid w-[min(100%,76rem)] gap-10 md:grid-cols-[0.9fr_1.1fr] md:gap-16">
          <Reveal>
            <span className="text-[0.8rem] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
              Our Expertise
            </span>
            <h2 className="mt-4 font-display text-[1.9rem] font-semibold leading-[1.15] tracking-tight text-foreground md:text-[2.5rem]">
              Complete borehole water solutions
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="flex flex-col gap-5">
            <p className="text-[1.02rem] leading-[1.8] text-muted-foreground">
              Every successful borehole project involves far more than
              drilling a hole into the ground. It requires proper site
              investigation, experienced drilling, quality construction
              materials, performance testing, pump installation, and
              long-term maintenance.
            </p>
            <p className="text-[1.02rem] leading-[1.8] text-muted-foreground">
              We provide end-to-end borehole water solutions for homeowners,
              farms, industries, schools, hospitals, commercial developments,
              and government projects. Whether you&apos;re developing a new
              water source or restoring an existing borehole, our team
              delivers reliable results using modern equipment and proven
              engineering practices.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ----------------------------------------------------- WHO WE SERVE */}
      <section className="relative overflow-hidden bg-background/90 px-5 py-16 md:px-10 md:py-20">
        <div className={BG_GLOW} />
        <div className="mx-auto w-[min(100%,76rem)]">
          <Reveal className="max-w-2xl">
            <span className="text-[0.8rem] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
              Who We Serve
            </span>
            <h2 className="mt-4 font-display text-[1.75rem] font-semibold leading-[1.2] tracking-tight text-foreground md:text-[2.25rem]">
              Water solutions built around your setting
            </h2>
          </Reveal>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {clientTypes.map((c, i) => {
              const Icon = c.icon;
              return (
                <Reveal key={c.title} delay={(i % 3) * 0.06}>
                  <div className="flex h-full flex-col gap-3 rounded-[1.5rem] border border-[rgba(10,10,10,0.08)] bg-[rgba(36,35,35,0.5)] p-6">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[rgba(255,255,255,0.9)] shadow-[0_10px_25px_rgba(15,23,42,0.1)]">
                      <Icon className="h-4.5 w-4.5 text-background" />
                    </div>
                    <h3 className="font-display text-base font-semibold text-foreground">
                      {c.title}
                    </h3>
                    <p className="text-[0.9rem] leading-[1.6] text-muted-foreground">
                      {c.desc}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- OUR PROCESS */}
      {/* <ProcessSection /> */}

      {/* ----------------------------------------------------- SERVICE SHOWCASE */}
      <ServiceShowcase />

      {/* ------------------------------------------------- WHY CHOOSE US */}
      <section className="relative overflow-hidden px-5 py-16 md:px-10 md:py-20">
        <div className={BG_GLOW} />
        <div className="mx-auto grid w-[min(100%,76rem)] gap-10 md:grid-cols-[0.9fr_1.1fr] md:gap-16">
          <Reveal>
            <span className="text-[0.8rem] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
              Why Choose Us
            </span>
            <h2 className="mt-4 font-display text-[1.9rem] font-semibold leading-[1.15] tracking-tight text-foreground md:text-[2.5rem]">
              Built for reliability, not just a finished hole in the ground
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <ul className="flex flex-col gap-4">
              {advantages.map((adv) => (
                <li key={adv} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 flex-none text-blue-600" />
                  <span className="text-[0.98rem] leading-[1.65] text-muted-foreground">
                    {adv}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* -------------------------------------------------------------- FAQ */}
      <FaqSection />

      {/* ------------------------------------------------------------ CTA */}
      <section className="px-5 pb-24 md:px-10">
        <Reveal className="mx-auto w-[min(100%,76rem)]">
          <div className="relative overflow-hidden rounded-[2rem] bg-foreground/80 px-8 py-14 text-center md:px-16 md:py-20">
            <div className={BG_GLOW} />
            <div className="pointer-events-none absolute inset-0 opacity-40 [background:radial-gradient(circle_at_top,rgba(255,184,142,0.25),transparent_55%)]" />
            <div className="relative flex flex-col items-center gap-5">
              <h2 className="max-w-xl font-display text-2xl font-semibold text-primary-foreground md:text-3xl">
                Not sure which service you need?
              </h2>
              <p className="max-w-lg text-[0.98rem] leading-[1.7] text-primary-foreground/75">
                Tell us about your land and your water problem — we&apos;ll
                recommend the right combination of services, free of charge.
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