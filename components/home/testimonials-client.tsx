'use client';

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaQuoteLeft, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";

type Testimonial = { quote: string; name: string; title: string; img: string };

const fallbackTestimonials: Testimonial[] = [
  {
    quote: "They found water where two other companies failed. Professional, clean, and finished on schedule.",
    name: "Mrs. Ama Owusu",
    title: "Homeowner — Tema",
    img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400",
  },
  {
    quote: "Our commercial project needed precise, timely water access. The team exceeded expectations from survey to handover.",
    name: "Aisha Mensah",
    title: "Operations Director — Green Farms Ghana",
    img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400",
  },
  {
    quote: "From consultation to completion, the process was seamless. We now have a consistent water supply for the whole school.",
    name: "David Osei",
    title: "Facilities Manager — Tamale",
    img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400",
  },
];

const TestimonialsClient = ({ testimonials }: { testimonials: Testimonial[] }) => {
  const items = testimonials.length ? testimonials : fallbackTestimonials;
  // const items = fallbackTestimonials;
  const [active, setActive] = useState(0);

  const prev = () => setActive((c) => (c === 0 ? items.length - 1 : c - 1));
  const next = () => setActive((c) => (c === items.length - 1 ? 0 : c + 1));

  return (
    <section className="min-h-screen bg-background/30 h-full w-full px-6 sm:px-8 lg:px-24 py-15 overflow-hidden">
      <Link href='/reviews' className="w-fit h-full inline-flex items-center gap-2 text-sm font-semibold tracking-widest uppercase text-neutral-500 underline underline-offset-4 decoration-blue-600 decoration-2 hover:text-blue-600 transition-colors mb-5 md:m-0">Client Stories</Link>

      <div className="max-w-4xl mx-auto relative top-25 md:top-0 h-110 sm:h-96 md:h-127 md:mt-0 flex items-center justify-center">
        <div className="relative w-full max-w-3xl h-full flex items-center justify-center">
          <AnimatePresence mode="popLayout">
            {items.map((t, idx) => {
              const isActive = idx === active;
              const isPrev = idx === (active === 0 ? items.length - 1 : active - 1);
              const isNext = idx === (active === items.length - 1 ? 0 : active + 1);

              // Calculate position for the "stacked" look
              let x = 0;
              let y = 0;
              let rotate = 0;
              let scale = 1;
              let zIndex = 0;
              let opacity = 0;

              if (isActive) {
                x = 0;
                y = 0;
                rotate = 0;
                scale = 1;
                zIndex = 30;
                opacity = 1;
              } else if (isPrev) {
                x = -40;
                y = 20;
                rotate = -8;
                scale = 0.9;
                zIndex = 20;
                opacity = 0.6;
              } else if (isNext) {
                x = 40;
                y = 20;
                rotate = 8;
                scale = 0.9;
                zIndex = 20;
                opacity = 0.6;
              } else {
                // Other cards hidden or further back
                x = 0;
                y = 40;
                rotate = 0;
                scale = 0.8;
                zIndex = 10;
                opacity = 0;
              }

              return (
                <motion.div
                  key={idx}
                  initial={{ x: 0, opacity: 0, scale: 0.8 }}
                  animate={{ x, y, rotate, scale, zIndex, opacity: 1 }}
                  exit={{ 
                    x: isActive ? (active === 0 ? -200 : 200) : 0, 
                    opacity: 0, 
                    scale: 0.8,
                    transition: { duration: 0.4 } 
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}
                  className="absolute w-full max-w-3xl px-2 sm:px-0"
                >
                  <div className="border border-white/10 rounded-2xl p-5 sm:p-6 md:p-12 grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4 sm:gap-6 md:gap-8 items-center bg-neutral-900 backdrop-blur-sm shadow-2xl">
                  <div className="pointer-events-none absolute inset-0 -z-10 [background:radial-gradient(circle_at_10%_10%,rgba(255,205,112,0.16),transparent_38%),radial-gradient(circle_at_90%_20%,rgba(255,184,142,0.14),transparent_40%)]"></div>
                    <div className="w-full h-30 sm:h-35 md:h-48 bg-popover rounded-xl overflow-hidden border border-white/10">
                      <Image width={100} height={100} src={t.img} alt={t.name} className="w-full h-full object-cover" />
                    </div>

                    <div>
                      <FaQuoteLeft className="text-blue-500 text-lg md:text-2xl mb-3 md:mb-4" />
                      <p className="text-sm sm:text-base md:text-xl font-light text-neutral-200 leading-relaxed mb-4 md:mb-6 line-clamp-4 md:line-clamp-none">{t.quote}</p>
                      <div className="text-[13px] text-blue-500 tracking-wide font-sans font-medium">{t.name}</div>
                      <div className="text-[11px] uppercase tracking-widest text-neutral-400 mt-1">{t.title}</div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        <div className="absolute z-50 -bottom-20 sm:-bottom-16 md:bottom-0 left-0 right-0 flex items-center justify-center gap-6">
          <button 
            onClick={prev} 
            aria-label="Previous testimonial" 
            className="w-10 h-10 rounded-full border border-neutral-200 flex items-center justify-center text-neutral-500 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-colors bg-white"
          >
            <FaArrowLeft className="size-5" />
          </button>

          <div className="flex items-center gap-2 border border-neutral-200 p-1 rounded-full bg-white">
            {items.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActive(idx)}
                aria-label={`Go to testimonial ${idx + 1}`}
                className={`h-1.5 rounded-full transition-all ${idx === active ? "w-8 bg-blue-600" : "w-3 bg-neutral-300"}`}
              />
            ))}
          </div>

          <button 
            onClick={next} 
            aria-label="Next testimonial" 
            className="w-10 h-10 rounded-full border border-neutral-200 flex items-center justify-center text-neutral-500 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-colors bg-white"
          >
            <FaArrowRight className="size-5" />
          </button>

        </div>
      </div>
      <div className="w-full h-full flex items-center justify-center relative left-0 -bottom-47 md:top-8 md:bottom-0">
        <Link href='/reviews' className="w-fit flex items-center cursor-pointer rounded-2xl z-0 group pl-1 py-1.5 pr-4 gap-3 bg-blue-600 hover:bg-blue-700 active:scale-95 h-12 transition-all duration-300 ease-out">
          <div className="flex justify-start items-center">
            <div className="flex justify-center items-center size-10 flex-none rounded-xl bg-white">
              <div className="-rotate-45 group-hover:rotate-0 transition-transform duration-300 ease-in-out text-blue-600" style={{ fontSize: "1rem", position: "relative" }}>
                <FaArrowRight />
              </div>
            </div>
          </div>
          <span className="text-base leading-[1.2] font-medium text-center text-white">
            More Feedbacks
          </span>
        </Link>
      </div>
        
    </section>
  );
};

export default TestimonialsClient;