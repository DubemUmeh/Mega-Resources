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
      { label: "Depth", value: "300ft" },
      { label: "Tank", value: "5,000L" },
      { label: "Result", value: "Zero water bills" },
    ],
  },
];

const Projects = () => {
  return (
    <section className="px-8 lg:px-24 py-24 border-b border-gray-800">
      <div className="text-[10px] uppercase tracking-widest text-gray-500 mb-16">Our Projects</div>

      <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 mb-12">
        <div className="lg:w-1/4 flex flex-col justify-between">
          <h2 className="text-3xl md:text-4xl font-light leading-tight text-gray-200 mb-8">
            Delivering<br />
            Impact Across<br />
            Ghana
          </h2>
          <div className="flex items-center gap-3 text-xs font-medium cursor-pointer group w-fit text-gray-400 hover:text-white transition-colors">
            Explore our project portfolio
            <FaArrowRight className="transform -rotate-45" />
          </div>
        </div>

        <div className="lg:w-3/4 grid grid-cols-1 md:grid-cols-3 gap-0.5">
          {projects.map((p, idx) => (
            <div key={idx} className="relative group cursor-pointer overflow-hidden h-100 md:h-125">
              <img src={p.img} className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-105 group-hover:opacity-40 transition-all duration-700" alt={p.title} />
              <div className="absolute inset-0 bg-linear-to-t from-dark via-dark/50 to-transparent"></div>

              <div className="absolute bottom-6 left-6 right-6">
                <h4 className="text-[11px] font-semibold text-white tracking-wide mb-1 uppercase">{p.title}</h4>
                <p className="text-[10px] text-gray-400 font-light mb-4">{p.location}</p>

                <div className="flex gap-4 opacity-0 group-hover:opacity-100 max-h-0 group-hover:max-h-20 transition-all duration-500 overflow-hidden">
                  {p.meta.map((m) => (
                    <div key={m.label} className="flex flex-col">
                      <span className="text-[8px] uppercase tracking-widest text-gray-500">{m.label}</span>
                      <span className="text-[11px] text-gray-200 font-light">{m.value}</span>
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