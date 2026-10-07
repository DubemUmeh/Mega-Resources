import ServiceTemplate, { type ServiceData } from "../_components/service-template";
import { createServiceMetadata } from "@/lib/seo";

export const data: ServiceData = {
  num: "09",
  slug: "piezometer-drilling",
  eyebrow: "Service 09",
  title: "Piezometer",
  titleAccent: "Drilling",
  tagline: "Measure groundwater levels and pressure with a purpose-built monitoring point.",
  heroDescription:
    "Piezometer drilling and installation creates a dedicated point for monitoring groundwater head or pressure. It can support hydrogeological investigations, construction monitoring, and projects where changes in groundwater conditions need to be measured over time.",
  img: "/images/home/geological-surveys.png",
  icon: "gauge",
  overviewHeading: "What Piezometer Drilling Involves",
  overviewParagraphs: [
    "A piezometer is a monitoring installation used to measure groundwater level or hydraulic pressure at a defined depth. Unlike a production borehole, its primary purpose is observation and measurement rather than supplying water for general use.",
    "The installation begins with understanding the geology and the monitoring objective. Drilling depth, screened interval and installation details should suit the formation and the groundwater zone being investigated. The completed installation can then provide repeatable measurements of groundwater conditions.",
    "Piezometers are useful where groundwater behaviour matters to a project. They can support hydrogeological investigations and monitoring around construction or other works where groundwater levels or pressure may change during the project.",
  ],
  overviewBullets: [
    "Monitoring points designed around the target groundwater zone",
    "Installation informed by site geology and the monitoring objective",
    "A dedicated point for repeat groundwater-level or pressure observations",
  ],
  quote:
    "Good groundwater monitoring starts with a monitoring point designed for the question the project needs to answer.",
  process: [
    {
      title: "Define the Monitoring Need",
      description:
        "We review the site, geology and project objective to identify what groundwater condition needs to be measured and at what depth.",
    },
    {
      title: "Drill & Install",
      description:
        "The borehole is drilled to the required monitoring interval and the piezometer installation is completed to suit the target zone and site conditions.",
    },
    {
      title: "Prepare for Monitoring",
      description:
        "The installation is finished so groundwater levels or pressure can be measured consistently as the project progresses.",
    },
  ],
  benefits: [
    {
      icon: "gauge",
      title: "Groundwater Monitoring",
      description: "Create a dedicated point for observing groundwater conditions over time.",
    },
    {
      icon: "layers",
      title: "Targeted Depth",
      description: "Focus measurements on the groundwater zone relevant to the investigation.",
    },
    {
      icon: "map",
      title: "Site-Specific Design",
      description: "Installation details are considered against local geology and project needs.",
    },
    {
      icon: "droplets",
      title: "Useful Project Data",
      description: "Support decisions that depend on changing groundwater levels or pressure.",
    },
  ],
  faqs: [
    {
      question: "What is a piezometer used for?",
      answer:
        "A piezometer provides a defined monitoring point for measuring groundwater level or hydraulic pressure at a selected depth.",
    },
    {
      question: "Is a piezometer the same as a production borehole?",
      answer:
        "No. A production borehole is primarily developed to supply water, while a piezometer is primarily installed to observe groundwater conditions.",
    },
    {
      question: "When might a project need piezometers?",
      answer:
        "They can be useful for hydrogeological investigations and for monitoring groundwater conditions around construction or other projects where groundwater behaviour is important.",
    },
    {
      question: "How is piezometer depth determined?",
      answer:
        "Depth and the monitoring interval depend on the site's geology and what the project needs to measure. These should be established during project planning and site investigation.",
    },
  ],
  ctaHeading: "Need reliable groundwater monitoring points?",
  ctaBody:
    "Tell us what your project needs to measure and we can discuss the appropriate drilling and installation approach.",
  next: { slug: "observation-wells", title: "Observation Wells" },
  related: [
    { slug: "geological-surveys", title: "Geological Surveys", reason: "Understand the subsurface before selecting a monitoring installation." },
    { slug: "observation-wells", title: "Observation Wells", reason: "Use a dedicated well to monitor groundwater levels over time." },
    { slug: "pumping-tests", title: "Pumping Tests", reason: "Combine monitoring with measured groundwater response where appropriate." },
    { slug: "borehole-drilling", title: "Borehole Drilling", reason: "Develop a production water source when supply is the project goal." },
  ],
};

export const metadata = createServiceMetadata(data);
export default function Page() {
  return <ServiceTemplate data={data} />;
}
