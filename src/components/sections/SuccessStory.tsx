import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";
import { successStory, type Story } from "@/lib/content";
import { getSuccessStoriesServer } from "@/lib/payload";

export async function SuccessStory({
  items,
}: {
  items?: Story[];
} = {}) {
  const stories = items && items.length > 0 ? items : await getSuccessStoriesServer();
  const [featured, ...rest] = stories.length > 0 ? stories : successStory.items;

  if (!featured) {
    return null;
  }

  return (
    <section id="success-story" className="scroll-mt-24 py-20 sm:py-28">
      <Container>
        {/* Header */}
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <Reveal delay={60}>
              <h2 className="font-display text-4xl font-bold tracking-tight text-ink text-balance sm:text-5xl">
                Terbukti di{" "}
                <span className="text-orange">{successStory.accent}</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={120}>
            <Link
              href={successStory.viewAll.href}
              className="group inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted transition-colors hover:text-orange"
            >
              {successStory.viewAll.label}
              <Icon
                name="arrow"
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
              />
            </Link>
          </Reveal>
        </div>

        {/* Grid: 1 besar + 2 kecil */}
        <div className="mt-10 grid gap-5 lg:grid-cols-[1.6fr_1fr]">
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
  );
}

export function StoryCard({
  story,
  featured,
}: {
  story: Story;
  featured?: boolean;
}) {
  return (
    <Link
      href={story.href}
      className="beam group relative flex h-full flex-col justify-end rounded-card bg-dark ring-1 ring-inset ring-ink/10"
      style={{ minHeight: featured ? 440 : 205 }}
    >
      <span className="beam-line" aria-hidden />

      {/* Background (di-clip terpisah agar beam tidak terpotong) */}
      <div className="absolute inset-0 overflow-hidden rounded-card">
        {story.image ? (
          <Image
            src={story.image}
            alt=""
            fill
            sizes={
              featured
                ? "(max-width:1024px) 100vw, 60vw"
                : "(max-width:1024px) 50vw, 33vw"
            }
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        ) : (
          <div
            aria-hidden
            className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105"
          >
            <div className="absolute inset-0 bg-linear-to-br from-dark-2 to-dark" />
            <div className="absolute -right-10 top-0 h-64 w-64 rounded-full bg-orange/15 blur-3xl" />
            <Icon
              name="truck"
              className="absolute -right-6 bottom-2 h-40 w-40 text-white/6"
            />
          </div>
        )}
        <div className="absolute inset-0 bg-linear-to-t from-dark via-dark/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 p-6 sm:p-7">
        <span className="font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-orange">
          Success Story · {story.tag}
        </span>
        <h3
          className={
            "mt-2.5 font-display font-bold leading-snug text-white text-balance " +
            (featured ? "text-2xl sm:text-[26px]" : "text-lg")
          }
        >
          {story.title}
        </h3>
        {featured && (
          <p className="mt-3 max-w-lg text-sm leading-relaxed text-white/60 text-pretty">
            {story.description}
          </p>
        )}
        <span className="mt-4 inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-orange">
          {featured ? "Read case study" : "Read more"}
          <Icon
            name="arrow"
            className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1"
          />
        </span>
      </div>
    </Link>
  );
}
