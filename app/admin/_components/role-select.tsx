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
          className="flex w-full items-center justify-between gap-2 rounded-xl border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 outline-none transition-colors focus:border-blue-600 focus:ring-2 focus:ring-blue-600/15"
          aria-label="Role"
        >
          <SelectPrimitive.Value />
          <SelectPrimitive.Icon>
            <FaChevronDown className="h-3 w-3 text-neutral-400" />
          </SelectPrimitive.Icon>
        </SelectPrimitive.Trigger>
        <SelectPrimitive.Portal>
          <SelectPrimitive.Content
            position="popper"
            sideOffset={6}
            className="z-50 overflow-hidden rounded-xl border border-neutral-200 bg-white text-sm text-neutral-900 shadow-[0_18px_50px_rgba(15,23,42,0.12)]"
          >
            <SelectPrimitive.Viewport className="p-1">
              {ROLES.map((role) => (
                <SelectPrimitive.Item
                  key={role}
                  value={role}
                  className="relative flex cursor-pointer select-none items-center rounded-lg px-3 py-2 pl-8 outline-none data-highlighted:bg-blue-600/10 data-highlighted:text-blue-600 data-[state=checked]:text-blue-600"
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