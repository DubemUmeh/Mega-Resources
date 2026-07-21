"use client";

import { useMemo, useState } from "react";
import * as Select from "@radix-ui/react-select";
import { FaChevronDown, FaCheck, FaPlus } from "react-icons/fa";
import { AdminTopbar } from "../_components/admin-topbar";
import { ConfirmDeleteDialog } from "../_components/confirm-delete-dialog";
import { ReviewRow } from "../_components/review-row";
import { EditReviewDialog } from "../_components/edit-review-dialog";
import { useToast } from "@/components/ui/toast";
import { Review, ReviewStatus, ServiceType, SERVICE_TYPES } from "@/db/types";
import { deleteReview, updateReview, updateReviewStatus } from "@/db/actions/reviews";

const STATUS_FILTERS = [
  { value: "all", label: "All Statuses" },
  { value: "pending", label: "Pending" },
  { value: "approved", label: "Approved" },
  { value: "rejected", label: "Rejected" },
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

export function AdminReviewsClient({ initialReviews }: { initialReviews: Review[] }) {
  const { showToast } = useToast();
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [service, setService] = useState("all");
  const [status, setStatus] = useState("all");
  const [editing, setEditing] = useState<Review | null>(null);
  const [editOpen, setEditOpen] = useState(false);
  const [pendingDelete, setPendingDelete] = useState<Review | null>(null);

  const serviceItems = [
    { value: "all", label: "All Services" },
    ...SERVICE_TYPES.map((s) => ({ value: s, label: s })),
  ];

  const filtered = useMemo(() => {
    return reviews.filter((r) => {
      const serviceMatch = service === "all" || r.services.includes(service as Review["services"][number]);
      const statusMatch = status === "all" || r.status === status;
      return serviceMatch && statusMatch;
    });
  }, [reviews, service, status]);

  async function handleSave(updated: Review) {
    const result = await updateReview(updated.id, {
      name: updated.name,
      title: updated.title,
      location: updated.location,
      services: updated.services,
      rating: updated.rating,
      message: updated.message,
    });
    if (!result.success) throw new Error(result.message);

    const existing = reviews.find((r) => r.id === updated.id);
    if (existing && existing.status !== updated.status) {
      const statusResult = await updateReviewStatus(updated.id, updated.status);
      if (!statusResult.success) throw new Error(statusResult.message);
    }

    setReviews((prev) => prev.map((r) => (r.id === updated.id ? updated : r)));
    showToast({ title: "Review updated", description: `${updated.name}'s review was saved.`, variant: "success" });
  }

  async function handleUpdateStatus(review: Review, nextStatus: ReviewStatus) {
    const result = await updateReviewStatus(review.id, nextStatus);
    if (!result.success) {
      showToast({ title: "Status not updated", description: result.message, variant: "error" });
      return;
    }
    setReviews((prev) =>
      prev.map((r) => (r.id === review.id ? { ...r, status: nextStatus } : r))
    );
    showToast({
      title: `Review ${nextStatus}`,
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

      {filtered.length === 0 ? (
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
              onUpdateStatus={(nextStatus) => handleUpdateStatus(review, nextStatus)}
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