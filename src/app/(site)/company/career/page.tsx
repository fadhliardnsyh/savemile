import type { Metadata } from "next";
import { getCareerPageServer, getJobsServer, getSiteConfigServer } from "@/lib/payload";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Icon, type IconName } from "@/components/ui/Icon";
import { CtaSection } from "@/components/sections/CtaSection";
import { JobOpenings } from "@/components/sections/JobOpenings";

export async function generateMetadata(): Promise<Metadata> {
  const careerData = await getCareerPageServer();
  return {
    title: careerData.title || "Karir",
    description: careerData.heroDescription,
  };
}

export default async function CareerPage() {
  const [careerData, jobs, siteConfig] = await Promise.all([
    getCareerPageServer(),
    getJobsServer(),
    getSiteConfigServer(),
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
          <JobOpenings
            jobs={jobs}
            hrEmail={siteConfig.hrEmail}
            defaultCtaUrl={careerData.ctaActionUrl}
          />
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
