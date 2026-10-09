import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { StructuredData } from "@/components/structured-data";
import { BreadcrumbNav } from "@/components/seo/breadcrumb-nav";
import { ProjectEvidenceCard } from "@/components/seo/project-evidence-card";
import { breadcrumbSchema, createMetadata } from "@/lib/seo";
import { MIN_CITY_PROJECTS, SEO_SERVICES, getCityEvidence, getLocation } from "@/lib/location-seo";
export const revalidate = 3600;
export const dynamicParams = true;
type Props = { params: Promise<{ city: string }> };
export function generateStaticParams() { return []; }
export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {city} = await params; const location = getLocation(city); if (!location) return {};
  const {inCity} = await getCityEvidence(location); if (inCity.length < MIN_CITY_PROJECTS) return {};
  return createMetadata({title: `Borehole Drilling & Groundwater Services in ${location.label} | Mega Resources`,
    description: `Mega Resources LTD has completed ${inCity.length} published ${inCity.length === 1 ? "project" : "projects"} in ${location.label}, ${location.region}. See depths, yields and request a quote.`,
    path: `/locations/${location.slug}`, keywords: [`borehole drilling ${location.label}`, `borehole drilling company ${location.label}`, `groundwater services ${location.label}`]});
}
export default async function LocationPage({params}: Props) {
  const {city} = await params; const location = getLocation(city); if (!location) notFound();
  const {inCity, sameRegion} = await getCityEvidence(location); if (inCity.length < MIN_CITY_PROJECTS) notFound();
  const crumbs = [{name:"Home",path:"/"},{name:"Areas we serve",path:"/locations"},{name:location.label,path:`/locations/${location.slug}`}];
  const servicesDone = new Set(inCity.map(p => p.service));
  return <main className="min-h-screen bg-background"><StructuredData data={[breadcrumbSchema(crumbs)]}/><BreadcrumbNav items={crumbs}/>
    <article className="mx-auto w-[min(100%,76rem)] px-5 pb-24 pt-10 md:px-10 md:pt-14">
      <header className="max-w-4xl"><p className="text-sm font-semibold uppercase tracking-[0.14em] text-blue-600">Mega Resources LTD • {location.region}</p>
        <h1 className="mt-5 font-display text-[2.4rem] font-semibold leading-[1.08] tracking-tight text-foreground md:text-[4rem]">Borehole drilling and groundwater services in {location.label}</h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-foreground/75">Below are {inCity.length === 1 ? "the published project" : `the ${inCity.length} published projects`} Mega Resources LTD has completed in {location.label}, with the depth and yield recorded for each. Groundwater conditions vary from site to site, so every new project starts with a survey.</p>
      </header>
      <section className="mt-14"><h2 className="font-display text-2xl font-semibold text-foreground md:text-3xl">Projects in {location.label}</h2><ul className="mt-6 grid gap-6 md:grid-cols-3">{inCity.map(project => <ProjectEvidenceCard key={project.id} project={project}/>)}</ul></section>
      <section className="mt-14"><h2 className="font-display text-2xl font-semibold text-foreground md:text-3xl">Our services</h2><ul className="mt-6 grid gap-3 md:grid-cols-2">{SEO_SERVICES.map(service => {const done=servicesDone.has(service.name); return <li key={service.slug}><Link href={done ? `/services/${service.slug}/${location.slug}` : `/services/${service.slug}`} className="block rounded-xl border border-border p-4 transition hover:border-blue-600"><span className="font-semibold text-foreground">{service.shortTitle}</span>{done ? <span className="ml-2 text-sm text-blue-600">Done in {location.label}</span> : null}</Link></li>;})}</ul></section>
      {sameRegion.length ? <section className="mt-14"><h2 className="font-display text-2xl font-semibold text-foreground md:text-3xl">More projects in {location.region} Region</h2><ul className="mt-6 grid gap-6 md:grid-cols-3">{sameRegion.slice(0,3).map(project => <ProjectEvidenceCard key={project.id} project={project}/>)}</ul></section> : null}
      <div className="mt-14 flex flex-wrap gap-4"><Link href="/quote" className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700">Request a quote for {location.label}</Link><Link href="/gallery" className="rounded-xl border border-border px-6 py-3 font-semibold text-foreground">View the full gallery</Link></div>
    </article></main>;
}
