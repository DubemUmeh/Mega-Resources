import { cache } from "react";
import type { MetadataRoute } from "next";
import { getPublishedPortfolio } from "@/db/actions/portfolio";
import { REGIONS } from "@/db/types";
import { SERVICE_PAGE_SEO, SERVICE_SEO_LOCATIONS } from "@/lib/programmatic-seo";
import { absoluteUrl } from "@/lib/seo";
import { slugify } from "@/lib/slug";

export const MIN_CITY_PROJECTS = 1;
export const MIN_SERVICE_CITY_PROJECTS = 1;
export type GalleryProject = Awaited<ReturnType<typeof getPublishedPortfolio>>[number];
export type SeoLocation = { slug: string; label: string; region: string; aliases: string[] };
const CITY_OVERRIDES: Record<string, { label: string; aliases: string[] }> = {
  "Sekondi-Takoradi": { label: "Takoradi", aliases: ["Sekondi-Takoradi", "Takoradi", "Sekondi"] },
};
export const LOCATIONS: SeoLocation[] = SERVICE_SEO_LOCATIONS.map(({ city, region }) => {
  const override = CITY_OVERRIDES[city]; const label = override?.label ?? city;
  return { slug: slugify(label), label, region, aliases: override?.aliases ?? [city] };
});
const SERVICE_NAME_BY_SLUG: Record<string, string> = {
  "geological-surveys": "Geological Surveys", "borehole-drilling": "Borehole Drilling",
  "air-lifting-developing": "Air Lifting / Developing", "pumping-tests": "Pumping Tests",
  "water-quality-analysis": "Water Quality Analysis", "pump-installation": "Pump Installation",
  "borehole-rehabilitation": "Borehole Rehabilitation", "hydro-fracturing": "Hydro-fracturing",
  "piezometer-drilling": "Piezometer Drilling", "observation-wells": "Observation Wells",
  "dewatering-wells": "Dewatering Wells", "horizontal-drain-drilling": "Horizontal Drain Drilling",
};
export type SeoService = { slug: string; name: string; shortTitle: string; description: string };
export const SEO_SERVICES: SeoService[] = SERVICE_PAGE_SEO.filter(p => p.path.startsWith("/services/")).map(p => {
  const slug = p.path.replace("/services/", "");
  return { slug, name: SERVICE_NAME_BY_SLUG[slug] ?? p.h1, shortTitle: p.h1, description: p.description };
});
export function getLocation(slug: string) { return LOCATIONS.find(location => location.slug === slug); }
export function getSeoService(slug: string) { return SEO_SERVICES.find(service => service.slug === slug); }
function escapeRegExp(value: string) { return value.replace(/[.*+?^|[\]\\]/g, "\\$&"); }
function projectMatchesLocation(project: GalleryProject, location: SeoLocation) {
  const regionSelectable = (REGIONS as string[]).includes(location.region);
  if (regionSelectable && project.region !== location.region) return false;
  return location.aliases.some(alias => new RegExp("(?<![A-Za-z])" + escapeRegExp(alias) + "(?![A-Za-z])", "i").test(project.location));
}
const loadProjects = cache(async () => getPublishedPortfolio());
export async function getCityEvidence(location: SeoLocation) {
  const all = await loadProjects();
  const inCity = all.filter(project => projectMatchesLocation(project, location));
  const sameRegion = all.filter(project => project.region === location.region && !inCity.some(cityProject => cityProject.id === project.id));
  return { inCity, sameRegion };
}
export async function getServiceCityProjects(service: SeoService, location: SeoLocation) {
  const { inCity } = await getCityEvidence(location);
  return inCity.filter(project => project.service === service.name);
}
export async function getEligibleCities() {
  const all = await loadProjects();
  return LOCATIONS.map(location => ({ location, projects: all.filter(project => projectMatchesLocation(project, location)) }))
    .filter(entry => entry.projects.length >= MIN_CITY_PROJECTS);
}
export async function getEligiblePairs() {
  const cities = await getEligibleCities();
  return cities.flatMap(({ location, projects }) => SEO_SERVICES.map(service => ({
    service, location, projects: projects.filter(project => project.service === service.name),
  })).filter(entry => entry.projects.length >= MIN_SERVICE_CITY_PROJECTS));
}
function newest(projects: GalleryProject[]) {
  return projects.reduce((latest, project) => project.createdAt > latest ? project.createdAt : latest, projects[0].createdAt);
}
export async function locationSitemapEntries(): Promise<MetadataRoute.Sitemap> {
  const [cities, pairs] = await Promise.all([getEligibleCities(), getEligiblePairs()]);
  return [
    ...cities.map(({ location, projects }) => ({ url: absoluteUrl(`/locations/${location.slug}`), lastModified: newest(projects), changeFrequency: "monthly" as const, priority: 0.75 })),
    ...pairs.map(({ service, location, projects }) => ({ url: absoluteUrl(`/services/${service.slug}/${location.slug}`), lastModified: newest(projects), changeFrequency: "monthly" as const, priority: 0.7 })),
  ];
}
