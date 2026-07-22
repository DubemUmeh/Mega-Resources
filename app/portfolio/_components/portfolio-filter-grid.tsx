"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import * as Select from "@radix-ui/react-select";
import * as Dialog from "@radix-ui/react-dialog";
import { FaChevronDown, FaCheck, FaPlay, FaMapMarkerAlt, FaChevronLeft, FaChevronRight, FaTimes } from "react-icons/fa";
import { Reveal, BG_GLOW } from "@/components/motion-kit";

export interface Project {
  id: string;
  title: string;
  location: string;
  region: string;
  service: string;
  depth: string;
  yieldRate: string;
  duration: string;
  year: string;
  img: string;
  isVideo?: boolean;
  summary: string;
  gallery?: string[];
}

export const REGIONS = [
  "Greater Accra",
  "Ashanti",
  "Northern",
  "Western",
  "Eastern",
  "Central",
];

export const SERVICES = [
  "Borehole Drilling",
  "Pump Installation",
  "Borehole Rehabilitation",
  "Hydro-fracturing",
  "Geological Surveys",
  "Pumping Tests",
  "Air Lifting / Developing",
];

function toProject(row: Project & { depth?: string | null; yieldRate?: string | null; duration?: string | null; year?: string | null }): Project {
  return {
    ...row,
    depth: row.depth ?? "N/A",
    yieldRate: row.yieldRate ?? "N/A",
    duration: row.duration ?? "N/A",
    year: row.year ?? "",
    isVideo: row.isVideo ?? false,
    gallery: row.gallery?.length ? row.gallery : [row.img],
  };
}

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
        className="inline-flex items-center gap-2 rounded-full border border-[rgba(10,10,10,0.08)] bg-[rgba(36,35,35,0.5)] px-4 py-2.5 text-[0.85rem] font-medium text-foreground outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
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
          className="z-50 overflow-hidden rounded-xl border border-[rgba(10,10,10,0.08)] bg-background shadow-xl"
        >
          <Select.Viewport className="p-1.5">
            {items.map((item) => (
              <Select.Item
                key={item.value}
                value={item.value}
                className="flex cursor-pointer items-center justify-between gap-3 rounded-lg px-3 py-2 text-[0.85rem] text-foreground outline-none data-highlighted:bg-blue-600/10 data-highlighted:text-blue-600"
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

function ProjectCard({ project, onOpen }: { project: Project; onOpen: () => void }) {
  return (
    <button type="button" onClick={onOpen} className="flex h-full w-full flex-col overflow-hidden rounded-[1.5rem] border text-left border-[rgba(10,10,10,0.08)] bg-[rgba(36,35,35,0.5)]">
      <div className="relative aspect-6/3 w-full overflow-hidden">
        <Image
          src={project.img}
          alt={project.title}
          fill
          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
          className="object-cover transition-transform duration-500 hover:scale-105"
        />
        {project.isVideo && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-background">
              <FaPlay className="ml-0.5 h-3.5 w-3.5" />
            </span>
          </div>
        )}
        <span className="absolute left-3 top-3 rounded-full bg-blue-600 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.06em] text-white">
          {project.service}
        </span>
        <span className="absolute right-3 top-3 rounded-full bg-black/40 px-3 py-1 text-[0.7rem] font-medium text-white backdrop-blur-sm">
          {project.year}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-6">
        <div className="flex items-center gap-1.5 text-[0.78rem] text-muted-foreground">
          <FaMapMarkerAlt className="h-2.5 w-2.5 text-blue-600" />
          {project.location}
        </div>
        <h3 className="font-display text-lg font-semibold capitalize text-foreground">
          {project.title}
        </h3>
        <p className="flex-1 text-[0.9rem] leading-[1.6] text-muted-foreground">
          {project.summary}
        </p>
        <div className="mt-2 grid grid-cols-3 gap-2 border-t border-[rgba(10,10,10,0.08)] pt-4 text-center">
          <div>
            <p className="font-display text-sm font-semibold capitalize text-foreground">
              {project.depth} ft
            </p>
            <p className="text-[0.68rem] uppercase tracking-[0.06em] text-muted-foreground">
              Depth
            </p>
          </div>
          <div>
            <p className="font-display text-sm font-semibold capitalize text-foreground">
              {project.yieldRate} l/hr
            </p>
            <p className="text-[0.68rem] uppercase tracking-[0.06em] text-muted-foreground">
              Yield
            </p>
          </div>
          <div>
            <p className="font-display text-sm font-semibold text-foreground">
              {project.duration} Day(s)
            </p>
            <p className="text-[0.68rem] uppercase tracking-[0.06em] text-muted-foreground">
              Duration
            </p>
          </div>
        </div>
      </div>
    </button>
  );
}


function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const images = project.gallery?.length ? project.gallery : [project.img];
  const [active, setActive] = useState(0);

  return (
    <Dialog.Root open onOpenChange={(open) => !open && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 max-h-[92vh] w-[min(64rem,95vw)] -translate-x-1/2 -translate-y-1/2 overflow-y-auto no-scrollbar rounded-3xl border border-white/10 bg-background p-4 shadow-2xl outline-none sm:p-6">
          <Dialog.Title className="sr-only">{project.title}</Dialog.Title>
          <Dialog.Close className="absolute right-4 top-4 z-20 rounded-full bg-black/60 p-2 text-white">
            <FaTimes />
          </Dialog.Close>
          <div className="grid gap-4 lg:grid-cols-[6rem_1fr]">
            <div className="hide-scrollbar order-2 flex gap-2 overflow-x-auto lg:order-1 lg:max-h-136 lg:flex-col lg:overflow-y-auto">
              {images.map((src, index) => (
                <button key={`${src}-${index}`} type="button" onClick={() => setActive(index)} className={`relative h-20 w-20 flex-none overflow-hidden rounded-xl border ${index === active ? "border-blue-500" : "border-white/10"}`}>
                  <Image src={src} alt={`${project.title} thumbnail ${index + 1}`} fill className="object-cover" />
                </button>
              ))}
            </div>
            <div className="order-1 space-y-5 lg:order-2">
              <div className="relative aspect-video overflow-hidden rounded-2xl bg-black">
                <Image src={images[active]} alt={project.title} fill className="object-contain" />
                <button type="button" onClick={() => setActive((i) => (i - 1 + images.length) % images.length)} className="absolute left-3 top-1/2 rounded-full bg-black/60 p-3 text-white"><FaChevronLeft /></button>
                <button type="button" onClick={() => setActive((i) => (i + 1) % images.length)} className="absolute right-3 top-1/2 rounded-full bg-black/60 p-3 text-white"><FaChevronRight /></button>
              </div>
              <div className="space-y-4 px-1 pb-2">
                <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground"><FaMapMarkerAlt className="text-blue-600" />{project.location}<span>•</span><span>{project.year}</span><span>•</span><span>{project.service}</span></div>
                <h3 className="font-display text-2xl font-semibold text-foreground">{project.title}</h3>
                <p className="leading-7 text-muted-foreground">{project.summary}</p>
                <div className="grid gap-3 sm:grid-cols-3">
                  {[["Depth", `${project.depth} ft`], ["Yield", `${project.yieldRate} l/hr`], ["Duration", `${project.duration} Day(s)`]].map(([label, value]) => (
                    <div key={label} className="rounded-2xl border border-white/10 bg-white/5 p-4"><p className="font-display font-semibold text-foreground">{value}</p><p className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">{label}</p></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

const INITIAL_VISIBLE = 6;
const PAGE_SIZE = 6;

export function PortfolioFilterGrid() {
  const [region, setRegion] = useState("all");
  const [service, setService] = useState("all");
  const [visible, setVisible] = useState(INITIAL_VISIBLE);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const gridTopRef = useRef<HTMLDivElement>(null);

  const regionItems = [
    { value: "all", label: "All Regions" },
    ...REGIONS.map((r) => ({ value: r, label: r })),
  ];
  const serviceItems = [
    { value: "all", label: "All Services" },
    ...SERVICES.map((s) => ({ value: s, label: s })),
  ];

  useEffect(() => {
    const params = new URLSearchParams();
    if (region !== "all") params.set("region", region);
    if (service !== "all") params.set("service", service);

    let active = true;
    fetch(`/api/portfolio?${params.toString()}`)
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error("Failed to load portfolio"))))
      .then((rows: Array<Project & { depth?: string | null; yieldRate?: string | null; duration?: string | null; year?: string | null }>) => {
        if (active) setProjects(rows.map(toProject));
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [region, service]);

  const filtered = useMemo(() => {
    return projects;
  }, [projects]);

  const hasMore = visible < filtered.length;
  const canHide = visible > INITIAL_VISIBLE;

  function handleShowLess() {
    setVisible(INITIAL_VISIBLE);
    gridTopRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <section
      id="all-projects"
      className="relative overflow-hidden px-5 py-16 md:px-10 md:py-20 scroll-mt-24"
    >
      <div className={BG_GLOW} />
      <div className="mx-auto w-[min(100%,76rem)]">
        <Reveal className="max-w-2xl">
          <span className="text-[0.8rem] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
            All Projects
          </span>
          <h2 className="mt-4 font-display text-[1.9rem] font-semibold leading-[1.2] tracking-tight text-foreground md:text-[2.5rem]">
            Browse by region or service
          </h2>
        </Reveal>

        <Reveal delay={0.08} className="mt-8 flex flex-wrap gap-3">
          <SelectField
            value={region}
            onChange={(v) => {
              setLoading(true);
              setRegion(v);
              setVisible(INITIAL_VISIBLE);
            }}
            items={regionItems}
            ariaLabel="Filter by region"
          />
          <SelectField
            value={service}
            onChange={(v) => {
              setLoading(true);
              setService(v);
              setVisible(INITIAL_VISIBLE);
            }}
            items={serviceItems}
            ariaLabel="Filter by service"
          />
          {(region !== "all" || service !== "all") && (
            <button
              onClick={() => {
                setLoading(true);
                setRegion("all");
                setService("all");
                setVisible(INITIAL_VISIBLE);
              }}
              className="text-[0.85rem] font-medium text-blue-600 underline underline-offset-4"
            >
              Clear filters
            </button>
          )}
        </Reveal>

        <div ref={gridTopRef} className="scroll-mt-24" />

        {loading ? (
          <p className="mt-16 text-center text-muted-foreground">Loading projects…</p>
        ) : filtered.length === 0 ? (
          <p className="mt-16 text-center text-muted-foreground">
            No projects match those filters yet.
          </p>
        ) : (
          <>
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.slice(0, visible).map((project, i) => (
                <Reveal key={project.id} delay={(i % 3) * 0.06}>
                  <ProjectCard project={project} onOpen={() => setSelectedProject(project)} />
                </Reveal>
              ))}
            </div>

            {(hasMore || canHide) && (
              <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
                {hasMore && (
                  <button
                    onClick={() => setVisible((v) => v + PAGE_SIZE)}
                    className="rounded-full border border-[rgba(10,10,10,0.08)] bg-[rgba(36,35,35,0.5)] px-6 py-3 text-[0.85rem] font-medium text-foreground transition-colors hover:bg-blue-600/10 hover:text-blue-600"
                  >
                    Load More Projects
                  </button>
                )}
                {canHide && (
                  <button
                    onClick={handleShowLess}
                    className="rounded-full px-6 py-3 text-[0.85rem] font-medium text-muted-foreground underline underline-offset-4 transition-colors hover:text-blue-600"
                  >
                    Show Less
                  </button>
                )}
              </div>
            )}
          </>
        )}
        {selectedProject && (
          <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </div>
    </section>
  );
}