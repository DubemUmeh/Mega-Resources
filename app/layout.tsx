import type { Metadata } from "next";
import { createMetadata, siteConfig } from "@/lib/seo";
import "./globals.css";
import AppLayout from "./app-layout";

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
    <html lang="en">
      <body
        className="antialiased min-h-screen"
      >
        <AppLayout>
          {children}
        </AppLayout>
      </body>
    </html>
  );
}