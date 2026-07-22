import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Borehole Drilling Services in Ghana | Mega Resources LTD",
  description:
    "Explore Mega Resources LTD services: geological surveys, borehole drilling, pump installation, rehabilitation, hydro-fracturing, pumping tests, and air lifting.",
  path: "/services",
});

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
