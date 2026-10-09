import type { Metadata } from "next";
import Link from "next/link";
import { StructuredData } from "@/components/structured-data";
import { BreadcrumbNav } from "@/components/seo/breadcrumb-nav";
import { breadcrumbSchema, createMetadata } from "@/lib/seo";
import { getEligibleCities } from "@/lib/location-seo";
export const revalidate = 3600;
export const metadata: Metadata = createMetadata({ title: "Areas We Serve | Borehole Drilling Across Ghana | Mega Resources", description: "Cities and regions in Ghana where Mega Resources LTD has completed borehole drilling and groundwater projects, with project details for each.", path: "/locations" });
const crumbs = [{ name: "Home", path: "/" }, { name: "Areas we serve", path: "/locations" }];
export default async function LocationsIndexPage() {
  const cities = await getEligibleCities();
  return <main className="min-h-screen bg-background"><StructuredData data={[breadcrumbSchema(crumbs)]} /><BreadcrumbNav items={crumbs} />
    <section className="mx-auto w-[min(100%,76rem)] px-5 pb-24 pt-10 md:px-10 md:pt-14">
      <h1 className="font-display text-[2.4rem] font-semibold leading-[1.08] tracking-tight text-foreground md:text-[4rem]">Areas we serve</h1>
      <p className="mt-6 max-w-3xl text-lg leading-8 text-foreground/75">Cities where we have completed and published projects. Each page lists the work, depths and yields recorded on site.</p>
      {cities.length ? <ul className="mt-12 grid gap-4 md:grid-cols-3">{cities.map(({location, projects}) => <li key={location.slug}><Link href={`/locations/${location.slug}`} className="block rounded-2xl border border-border p-5 transition hover:border-blue-600">
        <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">{location.region}</p><p className="mt-2 font-display text-xl font-semibold text-foreground">{location.label}</p>
        <p className="mt-1 text-sm text-foreground/70">{projects.length} published {projects.length === 1 ? "project" : "projects"}</p>
      </Link></li>)}</ul> : <p className="mt-12 text-foreground/75">Project pages will appear here as projects are published.</p>}
    </section></main>;
}
