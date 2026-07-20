"use client";

import { useRouter } from "next/navigation";
import { AdminTopbar } from "../../_components/admin-topbar";
import { DesktopGate } from "../../_components/desktop-gate";
import { PortfolioForm } from "../../_components/portfolio-form";
import { usePortfolioStore } from "../../_components/portfolio-store";
import { Portfolio } from "@/db/types";

export default function AddPortfolioPage() {
  const router = useRouter();
  const { addPortfolio } = usePortfolioStore();

  function handleSubmit(portfolio: Portfolio) {
    addPortfolio(portfolio);
    router.push("/admin/portfolio");
  }

  return (
    <DesktopGate backHref="/admin/portfolio">
      <AdminTopbar
        title="Add Project"
        description="Add a completed job to the public portfolio."
      />
      <PortfolioForm onSubmit={handleSubmit} submitLabel="Publish Project" />
    </DesktopGate>
  );
}