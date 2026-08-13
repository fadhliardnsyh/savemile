import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { Icon, type IconName } from "@/components/ui/Icon";
import { getContactPageServer, getSiteConfigServer } from "@/lib/payload";

function renderHighlighted(title: string, highlight?: string[]) {
  if (!highlight || highlight.length === 0) return title;
  const escaped = highlight.map((h) =>
    h.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
  );
  const parts = title.split(new RegExp(`(${escaped.join("|")})`, "gi"));
  let offset = 0;
  return parts.map((part) => {
    const key = `${part}-${offset}`;
    offset += part.length;
    return highlight.some((h) => h.toLowerCase() === part.toLowerCase()) ? (
      <span key={key} className="text-orange">
        {part}
      </span>
    ) : (
      part
    );
  });
}

export async function generateMetadata(): Promise<Metadata> {
  const contactData = await getContactPageServer();
  return {
    title: contactData.title || "Hubungi Kami",
    description: contactData.heroDescription,
  };
}

export default async function ContactPage() {
  const [contactData, siteData] = await Promise.all([
    getContactPageServer(),
    getSiteConfigServer(),
  ]);

  return (
    <>
      <Navbar items={siteData.nav} overHero />
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
                  {renderHighlighted(
                    contactData.helpTitle,
                    contactData.helpHighlight,
                  )}
                </h2>
              </Reveal>
              <Reveal delay={120}>
                <p className="mt-4 text-lg text-muted text-pretty">
                  {contactData.helpBody}
                </p>
              </Reveal>
            </div>

            <div className="mx-auto mt-12 max-w-4xl">
              {contactData.helpOptions.map((o, i) => (
                <Reveal key={o.title} delay={i * 90} className="h-full">
                  <div className="beam group relative flex h-full flex-col items-center text-center rounded-2xl bg-card p-8 sm:p-10 shadow-(--shadow-soft) ring-1 ring-inset ring-line/70 transition-all duration-300 hover:-translate-y-1 hover:shadow-(--shadow-lift)">
                    <span className="beam-line" aria-hidden />
                    <span className="grid h-14 w-14 place-items-center rounded-xl bg-linear-to-br from-orange to-orange-deep text-white shadow-(--shadow-orange)">
                      <Icon name={o.icon as IconName} className="h-7 w-7" />
                    </span>
                    <div className="mt-6 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-orange">
                      {o.tag}
                    </div>
                    <h3 className="mt-2 font-display text-2xl font-bold text-ink">
                      {o.title}
                    </h3>
                    <p className="mt-3 text-base leading-relaxed text-muted text-pretty">
                      {o.desc}
                    </p>
                    <div className="mt-8 flex justify-center w-full">
                      <Button
                        href={o.href}
                        variant={o.icon === "whatsapp" ? "wa" : "primary"}
                        size="lg"
                        external={o.external}
                        data-wa-location={
                          o.icon === "whatsapp"
                            ? `Contact Page - ${o.title}`
                            : undefined
                        }
                      >
                        <Icon
                          name={
                            o.icon === "whatsapp"
                              ? "whatsapp"
                              : (o.icon as IconName) || "mail"
                          }
                          className="h-5 w-5"
                        />
                        {o.actionLabel}
                      </Button>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* Info kontak */}
            {(() => {
              const alamatItem = contactData.infoItems.find(
                (info) =>
                  info.icon === "pin" ||
                  info.label.toLowerCase().includes("alamat") ||
                  info.label.toLowerCase().includes("address"),
              );
              const otherItems = contactData.infoItems.filter(
                (info) => info !== alamatItem,
              );
              const sortedItems = alamatItem
                ? [...otherItems, alamatItem]
                : contactData.infoItems;

              return (
                <div className="mx-auto mt-6 grid max-w-4xl gap-4 sm:grid-cols-2">
                  {sortedItems.map((info, i) => {
                    const isFullWidth =
                      (alamatItem && info === alamatItem) ||
                      (sortedItems.length % 2 !== 0 &&
                        i === sortedItems.length - 1);

                    const inner = (
                      <div className="flex h-full items-center gap-3 rounded-2xl border border-line bg-paper-2/40 p-4 transition-colors hover:border-orange/40">
                        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-orange/10 text-orange ring-1 ring-inset ring-orange/20">
                          <Icon
                            name={info.icon as IconName}
                            className="h-5 w-5"
                          />
                        </span>
                        <div className="min-w-0">
                          <div className="font-mono text-[10px] uppercase tracking-wider text-muted">
                            {info.label}
                          </div>
                          <div className="text-sm font-medium text-ink">
                            {info.value}
                          </div>
                        </div>
                      </div>
                    );
                    return (
                      <Reveal
                        key={info.label}
                        delay={i * 70}
                        className={isFullWidth ? "sm:col-span-2" : ""}
                      >
                        {info.href ? (
                          <Link href={info.href} className="block h-full">
                            {inner}
                          </Link>
                        ) : (
                          inner
                        )}
                      </Reveal>
                    );
                  })}
                </div>
              );
            })()}
          </Container>
        </section>
      </main>
      <Footer siteData={siteData} />
    </>
  );
}
