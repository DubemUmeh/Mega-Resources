import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/seo";

export type BoreholeSeoFaq = {
  question: string;
  answer: string;
};

export type BoreholeSeoPage = {
  slug: string;
  title: string;
  description: string;
  h1: string;
  location: string;
  intent: "commercial" | "comparison" | "pricing" | "local";
  intro: string;
  sections: Array<{
    heading: string;
    paragraphs: string[];
    bullets?: string[];
  }>;
  faqs: BoreholeSeoFaq[];
  related: Array<{ label: string; href: string }>;
};

const commonConsiderations = [
  "Groundwater investigation before drilling",
  "Appropriate drilling method and equipment",
  "Quality casing and borehole construction materials",
  "Pumping and yield testing after drilling",
  "Pump selection based on measured site conditions",
];

export const BOREHOLE_SEO_PAGES: BoreholeSeoPage[] = [
  {
    slug: "best-borehole-drilling-company-takoradi",
    title: "Best Borehole Drilling Company in Takoradi | Mega Resources",
    description:
      "What to consider when choosing a borehole drilling company in Takoradi, including surveys, drilling, testing, pump installation and project support.",
    h1: "Best Borehole Drilling Company in Takoradi",
    location: "Takoradi",
    intent: "comparison",
    intro:
      "Choosing the right borehole drilling company in Takoradi is less about a slogan and more about how the company investigates the site, drills, constructs the borehole, tests its yield and supports the finished water system. Mega Resources LTD provides these services as an end-to-end water solution.",
    sections: [
      {
        heading: "What makes a borehole drilling company a good choice?",
        paragraphs: [
          "A reliable drilling project starts before the rig arrives. Ground conditions vary from one site to another, so a contractor should investigate the site and use the findings to plan the drilling work rather than promise a fixed depth or yield in advance.",
          "The finished borehole should also be tested so the pump and water system can be selected from measured project data.",
        ],
        bullets: commonConsiderations,
      },
      {
        heading: "Why consider Mega Resources LTD?",
        paragraphs: [
          "Mega Resources LTD provides geological investigation, borehole drilling, pumping tests, pump installation, rehabilitation and related water-system services. This gives clients a single team to coordinate the major stages of a borehole project.",
          "The company's portfolio also provides a way to evaluate completed work rather than relying only on advertising claims.",
        ],
      },
    ],
    faqs: [
      {
        question: "How much does borehole drilling cost in Takoradi?",
        answer:
          "There is no single price for every site. Cost depends on factors such as geology, drilling depth, casing requirements, testing and the pump or water system required. A site assessment allows the project scope to be estimated more accurately.",
      },
      {
        question: "How deep should a borehole be in Takoradi?",
        answer:
          "Depth depends on local geology and the target aquifer. A geophysical investigation can help identify suitable drilling targets before drilling begins.",
      },
    ],
    related: [
      { label: "Borehole drilling services", href: "/services" },
      { label: "Borehole drilling portfolio", href: "/gallery" },
      { label: "Request a quote", href: "/quote" },
    ],
  },
  {
    slug: "borehole-drilling-company-takoradi",
    title: "Borehole Drilling Company in Takoradi | Mega Resources LTD",
    description:
      "Explore borehole drilling, groundwater investigation, testing and pump installation services for homes, farms, businesses and institutions in Takoradi.",
    h1: "Borehole Drilling Company in Takoradi",
    location: "Takoradi",
    intent: "local",
    intro:
      "Mega Resources LTD provides borehole drilling and water-system services for residential, agricultural, commercial and institutional projects in Takoradi and surrounding areas.",
    sections: [
      {
        heading: "Borehole drilling in Takoradi",
        paragraphs: [
          "Every drilling site has its own geological conditions. Our process can include site investigation, drilling, borehole construction, air lifting, pumping tests and pump installation depending on the project requirements.",
        ],
        bullets: commonConsiderations,
      },
      {
        heading: "Who can use a borehole water system?",
        paragraphs: [
          "Boreholes can support homes, estates, farms, hotels, offices, schools, hospitals, industrial facilities and other properties where a dependable groundwater source is suitable.",
        ],
      },
    ],
    faqs: [
      {
        question: "Does Mega Resources drill boreholes in Takoradi?",
        answer:
          "Yes. Mega Resources LTD markets borehole drilling and related water-system services for projects in Takoradi and across Ghana.",
      },
      {
        question: "Can Mega Resources install the borehole pump?",
        answer:
          "Pump installation is part of the company's water-system services, with pump selection based on the requirements and measured performance of the borehole.",
      },
    ],
    related: [
      { label: "Best borehole drilling company in Takoradi", href: "/resources/best-borehole-drilling-company-takoradi" },
      { label: "Borehole drilling portfolio", href: "/gallery" },
      { label: "Contact Mega Resources", href: "/contact" },
    ],
  },
  {
    slug: "borehole-drilling-cost-takoradi",
    title: "Borehole Drilling Cost in Takoradi | What Determines the Price?",
    description:
      "Understand the factors that affect borehole drilling cost in Takoradi, from geology and depth to casing, testing and pump installation.",
    h1: "Borehole Drilling Cost in Takoradi",
    location: "Takoradi",
    intent: "pricing",
    intro:
      "Borehole drilling does not have a universal flat price because the work required depends on the site. Understanding the cost drivers helps you compare quotations on scope rather than comparing one headline number.",
    sections: [
      {
        heading: "What affects borehole drilling cost?",
        paragraphs: [
          "The main cost drivers can include the geological conditions encountered, required drilling depth, diameter, casing and screen requirements, development and testing, and the equipment needed to deliver water from the finished borehole.",
        ],
        bullets: [
          "Geophysical or groundwater investigation",
          "Drilling depth and diameter",
          "Casing and construction materials",
          "Borehole development and yield testing",
          "Pump, storage and distribution requirements",
        ],
      },
      {
        heading: "Why a site assessment matters",
        paragraphs: [
          "A quotation prepared without understanding the site can leave important work outside the original scope. Mega Resources LTD can assess the project requirements before recommending the drilling and water-system work needed.",
        ],
      },
    ],
    faqs: [
      {
        question: "Can I get a fixed borehole drilling price before a survey?",
        answer:
          "A meaningful project price depends on the scope and site conditions. A survey or assessment can reduce uncertainty before drilling work is priced.",
      },
      {
        question: "Does the drilling price include the water pump?",
        answer:
          "Not necessarily. Pump requirements depend on the completed borehole and the intended water system, so drilling, testing and pump installation should be clearly itemised in a quotation.",
      },
    ],
    related: [
      { label: "Borehole drilling in Takoradi", href: "/resources/borehole-drilling-company-takoradi" },
      { label: "Request a quote", href: "/quote" },
      { label: "Our services", href: "/services" },
    ],
  },
  {
    slug: "borehole-drilling-companies-kumasi",
    title: "Borehole Drilling Companies in Kumasi | How to Choose One",
    description:
      "A practical guide to evaluating borehole drilling companies in Kumasi, including site investigation, drilling, testing and pump installation.",
    h1: "Borehole Drilling Companies in Kumasi",
    location: "Kumasi",
    intent: "local",
    intro:
      "When comparing borehole drilling companies in Kumasi, look beyond the advertised drilling price. The quality of site investigation, borehole construction, testing and water-system design affects the result you get from the project.",
    sections: [
      {
        heading: "Questions to ask before hiring a drilling company",
        paragraphs: [
          "Ask how the company investigates the site, how it handles unsuccessful drilling conditions, what testing is included, what materials are used and how the pump will be selected after the borehole is completed.",
        ],
        bullets: commonConsiderations,
      },
      {
        heading: "Mega Resources LTD",
        paragraphs: [
          "Mega Resources LTD provides borehole and water-system services across Ghana. If your project is in Kumasi, the appropriate next step is to discuss the site, intended use and required water supply so the scope can be assessed.",
        ],
      },
    ],
    faqs: [
      {
        question: "What should I compare between borehole drilling companies?",
        answer:
          "Compare the investigation process, drilling scope, construction materials, testing, pump selection, after-sales support and the evidence the contractor can provide from completed projects.",
      },
      {
        question: "Can borehole drilling companies guarantee water?",
        answer:
          "No contractor can responsibly guarantee an exact water yield before investigating a site. Groundwater conditions vary, and the survey and drilling results determine what the site can provide.",
      },
    ],
    related: [
      { label: "Borehole drilling services", href: "/services" },
      { label: "Project portfolio", href: "/gallery" },
      { label: "Request a quote", href: "/quote" },
    ],
  },
  {
    slug: "best-borehole-drilling-company-ghana",
    title: "Best Borehole Drilling Company in Ghana | What to Look For",
    description:
      "Learn how to evaluate a borehole drilling company in Ghana using site investigation, drilling quality, testing, equipment and water-system support.",
    h1: "Best Borehole Drilling Company in Ghana",
    location: "Ghana",
    intent: "comparison",
    intro:
      "There is no universal ranking that makes one drilling company the right choice for every Ghanaian site. The useful comparison is whether a contractor has the process, equipment, experience and project evidence needed for your particular water requirement.",
    sections: [
      {
        heading: "How to evaluate a drilling company",
        paragraphs: [
          "Start with the site rather than the advertised depth or price. A competent contractor should be able to explain how groundwater is investigated, how drilling is planned, how the borehole is constructed and how yield is tested.",
        ],
        bullets: [
          "Groundwater investigation and site assessment",
          "Appropriate drilling equipment",
          "Borehole construction and casing",
          "Development and pumping tests",
          "Pump installation and water-system support",
          "Evidence from completed projects",
        ],
      },
      {
        heading: "Mega Resources LTD",
        paragraphs: [
          "Mega Resources LTD offers a complete set of borehole and water-system services, from investigation and drilling through testing, pump installation and rehabilitation. Clients can also review the company's project portfolio when assessing whether its experience matches their requirements.",
        ],
      },
    ],
    faqs: [
      {
        question: "What should I look for in a borehole drilling company in Ghana?",
        answer:
          "Look at the company's investigation process, drilling capability, construction standards, testing procedures, equipment, project experience and support after drilling.",
      },
      {
        question: "Is the cheapest borehole drilling company always the best option?",
        answer:
          "Not necessarily. A lower initial quotation may exclude testing, casing, pump installation or other required work. Compare the complete scope and expected deliverables rather than price alone.",
      },
    ],
    related: [
      { label: "Mega Resources services", href: "/services" },
      { label: "Our drilling projects", href: "/gallery" },
      { label: "Request a Ghana project quote", href: "/quote" },
    ],
  },
  {
    slug: "affordable-borehole-drilling-ghana",
    title: "Affordable Borehole Drilling in Ghana | Cost Factors & Planning",
    description:
      "Learn how to plan an affordable borehole drilling project in Ghana without cutting essential investigation, testing or construction work.",
    h1: "Affordable Borehole Drilling in Ghana",
    location: "Ghana",
    intent: "pricing",
    intro:
      "Affordable borehole drilling should mean controlling unnecessary project costs while keeping the investigation, construction and testing needed for a reliable water source. The cheapest initial quote is not necessarily the lowest total project cost.",
    sections: [
      {
        heading: "Where you can control project cost",
        paragraphs: [
          "Start with the actual water requirement. A household, farm, hotel and industrial facility do not need identical systems. Defining the required yield and end use helps prevent oversizing equipment or paying for unnecessary infrastructure.",
        ],
        bullets: [
          "Define the intended water use",
          "Investigate the site before drilling",
          "Compare complete quotations",
          "Use measured yield data for pump selection",
          "Plan storage and distribution around actual demand",
        ],
      },
      {
        heading: "Avoid false savings",
        paragraphs: [
          "Skipping site investigation or borehole testing can create expensive problems later. A properly scoped project should make clear what is included in drilling, construction, testing and pump installation.",
        ],
      },
    ],
    faqs: [
      {
        question: "How can I reduce borehole drilling costs?",
        answer:
          "Define the required water use, compare complete scopes, investigate the site before drilling and size the pump and supporting system from actual project requirements.",
      },
      {
        question: "Does affordable mean low quality?",
        answer:
          "It should not. A cost-conscious project can still use appropriate investigation, construction materials and testing. The goal is to avoid unnecessary work and unexpected costs.",
      },
    ],
    related: [
      { label: "Borehole drilling cost factors", href: "/resources/borehole-drilling-cost-takoradi" },
      { label: "Services", href: "/services" },
      { label: "Get a quote", href: "/quote" },
    ],
  },
  {
    slug: "borehole-drilling-process-ghana",
    title: "Borehole Drilling Process in Ghana | From Survey to Water Supply",
    description:
      "Understand the typical borehole drilling process in Ghana, from groundwater investigation and drilling to testing and pump installation.",
    h1: "Borehole Drilling Process in Ghana",
    location: "Ghana",
    intent: "commercial",
    intro:
      "A borehole project is a sequence of investigation, drilling, construction, development, testing and water-system installation. Understanding those stages makes it easier to compare contractors and project quotations.",
    sections: [
      {
        heading: "Typical stages of a borehole project",
        paragraphs: [
          "The exact workflow varies with the site and project, but a complete project commonly starts with groundwater investigation, proceeds to drilling and borehole construction, and then uses development and pumping tests to establish performance before the final water system is selected.",
        ],
        bullets: [
          "Site and groundwater investigation",
          "Drilling to the selected target",
          "Casing and borehole construction",
          "Air lifting or development",
          "Pumping and yield testing",
          "Pump installation and commissioning",
        ],
      },
      {
        heading: "Why the sequence matters",
        paragraphs: [
          "Each stage produces information used by the next. For example, pump selection should follow the measured performance of the completed borehole rather than being chosen from assumptions made before drilling.",
        ],
      },
    ],
    faqs: [
      {
        question: "How long does borehole drilling take?",
        answer:
          "The timeline varies with geology, depth, site access, drilling conditions and the scope of the water system. A contractor can provide a more useful timeline after assessing the project.",
      },
      {
        question: "Why is pumping testing performed?",
        answer:
          "Pumping tests help establish how the completed borehole performs and provide information used when designing the pump and water system.",
      },
    ],
    related: [
      { label: "Our services", href: "/services" },
      { label: "Project portfolio", href: "/gallery" },
      { label: "Request a quote", href: "/quote" },
    ],
  },
];

export function getBoreholeSeoPage(slug: string) {
  return BOREHOLE_SEO_PAGES.find((page) => page.slug === slug);
}

export function boreholeSeoSitemapEntries(): MetadataRoute.Sitemap {
  return BOREHOLE_SEO_PAGES.map((page) => ({
    url: `${siteConfig.domain}/resources/${page.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: page.intent === "comparison" ? 0.85 : 0.75,
  }));
}
