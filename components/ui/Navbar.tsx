"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FaArrowRight, FaBars, FaTimes, FaChevronDown } from "react-icons/fa";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Mega_Logo } from "@/components/logo";
import { serviceSlugs } from "@/lib/services";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services", children: serviceSlugs.map((slug) => ({ label: slug.split("-").map((part) => part[0].toUpperCase() + part.slice(1)).join(" "), href: `/services/${slug}` })) },
  { label: "Portfolio", href: "/portfolio", children: [{ label: "All Projects", href: "/portfolio#all-projects" }, { label: "Featured Project", href: "/portfolio#featured" }] },
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
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

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

  const handleCloseMobileMenu = () => {
    setMobileOpen(false);
    setOpenSubmenu(null);
  };

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 z-50 transition-all duration-300 backdrop-blur-xl bg-white/80",
          !isScrolled
            ? "top-0 border-b border-neutral-200"
            : "top-3 mx-3 rounded-2xl border border-neutral-200 shadow-[0_8px_20px_rgba(15,23,42,0.06)] md:mx-8 lg:mx-14"
        )}
      >
        <nav className={`container-page w-full ${!isScrolled ? '' : 'rounded-2xl'}`}>
          <div className="flex h-16 w-full items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <div className="h-15 w-full place-items-center rounded-xl transition-transform hover:scale-105">
                <Mega_Logo
                  logo_height="50"
                  logo_width="200"
                  className='rotate-1 w-full'
                />
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="relative hidden md:block">
              <div className="flex items-center gap-1 tracking-wide">
                {navLinks.map((link) => (
                  <div key={link.href}>
                    {link.children ? (
                      <DropdownMenu.Root>
                        <DropdownMenu.Trigger className="font-brand flex items-center gap-1 rounded-full px-3 py-2 text-sm xl:text-lg font-medium text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-blue-600 data-[state=open]:bg-neutral-100 data-[state=open]:text-blue-600">
                          {link.label} <FaChevronDown className="h-2.5 w-2.5" />
                        </DropdownMenu.Trigger>
                        <DropdownMenu.Content className="absolute left-1/2 top-full mt-3 w-136 -translate-x-1/2 rounded-3xl border border-neutral-200 bg-white z-100! p-4 shadow-2xl">
                          <div className="grid grid-cols-2 gap-2">
                            <DropdownMenu.Item asChild>
                              <Link href={link.href} className="font-brand col-span-2 rounded-2xl bg-blue-600/10 p-4 text-sm font-semibold text-blue-600">Explore {link.label}</Link>
                            </DropdownMenu.Item>
                            {link.children.map((child) => (
                              <DropdownMenu.Item key={child.href} asChild>
                                <Link key={child.href} href={child.href} className="font-brand rounded-2xl p-3 text-sm text-neutral-600 transition hover:bg-neutral-100 hover:text-blue-600 tracking-wide">{child.label}</Link>
                              </DropdownMenu.Item>
                            ))}
                          </div>
                        </DropdownMenu.Content>
                      </DropdownMenu.Root>
                    ) : (
                      <Link href={link.href} className="font-brand rounded-full px-3 py-2 text-sm xl:text-lg font-medium text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-blue-600">{link.label}</Link>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <Link href='/quote' className="font-brand hidden w-fit items-center gap-2 rounded-full border border-neutral-200 px-6 py-2.5 group transition-colors duration-400 hover:cursor-pointer bg-blue-600/10 text-blue-600 hover:bg-blue-600 hover:text-white md:flex text-sm font-semibold">
              Get a Quote <FaArrowRight className="-rotate-45 text-[10px] group-hover:rotate-0 transition-all duration-300" />
            </Link>

            {/* Mobile Menu Button */}
            <button
              className="rounded-full border border-neutral-200 p-2 text-foreground transition-colors hover:bg-neutral-100 md:hidden"
              onClick={() => {
                setMobileOpen(true);
                setOpenSubmenu(null);
              }}
              aria-label="Open menu"
            >
              <FaBars className="size-5" />
            </button>
          </div>
        </nav>
      </header>

      {/* ------------------------------------------------- FULLSCREEN MENU */}
      {/* Deliberately a dark, full-bleed surface (like the site's CTA cards
          and testimonial spotlight) rather than another light panel — one
          bold moment against an otherwise light system. */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-70 bg-neutral-900/97 backdrop-blur-2xl md:hidden w-full"
          >
            <div className="flex h-full flex-col">
              {/* Top row: logo + close */}
              <div className="flex items-center py-2.5 bg-popover/80 justify-between">
                <Link
                  href="/"
                  aria-label="Mega Resources Logo"
                  onClick={handleCloseMobileMenu}
                  className="rounded-xl text-[0.6rem] font-semibold block"
                >
                  <Mega_Logo
                  logo_height="50"
                  logo_width="200"
                  className='rotate-1'
                />
                </Link>
                <button
                  onClick={handleCloseMobileMenu}
                  aria-label="Close menu"
                  className="flex h-9 w-9 items-center justify-center rounded-full mr-3 p-1 border border-white/20 text-white transition-colors hover:bg-white/10 bg-foreground/20"
                >
                  <FaTimes className="size-7" />
                </button>
              </div>

              <section className="h-full w-full overflow-x-hidden overflow-y-scroll pb-5">
                {/* Numbered link list, staggers in from below */}
                <nav className="flex flex-col py-10">
                  {navLinks.map((link, i) => (
                    <motion.div
                      key={link.href}
                      custom={i}
                      variants={menuLinkVariants}
                      initial="hidden"
                      animate="show"
                      exit="hidden"
                      className="border-t border-white/10 py-4 first:border-t-0"
                    >
                      {link.children ? (
                        <div>
                          <button
                            type="button"
                            onClick={() =>
                              setOpenSubmenu((prev) => (prev === link.href ? null : link.href))
                            }
                            aria-expanded={openSubmenu === link.href}
                            className="group flex w-full items-center justify-between gap-4 text-white"
                          >
                            <span className="flex items-baseline gap-4">
                              <span className="text-sm font-semibold text-blue-500">
                                0{i + 1}
                              </span>
                              <span className="text-3xl text-white font-medium tracking-wide">
                                {link.label}
                              </span>
                            </span>
                            <FaChevronDown
                              className={cn(
                                "size-4 mr-2 text-white/60 transition-transform duration-300",
                                openSubmenu === link.href && "rotate-180 text-blue-500"
                              )}
                            />
                          </button>
                          <AnimatePresence initial={false}>
                            {openSubmenu === link.href && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                                className="overflow-hidden"
                              >
                                <div className="flex flex-col gap-1 pl-8 pt-5">
                                  <Link
                                    href={link.href}
                                    onClick={handleCloseMobileMenu}
                                    className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-500 py-1.5"
                                  >
                                    Explore {link.label}
                                  </Link>
                                  {link.children.map((child, ci) => (
                                    <Link
                                      key={child.href}
                                      href={child.href}
                                      onClick={handleCloseMobileMenu}
                                      className="group/child flex items-baseline gap-3 py-1.5 text-white/80 transition-colors hover:text-white"
                                    >
                                      <span className="text-xs font-semibold text-blue-500/80">
                                        {i + 1}-{String.fromCharCode(65 + ci)}
                                      </span>
                                      <span className="text-base font-medium tracking-wider transition-transform duration-300 group-hover/child:translate-x-2">
                                        {child.label}
                                      </span>
                                    </Link>
                                  ))}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ) : (
                        <Link
                          href={link.href}
                          onClick={handleCloseMobileMenu}
                          className="group flex items-baseline gap-4 text-white"
                        >
                          <span className="text-sm font-semibold text-blue-500">
                            0{i + 1}
                          </span>
                          <span className="text-3xl text-white font-medium tracking-wide transition-transform duration-300 group-hover:translate-x-2">
                            {link.label}
                          </span>
                        </Link>
                      )}
                    </motion.div>
                  ))}
                </nav>
                {/* CTA */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 16 }}
                  transition={{ delay: 0.12 + navLinks.length * 0.06, duration: 0.5 }}
                  className="mt-3 flex items-center justify-center"
                >
                  <Link
                    href='/quote'
                    onClick={handleCloseMobileMenu}
                    className="flex w-fit items-center justify-center gap-2 rounded-2xl mx-5 border border-white/20 py-3 px-6 text-white bg-white/10 transition-colors hover:bg-white hover:text-neutral-900"
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
                  className="mt-6 mx-3 flex flex-wrap items-center gap-x-6 gap-y-2 text-[0.78rem] uppercase tracking-[0.18em] text-white/70"
                >
                  <a href="tel:+233240000000" className="hover:text-white">
                    +233 24 000 0000
                  </a>
                  <a
                    href="mailto:info@megaresourcesltd.com"
                    className="hover:text-white"
                  >
                    info@megaresourcesltd.com
                  </a>
                  <span>Mon–Sat · 8am–5pm</span>
                </motion.div>
              </section>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;