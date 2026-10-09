import Link from "next/link";
import { FaArrowRight, FaWhatsapp } from "react-icons/fa";

const CTA = () => {
  return (
    <section className="px-8 lg:px-24 py-24 bg-accent-foreground">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        <div className="lg:col-span-4">
          <div className="text-sm uppercase tracking-wide text-gray-500 mb-6">Ready When You Are</div>
          <h2 className="text-3xl md:text-4xl lg:text-[2.5rem] font-light leading-[1.1] text-gray-200">
            Ready for<br />
            24/7 Water?<br />
            Let&apos;s Talk.
          </h2>
        </div>

        <div className="lg:col-span-3 flex flex-col gap-8">
          <p className="text-sm text-gray-300 leading-relaxed max-w-56 font-light">
            Book your site survey today at a token. No payment until we confirm water on your land.
          </p>
          <div className="flex flex-col gap-3 w-fit">
            <Link href='/quote' className="block border border-white/20 rounded-full px-6 py-3 hover:bg-white/80 hover:text-black transition-colors flex items-center gap-3 text-xs tracking-wide">
              Request a Quote <FaArrowRight className="text-[10px] transform -rotate-45" />
            </Link>
            <Link href="https://wa.me/233243287420" target="_blank" className="rounded-full px-6 py-3 bg-white text-black hover:bg-gray-400 transition-colors flex items-center gap-3 text-xs tracking-wide font-medium">
              <FaWhatsapp className="text-sm" /> WhatsApp Us
            </Link>
          </div>
        </div>

        <div className="lg:col-span-3 flex flex-col gap-8 text-sm tracking-wide font-light">
          <div>
            <div className="mb-1 text-gray-500 uppercase text-xs tracking-widest font-medium">Call Us</div>
            <div className="text-gray-300">
              <Link href="tel:+233243287420">+233 24 328 7420</Link>
              <br />
              <Link href="tel:+233245424359">+233 24 542 4359</Link>
            </div>
          </div>
          <div>
            <div className="mb-1 text-gray-500 uppercase text-xs tracking-widest font-medium">Email Us</div>
            <div className="text-gray-300">
              <Link href="mailto:info@megaresourcesgh.com">info@megaresourcesgh.com</Link>
            </div>
          </div>
          <div>
            <div className="mb-1 text-gray-500 uppercase text-xs tracking-widest font-medium">Our Office</div>
            <div className="text-gray-300">Takoradi, Western Region, Ghana</div>
          </div>
          <div>
            <div className="mb-1 text-gray-500 uppercase text-xs tracking-widest font-medium">Hours</div>
            <div className="text-gray-300">Mon–fri, 8am–5pm</div>
          </div>
        </div>

        <div className="lg:col-span-2 w-32 md:w-48 flex justify-start lg:justify-end">
          <iframe className="w-auto h-auto" src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d4727.297995985261!2d-1.7940350904402613!3d4.91154945561244!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfe7799261351dc3%3A0xd1ff1ede73843c6e!2sMega%20Resources%20LTD!5e0!3m2!1sen!2sgh!4v1791555682297!5m2!1sen!2sgh" allowFullScreen="" loading="lazy" referrerPolicy="strict-origin-when-cross-origin"></iframe>
        </div>
      </div>
    </section>
  );
};

export default CTA;
