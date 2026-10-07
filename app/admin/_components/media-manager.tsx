"use client";

import { useState } from "react";
import Image from "next/image";
import { FaCloudUploadAlt, FaHistory, FaUndo, FaVideo, FaImage } from "react-icons/fa";
import { uploadImageToCloudinary } from "@/lib/cloudinary-upload";
import { restoreMediaVersion, saveMediaVersion } from "@/db/actions/media";
import { useToast } from "@/components/ui/toast";

type Slot = Awaited<ReturnType<typeof import("@/lib/media").getAdminMediaSlots>>[number];

function Preview({ url, type, alt }: { url: string; type: "image" | "video"; alt: string }) {
  if (type === "video") {
    return <video src={url} controls muted playsInline className="h-full w-full object-cover" aria-label={alt} />;
  }
  return <Image src={url} alt={alt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 420px" />;
}

export function MediaManager({ initialSlots }: { initialSlots: Slot[] }) {
  const [slots, setSlots] = useState(initialSlots);
  const [busy, setBusy] = useState<string | null>(null);
  const [historyKey, setHistoryKey] = useState<string | null>(null);
  const { toast } = useToast();

  async function replaceMedia(slot: Slot, file: File, altText: string) {
    setBusy(slot.key);
    try {
      const upload = await uploadImageToCloudinary(file, "mega-resources/website-media");
      const version = await saveMediaVersion({
        slotKey: slot.key,
        mediaType: upload.resourceType,
        secureUrl: upload.url,
        publicId: upload.publicId,
        altText: altText.trim() || slot.defaultAlt,
        width: upload.width,
        height: upload.height,
        duration: upload.duration,
      });
      setSlots((current) => current.map((item) => item.key === slot.key
        ? { ...item, current: version, history: [version, ...item.history.map((v) => ({ ...v, isCurrent: false }))] }
        : item));
      toast({ title: "Media updated", description: slot.label + " is now using the new media." });
    } catch (error) {
      toast({ title: "Upload failed", description: error instanceof Error ? error.message : "Could not update this media.", variant: "destructive" });
    } finally {
      setBusy(null);
    }
  }

  async function restore(slot: Slot, versionId: string) {
    setBusy(slot.key);
    try {
      await restoreMediaVersion(versionId);
      setSlots((current) => current.map((item) => item.key === slot.key
        ? { ...item, current: item.history.find((v) => v.id === versionId) ?? null, history: item.history.map((v) => ({ ...v, isCurrent: v.id === versionId })) }
        : item));
      toast({ title: "Media restored", description: "The selected version is now live." });
    } catch (error) {
      toast({ title: "Restore failed", description: error instanceof Error ? error.message : "Could not restore this version.", variant: "destructive" });
    } finally {
      setBusy(null);
    }
  }

  return (
    <div className="space-y-6">
      {(["Homepage", "Services"] as const).map((page) => (
        <section key={page} className="space-y-4">
          <div>
            <h2 className="font-display text-xl font-semibold text-neutral-900">{page}</h2>
            <p className="mt-1 text-sm text-neutral-500">{page === "Homepage" ? "Main hero visual only. Homepage Projects are not managed here." : "Hero visuals for each service page."}</p>
          </div>
          <div className="grid gap-5 xl:grid-cols-2">
            {slots.filter((slot) => slot.page === page).map((slot) => {
              const current = slot.current;
              const currentUrl = current?.secureUrl ?? slot.defaultUrl;
              const currentType = current?.mediaType ?? "image";
              const isBusy = busy === slot.key;
              return (
                <article key={slot.key} className="overflow-hidden rounded-[1.5rem] border border-neutral-200 bg-white shadow-[0_8px_25px_rgba(15,23,42,0.04)]">
                  <div className="relative aspect-[16/9] overflow-hidden bg-neutral-100">
                    <Preview url={currentUrl} type={currentType} alt={current?.altText ?? slot.defaultAlt} />
                    <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-black/70 px-3 py-1.5 text-[0.7rem] font-semibold text-white">
                      {currentType === "video" ? <FaVideo /> : <FaImage />}
                      {current ? "Custom media" : "Default media"}
                    </span>
                  </div>
                  <div className="p-5">
                    <h3 className="font-display text-lg font-semibold text-neutral-900">{slot.label}</h3>
                    <p className="mt-1 text-sm leading-6 text-neutral-500">{slot.description}</p>
                    <label className="mt-4 block text-xs font-semibold uppercase tracking-wider text-neutral-500">
                      Alt text
                      <input
                        defaultValue={current?.altText ?? slot.defaultAlt}
                        id={"alt-" + slot.key}
                        className="mt-2 w-full rounded-xl border border-neutral-200 bg-neutral-50 px-3 py-2.5 text-sm font-normal normal-case tracking-normal text-neutral-900 outline-none focus:border-blue-500"
                      />
                    </label>
                    <div className="mt-4 flex flex-wrap gap-2">
                      <label className={"inline-flex cursor-pointer items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 " + (isBusy ? "pointer-events-none opacity-60" : "")}>
                        <FaCloudUploadAlt />
                        {isBusy ? "Uploading..." : "Replace media"}
                        <input
                          type="file"
                          accept="image/*,video/*"
                          className="sr-only"
                          disabled={isBusy}
                          onChange={(event) => {
                            const file = event.target.files?.[0];
                            if (!file) return;
                            const alt = (document.getElementById("alt-" + slot.key) as HTMLInputElement)?.value ?? "";
                            void replaceMedia(slot, file, alt);
                            event.currentTarget.value = "";
                          }}
                        />
                      </label>
                      {slot.history.length > 0 && (
                        <button type="button" onClick={() => setHistoryKey(historyKey === slot.key ? null : slot.key)} className="inline-flex items-center gap-2 rounded-xl border border-neutral-200 px-4 py-2.5 text-sm font-semibold text-neutral-700 hover:bg-neutral-50">
                          <FaHistory /> History ({slot.history.length})
                        </button>
                      )}
                    </div>
                    {historyKey === slot.key && (
                      <div className="mt-5 space-y-3 border-t border-neutral-100 pt-5">
                        <p className="text-xs font-semibold uppercase tracking-wider text-neutral-400">Previous uploads</p>
                        {slot.history.map((version) => (
                          <div key={version.id} className="flex items-center gap-3 rounded-xl border border-neutral-100 bg-neutral-50 p-2.5">
                            <div className="relative h-14 w-20 flex-none overflow-hidden rounded-lg bg-neutral-200">
                              <Preview url={version.secureUrl} type={version.mediaType} alt={version.altText ?? slot.defaultAlt} />
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="text-xs font-medium text-neutral-700">{version.mediaType === "video" ? "Video" : "Image"} · {new Date(version.createdAt).toLocaleDateString()}</p>
                              <p className="truncate text-[0.7rem] text-neutral-400">{version.publicId}</p>
                            </div>
                            {version.isCurrent ? (
                              <span className="rounded-full bg-blue-600/10 px-2.5 py-1 text-[0.7rem] font-semibold text-blue-600">Current</span>
                            ) : (
                              <button type="button" disabled={isBusy} onClick={() => void restore(slot, version.id)} className="inline-flex items-center gap-1.5 rounded-lg border border-neutral-200 bg-white px-2.5 py-1.5 text-[0.7rem] font-semibold text-neutral-700 hover:bg-neutral-100 disabled:opacity-50">
                                <FaUndo /> Restore
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
