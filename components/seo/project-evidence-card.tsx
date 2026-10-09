import Image from "next/image";
import Link from "next/link";
import type { GalleryProject } from "@/lib/location-seo";
export function ProjectEvidenceCard({ project }: { project: GalleryProject }) {
  const facts = [project.depth && `Depth: ${project.depth}`, project.yieldRate && `Yield: ${project.yieldRate}`, project.year].filter(Boolean);
  return <li><Link href={`/gallery/project/${project.slug}`} className="block h-full overflow-hidden rounded-2xl border border-border transition hover:border-blue-600">
    {!project.isVideo && project.img ? <div className="relative aspect-[16/10] w-full bg-muted"><Image src={project.img} alt={`${project.service} project at ${project.location}`} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" /></div> : null}
    <div className="p-5"><p className="text-xs font-semibold uppercase tracking-wider text-blue-600">{project.service} · {project.location}</p>
      <h3 className="mt-2 font-display text-lg font-semibold text-foreground">{project.title}</h3>
      {facts.length ? <p className="mt-2 text-sm text-foreground/70">{facts.join(" · ")}</p> : null}
      <p className="mt-3 line-clamp-3 text-sm leading-7 text-foreground/75">{project.summary}</p>
    </div>
  </Link></li>;
}
