import ServiceTemplate, {
  type ServiceData,
} from "../_components/service-template";
import { createServiceMetadata } from "@/lib/seo";

export const data: ServiceData = {
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
  faqs: [
    {
      "question": "What is air lifting in borehole development?",
      "answer": "Compressed air is used to lift water, drilling mud, fines and loose sediment from the borehole so the casing and screen can develop clearer pathways for groundwater flow."
    },
    {
      "question": "Why does a new borehole need development?",
      "answer": "Drilling can leave mud, cuttings and fine sediment around the well. Development removes this material and helps the borehole reach stable performance before pumping tests and permanent pumping."
    },
    {
      "question": "How do I know when a borehole is properly developed?",
      "answer": "Development continues until the discharge becomes sufficiently clear and the flow stabilises according to the project's requirements, after which the borehole can be tested."
    },
    {
      "question": "Can air lifting improve an old borehole?",
      "answer": "Air lifting can be part of rehabilitation or redevelopment work where accumulated sediment and fines are contributing to poor borehole performance."
    }
  ],
  ctaHeading: "Just finished drilling?",
  ctaBody:
    "Let us develop your borehole properly before it's tested and pumped — it's the step that unlocks full performance.",
  next: { slug: "pumping-tests", title: "Pumping Tests" },
  related: [
    { slug: "pumping-tests", title: "Pumping Tests", reason: "Run accurate tests once the well clears." },
    { slug: "pump-installation", title: "Pump Installation", reason: "Protect new pumps from grit and sediment." },
  ],
};

export const metadata = createServiceMetadata(data);

export default function Page() {
  return <ServiceTemplate data={data} />;
}