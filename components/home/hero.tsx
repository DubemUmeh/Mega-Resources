'use client';

import { useRef, useLayoutEffect } from "react";
import { FaArrowRight, FaTint, FaWhatsapp, FaCheckCircle } from "react-icons/fa";
import { gsap } from "@/lib/gsap";

const HEADLINE = ["WATER.", "EXPERTISE.", "RELIABILITY."];

const badges = [
  "Licensed Drillers",
  "10+ Years Experience",
  "500+ Boreholes Completed",
  "2-Year Warranty",
];

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      tl.from("[data-hero-eyebrow]", { y: 24, opacity: 0, duration: 1 })
        .from("[data-word]", { yPercent: 115, duration: 1.15, stagger: 0.08 }, "-=0.55")
        .from("[data-hero-sub]", { y: 26, opacity: 0, duration: 1, stagger: 0.1 }, "-=0.7")
        .from("[data-hero-cta] > *", { y: 22, opacity: 0, duration: 0.9, stagger: 0.1 }, "-=0.7")
        .from("[data-hero-meta] > *", { y: 18, opacity: 0, duration: 0.8, stagger: 0.08 }, "-=0.6")
        .from("[data-hero-side] > *", { y: 14, opacity: 0, duration: 0.7, stagger: 0.06 }, "-=0.5")
        .from("[data-hero-caption] > *", { y: 14, opacity: 0, duration: 0.7, stagger: 0.08 }, "-=0.5");
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative pt-24 pb-24 md:pb-32 px-6 lg:px-24 min-h-[92vh] flex items-center overflow-hidden">
      <div className="absolute top-0 right-0 w-full md:w-[65%] h-full z-0">
        <img src="/images/home/hero-2.png" className="w-full h-full object-cover opacity-60 md:opacity-100" alt="Drilling rig on site in Ghana" fetchPriority="high" />
        <div className="absolute inset-0 bg-linear-to-r from-background via-background/80 to-transparent w-full md:w-[70%]"></div>
        <div className="absolute inset-0 bg-linear-to-t from-background via-background/10 to-transparent"></div>
      </div>

      <div className="relative z-10 w-full max-w-xl">
        <div data-hero-eyebrow className="text-[10px] uppercase tracking-widest text-gray-500 mb-8">Mega Resources Ltd.</div>

        <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-light leading-[1.05] tracking-tight mb-6">
          {HEADLINE.map((word, i) => (
            <span key={i} className="block overflow-hidden">
              <span data-word className="inline-block will-change-transform">
                {word}
              </span>
            </span>
          ))}
        </h1>

        <p data-hero-sub className="text-gray-400 text-sm leading-relaxed max-w-sm mb-4 font-light">
          Reliable borehole drilling and clean water solutions across Ghana. Geological survey included on every job — we confirm water before we drill.
        </p>

        <div data-hero-sub className="flex items-center gap-2 text-[11px] text-gray-300 font-light mb-10">
          <FaCheckCircle className="text-white/70 text-[10px]" />
          98% site success rate &nbsp;·&nbsp; Clean, year-round water in as little as 14 days
        </div>

        <div data-hero-cta className="flex flex-wrap items-center gap-4 mb-10">
          <button className="flex items-center gap-3 text-xs font-medium bg-white text-black rounded-full px-6 py-3.5 hover:bg-gray-200 transition-colors group">
            Get a Free Site Survey
            <FaArrowRight className="transform -rotate-45 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform text-[10px]" />
          </button>
          <button className="flex items-center gap-3 text-xs font-medium border border-white/25 rounded-full px-6 py-3.5 hover:bg-white/10 transition-colors text-white">
            <FaWhatsapp className="text-sm" />
            024 XXX XXXX
          </button>
        </div>

        <div data-hero-meta className="flex flex-wrap gap-x-6 gap-y-2">
          {badges.map((b) => (
            <span key={b} className="text-[9px] uppercase tracking-[0.15em] text-gray-500 font-medium">
              {b}
            </span>
          ))}
        </div>
      </div>

      <div data-hero-side className="hidden md:flex absolute right-8 lg:right-24 top-1/2 -translate-y-1/2 flex-col items-center gap-4 text-[10px] font-light z-10">
        <span className="text-white">01</span>
        <span className="w-px h-6 bg-white/30"></span>
        <span className="text-gray-600">02</span>
        <span className="text-gray-600">03</span>
        <span className="text-gray-600">04</span>
      </div>

      <div data-hero-caption className="absolute bottom-12 right-8 lg:right-24 z-10 hidden md:flex items-center gap-4">
        <div className="flex flex-col text-right text-[9px] tracking-[0.15em] uppercase text-gray-400 font-medium">
          <span>Building</span>
          <span>Sustainable</span>
          <span>Water Futures</span>
        </div>
        <div className="w-10 h-10 border border-gray-600 rounded-full flex items-center justify-center text-gray-400">
          <FaTint className="text-xs" />
        </div>
      </div>
    </section>
  );
}