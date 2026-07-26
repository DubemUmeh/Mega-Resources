import { FaBolt, FaCoins, FaSearchLocation } from "react-icons/fa";

const points = [
  {
    icon: <FaBolt />,
    q: "Frequent Water Cuts?",
    a: "A borehole gives you 24/7 independence from Ghana Water — no more waiting on the tanker.",
  },
  {
    icon: <FaCoins />,
    q: "Tired of Buying Water?",
    a: "Most clients recover their drilling cost in 18–24 months of avoided water bills.",
  },
  {
    icon: <FaSearchLocation />,
    q: "Worried the Borehole Runs Dry?",
    a: "Our geophysical survey confirms water is there before a single drop is spent drilling.",
  },
];

const ProblemSolution = () => {
  return (
    <section className="w-full bg-background/10 px-8 lg:px-24 py-24 border-b border-black/10">
      <div className="pointer-events-none absolute inset-0 -z-10 [background:radial-gradient(circle_at_10%_10%,rgba(255,205,112,0.16),transparent_38%),radial-gradient(circle_at_90%_20%,rgba(255,184,142,0.14),transparent_40%)]" />
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16">
        <div>
          <div className="text-xs uppercase tracking-widest border border-popover w-fit p-2 rounded-full bg-foreground/20 font-semibold mb-6">Why Act Now</div>
          <h2 className="text-3xl md:text-4xl font-light leading-tight text-popover max-w-lg">
            The Problems We Solve, Before You Even Ask
          </h2>
        </div>
        <p className="text-[13px] md:text-lg text-popover leading-relaxed max-w-sm font-light">
          We handle everything from the first survey to the moment water flows from your tap.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-px">
        {points.map((p, idx) => (
          <div key={idx} className={`bg-white p-8 md:p-10 flex flex-col gap-6 group hover:bg-gray-950/60 transition-colors ${p.c}`}>
            <div className="w-11 h-11 border-gray-700 flex items-center justify-center text-gray-400 group-hover:bg-white group-hover:text-black transition-colors">
              <span className="text-sm">{p.icon}</span>
            </div>
            <div className="tracking-wide">
              <h4 className="text-lg font-medium text-popover mb-3">{p.q}</h4>
              <p className="text-sm text-background/80 leading-relaxed font-light">{p.a}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProblemSolution;