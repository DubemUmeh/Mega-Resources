export interface ServiceSummary {
  num: string;
  slug: string;
  title: string;
  desc: string;
  img: string;
  icon: "droplets" | "wrench" | "refresh" | "layers" | "map" | "gauge" | "wind" | "flask";
}

export const servicesIndex: ServiceSummary[] = [
  {
    num: "01",
    slug: "geological-surveys",
    title: "Geological Surveys",
    desc: "We confirm water depth and volume on your land before we drill.",
    img: "/images/home/geological-surveys.png",
    icon: "map",
  },
  {
    num: "02",
    slug: "borehole-drilling",
    title: "Borehole Drilling",
    desc: "100ft–350ft+ depth. Geophysical survey, drilling, and PVC casing to prevent collapse.",
    img: "/images/home/borehole-drilling.jpeg",
    icon: "map",
  },
  {
    num: "03",
    slug: "air-lifting-developing",
    title: "Air Lifting / Developing",
    desc: "Clear drilling debris and develop the borehole for maximum flow.",
    img: "/images/home/air-lifting.png",
    icon: "wind",
  },
  {
    num: "04",
    slug: "pumping-tests",
    title: "Pumping Tests",
    desc: "Measure sustainable yield so your pump is sized correctly.",
    img: "/images/home/pumping-tests.png",
    icon: "gauge",
  },
  {
    num: "05",
    slug: "water-quality-analysis",
    title: "Water Quality Analysis",
    desc: "Analyse water quality to guide safe use, treatment, and system decisions.",
    img: "/images/home/water-quality-analysis.svg",
    icon: "droplets",
  },
  {
    num: "06",
    slug: "pump-installation",
    title: "Pump Installation",
    desc: "Submersible, solar, and surface pumps — fully installed and wired.",
    img: "/images/home/pump-installation.png",
    icon: "wrench",
  },
  {
    num: "07",
    slug: "borehole-rehabilitation",
    title: "Borehole Rehabilitation",
    desc: "Low yield or muddy water? We clean and re-develop old boreholes.",
    img: "/images/home/borehole-rehabilitation.png",
    icon: "refresh",
  },
  {
    num: "08",
    slug: "hydro-fracturing",
    title: "Hydro-fracturing",
    desc: "Fracture low-yield rock formations to unlock higher water flow.",
    img: "/images/home/hydro-fracturing.png",
    icon: "layers",
  },
  {
    num: "09",
    slug: "piezometer-drilling",
    title: "Piezometer Drilling",
    desc: "Install dedicated monitoring points for groundwater level and pressure observations.",
    img: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1600&q=85",
    icon: "gauge",
  },
  {
    num: "10",
    slug: "observation-wells",
    title: "Observation Wells",
    desc: "Monitor groundwater levels and changing subsurface conditions over time.",
    img: "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?auto=format&fit=crop&w=1600&q=85",
    icon: "droplets",
  },
  {
    num: "11",
    slug: "dewatering-wells",
    title: "Dewatering Wells",
    desc: "Control groundwater around suitable excavations and construction works.",
    img: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1600&q=85",
    icon: "gauge",
  },
  {
    num: "12",
    slug: "horizontal-drain-drilling",
    title: "Horizontal Drain Drilling",
    desc: "Create groundwater drainage paths for suitable slopes, excavations and structures.",
    img: "https://images.unsplash.com/photo-1513828583688-c52646db42da?auto=format&fit=crop&w=1600&q=85",
    icon: "wind",
  },
];
