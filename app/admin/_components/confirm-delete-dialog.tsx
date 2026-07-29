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
        <AlertDialog.Overlay className="fixed inset-0 z-70 bg-neutral-900/50 backdrop-blur-sm data-[state=open]:animate-in data-[state=open]:fade-in" />
        <AlertDialog.Content className="fixed left-1/2 top-1/2 z-70 w-[min(92vw,26rem)] -translate-x-1/2 -translate-y-1/2 rounded-[1.5rem] border border-neutral-200 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.12)]">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-red-50">
            <FaExclamationTriangle className="h-4 w-4 text-red-500" />
          </div>
          <AlertDialog.Title className="mt-4 font-display text-lg font-semibold text-neutral-900">
            {title}
          </AlertDialog.Title>
          <AlertDialog.Description className="mt-2 text-[0.88rem] leading-[1.6] text-neutral-500">
            {description}
          </AlertDialog.Description>
          <div className="mt-6 flex justify-end gap-3">
            <AlertDialog.Cancel asChild>
              <button className="rounded-full border border-neutral-300 px-4 py-2.5 text-[0.85rem] font-medium text-neutral-700 transition-colors hover:bg-neutral-100">
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