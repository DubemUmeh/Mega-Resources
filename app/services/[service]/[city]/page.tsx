import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { StructuredData } from "@/components/structured-data";
import { BreadcrumbNav } from "@/components/seo/breadcrumb-nav";
import { ProjectEvidenceCard } from "@/components/seo/project-evidence-card";
import { breadcrumbSchema, createMetadata, siteConfig } from "@/lib/seo";
import { MIN_SERVICE_CITY_PROJECTS, getLocation, getSeoService, getServiceCityProjects } from "@/lib/location-seo";
export const revalidate = 3600;
export const dynamicParams = true;
type Props = { params: Promise<{ service: string; city: string }> };
export function generateStaticParams() { return []; }
export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {service:serviceSlug,city} = await params; const service=getSeoService(serviceSlug); const location=getLocation(city);
  if (!service || !location) return {}; const projects=await getServiceCityProjects(service,location);
  if (projects.length < MIN_SERVICE_CITY_PROJECTS) return {};
  return createMetadata({title:`${service.shortTitle} in ${location.label} | Mega Resources`,
    description:`${service.shortTitle} in ${location.label}, ${location.region}: ${projects.length} completed ${projects.length === 1 ? "project" : "projects"} by Mega Resources LTD with recorded depths and yields. Request a quote.`,
    path:`/services/${service.slug}/${location.slug}`,keywords:[`${service.shortTitle.toLowerCase()} ${location.label}`,`${service.name.toLowerCase()} in ${location.label}`]});
}
export default async function ServiceCityPage({params}: Props) {
  const {service:serviceSlug,city}=await params; const service=getSeoService(serviceSlug); const location=getLocation(city);
  if (!service || !location) notFound(); const projects=await getServiceCityProjects(service,location);
  if (projects.length < MIN_SERVICE_CITY_PROJECTS) notFound();
  const path=`/services/${service.slug}/${location.slug}`;
  const crumbs=[{name:"Home",path:"/"},{name:"Services",path:"/services"},{name:service.shortTitle,path:`/services/${service.slug}`},{name:location.label,path}];
  const schema=[breadcrumbSchema(crumbs),{"@context":"https://schema.org","@type":"Service",name:`${service.shortTitle} in ${location.label}`,serviceType:service.shortTitle,description:service.description,provider:{"@id":`${siteConfig.domain}/#organization`},areaServed:{"@type":"City",name:location.label},url:`${siteConfig.domain}${path}`}];
  return <main className="min-h-screen bg-background"><StructuredData data={schema}/><BreadcrumbNav items={crumbs}/>
    <article className="mx-auto w-[min(100%,76rem)] px-5 pb-24 pt-10 md:px-10 md:pt-14">
      <header className="max-w-4xl"><p className="text-sm font-semibold uppercase tracking-[0.14em] text-blue-600">Mega Resources LTD • {location.label}, {location.region}</p>
        <h1 className="mt-5 font-display text-[2.4rem] font-semibold leading-[1.08] tracking-tight text-foreground md:text-[4rem]">{service.shortTitle} in {location.label}</h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-foreground/75">{service.description}</p></header>
      <section className="mt-14"><h2 className="font-display text-2xl font-semibold text-foreground md:text-3xl">Completed in {location.label}</h2><ul className="mt-6 grid gap-6 md:grid-cols-3">{projects.map(project=><ProjectEvidenceCard key={project.id} project={project}/>)}</ul></section>
      <div className="mt-14 flex flex-wrap gap-4"><Link href="/quote" className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700">Request a quote</Link><Link href={`/services/${service.slug}`} className="rounded-xl border border-border px-6 py-3 font-semibold text-foreground">About {service.shortTitle.toLowerCase()}</Link><Link href={`/locations/${location.slug}`} className="rounded-xl border border-border px-6 py-3 font-semibold text-foreground">All services in {location.label}</Link></div>
    </article></main>;
}
