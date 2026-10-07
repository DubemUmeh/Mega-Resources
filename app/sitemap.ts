import type { MetadataRoute } from "next";
import { publicSitemapEntries } from "@/lib/programmatic-seo";
import { boreholeSeoSitemapEntries } from "@/lib/borehole-seo";
import { getPublishedPortfolio } from "@/db/actions/portfolio";
import { absoluteUrl } from "@/lib/seo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await getPublishedPortfolio();

  return [
    ...publicSitemapEntries(),
    ...boreholeSeoSitemapEntries(),
    ...projects.map((project) => ({
      url: absoluteUrl(`/gallery/project/${project.slug}`),
      lastModified: project.createdAt,
      changeFrequency: "monthly" as const,
      priority: project.featured ? 0.8 : 0.7,
    })),
  ];
}
