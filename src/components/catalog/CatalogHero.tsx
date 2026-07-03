import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { catalogHero } from "@/lib/catalog";

export function CatalogHero() {
  const crumbs = catalogHero.breadcrumb;
  return (
    <section className="relative flex min-h-[62vh] items-end overflow-hidden bg-dark pt-24 pb-14 text-paper sm:min-h-[70vh]">
      {/* Background */}
      <div aria-hidden className="absolute inset-0">
        {catalogHero.image ? (
          <Image
            src={catalogHero.image}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        ) : (
          <div className="absolute inset-0 bg-dark">
            <div className="linegrid absolute inset-0 opacity-[0.14] [color:#fff]" />
            <Icon
              name="tire"
              className="absolute -right-16 top-1/2 h-[26rem] w-[26rem] -translate-y-1/2 text-white/5"
            />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/70 to-dark/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-dark/75 via-dark/25 to-transparent" />
        <div className="absolute -left-24 bottom-0 h-80 w-80 rounded-full bg-orange/15 blur-3xl" />
      </div>

      <Container className="relative z-10">
        {/* Breadcrumb */}
        <nav className="mb-5 flex flex-wrap items-center gap-2 text-xs">
          {crumbs.map((c, i) => {
            const last = i === crumbs.length - 1;
            const isHome = i === 0;
            return (
              <span key={c} className="flex items-center gap-2">
                {isHome ? (
                  <Link href="/" className="text-paper/45 transition-colors hover:text-orange">
                    {c}
                  </Link>
                ) : (
                  <span className={last ? "text-paper/80" : "text-paper/45"}>{c}</span>
                )}
                {!last && <span className="text-paper/25">/</span>}
              </span>
            );
          })}
        </nav>

        <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-white backdrop-blur-md">
          <span className="h-1.5 w-1.5 rounded-full bg-orange" />
          {catalogHero.eyebrow}
        </span>

        <h1 className="max-w-2xl font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-white text-balance sm:text-5xl">
          Ban <span className="text-orange">{catalogHero.accent}</span> &amp;
          Kendaraan Niaga
        </h1>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-paper/60 text-pretty">
          {catalogHero.description}
        </p>
      </Container>
    </section>
  );
}
