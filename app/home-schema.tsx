import { StructuredData } from "@/components/structured-data";
import { createPageSchema, requirePageSeo } from "@/lib/programmatic-seo";

const seo = requirePageSeo("/");

export default function HomeSchema() {
  return <StructuredData data={createPageSchema(seo)} />;
}
