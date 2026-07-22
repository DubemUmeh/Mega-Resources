import ServiceTemplate, {
  type ServiceData,
} from "../_components/service-template";
import { createServiceMetadata } from "@/lib/seo";

export const data: ServiceData = {
  num: "06",
  slug: "pumping-tests",
  eyebrow: "Service 06",
  title: "Pumping",
  titleAccent: "Tests",
  tagline: "Find out what your borehole can truly sustain.",
  heroDescription:
    "A borehole's short-term output isn't the same as what it can sustain long-term. We run pumping tests to measure the sustainable yield of your well, so the pump you install is sized correctly from day one.",
  img: "/images/home/pumping-tests.png",
  icon: "gauge",
  overviewHeading: "What a Pumping Test Involves",
  overviewParagraphs: [
    "Right after drilling, a borehole can look far more productive than it actually is, because the water sitting in the surrounding rock hasn't been drawn down yet. A pumping test is how we find the well's real, sustainable yield — the rate it can keep producing over time without the water level collapsing.",
    "We typically run a step-drawdown test first: pumping the well at a series of increasing rates and recording how the water level responds at each step. This shows us how the borehole behaves under different loads and highlights the point where drawdown becomes excessive. From there, we often follow with a longer constant-rate test, pumping at a fixed rate for several hours to confirm the yield holds steady rather than declining.",
    "The results tell us exactly how much water can be drawn from the well on an ongoing basis, which is the single most important number for choosing the right pump.",
  ],
  overviewBullets: [
    "Step-drawdown testing to map the well's response to pumping",
    "Constant-rate testing to confirm long-term sustainable yield",
    "A yield figure used directly to size your pump correctly",
  ],
  quote:
    "The number on day one of pumping is rarely the number your well can sustain — that's what a pumping test is for.",
  process: [
    {
      title: "Step-Drawdown Test",
      description:
        "The well is pumped at increasing rates in stages, with water levels logged at each step to observe how it responds.",
    },
    {
      title: "Constant-Rate Test",
      description:
        "The borehole is pumped at a fixed rate over an extended period to confirm the yield remains stable, not declining.",
    },
    {
      title: "Recovery & Reporting",
      description:
        "We monitor water-level recovery after pumping stops and issue a report stating the confirmed sustainable yield.",
    },
  ],
  benefits: [
    {
      icon: "gauge",
      title: "Accurate Sizing",
      description: "Pump selection based on real, tested yield figures.",
    },
    {
      icon: "droplets",
      title: "Prevents Over-Pumping",
      description: "Avoids drawing the well down faster than it can recharge.",
    },
    {
      icon: "refresh",
      title: "Protects Equipment",
      description: "Reduces pump wear caused by running against low water levels.",
    },
    {
      icon: "layers",
      title: "Reliable Planning",
      description: "Know your daily safe-yield figure for planning water use.",
    },
  ],
  ctaHeading: "Just drilled a borehole?",
  ctaBody:
    "Before we install a pump, we test the well so it's sized to what your borehole can actually sustain.",
  next: { slug: "air-lifting-developing", title: "Air Lifting / Developing" },
  related: [
    { slug: "pump-installation", title: "Pump Installation", reason: "Select the right pump from the test curve." },
    { slug: "borehole-rehabilitation", title: "Borehole Rehabilitation", reason: "Investigate weak yields before redrilling." },
    { slug: "air-lifting-developing", title: "Air Lifting / Developing", reason: "Clear fines before final test readings." },
  ],
};

export const metadata = createServiceMetadata(data);

export default function Page() {
  return <ServiceTemplate data={data} />;
}