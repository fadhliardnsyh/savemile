import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { site, tms } from "@/lib/content";

export function TmsHero() {
  const h = tms.hero;
  return (
    <section className="relative flex min-h-[88svh] items-center overflow-hidden bg-dark pt-28 pb-16 text-paper">
      {/* Background */}
      <div aria-hidden className="absolute inset-0">
        {h.image ? (
          <Image
            src={h.image}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-[center_60%]"
          />
        ) : (
          <>
            <div className="linegrid absolute inset-0 opacity-[0.14] [color:#fff]" />
            <Icon
              name="tire"
              className="absolute -right-16 top-1/2 h-[30rem] w-[30rem] -translate-y-1/2 text-white/[0.05]"
            />
          </>
        )}
        <div className="absolute -right-20 top-1/4 h-[30rem] w-[30rem] rounded-full bg-orange/15 blur-3xl" />
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/70 to-dark/45" />
        <div className="absolute inset-0 bg-gradient-to-r from-dark via-dark/60 to-transparent" />
      </div>

      <Container className="relative z-10">
        <div className="max-w-2xl">
          <span className="fade-up inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.16em] text-white backdrop-blur-md">
            <Icon name="route" className="h-3.5 w-3.5 text-orange" />
            {h.eyebrow}
          </span>

          <h1
            className="fade-up mt-6 font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-white text-balance sm:text-6xl"
            style={{ ["--d" as string]: "90ms" }}
          >
            {h.titleLead}
            <span className="text-orange">{h.titleAccent}</span>
          </h1>

          <p
            className="fade-up mt-6 max-w-xl text-lg leading-relaxed text-paper/70 text-pretty"
            style={{ ["--d" as string]: "180ms" }}
          >
            {h.description}
          </p>

          <div
            className="fade-up mt-9 flex flex-col items-start gap-3 sm:flex-row sm:items-center"
            style={{ ["--d" as string]: "270ms" }}
          >
            <Button href={site.whatsapp} variant="primary" size="lg" external>
              <Icon name="whatsapp" className="h-5 w-5" />
              {h.primary.label}
            </Button>
            <Link
              href={h.secondary.href}
              className="group inline-flex items-center gap-2 px-2 py-2 text-sm font-medium text-paper/70 transition-colors hover:text-white"
            >
              {h.secondary.label}
              <Icon name="arrow" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
