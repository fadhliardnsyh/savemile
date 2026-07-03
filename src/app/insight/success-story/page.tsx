import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { StoryCard } from "@/components/sections/SuccessStory";
import { CtaSection } from "@/components/sections/CtaSection";
import { successStory, consultCta } from "@/lib/content";

export const metadata: Metadata = {
  title: "Success Story",
  description:
    "Cerita nyata armada yang berhenti menebak dan mulai mengelola ban berbasis data bersama SaveMile.",
};

export default function SuccessStoryPage() {
  const [featured, ...rest] = successStory.items;
  return (
    <>
      <Navbar overHero />
      <main className="relative z-10 flex-1">
        <PageHero
          eyebrow="Success Story"
          titleLead="Terbukti di "
          titleAccent="lapangan"
          description="Hasil nyata dari armada yang berhenti menebak dan mulai mengelola ban berbasis data."
        />

        <section className="py-20 sm:py-28">
          <Container>
            <div className="grid gap-5 lg:grid-cols-[1.6fr_1fr]">
              <Reveal>
                <StoryCard story={featured} featured />
              </Reveal>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
                {rest.map((s, i) => (
                  <Reveal key={s.title} delay={(i + 1) * 90}>
                    <StoryCard story={s} />
                  </Reveal>
                ))}
              </div>
            </div>
          </Container>
        </section>

        <CtaSection content={consultCta} />
      </main>
      <Footer />
    </>
  );
}
