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
    <section className="px-8 lg:px-24 py-24 border-b border-gray-800">
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16">
        <div>
          <div className="text-[10px] uppercase tracking-widest text-gray-500 mb-6">Quote Guide</div>
          <h2 className="text-3xl md:text-4xl font-light leading-tight text-gray-200 max-w-lg">
            What Actually Determines Your Cost
          </h2>
        </div>
        <p className="text-[13px] text-gray-400 leading-relaxed max-w-sm font-light">
          Every site is different, so a number on a webpage would just be a guess. Here's what genuinely moves the cost — and how we quote it properly.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-16">
        {factors.map((f) => (
          <div key={f.title}>
            <h4 className="text-[13px] font-medium text-gray-200 mb-2">{f.title}</h4>
            <p className="text-xs text-gray-500 leading-relaxed font-light">{f.desc}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-10 items-end border-t border-gray-800 pt-10">
        <div className="flex flex-col gap-3">
          {included.map((item) => (
            <div key={item} className="flex items-start gap-3">
              <FaCheckCircle className="text-gray-500 text-xs mt-0.5 shrink-0" />
              <p className="text-[13px] text-gray-400 font-light">{item}</p>
            </div>
          ))}
        </div>

        <Link
          href="/quote"
          className="flex items-center gap-3 w-fit border border-white/20 rounded-full px-6 py-3 hover:bg-white hover:text-black transition-colors text-xs tracking-wide font-medium"
        >
          Get Your Free Quote
          <FaArrowRight className="text-[10px] transform -rotate-45" />
        </Link>
      </div>
    </section>
  );
};

export default Pricing;