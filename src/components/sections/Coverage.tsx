import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { coverage, type Branch } from "@/lib/content";

/* Peta digambar dalam ruang viewBox 1000 x 460.
   Konversi geografis: lon 95–141°E → x, lat 6°N..-11°S → y. */
const VW = 1000;
const VH = 460;
const geoToXY = (lon: number, lat: number) => ({
  x: ((lon - 95) / 46) * VW,
  y: ((6 - lat) / 17) * VH,
});

/* Bentuk kepulauan Indonesia sebagai kumpulan elips [cx, cy, rx, ry].
   Sebuah titik dirender jika berada di dalam salah satu elips. */
const ISLANDS: [number, number, number, number][] = [
  // Sumatra (diagonal barat laut → tenggara)
  [35, 45, 26, 26], [65, 80, 32, 32], [105, 135, 34, 34],
  [150, 190, 34, 32], [195, 255, 36, 32],
  // Kep. Riau / Batam
  [200, 140, 18, 16],
  // Jawa
  [245, 346, 38, 16], [300, 347, 40, 16], [355, 348, 40, 16], [405, 349, 32, 15],
  // Bali – Nusa Tenggara
  [450, 392, 22, 13], [500, 398, 22, 12], [552, 404, 24, 12], [606, 408, 26, 12],
  // Kalimantan
  [385, 155, 95, 105],
  // Sulawesi
  [560, 155, 20, 55], [605, 118, 48, 17], [560, 235, 26, 58],
  [608, 278, 30, 20], [535, 290, 26, 16],
  // Maluku
  [700, 175, 15, 15], [742, 150, 13, 13], [720, 258, 14, 13], [772, 210, 13, 13],
  // Papua
  [895, 235, 110, 88], [815, 200, 40, 32],
];

const inIsland = (px: number, py: number) =>
  ISLANDS.some(([cx, cy, rx, ry]) => {
    const dx = (px - cx) / rx;
    const dy = (py - cy) / ry;
    return dx * dx + dy * dy <= 1;
  });

/* Grid titik heksagonal (baris ganjil digeser setengah langkah). */
const STEP = 12;
const DOTS: { x: number; y: number }[] = [];
for (let row = 0; row * STEP <= VH; row++) {
  const y = row * STEP;
  const offset = row % 2 ? STEP / 2 : 0;
  for (let x = offset; x <= VW; x += STEP) {
    if (inIsland(x, y)) DOTS.push({ x, y });
  }
}

// Kota yang diberi label teks (sisanya cukup titik menyala agar tidak sesak).
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
              Hadir <span className="text-orange">{coverage.accent}</span> dengan armada Anda
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="mt-4 text-lg text-muted text-pretty">{coverage.body}</p>
          </Reveal>
        </div>

        {/* Peta */}
        <Reveal delay={120}>
          <div className="relative mx-auto mt-14 w-full max-w-4xl" style={{ aspectRatio: `${VW} / ${VH}` }}>
            <svg
              viewBox={`0 0 ${VW} ${VH}`}
              className="absolute inset-0 h-full w-full text-ink/15"
              aria-hidden
            >
              {DOTS.map((d, i) => (
                <circle key={i} cx={d.x} cy={d.y} r={2.3} fill="currentColor" />
              ))}
            </svg>

            {/* Pin cabang */}
            {coverage.branches.map((b) => (
              <Pin key={b.city} branch={b} />
            ))}
          </div>
        </Reveal>

        {/* Statistik jangkauan */}
        <Reveal delay={180}>
          <div className="mx-auto mt-14 grid max-w-2xl grid-cols-3 gap-4 text-center">
            {coverage.stats.map((s) => (
              <div key={s.label}>
                <div className="font-display text-3xl font-extrabold tracking-tight text-orange tabular-nums sm:text-4xl">
                  {s.value}
                </div>
                <div className="mt-1.5 text-xs leading-snug text-muted text-pretty sm:text-sm">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Daftar lengkap kota */}
        <Reveal delay={240}>
          <div className="mx-auto mt-10 flex max-w-3xl flex-wrap justify-center gap-2">
            {coverage.branches.map((b) => (
              <span
                key={b.city}
                className="inline-flex items-center gap-1.5 rounded-full border border-line bg-card px-3 py-1.5 text-xs font-medium text-ink/70"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-orange" />
                {b.city}
              </span>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

function Pin({ branch }: { branch: Branch }) {
  const { x, y } = geoToXY(branch.lon, branch.lat);
  const left = (x / VW) * 100;
  const top = (y / VH) * 100;
  const labelOnLeft = left > 72;

  return (
    <div className="absolute h-0 w-0" style={{ left: `${left}%`, top: `${top}%` }}>
      <span className="absolute left-0 top-0 flex h-3 w-3 -translate-x-1/2 -translate-y-1/2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange/50" />
        <span className="relative inline-flex h-3 w-3 rounded-full bg-orange ring-2 ring-paper" />
      </span>
      {LABELED.has(branch.city) && (
        <span
          className={
            "absolute top-0 -translate-y-1/2 whitespace-nowrap text-[11px] font-semibold text-ink/75 [text-shadow:0_1px_3px_rgba(247,248,250,0.9)] " +
            (labelOnLeft ? "right-3 text-right" : "left-3")
          }
        >
          {branch.city}
        </span>
      )}
    </div>
  );
}
