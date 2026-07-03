import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { InfoIcon } from "@/components/catalog/CatalogIcons";
import { infoStrip } from "@/lib/catalog";

export function InfoStrip() {
  return (
    <section className="border-t border-line bg-paper-2/40 py-14 sm:py-16">
      <Container>
        <Reveal className="mx-auto mb-10 max-w-xl text-center">
          <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-orange">
            <span className="h-1.5 w-1.5 rounded-full bg-orange" />
            Jaminan &amp; Layanan
          </span>
          <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
            Belanja ban dengan tenang
          </h2>
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {infoStrip.map((item, i) => (
            <Reveal key={item.title} delay={i * 80} className="h-full">
              <div className="beam group flex h-full flex-col gap-4 rounded-2xl bg-card p-6 shadow-[var(--shadow-soft)] ring-1 ring-inset ring-line/70 transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]">
                <span className="beam-line" aria-hidden />
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-orange to-orange-deep text-white shadow-[var(--shadow-orange)] transition-transform duration-300 group-hover:scale-105">
                  <InfoIcon name={item.icon} className="h-6 w-6" />
                </span>
                <div>
                  <h3 className="font-display text-base font-bold text-ink">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted text-pretty">
                    {item.sub}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
