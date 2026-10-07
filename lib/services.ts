import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";

export const serviceSlugs = [
  "geological-surveys",
  "borehole-drilling",
  "air-lifting-developing",
  "pumping-tests",
  "water-quality-analysis",
  "pump-installation",
  "borehole-rehabilitation",
  "hydro-fracturing",
  "piezometer-drilling",
  "observation-wells",
  "dewatering-wells",
  "horizontal-drain-drilling",
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
