"use client";

import { useState } from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { FaChevronDown } from "react-icons/fa";
import { Reveal, BG_GLOW } from "@/components/motion-kit";

export interface LegalSection {
  id: string;
  title: string;
  body: React.ReactNode;
}

export default function LegalPageLayout({
  eyebrow,
  title,
  intro,
  lastUpdated,
  sections,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  lastUpdated: string;
  sections: LegalSection[];
}) {
  const [openItems, setOpenItems] = useState<string[]>([sections[0]?.id]);

  function goToSection(id: string) {
    setOpenItems((prev) => (prev.includes(id) ? prev : [...prev, id]));
    // Let the accordion content mount/expand before scrolling to it.
    requestAnimationFrame(() => {
      document
        .getElementById(`section-${id}`)
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  return (
    <div className="w-full bg-background/50">
      {/* ---------------------------------------------------------- HERO */}
      <div className={BG_GLOW} />
      <section className="relative overflow-hidden px-5 pb-12 pt-32 md:px-10 md:pb-16 md:pt-40">
        <div className={BG_GLOW} />
        <div className="mx-auto w-[min(100%,76rem)]">
          <Reveal>
            <div className="inline-flex items-center gap-[0.45rem] rounded-full border border-foreground/20 bg-background/72 px-[0.8rem] py-[0.45rem] text-[0.85rem] font-semibold uppercase tracking-[0.12em] text-[#e4eff3] shadow-[0_8px_20px_rgba(15,23,42,0.05)]">
              {eyebrow}
            </div>
          </Reveal>

          <Reveal delay={0.08} className="mt-6 max-w-2xl">
            <h1 className="font-display text-[2rem] font-semibold leading-[1.15] tracking-tight text-foreground md:text-[2.75rem]">
              {title}
            </h1>
          </Reveal>

          <Reveal delay={0.16} className="mt-5 max-w-2xl">
            <p className="text-[1rem] leading-[1.75] text-muted-foreground">
              {intro}
            </p>
          </Reveal>

          <Reveal delay={0.22}>
            <p className="mt-4 text-[0.85rem] font-medium text-muted-foreground/70">
              Last updated: {lastUpdated}
            </p>
          </Reveal>
        </div>
      </section>

      {/* --------------------------------------------------- TOC + BODY */}
      <section className="relative overflow-hidden bg-background/90 px-5 pb-24 pt-4 md:px-10">
        <div className={BG_GLOW} />
        <div className="mx-auto grid w-[min(100%,76rem)] gap-10 md:grid-cols-[0.8fr_2.2fr] md:gap-16">
          {/* Table of contents */}
          <nav className="hidden md:block">
            <div className="sticky top-28 flex flex-col gap-1">
              <span className="mb-2 text-[0.78rem] font-semibold uppercase tracking-widest text-muted-foreground">
                On This Page
              </span>
              {sections.map((s) => (
                <button
                  key={s.id}
                  onClick={() => goToSection(s.id)}
                  className="rounded-lg px-3 py-2 text-left text-[0.88rem] text-muted-foreground transition-colors hover:bg-foreground/5 hover:text-blue-600"
                >
                  {s.title}
                </button>
              ))}
            </div>
          </nav>

          {/* Accordion sections */}
          <AccordionPrimitive.Root
            type="multiple"
            value={openItems}
            onValueChange={setOpenItems}
            className="flex flex-col gap-3"
          >
            {sections.map((s, i) => (
              <Reveal key={s.id} delay={(i % 4) * 0.05}>
                <AccordionPrimitive.Item
                  value={s.id}
                  id={`section-${s.id}`}
                  className="scroll-mt-28 overflow-hidden rounded-[1.5rem] border border-[rgba(10,10,10,0.08)] bg-[rgba(36,35,35,0.5)]"
                >
                  <AccordionPrimitive.Header>
                    <AccordionPrimitive.Trigger className="group flex w-full items-center justify-between gap-4 px-5 py-5 text-left md:px-6">
                      <span className="font-display text-[1.05rem] font-semibold text-foreground md:text-[1.15rem]">
                        {s.title}
                      </span>
                      <FaChevronDown className="h-3.5 w-3.5 flex-none text-muted-foreground transition-transform duration-300 group-data-[state=open]:rotate-180 group-data-[state=open]:text-blue-600" />
                    </AccordionPrimitive.Trigger>
                  </AccordionPrimitive.Header>
                  <AccordionPrimitive.Content className="overflow-hidden px-5 text-[0.94rem] leading-[1.75] text-muted-foreground transition-[height] duration-300 ease-out data-[state=closed]:h-0 data-[state=open]:h-(--radix-accordion-content-height) md:px-6">
                    <div className="pb-6">{s.body}</div>
                  </AccordionPrimitive.Content>
                </AccordionPrimitive.Item>
              </Reveal>
            ))}
          </AccordionPrimitive.Root>
        </div>
      </section>
    </div>
  );
}