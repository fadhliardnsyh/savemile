import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";
import { tms } from "@/lib/content";
import { cn } from "@/lib/cn";

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

        <div className="mt-16 flex flex-col gap-16 sm:gap-24">
          {f.items.map((item, i) => {
            const flip = i % 2 === 1;
            return (
              <div key={item.tag} className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
                {/* Visual */}
                <Reveal className={cn("order-1", flip ? "lg:order-2" : "lg:order-1")}>
                  <div className="relative aspect-[4/3] overflow-hidden rounded-[24px] bg-dark ring-1 ring-inset ring-ink/10">
                    <div className="absolute inset-0 bg-gradient-to-br from-dark-2 to-dark" />
                    <div className="absolute -right-10 top-0 h-64 w-64 rounded-full bg-orange/15 blur-3xl" />
                    <Icon
                      name={item.icon}
                      className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 text-white/[0.07]"
                    />
                    {/* Stat badge (glass) */}
                    <div className="absolute bottom-6 left-6 max-w-[15rem] rounded-2xl bg-white/10 p-4 backdrop-blur-md">
                      <div className="font-mono text-[10px] uppercase tracking-wider text-white/50">
                        {item.stat.label}
                      </div>
                      <div className="mt-1 font-display text-2xl font-extrabold text-orange">
                        {item.stat.value}
                      </div>
                      <div className="mt-0.5 text-[11px] text-white/45">{item.stat.sub}</div>
                    </div>
                  </div>
                </Reveal>

                {/* Content */}
                <Reveal delay={100} className={cn("order-2", flip ? "lg:order-1" : "lg:order-2")}>
                  <div className="grid h-13 w-13 place-items-center rounded-2xl bg-gradient-to-br from-orange to-orange-deep text-white shadow-[var(--shadow-orange)]">
                    <Icon name={item.icon} className="h-6 w-6" />
                  </div>
                  <div className="mt-5 font-mono text-[11px] font-bold uppercase tracking-[0.1em] text-orange">
                    {item.tag}
                  </div>
                  <h3 className="mt-3 font-display text-2xl font-bold leading-tight tracking-tight text-ink text-balance sm:text-3xl">
                    {item.title}
                  </h3>
                  <div className="mt-1.5 font-mono text-[11px] font-semibold uppercase tracking-wider text-muted">
                    {item.product}
                  </div>
                  <p className="mt-4 leading-relaxed text-muted text-pretty">{item.desc}</p>
                  <ul className="mt-5 flex flex-col gap-3">
                    {item.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-3 text-sm text-ink-soft">
                        <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-md bg-orange/10 text-orange ring-1 ring-inset ring-orange/20">
                          <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth={3} aria-hidden>
                            <path d="m5 12 4 4 10-10" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </span>
                        {b}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
