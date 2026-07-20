export interface ServiceSummary {
  num: string;
  slug: string;
  title: string;
  desc: string;
  img: string;
  icon: "droplets" | "wrench" | "refresh" | "layers" | "map" | "gauge" | "wind";
}

export const servicesIndex: ServiceSummary[] = [
  {
    num: "01",
    slug: "borehole-drilling",
    title: "Borehole Drilling",
    desc: "100ft–400ft depth. Geophysical survey, drilling, and PVC casing to prevent collapse.",
    img: "/images/home/borehole-drilling.jpeg",
    icon: "map",
  },
  {
    num: "02",
    slug: "pump-installation",
    title: "Pump Installation",
    desc: "Submersible, solar, and surface pumps — fully installed and wired.",
    img: "/images/home/pump-installation.png",
    icon: "wrench",
  },
  {
    num: "03",
    slug: "borehole-rehabilitation",
    title: "Borehole Rehabilitation",
    desc: "Low yield or muddy water? We clean and re-develop old boreholes.",
    img: "/images/home/borehole-rehabilitation.png",
    icon: "refresh",
  },
  {
    num: "04",
    slug: "hydro-fracturing",
    title: "Hydro-fracturing",
    desc: "Fracture low-yield rock formations to unlock higher water flow.",
    img: "/images/home/hydro-fracturing.png",
    icon: "layers",
  },
  {
    num: "05",
    slug: "geological-surveys",
    title: "Geological Surveys",
    desc: "We confirm water depth and volume on your land before we drill.",
    img: "/images/home/geological-surveys.png",
    icon: "map",
  },
  {
    num: "06",
    slug: "pumping-tests",
    title: "Pumping Tests",
    desc: "Measure sustainable yield so your pump is sized correctly.",
    img: "/images/home/pumping-tests.png",
    icon: "gauge",
  },
  {
    num: "07",
    slug: "air-lifting-developing",
    title: "Air Lifting / Developing",
    desc: "Clear drilling debris and develop the borehole for maximum flow.",
    img: "/images/home/air-lifting.png",
    icon: "wind",
  },
];