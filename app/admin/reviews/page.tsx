"use client";

import { useEffect, useMemo, useState } from "react";
import * as Select from "@radix-ui/react-select";
import { FaChevronDown, FaCheck, FaPlus } from "react-icons/fa";
import { AdminTopbar } from "../_components/admin-topbar";
import { ConfirmDeleteDialog } from "../_components/confirm-delete-dialog";
import { ReviewRow } from "../_components/review-row";
import { EditReviewDialog } from "../_components/edit-review-dialog";
import { useToast } from "@/components/ui/toast";
import { Review, SERVICE_TYPES, ServiceType } from "@/db/types";
import { deleteReview, getAllReviewsForAdmin, updateReview, updateReviewStatus } from "@/db/actions/reviews";

const STATUS_FILTERS = [
  { value: "all", label: "All Statuses" },
  { value: "verified", label: "Verified" },
  { value: "pending", label: "Pending" },
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

export default function AdminReviewsPage() {
  const { showToast } = useToast();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [ready, setReady] = useState(false);
  const [service, setService] = useState("all");
  const [status, setStatus] = useState("all");
  const [editing, setEditing] = useState<Review | null>(null);
  const [editOpen, setEditOpen] = useState(false);
  const [pendingDelete, setPendingDelete] = useState<Review | null>(null);

  useEffect(() => {
    let active = true;
    getAllReviewsForAdmin()
      .then((rows) => {
        if (!active) return;
        setReviews(
          rows.map((r) => ({
            id: r.id,
            name: r.name,
            title: r.title ?? undefined,
            location: r.location,
            service: r.services as Review["service"],
            rating: r.rating,
            message: r.message,
            date: new Date(r.createdAt).toLocaleDateString("en-US", { month: "long", year: "numeric" }),
            verified: r.verified,
          })),
        );
      })
      .finally(() => {
        if (active) setReady(true);
      });
    return () => {
      active = false;
    };
  }, []);

  const serviceItems = [
    { value: "all", label: "All Services" },
    ...SERVICE_TYPES.map((s) => ({ value: s, label: s })),
  ];

  const filtered = useMemo(() => {
    return reviews.filter((r) => {
      const serviceMatch = service === "all" || r.service.includes(service as Review["service"][number]);
      const statusMatch =
        status === "all" || (status === "verified" ? r.verified : !r.verified);
      return serviceMatch && statusMatch;
    });
  }, [reviews, service, status]);

  async function handleSave(updated: Review) {
    const result = await updateReview(updated.id, {
      name: updated.name,
      title: updated.title,
      location: updated.location,
      services: updated.service,
      rating: updated.rating,
      message: updated.message,
      verified: updated.verified,
    });
    if (!result.success) throw new Error(result.message);
    setReviews((prev) => prev.map((r) => (r.id === updated.id ? updated : r)));
    showToast({ title: "Review updated", description: `${updated.name}'s review was saved.`, variant: "success" });
  }

  async function handleToggleVerified(review: Review) {
    const nextVerified = !review.verified;
    const result = await updateReviewStatus(review.id, nextVerified ? "approved" : "pending");
    if (!result.success) {
      showToast({ title: "Status not updated", description: result.message, variant: "error" });
      return;
    }
    setReviews((prev) =>
      prev.map((r) => (r.id === review.id ? { ...r, verified: nextVerified } : r))
    );
    showToast({
      title: review.verified ? "Marked as pending" : "Review verified",
      description: `${review.name}'s review status was updated.`,
      variant: "success",
    });
  }

  async function handleDelete() {
    if (!pendingDelete) return;
    const result = await deleteReview(pendingDelete.id);
    if (!result.success) {
      showToast({ title: "Review not deleted", description: result.message, variant: "error" });
      return;
    }
    setReviews((prev) => prev.filter((r) => r.id !== pendingDelete.id));
    showToast({
      title: "Review deleted",
      description: `${pendingDelete.name}'s review was removed.`,
      variant: "success",
    });
    setPendingDelete(null);
  }

  return (
    <div>
      <AdminTopbar
        title="Reviews"
        description={`${reviews.length} review${reviews.length === 1 ? "" : "s"} total`}
        actions={
          <span
            className="hidden items-center gap-2 rounded-full bg-blue-600 px-4 py-2.5 text-[0.85rem] font-semibold text-white opacity-60 lg:inline-flex"
            title="New reviews normally arrive from clients — this is here for manual entry on desktop."
          >
            <FaPlus className="h-2.5 w-2.5" /> Add Review
          </span>
        }
      />

      <div className="mb-6 flex flex-wrap gap-3">
        <SelectField
          value={service}
          onChange={(v) => setService(v as ServiceType | "all")}
          items={serviceItems}
          ariaLabel="Filter by service"
        />
        <SelectField value={status} onChange={setStatus} items={STATUS_FILTERS} ariaLabel="Filter by status" />
        {(service !== "all" || status !== "all") && (
          <button
            onClick={() => {
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
        <p className="mt-16 text-center text-muted-foreground">Loading reviews…</p>
      ) : filtered.length === 0 ? (
        <p className="mt-16 text-center text-muted-foreground">No reviews match those filters.</p>
      ) : (
        <div className="space-y-3">
          {filtered.map((review) => (
            <ReviewRow
              key={review.id}
              review={review}
              onEdit={() => {
                setEditing(review);
                setEditOpen(true);
              }}
              onDelete={() => setPendingDelete(review)}
              onToggleVerified={() => handleToggleVerified(review)}
            />
          ))}
        </div>
      )}

      <EditReviewDialog review={editing} open={editOpen} onOpenChange={setEditOpen} onSave={handleSave} />

      <ConfirmDeleteDialog
        open={!!pendingDelete}
        onOpenChange={(open) => !open && setPendingDelete(null)}
        title="Delete this review?"
        description={
          pendingDelete
            ? `This will permanently remove ${pendingDelete.name}'s review. This can't be undone.`
            : ""
        }
        onConfirm={handleDelete}
      />
    </div>
  );
}