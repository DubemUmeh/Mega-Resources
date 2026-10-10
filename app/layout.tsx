import type { Metadata } from "next";
import Script from "next/script";
import { Fraunces, Manrope, Inter } from "next/font/google";
import { createMetadata, siteConfig, localBusinessSchema, websiteSchema } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";
import "./globals.css";
import AppLayout from "./app-layout";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const iconMetadata: Pick<Metadata, "icons" | "manifest"> = {
  icons: {
    icon: "/icons/favicon.ico",
    apple: "/icons/apple-touch-icon.png",
  },
  manifest: "/icons/site.webmanifest",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  ...createMetadata({
    title: siteConfig.defaultTitle,
    description: siteConfig.defaultDescription,
    path: "/",
    keywords: [
      "Mega Resources",
      "Mega Resources Ghana",
      "Borehole drilling company",
      "best Borehole drilling company Ghana",
      "Ghana borehole drilling",
      "cheap borehole drilling company Ghana",
      "Borehole drilling in Accra",
      "groundwater services Ghana",
      "borehole drilling Ghana",
      "drilling services Ghana",
      "water services Ghana",
      "Mega Resources LTD",
    ],
  }),
  ...iconMetadata,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${manrope.variable} ${inter.variable}`}>
      <head>
        <Script async src="https://code.jivosite.com/widget/Kro6Czw7VL" /> {/* changed: https */}
      </head>
      <body className="antialiased min-h-screen font-body">
        {/* changed: sitewide LocalBusiness + WebSite schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([localBusinessSchema(), websiteSchema()]).replace(/</g, "\\u003c"),
          }}
        />
        <AppLayout>{children}</AppLayout>
      </body>
    </html>
  );
}
