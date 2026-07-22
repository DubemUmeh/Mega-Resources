import ServiceTemplate, {
  type ServiceData,
} from "../_components/service-template";
import { createServiceMetadata } from "@/lib/seo";

export const data: ServiceData = {
  num: "04",
  slug: "hydro-fracturing",
  eyebrow: "Service 04",
  title: "Hydro-",
  titleAccent: "fracturing",
  tagline: "For boreholes stuck in tight, low-yield rock.",
  heroDescription:
    "Some boreholes are drilled correctly but still deliver disappointing yield because the surrounding rock is too tight to release much water. Hydro-fracturing widens the natural fractures in that rock to unlock significantly higher flow.",
  img: "/images/home/hydro-fracturing.png",
  icon: "layers",
  overviewHeading: "What Hydro-fracturing Involves",
  overviewParagraphs: [
    "Hydro-fracturing is a well-enhancement technique used when a borehole has been correctly drilled and cased but still produces a disappointing yield because the surrounding bedrock has too few open fractures for water to move through freely. Instead of drilling a second well, we treat the one already in the ground.",
    "The process works by sealing off a section of the borehole with an inflatable packer and injecting water under high, controlled pressure into that isolated zone. The pressure opens existing hairline fractures in the rock and extends them outward, connecting the borehole to a wider network of water-bearing cracks than it could originally reach.",
    "This isn't the same process associated with oil and gas extraction — no chemicals or proppants are used. It's a targeted, water-only technique aimed purely at improving groundwater flow into an existing well, and it's most effective in hard-rock (basement complex) geology, which covers large parts of Ghana.",
  ],
  overviewBullets: [
    "Water-only process — no chemicals or additives",
    "Targets specific low-yield zones identified along the borehole",
    "Treats an existing well instead of requiring a new drill",
  ],
  quote:
    "Hydro-fracturing doesn't create water — it opens the paths that let the water already in the rock reach your borehole.",
  process: [
    {
      title: "Zone Identification",
      description:
        "We review the well log to identify the depths where fracturing is likely to intersect water-bearing rock.",
    },
    {
      title: "Pressurised Injection",
      description:
        "A packer isolates the target zone, and water is injected under controlled high pressure to open and extend fractures.",
    },
    {
      title: "Development & Retest",
      description:
        "The zone is airlifted clear of loosened material, and the borehole is retested to confirm the yield improvement.",
    },
  ],
  benefits: [
    {
      icon: "layers",
      title: "Higher Yield",
      description: "Connects the borehole to a wider network of water-bearing fractures.",
    },
    {
      icon: "droplets",
      title: "No Chemicals",
      description: "A water-only process with no additives introduced underground.",
    },
    {
      icon: "gauge",
      title: "Avoids Re-Drilling",
      description: "Improves an existing well instead of starting over.",
    },
    {
      icon: "map",
      title: "Best in Hard Rock",
      description: "Especially effective in basement-complex geology common across Ghana.",
    },
  ],
  ctaHeading: "Getting less water than you expected?",
  ctaBody:
    "If your borehole was drilled correctly but the yield is low, hydro-fracturing may be the fix — without a new well.",
  next: { slug: "geological-surveys", title: "Geological Surveys" },
  related: [
    { slug: "geological-surveys", title: "Geological Surveys", reason: "Confirm fracture targets from site geology." },
    { slug: "air-lifting-developing", title: "Air Lifting / Developing", reason: "Remove fines released during stimulation." },
    { slug: "pumping-tests", title: "Pumping Tests", reason: "Quantify the yield improvement after fracturing." },
  ],
};

export const metadata = createServiceMetadata(data);

export default function Page() {
  return <ServiceTemplate data={data} />;
}