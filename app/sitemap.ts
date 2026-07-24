import type { MetadataRoute } from "next";
import { publicSitemapEntries } from "@/lib/programmatic-seo";
import { serviceSitemapEntries } from "@/lib/services";
import { getPublishedPortfolio } from "@/db/actions/portfolio";
import { absoluteUrl } from "@/lib/seo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await getPublishedPortfolio();

  return [
    ...publicSitemapEntries(),
    ...serviceSitemapEntries(),
    ...projects.map((project) => ({
      url: absoluteUrl(`/portfolio/project/${project.slug}`),
      lastModified: project.createdAt,
      changeFrequency: "monthly" as const,
      priority: project.featured ? 0.8 : 0.7,
    })),
  ];
}
