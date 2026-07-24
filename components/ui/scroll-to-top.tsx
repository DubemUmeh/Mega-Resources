"use client";

import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";

export function ScrollToTop() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(100, (window.scrollY / max) * 100) : 0);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <button
      type="button"
      aria-label="Scroll to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-5 left-5 z-40 grid h-12 w-12 place-items-center rounded-full bg-background/85 text-foreground shadow-xl backdrop-blur transition hover:scale-105"
      style={{ background: `conic-gradient(#2563eb ${progress * 3.6}deg, rgba(255,255,255,0.18) 0deg)` }}
    >
      <span className="grid h-9 w-9 place-items-center rounded-full bg-background"><FaArrowUp className="text-xs" /></span>
    </button>
  );
}
