import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";

export const serviceSlugs = [
  "borehole-drilling",
  "pump-installation",
  "borehole-rehabilitation",
  "hydro-fracturing",
  "geological-surveys",
  "pumping-tests",
  "air-lifting-developing",
] as const;

export type ServiceSlug = (typeof serviceSlugs)[number];

export function serviceSitemapEntries(): MetadataRoute.Sitemap {
  const now = new Date();
  return serviceSlugs.map((slug) => ({
    url: absoluteUrl(`/services/${slug}`),
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.85,
  }));
}
