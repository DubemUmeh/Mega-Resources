"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import { AdminTopbar } from "../../../_components/admin-topbar";
import { DesktopGate } from "../../../_components/desktop-gate";
import { PortfolioForm } from "../../../_components/portfolio-form";
import { usePortfolioStore } from "@/app/admin/_components/portfolio-store";
import { Portfolio } from "@/db/types";

export default function EditPortfolioPage() {
  const params = useParams<{ id: string }>();
  const { ready, getPortfolio, updatePortfolio } = usePortfolioStore();
  const existing = getPortfolio(params.id);

  async function handleSubmit(portfolio: Portfolio) {
    await updatePortfolio(portfolio);
  }

  return (
    <DesktopGate backHref="/admin/portfolio">
      <AdminTopbar title="Edit Project" description={existing?.title} />

      {!ready ? (
        <p className="text-neutral-500">Loading project…</p>
      ) : !existing ? (
        <div className="rounded-[1.5rem] border border-neutral-200 bg-white p-8 text-center shadow-[0_18px_50px_rgba(15,23,42,0.05)]">
          <p className="text-neutral-900">We couldn&apos;t find that project.</p>
          <Link
            href="/admin/portfolio"
            className="mt-4 inline-flex items-center gap-2 text-[0.85rem] font-medium text-blue-600"
          >
            <FaArrowLeft className="h-2.5 w-2.5" /> Back to gallery
          </Link>
        </div>
      ) : (
        <PortfolioForm initial={existing} onSubmit={handleSubmit} submitLabel="Save Changes" />
      )}
    </DesktopGate>
  );
}