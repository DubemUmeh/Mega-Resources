"use client";

import { useMemo, useRef, useState } from "react";
import Image from "next/image";
import * as Select from "@radix-ui/react-select";
import { FaChevronDown, FaCheck, FaPlay, FaMapMarkerAlt } from "react-icons/fa";
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

export const projects: Project[] = [
  {
    id: "p1",
    title: "Estate Water Supply — Trasacco Valley",
    location: "Trasacco Valley, Accra",
    region: "Greater Accra",
    service: "Borehole Drilling",
    depth: "180ft",
    yieldRate: "1,800 L/hr",
    duration: "3 days",
    year: "2025",
    img: "/images/home/borehole-drilling.jpeg",
    summary:
      "A single borehole feeding a six-unit residential estate. Survey confirmed a strong sedimentary aquifer at 180ft, giving enough yield to serve all six homes off one source.",
  },
  {
    id: "p2",
    title: "Community Well Rehabilitation — Tamale",
    location: "Tamale, Northern Region",
    region: "Northern",
    service: "Borehole Rehabilitation",
    depth: "220ft",
    yieldRate: "900 → 1,600 L/hr",
    duration: "2 days",
    year: "2024",
    img: "/images/home/borehole-rehabilitation.png",
    isVideo: true,
    summary:
      "A 12-year-old community borehole had dropped to a trickle. Re-developed the hole and cleared accumulated silt, nearly doubling yield without a full re-drill.",
  },
  {
    id: "p3",
    title: "School Water Project — Kumasi",
    location: "Kumasi, Ashanti Region",
    region: "Ashanti",
    service: "Hydro-fracturing",
    depth: "310ft",
    yieldRate: "2,400 L/hr",
    duration: "5 days",
    year: "2024",
    img: "/images/home/hydro-fracturing.png",
    summary:
      "Initial drilling into hard basement rock returned a weak yield. Hydro-fracturing opened up fracture zones in the surrounding rock, lifting output enough to supply the entire school compound.",
  },
  {
    id: "p4",
    title: "Farm Irrigation Borehole — Techiman",
    location: "Techiman, Bono Region",
    region: "Ashanti",
    service: "Borehole Drilling",
    depth: "260ft",
    yieldRate: "3,100 L/hr",
    duration: "4 days",
    year: "2023",
    img: "/images/home/pumping-tests.png",
    summary:
      "A 15-acre commercial farm needed year-round irrigation capacity. Survey and pumping test confirmed a high-yield source, paired with a solar pump sized for peak dry-season demand.",
  },
  {
    id: "p5",
    title: "Church Compound Supply — Takoradi",
    location: "Takoradi, Western Region",
    region: "Western",
    service: "Pump Installation",
    depth: "195ft",
    yieldRate: "1,500 L/hr",
    duration: "1 day",
    year: "2023",
    img: "/images/home/pump-installation.png",
    summary:
      "Existing borehole had never had a properly sized pump installed. Fitted and tested a submersible pump matched to the actual yield, ending years of inconsistent pressure.",
  },
  {
    id: "p6",
    title: "Residential Site Survey — East Legon",
    location: "East Legon, Accra",
    region: "Greater Accra",
    service: "Geological Surveys",
    depth: "N/A",
    yieldRate: "N/A",
    duration: "Half day",
    year: "2025",
    img: "/images/home/geological-surveys.png",
    summary:
      "A pre-purchase land survey to confirm groundwater viability before the client committed to buying the plot. Confirmed depth and expected yield ahead of any construction.",
  },
  {
    id: "p7",
    title: "Hospital Backup Water Source — Koforidua",
    location: "Koforidua, Eastern Region",
    region: "Eastern",
    service: "Air Lifting / Developing",
    depth: "240ft",
    yieldRate: "2,000 L/hr",
    duration: "4 days",
    year: "2022",
    img: "/images/home/air-lifting.png",
    isVideo: true,
    summary:
      "A district hospital needed a reliable backup source independent of municipal supply interruptions. After drilling, we air-lifted and fully developed the hole to clear debris and open it to its actual yield before handover.",
  },
  {
    id: "p8",
    title: "Hotel Facility Rehabilitation — Cape Coast",
    location: "Cape Coast, Central Region",
    region: "Central",
    service: "Borehole Rehabilitation",
    depth: "205ft",
    yieldRate: "700 → 1,900 L/hr",
    duration: "3 days",
    year: "2022",
    img: "/images/home/borehole-rehabilitation.png",
    summary:
      "A resort's original borehole was drilled decades earlier with no casing record. Redeveloped and re-cased the hole, restoring supply ahead of peak tourist season.",
  },
  {
    id: "p9",
    title: "Yield Verification — Sunyani",
    location: "Sunyani, Bono Region",
    region: "Ashanti",
    service: "Pumping Tests",
    depth: "230ft",
    yieldRate: "1,700 L/hr sustained",
    duration: "1 day",
    year: "2023",
    img: "/images/home/pumping-tests.png",
    summary:
      "An existing borehole needed its sustainable yield confirmed before the client committed to a large-capacity pump. A full pumping test set the safe long-term draw rate, avoiding an oversized (and overpriced) pump.",
  },
];

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

function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-[rgba(10,10,10,0.08)] bg-[rgba(36,35,35,0.5)]">
      <div className="relative aspect-4/3 w-full overflow-hidden">
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
        <h3 className="font-display text-lg font-semibold text-foreground">
          {project.title}
        </h3>
        <p className="flex-1 text-[0.9rem] leading-[1.6] text-muted-foreground">
          {project.summary}
        </p>
        <div className="mt-2 grid grid-cols-3 gap-2 border-t border-[rgba(10,10,10,0.08)] pt-4 text-center">
          <div>
            <p className="font-display text-sm font-semibold text-foreground">
              {project.depth}
            </p>
            <p className="text-[0.68rem] uppercase tracking-[0.06em] text-muted-foreground">
              Depth
            </p>
          </div>
          <div>
            <p className="font-display text-sm font-semibold text-foreground">
              {project.yieldRate}
            </p>
            <p className="text-[0.68rem] uppercase tracking-[0.06em] text-muted-foreground">
              Yield
            </p>
          </div>
          <div>
            <p className="font-display text-sm font-semibold text-foreground">
              {project.duration}
            </p>
            <p className="text-[0.68rem] uppercase tracking-[0.06em] text-muted-foreground">
              Duration
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

const INITIAL_VISIBLE = 6;
const PAGE_SIZE = 6;

export function PortfolioFilterGrid() {
  const [region, setRegion] = useState("all");
  const [service, setService] = useState("all");
  const [visible, setVisible] = useState(INITIAL_VISIBLE);
  const gridTopRef = useRef<HTMLDivElement>(null);

  const regionItems = [
    { value: "all", label: "All Regions" },
    ...REGIONS.map((r) => ({ value: r, label: r })),
  ];
  const serviceItems = [
    { value: "all", label: "All Services" },
    ...SERVICES.map((s) => ({ value: s, label: s })),
  ];

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      const regionMatch = region === "all" || p.region === region;
      const serviceMatch = service === "all" || p.service === service;
      return regionMatch && serviceMatch;
    });
  }, [region, service]);

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
              setRegion(v);
              setVisible(INITIAL_VISIBLE);
            }}
            items={regionItems}
            ariaLabel="Filter by region"
          />
          <SelectField
            value={service}
            onChange={(v) => {
              setService(v);
              setVisible(INITIAL_VISIBLE);
            }}
            items={serviceItems}
            ariaLabel="Filter by service"
          />
          {(region !== "all" || service !== "all") && (
            <button
              onClick={() => {
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

        {filtered.length === 0 ? (
          <p className="mt-16 text-center text-muted-foreground">
            No projects match those filters yet.
          </p>
        ) : (
          <>
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.slice(0, visible).map((project, i) => (
                <Reveal key={project.id} delay={(i % 3) * 0.06}>
                  <ProjectCard project={project} />
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
      </div>
    </section>
  );
}