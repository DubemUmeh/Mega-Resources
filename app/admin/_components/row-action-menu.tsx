// _components/row-actions-menu.tsx
"use client";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { FaEllipsisV } from "react-icons/fa";
import { IconType } from "react-icons";

export interface RowAction {
  icon: IconType;
  label: string;
  onClick: () => void;
  tone?: "default" | "accent" | "danger";
}

export function RowActionsMenu({ actions }: { actions: RowAction[] }) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          type="button"
          aria-label="Row actions"
          className="flex h-8 w-8 items-center justify-center rounded-full bg-background/80 text-muted-foreground backdrop-blur-sm transition-colors hover:bg-foreground/10 hover:text-foreground data-[state=open]:bg-foreground/10 data-[state=open]:text-foreground"
        >
          <FaEllipsisV className="h-3.5 w-3.5" />
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align="end"
          sideOffset={6}
          className="z-50 w-48 overflow-hidden rounded-xl border border-[rgba(10,10,10,0.08)] bg-background p-1.5 shadow-xl data-[state=open]:animate-in data-[state=open]:fade-in"
        >
          {actions.map((action) => {
            const Icon = action.icon;
            return (
              <DropdownMenu.Item
                key={action.label}
                onSelect={() => action.onClick()}
                className={`flex cursor-pointer items-center gap-2.5 rounded-lg px-3 py-2 text-[0.85rem] outline-none ${
                  action.tone === "danger"
                    ? "text-red-500 data-highlighted:bg-red-500/10"
                    : action.tone === "accent"
                    ? "text-blue-600 data-highlighted:bg-blue-600/10"
                    : "text-foreground data-highlighted:bg-foreground/8"
                }`}
              >
                <Icon className="h-3 w-3" />
                {action.label}
              </DropdownMenu.Item>
            );
          })}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}