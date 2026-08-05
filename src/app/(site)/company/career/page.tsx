import type { Metadata } from "next";
import { getCareerPageServer, getJobsServer } from "@/lib/payload";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Icon, type IconName } from "@/components/ui/Icon";
import { CtaSection } from "@/components/sections/CtaSection";
import { Button } from "@/components/ui/Button";

export async function generateMetadata(): Promise<Metadata> {
  const careerData = await getCareerPageServer();
  return {
    title: careerData.title || "Karir",
    description: careerData.heroDescription,
  };
}

export default async function CareerPage() {
  const [careerData, jobs] = await Promise.all([
    getCareerPageServer(),
    getJobsServer(),
  ]);

  return (
    <>
      <Navbar overHero />
      <main className="relative z-10 flex-1">
        <PageHero
          title={careerData.heroTitle}
          description={careerData.heroDescription}
          image={careerData.heroImage}
          video={careerData.heroVideo}
        />

        {/* Values */}
        <section className="py-20 sm:py-28">
          <Container>
            <div className="mx-auto max-w-2xl text-center">
              <Reveal delay={60}>
                <h2 className="font-display text-4xl font-bold tracking-tight text-ink text-balance sm:text-5xl">
                  {careerData.valuesTitleHighlight && careerData.valuesTitle.includes(careerData.valuesTitleHighlight) ? (
                    <>
                      {careerData.valuesTitle.split(careerData.valuesTitleHighlight)[0]}
                      <span className="text-orange">{careerData.valuesTitleHighlight}</span>
                      {careerData.valuesTitle.split(careerData.valuesTitleHighlight)[1]}
                    </>
                  ) : (
                    careerData.valuesTitle
                  )}
                </h2>
              </Reveal>
              <Reveal delay={120}>
                <p className="mt-4 text-lg text-muted text-pretty">
                  {careerData.valuesBody}
                </p>
              </Reveal>
            </div>

            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {careerData.valuesItems.map((v, i) => (
                <Reveal key={v.title} delay={(i % 3) * 80}>
                  <div className="beam group relative h-full rounded-2xl bg-card p-7 shadow-(--shadow-soft) ring-1 ring-inset ring-line/70 transition-all duration-300 hover:-translate-y-1 hover:shadow-(--shadow-lift)">
                    <span className="beam-line" aria-hidden />
                    <div className="grid h-12 w-12 place-items-center rounded-xl bg-orange/10 text-orange ring-1 ring-inset ring-orange/20 transition-colors duration-300 group-hover:bg-orange group-hover:text-white group-hover:ring-orange">
                      <Icon name={v.icon as IconName} className="h-6 w-6" />
                    </div>
                    <h3 className="mt-5 font-display text-lg font-bold text-ink">
                      {v.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted text-pretty">
                      {v.desc}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>

        {/* Job Openings Section */}
        {jobs.length > 0 && (
          <section className="border-t border-line/60 bg-paper/40 py-20 sm:py-28">
            <Container>
              <div className="mx-auto max-w-2xl text-center">
                <Reveal delay={60}>
                  <span className="text-xs font-bold tracking-widest text-orange uppercase">
                    Lowongan Kerja
                  </span>
                  <h2 className="mt-2 font-display text-4xl font-bold tracking-tight text-ink text-balance sm:text-5xl">
                    Posisi yang sedang <span className="text-orange">terbuka</span>
                  </h2>
                </Reveal>
                <Reveal delay={120}>
                  <p className="mt-4 text-muted">
                    Mari bergabung dan berkembang bersama tim SaveMile.
                  </p>
                </Reveal>
              </div>

              <div className="mt-12 mx-auto max-w-3xl space-y-4">
                {jobs.map((job, index) => (
                  <Reveal key={job.id} delay={index * 80}>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 rounded-2xl bg-card p-6 shadow-(--shadow-soft) ring-1 ring-inset ring-line/70 transition-all duration-300 hover:shadow-(--shadow-lift)">
                      <div className="space-y-1.5">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="rounded-full bg-orange/10 px-3 py-0.5 text-xs font-semibold text-orange">
                            {job.department}
                          </span>
                          <span className="rounded-full bg-paper-2 px-3 py-0.5 text-xs font-medium text-muted">
                            {job.type}
                          </span>
                        </div>
                        <h3 className="font-display text-xl font-bold text-ink">
                          {job.title}
                        </h3>
                        <p className="text-xs text-muted flex items-center gap-1">
                          <Icon name="route" className="h-3.5 w-3.5" />
                          {job.location}
                        </p>
                        {job.description && (
                          <p className="mt-2 text-sm text-muted leading-relaxed">
                            {job.description}
                          </p>
                        )}
                      </div>
                      <div className="shrink-0">
                        <Button
                          href={job.applyUrl || careerData.ctaActionUrl}
                          variant="primary"
                          size="md"
                        >
                          Lamar Sekarang
                        </Button>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </Container>
          </section>
        )}

        {/* Join CTA */}
        <CtaSection
          content={{
            eyebrow: "Gabung Tim",
            titleLead: careerData.ctaTitleHighlight && careerData.ctaTitle.includes(careerData.ctaTitleHighlight)
              ? careerData.ctaTitle.split(careerData.ctaTitleHighlight)[0]
              : careerData.ctaTitle,
            titleAccent: careerData.ctaTitleHighlight && careerData.ctaTitle.includes(careerData.ctaTitleHighlight)
              ? careerData.ctaTitleHighlight
              : "",
            description: careerData.ctaDescription,
            whatsappLabel: careerData.ctaActionText,
          }}
          showPhone={false}
          action={{
            label: careerData.ctaActionText,
            href: careerData.ctaActionUrl,
          }}
        />
      </main>
      <Footer />
    </>
  );
}
