import Image from "next/image";
import { FaMedal, FaCogs, FaMapMarkerAlt } from "react-icons/fa";
import { FaShieldHalved } from "react-icons/fa6";
import { Reveal } from "@/components/motion-kit";

const reasons = [
  { icon: <FaMedal />, title: "Guaranteed Water, or We Don't Drill", desc: "98% site success rate. If the survey doesn't find water." },
  { icon: <FaCogs />, title: "Own Equipment, No Delays", desc: "We own our rigs — most projects complete in 1–3 days, not weeks or months." },
  { icon: <FaMapMarkerAlt />, title: "Nationwide Coverage", desc: "Serving communities and businesses across every region of Ghana." },
  { icon: <FaShieldHalved />, title: "Licensed & After-Sales Support", desc: "Certified by the Water Resources Commission." },
];

const stats = [
  { value: "1,000+", label: "Boreholes Drilled" },
  { value: "98%", label: "Site Success Rate" },
  { value: "15+", label: "Years in Operation" },
];

const WhyChooseUs = () => {
  return (
    <section className="relative w-full overflow-hidden bg-foreground px-5 py-24 md:px-10 md:py-32">
      <Reveal>
        <div className="mx-auto mb-16 w-fit inline-flex items-center gap-[0.45rem] rounded-full border border-background/15 bg-background/5 px-[0.8rem] py-[0.45rem] text-[0.85rem] font-semibold uppercase tracking-wider text-background/70">
          Why Choose Us
        </div>
      </Reveal>

      <div className="mx-auto mb-20 grid w-[min(100%,76rem)] grid-cols-1 gap-12 md:grid-cols-3 lg:grid-cols-4 lg:gap-16">
        <Reveal delay={0.06} className="flex flex-col justify-between">
          <div>
            <h2 className="font-display text-3xl font-semibold leading-tight text-background mb-8 md:text-4xl lg:text-5xl">
              Built on<br />Expertise.<br />Driven by<br />Purpose.
            </h2>
            <p className="text-[0.9rem] leading-[1.75] tracking-wide text-background/60">
              With over 15+ years of hands-on experience and advanced technology, we deliver reliable, sustainable, and cost-effective water solutions tailored to your needs.
            </p>
          </div>
          <div className="group mt-12 flex w-fit cursor-pointer items-center gap-3 text-[0.85rem] font-semibold uppercase tracking-wide text-background/70 transition-colors hover:text-blue-400">
            About Us
            <span className="inline-block -rotate-45 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">→</span>
          </div>
        </Reveal>

        <Reveal delay={0.12} className="h-100 w-full overflow-hidden rounded-[1.5rem] border border-background/10 lg:col-span-2 md:h-150">
          <Image
            width={1000}
            height={1000}
            src="/images/home/why-choose-us.png"
            alt="Worker on a Mega Resources drill site"
            className="h-full w-full object-cover"
            priority
          />
        </Reveal>

        <Reveal delay={0.18} className="flex flex-col justify-center gap-10">
          {reasons.map((item) => (
            <div key={item.title} className="group flex gap-6">
              <div className="mt-1 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-background/15 bg-background/5 text-background/70 transition-colors group-hover:border-blue-400 group-hover:text-blue-400">
                <span className="text-lg">{item.icon}</span>
              </div>
              <div>
                <h4 className="text-[0.95rem] font-semibold text-background mb-2">{item.title}</h4>
                <p className="text-[0.85rem] leading-relaxed text-background/55">{item.desc}</p>
              </div>
            </div>
          ))}
        </Reveal>
      </div>

      <Reveal delay={0.1}>
        <div className="mx-auto grid w-[min(100%,76rem)] grid-cols-1 gap-px overflow-hidden rounded-[1.5rem] border border-background/10 bg-background/10 md:grid-cols-3">
          {stats.map((s) => (
            <div key={s.label} className="bg-foreground px-6 py-8 text-center">
              <div className="font-display text-3xl font-semibold text-background mb-2 md:text-4xl">{s.value}</div>
              <div className="text-[0.7rem] uppercase tracking-widest text-background/60">{s.label}</div>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
};

export default WhyChooseUs;
