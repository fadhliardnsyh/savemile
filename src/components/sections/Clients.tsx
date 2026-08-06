import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { clients } from "@/lib/content";

export type ClientLogoProp = string | { name: string; src: string };

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

export function Clients({
  title,
  highlight,
  body,
  logos,
}: {
  title?: string;
  highlight?: string[];
  body?: string;
  logos?: ClientLogoProp[];
} = {}) {
  const activeLogos = logos && logos.length > 0 ? logos : clients.logos;

  const logoItems = [
    ...activeLogos,
    ...activeLogos,
    ...activeLogos,
    ...activeLogos,
  ].map((logo, index) => ({
    logo,
    id: `set-${index}-${typeof logo === "string" ? logo : logo.name}`,
  }));

  return (
    <section className="relative z-10 pt-16 pb-10 sm:pt-20 sm:pb-12">
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold tracking-tight text-ink text-balance sm:text-4xl">
            {renderHighlighted(
              title ?? clients.title,
              highlight ?? clients.highlight,
            )}
          </h2>
          <p className="mt-3 text-muted text-pretty">{body ?? clients.body}</p>
        </Reveal>
      </Container>

      <div className="relative mt-10 overflow-hidden mask-[linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="animate-marquee flex w-max items-center gap-4 pr-4">
          {logoItems.map(({ logo, id }) => (
            <div
              key={id}
              className="flex h-16 min-w-37.5 items-center justify-center rounded-xl border border-line bg-card px-6"
            >
              {typeof logo === "string" ? (
                <span className="font-display text-lg font-semibold text-ink/40 whitespace-nowrap">
                  {logo}
                </span>
              ) : (
                <div className="relative h-10 w-32 shrink-0">
                  <Image
                    src={logo.src}
                    alt={logo.name}
                    fill
                    sizes="128px"
                    className="object-contain opacity-70 transition-all hover:opacity-100"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
