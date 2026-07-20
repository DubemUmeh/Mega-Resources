import Link from "next/link";

const quickLinks = {
  'Quick Links': [
    { title: 'Home', href: '/' },
    { title: 'Services', href: '/services' },
    { title: 'Portfolio', href: '/portfolio' },
    { title: 'About Us', href: '/about-us' },
    { title: 'Contact', href: '/contact' },
  ],

  'Services': [
    { href: "/services/borehole-drilling", title: "Borehole Drilling", },
    { href: "/services/pump-installation", title: "Pump Installation", },
    { href: "/services/borehole-rehabilitation", title: "Borehole Rehabilitation", },
    { href: "/services/hydro-fracturing", title: "Hydro-fracturing", },
    { href: "/services/geological-surveys", title: "Geological Surveys", },
    { href: "/services/pumping-tests", title: "Pumping Tests", },
    { href: "/services/air-lifting-developing", title: "Air Lifting / Developing", },
  ],

  'Resouces': [
    { title: 'FAQS', href: '/faq' },
    { title: 'Get a Quote', href: '/quote' },
    // { title: 'Case Studies', href: '/case-studies' },
    // { title: 'Downloads', href: '/downloads' },
  ]
}

export default function Footer() {
  return (
    <footer className="px-4 md:px-10 pt-24 pb-8 w-full bg-background/50 relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10 [background:radial-gradient(circle_at_10%_10%,rgba(255,205,112,0.16),transparent_38%),radial-gradient(circle_at_90%_20%,rgba(255,184,142,0.14),transparent_40%)]" />
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-16 w-full">
        <div className="col-span-2 mb-8 md:mb-0">
          <img src="https://cdn.screenshottocode.com/_VKmQmHxiqnw6eAYnIWNp.png" alt="Mega Resources Ltd" className="h-8 mb-6 opacity-80" />
        </div>

        {Object.entries(quickLinks).map(([category, items]) => (
          <div className="col-span-1 w-fit" key={category}>
            <h4 className="text-[16px] md:text-lg font-semibold tracking-wider uppercase text-gray-300 mb-6">{category}</h4>
            <ul className="text-xs md:text-[16px] text-gray-500 space-y-3 font-light">
              {items.map((item) => (
                <Link key={item.href} href={item.href} className="hover:text-white cursor-pointer transition-colors block w-fit">{item.title}</Link>
              ))}
              
              {/* <li className="hover:text-white cursor-pointer transition-colors">Home</li>
              <li className="hover:text-white cursor-pointer transition-colors">Services</li>
              <li className="hover:text-white cursor-pointer transition-colors">Projects</li>
              <li className="hover:text-white cursor-pointer transition-colors">About Us</li>
              <li className="hover:text-white cursor-pointer transition-colors">Resources</li>
              <li className="hover:text-white cursor-pointer transition-colors">Contact</li> */}
            </ul>
          </div>
        ))}
          

        {/* <div className="col-span-1 w-fit">
          <h4 className="text-[16px] md:text-lg font-semibold tracking-wider uppercase text-gray-300 mb-6">Services</h4>
          <ul className="text-xs md:text-[16px] text-gray-500 space-y-3 font-light">
            <li className="hover:text-white cursor-pointer transition-colors">Borehole Drilling</li>
            <li className="hover:text-white cursor-pointer transition-colors">Pump Installation</li>
            <li className="hover:text-white cursor-pointer transition-colors">Borehole Rehabilitation</li>
            <li className="hover:text-white cursor-pointer transition-colors">Hydrofracturing</li>
            <li className="hover:text-white cursor-pointer transition-colors">Geological Surveys</li>
            <li className="hover:text-white cursor-pointer transition-colors">Pumping Tests</li>
            <li className="hover:text-white cursor-pointer transition-colors">Air Lifting / Developing</li>
          </ul>
        </div>

        <div className="col-span-1 w-fit">
          <h4 className="text-[16px] md:text-lg font-semibold tracking-wider uppercase text-gray-300 mb-6">Resources</h4>
          <ul className="text-xs md:text-[16px] text-gray-500 space-y-3 font-light">
            <li className="hover:text-white cursor-pointer transition-colors">FAQs</li>
            <li className="hover:text-white cursor-pointer transition-colors">Blog</li>
            <li className="hover:text-white cursor-pointer transition-colors">Case Studies</li>
            <li className="hover:text-white cursor-pointer transition-colors">Downloads</li>
          </ul>
        </div> */}
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-[16px] md:text-[16px] text-gray-400 font-light border-t border-gray-800/80 pt-8 w-full">
        <div>© 2026 Mega Resources Ltd. All Rights Reserved.</div>
        <div className="flex gap-6 w-fit">
          <Link href='/privacy-policy' className="hover:text-white cursor-pointer transition-colors">Privacy Policy</Link>
          <Link href='/terms' className="hover:text-white cursor-pointer transition-colors">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
};