import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { catalogHero } from "@/lib/catalog";

interface CatalogHeroProps {
  data?: {
    eyebrow?: string;
    title?: string;
    description?: string;
    heroImage?: string;
    heroVideo?: string;
  };
}

export function CatalogHero({ data }: CatalogHeroProps) {
  const heroVideo = data?.heroVideo;
  const bgImage = data?.heroImage || (!heroVideo ? catalogHero.image : undefined);
  const eyebrowText = data?.eyebrow || catalogHero.eyebrow;
  const titleText = data?.title || catalogHero.title;
  const descriptionText = data?.description || catalogHero.description;

  return (
    <section className="relative flex min-h-[62vh] items-end overflow-hidden bg-dark pt-24 pb-14 text-paper sm:min-h-[70vh]">
      {/* Background */}
      <div aria-hidden className="absolute inset-0">
        {heroVideo ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            className="h-full w-full object-cover"
          >
            <source src={heroVideo} />
          </video>
        ) : bgImage ? (
          <Image
            src={bgImage}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        ) : (
          <div className="absolute inset-0 bg-dark">
            <div className="linegrid absolute inset-0 opacity-[0.14] text-white" />
            <Icon
              name="tire"
              className="absolute -right-16 top-1/2 h-104 w-104 -translate-y-1/2 text-white/5"
            />
          </div>
        )}
        <div className="absolute inset-0 bg-linear-to-t from-dark via-dark/70 to-dark/40" />
        <div className="absolute inset-0 bg-linear-to-r from-dark/75 via-dark/25 to-transparent" />
        <div className="absolute -left-24 bottom-0 h-80 w-80 rounded-full bg-orange/15 blur-3xl" />
      </div>

      <Container className="relative z-10">
        {eyebrowText && (
          <span className="mb-3 inline-flex items-center rounded-full bg-orange/10 px-3.5 py-1.5 font-mono text-xs font-semibold uppercase tracking-wider text-orange ring-1 ring-inset ring-orange/20">
            {eyebrowText}
          </span>
        )}
        <h1 className="max-w-2xl font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-white text-balance sm:text-5xl">
          {titleText}
        </h1>
        {descriptionText && (
          <p className="mt-4 max-w-xl text-base text-white/80 leading-relaxed">
            {descriptionText}
          </p>
        )}
      </Container>
    </section>
  );
}
