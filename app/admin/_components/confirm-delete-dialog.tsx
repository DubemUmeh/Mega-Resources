"use client";

import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { FaExclamationTriangle } from "react-icons/fa";

export function ConfirmDeleteDialog({
  open,
  onOpenChange,
  title,
  description,
  confirmLabel = "Delete",
  onConfirm,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  confirmLabel?: string;
  onConfirm: () => void;
}) {
  return (
    <AlertDialog.Root open={open} onOpenChange={onOpenChange}>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="fixed inset-0 z-70 bg-black/60 backdrop-blur-sm data-[state=open]:animate-in data-[state=open]:fade-in" />
        <AlertDialog.Content className="fixed left-1/2 top-1/2 z-70 w-[min(92vw,26rem)] -translate-x-1/2 -translate-y-1/2 rounded-4xl border border-[rgba(10,10,10,0.08)] bg-background p-6 shadow-2xl">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-red-500/10">
            <FaExclamationTriangle className="h-4 w-4 text-red-400" />
          </div>
          <AlertDialog.Title className="mt-4 font-display text-lg font-semibold text-foreground">
            {title}
          </AlertDialog.Title>
          <AlertDialog.Description className="mt-2 text-[0.88rem] leading-[1.6] text-muted-foreground">
            {description}
          </AlertDialog.Description>
          <div className="mt-6 flex justify-end gap-3">
            <AlertDialog.Cancel asChild>
              <button className="rounded-full border border-[rgba(10,10,10,0.08)] px-4 py-2.5 text-[0.85rem] font-medium text-foreground transition-colors hover:bg-foreground/5">
                Cancel
              </button>
            </AlertDialog.Cancel>
            <AlertDialog.Action asChild>
              <button
                onClick={onConfirm}
                className="rounded-full bg-red-500 px-4 py-2.5 text-[0.85rem] font-semibold text-white transition-colors hover:bg-red-600"
              >
                {confirmLabel}
              </button>
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}