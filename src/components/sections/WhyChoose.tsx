import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { Icon } from "@/components/ui/Icon";
import { whyChoose } from "@/lib/content";
import { cn } from "@/lib/cn";

export function WhyChoose() {
  return (
    <section id="kenapa-savemile" className="scroll-mt-24 py-20 sm:py-28">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <Reveal className="flex justify-center">
            <SectionLabel>Kenapa SaveMile</SectionLabel>
          </Reveal>
          <Reveal delay={60}>
            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-ink text-balance sm:text-4xl">
              {whyChoose.title}
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="mt-4 text-lg text-muted text-pretty">{whyChoose.body}</p>
          </Reveal>
        </div>

        <div className="mt-16 flex flex-col gap-16 sm:gap-24">
          {whyChoose.items.map((item, i) => {
            const flip = i % 2 === 1;
            return (
              <div
                key={item.tag}
                className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16"
              >
                {/* Text */}
                <Reveal className={cn("order-2", flip ? "lg:order-2" : "lg:order-1")}>
                  <span className="inline-flex items-center gap-2 rounded-full bg-orange-soft px-3 py-1 font-mono text-xs uppercase tracking-wider text-orange-deep">
                    <span className="grid h-5 w-5 place-items-center">
                      <Icon name={item.icon} className="h-4 w-4" />
                    </span>
                    {item.tag}
                  </span>
                  <h3 className="mt-4 font-display text-2xl font-bold leading-tight tracking-tight text-ink text-balance sm:text-3xl">
                    {item.title}
                  </h3>
                  <p className="mt-4 text-lg leading-relaxed text-muted text-pretty">
                    {item.body}
                  </p>
                  <div className="mt-5 h-1 w-16 rounded-full bg-orange" />
                </Reveal>

                {/* Media */}
                <Reveal
                  delay={100}
                  className={cn("order-1", flip ? "lg:order-1" : "lg:order-2")}
                >
                  <MediaFrame
                    src={item.image}
                    icon={item.icon}
                    caption={item.tag}
                    ratio="aspect-[4/3]"
                    className="shadow-[var(--shadow-soft)]"
                  />
                </Reveal>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
