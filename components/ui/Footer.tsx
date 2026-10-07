import Link from "next/link";
import { Mega_Logo } from "../logo";

const quickLinks = {
  "Quick Links": [
    { title: "Home", href: "/" },
    { title: "Services", href: "/services" },
    { title: "Portfolio", href: "/portfolio" },
    { title: "About Us", href: "/about-us" },
    { title: "Contact", href: "/contact" },
  ],
  Services: [
    { href: "/services/geological-surveys", title: "Geological Surveys" },
    { href: "/services/borehole-drilling", title: "Borehole Drilling" },
    { href: "/services/air-lifting-developing", title: "Air Lifting / Developing" },
    { href: "/services/pumping-tests", title: "Pumping Tests" },
    { href: "/services/water-quality-analysis", title: "Water Quality Analysis" },
    { href: "/services/pump-installation", title: "Pump Installation" },
    { href: "/services/borehole-rehabilitation", title: "Borehole Rehabilitation" },
    { href: "/services/hydro-fracturing", title: "Hydro-fracturing" },
    { href: "/services/piezometer-drilling", title: "Piezometer Drilling" },
    { href: "/services/observation-wells", title: "Observation Wells" },
    { href: "/services/dewatering-wells", title: "Dewatering Wells" },
    { href: "/services/horizontal-drain-drilling", title: "Horizontal Drain Drilling" },
  ],
  Resources: [
    { title: "FAQS", href: "/faq" },
    { title: "Get a Quote", href: "/quote" },
    { title: "Reviews", href: "/reviews" },
  ],
};

export default function Footer() {
  return (
    <footer className="w-full overflow-hidden bg-background/40 px-5 pb-8 pt-24 md:px-10">
      <div className="mx-auto w-[min(100%,76rem)]">
        <div className="mb-16 grid w-full grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5">
          <div className="col-span-2 mb-8 md:hidden">
            <Mega_Logo logo_height="140" logo_width="350" className="rotate-1" />
          </div>
          <div className="col-span-2 mb-8 hidden md:block">
            <Mega_Logo logo_height="160" logo_width="450" className="rotate-1" />
          </div>

          {Object.entries(quickLinks).map(([category, items]) => (
            <div className="col-span-1 w-fit" key={category}>
              <h4 className="font-brand mb-6 text-lg font-semibold uppercase tracking-[0.12em] text-neutral-800">
                {category}
              </h4>
              <ul className="font-body flex flex-col gap-3 text-base text-neutral-600">
                {items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block w-fit cursor-pointer transition-colors hover:text-blue-600"
                  >
                    {item.title}
                  </Link>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="font-body flex w-full flex-col items-center justify-between gap-4 border-t border-neutral-200 pt-8 text-base text-neutral-800 md:flex-row">
          <div>© 2026 Mega Resources Ltd. All Rights Reserved.</div>
          <div className="flex w-fit gap-6">
            <Link href="/privacy-policy" className="cursor-pointer transition-colors hover:text-blue-600">Privacy Policy</Link>
            <Link href="/terms" className="cursor-pointer transition-colors hover:text-blue-600">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}