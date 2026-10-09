import type { Metadata } from "next";
import type { ServiceData } from "@/app/services/_components/service-template";
import { SITE_URL } from "@/lib/site";


export const siteConfig = {
  name: "Mega Resources LTD",
  domain: SITE_URL,
  defaultTitle: "Mega Resources LTD | Groundwater, Drilling & Water Services Ghana",
  defaultDescription:
    "Mega Resources LTD: groundwater surveys, borehole drilling, pumps and water-system services for homes, farms and businesses across Ghana.",
  locale: "en_GH",
  twitterHandle: "@megaresourcesgh",
  ogImage: "https://res.cloudinary.com/dcqwzsq26/image/upload/f_auto,q_auto,_auto/Mega_logo_lcqzt7.jpg",
};

// ADDED: business details used by the LocalBusiness schema.
// Fill in the real social URLs; empty ones are skipped.
export const businessInfo = {
  legalName: "Mega Resources LTD",
  email: "support@megaresourcesgh.com",
  phones: ["+233243287420", "+233245424359"],
  logo: "https://res.cloudinary.com/dcqwzsq26/image/upload/f_jpg,q_auto/Mega_logo_lcqzt7.jpg",
  // Must match your Google Business Profile exactly
  streetAddress: "Kwesimintsim Zongo Junction, Kwame Nkrumah Blvd",
  locality: "Takoradi",
  region: "Western Region",
  // TODO: paste your real profile URLs, e.g. "https://www.facebook.com/yourpage"
  sameAs: [
    "", // Facebook
    "", // Instagram
    "", // LinkedIn
    "", // Google Business Profile / Maps link
  ].filter(Boolean),
};

// Bump this date whenever page content meaningfully changes.
// Used by the sitemap so Google sees real modification dates, not "now".
export const CONTENT_LAST_MODIFIED = new Date("2026-10-08");

export type BreadcrumbItem = { name: string; path: string };
export type PageSeo = {
  title: string;
  description: string;
  path: string;
  image?: string;
  keywords?: string[];
  type?: "website" | "article";
  noIndex?: boolean;
};

export function absoluteUrl(path = "/") {
  if (path.startsWith("http://") || path.startsWith("https://")) {
    const url = new URL(path);
    const canonicalOrigin = new URL(SITE_URL);
    if (url.hostname === "megaresourcesgh.com" || url.hostname === canonicalOrigin.hostname) {
      url.protocol = canonicalOrigin.protocol;
      url.hostname = canonicalOrigin.hostname;
      url.port = canonicalOrigin.port;
    }
    return url.toString();
  }
  return new URL(path, SITE_URL).toString();
}

export function createMetadata({
  title,
  description,
  path,
  image = siteConfig.ogImage,
  keywords = [],
  type = "website",
  noIndex = false,
}: PageSeo): Metadata {
  const url = absoluteUrl(path);
  const imageUrl = absoluteUrl(image);

  return {
    title,
    description,
    keywords: keywords.length ? keywords : undefined,
    alternates: { canonical: path },
    robots: noIndex ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type,
      images: [{ url: imageUrl, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      creator: siteConfig.twitterHandle,
      images: [imageUrl],
    },
  };
}

const SERVICE_METADATA_KEYWORDS: Record<string, string[]> = {
  "geological-surveys": ["geological survey", "geophysical survey", "groundwater survey", "borehole survey", "geological survey company"],
  "borehole-drilling": ["borehole drilling", "borehole drilling company", "borehole drilling services", "affordable borehole drilling", "borehole contractor"],
  "air-lifting-developing": ["borehole air lifting", "borehole development", "airlifting borehole", "borehole cleaning", "borehole development services"],
  "pumping-tests": ["borehole pumping test", "borehole yield test", "water well pumping test", "pumping tests", "borehole yield testing"],
  "water-quality-analysis": ["water quality analysis", "borehole water testing", "water quality testing", "groundwater testing", "borehole water analysis"],
  "pump-installation": ["borehole pump installation", "water pump installation", "solar borehole pump", "pump installation services", "borehole pump contractor"],
  "borehole-rehabilitation": ["borehole rehabilitation", "borehole repair", "borehole cleaning", "borehole restoration", "borehole rehabilitation services"],
  "hydro-fracturing": ["borehole hydro-fracturing", "hydrofracturing", "low yield borehole", "borehole yield improvement", "hydro-fracturing services"],
  "piezometer-drilling": ["piezometer drilling", "piezometer installation", "groundwater monitoring", "groundwater level monitoring", "piezometer services"],
  "observation-wells": ["observation well drilling", "groundwater observation wells", "groundwater monitoring wells", "observation well installation", "groundwater monitoring"],
  "dewatering-wells": ["dewatering wells", "groundwater dewatering", "dewatering boreholes", "construction dewatering", "groundwater control"],
  "horizontal-drain-drilling": ["horizontal drain drilling", "horizontal drainage drilling", "groundwater drainage", "horizontal drains", "drain drilling services"],
};

export function createServiceMetadata(service: ServiceData) {
  const name = `${service.title.replace(/\s*\/\s*$/, "")} ${service.titleAccent}`.trim();

  return createMetadata({
    title: service.seoTitle ?? `${name} | Mega Resources`,
    description: service.seoDescription ?? service.heroDescription,
    path: `/services/${service.slug}`,
    image: service.img,
    keywords: service.seoKeywords,
    type: "article",
  });
}
export function breadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function serviceSchema(service: ServiceData) {
  const name = `${service.title.replace(/\s*\/\s*$/, "")} ${service.titleAccent}`.trim();

  return [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name,
      description: service.heroDescription,
      image: absoluteUrl(service.img),
      // CHANGED: links to the LocalBusiness defined in localBusinessSchema()
      provider: { "@id": `${siteConfig.domain}/#organization` },
      areaServed: { "@type": "Country", name: "Ghana" },
      serviceType: name,
      url: absoluteUrl(`/services/${service.slug}`),
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: `${name} outcomes`,
        itemListElement: service.benefits.map((benefit) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: benefit.title, description: benefit.description },
        })),
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: service.faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    },
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Services", path: "/services" },
      { name, path: `/services/${service.slug}` },
    ]),
  ];
}

const SERVICE_AREA_CITIES = [
  "Accra", "Sekondi-Takoradi", "Kumasi", "Tamale", "Cape Coast", "Tema",
  "Sunyani", "Koforidua", "Obuasi", "Ho", "Wa", "Bolgatanga", "Techiman",
  "Tarkwa", "Ashaiman", "Kasoa", "Hohoe", "Aflao", "Winneba", "Nkawkaw",
  "Berekum", "Konongo", "Yendi", "Navrongo", "Swedru",
];

// CHANGED: full LocalBusiness schema (address fixed to Takoradi, added @id, logo,
// email, phones, opening hours, sameAs, knowsAbout)
export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${siteConfig.domain}/#organization`,
    name: businessInfo.legalName,
    alternateName: ["Mega Resources", "Mega Resources Ghana"],
    description: siteConfig.defaultDescription,
    url: siteConfig.domain,
    logo: businessInfo.logo,
    image: siteConfig.ogImage,
    email: businessInfo.email,
    telephone: businessInfo.phones[0],
    address: {
      "@type": "PostalAddress",
      streetAddress: businessInfo.streetAddress,
      addressLocality: businessInfo.locality,
      addressRegion: businessInfo.region,
      addressCountry: "GH",
    },
    contactPoint: businessInfo.phones.map((telephone) => ({
      "@type": "ContactPoint",
      telephone,
      contactType: "customer service",
      areaServed: "GH",
      availableLanguage: ["English"],
    })),
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "17:00",
      },
    ],
    areaServed: [
      ...SERVICE_AREA_CITIES.map((name) => ({ "@type": "City", name })),
      { "@type": "Country", name: "Ghana" },
    ],
    knowsAbout: [
      "borehole drilling",
      "geological and geophysical surveys",
      "groundwater investigation",
      "pump installation",
      "borehole rehabilitation",
      "hydro-fracturing",
      "dewatering wells",
      "water quality analysis",
    ],
    ...(businessInfo.sameAs.length ? { sameAs: businessInfo.sameAs } : {}),
  };
}

// ADDED
export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.domain}/#website`,
    url: siteConfig.domain,
    name: siteConfig.name,
    publisher: { "@id": `${siteConfig.domain}/#organization` },
    inLanguage: "en-GH",
  };
}
