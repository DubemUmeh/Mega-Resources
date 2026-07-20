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
        <p className="text-muted-foreground">Loading project…</p>
      ) : !existing ? (
        <div className="rounded-[1.5rem] border border-[rgba(10,10,10,0.08)] bg-[rgba(36,35,35,0.5)] p-8 text-center">
          <p className="text-foreground">We couldn&apos;t find that project.</p>
          <Link
            href="/admin/portfolio"
            className="mt-4 inline-flex items-center gap-2 text-[0.85rem] font-medium text-blue-600"
          >
            <FaArrowLeft className="h-2.5 w-2.5" /> Back to portfolio
          </Link>
        </div>
      ) : (
        <PortfolioForm initial={existing} onSubmit={handleSubmit} submitLabel="Save Changes" />
      )}
    </DesktopGate>
  );
}