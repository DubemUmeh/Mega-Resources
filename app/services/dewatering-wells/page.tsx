import ServiceTemplate, { type ServiceData } from "../_components/service-template";
import { createServiceMetadata } from "@/lib/seo";
import { getResolvedMedia } from "@/lib/media";

export const data: ServiceData = {
  num: "11",
  slug: "dewatering-wells",
  eyebrow: "Service 11",
  title: "Dewatering",
  titleAccent: "Wells",
  tagline: "Control groundwater where excavation and construction require a drier working area.",
  seoTitle: "Dewatering Wells in Ghana for Construction | Mega Resources",
  seoDescription: "Dewatering wells and groundwater control for construction and excavation projects in Ghana, with pumping and monitoring planned together.",
  seoKeywords: ["dewatering wells Ghana", "construction dewatering", "groundwater control excavation", "dewatering services Ghana", "well point dewatering"],
  heroDescription:
    "Dewatering wells are used to remove groundwater and lower groundwater levels around suitable construction or excavation areas. The approach is planned around site geology, groundwater conditions, and project requirements.",
  mediaKey: "services.dewatering-wells.hero",
  img: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1600&q=85",
  icon: "gauge",
  overviewHeading: "What Dewatering Wells Involve",
  overviewParagraphs: [
    "Groundwater can enter excavations, foundations, shafts and other below-ground work areas. Where groundwater needs to be controlled, dewatering wells can provide a planned way to intercept and remove water before it impacts construction.",
    "A suitable dewatering approach depends on the ground and groundwater conditions, the geometry of the excavation and how much water needs to be controlled. Investigation and testing help the project team understand the scale of the problem.",
    "Dewatering is not simply a matter of drilling and switching on a pump. Well locations, screened intervals, pump capacity, discharge arrangements and monitoring requirements need to be considered carefully.",
  ],
  overviewBullets: [
    "Groundwater control for suitable excavations and construction work",
    "Well and pumping arrangements planned around site conditions",
    "Monitoring and testing can inform drawdown and system decisions",
  ],
  quote:
    "Effective dewatering is a groundwater-control system, not just a pump in a hole.",
  process: [
    {
      title: "Assess Groundwater Conditions",
      description:
        "We consider the site's geology, groundwater conditions and construction requirements to understand the dewatering problem.",
    },
    {
      title: "Drill & Equip",
      description:
        "Dewatering wells are positioned and constructed for the groundwater zone that needs to be controlled, with pumping equipment selected for the project requirements.",
    },
    {
      title: "Monitor & Adjust",
      description:
        "Groundwater levels and system performance can be monitored so pumping arrangements remain aligned with actual site conditions.",
    },
  ],
  benefits: [
    {
      icon: "gauge",
      title: "Groundwater Control",
      description: "Lower groundwater levels where controlled pumping is appropriate.",
    },
    {
      icon: "layers",
      title: "Construction Support",
      description: "Help manage groundwater around suitable excavations and below-ground works.",
    },
    {
      icon: "map",
      title: "Site-Specific Planning",
      description: "Plan well locations and pumping around the actual ground conditions.",
    },
    {
      icon: "droplets",
      title: "Measured Response",
      description: "Use monitoring and testing to understand how the groundwater system responds.",
    },
  ],
  faqs: [
    {
      question: "What are dewatering wells used for?",
      answer:
        "They are used to pump groundwater from an area where groundwater levels need to be lowered or controlled for suitable construction and excavation work.",
    },
    {
      question: "Does every excavation need a dewatering well?",
      answer:
        "No. The need for dewatering depends on groundwater conditions, excavation depth, soil and rock conditions, and the construction method.",
    },
    {
      question: "How are dewatering wells designed?",
      answer:
        "The well arrangement depends on the groundwater system and project requirements. Site investigation, testing and monitoring help determine appropriate locations, depths and pumping arrangements.",
    },
    {
      question: "How do pumping tests relate to dewatering?",
      answer:
        "Pumping tests can provide information about groundwater response and aquifer behaviour that helps inform groundwater-control and pumping decisions.",
    },
  ],
  ctaHeading: "Planning excavation below the groundwater level?",
  ctaBody:
    "Discuss the site and construction requirements with us so the groundwater-control approach can be considered before drilling and pumping begin.",
  next: { slug: "horizontal-drain-drilling", title: "Horizontal Drain Drilling" },
  related: [
    { slug: "borehole-drilling", title: "Borehole Drilling", reason: "Use conventional vertical drilling where the project requires a groundwater well." },
    { slug: "pumping-tests", title: "Pumping Tests", reason: "Understand groundwater response before sizing a pumping system." },
    { slug: "geological-surveys", title: "Geological Surveys", reason: "Investigate ground conditions before selecting a groundwater-control approach." },
    { slug: "horizontal-drain-drilling", title: "Horizontal Drain Drilling", reason: "Consider horizontal drainage where site geometry makes it appropriate." },
  ],
};

export const metadata = createServiceMetadata(data);

export default async function Page() {
  const media = await getResolvedMedia(data.mediaKey);
  return <ServiceTemplate data={data} media={media} />;
}
