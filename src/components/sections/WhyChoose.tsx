import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { Icon } from "@/components/ui/Icon";
import { whyChoose } from "@/lib/content";
import { cn } from "@/lib/cn";

/** Render judul dengan kata/frasa tertentu diberi aksen oranye. */
function renderHighlighted(title: string, highlight?: string[]) {
  if (!highlight || highlight.length === 0) return title;
  const escaped = highlight.map((h) => h.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  const parts = title.split(new RegExp(`(${escaped.join("|")})`, "gi"));
  let offset = 0;
  return parts.map((part) => {
    const key = `${part}-${offset}`;
    offset += part.length;
    return highlight.some((h) => h.toLowerCase() === part.toLowerCase()) ? (
      <span key={key} className="text-orange">
        {part}
      </span>
    ) : (
      part
    );
  });
}

export interface WhyChooseItemData {
  tag?: string;
  title?: string;
  highlight?: string[];
  body?: string;
  icon?: "consult" | "laser" | "bell" | "shield";
  image?: string;
}

interface WhyChooseProps {
  data?: {
    whyChooseTitle?: string;
    whyChooseBody?: string;
    whyChooseItems?: WhyChooseItemData[];
  };
}

export function WhyChoose({ data }: WhyChooseProps) {
  const body = data?.whyChooseBody || whyChoose.body;
  const items = data?.whyChooseItems && data.whyChooseItems.length > 0
    ? data.whyChooseItems.map((item, idx) => {
        const fallbackItem = whyChoose.items[idx] || whyChoose.items[0];
        return {
          tag: item.tag || fallbackItem.tag,
          title: item.title || fallbackItem.title,
          highlight: item.highlight ?? fallbackItem.highlight,
          body: item.body || fallbackItem.body,
          icon: item.icon || fallbackItem.icon,
          image: item.image || fallbackItem.image,
        };
      })
    : whyChoose.items;

  return (
    <section id="kenapa-savemile" className="scroll-mt-24 py-20 sm:py-28">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <Reveal delay={60}>
            <h2 className="font-display text-4xl font-bold tracking-tight text-ink text-balance sm:text-5xl">
              {data?.whyChooseTitle ? (
                data.whyChooseTitle
              ) : (
                <>
                  {whyChoose.titleLead}
                  <span className="text-orange">{whyChoose.titleAccent}</span>
                  {whyChoose.titleTail}
                </>
              )}
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="mt-4 text-lg text-muted text-pretty">
              {body}
            </p>
          </Reveal>
        </div>

        <div className="mt-16 flex flex-col gap-16 sm:gap-24">
          {items.map((item, i) => {
            const flip = i % 2 === 1;
            return (
              <div
                key={item.tag}
                className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16"
              >
                {/* Text */}
                <Reveal
                  className={cn("order-2", flip ? "lg:order-2" : "lg:order-1")}
                >
                  <span className="inline-flex items-center gap-2 rounded-full bg-orange-soft px-3 py-1 font-mono text-xs uppercase tracking-wider text-orange-deep">
                    <span className="grid h-5 w-5 place-items-center">
                      <Icon name={item.icon} className="h-4 w-4" />
                    </span>
                    {item.tag}
                  </span>
                  <h3 className="mt-4 font-display text-2xl font-bold leading-tight tracking-tight text-ink text-balance sm:text-3xl">
                    {renderHighlighted(item.title, item.highlight)}
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
                    className="shadow-(--shadow-soft)"
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
