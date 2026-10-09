import type { MetadataRoute } from "next";
import { absoluteUrl, CONTENT_LAST_MODIFIED } from "@/lib/seo";

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
  {
    slug: "borehole-drilling-company-ghana",
    title: "Borehole Drilling Company in Ghana | Mega Resources LTD",
    description:
      "Borehole drilling, groundwater investigation, testing and pump installation for homes, farms, businesses and institutions across Ghana.",
    h1: "Borehole Drilling Company in Ghana",
    location: "Ghana",
    intent: "local",
    intro:
      "Mega Resources LTD provides borehole drilling and water-system services for residential, agricultural, commercial and institutional projects across Ghana. Every project starts with the site, because groundwater conditions differ between regions and between neighbouring plots.",
    sections: [
      {
        heading: "Borehole services across Ghana",
        paragraphs: [
          "Our work covers the stages of a borehole project: geological investigation, drilling, construction, development, pumping tests and pump installation. Existing boreholes can also be rehabilitated when yield or water quality has declined.",
          "Completed projects are published in our gallery with their location, service, depth and yield so you can see the work before you ask for a quote.",
        ],
        bullets: commonConsiderations,
      },
      {
        heading: "Working in different regions",
        paragraphs: [
          "Geology, access and water demand change from one region to the next, so the drilling method and project scope are set after the site has been assessed rather than copied from a previous job elsewhere.",
        ],
      },
    ],
    faqs: [
      {
        question: "Which parts of Ghana does Mega Resources work in?",
        answer:
          "Mega Resources LTD takes on projects across Ghana. The project gallery lists completed work by region, and a quote request lets us confirm arrangements for your specific location.",
      },
      {
        question: "Can you guarantee water at my site?",
        answer:
          "No contractor can responsibly guarantee a yield before investigating the site. A survey and the drilling results show what the site can provide.",
      },
    ],
    related: [
      { label: "Borehole drilling cost in Ghana", href: "/resources/borehole-drilling-cost-ghana" },
      { label: "Project portfolio", href: "/gallery" },
      { label: "Request a quote", href: "/quote" },
    ],
  },
  {
    slug: "borehole-drilling-cost-ghana",
    title: "Borehole Drilling Cost in Ghana | What Determines the Price?",
    description:
      "The factors that decide borehole drilling cost in Ghana, from geology and depth to casing, testing and pump installation, and how to compare quotations.",
    h1: "Borehole Drilling Cost in Ghana",
    location: "Ghana",
    intent: "pricing",
    intro:
      "There is no single price for a borehole anywhere in Ghana, because the work depends on the site and on what the finished water system must deliver. Knowing what drives cost lets you compare quotations by scope rather than by one headline number.",
    sections: [
      {
        heading: "What drives the cost of a borehole?",
        paragraphs: [
          "Cost follows the work involved: how the site is investigated, how deep and how wide the borehole must be, the casing and screen it needs, how it is developed and tested, and the pump and storage used to deliver the water.",
        ],
        bullets: [
          "Geophysical or groundwater investigation",
          "Drilling depth, diameter and ground conditions",
          "Casing, screens and construction materials",
          "Development and yield testing",
          "Pump, storage and distribution requirements",
          "Site access and distance from the drilling team",
        ],
      },
      {
        heading: "Comparing quotations fairly",
        paragraphs: [
          "Two quotations are only comparable when they cover the same scope. Check whether investigation, testing, casing and pump installation are included or priced separately, and what happens if the first drilling attempt does not meet the requirement.",
        ],
      },
    ],
    faqs: [
      {
        question: "Does borehole cost vary between regions of Ghana?",
        answer:
          "It can. Ground conditions, depth required and distance to the site all differ between locations, which is why a site assessment gives a more reliable estimate than a general price.",
      },
      {
        question: "What should a borehole quotation list?",
        answer:
          "It should itemise investigation, drilling, casing and materials, development and testing, and the pump and water-system work, so you can see exactly what is and is not included.",
      },
    ],
    related: [
      { label: "Affordable borehole drilling in Ghana", href: "/resources/affordable-borehole-drilling-ghana" },
      { label: "Borehole drilling process", href: "/resources/borehole-drilling-process-ghana" },
      { label: "Request a quote", href: "/quote" },
    ],
  },
  {
    slug: "borehole-drilling-companies-accra",
    title: "Borehole Drilling Companies in Accra | How to Choose One",
    description:
      "What to check when hiring a borehole drilling company in Accra: site investigation, construction, testing, pump installation and project evidence.",
    h1: "Borehole Drilling Companies in Accra",
    location: "Accra",
    intent: "local",
    intro:
      "Accra projects range from compact residential plots to estates, hotels and industrial sites, and each has its own space, access and water demand. A good drilling company plans around those limits instead of applying one standard job to every site.",
    sections: [
      {
        heading: "Questions to ask before you hire",
        paragraphs: [
          "Ask how the site will be investigated, what equipment can work within your plot, what testing is included and how the pump will be chosen once the borehole is finished. Ask to see completed projects in comparable settings.",
        ],
        bullets: commonConsiderations,
      },
      {
        heading: "Mega Resources LTD",
        paragraphs: [
          "Mega Resources LTD provides survey, drilling, testing, pump installation and rehabilitation services in Ghana. For an Accra site, the next step is to describe the property, the intended use and the water you need so the scope can be assessed.",
        ],
      },
    ],
    faqs: [
      {
        question: "Can a borehole be drilled on a small urban plot?",
        answer:
          "Often, but it depends on access for the equipment and on the site conditions. An assessment before drilling confirms what is practical on your plot.",
      },
      {
        question: "What should I compare between drilling companies in Accra?",
        answer:
          "Compare the investigation process, the full scope of the quotation, construction materials, testing, pump selection, after-sales support and evidence from completed projects.",
      },
    ],
    related: [
      { label: "Borehole drilling company in Ghana", href: "/resources/borehole-drilling-company-ghana" },
      { label: "Project portfolio", href: "/gallery" },
      { label: "Request a quote", href: "/quote" },
    ],
  },
  {
    slug: "geological-survey-before-borehole-drilling-ghana",
    title: "Geological Survey Before Borehole Drilling in Ghana | Why It Matters",
    description:
      "Why a geological and groundwater survey comes before drilling in Ghana, what it can and cannot tell you, and how it shapes the drilling plan.",
    h1: "Geological Survey Before Borehole Drilling in Ghana",
    location: "Ghana",
    intent: "commercial",
    intro:
      "A survey is the cheapest stage of a borehole project and the one that most improves the odds of a good result. It does not guarantee water, but it replaces guesswork with evidence about where and how to drill.",
    sections: [
      {
        heading: "What a groundwater survey does",
        paragraphs: [
          "A survey studies the ground at and around the site to identify the more promising locations and the likely depth range to target. The findings feed the drilling plan, including the method and the borehole design.",
        ],
        bullets: [
          "Review of the site and surrounding ground conditions",
          "Geophysical measurements where appropriate",
          "Selection of drilling points and target depth range",
          "A basis for planning drilling method and casing",
        ],
      },
      {
        heading: "What a survey cannot do",
        paragraphs: [
          "A survey reduces uncertainty but cannot promise an exact depth or yield. The drilling and the pumping tests that follow are what establish how the borehole actually performs.",
        ],
      },
    ],
    faqs: [
      {
        question: "Do I need a survey if my neighbour already has a borehole?",
        answer:
          "A nearby borehole is useful information, but conditions can change over short distances. A survey of your own plot gives evidence specific to your site.",
      },
      {
        question: "Does the survey guarantee that drilling will find water?",
        answer:
          "No. It improves the chance of choosing a good location and design, but the drilling and testing results determine the final outcome.",
      },
    ],
    related: [
      { label: "Geological surveys", href: "/services/geological-surveys" },
      { label: "Borehole drilling process", href: "/resources/borehole-drilling-process-ghana" },
      { label: "Request a quote", href: "/quote" },
    ],
  },
  {
    slug: "borehole-pump-installation-ghana",
    title: "Borehole Pump Installation in Ghana | Choosing the Right Pump",
    description:
      "How to choose and install a pump for a borehole in Ghana, why pumping-test results come first, and what affects pump sizing.",
    h1: "Borehole Pump Installation in Ghana",
    location: "Ghana",
    intent: "commercial",
    intro:
      "The pump should be chosen after the borehole has been tested, not before it is drilled. Matching the pump to measured performance protects the borehole and avoids paying for equipment the site cannot support.",
    sections: [
      {
        heading: "What decides the right pump",
        paragraphs: [
          "Pump selection uses the results of the pumping test together with how much water you need, where it must go and how it will be stored and distributed.",
        ],
        bullets: [
          "Measured yield from the pumping test",
          "Water level and depth of the borehole",
          "Daily demand and peak demand",
          "Storage tank and distribution layout",
          "Power supply, including solar options where suitable",
        ],
      },
      {
        heading: "Why oversizing causes problems",
        paragraphs: [
          "A pump that draws more than the borehole can supply can run the borehole dry and shorten the life of the equipment. A correctly sized pump works within what the borehole has been shown to deliver.",
        ],
      },
    ],
    faqs: [
      {
        question: "Can I buy a pump before the borehole is drilled?",
        answer:
          "It is better to wait. The pumping test shows what the borehole can supply, and the pump should be selected from that result.",
      },
      {
        question: "Does Mega Resources install pumps on existing boreholes?",
        answer:
          "Pump installation is one of our services. For an existing borehole, the current condition and performance are assessed first so the right pump can be recommended.",
      },
    ],
    related: [
      { label: "Pump installation", href: "/services/pump-installation" },
      { label: "Pumping tests", href: "/services/pumping-tests" },
      { label: "Request a quote", href: "/quote" },
    ],
  },
  {
    slug: "borehole-drilling-permits-ghana",
    title: "Borehole Drilling Licences and Permits in Ghana | What to Check",
    description:
      "What to check about licensing and permits before drilling a borehole in Ghana, and the questions to ask your drilling contractor.",
    h1: "Borehole Drilling Licences and Permits in Ghana",
    location: "Ghana",
    intent: "commercial",
    intro:
      "Drilling and using groundwater in Ghana is regulated, and requirements can differ with the size and purpose of the project. Confirm what applies to you before work starts, and ask your contractor how they handle it.",
    sections: [
      {
        heading: "What to confirm before drilling",
        paragraphs: [
          "Ghana's Water Resources Commission is the body that oversees groundwater and drilling activity. Check its current guidance for the licensing and permit requirements that apply to your project, because rules and fees can change.",
        ],
        bullets: [
          "Whether the drilling contractor is properly licensed",
          "Whether your intended water use needs a permit",
          "Who applies for each approval, you or the contractor",
          "Any approvals needed from the landowner or local authority",
        ],
      },
      {
        heading: "Questions to put to your contractor",
        paragraphs: [
          "Ask which approvals the contractor holds, which are your responsibility, and how permitting affects the project timeline and quotation. Get the answers in writing as part of the scope.",
        ],
      },
    ],
    faqs: [
      {
        question: "Do I need a permit for a small household borehole?",
        answer:
          "Requirements depend on the use and size of the abstraction and can change. Check current guidance with the Water Resources Commission or ask your contractor to confirm in writing.",
      },
      {
        question: "Is permitting included in a drilling quotation?",
        answer:
          "Not always. Ask whether permitting support is included or priced separately so there are no surprises in the final cost.",
      },
    ],
    related: [
      { label: "Borehole drilling cost in Ghana", href: "/resources/borehole-drilling-cost-ghana" },
      { label: "Contact Mega Resources", href: "/contact" },
      { label: "Request a quote", href: "/quote" },
    ],
  },
  {
    slug: "borehole-rehabilitation-ghana",
    title: "Borehole Rehabilitation in Ghana | When and How It Is Done",
    description:
      "Signs that a borehole needs rehabilitation in Ghana, what the work involves and how it compares with drilling a new borehole.",
    h1: "Borehole Rehabilitation in Ghana",
    location: "Ghana",
    intent: "commercial",
    intro:
      "A borehole that yields less water, pumps sand or produces poor-quality water is not always finished. Rehabilitation can restore performance in some cases, and the first step is to find out why it declined.",
    sections: [
      {
        heading: "Signs a borehole may need attention",
        paragraphs: [
          "Common warning signs include falling yield, a changed water level, sand or silt in the water, a change in taste or clarity, and a pump that runs but delivers less than before.",
        ],
        bullets: [
          "Reduced or inconsistent flow",
          "Sand or silt in the water",
          "Noticeable change in water quality",
          "Pump working harder for less water",
        ],
      },
      {
        heading: "How rehabilitation works",
        paragraphs: [
          "The work usually begins with inspection and testing to identify the cause. Depending on the findings, it can include cleaning and redevelopment, repair or replacement of components, and a fresh pumping test to confirm the result.",
        ],
      },
    ],
    faqs: [
      {
        question: "Is rehabilitation cheaper than drilling a new borehole?",
        answer:
          "Often it can be, but it depends on the cause of the problem and the borehole's condition. An inspection shows whether rehabilitation is worthwhile.",
      },
      {
        question: "Will rehabilitation always restore the original yield?",
        answer:
          "Not always. Some causes can be corrected and others cannot, which is why the borehole is tested before and after the work.",
      },
    ],
    related: [
      { label: "Borehole rehabilitation", href: "/services/borehole-rehabilitation" },
      { label: "Water quality analysis", href: "/services/water-quality-analysis" },
      { label: "Request a quote", href: "/quote" },
    ],
  },
];

export function getBoreholeSeoPage(slug: string) {
  return BOREHOLE_SEO_PAGES.find((page) => page.slug === slug);
}

// export function boreholeSeoSitemapEntries(): MetadataRoute.Sitemap {
//   return BOREHOLE_SEO_PAGES.map((page) => ({
//     url: absoluteUrl(`/resources/${page.slug}`),
//     lastModified: new Date(),
//     changeFrequency: "monthly" as const,
//     priority: page.intent === "comparison" ? 0.85 : 0.75,
//   }));
// }

export function boreholeSeoSitemapEntries(): MetadataRoute.Sitemap {
  return BOREHOLE_SEO_PAGES.map((page) => ({
    url: absoluteUrl(`/resources/${page.slug}`),
    lastModified: CONTENT_LAST_MODIFIED,
    changeFrequency: "monthly" as const,
    priority: page.intent === "comparison" ? 0.85 : 0.75,
  }));
}
