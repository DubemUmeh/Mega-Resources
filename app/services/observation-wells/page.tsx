import ServiceTemplate, { type ServiceData } from "../_components/service-template";
import { createServiceMetadata } from "@/lib/seo";

export const data: ServiceData = {
  num: "10",
  slug: "observation-wells",
  eyebrow: "Service 10",
  title: "Observation",
  titleAccent: "Wells",
  tagline: "Monitor groundwater levels as conditions change.",
  heroDescription:
    "Observation wells provide dedicated access for monitoring groundwater levels and behaviour over time. They can support groundwater investigations, construction monitoring, and dewatering projects where reliable observations are needed.",
  img: "/images/home/borehole-drilling.jpeg",
  icon: "droplets",
  overviewHeading: "What an Observation Well Involves",
  overviewParagraphs: [
    "An observation well is a well constructed primarily for groundwater monitoring. It gives a project a repeatable location from which groundwater levels can be measured and compared over time.",
    "The well is planned around the geological setting and the monitoring objective. The depth and screened interval should target the groundwater zone that needs to be observed, while the construction should allow useful measurements without turning the installation into a general production well.",
    "Observation wells are particularly useful when groundwater conditions may change during an investigation or construction project. Measurements can help a project team understand trends and make better-informed decisions about groundwater control or site conditions.",
  ],
  overviewBullets: [
    "Dedicated groundwater-level monitoring over time",
    "Installation planned around geology and the target monitoring zone",
    "Useful for groundwater investigations and construction monitoring",
  ],
  quote:
    "A monitoring well turns an underground condition into a measurable project variable.",
  process: [
    {
      title: "Plan the Monitoring Network",
      description:
        "We consider the site layout, geology and monitoring objective to determine where and at what depth observation points are useful.",
    },
    {
      title: "Drill & Construct",
      description:
        "The observation well is drilled and constructed for access to the groundwater zone being monitored.",
    },
    {
      title: "Measure & Compare",
      description:
        "The completed well provides a consistent location for recording groundwater levels and observing changes during the project.",
    },
  ],
  benefits: [
    {
      icon: "gauge",
      title: "Repeat Measurements",
      description: "Compare groundwater levels from the same monitoring point over time.",
    },
    {
      icon: "map",
      title: "Investigation Support",
      description: "Add field observations to a wider hydrogeological assessment.",
    },
    {
      icon: "layers",
      title: "Construction Monitoring",
      description: "Observe groundwater conditions around excavation and development work.",
    },
    {
      icon: "droplets",
      title: "Groundwater Visibility",
      description: "Turn changing subsurface conditions into useful project information.",
    },
  ],
  faqs: [
    {
      question: "What is an observation well?",
      answer:
        "It is a well installed primarily to provide a repeatable point for observing groundwater levels and conditions over time.",
    },
    {
      question: "How is an observation well different from a production borehole?",
      answer:
        "A production borehole is designed primarily to supply water, while an observation well is designed primarily for monitoring groundwater conditions.",
    },
    {
      question: "Can observation wells be used during construction?",
      answer:
        "Yes. They can provide groundwater-level information around construction or excavation areas where changes in groundwater conditions need to be understood.",
    },
    {
      question: "Do observation wells replace groundwater investigations?",
      answer:
        "No. They are one part of a groundwater monitoring or investigation programme and should be planned in relation to the site's geology and project objectives.",
    },
  ],
  ctaHeading: "Need to monitor groundwater over time?",
  ctaBody:
    "We can help scope observation-well drilling and installation around your site's geology and monitoring objective.",
  next: { slug: "dewatering-wells", title: "Dewatering Wells" },
  related: [
    { slug: "piezometer-drilling", title: "Piezometer Drilling", reason: "Install a purpose-built point for groundwater head or pressure monitoring." },
    { slug: "geological-surveys", title: "Geological Surveys", reason: "Investigate the subsurface before defining monitoring locations." },
    { slug: "pumping-tests", title: "Pumping Tests", reason: "Assess groundwater response where pumping is part of the project." },
    { slug: "dewatering-wells", title: "Dewatering Wells", reason: "Control groundwater when excavation or construction requires it." },
  ],
};

export const metadata = createServiceMetadata(data);
export default function Page() {
  return <ServiceTemplate data={data} />;
}
