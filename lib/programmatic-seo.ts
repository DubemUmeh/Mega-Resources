import type { MetadataRoute } from "next";
import { absoluteUrl, breadcrumbSchema, siteConfig, type BreadcrumbItem, type PageSeo } from "@/lib/seo";

export type PageIntent = "commercial" | "informational" | "transactional" | "trust" | "legal";
export type SchemaKind = "Organization" | "WebSite" | "WebPage" | "Article" | "FAQPage" | "BreadcrumbList" | "LocalBusiness";

export type SeoFaq = { question: string; answer: string };
export type InternalLink = { label: string; href: string; reason: string };

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

export const PUBLIC_PAGE_SEO: ProgrammaticSeoPage[] = [
  {
    id: "home",
    title: siteConfig.defaultTitle,
    description: siteConfig.defaultDescription,
    path: "/",
    h1: "Borehole drilling and water systems in Ghana",
    intent: "commercial",
    summary: "Primary conversion hub for households, farms, institutions, and businesses comparing borehole drilling and water-system partners in Ghana.",
    keywords: ["borehole drilling Ghana", "water systems Ghana", "Mega Resources LTD"],
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
    description: "Explore geological surveys, borehole drilling, pump installation, rehabilitation, hydro-fracturing, pumping tests, and air lifting services in Ghana.",
    path: "/services",
    h1: "Borehole drilling services in Ghana",
    intent: "commercial",
    summary: "Service hub page that distributes authority to each specialized water-service spoke while helping visitors choose the right next step.",
    keywords: ["borehole services Ghana", "pump installation Ghana", "geological surveys Ghana"],
    schema: ["WebPage", "BreadcrumbList"],
    breadcrumbs: [{ name: "Home", path: "/" }, { name: "Services", path: "/services" }],
    priority: 0.85,
  },
  {
    id: "about",
    title: "About Mega Resources LTD | Borehole Drilling Experts in Ghana",
    description: "Meet Mega Resources LTD, a Ghana water solutions company delivering surveys, borehole drilling, pump installation, testing, and long-term support.",
    path: "/about-us",
    h1: "About Mega Resources LTD",
    intent: "trust",
    summary: "Trust page for users validating expertise, process, and operational credibility before requesting a quote.",
    keywords: ["borehole drilling company Ghana", "Mega Resources LTD about"],
    schema: ["Organization", "WebPage", "BreadcrumbList"],
    breadcrumbs: [{ name: "Home", path: "/" }, { name: "About Us", path: "/about-us" }],
  },
  {
    id: "portfolio",
    title: "Borehole Drilling Portfolio in Ghana | Mega Resources LTD Projects",
    description: "Browse real Mega Resources LTD borehole and water system projects by region, service, depth, and yield across Ghana.",
    path: "/portfolio",
    h1: "Borehole drilling portfolio in Ghana",
    intent: "trust",
    summary: "Proof page using completed projects to support service pages without competing with service-intent keywords.",
    keywords: ["borehole projects Ghana", "drilling portfolio Ghana"],
    schema: ["WebPage", "BreadcrumbList"],
    breadcrumbs: [{ name: "Home", path: "/" }, { name: "Portfolio", path: "/portfolio" }],
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
  return PUBLIC_PAGE_SEO.find((page) => page.path === path);
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
      image: absoluteUrl(page.image ?? "/images/home/borehole-drilling.jpeg"),
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

export function publicSitemapEntries(): MetadataRoute.Sitemap {
  const now = new Date();
  return PUBLIC_PAGE_SEO.map((page) => ({
    url: absoluteUrl(page.path),
    lastModified: now,
    changeFrequency: page.changeFrequency ?? "monthly",
    priority: page.priority ?? 0.75,
  }));
}
