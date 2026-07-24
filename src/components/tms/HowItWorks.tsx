import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";
import { tms } from "@/lib/content";

export function HowItWorks() {
  const h = tms.how;
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <Reveal delay={60}>
            <h2 className="font-display text-4xl font-bold tracking-tight text-ink text-balance sm:text-5xl">
              {h.titleLead}
              <span className="text-orange">{h.titleAccent}</span>
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="mt-4 text-lg text-muted text-pretty">{h.description}</p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {h.steps.map((step, i) => (
            <Reveal key={step.title} delay={i * 90} className="relative h-full">
              {/* Konektor flow (desktop) */}
              {i < h.steps.length - 1 && (
                <span
                  aria-hidden
                  className="absolute right-0 top-[3.1rem] z-10 hidden -translate-y-1/2 translate-x-1/2 lg:block"
                >
                  <span className="grid h-7 w-7 place-items-center rounded-full border border-line bg-paper text-orange shadow-[var(--shadow-soft)]">
                    <Icon name="arrow" className="h-3.5 w-3.5" />
                  </span>
                </span>
              )}
              <div className="beam group relative flex h-full flex-col overflow-hidden rounded-2xl bg-card p-6 shadow-[var(--shadow-soft)] ring-1 ring-inset ring-line/70 transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]">
                <span className="beam-line" aria-hidden />
                {/* Nomor watermark */}
                <span className="pointer-events-none absolute -right-1 -top-3 select-none font-display text-7xl font-extrabold leading-none text-orange/10">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="relative">
                  <div className="grid h-13 w-13 place-items-center rounded-2xl bg-gradient-to-br from-orange to-orange-deep text-white shadow-[var(--shadow-orange)] transition-transform duration-300 group-hover:scale-105">
                    <Icon name={step.icon} className="h-6 w-6" />
                  </div>
                  <div className="mt-5 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-orange">
                    {step.tag}
                  </div>
                  <h3 className="mt-2 font-display text-lg font-bold text-ink">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted text-pretty">
                    {step.desc}
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
