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
  { value: "1,000+", label: "Boreholes Completed" },
  { value: "10", label: "Regions Served" },
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
    title: "Professional & Reliable",
    desc: "Our team follows industry best practices and delivers quality work you can depend on. We maintain open communication throughout every project.",
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
      <section className="relative overflow-hidden px-5 pb-16 pt-32 md:px-10 md:pb-24 md:pt-40">
        <div className={BG_GLOW} />
        <div className="mx-auto w-[min(100%,76rem)]">
          <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <Reveal>
                <div className="inline-flex items-center gap-[0.45rem] tracking-wider rounded-full border border-neutral-200 bg-white px-[0.8rem] py-[0.45rem] text-[0.85rem] font-semibold uppercase text-neutral-600 shadow-[0_8px_20px_rgba(15,23,42,0.05)]">
                  About Us
                </div>
              </Reveal>

              <Reveal delay={0.08} className="mt-6 max-w-3xl">
                <h1 className="font-display text-[2.25rem] font-semibold leading-[1.1] tracking-tight text-foreground md:text-[3.5rem]">
                  We don&apos;t guess where the water is.{" "}
                  <span className="text-neutral-600">We find it.</span>
                </h1>
              </Reveal>

              <Reveal delay={0.16} className="mt-6 max-w-2xl">
                <p className="text-base tracking-wider leading-[1.75] text-foreground/80">
                  For over 15 years, we&apos;ve worked across groundwater
                  investigation, drilling, testing, water systems, and related
                  services for homes, farms, schools, businesses, and projects
                  across Ghana.
                </p>
              </Reveal>

              <Reveal delay={0.24} className="mt-9 flex flex-wrap items-center gap-4">
                <ArrowCta href="/quote" label="Get a Free Quote" />
                <Link
                  href="/services"
                  className="text-sm font-semibold text-foreground underline decoration-blue-600 decoration-2 underline-offset-4"
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
            <span className="text-[0.8rem] font-semibold uppercase tracking-[0.12em] text-neutral-400">
              Our Story
            </span>
            <h2 className="mt-4 font-display text-[1.9rem] font-semibold leading-[1.15] tracking-tight text-foreground md:text-[2.5rem]">
              From one rig to a name families trust
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="flex flex-col gap-5 text-base lg:text-lg tracking-wide font-normal leading-7 text-foreground/70">
            <p>
              Mega Resources Ltd was established to provide 
              drilling and consultancy services and general construction in the Civil Engineering, 
              Transportation, Water, Environment as well as the supply of goods and services. 
              Mega Resources Ltd is a registered Ghanaian consultancy and Construction firm - which engages and specializes in the 
              provision of portable drinking water using sophisticated and high-level technology. In addition, Mega Resources undertakes
              projects in hydrogeological consultancy, civil works, Planning, Waste Management, 
            </p>
            <p>
              Waste water Treatment, Water Treatment, Cost Estimates & Bill of Quantities, Real 
              Estate and Management Consultants. This new company was formally known as Mega Drilling 
              Company Ltd. The firm provides a comprehensive range of services from surveys through 
              feasibility studies, construction works, conceptual analysis and design to contract supervision and management.
            </p>
          </Reveal>
        </div>
      </section>

      {/* -------------------------------- VISION / MISSION / OFFICES */}
      <section className="relative overflow-hidden px-5 py-16 md:px-10 md:py-20">
        <div className={BG_GLOW} />
        <div className="mx-auto w-[min(100%,76rem)]">
          <Reveal className="max-w-2xl">
            <span className="text-[0.8rem] font-semibold uppercase tracking-[0.12em] text-neutral-400">
              Our Direction
            </span>
            <h2 className="mt-4 font-display text-[1.9rem] font-semibold leading-[1.15] tracking-tight text-foreground md:text-[2.5rem]">
              What guides Mega Resources
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            <Reveal>
              <div className="h-full rounded-[1.8rem] border border-neutral-200 bg-neutral-100 p-7 shadow-[0_18px_50px_rgba(15,23,42,0.05)] md:p-9">
                <span className="text-[0.8rem] font-semibold uppercase tracking-[0.12em] text-blue-600">Our Vision</span>
                <h3 className="mt-4 font-display text-2xl font-semibold text-neutral-900">To be one of the best in the industry</h3>
                <p className="mt-4 text-base leading-[1.75] text-neutral-600">
                  The vision of Mega Resources Limited is to be one of the best per its mandate in the industry.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="h-full rounded-[1.8rem] border border-neutral-200 bg-neutral-100 p-7 shadow-[0_18px_50px_rgba(15,23,42,0.05)] md:p-9">
                <span className="text-[0.8rem] font-semibold uppercase tracking-[0.12em] text-blue-600">Our Mission</span>
                <h3 className="mt-4 font-display text-2xl font-semibold text-neutral-900">High-level service, delivered effectively</h3>
                <p className="mt-4 text-base leading-[1.75] text-neutral-600">
                  Our mission is to provide high-level services and products with technologically inclined personnel that best meet the satisfaction of our customers and clients more effectively than our competitors in the industry.
                </p>
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.12} className="mt-5">
            <div className="rounded-[1.8rem] border border-neutral-200 bg-white p-7 shadow-[0_18px_50px_rgba(15,23,42,0.05)] md:p-9">
              <span className="text-[0.8rem] font-semibold uppercase tracking-[0.12em] text-blue-600">Our Offices</span>
              <h3 className="mt-4 font-display text-2xl font-semibold text-neutral-900">Accra, Takoradi and Kumasi</h3>
              <div className="mt-5 grid gap-5 text-base leading-[1.75] text-neutral-600 md:grid-cols-3">
                <p><strong className="text-neutral-900">Accra (Head Office):</strong> ACP Junction at Pokuasi.</p>
                <p><strong className="text-neutral-900">Takoradi:</strong> Kwesimintsim Zongo Junction, with an annex at Racecourse, behind Jushmoh Filling Station.</p>
                <p><strong className="text-neutral-900">Kumasi:</strong> Mega Resources Ltd has a subsidiary in Kumasi.</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* -------------------------------------------------------- STATS */}
      <section className="relative overflow-hidden bg-background/30 px-5 py-16 md:px-10 md:py-20">
        <div className={BG_GLOW} />
        <div className="mx-auto w-[min(100%,76rem)]">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-3 md:gap-6">
            {stats.map((stat, i) => (
              <Reveal key={stat.label} delay={(i % 4) * 0.06}>
                <div className="flex flex-col gap-1 text-center md:text-left">
                  <span className="font-display text-4xl font-bold tracking-tight text-foreground md:text-5xl">
                    {stat.value}
                  </span>
                  <span className="text-[0.85rem] uppercase tracking-wide text-neutral-500">
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
            <span className="text-[0.8rem] font-semibold uppercase tracking-[0.12em] text-neutral-400 underline decoration-blue-600 decoration-2 underline-offset-4">
              Why We&apos;re Different
            </span>
            <h2 className="mt-4 font-display text-3xl font-semibold leading-[1.2] tracking-tight text-foreground md:text-[2.5rem]">
              What sets us apart from other drillers
            </h2>
            <p className="mt-4 text-base tracking-widest leading-[1.75] text-foreground/80">
              Most borehole disappointments in Ghana trace back to the same
              handful of shortcuts. Here&apos;s what we do instead.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <Reveal key={v.title} delay={(i % 2) * 0.08}>
                  <div className="flex h-full flex-col gap-4 rounded-2xl border border-neutral-200 bg-neutral-100 p-6 shadow-[0_18px_50px_rgba(15,23,42,0.05)]">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-600/10">
                      <Icon className="size-5 text-blue-600" />
                    </div>
                    <h3 className="font-display text-lg tracking-wider font-semibold text-neutral-900">
                      {v.title}
                    </h3>
                    <p className="text-base tracking-wider leading-[1.65] text-neutral-500">
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
          <div className="relative overflow-hidden rounded-[2rem] bg-neutral-900 px-8 py-14 text-center md:px-16 md:py-20">
            <div className="pointer-events-none absolute inset-0 opacity-60 [background:radial-gradient(circle_at_top,rgba(255,184,142,0.18),transparent_55%)]" />
            <div className="relative flex flex-col items-center gap-5">
              <h2 className="max-w-xl font-display text-2xl font-semibold text-white md:text-3xl">
                Ready to find out what&apos;s under your land?
              </h2>
              <p className="max-w-lg text-[0.98rem] leading-[1.7] text-neutral-300">
                Book your site visit and survey — at a token, and
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
