"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import * as Select from "@radix-ui/react-select";
import { FaChevronDown, FaCheck, FaPlus } from "react-icons/fa";
import { AdminTopbar } from "../_components/admin-topbar";
import { ConfirmDeleteDialog } from "../_components/confirm-delete-dialog";
import { useToast } from "@/components/ui/toast";
import { usePortfolioStore } from "../_components/portfolio-store";
import { Portfolio, SERVICE_TYPES, REGIONS } from "@/db/types";
import { PortfolioRow } from "../_components/portfolio-row";

const STATUS_FILTERS = [
  { value: "all", label: "All Statuses" },
  { value: "published", label: "Published" },
  { value: "draft", label: "Draft" },
];

function SelectField({
  value,
  onChange,
  items,
  ariaLabel,
}: {
  value: string;
  onChange: (v: string) => void;
  items: { value: string; label: string }[];
  ariaLabel: string;
}) {
  return (
    <Select.Root value={value} onValueChange={onChange}>
      <Select.Trigger
        aria-label={ariaLabel}
        className="inline-flex items-center gap-2 rounded-full border border-[rgba(10,10,10,0.08)] bg-[rgba(36,35,35,0.5)] px-4 py-2.5 text-[0.85rem] font-medium text-foreground outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
      >
        <Select.Value />
        <Select.Icon>
          <FaChevronDown className="h-2.5 w-2.5 text-muted-foreground" />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content
          position="popper"
          sideOffset={8}
          className="z-50 overflow-hidden rounded-xl border border-[rgba(10,10,10,0.08)] bg-background shadow-xl"
        >
          <Select.Viewport className="p-1.5">
            {items.map((item) => (
              <Select.Item
                key={item.value}
                value={item.value}
                className="flex cursor-pointer items-center justify-between gap-3 rounded-lg px-3 py-2 text-[0.85rem] text-foreground outline-none data-highlighted:bg-blue-600/10 data-highlighted:text-blue-600"
              >
                <Select.ItemText>{item.label}</Select.ItemText>
                <Select.ItemIndicator>
                  <FaCheck className="h-2.5 w-2.5 text-blue-600" />
                </Select.ItemIndicator>
              </Select.Item>
            ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}

export default function AdminPortfolioPage() {
  const { showToast } = useToast();
  const { portfolios, ready, updatePortfolio, deletePortfolio } = usePortfolioStore();
  const [region, setRegion] = useState("all");
  const [service, setService] = useState("all");
  const [status, setStatus] = useState("all");
  const [pendingDelete, setPendingDelete] = useState<Portfolio | null>(null);

  const regionItems = [{ value: "all", label: "All Regions" }, ...REGIONS.map((r) => ({ value: r, label: r }))];
  const serviceItems = [
    { value: "all", label: "All Services" },
    ...SERVICE_TYPES.map((s) => ({ value: s, label: s })),
  ];

  const filtered = useMemo(() => {
    return portfolios.filter((p) => {
      const regionMatch = region === "all" || p.region === region;
      const serviceMatch = service === "all" || p.service === service;
      const statusMatch = status === "all" || p.status === status;
      return regionMatch && serviceMatch && statusMatch;
    });
  }, [portfolios, region, service, status]);

  async function handleToggleFeatured(p: Portfolio) {
    await updatePortfolio({ ...p, featured: !p.featured });
    showToast({
      title: p.featured ? "Removed from homepage" : "Featured on homepage",
      description: `"${p.title}" was updated.`,
      variant: "success",
    });
  }

  async function handleDelete() {
    if (!pendingDelete) return;
    await deletePortfolio(pendingDelete.id);
    showToast({
      title: "Project deleted",
      description: `"${pendingDelete.title}" was removed.`,
      variant: "success",
    });
    setPendingDelete(null);
  }

  return (
    <div>
      <AdminTopbar
        title="Portfolio"
        description={`${portfolios.length} project${portfolios.length === 1 ? "" : "s"} total`}
        actions={
          <Link
            href="/admin/portfolio/add"
            className="hidden items-center gap-2 rounded-full bg-blue-600 px-4 py-2.5 text-[0.85rem] font-semibold text-white transition-colors hover:bg-blue-700 lg:inline-flex"
          >
            <FaPlus className="h-2.5 w-2.5" /> Add Project
          </Link>
        }
      />

      <p className="mb-6 -mt-4 text-[0.8rem] text-muted-foreground lg:hidden">
        Adding and editing projects is available on desktop or laptop screens.
      </p>

      <div className="mb-6 flex flex-wrap gap-3">
        <SelectField value={region} onChange={setRegion} items={regionItems} ariaLabel="Filter by region" />
        <SelectField value={service} onChange={setService} items={serviceItems} ariaLabel="Filter by service" />
        <SelectField value={status} onChange={setStatus} items={STATUS_FILTERS} ariaLabel="Filter by status" />
        {(region !== "all" || service !== "all" || status !== "all") && (
          <button
            onClick={() => {
              setRegion("all");
              setService("all");
              setStatus("all");
            }}
            className="text-[0.85rem] font-medium text-blue-600 underline underline-offset-4"
          >
            Clear filters
          </button>
        )}
      </div>

      {!ready ? (
        <p className="mt-16 text-center text-muted-foreground">Loading projects…</p>
      ) : filtered.length === 0 ? (
        <p className="mt-16 text-center text-muted-foreground">No projects match those filters.</p>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <PortfolioRow
              key={p.id}
              portfolio={p}
              onDelete={() => setPendingDelete(p)}
              onToggleFeatured={() => handleToggleFeatured(p)}
            />
          ))}
        </div>
      )}

      <ConfirmDeleteDialog
        open={!!pendingDelete}
        onOpenChange={(open) => !open && setPendingDelete(null)}
        title="Delete this project?"
        description={
          pendingDelete
            ? `This will permanently remove "${pendingDelete.title}" from the portfolio. This can't be undone.`
            : ""
        }
        onConfirm={handleDelete}
      />
    </div>
  );
}