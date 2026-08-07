import type { Metadata } from "next";
import { getClientsServer, getAboutPageServer, getSiteConfigServer } from "@/lib/payload";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { Clients } from "@/components/sections/Clients";
import { about } from "@/lib/content";

function renderHighlighted(title: string, highlight?: string[]) {
  if (!highlight || highlight.length === 0) return title;
  const escaped = highlight.map((h) => h.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
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

export const metadata: Metadata = {
  title: "Tentang Kami",
  description: about.hero.description,
};

export default async function AboutPage() {
  const [clientsData, aboutData, siteData] = await Promise.all([
    getClientsServer(),
    getAboutPageServer(),
    getSiteConfigServer(),
  ]);

  return (
    <>
      <Navbar items={siteData.nav} overHero />
      <main className="relative z-10 flex-1">
        <PageHero
          title={aboutData.title}
          image={aboutData.heroImage}
          video={aboutData.heroVideo}
        />

        {/* Section 1: Misi */}
        <section className="py-20 sm:py-28">
          <Container>
            <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
              {/* Text */}
              <Reveal className="order-2 lg:order-1">
                <h2 className="font-display text-3xl font-bold tracking-tight text-ink text-balance sm:text-4xl">
                  {renderHighlighted(aboutData.storyTitle, aboutData.storyTitleHighlight)}
                </h2>
                <div className="mt-4 space-y-4">
                  {aboutData.storyBody.map((p) => (
                    <p
                      key={p}
                      className="text-lg leading-relaxed text-muted text-pretty"
                    >
                      {p}
                    </p>
                  ))}
                </div>
                <div className="mt-6 h-1 w-16 rounded-full bg-orange" />
              </Reveal>

              {/* Media */}
              <Reveal delay={100} className="order-1 lg:order-2">
                <MediaFrame
                  src={aboutData.storyImage || about.story.image}
                  caption={about.story.eyebrow}
                  ratio="aspect-[4/3]"
                  className="shadow-(--shadow-soft)"
                />
              </Reveal>
            </div>
          </Container>
        </section>

        {/* Section 2: Trust / logo klien */}
        <Clients
          title={aboutData.trustTitle}
          highlight={aboutData.trustTitleHighlight}
          body={aboutData.trustBody}
          logos={clientsData.logos}
        />
      </main>
      <Footer siteData={siteData} />
    </>
  );
}
