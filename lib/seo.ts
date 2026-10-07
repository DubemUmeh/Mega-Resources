import type { Metadata } from "next";
import type { ServiceData } from "@/app/services/_components/service-template";


export const siteConfig = {
  name: "Mega Resources LTD",
  domain: "https://www.megaresourcesgh.com",
  defaultTitle: "Mega Resources LTD | Groundwater, Drilling & Water Services Ghana",
  defaultDescription:
    "Mega Resources LTD provides groundwater investigation, drilling, monitoring, testing, dewatering, pump and water-system services for homes, farms, institutions, construction projects, and businesses across Ghana.",
  locale: "en_GH",
  twitterHandle: "@megaresourcesltd",
  ogImage: "https://res.cloudinary.com/dcqwzsq26/image/upload/f_webp,q_auto/Mega_logo_lcqzt7.jpg",
};

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
  if (path.startsWith("http")) return path;
  return new URL(path, siteConfig.domain).toString();
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
    metadataBase: new URL(siteConfig.domain),
    title,
    description,
    keywords: keywords.length ? keywords : undefined,
    alternates: { canonical: url },
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
  "geological-surveys": ["geological survey Ghana", "geophysical survey Ghana", "groundwater survey Ghana", "borehole survey Ghana", "geological survey company Ghana"],
  "borehole-drilling": ["borehole drilling Ghana", "borehole drilling company Ghana", "borehole drilling services Ghana", "affordable borehole drilling Ghana", "borehole contractor Ghana"],
  "air-lifting-developing": ["borehole air lifting Ghana", "borehole development Ghana", "airlifting borehole Ghana", "borehole cleaning Ghana", "borehole development services Ghana"],
  "pumping-tests": ["borehole pumping test Ghana", "borehole yield test Ghana", "water well pumping test Ghana", "pumping tests Ghana", "borehole yield testing Ghana"],
  "water-quality-analysis": ["water quality analysis Ghana", "borehole water testing Ghana", "water quality testing Ghana", "groundwater testing Ghana", "borehole water analysis Ghana"],
  "pump-installation": ["borehole pump installation Ghana", "water pump installation Ghana", "solar borehole pump Ghana", "pump installation services Ghana", "borehole pump contractor Ghana"],
  "borehole-rehabilitation": ["borehole rehabilitation Ghana", "borehole repair Ghana", "borehole cleaning Ghana", "borehole restoration Ghana", "borehole rehabilitation services Ghana"],
  "hydro-fracturing": ["borehole hydro-fracturing Ghana", "hydrofracturing Ghana", "low yield borehole Ghana", "borehole yield improvement Ghana", "hydro-fracturing services Ghana"],
  "piezometer-drilling": ["piezometer drilling Ghana", "piezometer installation Ghana", "groundwater monitoring Ghana", "groundwater level monitoring Ghana", "piezometer services Ghana"],
  "observation-wells": ["observation well drilling Ghana", "groundwater observation wells", "groundwater monitoring wells", "observation well installation Ghana", "groundwater monitoring Ghana"],
  "dewatering-wells": ["dewatering wells Ghana", "groundwater dewatering Ghana", "dewatering boreholes Ghana", "construction dewatering Ghana", "groundwater control Ghana"],
  "horizontal-drain-drilling": ["horizontal drain drilling Ghana", "horizontal drainage drilling Ghana", "groundwater drainage Ghana", "horizontal drains Ghana", "drain drilling services Ghana"],
};

export function createServiceMetadata(service: ServiceData) {
  const serviceName = `${service.title.replace(/\\s*\\/\\s*$/, "")} ${service.titleAccent}`.trim();
  const keywords = SERVICE_METADATA_KEYWORDS[service.slug] ?? [
    serviceName,
    `${service.slug.replace(/-/g, " ")} Ghana`,
    `${service.slug.replace(/-/g, " ")} services Ghana`,
    "water services Ghana",
    "Mega Resources LTD",
  ];

  return createMetadata({
    title: `${service.title.replace(/\\s*\\/\\s*$/, "")} ${service.titleAccent} | ${service.tagline}`,
    description: service.heroDescription,
    path: `/services/${service.slug}`,
    image: service.img,
    keywords,
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
      provider: { "@type": "Organization", name: siteConfig.name, url: siteConfig.domain },
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
