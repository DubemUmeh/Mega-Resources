import ServiceTemplate, { type ServiceData } from "../_components/service-template";
import { createServiceMetadata } from "@/lib/seo";

export const data: ServiceData = {
  num: "12",
  slug: "horizontal-drain-drilling",
  eyebrow: "Service 12",
  title: "Horizontal Drain",
  titleAccent: "Drilling",
  tagline: "Provide a drainage path where conventional vertical wells are not the right geometry.",
  heroDescription:
    "Horizontal drain drilling creates drainage paths through slopes, excavations or other structures where groundwater needs relief and a horizontal installation is more suitable than a conventional vertical borehole.",
  img: "https://images.unsplash.com/photo-1513828583688-c52646db42da?auto=format&fit=crop&w=1600&q=85",
  icon: "wind",
  overviewHeading: "What Horizontal Drain Drilling Involves",
  overviewParagraphs: [
    "Horizontal drains are drilled drainage holes designed to intercept and relieve groundwater within or behind a slope, excavation, retaining structure or other suitable ground condition. They work by providing a preferential path for groundwater to leave the formation and reduce water pressure where drainage is required.",
    "Unlike a conventional vertical borehole, the drilling direction is selected to suit the geometry of the site and the groundwater problem. The alignment, length and drainage arrangement depend on the ground conditions, access and the location of the water that needs to be relieved.",
    "Horizontal drainage can be considered as part of a broader groundwater-control or geotechnical solution. Site investigation is important because the technique should be matched to the actual geology, groundwater pathways and engineering requirements rather than applied as a generic fix.",
  ],
  overviewBullets: [
    "Horizontal drainage for suitable slopes, excavations and retaining structures",
    "Drilling geometry selected around groundwater and site constraints",
    "A groundwater-control option that can complement other drainage measures",
  ],
  quote:
    "The best drainage path is the one that fits both the groundwater and the geometry of the site.",
  process: [
    {
      title: "Investigate the Site",
      description:
        "We consider the ground, groundwater conditions, access and engineering objective to determine whether horizontal drainage is appropriate.",
    },
    {
      title: "Set the Drainage Alignment",
      description:
        "The drilling direction and target are planned to intercept groundwater and provide the intended drainage path.",
    },
    {
      title: "Drill & Complete",
      description:
        "The horizontal drain is drilled and completed according to the ground conditions and drainage requirements of the project.",
    },
  ],
  benefits: [
    {
      icon: "wind",
      title: "Groundwater Relief",
      description: "Provide a path for groundwater to drain from suitable ground conditions.",
    },
    {
      icon: "layers",
      title: "Site-Specific Geometry",
      description: "Use a horizontal alignment where a vertical well is not the right fit.",
    },
    {
      icon: "map",
      title: "Slope & Excavation Support",
      description: "Consider horizontal drainage around suitable slopes and below-ground works.",
    },
    {
      icon: "droplets",
      title: "Part of a Wider Solution",
      description: "Combine drainage with investigation and other groundwater-control measures where needed.",
    },
  ],
  faqs: [
    {
      question: "What is horizontal drain drilling?",
      answer:
        "It is the drilling of relatively horizontal drainage holes intended to intercept and relieve groundwater in suitable slopes, excavations, retaining structures or similar settings.",
    },
    {
      question: "How is a horizontal drain different from a borehole?",
      answer:
        "A conventional borehole is generally drilled vertically to access groundwater for supply or investigation. A horizontal drain is oriented to provide groundwater relief within a specific site geometry.",
    },
    {
      question: "Where can horizontal drains be useful?",
      answer:
        "They can be considered for suitable slopes, excavations, retaining structures and other situations where groundwater pressure or seepage needs a drainage path.",
    },
    {
      question: "Can horizontal drainage be used for every groundwater problem?",
      answer:
        "No. Suitability depends on geology, groundwater pathways, access, engineering requirements and the drainage objective. Site investigation should guide the decision.",
    },
  ],
  ctaHeading: "Need groundwater relief where a vertical well is not ideal?",
  ctaBody:
    "Share the site conditions and drainage problem with us so we can discuss whether horizontal drain drilling is appropriate.",
  related: [
    { slug: "dewatering-wells", title: "Dewatering Wells", reason: "Control groundwater with pumped wells where that approach fits the project." },
    { slug: "geological-surveys", title: "Geological Surveys", reason: "Understand the ground and groundwater before selecting a drainage method." },
    { slug: "borehole-drilling", title: "Borehole Drilling", reason: "Use vertical drilling when the project needs a conventional groundwater well." },
  ],
};

export const metadata = createServiceMetadata(data);
export default function Page() {
  return <ServiceTemplate data={data} />;
}
