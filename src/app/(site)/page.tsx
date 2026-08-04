import { getClientsServer, getSuccessStoriesServer } from "@/lib/payload";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Clients } from "@/components/sections/Clients";
import { Stats } from "@/components/sections/Stats";
import { WhyChoose } from "@/components/sections/WhyChoose";
import { Coverage } from "@/components/sections/Coverage";
import { SuccessStory } from "@/components/sections/SuccessStory";
import { CtaSection } from "@/components/sections/CtaSection";
import { finalCta } from "@/lib/content";

export default async function Home() {
  const clientsData = await getClientsServer();
  const successStoriesData = await getSuccessStoriesServer();

  return (
    <>
      <Navbar overHero />
      <main className="relative z-10 flex-1">
        <Hero />
        {/* Social proof: klien + statistik mengalir menyatu tanpa pemisah */}
        <Clients logos={clientsData.logos} />
        <Stats />
        <WhyChoose />
        <Coverage />
        <SuccessStory items={successStoriesData} />
        <CtaSection content={finalCta} />
      </main>
      <Footer />
    </>
  );
}
