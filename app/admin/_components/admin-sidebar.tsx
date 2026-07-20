"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaTachometerAlt,
  FaStar,
  FaImages,
  FaExternalLinkAlt,
  FaTint,
} from "react-icons/fa";
import { LogOutIcon } from "lucide-react";

const NAV_ITEMS = [
  { href: "/admin", label: "Overview", icon: FaTachometerAlt, exact: true },
  { href: "/admin/reviews", label: "Reviews", icon: FaStar, exact: false },
  { href: "/admin/portfolio", label: "Portfolio", icon: FaImages, exact: false },
];

function isActive(pathname: string, href: string, exact: boolean) {
  if (exact) return pathname === href;
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-none border-r border-[rgba(10,10,10,0.08)] bg-[rgba(20,20,20,0.6)] backdrop-blur-xl lg:flex lg:flex-col">
      <div className="flex items-center gap-2.5 px-6 py-7">
        <div className="flex h-9 w-9 flex-none items-center justify-center rounded-xl bg-blue-600/15">
          <FaTint className="h-4 w-4 text-blue-600" />
        </div>
        <div className="leading-tight">
          <p className="font-display text-[0.95rem] font-semibold text-foreground">
            Mega Resources LTD
          </p>
          <p className="text-[0.7rem] uppercase tracking-widest text-muted-foreground">
            Admin
          </p>
        </div>
      </div>

      <nav className="flex-1 space-y-1 px-3">
        {NAV_ITEMS.map((item) => {
          const active = isActive(pathname, item.href, item.exact);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
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
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-[0.85rem] font-medium text-muted-foreground transition-colors hover:bg-foreground/5 hover:text-foreground"
        >
          <LogOutIcon className="h-3 w-3 flex-none" />
          Logout
        </Link>
      </div>
    </aside>
  );
}