import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { clients } from "@/lib/content";

export function Clients() {
  const logos = [...clients.logos, ...clients.logos];
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-2xl font-bold tracking-tight text-ink text-balance sm:text-3xl">
            {clients.title}
          </h2>
          <p className="mt-3 text-muted text-pretty">{clients.body}</p>
        </Reveal>
      </Container>

      <div className="relative mt-10 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="animate-marquee flex w-max items-center gap-4 pr-4">
          {logos.map((name, i) => (
            <div
              key={i}
              className="flex h-16 min-w-[150px] items-center justify-center rounded-xl border border-line bg-card px-6"
            >
              <span className="font-display text-lg font-semibold text-ink/40 whitespace-nowrap">
                {name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
