"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { FaPhoneAlt, FaWhatsapp, FaChevronDown } from "react-icons/fa";
import { ArrowCta } from "@/components/motion-kit";

const steps = [
  { num: "01", title: "We review your request", desc: "Usually within a few hours on a business day." },
  { num: "02", title: "Free site visit & survey", desc: "We confirm depth, yield, and access — no charge." },
  { num: "03", title: "Written, fixed quote", desc: "One number, in writing, before any deposit." },
  { num: "04", title: "You decide", desc: "No pressure, no expiry games. It's your call." },
];

const faqs = [
  {
    q: "Why isn't there a price on this page?",
    a: "Depth, soil type, and site access all change the cost, sometimes significantly. A number without a survey would just be a guess — and we'd rather give you a real one, in writing, after we've actually seen your land.",
  },
  {
    q: "Is the site survey really free?",
    a: "Yes. There's no charge and no obligation for the survey itself. You only pay if you decide to move forward with drilling.",
  },
  {
    q: "How soon can someone visit my site?",
    a: "Typically within a few days of your request, depending on your region and our current schedule.",
  },
];

export default function QuoteSidebar() {
  return (
    <div className="flex flex-col gap-6">
      <div className="rounded-[1.5rem] border border-[rgba(10,10,10,0.08)] bg-[rgba(36,35,35,0.5)] p-6">
        <span className="text-[0.75rem] font-semibold uppercase tracking-widest text-muted-foreground">
          What Happens Next
        </span>
        <div className="mt-5 flex flex-col gap-5">
          {steps.map((s) => (
            <div key={s.num} className="flex gap-4">
              <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full border border-[rgba(10,10,10,0.1)] text-[0.75rem] font-semibold text-foreground">
                {s.num}
              </span>
              <div>
                <p className="text-[0.9rem] font-medium text-foreground">{s.title}</p>
                <p className="mt-0.5 text-[0.8rem] leading-relaxed text-muted-foreground">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-[1.5rem] border border-[rgba(10,10,10,0.08)] bg-[rgba(36,35,35,0.5)] p-6">
        <span className="text-[0.75rem] font-semibold uppercase tracking-widest text-muted-foreground">
          Quick Questions
        </span>
        <Accordion.Root type="single" collapsible className="mt-4">
          {faqs.map((f, i) => (
            <Accordion.Item
              key={f.q}
              value={`item-${i}`}
              className="border-b border-[rgba(10,10,10,0.08)] last:border-b-0"
            >
              <Accordion.Trigger className="group flex w-full items-center justify-between gap-4 py-4 text-left text-[0.86rem] font-medium text-foreground outline-none">
                {f.q}
                <FaChevronDown className="h-2.5 w-2.5 flex-none text-muted-foreground transition-transform duration-300 group-data-[state=open]:rotate-180" />
              </Accordion.Trigger>
              <Accordion.Content className="overflow-hidden text-[0.82rem] leading-relaxed text-muted-foreground data-[state=open]:pb-4 data-[state=open]:animate-in data-[state=open]:fade-in data-[state=closed]:animate-out data-[state=closed]:fade-out">
                {f.a}
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </div>

      <div className="flex flex-col gap-4 rounded-[1.5rem] bg-foreground/80 p-6">
        <p className="text-[0.9rem] leading-relaxed text-primary-foreground/80">
          Prefer to skip the form? Reach us directly and we'll take your
          details over the phone.
        </p>
        <div className="flex flex-wrap gap-3">
          <ArrowCta href="tel:+233240000000" label="Call Now" />
          <a
            href="https://wa.me/233240000000"
            className="inline-flex h-12 items-center gap-2.5 rounded-2xl border border-white/60 px-5 text-[0.9rem] font-medium text-primary-foreground transition-colors hover:bg-white/10"
          >
            <FaWhatsapp className="h-4 w-4" />
            WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}