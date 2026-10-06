import ServiceTemplate, {
  type ServiceData,
} from "../_components/service-template";
import { createServiceMetadata } from "@/lib/seo";

export const data: ServiceData = {
  num: "06",
  slug: "pump-installation",
  eyebrow: "Service 06",
  title: "Pump",
  titleAccent: "Installation",
  tagline: "The right pump, sized to your well, wired and ready to run.",
  heroDescription:
    "We supply and install submersible, solar, and surface pumps — matched to your borehole's depth and yield, then fully wired, tested, and handed over ready to use.",
  img: "/images/home/pump-installation.png",
  icon: "wrench",
  overviewHeading: "What Pump Installation Involves",
  overviewParagraphs: [
    "A borehole is only useful once water can be lifted to the surface, and that's where the right pump matters. We install three main types: submersible pumps that sit inside the borehole itself for deep or high-yield wells, solar pumps for off-grid sites that need to run without mains electricity, and surface pumps for shallow wells or boosting pressure at the point of use.",
    "Pump selection isn't guesswork. We size the pump against the depth of your borehole and the yield confirmed by a pumping test, so it draws water efficiently without running dry or wearing out prematurely. Oversized pumps waste power and stress the well; undersized pumps leave you short of water — we aim for the exact fit.",
    "Once selected, we install the pump, run and protect the electrical or solar wiring, fit the control panel or solar inverter, and commission the system with a full test run before we leave site.",
  ],
  overviewBullets: [
    "Submersible, solar, and surface pump options",
    "Sizing based on confirmed borehole yield, not estimates",
    "Complete wiring, control panel, and commissioning included",
  ],
  quote:
    "The best pump isn't the most powerful one — it's the one matched exactly to what your borehole can give.",
  process: [
    {
      title: "Yield-Based Sizing",
      description:
        "We use your borehole's tested yield and depth to select the correct pump type, capacity, and power source.",
    },
    {
      title: "Installation & Wiring",
      description:
        "The pump is lowered and secured, and all electrical or solar wiring is run, protected, and connected to the control panel.",
    },
    {
      title: "Testing & Handover",
      description:
        "We run the system under load, check flow and pressure, and walk you through operation before handover.",
    },
  ],
  benefits: [
    {
      icon: "gauge",
      title: "Efficient Draw",
      description: "Pumps sized to your yield run efficiently, not overworked.",
    },
    {
      icon: "droplets",
      title: "Consistent Pressure",
      description: "Steady water pressure at every tap and outlet.",
    },
    {
      icon: "wrench",
      title: "Fully Wired",
      description: "Electrical or solar systems installed and tested on site.",
    },
    {
      icon: "refresh",
      title: "Longer Pump Life",
      description: "Correct sizing means less strain and fewer breakdowns.",
    },
  ],
  faqs: [
    {
      "question": "Which type of borehole pump do I need?",
      "answer": "The correct pump depends on borehole depth, tested yield, required flow, total head, water demand and available power. Mega Resources considers these factors before selecting a pump."
    },
    {
      "question": "Can you install solar borehole pumps?",
      "answer": "Yes. Solar pumping is one of the pump options offered for sites where solar power is appropriate for the required water demand."
    },
    {
      "question": "Should I install a pump immediately after drilling?",
      "answer": "The borehole should first be properly developed and its performance tested. Those results help prevent choosing a pump that is too large or too small for the well."
    },
    {
      "question": "Do you test the pump after installation?",
      "answer": "Yes. The installation process includes testing the system under operating conditions and checking flow and pressure before handover."
    }
  ],
  ctaHeading: "Have a borehole that needs a pump?",
  ctaBody:
    "We'll assess your well's yield and depth and recommend the pump system that fits — submersible, solar, or surface.",
  next: { slug: "borehole-rehabilitation", title: "Borehole Rehabilitation" },
  related: [
    { slug: "pumping-tests", title: "Pumping Tests", reason: "Use measured yield data to avoid over-pumping." },
    { slug: "borehole-rehabilitation", title: "Borehole Rehabilitation", reason: "Restore older wells before replacing pump hardware." },
  ],
};

export const metadata = createServiceMetadata(data);

export default function Page() {
  return <ServiceTemplate data={data} />;
}