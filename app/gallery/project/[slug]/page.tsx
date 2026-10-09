import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FaArrowLeft, FaArrowRight, FaMapMarkerAlt } from "react-icons/fa";
import { getPublishedPortfolio, getPublishedPortfolioBySlug, getRelatedPortfolioProjects } from "@/db/actions/portfolio";
import { absoluteUrl } from "@/lib/seo";
import ProjectGallery from "../../_components/project-gallery";

// Slugs that aren't pre-rendered at build time are rendered on first request.
export const dynamicParams = true;

export async function generateStaticParams() {
  // The build environment may not have DATABASE_URL (e.g. Cloudflare build vs.
  // runtime secrets). Skip pre-rendering instead of failing the whole build.
  if (!process.env.DATABASE_URL) return [];

  try {
    const projects = await getPublishedPortfolio();
    return projects.map((project) => ({ slug: project.slug }));
  } catch (error) {
    console.warn("generateStaticParams: could not load portfolio projects, skipping pre-render", error);
    return [];
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = await getPublishedPortfolioBySlug(slug);
  if (!project) return {};

  const title = `${project.title} | ${project.service} in ${project.location}`;
  const description = project.summary.slice(0, 155);
  const keywords = [
    project.title,
    `${project.service} ${project.location}`,
    `${project.service} Ghana`,
    `borehole project ${project.location}`,
    "Mega Resources LTD projects",
  ];

  return {
    title,
    description,
    keywords,
    alternates: { canonical: `/gallery/project/${project.slug}` },
    openGraph: {
      title,
      description,
      url: absoluteUrl(`/gallery/project/${project.slug}`),
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
    <main className="w-full bg-background/50">
      <section className="relative overflow-hidden px-5 pb-16 pt-32 md:px-10 md:pb-24 md:pt-40">
        <div className="pointer-events-none absolute inset-0 [background:radial-gradient(circle_at_15%_10%,rgba(37,99,235,0.12),transparent_36%),radial-gradient(circle_at_80%_15%,rgba(255,205,112,0.16),transparent_38%)]" />
        <div className="relative mx-auto grid w-[min(100%,76rem)] gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <Link href="/gallery" className="text-sm font-semibold text-blue-600 underline underline-offset-4 flex items-center gap-1"><FaArrowLeft /> Back to gallery</Link>
            <p className="mt-8 inline-flex rounded-full border border-neutral-200 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-blue-600 shadow-[0_8px_20px_rgba(15,23,42,0.05)]">{project.service}</p>
            <h1 className="mt-5 font-display text-4xl font-semibold leading-tight text-foreground md:text-6xl">{project.title}</h1>
            <p className="mt-5 flex items-center gap-2 text-neutral-100 tracking-wide"><FaMapMarkerAlt className="text-blue-600" /> {project.location}</p>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-foreground/80 tracking-wide">{project.summary}</p>
            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[["Depth", project.depth ?? "N/A"], ["Yield", project.yieldRate ?? "N/A"], ["Duration", project.duration ?? "N/A"], ["Year", project.year ?? "N/A"]].map(([label, value]) => (
                <div key={label} className="rounded-2xl border border-neutral-200 bg-neutral-100 py-2 flex items-center justify-center flex-col">
                  <p className="font-display text-lg font-semibold text-neutral-900">{value === project.duration ? (<>{value} <span className="text-neutral-600 font-sans text-sm">day(s)</span></>) : value}</p>
                  <p className="mt-1 text-xs uppercase tracking-widest text-neutral-600">{label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative aspect-4/3 overflow-hidden rounded-[2rem] border border-neutral-200 shadow-2xl">
            <Image src={project.img} alt={project.title} fill priority className="object-cover" />
          </div>
        </div>
      </section>

      <section className="px-5 py-16 md:px-10">
        <div className="mx-auto w-[min(100%,76rem)]">
          <h2 className="font-display text-3xl font-semibold text-neutral-900">Project gallery</h2>
          <ProjectGallery images={gallery} title={project.title} />
        </div>
      </section>

      {related.length > 0 && (
        <section className="px-5 pb-24 md:px-10">
          <div className="mx-auto w-[min(100%,76rem)]">
            <h2 className="font-display text-3xl font-semibold text-neutral-900">Related {project.service} projects</h2>
            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {related.map((item) => (
                <Link key={item.id} href={`/gallery/project/${item.slug}`} className="group overflow-hidden rounded-3xl border border-neutral-200 bg-neutral-100 shadow-[0_18px_50px_rgba(15,23,42,0.1)] transition-transform duration-300 hover:shadow-[0_25px_60px_rgba(15,23,42,0.15)]">
                  <div className="relative aspect-6/4 overflow-hidden"><Image src={item.img} alt={item.title} fill className="object-cover transition-transform group-hover:scale-105" /></div>
                  <div className="p-5"><p className="text-xs text-neutral-500">{item.location}</p><h3 className="mt-2 font-display text-lg font-semibold text-neutral-900">{item.title}</h3><span className="inline-block mt-3 text-xs font-medium text-blue-600">View project →</span></div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
