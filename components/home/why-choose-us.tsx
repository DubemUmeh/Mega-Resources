import Image from "next/image";
import { FaMedal, FaCogs, FaMapMarkerAlt, FaShieldAlt } from "react-icons/fa";

const reasons = [
  {
    icon: <FaMedal />,
    title: "Guaranteed Water, or We Don't Drill",
    desc: "98% site success rate. If the survey doesn't find water, you owe nothing.",
  },
  {
    icon: <FaCogs />,
    title: "Own Equipment, No Delays",
    desc: "We own our rigs — most projects complete in 7–14 days, not months.",
  },
  {
    icon: <FaMapMarkerAlt />,
    title: "Nationwide Coverage",
    desc: "Serving communities and businesses across every region of Ghana.",
  },
  {
    icon: <FaShieldAlt />,
    title: "Licensed & After-Sales Support",
    desc: "Certified by the Ghana Water Commission. 24/7 support, 2-year warranty.",
  },
];

const stats = [
  { value: "500+", label: "Boreholes Drilled" },
  { value: "98%", label: "Site Success Rate" },
  { value: "10+", label: "Years in Operation" },
  { value: "2yr", label: "Warranty on Every Job" },
];

const WhyChooseUs = () => {
  return (
    <section className="w-full h-full bg-foreground/70 px-8 lg:px-15 py-24 border-b-2 border-muted-foreground">
      <div className="text-sm uppercase tracking-widest border border-popover w-fit p-2 rounded-full bg-foreground/20 font-semibold mb-16">Why Choose Us</div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-12 lg:gap-20 mb-20">
        <div className="flex flex-col justify-between">
          <div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light leading-tight mb-8 text-gray-200">
              Built on<br />
              Expertise.<br />
              Driven by<br />
              Purpose.
            </h2>
            <p className="text-sm text-gray-300 leading-relaxed tracking-wide font-mono w-full font-light">
              With years of hands-on experience and advanced technology, we deliver reliable, sustainable, and cost-effective water solutions tailored to your needs.
            </p>
          </div>

          <div className="mt-12 flex items-center gap-3 text-xs font-medium cursor-pointer group w-fit text-gray-300 hover:text-white transition-colors">
            About Us
            <i className="fas fa-arrow-right transform -rotate-45 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"></i>
          </div>
        </div>

        <div className="h-100 md:h-150 w-full lg:col-span-2">
          <Image width={1000} height={1000} src="/images/home/why-choose-us.png" alt="Worker on a Mega Resources drill site" className="w-full h-full object-cover filter brightness-90 grayscale-20" priority />
        </div>

        <div className="flex flex-col justify-center gap-10">
          {reasons.map((item, idx) => (
            <div key={idx} className="flex gap-6 group">
              <div className="mt-1 shrink-0 w-12 h-12 rounded-full border-2 bg-muted/5 border-gray-500 flex items-center justify-center text-popover group-hover:bg-white group-hover:text-foreground transition-colors">
                <span className="text-lg">{item.icon}</span>
              </div>
              <div>
                <h4 className="text-[16px] font-medium text-popover mb-2">{item.title}</h4>
                <p className="text-xs text-popover/50 leading-relaxed font-light">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-px bg-foreground/50 border border-background/40 rounded-sm">
        {stats.map((s) => (
          <div key={s.label} className="bg-dark/80 px-6 py-8 text-center">
            <div className="text-3xl md:text-4xl font-light text-popover mb-2">{s.value}</div>
            <div className="text-[10px] uppercase tracking-widest text-primary-foreground/80">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyChooseUs;