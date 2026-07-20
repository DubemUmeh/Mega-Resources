"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

export function Reveal({
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

export function ArrowCta({
  href,
  label,
  onClick,
  className = "",
  as = "link",
}: {
  href?: string;
  label: string;
  onClick?: () => void;
  className?: string;
  as?: "link" | "button";
}) {
  const inner = (
    <>
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
    </>
  );

  const classes = `w-fit inline-flex items-center cursor-pointer rounded-2xl z-0 group pl-1 py-1.5 pr-4 gap-3 bg-blue-600 hover:bg-blue-700 active:scale-95 h-12 transition-all duration-300 ease-out ${className}`;

  if (as === "button" || !href) {
    return (
      <button type="button" onClick={onClick} className={classes}>
        {inner}
      </button>
    );
  }

  return (
    <Link href={href} className={classes} onClick={onClick}>
      {inner}
    </Link>
  );
}

export const BG_GLOW =
  "pointer-events-none absolute inset-0 -z-10 [background:radial-gradient(circle_at_10%_10%,rgba(255,205,112,0.16),transparent_38%),radial-gradient(circle_at_90%_20%,rgba(255,184,142,0.14),transparent_40%)]";