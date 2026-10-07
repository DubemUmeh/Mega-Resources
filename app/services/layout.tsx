import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Groundwater, Drilling & Water Services in Ghana | Mega Resources LTD",
  description:
    "Explore Mega Resources LTD groundwater and drilling services: geological surveys, borehole drilling, monitoring wells, piezometers, pumping tests, dewatering, water quality, pump installation, rehabilitation, and specialized drilling.",
  path: "/services",
  keywords: [
    "groundwater services Ghana",
    "borehole drilling Ghana",
    "geological surveys Ghana",
    "water services Ghana",
    "borehole services Ghana",
    "dewatering Ghana",
  ],
});

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
