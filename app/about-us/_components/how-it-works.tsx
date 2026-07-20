"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FaMapMarkerAlt,
  FaHardHat,
  FaFaucet,
  FaCertificate,
} from "react-icons/fa";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const steps = [
  {
    num: "01",
    title: "Free Site Visit & Survey",
    desc: "We come to your land and run a geophysical survey to confirm water depth, expected yield, and total cost — before you commit to anything. No obligation, no charge, until you say go.",
    icon: FaMapMarkerAlt,
  },
  {
    num: "02",
    title: "Drilling & Casing",
    desc: "Once you approve the survey, drilling begins. Most jobs take 2–4 days. Every hole is cased with certified PVC pipe so it stays structurally sound for decades, not just years.",
    icon: FaHardHat,
  },
  {
    num: "03",
    title: "Pump & Tank Installation",
    desc: "We install your pump and storage system on site, then test both flow rate and water quality ourselves — before we consider the job finished, not after you've already paid in full.",
    icon: FaFaucet,
  },
  {
    num: "04",
    title: "Handover & Warranty",
    desc: "We walk you through running and maintaining your system, hand over documentation, and back the work with a 2-year warranty. After that, we're still one call away.",
    icon: FaCertificate,
  },
];

const timelineStops = [
  { day: "Day 1–3", label: "Survey", fraction: 3 / 14 },
  { day: "Day 4–7", label: "Drilling", fraction: 7 / 14 },
  { day: "Day 8–14", label: "Water", fraction: 14 / 14 },
];

const BG_GLOW =
  "pointer-events-none absolute inset-0 -z-10 [background:radial-gradient(circle_at_10%_10%,rgba(255,205,112,0.16),transparent_38%),radial-gradient(circle_at_90%_20%,rgba(255,184,142,0.14),transparent_40%)]";

function fadeUpProps(delay = 0) {
  return {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
  };
}

export default function HowItWorks() {
  const trackRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const markerRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const fill = fillRef.current;
    const markers = markerRefs.current;
    if (!fill || !trackRef.current) return;

    gsap.set(fill, { scaleX: 0 });
    gsap.set(markers, { opacity: 0.25, scale: 0.85 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: trackRef.current,
        start: "top 80%",
        end: "top 20%",
        scrub: 0.6,
      },
    });

    tl.to(fill, { scaleX: 1, ease: "none", duration: 1 }, 0);

    timelineStops.forEach((stop, i) => {
      tl.to(
        markers[i],
        { opacity: 1, scale: 1, duration: 0.001, ease: "none" },
        Math.max(stop.fraction - 0.02, 0)
      );
    });

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  return (
    <section className="relative overflow-hidden bg-background/90 px-5 py-16 md:px-10 md:py-24">
      <div className={BG_GLOW} />
      <div className="mx-auto w-[min(100%,76rem)]">
        <motion.div className="max-w-2xl" {...fadeUpProps()}>
          <span className="text-[0.8rem] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
            How It Works
          </span>
          <h2 className="mt-4 font-display text-[1.9rem] font-semibold leading-[1.2] tracking-tight text-foreground md:text-[2.5rem]">
            What happens after you call us
          </h2>
          <p className="mt-4 text-[1.02rem] leading-[1.75] text-muted-foreground">
            Not knowing what comes next is the most stressful part of any
            home project — and it's exactly where most drilling jobs in
            Ghana go wrong. Here's the whole process, start to finish, in
            four steps. No vague timelines, no contractor who disappears
            after the deposit.
          </p>
        </motion.div>

        {/* --------------------------------------------------- 4 STEPS */}
        <div className="mt-12 grid gap-4 md:grid-cols-2 md:gap-6">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.num}
                {...fadeUpProps((i % 2) * 0.08)}
                className="flex flex-col gap-4 rounded-[1.5rem] border border-[rgba(10,10,10,0.08)] bg-[rgba(36,35,35,0.5)] p-6 md:p-7"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 flex-none items-center justify-center rounded-full bg-blue-600/10">
                    <Icon className="h-4.5 w-4.5 text-blue-600" />
                  </div>
                  <span className="font-display text-sm font-semibold text-blue-600">
                    Step {step.num}
                  </span>
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground md:text-xl">
                  {step.title}
                </h3>
                <p className="text-[0.92rem] leading-[1.65] text-muted-foreground">
                  {step.desc}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* --------------------------------------------------- TIMELINE */}
        <motion.div className="mt-16" {...fadeUpProps(0.1)}>
          <p className="mb-8 text-[0.98rem] font-semibold text-foreground">
            From first call to running water in as little as two weeks.
          </p>

          <div ref={trackRef} className="relative">
            <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-foreground/10">
              <div
                ref={fillRef}
                className="h-full w-full origin-left rounded-full bg-blue-600"
              />
            </div>

            <div className="relative mt-4 flex justify-between">
              {timelineStops.map((stop, i) => (
                <div
                  key={stop.day}
                  ref={(el) => {
                    if (el) markerRefs.current[i] = el;
                  }}
                  className={`flex flex-col gap-1 ${
                    i === 0
                      ? "items-start text-left"
                      : i === timelineStops.length - 1
                      ? "items-end text-right"
                      : "items-center text-center"
                  }`}
                >
                  <span className="font-display text-sm font-semibold text-foreground md:text-base">
                    {stop.day}
                  </span>
                  <span className="text-[0.82rem] uppercase tracking-widest text-muted-foreground">
                    {stop.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}