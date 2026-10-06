import { FaBolt, FaCoins, FaSearchLocation } from "react-icons/fa";
import { Reveal, BG_GLOW } from "@/components/motion-kit";

const points = [
  { icon: <FaBolt />, q: "Frequent Water Cuts?", a: "A borehole gives you 24/7 independence from Ghana Water — no more waiting on the tanker." },
  { icon: <FaCoins />, q: "Tired of Buying Water?", a: "Most clients recover their drilling cost in 18–24 months of avoided water bills." },
  { icon: <FaSearchLocation />, q: "Worried the Borehole Runs Dry?", a: "Our geophysical survey confirms water is there before you spend a single drop drilling — at a cost." },
];

const ProblemSolution = () => {
  return (
    <section className="relative w-full overflow-hidden bg-background/40 px-5 py-10 md:py-20 md:px-10">
      <div className={BG_GLOW} />
      <div className="mx-auto w-[min(100%,76rem)]">
        <div className="mb-16 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Reveal>
              <div className="inline-flex items-center gap-[0.45rem] rounded-full border border-border bg-card px-[0.8rem] py-[0.45rem] text-[0.85rem] font-semibold uppercase tracking-wider text-muted-foreground shadow-[0_8px_20px_rgba(15,23,42,0.05)]">
                Why Act Now
              </div>
            </Reveal>
            <Reveal delay={0.08} className="mt-6 max-w-lg">
              <h2 className="font-display text-3xl font-semibold leading-tight tracking-tight text-foreground md:text-4xl">
                The Problems We Solve, Before You Even Ask
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.14} className="max-w-sm">
            <p className="text-base leading-[1.75] text-foreground/80">
              We handle everything from the first survey to the moment water flows from your tap.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {points.map((p, idx) => (
            <Reveal key={p.q} delay={idx * 0.06}>
              <div className="group flex h-full flex-col gap-6 rounded-[1.5rem] border border-border bg-card p-8 shadow-[0_18px_50px_rgba(15,23,42,0.05)] transition-colors hover:bg-popover/70">
                <div className="flex h-11 w-11 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors group-hover:border-blue-600 group-hover:text-blue-600">
                  <span className="text-lg">{p.icon}</span>
                </div>
                <div>
                  <h4 className="font-display text-lg font-semibold text-foreground mb-3">{p.q}</h4>
                  <p className="text-[0.94rem] leading-[1.75] text-muted-foreground">{p.a}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProblemSolution;
