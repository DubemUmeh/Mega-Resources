"use client";

import Link from "next/link";
import {
  FaHome,
  FaTools,
  FaImages,
  FaUsers,
  FaStar,
  FaQuestionCircle,
  FaEnvelope,
  FaClipboardList,
} from "react-icons/fa";
import { Reveal, ArrowCta, BG_GLOW } from "@/components/motion-kit";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

const quickLinks = [
  {
    href: "/",
    label: "Home",
    desc: "Back to the start.",
    icon: FaHome,
  },
  {
    href: "/services",
    label: "Services",
    desc: "Drilling, pumps, surveys, and more.",
    icon: FaTools,
  },
  {
    href: "/portfolio",
    label: "Portfolio",
    desc: "Real projects we've completed.",
    icon: FaImages,
  },
  {
    href: "/about",
    label: "About Us",
    desc: "Who we are and how we work.",
    icon: FaUsers,
  },
  {
    href: "/reviews",
    label: "Reviews",
    desc: "What past clients have said.",
    icon: FaStar,
  },
  {
    href: "/faq",
    label: "FAQ",
    desc: "Common questions, answered.",
    icon: FaQuestionCircle,
  },
  {
    href: "/contact",
    label: "Contact",
    desc: "Reach us directly.",
    icon: FaEnvelope,
  },
  {
    href: "/quote",
    label: "Get a Quote",
    desc: "Free site survey, no obligation.",
    icon: FaClipboardList,
  },
];

export default function NotFound() {
  const pathName = usePathname();
  
  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", pathName);
  }, [pathName]);
  
  return (
    <div className="w-full bg-background/50">
      <div className={BG_GLOW} />
      <section className="relative overflow-hidden px-5 pb-16 pt-32 md:px-10 md:pb-20 md:pt-40">
        <div className={BG_GLOW} />
        <div className="mx-auto w-[min(100%,76rem)]">
          <Reveal>
            <span className="font-display text-6xl font-bold tracking-tight text-blue-600 md:text-8xl">
              404
            </span>
          </Reveal>

          <Reveal delay={0.08} className="mt-4 max-w-2xl">
            <h1 className="font-display text-[2rem] font-semibold leading-[1.15] tracking-tight text-foreground md:text-[2.75rem]">
              Looks like this page ran dry.
            </h1>
          </Reveal>

          <Reveal delay={0.16} className="mt-5 max-w-xl">
            <p className="text-[1.02rem] leading-[1.75] text-muted-foreground">
              The page you&apos;re looking for doesn&apos;t exist, may have
              moved, or the link might just be off. Here&apos;s where you
              were probably headed.
            </p>
          </Reveal>

          <Reveal delay={0.24} className="mt-8 flex flex-wrap items-center gap-4">
            <ArrowCta href="/" label="Back to Home" />
            <Link
              href="/quote"
              className="text-sm font-semibold text-foreground underline decoration-blue-600 decoration-2 underline-offset-4"
            >
              Or get a free survey
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="relative overflow-hidden bg-background/90 px-5 pb-24 md:px-10">
        <div className={BG_GLOW} />
        <div className="mx-auto w-[min(100%,76rem)]">
          <Reveal className="max-w-2xl">
            <span className="text-[0.8rem] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
              You Might Be Looking For
            </span>
          </Reveal>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {quickLinks.map((link, i) => {
              const Icon = link.icon;
              return (
                <Reveal key={link.href} delay={(i % 4) * 0.06}>
                  <Link
                    href={link.href}
                    className="group flex h-full flex-col gap-3 rounded-[1.5rem] border border-[rgba(10,10,10,0.08)] bg-[rgba(36,35,35,0.5)] p-6 transition-colors hover:bg-[rgba(36,35,35,0.75)]"
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-600/10">
                      <Icon className="h-4.5 w-4.5 text-blue-600" />
                    </div>
                    <h3 className="font-display text-base font-semibold text-foreground transition-colors group-hover:text-blue-600">
                      {link.label}
                    </h3>
                    <p className="text-[0.85rem] leading-normal text-muted-foreground">
                      {link.desc}
                    </p>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}