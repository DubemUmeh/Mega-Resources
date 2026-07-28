const steps = [
  {
    num: "01",
    title: "Free Site Visit & Survey",
    desc: "We test your land and confirm water depth and cost. No obligation.",
    tag: "Day 1–3",
  },
  {
    num: "02",
    title: "Drilling & Casing",
    desc: "2–4 days on site. We drill and protect the hole with PVC casing.",
    tag: "Day 4–7",
  },
  {
    num: "03",
    title: "Pump & Tank Installation",
    desc: "We install your pump and tank, then test water flow and quality.",
    tag: "Day 8–12",
  },
  {
    num: "04",
    title: "Handover + Warranty",
    desc: "Full training, a 2-year warranty, and support one call away.",
    tag: "Day 13–14",
  },
];

const HowItWorks = () => {
  return (
    <section className="px-8 bg-background/30 lg:px-24 py-15">
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16">
        <div>
          <div className="inline-flex items-center gap-[0.45rem] tracking-wider rounded-full border border-neutral-200 bg-white px-[0.8rem] py-[0.45rem] text-[0.85rem] font-semibold uppercase text-neutral-600 shadow-[0_8px_20px_rgba(15,23,42,0.05)] mb-6">How It Works</div>
          <h2 className="font-display text-3xl md:text-4xl font-semibold leading-tight text-foreground max-w-lg w-fit">
            From First Call to Flowing Tap
          </h2>
        </div>
        <p className="text-[13px] text-neutral-500 leading-relaxed max-w-sm font-light">
          A clear, fixed process — so you always know what happens next and when.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-6 relative">
        <div className="hidden md:block absolute top-6 left-0 right-0 h-px bg-neutral-200"></div>
        {steps.map((s, idx) => (
          <div key={idx} className="relative flex flex-col gap-6">
            <div className="w-12 h-12 rounded-full bg-blue-600/10 border border-neutral-200 flex items-center justify-center text-xs text-blue-600 relative z-10 shrink-0">
              <span className="text-lg">{s.num}</span>
            </div>
            <div>
              <div className="text-xs uppercase tracking-widest font-semibold text-neutral-400 mb-2">{s.tag}</div>
              <h4 className="text-sm font-medium tracking-wider text-neutral-900 mb-2">{s.title}</h4>
              <p className="text-sm text-neutral-500 leading-relaxed font-light">{s.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;