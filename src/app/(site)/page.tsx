import type { Metadata } from "next";
import {
  getClientsServer,
  getHomePageServer,
  getSiteConfigServer,
  getSuccessStoriesServer,
} from "@/lib/payload";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Clients } from "@/components/sections/Clients";
import { Stats } from "@/components/sections/Stats";
import { WhyChoose } from "@/components/sections/WhyChoose";
import { Coverage } from "@/components/sections/Coverage";
import { SuccessStory } from "@/components/sections/SuccessStory";
import { CtaSection } from "@/components/sections/CtaSection";

export async function generateMetadata(): Promise<Metadata> {
  const homeData = await getHomePageServer();
  if (homeData?.title) {
    return {
      title: homeData.title,
    };
  }
  return {};
}

export default async function Home() {
  const clientsData = await getClientsServer();
  const successStoriesData = await getSuccessStoriesServer();
  const homeData = await getHomePageServer();
  const siteData = await getSiteConfigServer();

  return (
    <>
      <Navbar overHero />
      <main className="relative z-10 flex-1">
        <Hero data={homeData} />
        {/* Social proof: klien + statistik mengalir menyatu tanpa pemisah */}
        <Clients logos={clientsData.logos} />
        <Stats />
        <WhyChoose data={homeData} />
        <Coverage data={homeData.coverage} />
        <SuccessStory items={homeData?.successStories ?? successStoriesData} />
        <CtaSection content={homeData.finalCta} />
      </main>
      <Footer siteData={siteData} />
    </>
  );
}
