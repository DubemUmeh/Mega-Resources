"use client";

import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { BG_GLOW } from "@/components/motion-kit";

const faqs = [
  {
    q: "How deep can you drill a borehole?",
    a: "Depth depends on local geology and groundwater conditions. Our geological survey determines the most suitable drilling depth before work begins, typically between 100ft and 350ft+.",
  },
  {
    q: "Do I need a geological survey first?",
    a: "Yes. A survey greatly increases the likelihood of locating productive groundwater while reducing unnecessary drilling costs and failed attempts.",
  },
  {
    q: "Can an old borehole be restored?",
    a: "In many cases, yes. Rehabilitation and hydro-fracturing can improve water yield and remove accumulated silt or blockages without the cost of a new borehole.",
  },
  {
    q: "Which pump should I install?",
    a: "The right pump depends on borehole depth, yield, required water demand, and power availability. We confirm this before recommending a pump.",
  },
  {
    q: "How long does a full project take, start to finish?",
    a: "For Domestic boreholes, from survey to a commissioned pump; Is usually completed within one to three days, weather and site access permitting. For Commercial boreholes, s usually completed within one to three weeks",
  },
];

export default function FaqSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="relative overflow-hidden bg-background/40 px-5 py-16 md:px-10 md:py-20">
      <div className={BG_GLOW} />
      <div className="mx-auto w-[min(100%,76rem)]">
        <div className="flex flex-col gap-12 lg:flex-row lg:gap-24">
          <div className="lg:w-1/3">
            <span className="font-brand text-[0.8rem] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
              FAQ
            </span>
            <h2 className="mt-4 font-display text-[1.75rem] font-semibold leading-[1.2] tracking-tight text-foreground md:text-[2.25rem]">
              Questions,
              <br />
              Answered.
            </h2>
          </div>

          <div className="lg:w-2/3">
            {faqs.map((f, idx) => {
              const isOpen = open === idx;
              return (
                <div key={f.q} className="border-b border-border">
                  <button
                    onClick={() => setOpen(isOpen ? null : idx)}
                    className="flex w-full items-center justify-between gap-6 py-6 text-left"
                  >
                    <span className="font-brand tracking-wider text-[0.98rem] font-semibold text-foreground md:text-base">
                      {f.q}
                    </span>
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                        isOpen
                          ? "rotate-45 border-blue-600 text-blue-600"
                          : "border-foreground/20 text-muted-foreground"
                      }`}
                    >
                      <FaPlus className="text-[10px]" />
                    </span>
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-out ${
                      isOpen ? "max-h-40 pb-6 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <p className="max-w-xl text-[0.92rem] font-body tracking-wide leading-[1.65] text-muted-foreground">
                      {f.a}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
