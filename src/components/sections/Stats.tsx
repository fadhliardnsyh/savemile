import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { CountUp } from "@/components/ui/CountUp";
import { Icon, type IconName } from "@/components/ui/Icon";
import { stats } from "@/lib/content";

export function Stats() {
  return (
    <section className="relative z-10 overflow-hidden bg-dark py-20 text-paper sm:py-24">
      {/* texture + glow */}
      <div
        aria-hidden
        className="dotgrid absolute inset-0 text-white/5 [mask-image:radial-gradient(ellipse_80%_70%_at_50%_50%,black,transparent)]"
      />
      <div
        aria-hidden
        className="absolute -right-24 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-orange/15 blur-3xl"
      />
      <div
        aria-hidden
        className="absolute -left-24 bottom-0 h-64 w-64 rounded-full bg-orange/10 blur-3xl"
      />

      <Container className="relative">
        <div className="grid grid-cols-2 gap-y-12 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 90} className="group px-2 text-center">
              <div className="mx-auto mb-5 grid h-12 w-12 place-items-center rounded-xl bg-orange/10 text-orange ring-1 ring-inset ring-orange/20 transition-colors duration-300 group-hover:bg-orange group-hover:text-white group-hover:ring-orange">
                <Icon name={stat.icon as IconName} className="h-6 w-6" />
              </div>

              <CountUp
                value={stat.value}
                className="block font-display text-4xl font-extrabold tracking-tight text-orange tabular-nums sm:text-[3.25rem]"
              />

              <div className="mx-auto mt-2.5 max-w-[190px] text-sm leading-snug text-paper/60 text-pretty">
                {stat.label}
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
