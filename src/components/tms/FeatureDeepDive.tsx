import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";
import { tms } from "@/lib/content";

export function FeatureDeepDive() {
  const f = tms.features;
  return (
    <section id="fitur" className="scroll-mt-20 py-20 sm:py-28">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <Reveal delay={60}>
            <h2 className="font-display text-4xl font-bold tracking-tight text-ink text-balance sm:text-5xl">
              {f.titleLead}
              <span className="text-orange">{f.titleAccent}</span>
            </h2>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {f.items.map((item, i) => (
            <Reveal key={item.title} delay={(i % 2) * 90} className="h-full">
              <div className="beam group relative flex h-full flex-col rounded-2xl bg-card p-7 shadow-(--shadow-soft) ring-1 ring-inset ring-line/70 transition-all duration-300 hover:-translate-y-1 hover:shadow-(--shadow-lift) sm:p-8">
                <span className="beam-line" aria-hidden />
                <div className="grid h-13 w-13 place-items-center rounded-2xl bg-linear-to-br from-orange to-orange-deep text-white shadow-(--shadow-orange) transition-transform duration-300 group-hover:scale-105">
                  <Icon name={item.icon} className="h-6 w-6" />
                </div>
                <h3 className="mt-5 font-display text-xl font-bold leading-snug text-ink text-balance">
                  {item.title}
                </h3>
                <p className="mt-3 leading-relaxed text-muted text-pretty">
                  {item.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
