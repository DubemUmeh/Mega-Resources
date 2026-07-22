import type { MetadataRoute } from "next";
import { publicSitemapEntries } from "@/lib/programmatic-seo";
import { serviceSitemapEntries } from "@/lib/services";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...publicSitemapEntries(),
    ...serviceSitemapEntries(),
  ];
}
