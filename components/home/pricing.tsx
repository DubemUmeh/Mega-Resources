import Link from "next/link";
import { FaArrowRight, FaCheckCircle } from "react-icons/fa";
import { Reveal, BG_GLOW } from "@/components/motion-kit";

const factors = [
  { title: "Depth", desc: "Deeper drilling means more casing, time, and material." },
  { title: "Soil & Rock Type", desc: "Rocky terrain takes longer and costs more to drill through." },
  { title: "Pump & Tank", desc: "Solar or electric pumps, plus storage — sized to what your site actually needs." },
];

const included = [
  "A free geophysical survey before anything is quoted",
  "One fixed, written price — no verbal estimates, no surprises later",
  "Every cost broken down before you pay a deposit",
];

const Pricing = () => {
  return (
    <section className="relative w-full overflow-hidden bg-background/30 px-5 pt-5 pb-10 md:py-20 md:px-10">
      <div className={BG_GLOW} />
      <div className="mx-auto w-[min(100%,76rem)]">
        <div className="mb-16 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Reveal>
              <div className="inline-flex items-center gap-[0.45rem] rounded-full border border-border bg-card px-[0.8rem] py-[0.45rem] text-[0.85rem] font-semibold uppercase tracking-wider text-muted-foreground shadow-[0_8px_20px_rgba(15,23,42,0.05)]">
                Quote Guide
              </div>
            </Reveal>
            <Reveal delay={0.08} className="mt-6 max-w-lg">
              <h2 className="font-display text-3xl font-semibold leading-tight tracking-tight text-foreground md:text-4xl">
                What Actually Determines Your Cost
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.14} className="max-w-sm">
            <p className="text-base leading-[1.75] text-foreground/80">
              Every site is different, so a number on a webpage would just be a guess. Here&apos;s what genuinely moves the cost — and how we quote it properly.
            </p>
          </Reveal>
        </div>

        <div className="mb-16 grid grid-cols-1 gap-10 md:grid-cols-3">
          {factors.map((f, idx) => (
            <Reveal key={f.title} delay={idx * 0.06}>
              <h4 className="mb-2 text-[0.85rem] font-semibold uppercase tracking-widest text-foreground">{f.title}</h4>
              <p className="text-[0.9rem] leading-[1.75] text-muted-foreground">{f.desc}</p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="grid grid-cols-1 items-end gap-10 rounded-[1.5rem] border border-border bg-card p-8 shadow-[0_18px_50px_rgba(15,23,42,0.05)] md:p-10 lg:grid-cols-[1fr_auto]">
            <div className="flex flex-col gap-3">
              {included.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <FaCheckCircle className="mt-0.5 shrink-0 text-base text-blue-600" />
                  <p className="text-[0.9rem] leading-relaxed text-muted-foreground">{item}</p>
                </div>
              ))}
            </div>
            <Link
              href="/quote"
              className="group flex w-fit items-center gap-3 rounded-full border border-border bg-primary px-6 py-3 text-[0.9rem] font-semibold text-primary-foreground transition-colors hover:bg-blue-600"
            >
              Get Your Free Quote
              <FaArrowRight className="text-[10px] -rotate-45 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default Pricing;