'use client';

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useEffect } from "react";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
// import { ScrollToTop } from "@/components/ui/scroll-to-top";
import { FaWhatsapp } from "react-icons/fa6";

function WhatsAppFab() {
  return (
    <Link
      href="https://wa.me/233559956394"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-4 left-4 z-50 flex items-center justify-center rounded-full bg-whatsapp p-4 text-white shadow-lg shadow-black/20 transition-transform duration-300 hover:scale-110 hover:shadow-xl md:bottom-8 md:right-8"
    >
      <FaWhatsapp className="h-7 w-7" />
    </Link>
  );
}

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathName = usePathname();

  const shouldHideLayout = pathName.startsWith('/admin');

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 });
  }, [pathName]);

  return (
    <>
      {!shouldHideLayout && <Navbar />}
      {children}
      {!shouldHideLayout && <Footer />}
      {!shouldHideLayout && <WhatsAppFab />}
    </>
  )
}
