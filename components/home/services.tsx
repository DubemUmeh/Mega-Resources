import Image from "next/image";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

const services = [
  {
    num: "01",
    title: "Borehole\nDrilling",
    desc: "100ft–350ft+ depth. Geophysical survey, drilling, and PVC casing to prevent collapse.",
    img: "/images/home/borehole-drilling.jpeg",
  },
  {
    num: "02",
    title: "Pump\nInstallation",
    desc: "Submersible, solar, and surface pumps — fully installed and wired.",
    img: "/images/home/pump-installation.png",
  },
  {
    num: "03",
    title: "Borehole\nRehabilitation",
    desc: "Low yield or muddy water? We clean and re-develop old boreholes.",
    img: "/images/home/borehole-rehabilitation.png",
  },
  {
    num: "04",
    title: "Hydro-\nfracturing",
    desc: "Fracture low-yield rock formations to unlock higher water flow.",
    img: "/images/home/hydro-fracturing.png",
  },
  {
    num: "05",
    title: "Geological\nSurveys",
    desc: "We confirm water depth and volume on your land before we drill.",
    img: "/images/home/geological-surveys.png",
  },
  {
    num: "06",
    title: "Pumping\nTests",
    desc: "Measure sustainable yield so your pump is sized correctly.",
    img: "/images/home/pumping-tests.png",
  },
  {
    num: "07",
    title: "Air Lifting /\nDeveloping",
    desc: "Clear drilling debris and develop the borehole for maximum flow.",
    img: "/images/home/air-lifting.png",
  },
  {
    num: "08",
    title: "Water Quality\nAnalysis",
    desc: "Test groundwater quality to identify treatment needs and support safer water use.",
    img: "/images/home/water-quality-analysis.svg",
  },
];

const Services = () => {
  return (
    <section className="px-8 lg:px-24 py-10 md:py-20 overflow-hidden bg-background/30 text-foreground">
      <div className="inline-flex items-center gap-[0.45rem] tracking-wider rounded-full border border-neutral-200 bg-white px-[0.8rem] py-[0.45rem] text-[0.85rem] font-semibold uppercase text-neutral-600 shadow-[0_8px_20px_rgba(15,23,42,0.05)] mb-16">Our Services</div>

      <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
        <div className="lg:w-1/4 flex flex-row md:flex-col justify-between">
          <div>
            <div className="text-6xl md:text-7xl font-light mb-6 text-foreground">08</div>
            <div className="text-sm md:text-lg text-foreground/70 leading-relaxed font-light">
              Specialized Services.<br />
              Complete Water<br />
              Solutions.
            </div>
          </div>
          <Link href='/services' className="mt-12 w-16 h-16 rounded-full border border-neutral-200 bg-blue-600/10 hover:bg-blue-600 hover:border-blue-600 flex items-center justify-center transition-colors cursor-pointer text-blue-600 hover:text-white">
            <FaArrowRight className="transform -rotate-45" />
          </Link>
        </div>

        <div className="lg:w-3/4 relative">
          <div className="flex overflow-hidden group">
            <div 
              className="flex gap-4 animate-marquee group-hover:pause-marquee"
              style={{
                animation: 'marquee 40s linear infinite'
              }}
            >
              {[...services, ...services].map((svc, idx) => (
                <div key={idx} className="relative min-w-45 md:min-w-55 h-90 md:h-105 group/card cursor-pointer overflow-hidden bg-neutral-900 shrink-0 rounded-2xl">
                  <Image
                    width={1000}
                    height={1000}
                    src={svc.img} 
                    alt={svc.title.replace("\n", " ")} 
                    className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover/card:opacity-30 group-hover/card:scale-105 transition-all duration-700" 
                    fetchPriority="high"
                    priority
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent pointer-events-none"></div>
                  <div className="absolute bottom-6 left-5 right-5 tracking-wide">
                    <div className="text-sm font-medium text-neutral-400 mb-2">{svc.num}</div>
                    <div className="w-6 h-px bg-white/60 mb-3 group-hover/card:w-full transition-all duration-500"></div>
                    <div className="text-lg font-medium whitespace-pre-line leading-tight text-neutral-200 group-hover/card:text-white transition-colors mb-3">
                      {svc.title}
                    </div>
                    <p className="text-xs text-neutral-300 leading-relaxed font-light max-h-0 opacity-0 group-hover/card:max-h-24 group-hover/card:opacity-100 transition-all duration-500 overflow-hidden">
                      {svc.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <style>{`
            @keyframes marquee {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            .pause-marquee {
              animation-play-state: paused !important;
            }
          `}</style>
        </div>
      </div>
    </section>
  );
};

export default Services;