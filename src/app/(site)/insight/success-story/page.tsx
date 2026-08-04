import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { SuccessStoryGrid } from "@/components/sections/SuccessStoryGrid";
import { CtaSection } from "@/components/sections/CtaSection";
import { consultCta } from "@/lib/content";
import { getSuccessStoriesServer } from "@/lib/payload";

export const metadata: Metadata = {
  title: "Success Story",
  description:
    "Cerita nyata armada yang berhenti menebak dan mulai mengelola ban berbasis data bersama SaveMile.",
};

export default async function SuccessStoryPage() {
  const stories = await getSuccessStoriesServer();

  return (
    <>
      <Navbar overHero />
      <main className="relative z-10 flex-1">
        <PageHero
          eyebrow="Success Story"
          titleLead="Terbukti di "
          titleAccent="lapangan"
          description="Hasil nyata dari armada yang berhenti menebak dan mulai mengelola ban berbasis data."
          image="/assets/images/success-story-banner.webp"
        />

        <section className="py-20 sm:py-28">
          <Container>
            <SuccessStoryGrid items={stories} />
          </Container>
        </section>

        <CtaSection content={consultCta} />
      </main>
      <Footer />
    </>
  );
}
