"use client";

import { useState } from "react";
import { saveBusinessSettings } from "../admin-users-actions";
import { useToast } from "@/components/ui/toast";

type BusinessSettings = {
  businessName?: string | null;
  businessEmail?: string | null;
  phone?: string | null;
  logoUrl?: string | null;
  address?: string | null;
};

export function BusinessProfileForm({ settings }: { settings?: BusinessSettings }) {
  const { showToast } = useToast();
  const [isSaving, setIsSaving] = useState(false);

  async function handleSubmit(formData: FormData) {
    setIsSaving(true);
    try {
      await saveBusinessSettings(formData);
      showToast({
        title: "Profile saved",
        description: "Saved successfully. The database has officially survived another profile edit.",
        variant: "success",
      });
    } catch (error) {
      showToast({
        title: "Save failed",
        description: error instanceof Error ? error.message : "Could not save the business profile.",
        variant: "error",
      });
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <form action={handleSubmit} className="mt-4 grid gap-3 md:grid-cols-2">
      {[
        ["businessName", "Business name", settings?.businessName],
        ["businessEmail", "Business email", settings?.businessEmail],
        ["phone", "Phone", settings?.phone],
        ["logoUrl", "Logo", settings?.logoUrl],
        ["address", "Address", settings?.address],
      ].map(([name, label, value]) => (
        <label key={name} className="text-sm text-neutral-500">
          {label}
          <input
            name={name}
            defaultValue={value || ""}
            disabled={isSaving}
            className="mt-1 w-full rounded-xl border border-neutral-300 bg-white px-3 py-2 text-neutral-900 outline-none transition-colors focus:border-blue-600 focus:ring-2 focus:ring-blue-600/15 disabled:opacity-60"
          />
        </label>
      ))}
      <button
        type="submit"
        disabled={isSaving}
        className="inline-flex items-center justify-center gap-2 rounded-full bg-blue-600 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60 md:col-span-2"
      >
        {isSaving ? "Saving..." : "Save profile"}
      </button>
    </form>
  );
}
