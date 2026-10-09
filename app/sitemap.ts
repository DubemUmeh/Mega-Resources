import type { MetadataRoute } from "next";
import { publicSitemapEntries } from "@/lib/programmatic-seo";
import { boreholeSeoSitemapEntries } from "@/lib/borehole-seo";
import { getPublishedPortfolio } from "@/db/actions/portfolio";
import { absoluteUrl, CONTENT_LAST_MODIFIED } from "@/lib/seo";
import { locationSitemapEntries } from "@/lib/location-seo";
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [projects, locationEntries] = await Promise.all([getPublishedPortfolio(), locationSitemapEntries()]);
  return [
    ...publicSitemapEntries(),
    { url: absoluteUrl("/resources"), lastModified: CONTENT_LAST_MODIFIED, changeFrequency: "monthly" as const, priority: 0.75 },
    ...boreholeSeoSitemapEntries(),
    { url: absoluteUrl("/locations"), lastModified: CONTENT_LAST_MODIFIED, changeFrequency: "weekly" as const, priority: 0.75 },
    ...locationEntries,
    ...projects.map(project => ({ url: absoluteUrl(`/gallery/project/${project.slug}`), lastModified: project.createdAt, changeFrequency: "monthly" as const, priority: project.featured ? 0.8 : 0.7 })),
  ];
}
