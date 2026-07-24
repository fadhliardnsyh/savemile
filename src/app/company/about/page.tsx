import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Clients } from "@/components/sections/Clients";
import { Stats } from "@/components/sections/Stats";
import { CtaSection } from "@/components/sections/CtaSection";
import { about, consultCta } from "@/lib/content";

export const metadata: Metadata = {
  title: "Tentang SaveMile",
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
        />

        {/* Misi */}
        <section className="py-20 sm:py-28">
          <Container className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
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

            <div className="flex flex-col gap-4 lg:pt-10">
              {about.story.points.map((pt, i) => (
                <Reveal key={pt.title} delay={i * 90}>
                  <div className="beam group relative flex items-start gap-4 rounded-2xl bg-card p-5 shadow-[var(--shadow-soft)] ring-1 ring-inset ring-line/70 transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]">
                    <span className="beam-line" aria-hidden />
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-orange to-orange-deep text-white shadow-[var(--shadow-orange)]">
                      <Icon name={pt.icon as IconName} className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="font-display text-base font-bold text-ink">{pt.title}</h3>
                      <p className="mt-1 text-sm text-muted text-pretty">{pt.desc}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>

        {/* Angka (reuse) */}
        <Stats />

        {/* Trust / klien */}
        <Clients />

        <CtaSection content={consultCta} />
      </main>
      <Footer />
    </>
  );
}
