"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import * as Select from "@radix-ui/react-select";
import { FaChevronDown, FaCheck, FaCloudUploadAlt, FaTimes } from "react-icons/fa";
import { useToast } from "@/components/ui/toast";
import { uploadImageToCloudinary } from "@/lib/cloudinary-upload";
import {
  Portfolio,
  PortfolioFormErrors,
  PortfolioService,
  PORTFOLIO_SERVICES,
  Region,
  REGIONS,
} from "@/db/types";

function SelectField({
  value,
  onChange,
  items,
  ariaLabel,
}: {
  value: string;
  onChange: (v: string) => void;
  items: { value: string; label: string }[];
  ariaLabel: string;
}) {
  return (
    <Select.Root value={value} onValueChange={onChange}>
      <Select.Trigger
        aria-label={ariaLabel}
        className="flex w-full items-center justify-between rounded-xl border border-[rgba(10,10,10,0.08)] bg-[rgba(36,35,35,0.5)] px-4 py-2.5 text-[0.92rem] text-foreground outline-none focus:ring-2 focus:ring-blue-600"
      >
        <Select.Value />
        <Select.Icon>
          <FaChevronDown className="h-2.5 w-2.5 text-muted-foreground" />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content
          position="popper"
          sideOffset={8}
          className="z-60 w-(--radix-select-trigger-width) overflow-hidden rounded-xl border border-[rgba(10,10,10,0.08)] bg-background shadow-xl"
        >
          <Select.Viewport className="p-1.5">
            {items.map((item) => (
              <Select.Item
                key={item.value}
                value={item.value}
                className="flex cursor-pointer items-center justify-between gap-3 rounded-lg px-3 py-2 text-[0.88rem] text-foreground outline-none data-highlighted:bg-blue-600/10 data-highlighted:text-blue-600"
              >
                <Select.ItemText>{item.label}</Select.ItemText>
                <Select.ItemIndicator>
                  <FaCheck className="h-2.5 w-2.5 text-blue-600" />
                </Select.ItemIndicator>
              </Select.Item>
            ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}

function Field({
  label,
  optional,
  error,
  children,
}: {
  label: string;
  optional?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-foreground">
        {label} {optional && <span className="font-normal text-muted-foreground">(optional)</span>}
      </label>
      {children}
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}

const inputClass =
  "w-full rounded-xl border border-[rgba(10,10,10,0.08)] bg-[rgba(36,35,35,0.5)] px-4 py-2.5 text-[0.92rem] text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-blue-600";

function emptyDraft(): Portfolio {
  return {
    id: "",
    title: "",
    location: "",
    region: REGIONS[0],
    service: PORTFOLIO_SERVICES[0],
    depth: "",
    yieldRate: "",
    duration: "",
    year: String(new Date().getFullYear()),
    img: "",
    isVideo: false,
    summary: "",
    status: "draft",
    featured: false,
    createdAt: new Date().toISOString().slice(0, 10),
  };
}

export function PortfolioForm({
  initial,
  onSubmit,
  submitLabel,
}: {
  initial?: Portfolio;
  onSubmit: (portfolio: Portfolio) => Promise<void>;
  submitLabel: string;
}) {
  const router = useRouter();
  const { showToast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [draft, setDraft] = useState<Portfolio>(initial ?? emptyDraft());
  const [errors, setErrors] = useState<PortfolioFormErrors>({});
  const [isPending, setIsPending] = useState(false);
  const [selectedCoverFile, setSelectedCoverFile] = useState<File | null>(null);

  function update<K extends keyof Portfolio>(key: K, value: Portfolio[K]) {
    setDraft((d) => ({ ...d, [key]: value }));
  }

  function handleImageSelect(file: File | null) {
    if (!file) return;
    setSelectedCoverFile(file);
    const reader = new FileReader();
    reader.onload = () => update("img", reader.result as string);
    reader.readAsDataURL(file);
  }

  function validate(): PortfolioFormErrors {
    const errs: PortfolioFormErrors = {};
    if (!draft.title.trim()) errs.title = ["Give this project a title."];
    if (!draft.location.trim()) errs.location = ["Add a location for this project."];
    if (!draft.depth.trim()) errs.depth = ["Enter a depth, or \"N/A\" if not applicable."];
    if (!draft.yieldRate.trim()) errs.yieldRate = ["Enter a yield rate, or \"N/A\"."];
    if (!draft.duration.trim()) errs.duration = ["Enter how long the job took."];
    if (!draft.year.trim()) errs.year = ["Enter the project year."];
    if (!draft.img.trim()) errs.img = ["Upload a cover photo."];
    if (!draft.summary.trim() || draft.summary.trim().length < 20)
      errs.summary = ["Write a short summary — at least 20 characters."];
    return errs;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      showToast({
        title: "Missing a few details",
        description: "Please fill in the highlighted fields before saving.",
        variant: "error",
      });
      return;
    }

    setIsPending(true);
    try {
      const uploadedCover = selectedCoverFile
        ? await uploadImageToCloudinary(selectedCoverFile)
        : null;

      const saved: Portfolio = {
        ...draft,
        id: draft.id,
        img: uploadedCover?.url ?? draft.img,
        imgPublicId: uploadedCover?.publicId ?? draft.imgPublicId,
      };

      await onSubmit(saved);
      showToast({
        title: initial ? "Project updated" : "Project created",
        description: `"${saved.title}" was saved successfully.`,
        variant: "success",
      });
      router.push("/admin/portfolio");
    } catch (error) {
      showToast({
        title: "Project not saved",
        description: error instanceof Error ? error.message : "Please try again.",
        variant: "error",
      });
    } finally {
      setIsPending(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
      {/* Left column — fields */}
      <div className="space-y-5">
        <Field label="Project Title" error={errors.title?.[0]}>
          <input
            value={draft.title}
            onChange={(e) => update("title", e.target.value)}
            placeholder="e.g., Estate Water Supply — Trasacco Valley"
            disabled={isPending}
            maxLength={120}
            className={inputClass}
          />
        </Field>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Location" error={errors.location?.[0]}>
            <input
              value={draft.location}
              onChange={(e) => update("location", e.target.value)}
              placeholder="e.g., Trasacco Valley, Accra"
              disabled={isPending}
              maxLength={120}
              className={inputClass}
            />
          </Field>
          <Field label="Region">
            <SelectField
              value={draft.region}
              onChange={(v) => update("region", v as Region)}
              items={REGIONS.map((r) => ({ value: r, label: r }))}
              ariaLabel="Region"
            />
          </Field>
        </div>

        <Field label="Service">
          <SelectField
            value={draft.service}
            onChange={(v) => update("service", v as PortfolioService)}
            items={PORTFOLIO_SERVICES.map((s) => ({ value: s, label: s }))}
            ariaLabel="Service"
          />
        </Field>

        <div className="grid gap-4 sm:grid-cols-3">
          <Field label="Depth" error={errors.depth?.[0]}>
            <input
              value={draft.depth}
              onChange={(e) => update("depth", e.target.value)}
              placeholder="180ft"
              disabled={isPending}
              className={inputClass}
            />
          </Field>
          <Field label="Yield" error={errors.yieldRate?.[0]}>
            <input
              value={draft.yieldRate}
              onChange={(e) => update("yieldRate", e.target.value)}
              placeholder="1,800 L/hr"
              disabled={isPending}
              className={inputClass}
            />
          </Field>
          <Field label="Duration" error={errors.duration?.[0]}>
            <input
              value={draft.duration}
              onChange={(e) => update("duration", e.target.value)}
              placeholder="3 days"
              disabled={isPending}
              className={inputClass}
            />
          </Field>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Year" error={errors.year?.[0]}>
            <input
              value={draft.year}
              onChange={(e) => update("year", e.target.value)}
              placeholder="2026"
              disabled={isPending}
              className={inputClass}
            />
          </Field>
          <Field label="Status">
            <SelectField
              value={draft.status}
              onChange={(v) => update("status", v as Portfolio["status"])}
              items={[
                { value: "draft", label: "Draft" },
                { value: "published", label: "Published" },
              ]}
              ariaLabel="Status"
            />
          </Field>
        </div>

        <Field label="Summary" error={errors.summary?.[0]}>
          <textarea
            value={draft.summary}
            onChange={(e) => update("summary", e.target.value)}
            placeholder="Describe the problem, the work done, and the outcome..."
            rows={5}
            disabled={isPending}
            maxLength={600}
            className={`${inputClass} resize-none`}
          />
        </Field>

        <div className="flex flex-wrap gap-6 pt-1">
          <label className="flex items-center gap-2.5 text-[0.85rem] text-foreground">
            <input
              type="checkbox"
              checked={draft.isVideo ?? false}
              onChange={(e) => update("isVideo", e.target.checked)}
              className="h-4 w-4 rounded border-[rgba(10,10,10,0.2)] accent-blue-600"
            />
            Cover media is a video
          </label>
          <label className="flex items-center gap-2.5 text-[0.85rem] text-foreground">
            <input
              type="checkbox"
              checked={draft.featured}
              onChange={(e) => update("featured", e.target.checked)}
              className="h-4 w-4 rounded border-[rgba(10,10,10,0.2)] accent-blue-600"
            />
            Feature on homepage
          </label>
        </div>
      </div>

      {/* Right column — image upload + preview */}
      <div className="space-y-4">
        <Field label="Cover Photo" error={errors.img?.[0]}>
          <div
            onClick={() => fileInputRef.current?.click()}
            className="group relative flex aspect-4/3 w-full cursor-pointer flex-col items-center justify-center overflow-hidden rounded-4xl border-2 border-dashed border-[rgba(10,10,10,0.15)] bg-[rgba(36,35,35,0.35)] transition-colors hover:border-blue-600/40"
          >
            {draft.img ? (
              <>
                <Image src={draft.img} alt="Cover preview" fill className="object-cover" />
                <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/0 opacity-0 transition-all group-hover:bg-black/40 group-hover:opacity-100">
                  <span className="rounded-full bg-white/90 px-4 py-2 text-[0.8rem] font-medium text-background">
                    Replace photo
                  </span>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    update("img", "");
                    update("imgPublicId", undefined);
                    setSelectedCoverFile(null);
                  }}
                  className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white transition-colors hover:bg-black/70"
                  aria-label="Remove photo"
                >
                  <FaTimes className="h-3 w-3" />
                </button>
              </>
            ) : (
              <div className="flex flex-col items-center gap-2 px-6 text-center">
                <FaCloudUploadAlt className="h-6 w-6 text-muted-foreground" />
                <p className="text-[0.85rem] font-medium text-foreground">
                  Click to upload a photo
                </p>
                <p className="text-[0.75rem] text-muted-foreground">PNG or JPG, up to ~5MB</p>
              </div>
            )}
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={(e) => handleImageSelect(e.target.files?.[0] ?? null)}
            className="hidden"
          />
        </Field>

        <div className="rounded-4xl border border-[rgba(10,10,10,0.08)] bg-[rgba(36,35,35,0.3)] p-5">
          <p className="text-[0.8rem] font-medium text-foreground">Live preview</p>
          <p className="mt-1 text-[0.78rem] leading-normal text-muted-foreground">
            {draft.title || "Project title"} · {draft.location || "Location"}
          </p>
          <p className="mt-2 text-[0.78rem] leading-normal text-muted-foreground line-clamp-3">
            {draft.summary || "Your project summary will appear here as you type."}
          </p>
        </div>
      </div>

      {/* Sticky action bar */}
      <div className="flex items-center justify-end gap-3 border-t border-[rgba(10,10,10,0.08)] pt-6 lg:col-span-2">
        <button
          type="button"
          onClick={() => router.push("/admin/portfolio")}
          className="rounded-full border border-[rgba(10,10,10,0.08)] px-5 py-2.5 text-[0.85rem] font-medium text-foreground transition-colors hover:bg-foreground/5"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isPending}
          className="rounded-full bg-blue-600 px-6 py-2.5 text-[0.85rem] font-semibold text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isPending ? "Saving..." : submitLabel}
        </button>
      </div>
    </form>
  );
}