"use client";

import { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu"
import { FaTimes, FaChevronDown, FaCheck } from "react-icons/fa";
import { StarInput } from "./star-input";
import { Review, SERVICE_TYPES } from "@/db/types";

export function EditReviewDialog({
  review,
  open,
  onOpenChange,
  onSave,
}: {
  review: Review | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (review: Review) => void;
}) {
  const [draft, setDraft] = useState<Review | null>(review);

  useEffect(() => {
    setDraft(review);
  }, [review]);

  if (!draft) return null;

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm data-[state=open]:animate-in data-[state=open]:fade-in" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-[min(95vw,42rem)] -translate-x-1/2 -translate-y-1/2 rounded-[1.5rem] border border-[rgba(10,10,10,0.08)] bg-background p-7 shadow-2xl">
          <div className="mb-5 flex items-start justify-between">
            <Dialog.Title className="font-display text-xl font-semibold text-foreground">
              Edit Review
            </Dialog.Title>
            <Dialog.Close className="rounded-full p-2 text-muted-foreground hover:bg-foreground/10 hover:text-foreground transition-colors">
              <FaTimes className="h-3.5 w-3.5" />
            </Dialog.Close>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              onSave(draft);
              onOpenChange(false);
            }}
            className="space-y-5"
          >
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-foreground">Rating</label>
              <StarInput value={draft.rating} onChange={(n) => setDraft({ ...draft, rating: n })} />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-foreground">Name</label>
                <input
                  value={draft.name}
                  onChange={(e) => setDraft({ ...draft, name: e.target.value })}
                  className="w-full rounded-xl border border-[rgba(10,10,10,0.08)] bg-[rgba(36,35,35,0.5)] px-4 py-2.5 text-[0.92rem] text-foreground outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-foreground">City / Region</label>
                <input
                  value={draft.location}
                  onChange={(e) => setDraft({ ...draft, location: e.target.value })}
                  className="w-full rounded-xl border border-[rgba(10,10,10,0.08)] bg-[rgba(36,35,35,0.5)] px-4 py-2.5 text-[0.92rem] text-foreground outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-foreground">
                Role / Company <span className="text-muted-foreground font-normal">(optional)</span>
              </label>
              <input
                value={draft.title ?? ""}
                onChange={(e) => setDraft({ ...draft, title: e.target.value })}
                className="w-full rounded-xl border border-[rgba(10,10,10,0.08)] bg-[rgba(36,35,35,0.5)] px-4 py-2.5 text-[0.92rem] text-foreground outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-foreground">Services Used</label>
              <DropdownMenu.Root>
                <DropdownMenu.Trigger asChild>
                  <button
                    type="button"
                    className="flex w-full items-center justify-between rounded-xl border border-[rgba(10,10,10,0.08)] bg-[rgba(36,35,35,0.5)] px-4 py-2.5 text-left text-[0.92rem] text-foreground outline-none focus:ring-2 focus:ring-blue-600"
                  >
                    <span className="truncate">
                      {draft.service.length > 0 ? draft.service.join(", ") : "Select services"}
                    </span>
                    <FaChevronDown className="h-2.5 w-2.5 shrink-0 text-muted-foreground" />
                  </button>
                </DropdownMenu.Trigger>
                <DropdownMenu.Portal>
                  <DropdownMenu.Content
                    align="start"
                    sideOffset={8}
                    className="z-60 w-(--radix-dropdown-menu-trigger-width) overflow-hidden rounded-xl border border-[rgba(10,10,10,0.08)] bg-background p-1.5 shadow-xl"
                  >
                    {SERVICE_TYPES.map((s) => {
                      const checked = draft.service.includes(s);
                      return (
                        <DropdownMenu.CheckboxItem
                          key={s}
                          checked={checked}
                          onSelect={(e) => e.preventDefault()} // keep menu open on click
                          onCheckedChange={(isChecked) =>
                            setDraft({
                              ...draft,
                              service: isChecked
                                ? [...draft.service, s]
                                : draft.service.filter((x) => x !== s),
                            })
                          }
                          className="flex cursor-pointer items-center justify-between gap-3 rounded-lg px-3 py-2 text-[0.88rem] text-foreground outline-none data-highlighted:bg-blue-600/10 data-highlighted:text-blue-600"
                        >
                          {s}
                          <DropdownMenu.ItemIndicator>
                            <FaCheck className="h-2.5 w-2.5 text-blue-600" />
                          </DropdownMenu.ItemIndicator>
                        </DropdownMenu.CheckboxItem>
                      );
                    })}
                  </DropdownMenu.Content>
                </DropdownMenu.Portal>
              </DropdownMenu.Root>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-foreground">Message</label>
              <textarea
                value={draft.message}
                onChange={(e) => setDraft({ ...draft, message: e.target.value })}
                rows={4}
                maxLength={500}
                className="w-full resize-none rounded-xl border border-[rgba(10,10,10,0.08)] bg-[rgba(36,35,35,0.5)] px-4 py-2.5 text-[0.92rem] text-foreground outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <label className="flex items-center gap-2.5 text-[0.85rem] text-foreground">
              <input
                type="checkbox"
                checked={draft.verified}
                onChange={(e) => setDraft({ ...draft, verified: e.target.checked })}
                className="h-4 w-4 rounded border-[rgba(10,10,10,0.2)] accent-blue-600"
              />
              Verified client
            </label>

            <div className="flex justify-end gap-3 pt-1">
              <Dialog.Close asChild>
                <button
                  type="button"
                  className="rounded-full border border-[rgba(10,10,10,0.08)] px-5 py-2.5 text-[0.85rem] font-medium text-foreground transition-colors hover:bg-foreground/5"
                >
                  Cancel
                </button>
              </Dialog.Close>
              <button
                type="submit"
                className="rounded-full bg-blue-600 px-5 py-2.5 text-[0.85rem] font-semibold text-white transition-colors hover:bg-blue-700"
              >
                Save Changes
              </button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}