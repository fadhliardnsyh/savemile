import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Clients } from "@/components/sections/Clients";
import { Stats } from "@/components/sections/Stats";
import { WhyChoose } from "@/components/sections/WhyChoose";
import { SuccessStory } from "@/components/sections/SuccessStory";
import { CtaSection } from "@/components/sections/CtaSection";
import { finalCta } from "@/lib/content";

export default function Home() {
  return (
    <>
      <Navbar overHero />
      <main className="relative z-10 flex-1">
        <Hero />
        <Clients />
        <Stats />
        <WhyChoose />
        <SuccessStory />
        <CtaSection content={finalCta} />
      </main>
      <Footer />
    </>
  );
}
