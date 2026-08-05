import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { Icon, type IconName } from "@/components/ui/Icon";
import { getContactPageServer } from "@/lib/payload";

export async function generateMetadata(): Promise<Metadata> {
  const contactData = await getContactPageServer();
  return {
    title: contactData.title || "Hubungi Kami",
    description: contactData.heroDescription,
  };
}

export default async function ContactPage() {
  const contactData = await getContactPageServer();

  return (
    <>
      <Navbar overHero />
      <main className="relative z-10 flex-1">
        <PageHero
          title={contactData.heroTitle}
          description={contactData.heroDescription}
          image={contactData.heroImage}
          video={contactData.heroVideo}
        />

        {/* Help options */}
        <section className="py-20 sm:py-28">
          <Container>
            <div className="mx-auto max-w-2xl text-center">
              <Reveal delay={60}>
                <h2 className="font-display text-4xl font-bold tracking-tight text-ink text-balance sm:text-5xl">
                  {contactData.helpTitle}
                </h2>
              </Reveal>
              <Reveal delay={120}>
                <p className="mt-4 text-lg text-muted text-pretty">
                  {contactData.helpBody}
                </p>
              </Reveal>
            </div>

            <div className="mx-auto mt-12 grid max-w-4xl gap-5 sm:grid-cols-2">
              {contactData.helpOptions.map((o, i) => (
                <Reveal key={o.title} delay={i * 90} className="h-full">
                  <div className="beam group relative flex h-full flex-col rounded-2xl bg-card p-7 shadow-(--shadow-soft) ring-1 ring-inset ring-line/70 transition-all duration-300 hover:-translate-y-1 hover:shadow-(--shadow-lift)">
                    <span className="beam-line" aria-hidden />
                    <span className="grid h-12 w-12 place-items-center rounded-xl bg-linear-to-br from-orange to-orange-deep text-white shadow-(--shadow-orange)">
                      <Icon name={o.icon as IconName} className="h-6 w-6" />
                    </span>
                    <div className="mt-5 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-orange">
                      {o.tag}
                    </div>
                    <h3 className="mt-2 font-display text-xl font-bold text-ink">
                      {o.title}
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-muted text-pretty">
                      {o.desc}
                    </p>
                    <div className="mt-6">
                      <Button
                        href={o.href}
                        variant={o.icon === "whatsapp" ? "wa" : "primary"}
                        size="md"
                        external={o.external}
                      >
                        <Icon
                          name={o.icon === "whatsapp" ? "whatsapp" : "mail"}
                          className="h-4 w-4"
                        />
                        {o.actionLabel}
                      </Button>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* Info kontak */}
            <div className="mx-auto mt-6 grid max-w-4xl gap-4 sm:grid-cols-3">
              {contactData.infoItems.map((info, i) => {
                const inner = (
                  <div className="flex items-center gap-3 rounded-2xl border border-line bg-paper-2/40 p-4 transition-colors hover:border-orange/40">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-orange/10 text-orange ring-1 ring-inset ring-orange/20">
                      <Icon name={info.icon as IconName} className="h-5 w-5" />
                    </span>
                    <div className="min-w-0">
                      <div className="font-mono text-[10px] uppercase tracking-wider text-muted">
                        {info.label}
                      </div>
                      <div className="truncate text-sm font-medium text-ink">
                        {info.value}
                      </div>
                    </div>
                  </div>
                );
                return (
                  <Reveal key={info.label} delay={i * 70}>
                    {info.href ? (
                      <Link href={info.href}>{inner}</Link>
                    ) : (
                      inner
                    )}
                  </Reveal>
                );
              })}
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
