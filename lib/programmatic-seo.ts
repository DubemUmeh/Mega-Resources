import type { MetadataRoute } from "next";
import { absoluteUrl, breadcrumbSchema, siteConfig, CONTENT_LAST_MODIFIED, type BreadcrumbItem, type PageSeo } from "@/lib/seo";

export type PageIntent = "commercial" | "informational" | "transactional" | "trust" | "legal";
export type SchemaKind = "Organization" | "WebSite" | "WebPage" | "Article" | "FAQPage" | "BreadcrumbList" | "LocalBusiness";

export type SeoFaq = { question: string; answer: string };
export type InternalLink = { label: string; href: string; reason: string };
// commeted to test

export type ProgrammaticSeoPage = PageSeo & {
  id: string;
  h1: string;
  intent: PageIntent;
  summary: string;
  keywords: string[];
  schema: SchemaKind[];
  breadcrumbs: BreadcrumbItem[];
  faqs?: SeoFaq[];
  related?: InternalLink[];
  changeFrequency?: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority?: number;
  isProgrammatic?: boolean;
};



export const SERVICE_PAGE_SEO: ProgrammaticSeoPage[] = [
  {
    id: "service-geological-surveys",
    title: "Geological Surveys for Boreholes in Ghana | Mega Resources LTD",
    description: "Geophysical and electrical resistivity surveys to identify promising groundwater targets and recommended borehole drill points in Ghana.",
    path: "/services/geological-surveys",
    h1: "Geological Surveys",
    intent: "commercial",
    summary: "Pre-drilling survey page for property owners who want groundwater investigation before mobilising a drilling rig.",
    keywords: ["geological survey Ghana", "geophysical survey Ghana", "groundwater survey Ghana", "borehole survey Ghana", "best geological survey company Ghana"],
    schema: ["WebPage", "BreadcrumbList"],
    breadcrumbs: [{ name: "Home", path: "/" }, { name: "Services", path: "/services" }, { name: "Geological Surveys", path: "/services/geological-surveys" }],
    priority: 0.8,
  },
  {
    id: "service-borehole-drilling",
    title: "Groundwater, Drilling & Water Services in Ghana | Mega Resources LTD",
    description: "Professional borehole drilling in Ghana, guided by groundwater surveys, site geology, proper casing, development and yield testing.",
    path: "/services/borehole-drilling",
    h1: "Borehole Drilling",
    intent: "commercial",
    summary: "Service page for clients looking for borehole drilling for homes, farms, businesses and institutions across Ghana.",
    keywords: ["borehole drilling Ghana", "borehole drilling company Ghana", "borehole drilling services Ghana", "affordable borehole drilling Ghana", "best borehole drilling company Ghana"],
    schema: ["WebPage", "BreadcrumbList"],
    breadcrumbs: [{ name: "Home", path: "/" }, { name: "Services", path: "/services" }, { name: "Borehole Drilling", path: "/services/borehole-drilling" }],
    priority: 0.9,
  },
  {
    id: "service-air-lifting-developing",
    title: "Borehole Air Lifting & Development in Ghana | Mega Resources LTD",
    description: "Develop drilled boreholes with compressed-air airlifting to remove drilling mud, fines and sediment and prepare the well for testing and pumping.",
    path: "/services/air-lifting-developing",
    h1: "Air Lifting & Borehole Development",
    intent: "commercial",
    summary: "Borehole-development page for clearing drilling debris and preparing a well for accurate testing and pumping.",
    keywords: ["borehole air lifting Ghana", "borehole development Ghana", "airlifting borehole Ghana", "borehole cleaning Ghana", "professional borehole development Ghana"],
    schema: ["WebPage", "BreadcrumbList"],
    breadcrumbs: [{ name: "Home", path: "/" }, { name: "Services", path: "/services" }, { name: "Air Lifting / Developing", path: "/services/air-lifting-developing" }],
    priority: 0.8,
  },
  {
    id: "service-pumping-tests",
    title: "Borehole Pumping Tests in Ghana | Mega Resources LTD",
    description: "Measure borehole response, recovery and sustainable yield with pumping tests used to guide reliable water-system and pump sizing.",
    path: "/services/pumping-tests",
    h1: "Borehole Pumping Tests",
    intent: "commercial",
    summary: "Testing page for establishing the sustainable performance of newly drilled or existing boreholes.",
    keywords: ["borehole pumping test Ghana", "borehole yield test Ghana", "water well pumping test Ghana", "professional pumping tests Ghana", "borehole yield testing Ghana"],
    schema: ["WebPage", "BreadcrumbList"],
    breadcrumbs: [{ name: "Home", path: "/" }, { name: "Services", path: "/services" }, { name: "Pumping Tests", path: "/services/pumping-tests" }],
    priority: 0.8,
  },
  {
    id: "service-water-quality-analysis",
    title: "Water Quality Analysis in Ghana | Mega Resources LTD",
    description: "Water quality analysis in Ghana for boreholes and other groundwater sources, helping households, farms, institutions and businesses understand water quality and treatment needs.",
    path: "/services/water-quality-analysis",
    h1: "Water Quality Analysis",
    intent: "commercial",
    summary: "Service page for clients who want evidence about groundwater quality before drinking, household, agricultural, institutional, or commercial use.",
    keywords: ["water quality analysis Ghana", "borehole water testing Ghana", "water quality testing Ghana", "groundwater testing Ghana", "borehole water analysis Ghana"],
    schema: ["WebPage", "BreadcrumbList"],
    breadcrumbs: [{ name: "Home", path: "/" }, { name: "Services", path: "/services" }, { name: "Water Quality Analysis", path: "/services/water-quality-analysis" }],
    priority: 0.8,
  },
  {
    id: "service-pump-installation",
    title: "Borehole Pump Installation in Ghana | Mega Resources LTD",
    description: "Borehole pump installation in Ghana, including submersible, solar and surface pumps selected from borehole depth, yield and water demand.",
    path: "/services/pump-installation",
    h1: "Borehole Pump Installation",
    intent: "commercial",
    summary: "Service page for clients who need a correctly sized pump installed and commissioned.",
    keywords: ["borehole pump installation Ghana", "water pump installation Ghana", "solar borehole pump Ghana", "professional pump installation Ghana", "affordable pump installation Ghana"],
    schema: ["WebPage", "BreadcrumbList"],
    breadcrumbs: [{ name: "Home", path: "/" }, { name: "Services", path: "/services" }, { name: "Pump Installation", path: "/services/pump-installation" }],
    priority: 0.85,
  },
  {
    id: "service-borehole-rehabilitation",
    title: "Borehole Rehabilitation in Ghana | Mega Resources LTD",
    description: "Restore underperforming boreholes with diagnosis, cleaning, surging, airlifting and redevelopment before considering a replacement well.",
    path: "/services/borehole-rehabilitation",
    h1: "Borehole Rehabilitation",
    intent: "commercial",
    summary: "Service page for owners dealing with reduced borehole yield, sediment or declining performance.",
    keywords: ["borehole rehabilitation Ghana", "borehole repair Ghana", "borehole cleaning Ghana", "affordable borehole rehabilitation Ghana", "professional borehole rehabilitation Ghana"],
    schema: ["WebPage", "BreadcrumbList"],
    breadcrumbs: [{ name: "Home", path: "/" }, { name: "Services", path: "/services" }, { name: "Borehole Rehabilitation", path: "/services/borehole-rehabilitation" }],
    priority: 0.85,
  },
  {
    id: "service-hydro-fracturing",
    title: "Borehole Hydro-Fracturing in Ghana | Mega Resources LTD",
    description: "Hydro-fracturing for suitable low-yield boreholes in Ghana, using controlled water pressure to improve groundwater flow through existing fractures.",
    path: "/services/hydro-fracturing",
    h1: "Borehole Hydro-fracturing",
    intent: "commercial",
    summary: "Service page for suitable low-yield boreholes where groundwater flow through fractured rock is limited.",
    keywords: ["borehole hydro-fracturing Ghana", "hydrofracturing Ghana", "low yield borehole Ghana", "professional hydro-fracturing Ghana", "affordable hydro-fracturing Ghana"],
    schema: ["WebPage", "BreadcrumbList"],
    breadcrumbs: [{ name: "Home", path: "/" }, { name: "Services", path: "/services" }, { name: "Hydro-fracturing", path: "/services/hydro-fracturing" }],
    priority: 0.8,
  },
  {
    id: "service-piezometer-drilling",
    title: "Piezometer Drilling in Ghana | Mega Resources LTD",
    description: "Piezometer drilling and installation in Ghana for groundwater-level and pressure monitoring, hydrogeological investigations, and suitable construction monitoring projects.",
    path: "/services/piezometer-drilling",
    h1: "Piezometer Drilling",
    intent: "commercial",
    summary: "Dedicated service page for groundwater monitoring points used to measure groundwater level or pressure at a defined depth.",
    keywords: ["piezometer drilling Ghana", "piezometer installation Ghana", "groundwater monitoring Ghana", "groundwater level monitoring Ghana"],
    schema: ["WebPage", "BreadcrumbList"],
    breadcrumbs: [{ name: "Home", path: "/" }, { name: "Services", path: "/services" }, { name: "Piezometer Drilling", path: "/services/piezometer-drilling" }],
    priority: 0.85,
  },
  {
    id: "service-observation-wells",
    title: "Observation Well Drilling in Ghana | Mega Resources LTD",
    description: "Observation well drilling and installation in Ghana for groundwater monitoring, site investigations, construction monitoring, and changing groundwater conditions.",
    path: "/services/observation-wells",
    h1: "Observation Wells",
    intent: "commercial",
    summary: "Dedicated groundwater-monitoring well service for repeat observations of groundwater levels and conditions.",
    keywords: ["observation well drilling Ghana", "groundwater observation wells", "groundwater monitoring wells", "observation well drilling Ghana"],
    schema: ["WebPage", "BreadcrumbList"],
    breadcrumbs: [{ name: "Home", path: "/" }, { name: "Services", path: "/services" }, { name: "Observation Wells", path: "/services/observation-wells" }],
    priority: 0.85,
  },
  {
    id: "service-dewatering-wells",
    title: "Dewatering Wells in Ghana | Mega Resources LTD",
    description: "Dewatering wells and groundwater control in Ghana for suitable construction and excavation projects, with site investigation, pumping and monitoring considered together.",
    path: "/services/dewatering-wells",
    h1: "Dewatering Wells",
    intent: "commercial",
    summary: "Groundwater-control service for projects that need groundwater levels lowered or controlled around suitable excavations and construction works.",
    keywords: ["dewatering wells Ghana", "groundwater dewatering Ghana", "dewatering boreholes Ghana", "construction dewatering Ghana"],
    schema: ["WebPage", "BreadcrumbList"],
    breadcrumbs: [{ name: "Home", path: "/" }, { name: "Services", path: "/services" }, { name: "Dewatering Wells", path: "/services/dewatering-wells" }],
    priority: 0.85,
  },
  {
    id: "service-horizontal-drain-drilling",
    title: "Horizontal Drain Drilling in Ghana | Mega Resources LTD",
    description: "Horizontal drain drilling in Ghana for suitable groundwater drainage and relief around slopes, excavations, retaining structures, and other site-specific applications.",
    path: "/services/horizontal-drain-drilling",
    h1: "Horizontal Drain Drilling",
    intent: "commercial",
    summary: "Specialized drilling service for creating horizontal groundwater drainage paths where site geometry makes vertical wells unsuitable.",
    keywords: ["horizontal drain drilling Ghana", "horizontal drainage drilling Ghana", "groundwater drainage Ghana", "horizontal drains Ghana"],
    schema: ["WebPage", "BreadcrumbList"],
    breadcrumbs: [{ name: "Home", path: "/" }, { name: "Services", path: "/services" }, { name: "Horizontal Drain Drilling", path: "/services/horizontal-drain-drilling" }],
    priority: 0.85,
  }
];

export const SERVICE_SEO_LOCATIONS = [
  { city: "Accra", region: "Greater Accra" },
  { city: "Kumasi", region: "Ashanti" },
  { city: "Tamale", region: "Northern" },
  { city: "Sekondi-Takoradi", region: "Western" },
  { city: "Cape Coast", region: "Central" },
  { city: "Tema", region: "Greater Accra" },
  { city: "Sunyani", region: "Bono" },
  { city: "Koforidua", region: "Eastern" },
  { city: "Obuasi", region: "Ashanti" },
  { city: "Ho", region: "Volta" },
  { city: "Wa", region: "Upper West" },
  { city: "Bolgatanga", region: "Upper East" },
  { city: "Techiman", region: "Bono East" },
  { city: "Tarkwa", region: "Western" },
  { city: "Ashaiman", region: "Greater Accra" },
  { city: "Kasoa", region: "Central" },
  { city: "Hohoe", region: "Volta" },
  { city: "Aflao", region: "Volta" },
  { city: "Winneba", region: "Central" },
  { city: "Nkawkaw", region: "Eastern" },
  { city: "Berekum", region: "Bono" },
  { city: "Konongo", region: "Ashanti" },
  { city: "Yendi", region: "Northern" },
  { city: "Navrongo", region: "Upper East" },
  { city: "Swedru", region: "Central" },
] as const;

export const PUBLIC_PAGE_SEO: ProgrammaticSeoPage[] = [
  {
    id: "home",
    title: siteConfig.defaultTitle,
    description: siteConfig.defaultDescription,
    path: "/",
    h1: "Groundwater, drilling and water services in Ghana",
    intent: "commercial",
    summary: "Primary conversion hub for households, farms, institutions, construction projects, and businesses comparing groundwater, drilling and water-service partners in Ghana.",
    keywords: ["groundwater services Ghana", "drilling services Ghana", "borehole drilling Ghana", "Mega Resources LTD"],
    schema: ["Organization", "WebSite", "LocalBusiness"],
    breadcrumbs: [{ name: "Home", path: "/" }],
    related: [
      { label: "Explore services", href: "/services", reason: "Move commercial visitors into service-specific spokes." },
      { label: "Request a quote", href: "/quote", reason: "Capture transactional demand once fit is established." },
    ],
    changeFrequency: "weekly",
    priority: 1,
  },
  {
    id: "services",
    title: "Borehole Drilling Services in Ghana | Mega Resources LTD",
    description: "Explore groundwater investigation, borehole drilling, monitoring wells, piezometers, pumping tests, dewatering, water quality, pump installation, rehabilitation, and specialized drilling services in Ghana.",
    path: "/services",
    h1: "Groundwater, drilling and water services in Ghana",
    intent: "commercial",
    summary: "Service hub page that distributes authority to each specialized water-service spoke while helping visitors choose the right next step.",
    keywords: ["groundwater services Ghana", "borehole services Ghana", "dewatering Ghana", "groundwater monitoring Ghana"],
    schema: ["WebPage", "BreadcrumbList"],
    breadcrumbs: [{ name: "Home", path: "/" }, { name: "Services", path: "/services" }],
    priority: 0.85,
  },
  {
    id: "about",
    title: "About Mega Resources LTD | Groundwater & Drilling Services Ghana",
    description: "Meet Mega Resources LTD, a Ghana groundwater and drilling services company delivering investigation, drilling, monitoring, testing, dewatering, pump installation, and water-system support.",
    path: "/about-us",
    h1: "About Mega Resources LTD",
    intent: "trust",
    summary: "Trust page for users validating expertise, process, and operational credibility before requesting a quote.",
    keywords: ["groundwater services company Ghana", "drilling services Ghana", "Mega Resources LTD about"],
    schema: ["Organization", "WebPage", "BreadcrumbList"],
    breadcrumbs: [{ name: "Home", path: "/" }, { name: "About Us", path: "/about-us" }],
  },
  {
    id: "gallery",
    title: "Borehole Drilling Gallery in Ghana | Mega Resources LTD Projects",
    description: "Browse real Mega Resources LTD borehole and water system projects by region, service, depth, and yield across Ghana.",
    path: "/gallery",
    h1: "Borehole drilling gallery in Ghana",
    intent: "trust",
    summary: "Proof page using completed projects to support service pages without competing with service-intent keywords.",
    keywords: ["borehole projects Ghana", "drilling gallery Ghana"],
    schema: ["WebPage", "BreadcrumbList"],
    breadcrumbs: [{ name: "Home", path: "/" }, { name: "Gallery", path: "/gallery" }],
  },
  {
    id: "reviews",
    title: "Mega Resources LTD Reviews | Borehole Drilling Client Feedback",
    description: "Read approved reviews from Mega Resources LTD clients about borehole drilling, surveys, pump installation, and water-system support in Ghana.",
    path: "/reviews",
    h1: "Mega Resources LTD reviews",
    intent: "trust",
    summary: "Reputation page designed to validate purchase decisions and internally support quote and service pages.",
    keywords: ["Mega Resources reviews", "borehole drilling reviews Ghana"],
    schema: ["WebPage", "BreadcrumbList"],
    breadcrumbs: [{ name: "Home", path: "/" }, { name: "Reviews", path: "/reviews" }],
    changeFrequency: "weekly",
  },
  {
    id: "faq",
    title: "Borehole Drilling FAQs in Ghana | Permits, Costs, Depth & Process",
    description: "Get answers about borehole permits, drilling costs, typical depths, water safety, surveys, timelines, and Mega Resources LTD's process in Ghana.",
    path: "/faq",
    h1: "Borehole drilling FAQs in Ghana",
    intent: "informational",
    summary: "Informational support hub for long-tail questions that reduces thin one-off pages and routes qualified demand back to services.",
    keywords: ["borehole drilling FAQ Ghana", "borehole permits Ghana", "borehole cost Ghana"],
    schema: ["FAQPage", "BreadcrumbList"],
    breadcrumbs: [{ name: "Home", path: "/" }, { name: "FAQ", path: "/faq" }],
    faqs: [
      { question: "Do I need a permit to drill a borehole in Ghana?", answer: "In many cases, groundwater abstraction is regulated and requirements vary by project type and location, so a survey and permit review should happen before drilling." },
      { question: "How deep do boreholes need to be in Ghana?", answer: "Depth depends on local geology, which is why Mega Resources LTD uses a geophysical survey before recommending a drilling depth." },
    ],
  },
  {
    id: "quote",
    title: "Request a Borehole Drilling Quote in Ghana | Mega Resources LTD",
    description: "Request a written borehole drilling or water-system quote from Mega Resources LTD, starting with a site survey and clear project scope.",
    path: "/quote",
    h1: "Request a borehole drilling quote",
    intent: "transactional",
    summary: "Transactional conversion page for users ready to share project details and get a written estimate.",
    keywords: ["borehole drilling quote Ghana", "borehole cost estimate Ghana"],
    schema: ["WebPage", "BreadcrumbList"],
    breadcrumbs: [{ name: "Home", path: "/" }, { name: "Quote", path: "/quote" }],
    priority: 0.8,
  },
  {
    id: "contact",
    title: "Contact Mega Resources LTD | Borehole Drilling Ghana",
    description: "Contact Mega Resources LTD to discuss borehole drilling, geological surveys, pump installation, rehabilitation, and water-system projects in Ghana.",
    path: "/contact",
    h1: "Contact Mega Resources LTD",
    intent: "transactional",
    summary: "Contact endpoint for branded, service, and local conversion journeys.",
    keywords: ["contact borehole drilling company Ghana", "Mega Resources LTD contact"],
    schema: ["LocalBusiness", "BreadcrumbList"],
    breadcrumbs: [{ name: "Home", path: "/" }, { name: "Contact", path: "/contact" }],
  },
  {
    id: "privacy",
    title: "Privacy Policy | Mega Resources LTD",
    description: "Read how Mega Resources LTD collects, uses, and protects personal information submitted through forms, reviews, quote requests, and website visits.",
    path: "/privacy-policy",
    h1: "Privacy Policy",
    intent: "legal",
    summary: "Legal compliance page excluded from commercial keyword targeting to prevent cannibalization.",
    keywords: ["Mega Resources privacy policy"],
    schema: ["WebPage", "BreadcrumbList"],
    breadcrumbs: [{ name: "Home", path: "/" }, { name: "Privacy Policy", path: "/privacy-policy" }],
    priority: 0.3,
  },
  {
    id: "terms",
    title: "Terms of Service | Mega Resources LTD",
    description: "Review the terms for using the Mega Resources LTD website, submitting quote requests, sharing reviews, and engaging borehole services.",
    path: "/terms",
    h1: "Terms of Service",
    intent: "legal",
    summary: "Legal page with brand-focused metadata and no commercial service targeting.",
    keywords: ["Mega Resources terms"],
    schema: ["WebPage", "BreadcrumbList"],
    breadcrumbs: [{ name: "Home", path: "/" }, { name: "Terms", path: "/terms" }],
    priority: 0.3,
  },
];

export function getPageSeo(path: string) {
  return [...PUBLIC_PAGE_SEO, ...SERVICE_PAGE_SEO].find((page) => page.path === path);
}

export function requirePageSeo(path: string) {
  const page = getPageSeo(path);
  if (!page) throw new Error(`Missing SEO config for ${path}`);
  return page;
}

export function createPageSchema(page: ProgrammaticSeoPage) {
  const graph: object[] = [breadcrumbSchema(page.breadcrumbs)];

  if (page.schema.includes("Organization") || page.schema.includes("LocalBusiness")) {
    graph.push({
      "@context": "https://schema.org",
      "@type": page.schema.includes("LocalBusiness") ? "LocalBusiness" : "Organization",
      name: siteConfig.name,
      url: siteConfig.domain,
      image: absoluteUrl(page.image ?? siteConfig.ogImage),
      areaServed: { "@type": "Country", name: "Ghana" },
      sameAs: [],
    });
  }

  if (page.schema.includes("WebSite")) {
    graph.push({
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: siteConfig.name,
      url: siteConfig.domain,
      potentialAction: {
        "@type": "SearchAction",
        target: `${siteConfig.domain}/services?query={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    });
  }

  if (page.schema.includes("FAQPage") && page.faqs?.length) {
    graph.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: page.faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    });
  }

  graph.push({
    "@context": "https://schema.org",
    "@type": page.schema.includes("Article") ? "Article" : "WebPage",
    name: page.h1,
    headline: page.h1,
    description: page.description,
    url: absoluteUrl(page.path),
    isPartOf: { "@type": "WebSite", name: siteConfig.name, url: siteConfig.domain },
    about: page.keywords,
  });

  return graph;
}

// export function publicSitemapEntries(): MetadataRoute.Sitemap {
//   const now = new Date();
//   return [...PUBLIC_PAGE_SEO, ...SERVICE_PAGE_SEO].map((page) => ({
//     url: absoluteUrl(page.path),
//     lastModified: now,
//     changeFrequency: page.changeFrequency ?? "monthly",
//     priority: page.priority ?? 0.75,
//   }));
// }

export function publicSitemapEntries(): MetadataRoute.Sitemap {
  return [...PUBLIC_PAGE_SEO, ...SERVICE_PAGE_SEO].map((page) => ({
    url: absoluteUrl(page.path),
    lastModified: CONTENT_LAST_MODIFIED,
    changeFrequency: page.changeFrequency ?? "monthly",
    priority: page.priority ?? 0.75,
  }));
}
