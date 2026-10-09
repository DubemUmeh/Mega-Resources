import type { Metadata } from "next";
import Link from "next/link";
import { StructuredData } from "@/components/structured-data";
import { breadcrumbSchema, createMetadata } from "@/lib/seo";
import { BOREHOLE_SEO_PAGES } from "@/lib/borehole-seo";

export const revalidate = 86400;
export const metadata: Metadata = createMetadata({
  title: "Borehole Drilling Guides for Ghana | Mega Resources LTD",
  description: "Practical guides on choosing a borehole drilling company, drilling costs and the drilling process in Takoradi, Kumasi and across Ghana.",
  path: "/resources",
});
const crumbs = [{ name: "Home", path: "/" }, { name: "Resources", path: "/resources" }];

export default function ResourcesIndexPage() {
  return <main className="min-h-screen bg-background">
    <StructuredData data={[breadcrumbSchema(crumbs)]} />
    <nav aria-label="Breadcrumb" className="mx-auto w-[min(100%,76rem)] px-5 pt-28 md:px-10 md:pt-36">
      <ol className="flex flex-wrap gap-2 text-sm text-muted-foreground">
        <li><Link href="/" className="hover:text-blue-600">Home</Link></li><li aria-hidden="true">/</li>
        <li className="text-foreground" aria-current="page">Resources</li>
      </ol>
    </nav>
    <section className="mx-auto w-[min(100%,76rem)] px-5 pb-24 pt-10 md:px-10 md:pt-14">
      <header className="max-w-4xl">
        <p className="text-sm font-semibold uppercase tracking-[0.14em] text-blue-600">Mega Resources LTD</p>
        <h1 className="mt-5 font-display text-[2.4rem] font-semibold leading-[1.08] tracking-tight text-foreground md:text-[4rem]">Borehole drilling guides for Ghana</h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-foreground/75">Straight answers on choosing a driller, what affects cost and how a borehole project runs from survey to water supply.</p>
      </header>
      <ul className="mt-14 grid gap-6 md:grid-cols-2">
        {BOREHOLE_SEO_PAGES.map(page => <li key={page.slug}><Link href={`/resources/${page.slug}`} className="block h-full rounded-2xl border border-border p-6 transition hover:border-blue-600">
          <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">{page.location}</p>
          <h2 className="mt-3 font-display text-xl font-semibold text-foreground">{page.h1}</h2>
          <p className="mt-3 text-sm leading-7 text-foreground/75">{page.description}</p>
        </Link></li>)}
      </ul>
    </section>
  </main>;
}
