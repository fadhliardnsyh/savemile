import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { SuccessStoryGrid } from "@/components/sections/SuccessStoryGrid";
import { CtaSection } from "@/components/sections/CtaSection";
import {
  getCatalogPageServer,
  getSiteConfigServer,
  getSuccessStoriesServer,
  getSuccessStoryPageServer,
} from "@/lib/payload";

export async function generateMetadata(): Promise<Metadata> {
  const pageData = await getSuccessStoryPageServer();
  return {
    title: pageData.title,
    description: pageData.seoDescription,
  };
}

export default async function SuccessStoryPage() {
  const [stories, catalogData, pageData, siteData] = await Promise.all([
    getSuccessStoriesServer(),
    getCatalogPageServer(),
    getSuccessStoryPageServer(),
    getSiteConfigServer(),
  ]);

  return (
    <>
      <Navbar items={siteData.nav} overHero />
      <main className="relative z-10 flex-1">
        <PageHero
          eyebrow={pageData.heroEyebrow}
          titleLead={pageData.heroTitleLead}
          titleAccent={pageData.heroTitleAccent}
          description={pageData.heroDescription}
          image={pageData.heroImage}
          video={pageData.heroVideo}
        />

        <section className="py-20 sm:py-28">
          <Container>
            <SuccessStoryGrid items={stories} />
          </Container>
        </section>

        <CtaSection content={catalogData.consultCta} />
      </main>
      <Footer siteData={siteData} />
    </>
  );
}
