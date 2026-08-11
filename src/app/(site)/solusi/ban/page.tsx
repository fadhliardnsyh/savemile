import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { InfoStrip } from "@/components/catalog/InfoStrip";
import { CatalogBrowser } from "@/components/catalog/CatalogBrowser";

import {
  getCatalogPageServer,
  getCatalogProductsServer,
  getSiteConfigServer,
} from "@/lib/payload";
import { CatalogHero } from "@/components/catalog/CatalogHero";

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
        <CatalogBrowser
          initialProducts={products}
          filterOptions={{
            tipe: catalogPageData.tipeOptions,
            compatible: catalogPageData.compatibleOptions,
            medan: catalogPageData.medanOptions,
            fitur: catalogPageData.fiturOptions,
            tipeLabels: catalogPageData.tipeLabels,
            compatibleLabels: catalogPageData.compatibleLabels,
            medanLabels: catalogPageData.medanLabels,
            medanIcons: catalogPageData.medanIcons,
            fiturLabels: catalogPageData.fiturLabels,
          }}
        />
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
