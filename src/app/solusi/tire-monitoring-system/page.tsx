import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { TmsHero } from "@/components/tms/TmsHero";
import { HowItWorks } from "@/components/tms/HowItWorks";
import { FeatureDeepDive } from "@/components/tms/FeatureDeepDive";
import { DashboardPreview } from "@/components/tms/DashboardPreview";
import { CtaSection } from "@/components/sections/CtaSection";
import { tmsCta } from "@/lib/content";

export const metadata: Metadata = {
  title: "Tire Monitoring System",
  description:
    "Kelola ban armada berbasis data: laser marking, kilometer tracking, notifikasi otomatis, dan dashboard analytics dalam satu sistem SaveMile.",
};

export default function TmsPage() {
  return (
    <>
      <Navbar overHero />
      <main className="relative z-10 flex-1">
        <TmsHero />
        <HowItWorks />
        <FeatureDeepDive />
        <DashboardPreview />
        <CtaSection content={tmsCta} />
      </main>
      <Footer />
    </>
  );
}
