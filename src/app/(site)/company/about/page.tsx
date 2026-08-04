import type { Metadata } from "next";
import { getClientsServer, getAboutPageServer } from "@/lib/payload";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Clients } from "@/components/sections/Clients";
import { about } from "@/lib/content";

export const metadata: Metadata = {
  title: "Tentang Kami",
  description: about.hero.description,
};

export default async function AboutPage() {
  const [clientsData, aboutData] = await Promise.all([
    getClientsServer(),
    getAboutPageServer(),
  ]);

  return (
    <>
      <Navbar overHero />
      <main className="relative z-10 flex-1">
        <PageHero
          title={aboutData.title}
          image={aboutData.heroImage}
          video={aboutData.heroVideo}
        />

        {/* Section 1: Misi */}
        <section className="py-20 sm:py-28">
          <Container>
            <div className="mx-auto max-w-3xl">
              <Reveal delay={60}>
                <h2 className="font-display text-4xl font-bold tracking-tight text-ink text-balance sm:text-5xl">
                  {aboutData.storyTitle}
                </h2>
              </Reveal>
              <div className="mt-5 space-y-4">
                {aboutData.storyBody.map((p, i) => (
                  <Reveal key={p} delay={120 + i * 60}>
                    <p className="text-lg leading-relaxed text-muted text-pretty">{p}</p>
                  </Reveal>
                ))}
              </div>
            </div>
          </Container>
        </section>

        {/* Section 2: Trust / logo klien */}
        <Clients title={aboutData.trustTitle} body={aboutData.trustBody} logos={clientsData.logos} />
      </main>
      <Footer />
    </>
  );
}
