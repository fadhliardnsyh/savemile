import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";

/**
 * Hero standar untuk sub-halaman (About, Career, Contact, dll).
 * Tema gelap konsisten dengan hero halaman lain.
 */
export function PageHero({
  eyebrow,
  titleLead,
  titleAccent,
  description,
  image,
}: {
  eyebrow: string;
  titleLead: string;
  titleAccent: string;
  description?: string;
  image?: string;
}) {
  return (
    <section className="relative flex min-h-[52vh] items-end overflow-hidden bg-dark pt-28 pb-14 text-paper sm:min-h-[58vh] sm:pb-16">
      <div aria-hidden className="absolute inset-0">
        {image ? (
          <Image src={image} alt="" fill priority sizes="100vw" className="object-cover object-center" />
        ) : (
          <>
            <div className="linegrid absolute inset-0 opacity-[0.12] text-white" />
            <Icon
              name="tire"
              className="absolute -right-16 top-1/2 h-[26rem] w-[26rem] -translate-y-1/2 text-white/5"
            />
          </>
        )}
        <div className="absolute -left-24 top-0 h-80 w-80 rounded-full bg-orange/15 blur-3xl" />
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/70 to-dark/45" />
        <div className="absolute inset-0 bg-gradient-to-r from-dark/80 via-dark/40 to-transparent" />
      </div>

      <Container className="relative z-10">
        <span className="fade-up inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-white backdrop-blur-md">
          <span className="h-1.5 w-1.5 rounded-full bg-orange" />
          {eyebrow}
        </span>
        <h1
          className="fade-up mt-5 max-w-3xl font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-white text-balance sm:text-5xl"
          style={{ ["--d" as string]: "90ms" }}
        >
          {titleLead}
          <span className="text-orange">{titleAccent}</span>
        </h1>
        {description && (
          <p
            className="fade-up mt-5 max-w-xl text-lg leading-relaxed text-paper/70 text-pretty"
            style={{ ["--d" as string]: "180ms" }}
          >
            {description}
          </p>
        )}
      </Container>
    </section>
  );
}
