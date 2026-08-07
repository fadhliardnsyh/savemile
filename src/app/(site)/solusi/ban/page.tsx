import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CatalogHero } from "@/components/catalog/CatalogHero";
import { InfoStrip } from "@/components/catalog/InfoStrip";
import { CatalogBrowser } from "@/components/catalog/CatalogBrowser";

import {
  getCatalogPageServer,
  getCatalogProductsServer,
  getSiteConfigServer,
} from "@/lib/payload";

export const metadata: Metadata = {
  title: "Ban Truk & Kendaraan Niaga",
  description:
    "Katalog ban truk & kendaraan niaga dari Tiron & Doublestar: steer, drive, trailer, off-road, hingga forklift. Distributor resmi SaveMile.",
};

export default async function SolusiBanPage() {
  const [products, catalogPageData, siteData] = await Promise.all([
    getCatalogProductsServer(),
    getCatalogPageServer(),
    getSiteConfigServer(),
  ]);

  return (
    <>
      <Navbar items={siteData.nav} overHero />
      <main className="relative z-10 flex-1">
        <CatalogHero data={catalogPageData} />
        <CatalogBrowser initialProducts={products} />
        <InfoStrip
          title={catalogPageData.infoStripTitle}
          highlight={catalogPageData.infoStripTitleHighlight}
          items={catalogPageData.infoStripItems}
        />
      </main>
      <Footer siteData={siteData} />
    </>
  );
}
