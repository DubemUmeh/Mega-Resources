import type { Metadata } from "next";
import ServiceTemplate, {
  type ServiceData,
} from "../_components/service-template";

export const metadata: Metadata = {
  title: "Air Lifting & Developing | Clear Debris for Maximum Flow",
  description:
    "Compressed-air airlifting clears drilling debris and develops a newly drilled borehole so it delivers clean water at maximum flow.",
};

const data: ServiceData = {
  num: "07",
  slug: "air-lifting-developing",
  eyebrow: "Service 07",
  title: "Air Lifting /",
  titleAccent: "Developing",
  tagline: "The final step that turns a drilled hole into a working well.",
  heroDescription:
    "Freshly drilled boreholes are full of drilling mud, fines, and loose rock. We use compressed-air airlifting to clear that debris and develop the well, so it delivers clean water at its full potential flow.",
  img: "/images/home/air-lifting.png",
  icon: "wind",
  overviewHeading: "What Air Lifting & Developing Involves",
  overviewParagraphs: [
    "Drilling a borehole inevitably leaves debris behind — drilling mud, rock cuttings, and fine sediment coat the casing and screen and sit in the water column. Left untreated, that material chokes the well's true yield and keeps the water cloudy. Developing the borehole is the process of clearing it all out.",
    "We do this using compressed air. A pipe carrying high-pressure air is lowered into the borehole, and the release of air near the base creates a strong upward surge that lifts water, sediment, and fines out of the well in one continuous column. Repeating this in stages progressively pulls fine material away from the screen and casing, opening up the pathways water needs to flow freely into the well.",
    "Development continues until the water discharging from the borehole runs clear and the flow rate stabilises, which confirms the well is ready to be pumping-tested and fitted with a permanent pump.",
  ],
  overviewBullets: [
    "Removes drilling mud, cuttings, and fine sediment",
    "Opens flow pathways at the screen and casing",
    "Confirms the well is ready for pumping tests and pump installation",
  ],
  quote:
    "A borehole isn't finished when the drilling stops — it's finished when the water runs clear.",
  process: [
    {
      title: "Air Injection",
      description:
        "A compressed-air line is lowered into the borehole to create a strong upward surge that lifts water and debris.",
    },
    {
      title: "Staged Development",
      description:
        "The process is repeated at different depths, progressively drawing fine sediment away from the screen and casing.",
    },
    {
      title: "Clarity Check",
      description:
        "We monitor discharge until the water runs clear and flow stabilises, confirming the well is ready for use.",
    },
  ],
  benefits: [
    {
      icon: "wind",
      title: "Maximum Flow",
      description: "Clears blocked pathways so the well reaches its full yield.",
    },
    {
      icon: "droplets",
      title: "Clean Water",
      description: "Removes the sediment that causes cloudy or gritty discharge.",
    },
    {
      icon: "refresh",
      title: "Protects the Pump",
      description: "Fewer solids in the water means less wear on pump components.",
    },
    {
      icon: "gauge",
      title: "Test-Ready Well",
      description: "Leaves the borehole ready for an accurate pumping test.",
    },
  ],
  ctaHeading: "Just finished drilling?",
  ctaBody:
    "Let us develop your borehole properly before it's tested and pumped — it's the step that unlocks full performance.",
};

export default function Page() {
  return <ServiceTemplate data={data} />;
}