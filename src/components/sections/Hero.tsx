import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { hero } from "@/lib/content";

export function Hero() {
  return (
    <section className="relative flex min-h-svh items-center overflow-hidden bg-dark pt-28 pb-16 text-paper">
      {/* Background photo (Ban + Sistem + Truk) atau fallback gelap */}
      <div aria-hidden className="absolute inset-0">
        {hero.image ? (
          <Image
            src={hero.image}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        ) : (
          <HeroFallback />
        )}
        {/* Overlay untuk keterbacaan teks */}
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/75 to-dark/65" />
        <div className="absolute inset-0 bg-dark/35" />
      </div>

      <Container className="relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          <span
            className="fade-up inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 font-mono text-xs uppercase tracking-[0.16em] text-white backdrop-blur-md"
            style={{ ["--d" as string]: "0ms" }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-orange" />
            {hero.eyebrow}
          </span>

          <h1
            className="fade-up mt-6 font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-white text-balance sm:text-6xl"
            style={{ ["--d" as string]: "90ms" }}
          >
            Pilih ban yang{" "}
            <span className="whitespace-nowrap">
              <span className="glow-breathe relative inline-block text-orange">
                tepat
                <svg
                  aria-hidden
                  viewBox="0 0 200 12"
                  className="absolute -bottom-1 left-0 h-2.5 w-full text-orange"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M2 8C40 3 160 3 198 7"
                    stroke="currentColor"
                    strokeWidth="3"
                    fill="none"
                    strokeLinecap="round"
                  />
                </svg>
              </span>,
            </span>{" "}
            kelola lebih{" "}
            <span className="glow-breathe text-orange [animation-delay:1.4s]">
              cerdas.
            </span>
          </h1>

          <p
            className="fade-up mx-auto mt-6 max-w-xl text-lg leading-relaxed text-paper/80 text-pretty"
            style={{ ["--d" as string]: "180ms" }}
          >
            {hero.description}
          </p>

          {/* Tire finder */}
          <div
            className="fade-up mx-auto mt-11 max-w-2xl"
            style={{ ["--d" as string]: "270ms" }}
          >
            <p className="mb-4 text-center font-mono text-[11px] uppercase tracking-[0.2em] text-white/50">
              {hero.finder.label}
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <FinderCard
                href={hero.finder.byVehicle.href}
                icon="truck"
                label={hero.finder.byVehicle.label}
                sub={hero.finder.byVehicle.sub}
              />
              <FinderCard
                href={hero.finder.bySize.href}
                icon="ruler"
                label={hero.finder.bySize.label}
                sub={hero.finder.bySize.sub}
              />
            </div>
          </div>
        </div>
      </Container>

      {/* Scroll hint */}
      <div className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-paper/50 sm:flex">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em]">Scroll</span>
        <span className="h-8 w-px animate-pulse bg-paper/30" />
      </div>
    </section>
  );
}

/** Fallback gelap bertekstur saat foto hero belum diunggah. */
function HeroFallback() {
  return (
    <div className="absolute inset-0 bg-dark">
      <div
        className="linegrid absolute inset-0 opacity-[0.15]"
        style={{ color: "#fff" }}
      />
      <div className="absolute -right-24 top-1/4 h-96 w-96 rounded-full bg-orange/20 blur-3xl" />
      <div className="absolute left-1/3 bottom-0 h-72 w-72 rounded-full bg-orange/10 blur-3xl" />
      {/* Big faint tire motif */}
      <Icon
        name="tire"
        className="absolute -right-10 top-1/2 h-[28rem] w-[28rem] -translate-y-1/2 text-white/5"
      />
      {/* Hint badge */}
      <div className="absolute bottom-6 right-6 hidden items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-white/50 sm:flex">
        <Icon name="truck" className="h-3.5 w-3.5" />
        Taruh foto di /assets/images/hero.jpg
      </div>
    </div>
  );
}

function FinderCard({
  href,
  icon,
  label,
  sub,
}: {
  href: string;
  icon: "truck" | "ruler";
  label: string;
  sub: string;
}) {
  return (
    <Link
      href={href}
      className="beam group flex items-center gap-4 rounded-[20px] bg-white/10 p-4 backdrop-blur-md transition-colors duration-200 hover:bg-white/[0.16] sm:p-5"
    >
      <span className="beam-line" aria-hidden />
      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-orange text-white shadow-[0_10px_22px_-6px_rgba(241,90,36,0.85)]">
        <Icon name={icon} className="h-6 w-6" />
      </span>
      <span className="min-w-0 flex-1 text-left">
        <span className="block text-[15px] font-semibold text-white">{label}</span>
        <span className="mt-0.5 block truncate text-xs text-white/55">{sub}</span>
      </span>
      <Icon
        name="arrow"
        className="h-4 w-4 shrink-0 text-white/55 transition-transform group-hover:translate-x-1"
      />
    </Link>
  );
}
