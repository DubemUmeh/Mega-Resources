'use client';

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import { ScrollToTop } from "@/components/ui/scroll-to-top";

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
      {!shouldHideLayout && <ScrollToTop />}
    </>
  )
}