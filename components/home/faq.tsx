"use client";

import { useState } from "react";
import { FaPlus } from "react-icons/fa";

const faqs = [
  {
    q: "How do you know there's water on my land?",
    a: "We run a geophysical survey before any drilling begins. It maps water depth and volume so we only drill where we're confident of a result.",
  },
  {
    q: "How long will the borehole last?",
    a: "With basic maintenance, a properly cased borehole can last 20+ years. We also offer rehabilitation if yield drops over time.",
  },
  {
    q: "Is borehole water safe to drink?",
    a: "Yes, once it's lab tested and treated. We test for iron, bacteria, and hardness, and install filtration where needed.",
  },
  {
    q: "Do you work outside Accra?",
    a: "Yes — we've completed projects across the Ashanti, Northern, Western, and Greater Accra regions, among others.",
  },
  {
    q: "What if the borehole goes dry?",
    a: "If borehole dries, our rehabilitation service cleans and re-develops the borehole.",
  },
];

const FAQ = () => {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="bg-background/30 px-8 lg:px-24 py-24">
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
        <div className="lg:w-1/3">
          <span className="text-[0.8rem] font-semibold uppercase tracking-[0.12em] text-neutral-400 mb-6 block">FAQ</span>
          <h2 className="font-display text-3xl md:text-4xl font-semibold leading-tight text-foreground">
            Questions,<br />Answered.
          </h2>
        </div>

        <div className="lg:w-2/3">
          {faqs.map((f, idx) => {
            const isOpen = open === idx;
            return (
              <div key={idx} className="border-b border-neutral-200">
                <button
                  onClick={() => setOpen(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between text-left py-6 gap-6"
                >
                  <span className="text-lg font-medium text-neutral-900 tracking-wide">{f.q}</span>
                  <span className={`shrink-0 w-8 h-8 rounded-full border border-neutral-200 flex items-center justify-center text-neutral-400 transition-transform duration-300 ${isOpen ? "rotate-45 text-blue-600" : ""}`}>
                    <FaPlus className="size-4" />
                  </span>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-40 opacity-100 pb-6" : "max-h-0 opacity-0"}`}
                >
                  <p className="text-[16px] tracking-wider text-neutral-500 leading-relaxed font-light max-w-xl">{f.a}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
