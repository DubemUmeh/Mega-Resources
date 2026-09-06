import type { Metadata } from "next";
import { Fraunces, Manrope, Inter } from "next/font/google";
import { createMetadata, siteConfig } from "@/lib/seo";
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
    icon: [
      { url: "/icons/favicon.ico" },
      { url: "/icons/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/icons/favicon-16x16.png", type: "image/png", sizes: "16x16" },
      { url: "/icons/android-chrome-192x192.png", type: "image/png", sizes: "192x192" },
      { url: "/icons/android-chrome-512x512.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: "/icons/apple-touch-icon.png", type: "image/png", sizes: "180x180" }],
  },
  manifest: "/icons/site.webmanifest",
};

export const metadata: Metadata = {
  ...createMetadata({
    title: siteConfig.defaultTitle,
    description: siteConfig.defaultDescription,
    path: "/",
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
      <body
        className="antialiased min-h-screen font-body"
      >
        <AppLayout>
          {children}
        </AppLayout>
      </body>
    </html>
  );
}