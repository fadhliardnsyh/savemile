import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { tms } from "@/lib/content";

/* Contoh baris laporan CPK ban (dummy — untuk ilustrasi laporan konsultasi). */
const REPORT = [
  { tire: "Tiron HS314", km: "82.000 km", cpk: "Rp 285/km", status: "Optimal", tone: "ok" as const },
  { tire: "Doublestar DSR668", km: "61.000 km", cpk: "Rp 342/km", status: "Pantau", tone: "warn" as const },
  { tire: "Tiron HS308", km: "44.000 km", cpk: "Rp 410/km", status: "Evaluasi", tone: "bad" as const },
];

const TONE: Record<"ok" | "warn" | "bad", string> = {
  ok: "bg-[#22c55e]/12 text-[#15803d] ring-[#22c55e]/30",
  warn: "bg-[#f59e0b]/12 text-[#b45309] ring-[#f59e0b]/30",
  bad: "bg-[#ef4444]/12 text-[#b91c1c] ring-[#ef4444]/30",
};

export function Consultation() {
  const c = tms.consultation;
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Teks */}
          <div>
            <Reveal delay={60}>
              <h2 className="font-display text-4xl font-bold tracking-tight text-ink text-balance sm:text-5xl">
                {c.titleLead}
                <span className="text-orange">{c.titleAccent}</span>
              </h2>
            </Reveal>
            <Reveal delay={120}>
              <p className="mt-4 text-lg leading-relaxed text-muted text-pretty">
                {c.description}
              </p>
            </Reveal>
          </div>

          {/* Tampilan laporan CPK */}
          <Reveal delay={120}>
            <div className="overflow-hidden rounded-[24px] bg-card shadow-[var(--shadow-lift)] ring-1 ring-inset ring-line">
              {/* Header laporan */}
              <div className="flex items-center justify-between gap-3 border-b border-line px-6 py-4">
                <div>
                  <div className="font-display text-sm font-bold text-ink">Laporan CPK Ban</div>
                  <div className="mt-0.5 font-mono text-[10px] uppercase tracking-wider text-muted">
                    Periode Jan–Jun 2026 · Armada Anda
                  </div>
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-orange/10 px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-orange ring-1 ring-inset ring-orange/20">
                  SaveMile
                </span>
              </div>

              {/* Tabel */}
              <div className="overflow-x-auto">
                <table className="w-full min-w-[420px] text-left text-sm">
                  <thead>
                    <tr className="border-b border-line font-mono text-[10px] uppercase tracking-wider text-muted">
                      <th className="px-6 py-3 font-semibold">Merk / Tipe</th>
                      <th className="px-3 py-3 font-semibold">Km Tempuh</th>
                      <th className="px-3 py-3 font-semibold">CPK</th>
                      <th className="px-6 py-3 font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {REPORT.map((r) => (
                      <tr key={r.tire} className="border-b border-line/70 last:border-0">
                        <td className="px-6 py-3.5 font-semibold text-ink">{r.tire}</td>
                        <td className="px-3 py-3.5 tabular-nums text-muted">{r.km}</td>
                        <td className="px-3 py-3.5 font-mono font-semibold tabular-nums text-ink">
                          {r.cpk}
                        </td>
                        <td className="px-6 py-3.5">
                          <span
                            className={
                              "inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold ring-1 ring-inset " +
                              TONE[r.tone]
                            }
                          >
                            {r.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Rekomendasi */}
              <div className="border-t border-line bg-paper-2/50 px-6 py-4">
                <div className="font-mono text-[10px] font-bold uppercase tracking-wider text-orange">
                  Rekomendasi Konsultan
                </div>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-soft text-pretty">
                  Tiron HS314 memberikan CPK terendah di rute Anda. Pertimbangkan menambah
                  alokasinya pada armada jarak jauh, dan jadwalkan evaluasi untuk tipe dengan
                  status merah.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
