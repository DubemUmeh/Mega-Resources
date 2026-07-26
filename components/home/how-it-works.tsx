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
    <section className="px-8 bg-linear-to-b from-foreground/20 via-foreground/30 to-foreground/60 lg:px-24 py-15 border-b-2 border-muted-foreground">
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16">
        <div>
          <div className="text-sm uppercase tracking-widest text-backround mb-6 border border-popover w-fit p-2 rounded-full bg-foreground/20 font-semibold">How It Works</div>
          <h2 className="text-3xl md:text-4xl font-light leading-tight text-gray-200 max-w-lg w-fit">
            From First Call to Flowing Tap
          </h2>
        </div>
        <p className="text-[13px] text-gray-400 leading-relaxed max-w-sm font-light">
          A clear, fixed process — so you always know what happens next and when.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-6 relative">
        <div className="hidden md:block absolute top-6 left-0 right-0 h-px bg-foreground"></div>
        {steps.map((s, idx) => (
          <div key={idx} className="relative flex flex-col gap-6">
            <div className="w-12 h-12 rounded-full bg-foreground border-2 border-popover flex items-center justify-center text-xs text-background relative z-10 shrink-0">
              <span className="text-lg">{s.num}</span>
            </div>
            <div>
              <div className="text-xs uppercase tracking-widest font-semibold text-foreground mb-2">{s.tag}</div>
              <h4 className="text-sm font-medium tracking-wider text-popover mb-2">{s.title}</h4>
              <p className="text-sm text-gray-300 leading-relaxed font-light">{s.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;