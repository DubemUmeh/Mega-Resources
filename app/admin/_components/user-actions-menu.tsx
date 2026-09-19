"use client";

import { useState } from "react";
import { MoreVertical, Ban, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { disableAuthorizedUser, removeAuthorizedUser } from "../admin-users-actions";
import { useToast } from "@/components/ui/toast";

export function UserActionsMenu({ user }: { user: { id: string; name: string; active: boolean } }) {
  const { showToast } = useToast();
  const [actionType, setActionType] = useState<"disable" | "remove" | null>(null);
  const [isPending, setIsPending] = useState(false);

  async function handleAction() {
    if (!actionType) return;
    setIsPending(true);
    try {
      if (actionType === "disable") {
        await disableAuthorizedUser(user.id);
        showToast({ title: "User Disabled", description: `${user.name} has been disabled.`, variant: "success" });
      } else if (actionType === "remove") {
        await removeAuthorizedUser(user.id);
        showToast({ title: "User Removed", description: `${user.name} has been removed.`, variant: "success" });
      }
    } catch (error) {
      showToast({ title: "Error", description: "Something went wrong.", variant: "error" });
    } finally {
      setIsPending(false);
      setActionType(null);
    }
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="h-8 w-8 inline-flex items-center justify-center rounded-md hover:bg-neutral-100 transition-colors">
            <MoreVertical className="h-4 w-4 text-neutral-600" />
            <span className="sr-only">Open menu</span>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px]">
          {user.active && (
            <DropdownMenuItem
              className="text-amber-600 focus:bg-amber-50 focus:text-amber-700 cursor-pointer"
              onClick={() => setActionType("disable")}
            >
              <Ban className="mr-2 h-4 w-4" />
              <span>Disable</span>
            </DropdownMenuItem>
          )}
          <DropdownMenuItem
            className="text-red-600 focus:bg-red-50 focus:text-red-700 cursor-pointer"
            onClick={() => setActionType("remove")}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            <span>Remove</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={!!actionType} onOpenChange={(open) => !open && setActionType(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              {actionType === "disable"
                ? `This will disable ${user.name}'s account. They will no longer be able to log in.`
                : `This will permanently remove ${user.name} from the authorized users list.`}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              disabled={isPending}
              onClick={(e) => {
                e.preventDefault();
                handleAction();
              }}
              className={actionType === "disable" ? "bg-amber-600 hover:bg-amber-700" : "bg-red-600 hover:bg-red-700"}
            >
              {isPending ? "Processing..." : "Continue"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
