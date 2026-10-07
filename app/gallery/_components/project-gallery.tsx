"use client";

import { useState } from "react";
import Image from "next/image";
import * as Dialog from "@radix-ui/react-dialog";
import { FaChevronLeft, FaChevronRight, FaTimes } from "react-icons/fa";

export default function ProjectGallery({
  images,
  title,
}: {
  images: string[];
  title: string;
}) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const showPrev = () =>
    setActiveIndex((i) => (i === null ? null : (i - 1 + images.length) % images.length));
  const showNext = () =>
    setActiveIndex((i) => (i === null ? null : (i + 1) % images.length));

  return (
    <>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {images.map((src, index) => (
          <button
            key={`${src}-${index}`}
            type="button"
            onClick={() => setActiveIndex(index)}
            className="group relative aspect-4/3 overflow-hidden rounded-3xl border border-neutral-200 bg-neutral-100"
          >
            <Image
              src={src}
              alt={`${title} photo ${index + 1}`}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </button>
        ))}
      </div>

      <Dialog.Root
        open={activeIndex !== null}
        onOpenChange={(open) => !open && setActiveIndex(null)}
      >
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm data-[state=open]:animate-in data-[state=open]:fade-in" />
          <Dialog.Content className="fixed inset-0 z-50 flex items-center justify-center p-4 outline-none sm:p-8">
            <Dialog.Title className="sr-only">{title} gallery image</Dialog.Title>

            {activeIndex !== null && (
              <>
                <div className="relative aspect-video w-full max-w-5xl overflow-hidden rounded-2xl bg-black">
                  <Image
                    src={images[activeIndex]}
                    alt={`${title} photo ${activeIndex + 1}`}
                    fill
                    className="object-contain"
                  />
                </div>

                {images.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={showPrev}
                      aria-label="Previous image"
                      className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/60 p-3 text-white transition-colors hover:bg-black/80 sm:left-6"
                    >
                      <FaChevronLeft />
                    </button>
                    <button
                      type="button"
                      onClick={showNext}
                      aria-label="Next image"
                      className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/60 p-3 text-white transition-colors hover:bg-black/80 sm:right-6"
                    >
                      <FaChevronRight />
                    </button>
                    <span className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full bg-black/60 px-3 py-1 text-[0.75rem] font-medium text-white">
                      {activeIndex + 1} / {images.length}
                    </span>
                  </>
                )}
              </>
            )}

            <Dialog.Close
              aria-label="Close gallery"
              className="absolute right-4 top-4 rounded-full bg-black/60 p-2.5 text-white transition-colors hover:bg-black/80"
            >
              <FaTimes />
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}