import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/seo";

const serviceSlugs = [
  "borehole-drilling",
  "pump-installation",
  "borehole-rehabilitation",
  "hydro-fracturing",
  "geological-surveys",
  "pumping-tests",
  "air-lifting-developing",
];

const staticRoutes = ["", "about-us", "services", "portfolio", "reviews", "faq", "quote", "contact", "privacy-policy", "terms"];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    ...staticRoutes.map((route) => ({
      url: `${siteConfig.domain}/${route}`,
      lastModified: now,
      changeFrequency: route === "" ? "weekly" as const : "monthly" as const,
      priority: route === "" ? 1 : 0.75,
    })),
    ...serviceSlugs.map((slug) => ({
      url: `${siteConfig.domain}/services/${slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.85,
    })),
  ];
}
