import ServiceTemplate, {
  type ServiceData,
} from "../_components/service-template";
import { createServiceMetadata } from "@/lib/seo";

export const data: ServiceData = {
  num: "01",
  slug: "borehole-drilling",
  eyebrow: "Service 01",
  title: "Borehole",
  titleAccent: "Drilling",
  tagline: "The foundation of every water project we deliver.",
  heroDescription:
    "We drill boreholes to depths of 100ft–400ft, guided by a geophysical survey and finished with PVC casing that keeps the well clear, stable, and productive for decades.",
  img: "/images/home/borehole-drilling.jpeg",
  icon: "map",
  overviewHeading: "What Borehole Drilling Involves",
  overviewParagraphs: [
    "Borehole drilling is the process of creating a vertical well that reaches down into a water-bearing rock layer, or aquifer, so groundwater can be pumped up to the surface. Depth varies by location — in most of Ghana, productive boreholes sit anywhere between 100ft and 400ft, depending on the local geology.",
    "Before any drilling starts, we use the results of a geophysical survey to choose the exact drill point most likely to intersect a strong aquifer. Once drilling begins, we rotary-drill through the overburden and into bedrock, monitoring the strata as we go so we know precisely where water is entering the hole.",
    "As the borehole is completed, we install PVC casing along its length. The casing prevents the surrounding soil and loose rock from collapsing into the well, keeps out surface contamination, and creates a clean, uninterrupted column of water for the pump to draw from.",
  ],
  overviewBullets: [
    "Depths engineered to your site's geology, from 100ft to 400ft",
    "Casing sized and slotted to match the aquifer's yield",
    "Cuttings and drilling records kept for every well we sink",
  ],
  quote:
    "A borehole is only as good as the ground it's placed in — that's why the drill point is decided by data, not guesswork.",
  process: [
    {
      title: "Site Preparation",
      description:
        "We confirm access, drilling orientation, and the exact coordinates identified by the geological survey before equipment arrives on site.",
    },
    {
      title: "Rotary Drilling",
      description:
        "Our rig drills through the overburden and into bedrock, logging strata changes and water strikes as the hole advances.",
    },
    {
      title: "Casing & Completion",
      description:
        "PVC casing is installed to the required depth, the annulus is sealed, and the well head is finished ready for pump installation.",
    },
  ],
  benefits: [
    {
      icon: "droplets",
      title: "Reliable Access",
      description: "A dedicated water source on your own land, year-round.",
    },
    {
      icon: "layers",
      title: "Built to Last",
      description: "PVC casing protects the well from collapse and debris.",
    },
    {
      icon: "map",
      title: "Data-Led Placement",
      description: "Drill points chosen from real geophysical readings.",
    },
    {
      icon: "gauge",
      title: "Right-Sized Wells",
      description: "Depth matched to the aquifer, not over- or under-drilled.",
    },
  ],
  ctaHeading: "Ready to sink a borehole on your land?",
  ctaBody:
    "We'll start with a geological survey to confirm the right spot, then drill and case your well from start to finish.",
  next: { slug: "pump-installation", title: "Pump Installation" },
  related: [
    { slug: "geological-surveys", title: "Geological Surveys", reason: "Validate the drill point before mobilising a rig." },
    { slug: "pumping-tests", title: "Pumping Tests", reason: "Confirm sustainable yield after drilling is complete." },
    { slug: "pump-installation", title: "Pump Installation", reason: "Install a pump sized to the tested borehole yield." },
  ],
};

export const metadata = createServiceMetadata(data);

export default function Page() {
  return <ServiceTemplate data={data} />;
}