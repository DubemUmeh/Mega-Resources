"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FaArrowRight, FaBars, FaTimes } from "react-icons/fa";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Mega_Logo } from "@/components/logo";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "About Us", href: "/about-us" },
  { label: "Reviews", href: "/reviews" },
  { label: "Contact", href: "/contact" },
];

const menuLinkVariants = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.12 + i * 0.06,
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 72);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 z-50 transition-all duration-300 backdrop-blur-2xl bg-linear-to-r from-foreground via-foreground/40 md:via-background/80 to-background/80",
          !isScrolled
            ? "top-0 border-b border-border/60"
            // ? "top-0 border-b border-border/60 bg-background/80 backdrop-blur-xl"
            : "top-3 mx-3 rounded-2xl border border-border/80 md:mx-8 lg:mx-14"
        )}
      >
        <nav className="container-page w-full">
          <div className="flex h-16 w-full items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <div className="h-15 w-full place-items-center rounded-xl transition-transform hover:scale-105">
                <Mega_Logo
                  logo_height="50"
                  logo_width="200"
                  className='rotate-1'
                />
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden items-center gap-1 md:flex">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-full px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-accent hover:text-foreground"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <Link href='/quote' className="hidden w-fit items-center gap-2 rounded-full border border-white/30 px-6 py-2.5 transition-colors hover:cursor-pointer hover:bg-foreground/60 hover:text-black md:flex">
              Get a Quote <FaArrowRight className="-rotate-45 text-[10px]" />
            </Link>

            {/* Mobile Menu Button */}
            <button
              className="rounded-full border border-border p-2 text-foreground transition-colors hover:bg-accent md:hidden"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <FaBars className="size-5" />
            </button>
          </div>
        </nav>
      </header>

      {/* ------------------------------------------------- FULLSCREEN MENU */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-70 bg-foreground/75 backdrop-blur-2xl md:hidden w-full"
          >
            <div className="flex h-full flex-col py-5">
              {/* Top row: logo + close */}
              <div className="flex items-center justify-between">
                <Link
                  href="/"
                  aria-label="Mega Resources Logo"
                  onClick={() => setMobileOpen(false)}
                  className="h-9 rounded-xl text-[0.6rem] font-semibold block"
                >
                  <Mega_Logo
                  logo_height="50"
                  logo_width="200"
                  className='rotate-1'
                />
                </Link>
                <button
                  onClick={() => setMobileOpen(false)}
                  aria-label="Close menu"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-background/25 text-background transition-colors hover:bg-background hover:text-foreground"
                >
                  <FaTimes className="size-4" />
                </button>
              </div>

              {/* Numbered link list, staggers in from below */}
              <nav className="mt-auto flex flex-col py-3">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    custom={i}
                    variants={menuLinkVariants}
                    initial="hidden"
                    animate="show"
                    exit="hidden"
                    className="border-t border-background/15 py-4 first:border-t-0"
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="group flex items-baseline gap-4 text-background"
                    >
                      <span className="text-sm font-semibold text-blue-400">
                        0{i + 1}
                      </span>
                      <span className="text-3xl font-medium tracking-tight transition-transform duration-300 group-hover:translate-x-2">
                        {link.label}
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 16 }}
                transition={{ delay: 0.12 + navLinks.length * 0.06, duration: 0.5 }}
                className="mt-3"
              >
                <Link
                  href='/quote'
                  onClick={() => setMobileOpen(false)}
                  className="flex w-full items-center justify-center gap-2 rounded-full border border-background/30 py-3 text-background transition-colors hover:bg-background hover:text-foreground"
                >
                  Get a Quote{" "}
                  <FaArrowRight className="-rotate-45 text-[10px]" />
                </Link>
              </motion.div>

              {/* Contact footer */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.24 + navLinks.length * 0.06, duration: 0.5 }}
                className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-[0.78rem] uppercase tracking-[0.18em] text-background/55"
              >
                <a href="tel:+233240000000" className="hover:text-background">
                  +233 24 000 0000
                </a>
                <a
                  href="mailto:info@yourcompany.com"
                  className="hover:text-background"
                >
                  info@yourcompany.com
                </a>
                <span>Mon–Sat · 8am–6pm</span>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;