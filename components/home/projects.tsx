import Image from "next/image";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

const projects = [
  {
    title: "Community Borehole Project",
    location: "Asante Akim North, Ashanti Region",
    img: "/images/home/community-project.jpeg",
    meta: [
      { label: "Depth", value: "220ft" },
      { label: "Duration", value: "3 Days" },
      { label: "Yield", value: "35 GPM" },
    ],
  },
  {
    title: "School Borehole Project",
    location: "Tamale, Northern Region",
    img: "/images/home/school-project.jpeg",
    meta: [
      { label: "System", value: "Solar" },
      { label: "Output", value: "5,000L/day" },
      { label: "Duration", value: "10 Days" },
    ],
  },
  {
    title: "Industrial Borehole Project",
    location: "Takoradi, Western Region",
    img: "/images/home/industrial-project.jpeg",
    meta: [
      { label: "Depth", value: "300ft+" },
      { label: "Tank", value: "5,000L" },
      { label: "Result", value: "Zero water bills" },
    ],
  },
];

const Projects = () => {
  return (
    <section className="px-8 lg:px-24 py-10 md:py-20 border-b border-neutral-200 bg-background/30">
      <div className="inline-flex items-center gap-[0.45rem] tracking-wider rounded-full border border-neutral-200 bg-white px-[0.8rem] py-[0.45rem] text-[0.85rem] font-semibold uppercase text-neutral-600 shadow-[0_8px_20px_rgba(15,23,42,0.05)] mb-16">Our Projects</div>

      <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 mb-12">
        <div className="lg:w-1/4 flex flex-col justify-between">
          <h2 className="font-display text-3xl md:text-4xl font-semibold leading-tight text-foreground mb-8">
            Delivering<br />
            Impact Across<br />
            Ghana
          </h2>
          <Link href='/gallery' className="w-full">
            <div className="flex items-center gap-3 text-sm md:text-lg underline underline-offset-4 decoration-blue-600 decoration-2 font-medium cursor-pointer group w-fit text-foreground hover:text-blue-600 transition-colors">
              Explore our project gallery
              <FaArrowRight className="transform -rotate-45" />
            </div>
          </Link>
        </div>

        <div className="lg:w-3/4 grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-0.5">
          {projects.map((p, idx) => (
            <div key={idx} className="relative group cursor-pointer overflow-hidden h-60 md:h-125 rounded-2xl">
              <Image width={1000} height={1000} src={p.img} className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-105 group-hover:opacity-40 transition-all duration-700" alt={p.title} />
              <div className="absolute inset-0 bg-linear-to-t from-black via-black/50 to-transparent"></div>

              <div className="absolute bottom-6 left-6 right-6">
                <h4 className="text-sm font-semibold text-white tracking-wider mb-1 uppercase">{p.title}</h4>
                <p className="text-xs text-white/70 font-light tracking-wide mb-4">{p.location}</p>

                <div className="flex gap-4 opacity-0 group-hover:opacity-100 max-h-0 group-hover:max-h-20 transition-all duration-500 overflow-hidden">
                  {p.meta.map((m) => (
                    <div key={m.label} className="flex flex-col">
                      <span className="text-[8px] uppercase tracking-widest text-neutral-300">{m.label}</span>
                      <span className="text-[11px] text-neutral-100 font-light">{m.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="absolute top-6 right-6 w-8 h-8 rounded-full border border-white/20 flex items-center justify-center bg-black/30 backdrop-blur-sm text-white/70">
                <FaArrowRight className="transform -rotate-45 text-[10px]" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;