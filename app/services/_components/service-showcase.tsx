"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { ArrowRight } from "lucide-react";
import { servicesIndex } from "@/app/services/_components/service-index";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText);
}

export default function ServiceShowcase() {
  const rootRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const panelsRef = useRef<HTMLDivElement[]>([]);
  const outersRef = useRef<HTMLDivElement[]>([]);
  const innersRef = useRef<HTMLDivElement[]>([]);
  const bgsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const panels = panelsRef.current;
    const outers = outersRef.current;
    const inners = innersRef.current;
    const bgs = bgsRef.current;
    const total = servicesIndex.length;

    const headings = gsap.utils.toArray<HTMLElement>(
      ".service-heading",
      rootRef.current!
    );
    const splitHeadings = headings.map(
      (heading) =>
        new SplitText(heading, {
          type: "chars,words,lines",
          linesClass: "overflow-hidden",
        })
    );

    let currentIndex = -1;
    let busy = false; // an animation is mid-flight — ignore new input until it settles
    let engaged = false; // the showcase currently owns the scroll (real page scroll is frozen)

    gsap.set(outers, { yPercent: 100 });
    gsap.set(inners, { yPercent: -100 });

    function goTo(index: number, direction: 1 | -1) {
      busy = true;

      const dFactor = direction;
      const tl = gsap.timeline({
        defaults: { duration: 1.1, ease: "power1.inOut" },
        onComplete: () => {
          busy = false;
        },
      });

      if (currentIndex >= 0) {
        gsap.set(panels[currentIndex], { zIndex: 0 });
        tl.to(bgs[currentIndex], { yPercent: -15 * dFactor }).set(
          panels[currentIndex],
          { autoAlpha: 0 }
        );
      }

      gsap.set(panels[index], { autoAlpha: 1, zIndex: 1 });
      tl.fromTo(
        [outers[index], inners[index]],
        { yPercent: (i: number) => (i ? -100 * dFactor : 100 * dFactor) },
        { yPercent: 0 },
        0
      )
        .fromTo(bgs[index], { yPercent: 15 * dFactor }, { yPercent: 0 }, 0)
        .fromTo(
          splitHeadings[index].chars,
          { autoAlpha: 0, yPercent: 150 * dFactor },
          {
            autoAlpha: 1,
            yPercent: 0,
            duration: 1,
            ease: "power2",
            stagger: { each: 0.02, from: "random" },
          },
          0.2
        );

      currentIndex = index;
    }

    // Freezing real scroll (rather than just calling preventDefault per
    // event) is what makes this bulletproof against hard/fast scrolling:
    // while engaged, the document literally cannot move, so there's no
    // wheel speed, line-count, or trackpad-momentum quirk that can ever
    // leak a real scroll through mid-cycle. Direction (not magnitude)
    // is all that drives the panel change — one gesture, one panel.
    function freeze() {
      document.documentElement.style.overflow = "hidden";
      engaged = true;
    }
    function release() {
      document.documentElement.style.overflow = "";
      engaged = false;
    }

    function step(direction: 1 | -1) {
      if (busy) return;
      const next = currentIndex + direction;
      if (next < 0 || next > total - 1) {
        // Already at the first/last panel — release control so this same
        // gesture continues on as a normal page scroll.
        release();
        return;
      }
      goTo(next, direction);
    }

    function onWheel(e: WheelEvent) {
      if (!engaged) return;
      e.preventDefault();
      step(e.deltaY > 0 ? 1 : -1);
    }

    const touch = { startY: 0 };
    function onTouchStart(e: TouchEvent) {
      if (!engaged) return;
      touch.startY = e.changedTouches[0].pageY;
    }
    function onTouchMove(e: TouchEvent) {
      if (!engaged) return;
      e.preventDefault();
    }
    function onTouchEnd(e: TouchEvent) {
      if (!engaged) return;
      const dy = touch.startY - e.changedTouches[0].pageY;
      if (Math.abs(dy) < 24) return; // ignore taps / tiny drags
      step(dy > 0 ? 1 : -1);
    }

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", onTouchEnd, { passive: true });

    // Engage the moment the showcase reaches the top of the viewport
    // (scrolling down) or the bottom (scrolling back up from below), and
    // start the slideshow at whichever end makes sense for that direction.
    const trigger = ScrollTrigger.create({
      trigger: rootRef.current,
      start: "top top",
      end: "bottom bottom",
      onEnter: () => {
        freeze();
        currentIndex = -1;
        goTo(0, 1);
      },
      onEnterBack: () => {
        freeze();
        currentIndex = -1;
        goTo(total - 1, -1);
      },
    });

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      document.documentElement.style.overflow = "";
      trigger.kill();
      splitHeadings.forEach((s) => s.revert());
    };
  }, []);

  return (
    <section id="service-grid" className="relative">
      {/* --------------------------------------------------- INTRO COPY */}
      <div className="relative overflow-hidden bg-background/90 px-5 py-16 md:px-10 md:py-20">
        <motion.div
          className="mx-auto w-[min(100%,76rem)]"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="text-[0.8rem] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
            Services
          </span>
          <h2 className="mt-4 max-w-2xl font-display text-[1.9rem] font-semibold leading-[1.2] tracking-tight text-foreground md:text-[2.5rem]">
            A closer look at what we do
          </h2>
          <p className="mt-4 max-w-2xl text-[1.02rem] leading-[1.75] text-muted-foreground">
            The seven services below represent seven distinct disciplines —
            from the first geophysical reading on your land to the pump
            that finally puts water in your hands. Scroll on to move
            through them one at a time, in the order a real project follows
            from site survey to a fully commissioned water supply.
          </p>
        </motion.div>
      </div>

      {/* --------------------------------------------------------- GSAP SHOWCASE */}
      <div
        ref={rootRef}
        className="relative"
        style={{ height: `${servicesIndex.length * 100}vh` }}
      >
        <div
          ref={stickyRef}
          className="sticky top-0 h-screen w-full overflow-hidden bg-background"
        >
          {servicesIndex.map((service, i) => (
            <div
              key={service.slug}
              ref={(el) => {
                if (el) panelsRef.current[i] = el;
              }}
              className="invisible absolute inset-0 h-full w-full"
            >
              <div
                ref={(el) => {
                  if (el) outersRef.current[i] = el;
                }}
                className="h-full w-full overflow-hidden"
              >
                <div
                  ref={(el) => {
                    if (el) innersRef.current[i] = el;
                  }}
                  className="h-full w-full overflow-hidden"
                >
                  <div
                    ref={(el) => {
                      if (el) bgsRef.current[i] = el;
                    }}
                    className="relative flex h-full w-full items-center justify-center bg-cover bg-center"
                    style={{
                      backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.55) 45%, rgba(0,0,0,0.15) 100%), url(${service.img})`,
                    }}
                  >
                    <div className="relative z-10 flex max-w-3xl flex-col items-center gap-6 px-6 text-center">
                      <span className="text-sm font-semibold uppercase tracking-[0.3em] text-white/70">
                        Service {service.num}
                      </span>
                      <h2 className="service-heading font-display text-[2.5rem] font-semibold leading-[1.05] tracking-tight text-white md:text-[4.5rem]">
                        {service.title}
                      </h2>
                      <p className="max-w-lg text-base leading-[1.6] text-white/80 md:text-lg">
                        {service.desc}
                      </p>
                      <Link
                        href={`/services/${service.slug}`}
                        className="mt-2 inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-background"
                      >
                        Learn more
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* step indicator */}
          <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 gap-2">
            {servicesIndex.map((service) => (
              <span
                key={service.slug}
                className="h-1 w-8 rounded-full bg-white/30"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}