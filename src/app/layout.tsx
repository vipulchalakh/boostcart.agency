import type { Metadata, Viewport } from "next";
import { fontVariables } from "@/lib/fonts";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { CookieBanner } from "@/components/layout/CookieBanner";
import { SpotlightProvider } from "@/components/ui/SpotlightProvider";
import "@/styles/globals.css";

const siteUrl = "https://boostcart.agency";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "E-commerce SEO Agency for Shopify & WooCommerce | BoostCart", template: "%s | BoostCart" },
  description: "BoostCart is an e-commerce SEO agency for Shopify, WooCommerce and BigCommerce stores. Technical SEO, category pages, content and links. Get a free audit.",
  alternates: { canonical: "/" },
  openGraph: { type: "website", siteName: "BoostCart", url: siteUrl },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = { themeColor: "#ffffff", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={fontVariables}>
      <body>
        <noscript>
          <style>{`.reveal,.si,.hero-line>span,.hero-fade{opacity:1!important;transform:none!important;animation:none!important}.marquee{overflow-x:auto}.draw-path{stroke-dashoffset:0}.grow-x{transform:none}.type{max-width:100%}`}</style>
        </noscript>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-ink focus:px-4 focus:py-2 focus:text-white">
          Skip to content
        </a>
        <Navbar />
        <main id="main">{children}</main>
        <Footer />
        <CookieBanner />
        <SpotlightProvider />
      </body>
    </html>
  );
}
