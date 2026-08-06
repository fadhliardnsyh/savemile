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
            <p className="mt-4 text-lg text-muted text-pretty">
              {h.description}
            </p>
          </Reveal>
        </div>

        <div className="relative mt-16">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-12 hidden lg:block"
          >
            <div className="mx-[8.33%] border-t-2 border-dashed border-line" />
          </div>

          <div className="grid gap-x-4 gap-y-10 sm:grid-cols-2 lg:grid-cols-6">
            {h.steps.map((step, i) => (
              <Reveal
                key={step.title}
                delay={i * 80}
                className="relative flex flex-col items-center text-center"
              >
                <span className="relative z-10 grid h-24 w-24 place-items-center rounded-full bg-card text-orange ring-2 ring-orange/30">
                  <Icon name={step.icon} className="h-12 w-12" />
                </span>
                <h3 className="mt-5 font-display text-base font-bold text-ink text-balance sm:text-lg">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted text-pretty">
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
