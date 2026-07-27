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

        {/* Workflow: node bernomor terhubung garis alur */}
        <div className="relative mt-16">
          {/* garis alur horizontal (desktop) */}
          <div aria-hidden className="pointer-events-none absolute inset-x-0 top-8 hidden lg:block">
            <div className="mx-[8.33%] border-t-2 border-dashed border-line" />
          </div>

          <div className="grid gap-x-4 gap-y-10 sm:grid-cols-2 lg:grid-cols-6">
            {h.steps.map((step, i) => (
              <Reveal key={step.title} delay={i * 80} className="relative flex flex-col items-center text-center">
                <span className="relative z-10 grid h-16 w-16 place-items-center rounded-full bg-card text-orange ring-2 ring-orange/30 shadow-[var(--shadow-soft)]">
                  <Icon name={step.icon} className="h-7 w-7" />
                  <span className="absolute -right-1 -top-1 grid h-6 w-6 place-items-center rounded-full bg-orange text-[11px] font-bold text-white ring-2 ring-paper">
                    {i + 1}
                  </span>
                </span>
                <h3 className="mt-4 font-display text-base font-bold text-ink text-balance">
                  {step.title}
                </h3>
                <p className="mt-1.5 text-sm leading-snug text-muted text-pretty">
                  {step.desc}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
