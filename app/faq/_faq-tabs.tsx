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
    q: "How long has Mega Resources LTD been in business?",
    a: "We've been surveying, drilling, and commissioning boreholes across Ghana for over 15 years, working with homes, farms, schools, and businesses in ten regions.",
  },
  {
    q: "Are you licensed to drill boreholes in Ghana?",
    a: "Yes. We operate as a registered drilling contractor and carry out abstraction and drilling work in line with Ghana's Water Resources Commission requirements. We can provide documentation on request.",
  },
  {
    q: "Can I see reviews from past clients?",
    a: "Yes — our reviews page carries feedback directly from past clients, including their service, location, and rating. Published reviews are approved by the team before they appear publicly.",
  },
  {
    q: "What happens if the borehole doesn't perform as expected?",
    a: "If a borehole does not perform as expected, we assess the issue and advise on the most suitable next step based on the site conditions, drilling results, and installation details. In some cases, additional work or corrective measures may be required to improve performance.",
  },
  {
    q: "Are your drillers and technicians trained?",
    a: "Yes. Our drilling crews, pump technicians, and site surveyors are trained on our equipment and processes, and our senior staff have years of field experience across different soil and rock conditions found in Ghana.",
  },
  {
    q: "How do I know you won't just disappear after I pay?",
    a: "We have offices in Accra, Takoradi, and Kumasi, so you can reach us in person. Our initial survey comes at a token cost, and you don't pay the full project amount upfront — 70% is paid before drilling, with the remaining 30% due after completion. We also issue an official receipt for every payment",
  },
];

const processFaqs: QA[] = [
  {
    q: "What happens after I call or submit a quote request?",
    a: "We arrange a site visit and geophysical survey to assess the ground conditions, water depth, and likely yield before drilling. The survey comes at a token cost, and the findings help us determine the right approach and give you a clearer project estimate before you decide to proceed.",
  },
  {
    q: "How long does the whole process take, start to finish?",
    a: "The timeline depends on the site, drilling depth, ground conditions, and the work required. After the survey, we'll explain the expected timeline for drilling, casing, testing, and pump installation before work begins.",
  },
  {
    q: "Do I need to be present during drilling?",
    a: "Not for every step, but we recommend being available for the initial survey and at handover. This gives you the opportunity to ask questions, review the completed work, and make sure the system is working as expected.",
  },
  {
    q: "What forms of payment do you accept, and when is payment due?",
    a: "We accept mobile money and bank transfer. The payment structure is straightforward: 70% of the total project cost is paid before drilling begins, and the remaining 30% is paid after the work is completed. We issue a receipt for every payment.",
  },
  {
    q: "Can I reschedule or cancel after booking a survey?",
    a: "Yes. Contact us as early as possible if you need to reschedule. The survey is a separate initial step, so you can review the survey findings before deciding whether to proceed with the full drilling project.",
  },
  {
    q: "What areas of Ghana do you cover?",
    a: "We serve clients across Ghana, with offices in Accra, Takoradi, and Kumasi. If you're unsure whether we cover your specific location, contact us when requesting your quote and we'll confirm.",
  },
  {
    q: "What happens if you don't find water on my land?",
    a: "That's one of the reasons we carry out the survey before drilling. The survey helps assess whether the site is suitable for groundwater development. If the findings indicate that drilling is unlikely to be successful, we'll explain the results before you commit to drilling.",
  },
];

const industryFaqs: QA[] = [
  {
    q: "Do I (as a Client) need a permit to drill a borehole in Ghana?",
    a: "No. As a client, you do not need to obtain a permit yourself before drilling your borehole. We handle the drilling process and the necessary requirements for the work, so you can focus on getting your water system installed.",
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
    a: "A borehole can run dry or experience reduced water yield over time, depending on the groundwater conditions and the amount of water available underground. However, your borehole does not directly affect neighbouring boreholes. Our survey and testing process helps us assess the groundwater conditions and determine the most suitable approach for your site.",
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

const specializedServiceFaqs: QA[] = [
  {
    q: "What is piezometer drilling used for?",
    a: "Piezometers are installed to monitor groundwater levels and pressure at specific depths. They are useful for groundwater investigations, construction projects, dewatering monitoring, and other situations where understanding groundwater conditions over time is important.",
  },
  {
    q: "What are observation wells used for?",
    a: "Observation wells are designed to monitor groundwater levels and changes over time. They can be used for groundwater investigations, construction and dewatering projects, and ongoing monitoring where regular measurements are required.",
  },
  {
    q: "What are dewatering wells?",
    a: "Dewatering wells are drilled and equipped to remove groundwater from an area where water levels need to be controlled, such as construction sites, excavations, and other projects affected by groundwater. We assess the site conditions before determining the appropriate drilling and pumping approach.",
  },
  {
    q: "What is horizontal drain drilling?",
    a: "Horizontal drain drilling creates drainage paths through the ground to help control or relieve groundwater in areas such as slopes, excavations, and other sites where conventional vertical wells may not be suitable. The approach depends on the site's geology, groundwater conditions, and drainage requirements.",
  },
  {
    q: "Do you only drill boreholes for water supply?",
    a: "No. While borehole drilling and water-supply systems are an important part of our work, we also provide groundwater monitoring, observation wells, piezometer drilling, dewatering wells, horizontal drain drilling, pumping tests, water quality analysis, and other specialized groundwater services.",
  },
  {
    q: "Can you help with groundwater monitoring for a construction project?",
    a: "Yes. We provide services such as piezometer drilling, observation wells, pumping tests, and dewatering wells to help assess and monitor groundwater conditions during construction and other projects. The appropriate solution depends on the site's geology, groundwater conditions, and project requirements.",
  },
];

const categories = [
  { value: "trust", label: "About Us & Trust", items: trustFaqs },
  { value: "process", label: "Our Process", items: processFaqs },
  { value: "industry", label: "Drilling in Ghana", items: industryFaqs },
  { value: "specialized", label: "Specialized Services", items: specializedServiceFaqs, },
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
            className="overflow-hidden rounded-[1.5rem] border border-neutral-200 bg-neutral-100 shadow-[0_18px_50px_rgba(15,23,42,0.05)]"
          >
            <AccordionPrimitive.Header>
              <AccordionPrimitive.Trigger className="group flex w-full items-center justify-between gap-4 px-5 py-5 text-left md:px-6">
                <span className="font-display text-base tracking-wider font-semibold text-neutral-900 md:text-[1.05rem]">
                  {item.q}
                </span>
                <FaChevronDown className="h-3.5 w-3.5 flex-none text-neutral-400 transition-transform duration-300 group-data-[state=open]:rotate-180 group-data-[state=open]:text-blue-600" />
              </AccordionPrimitive.Trigger>
            </AccordionPrimitive.Header>
            <AccordionPrimitive.Content className="overflow-hidden px-5 text-sm md:text-base tracking-wide leading-[1.7] text-neutral-500 transition-[height] duration-300 ease-out data-[state=closed]:h-0 data-[state=open]:h-(--radix-accordion-content-height) md:px-6">
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
                className="rounded-full border border-neutral-200 bg-neutral-100 px-5 py-2.5 text-[0.85rem] font-medium text-neutral-600 transition-colors hover:text-blue-600 data-[state=active]:border-transparent data-[state=active]:bg-blue-600 data-[state=active]:text-white"
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
