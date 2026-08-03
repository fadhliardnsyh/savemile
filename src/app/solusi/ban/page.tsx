import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CatalogHero } from "@/components/catalog/CatalogHero";
import { InfoStrip } from "@/components/catalog/InfoStrip";
import { CatalogBrowser } from "@/components/catalog/CatalogBrowser";
import { CtaSection } from "@/components/sections/CtaSection";
import { consultCta } from "@/lib/content";

export const metadata: Metadata = {
  title: "Ban Truk & Kendaraan Niaga",
  description:
    "Katalog ban truk & kendaraan niaga dari Tiron & Doublestar: steer, drive, trailer, off-road, hingga forklift. Distributor resmi SaveMile.",
};

export default function SolusiBanPage() {
  return (
    <>
      <Navbar overHero />
      <main className="relative z-10 flex-1">
        <CatalogHero />
        <CatalogBrowser />
        <InfoStrip />
        {/* <CtaSection content={consultCta} /> */}
      </main>
      <Footer />
    </>
  );
}
