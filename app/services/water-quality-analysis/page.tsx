import ServiceTemplate, {
  type ServiceData,
} from "../_components/service-template";
import { createServiceMetadata } from "@/lib/seo";

export const data: ServiceData = {
  num: "08",
  slug: "water-quality-analysis",
  eyebrow: "Service 08",
  title: "Water Quality",
  titleAccent: "Analysis",
  tagline: "Know what is in your water before you decide how to use or treat it.",
  heroDescription:
    "Water quality analysis helps identify physical, chemical, and microbiological characteristics that can affect how groundwater should be used. We assess water samples and use the results to guide treatment and water-system decisions.",
  img: "/images/home/water-quality-analysis.svg",
  icon: "flask",
  overviewHeading: "What Water Quality Analysis Involves",
  overviewParagraphs: [
    "A productive borehole is only part of a reliable water supply. Groundwater can contain dissolved minerals, metals, salts, suspended matter, or microorganisms that are not obvious from appearance alone. Water quality analysis provides measured results that can be used to determine whether the water is suitable for its intended purpose.",
    "We collect or receive representative water samples and arrange analysis against the parameters relevant to the project. The results provide a clearer picture of the water's condition and help identify whether treatment, filtration, disinfection, or additional investigation may be required.",
    "Testing can be useful for newly completed boreholes as well as existing water sources where the taste, colour, odour, performance, or intended use has changed.",
  ],
  overviewBullets: [
    "Identify important physical, chemical, and microbiological water-quality parameters",
    "Use test results to guide treatment and filtration decisions",
    "Support safer planning for domestic, institutional, agricultural, and commercial water use",
  ],
  quote:
    "Clear-looking water is not the same thing as tested water — analysis gives you evidence for the next decision.",
  process: [
    {
      title: "Sample Collection",
      description:
        "We collect or receive a representative water sample using handling practices appropriate to the requested analysis.",
    },
    {
      title: "Laboratory Analysis",
      description:
        "The sample is assessed against the relevant water-quality parameters for the project's intended use and requirements.",
    },
    {
      title: "Results & Guidance",
      description:
        "We review the findings with you and explain what the results mean for treatment, filtration, and the wider water system.",
    },
  ],
  benefits: [
    {
      icon: "flask",
      title: "Evidence-Based Decisions",
      description: "Use measured water-quality results rather than relying on appearance, taste, or assumptions.",
    },
    {
      icon: "droplets",
      title: "Treatment Planning",
      description: "Identify when filtration, disinfection, or other treatment may be needed.",
    },
    {
      icon: "gauge",
      title: "System Protection",
      description: "Understand water characteristics that can affect equipment and ongoing water-system operation.",
    },
    {
      icon: "layers",
      title: "Fit-for-Purpose Testing",
      description: "Select relevant parameters based on how the water will be used and the project requirements.",
    },
  ],
  faqs: [
    {
      question: "Why should borehole water be tested?",
      answer:
        "Groundwater can contain dissolved substances or microorganisms that cannot be reliably identified by appearance alone. Testing provides measured results that help determine suitable use and treatment.",
    },
    {
      question: "What does a water quality analysis test for?",
      answer:
        "The parameters depend on the purpose of the test. Analysis can cover physical, chemical, and microbiological characteristics, with the exact panel selected according to the water source and intended use.",
    },
    {
      question: "When should I test a newly drilled borehole?",
      answer:
        "Testing after the borehole has been properly developed and is producing representative water is a useful step before making decisions about domestic, institutional, commercial, or other long-term use.",
    },
    {
      question: "Can you test water from an existing borehole?",
      answer:
        "Yes. Existing boreholes can be tested when water quality changes, a treatment system is being considered, or the owner needs current results for a particular use.",
    },
  ],
  ctaHeading: "Need to know whether your water is suitable?",
  ctaBody:
    "Share your water source and intended use with us and we can help you determine the appropriate analysis and next step.",
  related: [
    {
      slug: "borehole-drilling",
      title: "Borehole Drilling",
      reason: "Start with a properly planned and constructed groundwater source.",
    },
    {
      slug: "pumping-tests",
      title: "Pumping Tests",
      reason: "Measure borehole yield and performance alongside water-quality results.",
    },
    {
      slug: "borehole-rehabilitation",
      title: "Borehole Rehabilitation",
      reason: "Investigate and restore an existing borehole when performance or water quality declines.",
    },
  ],
};

export const metadata = createServiceMetadata(data);

export default function Page() {
  return <ServiceTemplate data={data} />;
}
