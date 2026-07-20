import { FaArrowRight, FaWhatsapp } from "react-icons/fa";

const CTA = () => {
  return (
    <section className="px-8 lg:px-24 py-24">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        <div className="lg:col-span-4">
          <div className="text-[10px] uppercase tracking-widest text-gray-500 mb-6">Ready When You Are</div>
          <h2 className="text-3xl md:text-4xl lg:text-[2.5rem] font-light leading-[1.1] text-gray-200">
            Ready for<br />
            24/7 Water?<br />
            Let's Talk.
          </h2>
        </div>

        <div className="lg:col-span-3 flex flex-col gap-8">
          <p className="text-[13px] text-gray-400 leading-relaxed max-w-56 font-light">
            Book your free site survey today. No payment until we confirm water on your land.
          </p>
          <div className="flex flex-col gap-3 w-fit">
            <button className="border border-white/20 rounded-full px-6 py-3 hover:bg-white hover:text-black transition-colors flex items-center gap-3 text-xs tracking-wide">
              Request a Quote <FaArrowRight className="text-[10px] transform -rotate-45" />
            </button>
            <button className="rounded-full px-6 py-3 bg-white text-black hover:bg-gray-200 transition-colors flex items-center gap-3 text-xs tracking-wide font-medium">
              <FaWhatsapp className="text-sm" /> WhatsApp Us
            </button>
          </div>
        </div>

        <div className="lg:col-span-3 flex flex-col gap-8 text-[11px] text-gray-500 tracking-wide font-light">
          <div>
            <div className="mb-1 text-gray-600 uppercase text-[9px] tracking-widest font-medium">Call Us</div>
            <div className="text-gray-300">+233 24 123 4567<br />+233 54 987 6543</div>
          </div>
          <div>
            <div className="mb-1 text-gray-600 uppercase text-[9px] tracking-widest font-medium">Email Us</div>
            <div className="text-gray-300">info@mega-resources.com</div>
          </div>
          <div>
            <div className="mb-1 text-gray-600 uppercase text-[9px] tracking-widest font-medium">Our Office</div>
            <div className="text-gray-300">Takoradi, Western Region, Ghana</div>
          </div>
          <div>
            <div className="mb-1 text-gray-600 uppercase text-[9px] tracking-widest font-medium">Hours</div>
            <div className="text-gray-300">Mon–Sat, 8am–5pm<br />24/7 emergency support</div>
          </div>
        </div>

        <div className="lg:col-span-2 flex justify-start lg:justify-end">
          <img src="https://cdn.screenshottocode.com/b2QE2YDwoTN2J3Tm7J64f.png" alt="Ghana Map" className="w-32 md:w-48 opacity-30 mix-blend-screen" />
        </div>
      </div>
    </section>
  );
};

export default CTA;