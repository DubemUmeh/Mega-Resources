import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FaArrowRight, FaMapMarkerAlt } from "react-icons/fa";
import { getPublishedPortfolio, getPublishedPortfolioBySlug, getRelatedPortfolioProjects } from "@/db/actions/portfolio";
import { absoluteUrl } from "@/lib/seo";

export async function generateStaticParams() {
  const projects = await getPublishedPortfolio();
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = await getPublishedPortfolioBySlug(slug);
  if (!project) return {};

  const title = `${project.title} | ${project.service} in ${project.location}`;
  const description = project.summary.slice(0, 155);

  return {
    title,
    description,
    alternates: { canonical: absoluteUrl(`/portfolio/project/${project.slug}`) },
    openGraph: {
      title,
      description,
      url: absoluteUrl(`/portfolio/project/${project.slug}`),
      images: [{ url: project.img || "/icons/android-chrome-512x512.png", width: 1200, height: 630, alt: project.title }],
    },
  };
}

export default async function PortfolioProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getPublishedPortfolioBySlug(slug);
  if (!project) notFound();
  const related = await getRelatedPortfolioProjects(project);
  const gallery = project.gallery?.length ? project.gallery : [project.img];

  return (
    <main className="bg-background text-foreground">
      <section className="relative overflow-hidden px-5 pb-16 pt-32 md:px-10 md:pb-24 md:pt-40">
        <div className="pointer-events-none absolute inset-0 [background:radial-gradient(circle_at_15%_10%,rgba(37,99,235,0.18),transparent_36%),radial-gradient(circle_at_80%_15%,rgba(255,205,112,0.14),transparent_38%)]" />
        <div className="relative mx-auto grid w-[min(100%,76rem)] gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <Link href="/portfolio" className="text-sm font-semibold text-blue-500 underline underline-offset-4">← Back to portfolio</Link>
            <p className="mt-8 inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-blue-300">{project.service}</p>
            <h1 className="mt-5 font-display text-4xl font-semibold leading-tight md:text-6xl">{project.title}</h1>
            <p className="mt-5 flex items-center gap-2 text-muted-foreground"><FaMapMarkerAlt className="text-blue-500" /> {project.location}</p>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">{project.summary}</p>
            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[["Depth", project.depth ?? "N/A"], ["Yield", project.yieldRate ?? "N/A"], ["Duration", project.duration ?? "N/A"], ["Year", project.year ?? "N/A"]].map(([label, value]) => (
                <div key={label} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="font-display text-lg font-semibold">{value}</p>
                  <p className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">{label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative aspect-4/3 overflow-hidden rounded-[2rem] border border-white/10 shadow-2xl">
            <Image src={project.img} alt={project.title} fill priority className="object-cover" />
          </div>
        </div>
      </section>

      <section className="px-5 py-16 md:px-10">
        <div className="mx-auto w-[min(100%,76rem)]">
          <h2 className="font-display text-3xl font-semibold">Project gallery</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {gallery.map((src, index) => (
              <div key={`${src}-${index}`} className="relative aspect-4/3 overflow-hidden rounded-3xl border border-white/10 bg-white/5">
                <Image src={src} alt={`${project.title} photo ${index + 1}`} fill className="object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="px-5 pb-24 md:px-10">
          <div className="mx-auto w-[min(100%,76rem)]">
            <h2 className="font-display text-3xl font-semibold">Related {project.service} projects</h2>
            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {related.map((item) => (
                <Link key={item.id} href={`/portfolio/project/${item.slug}`} className="group overflow-hidden rounded-3xl border border-white/10 bg-white/5">
                  <div className="relative aspect-6/4 overflow-hidden"><Image src={item.img} alt={item.title} fill className="object-cover transition-transform group-hover:scale-105" /></div>
                  <div className="p-5"><p className="text-xs text-muted-foreground">{item.location}</p><h3 className="mt-2 font-display text-lg font-semibold">{item.title}</h3><span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-blue-500">View project <FaArrowRight className="-rotate-45 text-xs" /></span></div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
