"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

const LAYERS = [
  { y: 150, label: "40ft", note: "Topsoil" },
  { y: 230, label: "120ft", note: "Weathered Rock" },
  { y: 340, label: "220ft", note: "Fractured Bedrock" },
];

const GROUND_Y = 90;
const WATER_Y = 400;
const WATER_DEPTH = 310;
const BOREHOLE_X = 240;

function animateValue(
  start: number,
  end: number,
  duration: number,
  onUpdate: (v: number) => void
) {
  let startTime: number | null = null;
  let frame: number;
  function step(ts: number) {
    if (startTime === null) startTime = ts;
    const progress = Math.min((ts - startTime) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    onUpdate(Math.round(start + (end - start) * eased));
    if (progress < 1) frame = requestAnimationFrame(step);
  }
  frame = requestAnimationFrame(step);
  return () => cancelAnimationFrame(frame);
}

export default function HeroSurveyDiagram() {
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [depth, setDepth] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (prefersReducedMotion) {
      const frame = requestAnimationFrame(() => setDepth(WATER_DEPTH));
      return () => cancelAnimationFrame(frame);
    }
    return animateValue(0, WATER_DEPTH, 2200, setDepth);
  }, [inView, prefersReducedMotion]);

  return (
    <div ref={ref} className="relative mx-auto w-full max-w-105">
      {/* live depth readout */}
      <div className="absolute -top-4 right-2 z-10 flex items-center gap-2 rounded-2xl border border-[rgba(10,10,10,0.08)] bg-[rgba(36,35,35,0.55)] px-4 py-2.5 backdrop-blur-sm">
        <span className="relative flex h-2 w-2">
          {!prefersReducedMotion && (
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-500 opacity-60" />
          )}
          <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-500" />
        </span>
        <div>
          <p className="text-[0.65rem] uppercase tracking-widest text-muted-foreground">
            Confirmed Depth
          </p>
          <p className="font-display text-sm font-semibold tabular-nums text-foreground">
            {depth}ft
          </p>
        </div>
      </div>

      <svg viewBox="0 0 480 520" className="h-auto w-full" fill="none">
        {/* ground line */}
        <line
          x1="20"
          y1={GROUND_Y}
          x2="460"
          y2={GROUND_Y}
          stroke="currentColor"
          className="text-foreground/25"
          strokeWidth="1.5"
          strokeDasharray="2 6"
        />
        <text x="20" y={GROUND_Y - 12} className="fill-muted-foreground text-[11px]">
          Ground Level
        </text>

        {/* strata layers */}
        {LAYERS.map((l) => (
          <g key={l.y}>
            <line
              x1="20"
              y1={l.y}
              x2="460"
              y2={l.y}
              stroke="currentColor"
              className="text-foreground/10"
              strokeWidth="1"
            />
            <text x="370" y={l.y - 6} className="fill-muted-foreground text-[10px]">
              {l.note}
            </text>
            <text x="370" y={l.y + 12} className="fill-foreground text-[10px] font-semibold">
              {l.label}
            </text>
          </g>
        ))}

        {/* scanning borehole line */}
        <motion.line
          x1={BOREHOLE_X}
          y1={GROUND_Y}
          x2={BOREHOLE_X}
          y2={WATER_Y}
          stroke="currentColor"
          className="text-blue-600"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: prefersReducedMotion ? 1 : 0 }}
          animate={inView ? { pathLength: 1 } : {}}
          transition={
            prefersReducedMotion
              ? { duration: 0 }
              : {
                  duration: 2.2,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatType: "reverse",
                  repeatDelay: 1.6,
                }
          }
        />

        {/* water-confirmed marker + pulse rings */}
        <g>
          <rect x="20" y={WATER_Y - 10} width="440" height="20" className="fill-blue-600/10" />
          <circle cx={BOREHOLE_X} cy={WATER_Y} r="6" className="fill-blue-600" />
          {!prefersReducedMotion &&
            [0, 0.6, 1.2].map((delay, i) => (
              <motion.circle
                key={i}
                cx={BOREHOLE_X}
                cy={WATER_Y}
                r="6"
                className="stroke-blue-500"
                strokeWidth="1.5"
                fill="none"
                style={{ transformOrigin: `${BOREHOLE_X}px ${WATER_Y}px` }}
                initial={{ scale: 1, opacity: 0.6 }}
                animate={inView ? { scale: 3.2, opacity: 0 } : {}}
                transition={{ duration: 2.2, repeat: Infinity, delay, ease: "easeOut" }}
              />
            ))}
          <text x="370" y={WATER_Y + 34} className="fill-blue-600 text-[10px] font-semibold">
            Water Confirmed — {WATER_DEPTH}ft
          </text>
        </g>
      </svg>
    </div>
  );
}