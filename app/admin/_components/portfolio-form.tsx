"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import * as Select from "@radix-ui/react-select";
import * as Dialog from "@radix-ui/react-dialog";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { FaChevronDown, FaCheck, FaCloudUploadAlt, FaTimes, FaChevronLeft, FaChevronRight, FaTrash } from "react-icons/fa";
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
    slug: "",
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
  const [draft, setDraft] = useState<Portfolio>(() => {
    if (initial || typeof window === "undefined") return initial ?? emptyDraft();
    const saved = window.localStorage.getItem("portfolio-form-draft:new");
    if (!saved) return emptyDraft();
    try {
      return (JSON.parse(saved) as { draft?: Portfolio }).draft ?? emptyDraft();
    } catch {
      return emptyDraft();
    }
  });
  const [errors, setErrors] = useState<PortfolioFormErrors>({});
  const [isPending, setIsPending] = useState(false);
  const [galleryFiles, setGalleryFiles] = useState<File[]>([]);
  const [galleryPreviews, setGalleryPreviews] = useState<string[]>(() => {
    if (initial) return initial.gallery ?? (initial.img ? [initial.img] : []);
    if (typeof window === "undefined") return [];
    const saved = window.localStorage.getItem("portfolio-form-draft:new");
    if (!saved) return [];
    try {
      return (JSON.parse(saved) as { galleryPreviews?: string[] }).galleryPreviews ?? [];
    } catch {
      return [];
    }
  });
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);
  const [removeIndex, setRemoveIndex] = useState<number | null>(null);
  const [isDraggingPhotos, setIsDraggingPhotos] = useState(false);
  const storageKey = useMemo(() => `portfolio-form-draft:${initial?.id ?? "new"}`, [initial?.id]);

  useEffect(() => {
    if (initial) return;
    window.localStorage.setItem(storageKey, JSON.stringify({ draft, galleryPreviews }));
  }, [draft, galleryPreviews, initial, storageKey]);

  function update<K extends keyof Portfolio>(key: K, value: Portfolio[K]) {
    setDraft((d) => ({ ...d, [key]: value }));
  }

  function handleImageSelect(files: FileList | File[] | null) {
    if (!files?.length) return;
    const incoming = Array.from(files).filter((file) => file.type.startsWith("image/"));
    if (incoming.length === 0) return;
    setGalleryFiles((current) => [...current, ...incoming]);
    incoming.forEach((file, offset) => {
      const reader = new FileReader();
      reader.onload = () => {
        const dataUrl = reader.result as string;
        setGalleryPreviews((current) => {
          const next = [...current, dataUrl];
          if (!draft.img && offset === 0) update("img", dataUrl);
          return next;
        });
      };
      reader.readAsDataURL(file);
    });
  }

  async function dataUrlToFile(dataUrl: string, name: string) {
    const response = await fetch(dataUrl);
    const blob = await response.blob();
    return new File([blob], name, { type: blob.type || "image/png" });
  }

  function handlePhotoDrop(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setIsDraggingPhotos(false);
    if (isPending) return;
    handleImageSelect(Array.from(event.dataTransfer.files));
  }

  function confirmRemoveImage(index: number) {
    setRemoveIndex(index);
  }

  function removeGalleryImage(index: number) {
    setGalleryPreviews((current) => {
      const next = current.filter((_, i) => i !== index);
      update("gallery", next);
      update("img", next[0] ?? "");
      return next;
    });
    setGalleryFiles((current) => current.filter((_, i) => i !== index));
    setActiveImageIndex((current) => current === null ? null : Math.max(0, Math.min(current, galleryPreviews.length - 2)));
    setRemoveIndex(null);
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
      const uploadedImages = await Promise.all(
        galleryPreviews.map(async (preview, index) => {
          if (!preview.startsWith("data:")) return { url: preview, publicId: index === 0 ? draft.imgPublicId : undefined };
          const file = galleryFiles[index] ?? (await dataUrlToFile(preview, `portfolio-${Date.now()}-${index}.png`));
          return uploadImageToCloudinary(file);
        }),
      );

      const saved: Portfolio = {
        ...draft,
        id: draft.id,
        img: uploadedImages[0]?.url ?? draft.img,
        imgPublicId: uploadedImages[0]?.publicId ?? draft.imgPublicId,
        gallery: uploadedImages.map((image) => image.url),
      };

      await onSubmit(saved);
      showToast({
        title: initial ? "Project updated" : "Project created",
        description: `"${saved.title}" was saved successfully.`,
        variant: "success",
      });
      window.localStorage.removeItem(storageKey);
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
    <>
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

        <Field label="SEO Slug" optional error={errors.slug?.[0]}>
          <input
            value={draft.slug ?? ""}
            onChange={(e) => update("slug", e.target.value)}
            placeholder="Auto-generated from service and location if left blank"
            disabled={isPending}
            maxLength={180}
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
            onClick={() => !isPending && fileInputRef.current?.click()}
            onDragEnter={(event) => {
              event.preventDefault();
              setIsDraggingPhotos(true);
            }}
            onDragOver={(event) => {
              event.preventDefault();
              setIsDraggingPhotos(true);
            }}
            onDragLeave={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
                setIsDraggingPhotos(false);
              }
            }}
            onDrop={handlePhotoDrop}
            className={`relative flex aspect-4/3 w-full cursor-pointer flex-col items-center justify-center overflow-hidden rounded-4xl border-2 border-dashed bg-[rgba(36,35,35,0.35)] transition-colors hover:border-blue-600/40 ${
              isDraggingPhotos ? "border-blue-600 bg-blue-600/10" : "border-[rgba(10,10,10,0.15)]"
            }`}
          >
            <div className="flex flex-col items-center gap-2 px-6 text-center">
              <FaCloudUploadAlt className="h-6 w-6 text-muted-foreground" />
              <p className="text-[0.85rem] font-medium text-foreground">
                Click to upload photos
              </p>
              <p className="text-[0.75rem] text-muted-foreground">Or drag and drop PNG or JPG files here, up to ~5MB each</p>
            </div>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => {
              handleImageSelect(e.target.files);
              e.target.value = "";
            }}
            className="hidden"
          />

          {galleryPreviews.length > 0 && (
            <div className="mt-3 grid grid-cols-4 gap-2 sm:grid-cols-5">
              {galleryPreviews.map((src, index) => (
                <button
                  key={`${src}-${index}`}
                  type="button"
                  onClick={() => setActiveImageIndex(index)}
                  className="group relative aspect-square overflow-hidden rounded-xl border border-white/10"
                >
                  <Image src={src} alt={`Added project image ${index + 1}`} fill className="object-cover" />
                  <span
                    onClick={(e) => {
                      e.stopPropagation();
                      confirmRemoveImage(index);
                    }}
                    className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-black/70 text-white opacity-0 transition-opacity group-hover:opacity-100"
                    aria-label={`Remove image ${index + 1}`}
                  >
                    <FaTrash className="h-2.5 w-2.5" />
                  </span>
                </button>
              ))}
            </div>
          )}
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

    <Dialog.Root open={activeImageIndex !== null && galleryPreviews.length > 0} onOpenChange={(open) => !open && setActiveImageIndex(null)}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/80" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 max-h-[92vh] w-[min(56rem,94vw)] -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-3xl border border-white/10 bg-background p-4 shadow-2xl outline-none">
          <Dialog.Title className="sr-only">Project image preview</Dialog.Title>
          <Dialog.Close className="absolute right-4 top-4 z-10 rounded-full bg-black/60 p-2 text-white"><FaTimes /></Dialog.Close>
          {activeImageIndex !== null && galleryPreviews[activeImageIndex] && (
            <div className="space-y-4">
              <div className="relative aspect-video overflow-hidden rounded-2xl bg-black">
                <Image src={galleryPreviews[activeImageIndex]} alt="Full project preview" fill className="object-contain" />
                <button type="button" onClick={() => setActiveImageIndex((i) => (i === null ? 0 : (i - 1 + galleryPreviews.length) % galleryPreviews.length))} className="absolute left-3 top-1/2 rounded-full bg-black/60 p-3 text-white"><FaChevronLeft /></button>
                <button type="button" onClick={() => setActiveImageIndex((i) => (i === null ? 0 : (i + 1) % galleryPreviews.length))} className="absolute right-3 top-1/2 rounded-full bg-black/60 p-3 text-white"><FaChevronRight /></button>
                <button type="button" onClick={() => confirmRemoveImage(activeImageIndex)} className="absolute bottom-3 right-3 rounded-full bg-red-600 px-4 py-2 text-sm font-semibold text-white">Remove</button>
              </div>
              <div className="hide-scrollbar flex gap-2 overflow-x-auto pb-1">
                {galleryPreviews.map((src, index) => (
                  <button key={`${src}-modal-${index}`} type="button" onClick={() => setActiveImageIndex(index)} className={`relative h-16 w-16 flex-none overflow-hidden rounded-xl border ${index === activeImageIndex ? "border-blue-500" : "border-white/10"}`}>
                    <Image src={src} alt={`Thumbnail ${index + 1}`} fill className="object-cover" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>

    <AlertDialog.Root open={removeIndex !== null} onOpenChange={(open) => !open && setRemoveIndex(null)}>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="fixed inset-0 z-60 bg-black/70" />
        <AlertDialog.Content className="fixed left-1/2 top-1/2 z-60 w-[min(24rem,92vw)] -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-white/10 bg-background p-6 shadow-2xl">
          <AlertDialog.Title className="font-display text-lg font-semibold text-foreground">Remove image?</AlertDialog.Title>
          <AlertDialog.Description className="mt-2 text-sm text-muted-foreground">This image will be removed from the project image list.</AlertDialog.Description>
          <div className="mt-6 flex justify-end gap-3">
            <AlertDialog.Cancel className="rounded-full border border-white/10 px-4 py-2 text-sm">Cancel</AlertDialog.Cancel>
            <AlertDialog.Action onClick={() => removeIndex !== null && removeGalleryImage(removeIndex)} className="rounded-full bg-red-600 px-4 py-2 text-sm font-semibold text-white">Remove</AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
    </>
  );
}