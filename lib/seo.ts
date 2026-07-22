import type { Metadata } from "next";
import type { ServiceData } from "@/app/services/_components/service-template";


export const siteConfig = {
  name: "Mega Resources LTD",
  domain: process.env.NEXT_PUBLIC_SITE_URL || "https://megaresourcesltd.com",
  defaultTitle: "Mega Resources LTD | Borehole Drilling & Water Systems Ghana",
  defaultDescription:
    "Mega Resources LTD surveys, drills, tests, installs, and rehabilitates borehole water systems for homes, farms, institutions, and businesses across Ghana.",
  locale: "en_GH",
  twitterHandle: "@megaresourcesltd",
};

export type BreadcrumbItem = { name: string; path: string };
export type PageSeo = {
  title: string;
  description: string;
  path: string;
  image?: string;
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
  image = "/images/home/borehole-drilling.jpeg",
  type = "website",
  noIndex = false,
}: PageSeo): Metadata {
  const url = absoluteUrl(path);
  const imageUrl = absoluteUrl(image);

  return {
    metadataBase: new URL(siteConfig.domain),
    title,
    description,
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

export function createServiceMetadata(service: ServiceData) {
  return createMetadata({
    title: `${service.title.replace(/\s*\/\s*$/, "")} ${service.titleAccent} | ${service.tagline}`,
    description: service.heroDescription,
    path: `/services/${service.slug}`,
    image: service.img,
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
      mainEntity: service.process.map((step) => ({
        "@type": "Question",
        name: step.title,
        acceptedAnswer: { "@type": "Answer", text: step.description },
      })),
    },
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Services", path: "/services" },
      { name, path: `/services/${service.slug}` },
    ]),
  ];
}
