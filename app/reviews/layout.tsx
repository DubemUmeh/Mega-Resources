import type { Metadata } from "next";
import { StructuredData } from "@/components/structured-data";
import { createMetadata } from "@/lib/seo";
import { createPageSchema, requirePageSeo } from "@/lib/programmatic-seo";

const seo = requirePageSeo("/reviews");

export const metadata: Metadata = createMetadata(seo);

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <StructuredData data={createPageSchema(seo)} />
      {children}
    </>
  );
}
