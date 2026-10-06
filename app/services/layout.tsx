import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Borehole Drilling Services in Ghana | Mega Resources LTD",
  description:
    "Explore Mega Resources LTD services: geological surveys, borehole drilling, air lifting, pumping tests, water quality analysis, pump installation, rehabilitation, and hydro-fracturing.",
  path: "/services",
});

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
