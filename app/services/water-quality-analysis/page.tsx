import ServiceTemplate, {
  type ServiceData,
} from "../_components/service-template";
import { createServiceMetadata } from "@/lib/seo";
import { getResolvedMedia } from "@/lib/media";

export const data: ServiceData = {
  num: "05",
  slug: "water-quality-analysis",
  eyebrow: "Service 05",
  title: "Water Quality",
  titleAccent: "Analysis",
  tagline: "Know what is in your water before you rely on it.",
  heroDescription:
    "Water quality analysis helps identify physical, chemical, and microbiological concerns so you can make informed decisions about drinking, household, agricultural, or commercial use.",
  mediaKey: "services.water-quality-analysis.hero",
  img: "/images/home/water-quality-analysis.svg",
  icon: "droplets",
  overviewHeading: "What Water Quality Analysis Involves",
  overviewParagraphs: [
    "A productive borehole does not automatically mean the water is suitable for every intended use. Water quality analysis examines a representative sample against the parameters relevant to how the water will be used.",
    "Depending on the project, analysis can consider physical characteristics, chemical parameters, and microbiological indicators. The results provide a clearer picture of the water and can help identify when treatment, filtration, disinfection, or further investigation is appropriate.",
    "For new boreholes, quality analysis can form part of the handover process. For existing water sources, it can help investigate changes in colour, taste, odour, or other concerns and provide evidence for the next treatment decision.",
  ],
  overviewBullets: [
    "Testing selected to match the intended use of the water",
    "Results that support practical treatment and water-system decisions",
    "Useful for new boreholes, existing wells, homes, farms, and institutions",
  ],
  quote:
    "Clear water is not necessarily safe water. Testing gives you evidence before you decide how the source should be used or treated.",
  process: [
    {
      title: "Sample Planning",
      description:
        "We discuss the water source and intended use to determine the appropriate sampling and analysis requirements.",
    },
    {
      title: "Sample Collection & Analysis",
      description:
        "A representative sample is collected and submitted for the relevant physical, chemical, and/or microbiological analysis.",
    },
    {
      title: "Results & Next Steps",
      description:
        "We review the findings with you and explain what they mean for water use, treatment, and the wider borehole system.",
    },
  ],
  benefits: [
    {
      icon: "droplets",
      title: "Know Your Water",
      description: "Replace assumptions about water quality with test results.",
    },
    {
      icon: "gauge",
      title: "Better Decisions",
      description: "Use results to guide treatment and water-system choices.",
    },
    {
      icon: "refresh",
      title: "Investigate Changes",
      description: "Identify possible quality concerns when an existing source changes.",
    },
    {
      icon: "map",
      title: "Use-Specific Testing",
      description: "Focus analysis on the intended residential, agricultural, or commercial use.",
    },
  ],
  faqs: [
    {
      question: "Why should borehole water be tested?",
      answer:
        "Groundwater can contain substances that are not obvious from appearance, taste, or smell. Testing provides evidence about the water quality before you decide how it should be used or treated.",
    },
    {
      question: "What does water quality analysis test for?",
      answer:
        "The parameters depend on the intended use and the concerns being investigated. Analysis can include physical, chemical, and microbiological indicators selected for the project.",
    },
    {
      question: "Should I test a new borehole?",
      answer:
        "Testing a new water source can provide useful information before the water is put into regular household, institutional, agricultural, or commercial use.",
    },
    {
      question: "Can water quality testing tell me what treatment I need?",
      answer:
        "Test results can help identify which water-quality parameters need attention and therefore support a more informed treatment decision. The appropriate treatment depends on the actual results and intended use.",
    },
  ],
  ctaHeading: "Want to know what is in your water?",
  ctaBody:
    "Tell us about your borehole or water source and how you intend to use it. We can help define the appropriate analysis and next steps.",
  next: { slug: "pump-installation", title: "Pump Installation" },
  related: [
    {
      slug: "pumping-tests",
      title: "Pumping Tests",
      reason: "Measure borehole performance alongside water-quality checks.",
    },
    {
      slug: "borehole-rehabilitation",
      title: "Borehole Rehabilitation",
      reason: "Investigate and restore an existing borehole when performance has declined.",
    },
    {
      slug: "pump-installation",
      title: "Pump Installation",
      reason: "Complete the water system after the source and its requirements are understood.",
    },
  ],
};

export const metadata = createServiceMetadata(data);

export default async function Page() {
  const media = await getResolvedMedia(data.mediaKey);
  return <ServiceTemplate data={data} media={media} />;
}
