import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";
import { coverage } from "@/lib/content";
import { MapPin, Warehouse } from "lucide-react";
import { GenericIconCircle } from "../ui/GenericIconCircle";

const MAP_SRC = "/assets/images/indonesia-geo.svg";
const W = 1014;
const H = 405;

const ORANGE = "#fc3d04";

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

interface CoverageData {
  title?: string;
  highlight?: string[];
  accent?: string;
  body?: string;
  stats?: Array<{ value: string; label: string }>;
  locations?: Array<{ city: string; types: string[] }>;
  branches?: Array<{ city: string; x: number; y: number; types: string[] }>;
}

export function Coverage({ data }: { data?: CoverageData }) {
  const content = {
    title: data?.title ?? coverage.title,
    highlight:
      data?.highlight ??
      (data?.accent ? [data.accent] : (coverage.highlight ?? [coverage.accent])),
    body: data?.body ?? coverage.body,
    stats: data?.stats ?? coverage.stats,
    locations: data?.locations ?? coverage.locations,
    branches: data?.branches ?? coverage.branches,
  };

  return (
    <section id="jaringan" className="scroll-mt-24 py-20 sm:py-24">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <Reveal delay={60}>
            <h2 className="font-display text-4xl font-bold tracking-tight text-ink text-balance sm:text-5xl">
              {renderHighlighted(content.title, content.highlight)}
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="mt-4 text-lg text-muted text-pretty">
              {content.body}
            </p>
          </Reveal>
          <Reveal delay={160}>
            <div className="mx-auto mt-8 flex max-w-xs justify-center gap-10">
              {content.stats.map((s) => (
                <div key={s.label}>
                  <div className="font-display text-3xl font-extrabold tracking-tight text-orange tabular-nums">
                    {s.value}
                  </div>
                  <div className="mt-1 text-xs leading-snug text-muted text-pretty">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Peta + Marker Lingkaran Presisi 1:1 sesuai desain */}
        <Reveal delay={120}>
          <svg
            viewBox={`0 0 ${W} ${H}`}
            className="mx-auto mt-12 h-auto w-full max-w-5xl overflow-visible select-none"
            role="img"
            aria-label="Peta jaringan service point & gudang SaveMile di Indonesia"
          >
            <image href={MAP_SRC} x="0" y="0" width={W} height={H} />
            {content.branches.map((b) => {
              const { x, y } = b;
              const isWarehouse = b.types.includes("warehouse");

              return (
                <g
                  key={`${b.city}-${b.x}-${b.y}`}
                  className="group cursor-pointer transition-transform duration-200 hover:scale-125"
                  style={{ transformOrigin: `${x}px ${y}px` }}
                >
                  {isWarehouse ? (
                    <>
                      <circle cx={x} cy={y} r={10} fill={ORANGE} opacity={0.35}>
                        <animate
                          attributeName="r"
                          values="7;15;7"
                          dur="2.2s"
                          repeatCount="indefinite"
                        />
                        <animate
                          attributeName="opacity"
                          values="0.45;0.1;0.45"
                          dur="2.2s"
                          repeatCount="indefinite"
                        />
                      </circle>

                      <GenericIconCircle
                        icon={Warehouse}
                        x={x}
                        y={y}
                        size={20}
                        iconSize={14}
                        bgColor={ORANGE}
                      />
                    </>
                  ) : (
                    <>
                      <circle cx={x} cy={y} r={12} fill={ORANGE} opacity={0.3}>
                        <animate
                          attributeName="r"
                          values="7;15;7"
                          dur="2.2s"
                          repeatCount="indefinite"
                        />
                        <animate
                          attributeName="opacity"
                          values="0.4;0.05;0.4"
                          dur="2.2s"
                          repeatCount="indefinite"
                        />
                      </circle>

                      <GenericIconCircle
                        icon={MapPin}
                        x={x}
                        y={y}
                        size={20}
                        iconSize={14}
                        bgColor={ORANGE}
                      />
                    </>
                  )}
                </g>
              );
            })}
          </svg>
        </Reveal>

        {/* Legend */}
        <Reveal delay={160}>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-ink/75">
            <span className="inline-flex items-center gap-2">
              <Icon name="pin" className="h-4 w-4 text-orange" />
              Service Point
            </span>
            <span className="inline-flex items-center gap-2">
              <Icon name="warehouse" className="h-4 w-4 text-orange" />
              Gudang
            </span>
          </div>
        </Reveal>

        {/* Daftar lengkap kota */}
        <Reveal delay={220}>
          <div className="mx-auto mt-10 flex max-w-3xl flex-wrap justify-center gap-2">
            {content.locations.map((loc) => (
              <span
                key={loc.city}
                className="inline-flex items-center gap-1.5 rounded-full border border-line bg-card px-3 py-1.5 text-xs font-medium text-ink/70"
              >
                {loc.types.includes("warehouse") && (
                  <Icon name="warehouse" className="h-3.5 w-3.5 text-orange" />
                )}
                {loc.types.includes("service") && (
                  <Icon name="pin" className="h-3.5 w-3.5 text-orange" />
                )}
                {loc.city}
              </span>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
