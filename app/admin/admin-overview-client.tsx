"use client";

import Link from "next/link";
import { FaStar, FaImages, FaCheckCircle, FaPlus, FaArrowRight, FaEnvelope, FaFileInvoice, FaPlug } from "react-icons/fa";
import type { GmailListItem } from "@/lib/gmail-client";
import { AdminTopbar } from "./_components/admin-topbar";
import { usePortfolioStore } from "./_components/portfolio-store";

export function AdminOverviewClient({
  totalReviews,
  avgRating,
  pendingReviews,
  unreadGmailMessages,
  recentContactRequests,
  recentQuoteRequests,
  googleConnected,
}: {
  totalReviews: number;
  avgRating: number;
  pendingReviews: number;
  unreadGmailMessages: number;
  recentContactRequests: GmailListItem[];
  recentQuoteRequests: GmailListItem[];
  googleConnected: boolean;
}) {
  const { portfolios } = usePortfolioStore();
  const publishedPortfolio = portfolios.filter((p) => p.status === "published").length;
  const draftPortfolio = portfolios.filter((p) => p.status === "draft").length;

  const stats = [
    { label: "Average Rating", value: avgRating.toFixed(1), icon: FaStar },
    { label: "Total Reviews", value: String(totalReviews), icon: FaCheckCircle },
    { label: "Pending Approval", value: String(pendingReviews), icon: FaCheckCircle },
    { label: "Published Projects", value: String(publishedPortfolio), icon: FaImages },
    { label: "Unread Gmail", value: String(unreadGmailMessages), icon: FaEnvelope },
    { label: "Google", value: googleConnected ? "Connected" : "Offline", icon: FaPlug },
  ];

  return (
    <div>
      <AdminTopbar
        title="Overview"
        description="A quick look at reviews and portfolio activity."
      />

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="rounded-[1.5rem] border border-[rgba(10,10,10,0.08)] bg-[rgba(36,35,35,0.5)] p-6"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600/10">
                <Icon className="h-3.5 w-3.5 text-blue-600" />
              </div>
              <p className="mt-4 font-display text-3xl font-bold tracking-tight text-foreground">
                {stat.value}
              </p>
              <p className="mt-1 text-[0.82rem] text-muted-foreground">{stat.label}</p>
            </div>
          );
        })}
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-2">
        <div className="rounded-[1.5rem] border border-[rgba(10,10,10,0.08)] bg-[rgba(36,35,35,0.5)] p-6">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-base font-semibold text-foreground">Reviews</h2>
            <Link
              href="/admin/reviews"
              className="flex items-center gap-1.5 text-[0.8rem] font-medium text-blue-600"
            >
              Manage <FaArrowRight className="h-2.5 w-2.5" />
            </Link>
          </div>
          <p className="mt-2 text-[0.85rem] leading-[1.6] text-muted-foreground">
            {pendingReviews > 0
              ? `${pendingReviews} review${pendingReviews > 1 ? "s" : ""} waiting for approval.`
              : "All reviews are moderated — nothing pending."}
          </p>
        </div>

        <div className="rounded-[1.5rem] border border-[rgba(10,10,10,0.08)] bg-[rgba(36,35,35,0.5)] p-6">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-base font-semibold text-foreground">Portfolio</h2>
            <Link
              href="/admin/portfolio/add"
              className="flex items-center gap-1.5 rounded-full bg-blue-600 px-3.5 py-1.5 text-[0.78rem] font-semibold text-white transition-colors hover:bg-blue-700"
            >
              <FaPlus className="h-2.5 w-2.5" /> Add project
            </Link>
          </div>
          <p className="mt-2 text-[0.85rem] leading-[1.6] text-muted-foreground">
            {draftPortfolio > 0
              ? `${draftPortfolio} project${draftPortfolio > 1 ? "s" : ""} saved as drafts.`
              : "Every project in the portfolio is published."}
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-2">
        {[{ title: "Recent Contact Requests", href: "/admin/contact-requests", items: recentContactRequests, icon: FaEnvelope }, { title: "Recent Quote Requests", href: "/admin/quote-requests", items: recentQuoteRequests, icon: FaFileInvoice }].map((section) => {
          const Icon = section.icon;
          return <div key={section.title} className="rounded-[1.5rem] border border-[rgba(10,10,10,0.08)] bg-[rgba(36,35,35,0.5)] p-6"><div className="flex items-center justify-between"><h2 className="flex items-center gap-2 font-display text-base font-semibold text-foreground"><Icon className="h-3.5 w-3.5 text-blue-500" />{section.title}</h2><Link href={section.href} className="text-[0.8rem] font-medium text-blue-600">View all</Link></div><div className="mt-4 space-y-3">{section.items.length ? section.items.map((item) => <div key={item.id} className="rounded-xl bg-black/15 p-3"><p className="truncate text-sm font-medium">{item.subject}</p><p className="truncate text-xs text-muted-foreground">{item.fromName || item.fromEmail} — {item.preview}</p></div>) : <p className="text-sm text-muted-foreground">No recent matching Gmail messages.</p>}</div></div>;
        })}
      </div>
    </div>
  );
}