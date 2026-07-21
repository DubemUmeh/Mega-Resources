"use client";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { FaChevronDown, FaCheck, FaTimes } from "react-icons/fa";

export function MultiSelectField({
  label,
  placeholder,
  values,
  onChange,
  items,
  error,
  name,
}: {
  label?: string;
  placeholder: string;
  values: string[];
  onChange: (values: string[]) => void;
  items: string[];
  error?: string;
  /** If provided, renders hidden inputs so plain FormData submission still captures every selected value under this name. */
  name?: string;
}) {
  function toggle(item: string) {
    onChange(
      values.includes(item)
        ? values.filter((v) => v !== item)
        : [...values, item]
    );
  }

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-sm font-medium text-foreground">{label}</label>
      )}

      {name &&
        values.map((v) => (
          <input key={v} type="hidden" name={name} value={v} />
        ))}

      <DropdownMenu.Root>
        <DropdownMenu.Trigger
          type="button"
          className={`flex bg-background/70 w-full items-center justify-between gap-2 rounded-xl border px-4 py-3 text-left text-[0.92rem] outline-none transition-colors focus:ring-2 focus:ring-blue-600 no-scrollbar ${
            values.length > 0 ? "text-foreground" : "text-muted-foreground"
          } border-[rgba(10,10,10,0.08)] bg-[rgba(36,35,35,0.5)]`}
        >
          <span className="truncate">
            {values.length === 0
              ? placeholder
              : values.length === 1
              ? values[0]
              : `${values.length} services selected`}
          </span>
          <FaChevronDown className="h-2.5 w-2.5 flex-none text-muted-foreground" />
        </DropdownMenu.Trigger>

        <DropdownMenu.Portal>
          <DropdownMenu.Content
            align="start"
            sideOffset={8}
            className="z-50 max-h-72 w-(--radix-dropdown-menu-trigger-width) overflow-y-auto overflow-x-hidden rounded-xl border border-[rgba(10,10,10,0.08)] bg-background p-1.5 shadow-xl"
          >
            {items.map((item) => {
              const checked = values.includes(item);
              return (
                <DropdownMenu.CheckboxItem
                  key={item}
                  checked={checked}
                  onCheckedChange={() => toggle(item)}
                  // Keep the menu open after picking, since the point is to select several.
                  onSelect={(e) => e.preventDefault()}
                  className="flex cursor-pointer items-center justify-between gap-3 rounded-lg px-3 py-2 text-[0.88rem] text-foreground outline-none data-highlighted:bg-blue-600/10 data-highlighted:text-blue-600 nos"
                >
                  {item}
                  <DropdownMenu.ItemIndicator>
                    <FaCheck className="h-2.5 w-2.5 text-blue-600" />
                  </DropdownMenu.ItemIndicator>
                </DropdownMenu.CheckboxItem>
              );
            })}
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>

      {values.length > 0 && (
        <div className="flex flex-wrap gap-1.5 pt-0.5">
          {values.map((v) => (
            <span
              key={v}
              className="inline-flex items-center gap-1.5 rounded-full border border-blue-600/20 bg-blue-600/10 px-3 py-1 text-[0.78rem] font-medium text-blue-600"
            >
              {v}
              <button
                type="button"
                onClick={() => toggle(v)}
                aria-label={`Remove ${v}`}
                className="text-blue-600/70 transition-colors hover:text-blue-600"
              >
                <FaTimes className="h-2 w-2" />
              </button>
            </span>
          ))}
        </div>
      )}

      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}