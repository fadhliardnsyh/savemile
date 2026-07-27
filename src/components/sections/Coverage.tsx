import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { coverage } from "@/lib/content";

/* Peta Indonesia (SVG) — pin digambar di ruang koordinat viewBox yang sama
   dengan peta, jadi posisinya selalu presisi (tidak bergantung layout HTML). */
const MAP_SRC = "/assets/images/indonesia-geo.svg";
const W = 1014;
const H = 405;

/* Kalibrasi geografis (equirectangular) → piksel viewBox peta.
   Sudah diverifikasi terhadap render peta asli. Kalau perlu geser,
   cukup setel keempat angka di bawah. */
const LON_MIN = 95; // tepi kiri peta (°BT)
const LON_MAX = 141; // tepi kanan peta (°BT)
const LAT_TOP = 6; // tepi atas peta (°LU)
const LAT_BOTTOM = -12.37; // tepi bawah peta (°LS)

const ORANGE = "#fc3d04";
const INK = "#14171c";
const PAPER = "#f7f8fa";

const geoToXY = (lon: number, lat: number) => ({
  x: ((lon - LON_MIN) / (LON_MAX - LON_MIN)) * W,
  y: ((LAT_TOP - lat) / (LAT_TOP - LAT_BOTTOM)) * H,
});

// Kota yang diberi label teks (sisanya cukup titik agar tidak sesak).
const LABELED = new Set([
  "Medan", "Jakarta", "Surabaya", "Pontianak",
  "Balikpapan", "Makassar", "Manado", "Jayapura",
]);

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
              const { x, y } = geoToXY(b.lon, b.lat);
              const labelLeft = x > W * 0.72;
              const isWarehouse = b.type === "warehouse";
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
            <span className="inline-flex items-center gap-2.5">
              <span className="h-3 w-3 rounded-full bg-orange ring-2 ring-paper" />
              Service Point
            </span>
            <span className="inline-flex items-center gap-2.5">
              <span className="h-3.5 w-3.5 rounded-full bg-dark ring-2 ring-inset ring-orange" />
              Gudang
            </span>
          </div>
        </Reveal>

        {/* Daftar lengkap kota */}
        <Reveal delay={220}>
          <div className="mx-auto mt-10 flex max-w-3xl flex-wrap justify-center gap-2">
            {coverage.branches.map((b) => (
              <span
                key={b.city}
                className="inline-flex items-center gap-1.5 rounded-full border border-line bg-card px-3 py-1.5 text-xs font-medium text-ink/70"
              >
                <span
                  className={
                    "h-1.5 w-1.5 rounded-full " +
                    (b.type === "warehouse" ? "bg-dark ring-1 ring-orange" : "bg-orange")
                  }
                />
                {b.city}
              </span>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
