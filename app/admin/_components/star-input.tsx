"use client";

import * as RadioGroup from "@radix-ui/react-radio-group";
import { FaStar } from "react-icons/fa";

export function StarInput({
  value,
  onChange,
  name = "rating",
}: {
  value: number;
  onChange: (n: number) => void;
  name?: string;
}) {
  return (
    <RadioGroup.Root
      className="flex items-center gap-1"
      value={String(value)}
      onValueChange={(v) => onChange(Number(v))}
      aria-label="Rating"
      name={name}
    >
      {[1, 2, 3, 4, 5].map((n) => (
        <RadioGroup.Item
          key={n}
          value={String(n)}
          className="group cursor-pointer rounded-md p-1 outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
          aria-label={`${n} star${n > 1 ? "s" : ""}`}
        >
          <FaStar
            className={`text-xl transition-colors ${
              n <= value ? "text-amber-400" : "text-foreground/15 group-hover:text-amber-300/60"
            }`}
          />
        </RadioGroup.Item>
      ))}
    </RadioGroup.Root>
  );
}