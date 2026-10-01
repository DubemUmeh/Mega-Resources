import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { StructuredData } from "@/components/structured-data";
import {
  absoluteUrl,
  breadcrumbSchema,
  createMetadata,
  siteConfig,
} from "@/lib/seo";
import {
  BOREHOLE_SEO_PAGES,
  getBoreholeSeoPage,
} from "@/lib/borehole-seo";

export const revalidate = 86400;
export const dynamicParams = true;

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return BOREHOLE_SEO_PAGES.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = getBoreholeSeoPage(slug);

  if (!page) return {};

  return createMetadata({
    title: page.title,
    description: page.description,
    path: `/resources/${page.slug}`,
    type: "article",
  });
}

function pageSchema(page: NonNullable<ReturnType<typeof getBoreholeSeoPage>>) {
  const url = absoluteUrl(`/resources/${page.slug}`);
  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Resources", path: "/faq" },
    { name: page.h1, path: `/resources/${page.slug}` },
  ];

  return [
    breadcrumbSchema(breadcrumbs),
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: page.h1,
      description: page.description,
      mainEntityOfPage: url,
      author: {
        "@type": "Organization",
        name: siteConfig.name,
        url: siteConfig.domain,
      },
      publisher: {
        "@type": "Organization",
        name: siteConfig.name,
        url: siteConfig.domain,
      },
      about: {
        "@type": "Service",
        name: "Borehole drilling",
        areaServed: {
          "@type": "Country",
          name: page.location,
        },
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: page.faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    },
  ];
}

export default async function BoreholeSeoPage({ params }: Props) {
  const { slug } = await params;
  const page = getBoreholeSeoPage(slug);

  if (!page) notFound();

  return (
    <main className="min-h-screen bg-background">
      <StructuredData data={pageSchema(page)} />

      <nav
        aria-label="Breadcrumb"
        className="mx-auto w-[min(100%,76rem)] px-5 pt-28 md:px-10 md:pt-36"
      >
        <ol className="flex flex-wrap gap-2 text-sm text-muted-foreground">
          <li><Link href="/" className="hover:text-blue-600">Home</Link></li>
          <li aria-hidden="true">/</li>
          <li><Link href="/faq" className="hover:text-blue-600">Resources</Link></li>
          <li aria-hidden="true">/</li>
          <li className="text-foreground" aria-current="page">{page.h1}</li>
        </ol>
      </nav>

      <article className="mx-auto w-[min(100%,76rem)] px-5 pb-24 pt-10 md:px-10 md:pt-14">
        <header className="max-w-4xl">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-blue-600">
            Mega Resources LTD • {page.location}
          </p>
          <h1 className="mt-5 font-display text-[2.4rem] font-semibold leading-[1.08] tracking-tight text-foreground md:text-[4rem]">
            {page.h1}
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-foreground/75">
            {page.intro}
          </p>
        </header>

        <div className="mt-14 grid gap-10 lg:grid-cols-[minmax(0,1fr)_20rem]">
          <div className="space-y-12">
            {page.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="font-display text-2xl font-semibold text-foreground md:text-3xl">
                  {section.heading}
                </h2>
                <div className="mt-5 space-y-5">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph} className="text-base leading-8 text-foreground/75">
                      {paragraph}
                    </p>
                  ))}
                </div>
                {section.bullets ? (
                  <ul className="mt-6 space-y-3">
                    {section.bullets.map((bullet) => (
                      <li key={bullet} className="flex gap-3 text-base leading-7 text-foreground/75">
                        <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}

            <section>
              <h2 className="font-display text-2xl font-semibold text-foreground md:text-3xl">
                Frequently asked questions
              </h2>
              <div className="mt-6 divide-y divide-border rounded-2xl border border-border">
                {page.faqs.map((faq) => (
                  <details key={faq.question} className="p-5">
                    <summary className="cursor-pointer font-semibold text-foreground">
                      {faq.question}
                    </summary>
                    <p className="mt-3 leading-7 text-muted-foreground">
                      {faq.answer}
                    </p>
                  </details>
                ))}
              </div>
            </section>
          </div>

          <aside className="h-fit rounded-3xl bg-neutral-900 p-6 text-white lg:sticky lg:top-28">
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-300">
              Continue exploring
            </p>
            <div className="mt-5 space-y-3">
              {page.related.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block rounded-xl bg-white/10 p-4 text-sm font-medium transition hover:bg-white/20"
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <Link
              href="/quote"
              className="mt-6 block rounded-xl bg-blue-600 px-5 py-3 text-center font-semibold text-white transition hover:bg-blue-700"
            >
              Request a quote
            </Link>
          </aside>
        </div>
      </article>
    </main>
  );
}
