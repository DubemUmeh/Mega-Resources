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
    <section className="px-8 lg:px-24 py-24 border-b border-gray-800">
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16">
        <div>
          <div className="text-[10px] uppercase tracking-widest text-gray-500 mb-6">How It Works</div>
          <h2 className="text-3xl md:text-4xl font-light leading-tight text-gray-200 max-w-lg">
            From First Call to Flowing Tap
          </h2>
        </div>
        <p className="text-[13px] text-gray-400 leading-relaxed max-w-sm font-light">
          A clear, fixed process — so you always know what happens next and when.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-6 relative">
        <div className="hidden md:block absolute top-6 left-0 right-0 h-px bg-gray-800"></div>
        {steps.map((s, idx) => (
          <div key={idx} className="relative flex flex-col gap-6">
            <div className="w-12 h-12 rounded-full bg-dark border border-gray-700 flex items-center justify-center text-xs text-gray-300 relative z-10 shrink-0">
              {s.num}
            </div>
            <div>
              <div className="text-[9px] uppercase tracking-widest text-gray-600 mb-2">{s.tag}</div>
              <h4 className="text-[14px] font-medium text-gray-200 mb-2">{s.title}</h4>
              <p className="text-xs text-gray-500 leading-relaxed font-light">{s.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;