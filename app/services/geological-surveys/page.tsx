import ServiceTemplate, {
  type ServiceData,
} from "../_components/service-template";
import { createServiceMetadata } from "@/lib/seo";
import { getResolvedMedia } from "@/lib/media";

export const data: ServiceData = {
  num: "01",
  slug: "geological-surveys",
  eyebrow: "Service 01",
  title: "Geological",
  titleAccent: "Surveys",
  tagline: "Know what's underground before a single hole is drilled.",
  seoTitle: "Geological Surveys for Boreholes in Ghana | Mega Resources",
  seoDescription: "Electrical resistivity and geophysical surveys to locate promising groundwater and the best borehole drill point on your site in Ghana.",
  seoKeywords: ["geological survey Ghana", "geophysical survey for borehole", "groundwater survey Ghana", "electrical resistivity survey Ghana", "borehole site survey"],
  heroDescription:
    "Before we drill, we survey. Using geophysical methods, we confirm the likely depth and volume of water beneath your land, so the drill point we choose is backed by data, not luck.",
  mediaKey: "services.geological-surveys.hero",
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
  faqs: [
    {
      "question": "What is a geological survey for a borehole?",
      "answer": "It investigates the subsurface to identify formations and locations that are more likely to contain usable groundwater before drilling begins."
    },
    {
      "question": "How does electrical resistivity help locate groundwater?",
      "answer": "Electrical resistivity measurements show how subsurface materials respond to an electrical current. Those readings can be interpreted to identify formations and depths that may be associated with groundwater."
    },
    {
      "question": "Can a geological survey guarantee water?",
      "answer": "No. A survey improves the basis for selecting a drill point, but groundwater conditions cannot be guaranteed from surface measurements alone."
    },
    {
      "question": "How long does a geological survey take?",
      "answer": "The time depends on the size and conditions of the site and the survey scope. The team can confirm the expected fieldwork duration when the property is assessed."
    }
  ],
  ctaHeading: "Planning to drill? Start with a survey.",
  ctaBody:
    "A geological survey tells us where the water is likely to be before we commit a rig to your land.",
  next: { slug: "borehole-drilling", title: "Borehole Drilling" },
  related: [
    { slug: "borehole-drilling", title: "Borehole Drilling", reason: "Turn the strongest survey target into a productive well." },
    { slug: "piezometer-drilling", title: "Piezometer Drilling", reason: "Plan a dedicated groundwater monitoring point from site information." },
    { slug: "observation-wells", title: "Observation Wells", reason: "Monitor groundwater levels during an investigation or project." },
    { slug: "dewatering-wells", title: "Dewatering Wells", reason: "Assess groundwater conditions before planning construction dewatering." },
  ],
};

export const metadata = createServiceMetadata(data);

export default async function Page() {
  const media = await getResolvedMedia(data.mediaKey);
  return <ServiceTemplate data={data} media={media} />;
}