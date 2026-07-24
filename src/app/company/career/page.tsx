import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Icon, type IconName } from "@/components/ui/Icon";
import { CtaSection } from "@/components/sections/CtaSection";
import { career } from "@/lib/content";

export const metadata: Metadata = {
  title: "Karier",
  description: career.hero.description,
};

export default function CareerPage() {
  return (
    <>
      <Navbar overHero />
      <main className="relative z-10 flex-1">
        <PageHero
          eyebrow={career.hero.eyebrow}
          titleLead={career.hero.titleLead}
          titleAccent={career.hero.titleAccent}
          description={career.hero.description}
        />

        {/* Values */}
        <section className="py-20 sm:py-28">
          <Container>
            <div className="mx-auto max-w-2xl text-center">
              <Reveal delay={60}>
                <h2 className="font-display text-4xl font-bold tracking-tight text-ink text-balance sm:text-5xl">
                  {career.values.title}
                </h2>
              </Reveal>
              <Reveal delay={120}>
                <p className="mt-4 text-lg text-muted text-pretty">{career.values.body}</p>
              </Reveal>
            </div>

            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {career.values.items.map((v, i) => (
                <Reveal key={v.title} delay={(i % 3) * 80}>
                  <div className="beam group relative h-full rounded-2xl bg-card p-7 shadow-[var(--shadow-soft)] ring-1 ring-inset ring-line/70 transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]">
                    <span className="beam-line" aria-hidden />
                    <div className="grid h-12 w-12 place-items-center rounded-xl bg-orange/10 text-orange ring-1 ring-inset ring-orange/20 transition-colors duration-300 group-hover:bg-orange group-hover:text-white group-hover:ring-orange">
                      <Icon name={v.icon as IconName} className="h-6 w-6" />
                    </div>
                    <h3 className="mt-5 font-display text-lg font-bold text-ink">{v.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted text-pretty">{v.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>

        {/* Join — pakai CtaSection standar (konsisten) */}
        <CtaSection content={career.join} showPhone={false} action={career.join.action} />
      </main>
      <Footer />
    </>
  );
}
