import Link from "next/link";
import { FaArrowRight, FaCheckCircle } from "react-icons/fa";

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
    <section className="px-8 lg:px-24 py-24 border-b-2 border-muted-foreground bg-foreground/40">
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16">
        <div>
          <div className="text-sm uppercase font-light tracking-widest text-popover/80 mb-6 underline underline-offset-3">Quote Guide</div>
          <h2 className="text-3xl md:text-4xl font-semibold leading-tight text-popover max-w-lg">
            What Actually Determines Your Cost
          </h2>
        </div>
        <p className="text-sm md:text-lg text-background leading-relaxed tracking-wide max-w-sm font-light">
          Every site is different, so a number on a webpage would just be a guess. Here&apos;s what genuinely moves the cost — and how we quote it properly.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-16">
        {factors.map((f) => (
          <div key={f.title}>
            <h4 className="text-[16px] tracking-wider text-popover mb-2 uppercase font-bold">{f.title}</h4>
            <p className="text-[14px] text-popover/90 tracking-wide leading-relaxed font-light">{f.desc}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-10 items-end border-t-2 border-muted-foreground pt-10">
        <div className="flex flex-col gap-3">
          {included.map((item) => (
            <div key={item} className="flex items-start gap-3">
              <FaCheckCircle className="text-blue-600 text-lg bg-popover rounded-full mt-0.5 shrink-0" />
              <p className="text-sm tracking-wide text-background font-light">{item}</p>
            </div>
          ))}
        </div>

        <Link
          href="/quote"
          className="flex items-center gap-3 w-fit border border-popover/40 bg-popover/30 rounded-full px-6 py-3 hover:bg-white hover:text-black transition-colors text-sm md:text-lg tracking-wide font-medium"
        >
          Get Your Free Quote
          <FaArrowRight className="text-[10px] transform -rotate-45" />
        </Link>
      </div>
    </section>
  );
};

export default Pricing;