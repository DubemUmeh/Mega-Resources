'use client';

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaQuoteLeft, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Link from "next/link";

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
  const [active, setActive] = useState(0);

  const prev = () => setActive((c) => (c === 0 ? items.length - 1 : c - 1));
  const next = () => setActive((c) => (c === items.length - 1 ? 0 : c + 1));

  return (
    <section className="min-h-screen h-full w-full px-8 lg:px-24 pt-15 pb-35 border-b border-gray-800 bg-foreground/10 text-white overflow-hidden">
      <div className="inline-flex items-center border border-foreground/20 rounded-full bg-foreground/72 shadow-[0_8px_20px_rgba(15,23,42,0.05)] px-3 py-1 text-sm font-semibold tracking-[0.12em] uppercase text-[#0a0a0a]">Client Stories</div>

      <div className="max-w-4xl mx-auto relative h-127 mt-6 md:mt-0 flex items-center justify-center">
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
                  className="absolute w-full max-w-3xl"
                >
                  <div className="border border-gray-800 rounded-2xl p-8 md:p-12 grid grid-cols-1 md:grid-cols-[200px_1fr] gap-8 items-center bg-gray-950/80 backdrop-blur-sm shadow-2xl">
                    <div className="w-full h-40 md:h-48 bg-foreground/60 rounded-xl overflow-hidden border border-gray-800">
                      <img src={t.img} alt={t.name} className="w-full h-full object-cover grayscale-30" />
                    </div>

                    <div>
                      <FaQuoteLeft className="text-gray-700 text-2xl mb-4" />
                      <p className="text-lg md:text-xl font-light text-gray-200 leading-relaxed mb-6">{t.quote}</p>
                      <div className="text-[13px] text-gray-200 font-medium">{t.name}</div>
                      <div className="text-[11px] uppercase tracking-widest text-gray-500 mt-1">{t.title}</div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        <div className="absolute z-50 -bottom-17 md:bottom-0 left-0 right-0 flex items-center justify-center gap-6">
          <button 
            onClick={prev} 
            aria-label="Previous testimonial" 
            className="w-10 h-10 rounded-full border border-gray-700 flex items-center justify-center text-gray-400 hover:bg-white hover:text-black transition-colors"
          >
            <FaArrowLeft className="text-xs" />
          </button>

          <div className="flex items-center gap-2 border border-blue-200/10 p-1 rounded-full">
            {items.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActive(idx)}
                aria-label={`Go to testimonial ${idx + 1}`}
                className={`h-1.5 rounded-full transition-all ${idx === active ? "w-8 bg-white p-1 border-2 border-blue-600" : "w-3 bg-gray-700"}`}
              />
            ))}
          </div>

          <button 
            onClick={next} 
            aria-label="Next testimonial" 
            className="w-10 h-10 rounded-full border border-gray-700 flex items-center justify-center text-gray-400 hover:bg-white hover:text-black transition-colors"
          >
            <FaArrowRight className="text-xs" />
          </button>

        </div>
      </div>
      <div className="w-full h-full flex items-center justify-center  relative left-0 top-28 md:top-8">
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
