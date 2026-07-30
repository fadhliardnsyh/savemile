import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";
import { coverage } from "@/lib/content";

/* Peta Indonesia (SVG) — marker gudang & service point sudah digambar
   langsung di dalam file ini (tidak lagi di-render lewat JS), jadi
   posisinya persis seperti yang dikalibrasi secara visual di file asetnya. */
const MAP_SRC = "/assets/images/indonesia-map.svg";
const W = 1014;
const H = 405;

const ORANGE = "#fc3d04";
const INK = "#14171c";
const PAPER = "#f7f8fa";

// Kota yang diberi label teks (sisanya cukup titik agar tidak sesak).
// Diisi seiring marker ditambahkan.
const LABELED = new Set<string>([]);

export function Coverage() {
  return (
    <section id="jaringan" className="scroll-mt-24 py-20 sm:py-24">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <Reveal delay={60}>
            <h2 className="font-display text-4xl font-bold tracking-tight text-ink text-balance sm:text-5xl">
              Jangkauan layanan kami sampai di{" "}
              <span className="text-orange">{coverage.accent}</span>
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="mt-4 text-lg text-muted text-pretty">{coverage.body}</p>
          </Reveal>
          <Reveal delay={160}>
            <div className="mx-auto mt-8 flex max-w-xs justify-center gap-10">
              {coverage.stats.map((s) => (
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

        {/* Peta + pin (satu ruang koordinat SVG) */}
        <Reveal delay={120}>
          <svg
            viewBox={`0 0 ${W} ${H}`}
            className="mx-auto mt-12 h-auto w-full max-w-5xl"
            role="img"
            aria-label="Peta jaringan service point & gudang SaveMile di Indonesia"
          >
            <image href={MAP_SRC} x="0" y="0" width={W} height={H} />
            {coverage.branches.map((b) => {
              const { x, y } = b;
              const labelLeft = x > W * 0.72;
              const isWarehouse = b.types.includes("warehouse");
              return (
                <g key={b.city}>
                  {/* halo berdenyut (khusus gudang = hub utama) */}
                  {isWarehouse && (
                    <circle cx={x} cy={y} r={5} fill={ORANGE} opacity={0.5}>
                      <animate attributeName="r" values="5;13;5" dur="2.4s" repeatCount="indefinite" />
                      <animate attributeName="opacity" values="0.5;0;0.5" dur="2.4s" repeatCount="indefinite" />
                    </circle>
                  )}
                  {/* titik: gudang = inti gelap ber-ring oranye, service = titik oranye */}
                  {isWarehouse ? (
                    <circle cx={x} cy={y} r={5.5} fill={INK} stroke={ORANGE} strokeWidth={2.5} />
                  ) : (
                    <circle cx={x} cy={y} r={3.6} fill={ORANGE} stroke={PAPER} strokeWidth={1.3} />
                  )}
                  {LABELED.has(b.city) && (
                    <text
                      x={labelLeft ? x - 9 : x + 9}
                      y={y + 4}
                      textAnchor={labelLeft ? "end" : "start"}
                      fontSize={12}
                      fontWeight={700}
                      fill={INK}
                      className="hidden sm:inline"
                      style={{ paintOrder: "stroke", stroke: PAPER, strokeWidth: 3 }}
                    >
                      {b.city}
                    </text>
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
            {coverage.locations.map((loc) => (
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
