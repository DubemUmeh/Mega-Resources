"use client";

import { useState } from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { FaChevronDown } from "react-icons/fa";
import { Reveal, BG_GLOW } from "@/components/motion-kit";

interface QA {
  q: string;
  a: string;
}

const trustFaqs: QA[] = [
  {
    q: "How long has [Company Name] been in business?",
    a: "We've been surveying, drilling, and commissioning boreholes across Ghana for over 15 years, working with homes, farms, schools, and businesses in ten regions.",
  },
  {
    q: "Are you licensed to drill boreholes in Ghana?",
    a: "Yes. We operate as a registered drilling contractor and carry out abstraction and drilling work in line with Ghana's Water Resources Commission requirements. We can provide documentation on request.",
  },
  {
    q: "Do you carry insurance or liability coverage?",
    a: "Yes, our drilling operations are covered by liability insurance. If you'd like details for your own records, ask your project coordinator before work begins.",
  },
  {
    q: "Can I see reviews from past clients?",
    a: "Yes — our reviews page carries feedback directly from past clients, including their service, location, and rating. Many are marked as verified, meaning we've confirmed they were an actual completed project.",
  },
  {
    q: "What happens if the borehole doesn't perform as expected?",
    a: "Every job is backed by a 2-year warranty. If yield drops or something isn't working as it should within that period, our rehabilitation service investigates and corrects it at no extra cost, provided the issue isn't due to misuse.",
  },
  {
    q: "Are your drillers and technicians trained?",
    a: "Yes. Our drilling crews, pump technicians, and site surveyors are trained on our equipment and processes, and our senior staff have years of field experience across different soil and rock conditions found in Ghana.",
  },
  {
    q: "How do I know you won't just disappear after I pay?",
    a: "Because the deposit only covers the survey — the balance is tied to completed, verified milestones (drilling, casing, pump installation), and the job isn't considered finished until you've been trained on the system and handed your warranty documentation.",
  },
];

const processFaqs: QA[] = [
  {
    q: "What happens after I call or submit a quote request?",
    a: "We schedule a free site visit and geophysical survey to confirm water depth, likely yield, and total cost. There's no obligation and no charge at this stage — you decide whether to proceed once you have the numbers.",
  },
  {
    q: "How long does the whole process take, start to finish?",
    a: "Most residential projects run about two weeks from the first call to running water: 1–3 days for the survey, 4–7 days for drilling and casing, and the remaining days for pump installation, testing, and handover.",
  },
  {
    q: "Do I need to be present during drilling?",
    a: "Not for every step — but we recommend being present, or having someone represent you, at the start of the survey and at handover, so you can ask questions and confirm everything works as expected.",
  },
  {
    q: "What forms of payment do you accept, and when is payment due?",
    a: "We accept mobile money and bank transfer. Payment is staged: a deposit for the survey, then payments tied to drilling completion and pump installation, with the balance due at handover.",
  },
  {
    q: "Can I reschedule or cancel after booking a survey?",
    a: "Yes, as long as you give reasonable notice. Since the survey carries no obligation, you're free to decide not to proceed after seeing the results, without any further cost.",
  },
  {
    q: "What areas of Ghana do you cover?",
    a: "We work across ten regions, including Greater Accra, Ashanti, Northern, and Western. If you're unsure whether we reach your area, ask when you request your quote.",
  },
  {
    q: "What happens if you don't find water on my land?",
    a: "This is exactly why the survey happens first. If the survey shows your land isn't a good candidate, we tell you before any drilling starts, so you're never paying to find that out the hard way.",
  },
];

const industryFaqs: QA[] = [
  {
    q: "Do I need a permit to drill a borehole in Ghana?",
    a: "In most cases, yes — groundwater abstraction in Ghana is regulated by the Water Resources Commission, and a permit is generally required before drilling, particularly for anything beyond small-scale domestic use. Requirements can vary by region and intended use, so it's worth confirming your specific case with the Commission or a contractor familiar with local requirements.",
  },
  {
    q: "Who regulates borehole drilling and groundwater use in Ghana?",
    a: "The Water Resources Commission is the primary body responsible for groundwater regulation and abstraction permits. Depending on the project's scale, the Environmental Protection Agency (EPA) may also be involved, particularly for larger or commercial developments.",
  },
  {
    q: "How deep do boreholes typically need to be in Ghana?",
    a: "It varies significantly by region and underlying geology — coastal and sedimentary areas often yield water at shallower depths, while basement/crystalline rock areas common in parts of the Ashanti and Northern regions may need deeper drilling. This is exactly what a geophysical survey is for: confirming depth for your specific land rather than guessing based on regional averages.",
  },
  {
    q: "How much does it cost to drill a borehole in Ghana?",
    a: "Cost depends on depth, geology (harder rock takes longer and costs more to drill through), casing requirements, pump type, and whether hydro-fracturing or additional development work is needed. Any reputable company should give you a written, itemized quote after a survey — be cautious of a fixed low price quoted before anyone has actually surveyed your land.",
  },
  {
    q: "Is borehole water in Ghana safe to drink without treatment?",
    a: "Not automatically. Groundwater quality varies by location and can contain iron, bacteria, or excess hardness. We recommend lab testing every new borehole and installing filtration where the results call for it, rather than assuming it's safe by default.",
  },
  {
    q: "How much land do I need to drill a borehole?",
    a: "There's no strict minimum, but there are practical and regulatory considerations — rig access, distance from septic tanks or soakaways (to avoid contamination), and, in some areas, minimum distances from neighboring boreholes or wells. A site visit will tell you whether your specific plot works.",
  },
  {
    q: "Can a borehole run dry, and can it affect neighboring wells?",
    a: "Yes, both are possible, particularly with poor siting, over-abstraction, or drilling in an already heavily-used aquifer. This is one of the main reasons proper surveys and, in some cases, permits exist — to protect both your investment and the shared groundwater supply nearby.",
  },
  {
    q: "How long does a borehole last, and what maintenance does it need?",
    a: "A properly cased and constructed borehole can last 20+ years with basic upkeep. Pumps have shorter lifespans and may need servicing or replacement sooner. Periodic checks on yield and water quality are worth doing even if nothing seems wrong.",
  },
  {
    q: "Does the dry season affect borehole water supply?",
    a: "It can, particularly for shallow boreholes or those drawing from a limited aquifer. A borehole drilled to a depth confirmed by a proper survey is generally far more resilient across seasons than one drilled based on guesswork or a fixed 'standard' depth.",
  },
];

const categories = [
  { value: "trust", label: "About Us & Trust", items: trustFaqs },
  { value: "process", label: "Our Process", items: processFaqs },
  { value: "industry", label: "Drilling in Ghana", items: industryFaqs },
];

function FaqAccordion({ items }: { items: QA[] }) {
  const [openItems, setOpenItems] = useState<string[]>(["0"]);

  return (
    <AccordionPrimitive.Root
      type="multiple"
      value={openItems}
      onValueChange={setOpenItems}
      className="flex flex-col gap-3"
    >
      {items.map((item, i) => (
        <Reveal key={item.q} delay={(i % 4) * 0.05}>
          <AccordionPrimitive.Item
            value={String(i)}
            className="overflow-hidden rounded-[1.5rem] border border-[rgba(10,10,10,0.08)] bg-[rgba(36,35,35,0.5)]"
          >
            <AccordionPrimitive.Header>
              <AccordionPrimitive.Trigger className="group flex w-full items-center justify-between gap-4 px-5 py-5 text-left md:px-6">
                <span className="font-display text-[1rem] font-semibold text-foreground md:text-[1.05rem]">
                  {item.q}
                </span>
                <FaChevronDown className="h-3.5 w-3.5 flex-none text-muted-foreground transition-transform duration-300 group-data-[state=open]:rotate-180 group-data-[state=open]:text-blue-600" />
              </AccordionPrimitive.Trigger>
            </AccordionPrimitive.Header>
            <AccordionPrimitive.Content className="overflow-hidden px-5 text-[0.92rem] leading-[1.7] text-muted-foreground transition-[height] duration-300 ease-out data-[state=closed]:h-0 data-[state=open]:h-(--radix-accordion-content-height) md:px-6">
              <p className="pb-6">{item.a}</p>
            </AccordionPrimitive.Content>
          </AccordionPrimitive.Item>
        </Reveal>
      ))}
    </AccordionPrimitive.Root>
  );
}

export function FaqTabs() {
  return (
    <section className="relative overflow-hidden bg-background/90 px-5 py-16 md:px-10 md:py-20">
      <div className={BG_GLOW} />
      <div className="mx-auto w-[min(100%,76rem)]">
        <TabsPrimitive.Root defaultValue="trust">
          <TabsPrimitive.List className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <TabsPrimitive.Trigger
                key={cat.value}
                value={cat.value}
                className="rounded-full border border-[rgba(10,10,10,0.08)] bg-[rgba(36,35,35,0.5)] px-5 py-2.5 text-[0.85rem] font-medium text-muted-foreground transition-colors data-[state=active]:border-transparent data-[state=active]:bg-blue-600 data-[state=active]:text-white"
              >
                {cat.label}
              </TabsPrimitive.Trigger>
            ))}
          </TabsPrimitive.List>

          {categories.map((cat) => (
            <TabsPrimitive.Content key={cat.value} value={cat.value} className="mt-10">
              <FaqAccordion items={cat.items} />
            </TabsPrimitive.Content>
          ))}
        </TabsPrimitive.Root>
      </div>
    </section>
  );
}