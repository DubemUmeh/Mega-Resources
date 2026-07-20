import { FaArrowRight } from "react-icons/fa";

const services = [
  {
    num: "01",
    title: "Borehole\nDrilling",
    desc: "100ft–400ft depth. Geophysical survey, drilling, and PVC casing to prevent collapse.",
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
];

const Services = () => {
  return (
    <section className="px-8 lg:px-24 py-24 border-b border-gray-800 overflow-hidden bg-linear-to-b from-background/10 via-background/50 to-background/20 text-white">
      <div className="text-[10px] uppercase tracking-widest text-gray-500 mb-16">Our Services</div>

      <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
        <div className="lg:w-1/4 flex flex-col justify-between">
          <div>
            <div className="text-6xl md:text-7xl font-light mb-6 text-gray-100">07</div>
            <div className="text-sm text-gray-400 leading-relaxed font-light">
              Specialized Services.<br />
              Complete Water<br />
              Solutions.
            </div>
            <p className="text-[11px] text-gray-600 leading-relaxed font-light mt-4 max-w-55">
              Prices from GHS 18,000. Final quote issued after a free site survey.
            </p>
          </div>
          <div className="mt-12 w-16 h-16 rounded-full border border-gray-700 flex items-center justify-center hover:bg-white hover:text-black transition-colors cursor-pointer text-gray-400">
            <FaArrowRight className="transform -rotate-45" />
          </div>
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
                <div key={idx} className="relative min-w-45 md:min-w-52 h-90 md:h-105 group/card cursor-pointer overflow-hidden bg-gray-900 shrink-0">
                  <img 
                    src={svc.img} 
                    alt={svc.title.replace("\n", " ")} 
                    className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover/card:opacity-30 group-hover/card:scale-105 transition-all duration-700" 
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent pointer-events-none"></div>
                  <div className="absolute bottom-6 left-5 right-5">
                    <div className="text-[11px] font-medium text-gray-400 mb-2">{svc.num}</div>
                    <div className="w-6 h-px bg-white/40 mb-3 group-hover/card:w-full transition-all duration-500"></div>
                    <div className="text-xs font-medium whitespace-pre-line leading-tight text-gray-200 group-hover/card:text-white transition-colors mb-3">
                      {svc.title}
                    </div>
                    <p className="text-[11px] text-gray-400 leading-relaxed font-light max-h-0 opacity-0 group-hover/card:max-h-24 group-hover/card:opacity-100 transition-all duration-500 overflow-hidden">
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
