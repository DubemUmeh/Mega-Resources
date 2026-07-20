"use client";

import { FaMapMarkerAlt } from "react-icons/fa";
import { Reveal, ArrowCta, BG_GLOW } from "@/components/motion-kit";
import { PortfolioFilterGrid } from "./_components/portfolio-filter-grid";

const stats = [
  { value: "500+", label: "Boreholes Completed" },
  { value: "10", label: "Regions Worked In" },
  { value: "98%", label: "First-Time Success Rate" },
  { value: "15+", label: "Years in the Field" },
];

export default function PortfolioPage() {
  return (
    <div className="w-full bg-background/50">
      {/* ---------------------------------------------------------- HERO */}
      <div className={BG_GLOW} />
      <section className="relative overflow-hidden px-5 pb-16 pt-32 md:px-10 md:pb-20 md:pt-40">
        <div className={BG_GLOW} />
        <div className="mx-auto w-[min(100%,76rem)]">
          <Reveal>
            <div className="inline-flex items-center gap-[0.45rem] rounded-full border border-foreground/20 bg-background/72 px-[0.8rem] py-[0.45rem] text-[0.85rem] font-semibold uppercase tracking-[0.12em] text-[#e4eff3] shadow-[0_8px_20px_rgba(15,23,42,0.05)]">
              Portfolio
            </div>
          </Reveal>

          <Reveal delay={0.08} className="mt-6 max-w-3xl">
            <h1 className="font-display text-[2.25rem] font-semibold leading-[1.1] tracking-tight text-foreground md:text-[3.5rem]">
              A record of the water{" "}
              <span className="text-muted-foreground">we&apos;ve found.</span>
            </h1>
          </Reveal>

          <Reveal delay={0.16} className="mt-6 max-w-2xl">
            <p className="text-[1.05rem] leading-[1.75] text-muted-foreground">
              This page is our actual project history — not a highlight
              reel. Every entry below is a real job we&apos;ve completed:
              the location, the service performed, and the depth and
              yield we walked away with. Browse by region or service, or
              read the featured project further down for a closer look at
              how we approach a genuinely difficult site.
            </p>
          </Reveal>

          <Reveal delay={0.24} className="mt-9 flex flex-wrap items-center gap-4">
            <ArrowCta href="#all-projects" label="Browse Projects" />
            <a
              href="#featured"
              className="text-sm font-semibold text-foreground underline decoration-blue-600 decoration-2 underline-offset-4"
            >
              Read the featured project
            </a>
          </Reveal>
        </div>
      </section>

      {/* -------------------------------------------------------- STATS */}
      <section className="relative overflow-hidden bg-background/90 px-5 py-14 md:px-10 md:py-16">
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

      {/* ---------------------------------------------------- FEATURED */}
      <section id="featured" className="relative overflow-hidden px-5 py-16 md:px-10 md:py-24 scroll-mt-24">
        <div className={BG_GLOW} />
        <div className="mx-auto w-[min(100%,76rem)]">
          <Reveal className="max-w-2xl">
            <span className="text-[0.8rem] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
              Featured Project
            </span>
            <h2 className="mt-4 font-display text-[1.9rem] font-semibold leading-[1.2] tracking-tight text-foreground md:text-[2.5rem]">
              Turning a weak site into a working one
            </h2>
          </Reveal>

          <div className="mt-10 grid gap-10 md:grid-cols-2 md:gap-16 md:items-center">
            <Reveal className="relative aspect-4/3 w-full overflow-hidden rounded-[2rem] md:aspect-4/5">
              <img
                src="/images/home/hydro-fracturing.png"
                alt="Hydro-fracturing work at the Kumasi school site"
                className="h-full w-full object-cover"
              />
              <span className="absolute bottom-4 left-4 flex items-center gap-1.5 rounded-full bg-black/50 px-3 py-1.5 text-[0.75rem] font-medium text-white backdrop-blur-sm">
                <FaMapMarkerAlt className="h-2.5 w-2.5 text-blue-400" />
                Kumasi, Ashanti Region
              </span>
            </Reveal>

            <Reveal delay={0.1} className="flex flex-col gap-6">
              <div>
                <span className="text-[0.75rem] font-semibold uppercase tracking-widest text-blue-600">
                  The Challenge
                </span>
                <p className="mt-2 text-[0.98rem] leading-[1.75] text-muted-foreground">
                  A school compound in Kumasi sat on hard basement rock —
                  the kind of geology that regularly defeats a standard
                  drilling approach. Our first pass hit water at 310ft, but
                  the fracture network feeding the hole was too tight: the
                  initial yield came back under 400 L/hr, nowhere near
                  enough to supply a compound of that size reliably.
                </p>
              </div>

              <div>
                <span className="text-[0.75rem] font-semibold uppercase tracking-widest text-blue-600">
                  Our Approach
                </span>
                <p className="mt-2 text-[0.98rem] leading-[1.75] text-muted-foreground">
                  Rather than abandon the site or re-drill blind elsewhere
                  on the compound, we ran hydro-fracturing on the existing
                  borehole — pumping water under controlled high pressure
                  down the hole to open and widen the natural fracture
                  network already present in the rock. It&apos;s a
                  targeted fix for exactly this kind of low-yield hard-rock
                  problem, and it doesn&apos;t always work — which is why
                  we quote it as a distinct step, not a guaranteed
                  add-on.
                </p>
              </div>

              <div>
                <span className="text-[0.75rem] font-semibold uppercase tracking-widest text-blue-600">
                  The Outcome
                </span>
                <p className="mt-2 text-[0.98rem] leading-[1.75] text-muted-foreground">
                  Yield rose from under 400 L/hr to 2,400 L/hr — a six-fold
                  increase from the same borehole, at a fraction of the
                  cost of drilling a second hole elsewhere on the site.
                  The school has run on that single borehole since, with
                  no supplementary source needed.
                </p>
              </div>

              <div className="mt-2 grid grid-cols-3 gap-4 rounded-2xl border border-[rgba(10,10,10,0.08)] bg-[rgba(36,35,35,0.5)] p-5 text-center">
                <div>
                  <p className="font-display text-lg font-semibold text-foreground">
                    310ft
                  </p>
                  <p className="text-[0.7rem] uppercase tracking-[0.06em] text-muted-foreground">
                    Depth
                  </p>
                </div>
                <div>
                  <p className="font-display text-lg font-semibold text-foreground">
                    6×
                  </p>
                  <p className="text-[0.7rem] uppercase tracking-[0.06em] text-muted-foreground">
                    Yield Increase
                  </p>
                </div>
                <div>
                  <p className="font-display text-lg font-semibold text-foreground">
                    5 days
                  </p>
                  <p className="text-[0.7rem] uppercase tracking-[0.06em] text-muted-foreground">
                    Total Duration
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------- PROJECT GRID */}
      <PortfolioFilterGrid />

      {/* ------------------------------------------------------------ CTA */}
      <section className="px-5 pb-24 md:px-10">
        <Reveal className="mx-auto w-[min(100%,76rem)]">
          <div className="relative overflow-hidden rounded-[2rem] bg-foreground/80 px-8 py-14 text-center md:px-16 md:py-20">
            <div className={BG_GLOW} />
            <div className="pointer-events-none absolute inset-0 opacity-40 [background:radial-gradient(circle_at_top,rgba(255,184,142,0.25),transparent_55%)]" />
            <div className="relative flex flex-col items-center gap-5">
              <h2 className="max-w-xl font-display text-2xl font-semibold text-primary-foreground md:text-3xl">
                Want your project on this page?
              </h2>
              <p className="max-w-lg text-[0.98rem] leading-[1.7] text-primary-foreground/75">
                Every project here started with a free site survey. Yours
                can too.
              </p>
              <ArrowCta href="/quote" label="Get a Free Survey" className="mt-2" />
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}