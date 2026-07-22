import ServiceTemplate, {
  type ServiceData,
} from "../_components/service-template";
import { createServiceMetadata } from "@/lib/seo";

export const data: ServiceData = {
  num: "03",
  slug: "borehole-rehabilitation",
  eyebrow: "Service 03",
  title: "Borehole",
  titleAccent: "Rehabilitation",
  tagline: "Bring a tired borehole back to full strength.",
  heroDescription:
    "If your well now delivers low yield or muddy water, the problem is often a clogged or fouled borehole, not a dry aquifer. We clean and re-develop old boreholes to restore their original output.",
  img: "/images/home/borehole-rehabilitation.png",
  icon: "refresh",
  overviewHeading: "What Borehole Rehabilitation Involves",
  overviewParagraphs: [
    "Boreholes decline over time. Fine sediment and rock fines settle around the screen, mineral scale and biofilm build up on the casing, and years of pumping can compact material against the well wall. The result is the two most common complaints we hear: yield has dropped, or the water has turned cloudy or muddy.",
    "Rehabilitation starts with an inspection to understand what's actually wrong — a camera survey or a review of pumping history often tells us whether we're dealing with sediment buildup, scaling, or a mechanical fault. From there we use mechanical brushing and surging to loosen material stuck to the casing and screen, followed by airlifting to draw the loosened debris and sediment out of the borehole.",
    "In many cases, this restores a well close to its original yield at a fraction of the cost of drilling a new borehole — making it the first option worth trying before assuming a well is finished.",
  ],
  overviewBullets: [
    "Diagnosis before treatment — we confirm the actual cause first",
    "Mechanical brushing, surging, and airlift cleaning",
    "A cost-effective alternative to drilling a brand-new borehole",
  ],
  quote:
    "Most 'dead' boreholes aren't dry — they're clogged. Rehabilitation usually costs a fraction of drilling a new one.",
  process: [
    {
      title: "Diagnosis",
      description:
        "We assess pumping history and well condition to identify whether the issue is sediment, scale, or a mechanical fault.",
    },
    {
      title: "Cleaning & Surging",
      description:
        "Mechanical brushing and surging loosen buildup from the casing and screen along the full depth of the well.",
    },
    {
      title: "Airlift Redevelopment",
      description:
        "Compressed air lifts loosened sediment and fines out of the borehole until the water runs clear and flow is restored.",
    },
  ],
  benefits: [
    {
      icon: "refresh",
      title: "Restored Yield",
      description: "Recover output that's been lost to clogging over time.",
    },
    {
      icon: "droplets",
      title: "Clear Water",
      description: "Removes the sediment behind cloudy or muddy discharge.",
    },
    {
      icon: "gauge",
      title: "Cost-Effective",
      description: "Often far cheaper than drilling a replacement well.",
    },
    {
      icon: "wrench",
      title: "Extends Well Life",
      description: "Regular redevelopment keeps a borehole productive for longer.",
    },
  ],
  ctaHeading: "Is your borehole underperforming?",
  ctaBody:
    "Before you write off an old well, let us diagnose it — rehabilitation restores many boreholes to full working order.",
  next: { slug: "hydro-fracturing", title: "Hydro-fracturing" },
  related: [
    { slug: "air-lifting-developing", title: "Air Lifting / Developing", reason: "Clear loosened sediment after cleaning work." },
    { slug: "pumping-tests", title: "Pumping Tests", reason: "Measure recovery after rehabilitation." },
    { slug: "pump-installation", title: "Pump Installation", reason: "Replace worn pumps only after well performance is restored." },
  ],
};

export const metadata = createServiceMetadata(data);

export default function Page() {
  return <ServiceTemplate data={data} />;
}