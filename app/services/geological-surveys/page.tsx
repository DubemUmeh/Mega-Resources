import type { Metadata } from "next";
import ServiceTemplate, {
  type ServiceData,
} from "../_components/service-template";

export const metadata: Metadata = {
  title: "Geological Surveys | Confirm Water Depth & Volume Before Drilling",
  description:
    "Geophysical surveys that confirm likely water depth and volume on your land before drilling begins, so every borehole is placed with confidence.",
};

const data: ServiceData = {
  num: "05",
  slug: "geological-surveys",
  eyebrow: "Service 05",
  title: "Geological",
  titleAccent: "Surveys",
  tagline: "Know what's underground before a single hole is drilled.",
  heroDescription:
    "Before we drill, we survey. Using geophysical methods, we confirm the likely depth and volume of water beneath your land, so the drill point we choose is backed by data, not luck.",
  img: "/images/home/geological-surveys.png",
  icon: "map",
  overviewHeading: "What a Geological Survey Involves",
  overviewParagraphs: [
    "Drilling without a survey is a gamble — you might strike a strong aquifer, or you might spend money drilling into dry rock. A geological survey removes that guesswork by mapping what's beneath the surface before any drilling equipment arrives.",
    "Our surveys most commonly use electrical resistivity methods: electrodes are placed across your site and a small current is passed through the ground. Different materials — dry rock, saturated rock, clay, sand — resist that current differently, and by measuring those differences at increasing depths (a technique known as vertical electrical sounding), we build a picture of the subsurface layers beneath your land.",
    "From that data, we can identify the depth at which water-bearing formations are likely to occur, estimate the probable yield of a well at that point, and mark the specific coordinates that give your borehole the best chance of success.",
  ],
  overviewBullets: [
    "Electrical resistivity survey and vertical electrical sounding",
    "Estimated depth and probable yield for your specific site",
    "A recommended, marked drill point before equipment arrives",
  ],
  quote:
    "Every successful borehole starts underground, on paper, before it ever starts in the ground with a drill bit.",
  process: [
    {
      title: "Site Walkover",
      description:
        "We inspect the land, note existing structures and access, and identify candidate survey lines across the property.",
    },
    {
      title: "Resistivity Survey",
      description:
        "Electrodes are laid out and readings are taken at increasing depths to map subsurface layers and locate likely aquifers.",
    },
    {
      title: "Interpretation & Recommendation",
      description:
        "We analyse the readings and hand over a report recommending the drill point, expected depth, and probable yield.",
    },
  ],
  benefits: [
    {
      icon: "map",
      title: "Informed Drill Points",
      description: "Choose where to drill based on data, not assumption.",
    },
    {
      icon: "gauge",
      title: "Yield Estimates",
      description: "A realistic expectation of output before you commit to drilling.",
    },
    {
      icon: "droplets",
      title: "Lower Risk",
      description: "Reduces the chance of drilling a low-yield or dry well.",
    },
    {
      icon: "layers",
      title: "Subsurface Clarity",
      description: "A clear picture of the rock and soil layers on your land.",
    },
  ],
  ctaHeading: "Planning to drill? Start with a survey.",
  ctaBody:
    "A geological survey tells us where the water is likely to be before we commit a rig to your land.",
  next: { slug: "pumping-tests", title: "Pumping Tests" },
};

export default function Page() {
  return <ServiceTemplate data={data} />;
}