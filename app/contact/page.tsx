"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  FaArrowRight,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaShieldAlt,
  FaMapMarkedAlt,
  FaBolt,
} from "react-icons/fa";
import ContactForm from "@/app/contact/_components/contact-form";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function ArrowCta({
  href,
  label,
  className = "",
}: {
  href: string;
  label: string;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`w-fit inline-flex items-center cursor-pointer rounded-2xl z-0 group pl-1 py-1.5 pr-4 gap-3 bg-blue-600 hover:bg-blue-700 active:scale-95 h-12 transition-all duration-300 ease-out ${className}`}
    >
      <div className="flex justify-start items-center">
        <div className="flex justify-center items-center size-10 flex-none rounded-xl bg-white">
          <div
            className="-rotate-45 group-hover:rotate-0 transition-transform duration-300 ease-in-out text-blue-600"
            style={{ fontSize: "1rem", position: "relative" }}
          >
            <FaArrowRight />
          </div>
        </div>
      </div>
      <span className="text-base leading-[1.2] font-medium text-center text-white">
        {label}
      </span>
    </Link>
  );
}

// Same warm radial-glow decoration used across the site, just dialed back
// slightly so it stays subtle against a light background instead of dark.
const BG_GLOW =
  "pointer-events-none absolute inset-0 -z-10 [background:radial-gradient(circle_at_10%_10%,rgba(255,205,112,0.22),transparent_38%),radial-gradient(circle_at_90%_20%,rgba(255,184,142,0.18),transparent_40%)]";

const contactInfo = [
  {
    icon: FaPhoneAlt,
    label: "Call Us",
    value: "+233 24 000 0000",
    href: "tel:+233240000000",
  },
  {
    icon: FaEnvelope,
    label: "Email Us",
    value: "info@megaresourcesltd.com",
    href: "mailto:info@megaresourcesltd.com",
  },
  {
    icon: FaMapMarkerAlt,
    label: "Head Office",
    value: "Takoradi, Western Region, Ghana",
    href: undefined,
  },
  {
    icon: FaClock,
    label: "Working Hours",
    value: "Mon – Sat, 8:00am – 6:00pm",
    href: undefined,
  },
];

const promises = [
  {
    icon: FaShieldAlt,
    title: "Free Site Survey",
    desc: "No obligation, no charge, until you decide to move forward.",
  },
  {
    icon: FaBolt,
    title: "24-Hour Response",
    desc: "We get back to every enquiry within one business day.",
  },
  {
    icon: FaMapMarkedAlt,
    title: "Ghana-Wide Coverage",
    desc: "Crews and equipment reach all ten regions of the country.",
  },
];

export default function ContactPage() {
  return (
    <div className="w-full bg-background/20">
      {/* ---------------------------------------------------------- HERO */}
      <div className={BG_GLOW} />
      <section className="relative overflow-hidden px-5 pb-16 pt-32 md:px-10 md:pb-20 md:pt-40">
        <div className={BG_GLOW} />
        <div className="mx-auto w-[min(100%,76rem)]">
          <Reveal>
            <div className="inline-flex items-center gap-[0.45rem] rounded-full border border-neutral-200 bg-white px-[0.8rem] py-[0.45rem] text-[0.85rem] font-semibold uppercase tracking-[0.12em] text-neutral-600 shadow-[0_8px_20px_rgba(15,23,42,0.05)]">
              Contact
            </div>
          </Reveal>

          <Reveal delay={0.08} className="mt-6 max-w-3xl">
            <h1 className="font-display text-[2.25rem] font-semibold leading-[1.1] tracking-tight text-foreground md:text-[3.5rem]">
              Let&apos;s talk about{" "}
              <span className="text-neutral-400">your water problem.</span>
            </h1>
          </Reveal>

          <Reveal delay={0.16} className="mt-6 max-w-2xl">
            <p className="text-[1.05rem] leading-[1.75] text-neutral-400">
              Whether you&apos;re planning a new borehole or dealing with
              one that&apos;s stopped delivering, tell us what&apos;s going
              on and we&apos;ll get back to you — usually within 24 hours.
            </p>
          </Reveal>
        </div>
      </section>

      {/* --------------------------------------------- FORM + CONTACT INFO */}
      <section className="relative overflow-hidden px-5 pb-16 md:px-10 md:pb-20">
        <div className="mx-auto grid w-[min(100%,76rem)] gap-10 md:grid-cols-[1.1fr_0.9fr] md:gap-16">
          <Reveal>
            <div className="rounded-[2rem] border border-neutral-200 bg-neutral-100 p-6 shadow-[0_18px_50px_rgba(15,23,42,0.05)] md:p-10">
              <span className="text-[0.8rem] font-semibold uppercase tracking-[0.12em] text-neutral-400">
                Send a Message
              </span>
              <h2 className="mt-3 font-display text-xl font-semibold text-neutral-900 md:text-2xl">
                Tell us about your land
              </h2>
              <div className="mt-8">
                <ContactForm />
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="flex flex-col gap-6">
            <div>
              <span className="text-[0.8rem] font-semibold uppercase tracking-[0.12em] text-foreground">
                Get In Touch
              </span>
              <h2 className="mt-3 font-display text-xl font-semibold text-foreground/80 md:text-2xl">
                Prefer to talk directly?
              </h2>
            </div>

            <div className="flex flex-col divide-y divide-neutral-300 rounded-[1.5rem] border border-neutral-200 bg-neutral-100">
              {contactInfo.map((item) => {
                const Icon = item.icon;
                const content = (
                  <div className="flex items-center gap-4 px-5 py-5">
                    <span className="flex h-11 w-11 flex-none items-center justify-center rounded-full bg-white text-blue-600 shadow-[0_6px_18px_rgba(15,23,42,0.06)]">
                      <Icon className="h-4 w-4" />
                    </span>
                    <div>
                      <p className="text-[0.78rem] uppercase tracking-[0.08em] text-neutral-400">
                        {item.label}
                      </p>
                      <p className="mt-0.5 text-[0.95rem] font-medium text-neutral-800">
                        {item.value}
                      </p>
                    </div>
                  </div>
                );
                return item.href ? (
                  <a
                    key={item.label}
                    href={item.href}
                    className="transition-colors hover:bg-white first:rounded-t-[1.5rem] shadow hover:shadow-sm"
                  >
                    {content}
                  </a>
                ) : (
                  <div key={item.label}>{content}</div>
                );
              })}
            </div>

            <div className="flex flex-col gap-4 rounded-[1.5rem] bg-neutral-900 p-6">
              <p className="text-[0.95rem] leading-[1.65] text-neutral-300">
                Need something urgent? Skip the form and call us directly —
                our team picks up during working hours, every day but
                Sunday.
              </p>
              <ArrowCta href="tel:+233240000000" label="Call Now" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ------------------------------------------------------ PROMISES */}
      <section className="relative overflow-hidden bg-neutral-50 px-5 py-16 md:px-10 md:py-20">
        <div className="mx-auto w-[min(100%,76rem)]">
          <div className="grid gap-4 sm:grid-cols-3">
            {promises.map((p, i) => {
              const Icon = p.icon;
              return (
                <Reveal key={p.title} delay={(i % 3) * 0.06}>
                  <div className="flex h-full flex-col gap-3 rounded-[1.5rem] border border-neutral-200 bg-white p-6">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-600/10 text-blue-600">
                      <Icon className="h-4.5 w-4.5" />
                    </span>
                    <h3 className="font-display text-base font-semibold text-neutral-900">
                      {p.title}
                    </h3>
                    <p className="text-[0.9rem] leading-[1.6] text-neutral-500">
                      {p.desc}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------ CTA */}
      <section className="px-5 pb-24 pt-16 md:px-10 md:pt-20">
        <Reveal className="mx-auto w-[min(100%,76rem)]">
          <div className="relative overflow-hidden rounded-[2rem] bg-neutral-900 px-8 py-14 text-center md:px-16 md:py-20">
            <div className="pointer-events-none absolute inset-0 opacity-60 [background:radial-gradient(circle_at_top,rgba(255,184,142,0.18),transparent_55%)]" />
            <div className="relative flex flex-col items-center gap-5">
              <h2 className="max-w-xl font-display text-2xl font-semibold text-white md:text-3xl">
                Not ready to write it all out?
              </h2>
              <p className="max-w-lg text-[0.98rem] leading-[1.7] text-neutral-300">
                Book a free site visit and survey instead — we&apos;ll
                confirm depth, yield, and cost before you decide anything.
              </p>
              <ArrowCta href="/quote" label="Get a Free Survey" className="mt-2" />
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}