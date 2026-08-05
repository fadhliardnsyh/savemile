import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/layout/PageHero";
import { HowItWorks } from "@/components/tms/HowItWorks";
import { FeatureDeepDive } from "@/components/tms/FeatureDeepDive";
import { Consultation } from "@/components/tms/Consultation";
import { CtaSection } from "@/components/sections/CtaSection";
import { getTmsPageServer } from "@/lib/payload";

export const metadata: Metadata = {
  title: "Tire Management Solution",
  description:
    "Solusi pengelolaan ban armada menyeluruh: laser marking, bongkar pasang, inspeksi umur ban, notifikasi penggantian, manajemen ban bekas, dan konsultasi CPK berbasis data.",
};

export default async function TmsPage() {
  const tmsData = await getTmsPageServer();

  return (
    <>
      <Navbar overHero />
      <main className="relative z-10 flex-1">
        <PageHero
          title={tmsData.title}
          image={tmsData.heroImage}
          video={tmsData.heroVideo}
        />
        <HowItWorks />
        <FeatureDeepDive features={tmsData.features} />
        <Consultation consultation={tmsData.consultation} />
        <CtaSection content={tmsData.tmsCta} />
      </main>
      <Footer />
    </>
  );
}
