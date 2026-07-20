"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import {
  Droplets,
  Gauge,
  Layers,
  MapPin,
  RefreshCcw,
  Wrench,
  CheckCircle2,
  type LucideIcon,
} from "lucide-react";

interface ProcessStep {
  num: string;
  label: string;
  desc: string;
  img: string;
  icon: LucideIcon;
}

const processSteps: ProcessStep[] = [
  {
    num: "01",
    label: "Geological Survey",
    desc: "We map subsurface geology to pinpoint where water actually is before any drilling starts.",
    img: "/images/home/geological-surveys.png",
    icon: MapPin,
  },
  {
    num: "02",
    label: "Borehole Drilling",
    desc: "Rigs cut through rock and soil to the confirmed depth, on the exact spot the survey identified.",
    img: "/images/home/borehole-drilling.jpeg",
    icon: Layers,
  },
  {
    num: "03",
    label: "Borehole Development",
    desc: "The hole is cleared of drilling debris and cased so it won't collapse under pressure.",
    img: "/images/home/air-lifting.png",
    icon: RefreshCcw,
  },
  {
    num: "04",
    label: "Pumping Test",
    desc: "We measure sustainable yield so every piece of equipment downstream is sized correctly.",
    img: "/images/home/pumping-tests.png",
    icon: Gauge,
  },
  {
    num: "05",
    label: "Pump Installation",
    desc: "A submersible, solar, or surface pump is fitted, wired, and tested on site.",
    img: "/images/home/pump-installation.png",
    icon: Wrench,
  },
  {
    num: "06",
    label: "Water Supply System",
    desc: "Piping and storage are connected so the borehole is ready for day-to-day use.",
    img: "/images/home/hydro-fracturing.png",
    icon: Droplets,
  },
  {
    num: "07",
    label: "Rehabilitation & Maintenance",
    desc: "We check back over time to keep yield, pressure, and equipment performing.",
    img: "/images/home/borehole-rehabilitation.png",
    icon: CheckCircle2,
  },
];

const BG_GLOW =
  "pointer-events-none absolute inset-0 -z-10 [background:radial-gradient(circle_at_10%_10%,rgba(255,205,112,0.16),transparent_38%),radial-gradient(circle_at_90%_20%,rgba(255,184,142,0.14),transparent_40%)]";

// Wheel-picker tuning: how tall each row is, and how many rows worth of
// vertical space the viewport window shows before rows fade to nothing.
const ROW_HEIGHT = 64;
const VISIBLE_ROWS = 5;

function WheelItem({
  step,
  index,
  continuousIndex,
  onClick,
}: {
  step: ProcessStep;
  index: number;
  continuousIndex: MotionValue<number>;
  onClick: () => void;
}) {
  const opacity = useTransform(continuousIndex, (v) => {
    const d = Math.abs(index - v);
    return Math.max(0, 1 - d * 0.45);
  });
  const scale = useTransform(continuousIndex, (v) => {
    const d = Math.abs(index - v);
    return Math.max(0.72, 1 - d * 0.28);
  });
  const blur = useTransform(continuousIndex, (v) => {
    const d = Math.abs(index - v);
    return `blur(${Math.min(d, 2) * 1.5}px)`;
  });

  return (
    <motion.div
      onClick={onClick}
      style={{ height: ROW_HEIGHT, opacity, scale, filter: blur }}
      className="flex cursor-pointer items-center justify-center gap-3"
    >
      <span className="font-display text-sm font-semibold text-blue-600">
        {step.num}
      </span>
      <span className="font-display text-xl font-semibold text-foreground md:text-2xl">
        {step.label}
      </span>
    </motion.div>
  );
}

export default function ProcessSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const index = Math.min(
      processSteps.length - 1,
      Math.max(0, Math.floor(v * processSteps.length))
    );
    setActive(index);
  });

  // Continuous (fractional) position through the steps — drives the wheel's
  // smooth per-pixel motion, as opposed to `active`, which snaps to whole
  // steps and drives the image/description swaps.
  const continuousIndex = useTransform(scrollYProgress, [0, 1], [
    0,
    processSteps.length - 1,
  ]);
  const windowHeight = ROW_HEIGHT * VISIBLE_ROWS;
  const columnY = useTransform(
    continuousIndex,
    (v) => windowHeight / 2 - ROW_HEIGHT / 2 - v * ROW_HEIGHT
  );

  const scrollToStep = (i: number) => {
    const node = containerRef.current;
    if (!node) return;
    const containerTop = node.getBoundingClientRect().top + window.scrollY;
    const stepHeight = node.offsetHeight / processSteps.length;
    window.scrollTo({
      top: containerTop + stepHeight * i + stepHeight / 2,
      behavior: "smooth",
    });
  };

  return (
    <section
      ref={containerRef}
      className="relative px-5 md:h-[700vh] md:px-0"
    >
      {/* -------------------------------------------------- PINNED (md+) */}
      <div className="hidden md:sticky md:top-0 md:flex md:h-screen md:items-center md:overflow-hidden md:px-10">
        <div className={BG_GLOW} />
        <div className="mx-auto grid w-[min(100%,76rem)] gap-16 md:grid-cols-[1fr_1fr] md:items-center">
          {/* left: step list */}
          <div>
            <span className="text-[0.8rem] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
              How It Works
            </span>
            <h2 className="mt-4 font-display text-[1.9rem] font-semibold leading-[1.15] tracking-tight text-foreground md:text-[2.5rem]">
              Our complete service process
            </h2>

            <div
              className="relative mt-10 overflow-hidden mask-[linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)]"
              style={{ height: windowHeight }}
            >
              <motion.div
                style={{ y: columnY }}
                className="absolute inset-x-0 top-0"
              >
                {processSteps.map((step, i) => (
                  <WheelItem
                    key={step.num}
                    step={step}
                    index={i}
                    continuousIndex={continuousIndex}
                    onClick={() => scrollToStep(i)}
                  />
                ))}
              </motion.div>
            </div>

            <div className="relative mt-6 h-16 max-w-sm overflow-hidden text-center">
              <AnimatePresence mode="wait">
                <motion.p
                  key={processSteps[active].num}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-x-0 text-[0.92rem] leading-[1.6] text-muted-foreground"
                >
                  {processSteps[active].desc}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>

          {/* right: pinned crossfading image */}
          <div className="relative aspect-4/5 w-full overflow-hidden rounded-[2rem] shadow-[0_25px_60px_rgba(15,23,42,0.15)]">
            <AnimatePresence mode="wait">
              <motion.div
                key={processSteps[active].num}
                initial={{ opacity: 0, scale: 1.06 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0"
              >
                <Image
                  src={processSteps[active].img}
                  alt={processSteps[active].label}
                  fill
                  sizes="(min-width: 768px) 40vw, 90vw"
                  className="object-cover"
                  priority={active === 0}
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/50 via-black/0 to-black/0" />
              </motion.div>
            </AnimatePresence>

            <div className="absolute bottom-0 left-0 flex w-full items-end justify-between p-6">
              <span className="font-display text-6xl font-bold leading-none text-white/90 [text-shadow:0_4px_20px_rgba(0,0,0,0.4)]">
                {processSteps[active].num}
              </span>
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/90">
                {(() => {
                  const Icon = processSteps[active].icon;
                  return <Icon className="h-5 w-5 text-background" />;
                })()}
              </div>
            </div>

            {/* progress rail */}
            <div className="absolute right-6 top-6 flex flex-col gap-1.5">
              {processSteps.map((step, i) => (
                <span
                  key={step.num}
                  className={`h-6 w-1 rounded-full transition-colors duration-300 ${
                    i === active ? "bg-white" : "bg-white/30"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* -------------------------------------------------- MOBILE (stacked) */}
      <div className="relative py-16 md:hidden">
        <div className={BG_GLOW} />
        <span className="text-[0.8rem] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
          How It Works
        </span>
        <h2 className="mt-4 font-display text-[1.75rem] font-semibold leading-[1.2] tracking-tight text-foreground">
          Our complete service process
        </h2>

        <div className="mt-10 flex flex-col gap-8">
          {processSteps.map((step) => {
            const Icon = step.icon;
            return (
              <div key={step.num} className="flex gap-4">
                <div className="relative h-20 w-20 flex-none overflow-hidden rounded-2xl">
                  <Image
                    src={step.img}
                    alt={step.label}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-display text-sm font-semibold text-blue-600">
                      {step.num}
                    </span>
                    <Icon className="h-4 w-4 text-blue-600" />
                  </div>
                  <h3 className="mt-1 font-display text-base font-semibold text-foreground">
                    {step.label}
                  </h3>
                  <p className="mt-1 text-[0.9rem] leading-[1.55] text-muted-foreground">
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}