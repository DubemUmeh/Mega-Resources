"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as Dialog from "@radix-ui/react-dialog";
import {
  FaTachometerAlt,
  FaStar,
  FaImages,
  FaUserLock,
  FaBars,
  FaTimes,
  FaEnvelope,
  FaFileInvoice,
  FaCog,
} from "react-icons/fa";
import { LogOutIcon } from "lucide-react";
import { Mega_Logo } from "@/components/logo";

const NAV_ITEMS = [
  { href: "/admin", label: "Overview", icon: FaTachometerAlt, exact: true },
  { href: "/admin/reviews", label: "Reviews", icon: FaStar, exact: false },
  { href: "/admin/portfolio", label: "Portfolio", icon: FaImages, exact: false },
  { href: "/admin/contact-requests", label: "Contact Requests", icon: FaEnvelope, exact: false },
  { href: "/admin/quote-requests", label: "Quote Requests", icon: FaFileInvoice, exact: false },
  { href: "/admin/settings", label: "Settings", icon: FaCog, exact: false },
];

function isActive(pathname: string, href: string, exact: boolean) {
  if (exact) return pathname === href;
  return pathname === href || pathname.startsWith(`${href}/`);
}

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <>
      <div className="flex flex-col items-start gap-2.5 px-0 pb-7">
        <div className="w-full bg-gray-400 pt-5">
          <Mega_Logo logo_height="50" logo_width="200" className="rotate-1" />
        </div>
        <p className="uppercase font-bold tracking-widest text-muted-foreground leading-tight mt-3 px-4">
          <span className="flex gap-2">
            <FaUserLock size={25} color="blue" />
            <span className="text-sm mt-2">Admin</span>
          </span>
        </p>
      </div>

      <nav className="flex-1 space-y-1 px-3">
        {NAV_ITEMS.map((item) => {
          const active = isActive(pathname, item.href, item.exact);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={`flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-[0.88rem] font-medium transition-colors ${
                active
                  ? "bg-blue-600/12 text-blue-600"
                  : "text-muted-foreground hover:bg-foreground/5 hover:text-foreground"
              }`}
            >
              <Icon className="h-3.5 w-3.5 flex-none" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-[rgba(10,10,10,0.08)] p-3">
        <a
          href="/api/auth/logout"
          onClick={onNavigate}
          className="flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-[0.85rem] font-medium text-muted-foreground transition-colors hover:bg-foreground/5 hover:text-foreground"
        >
          <LogOutIcon className="h-3 w-3 flex-none" />
          Logout
        </a>
      </div>
    </>
  );
}

export function AdminSidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-none border-r border-[rgba(10,10,10,0.08)] bg-[rgba(20,20,20,0.6)] backdrop-blur-xl lg:flex lg:flex-col">
        <SidebarContent />
      </aside>

      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Trigger asChild>
          <button
            type="button"
            className="fixed left-4 top-4 z-50 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-background/85 text-white shadow-lg backdrop-blur lg:hidden"
            aria-label="Open admin menu"
          >
            <FaBars className="h-4 w-4" />
          </button>
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm data-[state=closed]:animate-out data-[state=open]:animate-in" />
          <Dialog.Content className="fixed inset-y-0 left-0 z-50 flex w-[min(20rem,85vw)] flex-col border-r border-white/10 bg-background shadow-2xl outline-none data-[state=closed]:animate-out data-[state=closed]:slide-out-to-left data-[state=open]:animate-in data-[state=open]:slide-in-from-left lg:hidden">
            <Dialog.Title className="sr-only">Admin navigation menu</Dialog.Title>
            <Dialog.Close asChild>
              <button
                type="button"
                className="absolute right-3 top-3 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-white transition-colors hover:bg-black/60"
                aria-label="Close admin menu"
              >
                <FaTimes className="h-3.5 w-3.5" />
              </button>
            </Dialog.Close>
            <SidebarContent onNavigate={() => setOpen(false)} />
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}