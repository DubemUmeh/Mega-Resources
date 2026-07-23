"use client";

import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { FaChevronDown, FaCheck } from "react-icons/fa";

const ROLES = ["ADMIN", "SUPER_ADMIN"] as const;

export function RoleSelect({
  name = "role",
  defaultValue = "ADMIN",
}: {
  name?: string;
  defaultValue?: (typeof ROLES)[number];
}) {
  const [value, setValue] = React.useState<string>(defaultValue);

  return (
    <>
      {/* Keeps the existing server action (`addAuthorizedUser`) working unchanged */}
      <input type="hidden" name={name} value={value} />
      <SelectPrimitive.Root value={value} onValueChange={setValue}>
        <SelectPrimitive.Trigger
          className="flex w-full items-center justify-between gap-2 rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-blue-600/50"
          aria-label="Role"
        >
          <SelectPrimitive.Value />
          <SelectPrimitive.Icon>
            <FaChevronDown className="h-3 w-3 text-muted-foreground" />
          </SelectPrimitive.Icon>
        </SelectPrimitive.Trigger>
        <SelectPrimitive.Portal>
          <SelectPrimitive.Content
            position="popper"
            sideOffset={6}
            className="z-50 overflow-hidden rounded-xl border border-white/10 bg-[#1c1c1c] text-sm text-foreground shadow-xl"
          >
            <SelectPrimitive.Viewport className="p-1">
              {ROLES.map((role) => (
                <SelectPrimitive.Item
                  key={role}
                  value={role}
                  className="relative flex cursor-pointer select-none items-center rounded-lg px-3 py-2 pl-8 outline-none data-highlighted:bg-blue-600/20 data-[state=checked]:text-blue-400"
                >
                  <SelectPrimitive.ItemIndicator className="absolute left-2 inline-flex items-center">
                    <FaCheck className="h-3 w-3" />
                  </SelectPrimitive.ItemIndicator>
                  <SelectPrimitive.ItemText>{role}</SelectPrimitive.ItemText>
                </SelectPrimitive.Item>
              ))}
            </SelectPrimitive.Viewport>
          </SelectPrimitive.Content>
        </SelectPrimitive.Portal>
      </SelectPrimitive.Root>
    </>
  );
}