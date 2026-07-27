import type { Metadata } from "next";
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

export default function AboutPage() {
  return (
    <>
      <Navbar overHero />
      <main className="relative z-10 flex-1">
        <PageHero
          eyebrow={about.hero.eyebrow}
          titleLead={about.hero.titleLead}
          titleAccent={about.hero.titleAccent}
          description={about.hero.description}
          image="/assets/images/about-banner.webp"
        />

        {/* Section 1: Misi */}
        <section className="py-20 sm:py-28">
          <Container>
            <div className="mx-auto max-w-3xl">
              <Reveal delay={60}>
                <h2 className="font-display text-4xl font-bold tracking-tight text-ink text-balance sm:text-5xl">
                  {about.story.title}
                </h2>
              </Reveal>
              <div className="mt-5 space-y-4">
                {about.story.body.map((p, i) => (
                  <Reveal key={i} delay={120 + i * 60}>
                    <p className="text-lg leading-relaxed text-muted text-pretty">{p}</p>
                  </Reveal>
                ))}
              </div>
            </div>
          </Container>
        </section>

        {/* Section 2: Trust / logo klien */}
        <Clients title={about.trust.title} body={about.trust.body} />
      </main>
      <Footer />
    </>
  );
}
