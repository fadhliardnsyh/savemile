import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { tms } from "@/lib/content";
import { cn } from "@/lib/cn";

const metrics = [
  { label: "Total Ban Aktif", value: "2.847", trend: "+12 ban baru minggu ini", warn: false },
  { label: "Perlu Diganti Segera", value: "18", trend: "> 90% umur ban", warn: true },
  { label: "Avg. Kesehatan Ban", value: "76%", trend: "Naik dari 71% bulan lalu", warn: false },
  { label: "Hemat Bulan Ini", value: "Rp 84jt", trend: "vs biaya reaktif sebelumnya", warn: false },
];

const tires = [
  { id: "DSR688", model: "Doublestar DSR688", meta: "B 1234 ABC · Depan Kiri", pct: 94, level: "crit" },
  { id: "HS500", model: "Tiron HS500", meta: "B 5678 DEF · Belakang Kanan", pct: 87, level: "warn" },
  { id: "HS315", model: "Tiron HS315", meta: "B 9012 GHI · Depan Kanan", pct: 82, level: "warn" },
  { id: "DSR162", model: "Doublestar DSR162", meta: "B 3456 JKL · Belakang Kiri", pct: 61, level: "ok" },
  { id: "DFA100", model: "Doublestar DFA100", meta: "B 7890 MNO · Depan Kiri", pct: 44, level: "ok" },
];

const alerts = [
  { color: "#ef4444", text: "Ganti segera: Ban DSR688 di B 1234 ABC capai 94% umur. Estimasi ganti 3 hari.", time: "2 jam lalu" },
  { color: "#f59e0b", text: "Peringatan: 3 ban di armada Surabaya–Malang mendekati 85% umur.", time: "5 jam lalu" },
  { color: "#22c55e", text: "Berhasil dipasang: 8 ban baru Tiron HS500 telah di-marking & terdaftar.", time: "Kemarin, 14:32" },
  { color: "#f59e0b", text: "Anomali: Ban B 5678 DEF menempuh 240 km di luar rute normal.", time: "Kemarin, 09:15" },
];

const levelColor: Record<string, string> = {
  crit: "#ef4444",
  warn: "#f59e0b",
  ok: "#22c55e",
};

export function DashboardPreview() {
  const d = tms.dashboard;
  return (
    <section
      id="dashboard"
      className="relative z-10 scroll-mt-20 overflow-hidden py-20 text-ink sm:py-28"
    >
      <div
        aria-hidden
        className="absolute -right-40 -top-40 h-[40rem] w-[40rem] rounded-full bg-orange/12 blur-3xl"
      />
      <Container className="relative">
        <div className="max-w-2xl">
          <Reveal delay={60}>
            <h2 className="font-display text-4xl font-bold tracking-tight text-ink text-balance sm:text-5xl">
              {d.titleLead}
              <span className="text-orange">{d.titleAccent}</span>
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="mt-4 text-muted text-pretty">{d.description}</p>
          </Reveal>
        </div>

        {/* Mock dashboard */}
        <Reveal delay={120} className="mt-12">
          <div className="overflow-hidden rounded-2xl border border-dark-line bg-dark shadow-[var(--shadow-lift)]">
            {/* Topbar */}
            <div className="flex items-center justify-between border-b border-white/8 bg-white/[0.03] px-5 py-3.5">
              <div className="flex items-center gap-2.5">
                <span className="grid h-6 w-6 place-items-center rounded-md bg-orange/15">
                  <span className="h-2.5 w-2.5 rounded-full bg-orange" />
                </span>
                <span className="text-sm font-semibold text-white/80">
                  SaveMile TMS · Dashboard Armada
                </span>
              </div>
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5 text-[11px] text-white/40">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#22c55e]" />
                  Live
                </span>
                <span className="hidden text-[11px] text-white/25 sm:block">
                  Diperbarui 2 menit lalu
                </span>
              </div>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-2 border-b border-white/8 lg:grid-cols-4">
              {metrics.map((m, i) => (
                <div
                  key={m.label}
                  className={cn(
                    "border-white/8 p-5",
                    i % 2 === 0 && "border-r",
                    i < 2 && "border-b lg:border-b-0",
                    i !== 3 && "lg:border-r"
                  )}
                >
                  <div className="font-mono text-[10px] uppercase tracking-wider text-white/30">
                    {m.label}
                  </div>
                  <div className="mt-2 font-display text-2xl font-bold text-white sm:text-3xl">
                    {m.value}
                  </div>
                  <div
                    className={cn(
                      "mt-1.5 text-[11px]",
                      m.warn ? "text-[#f59e0b]" : "text-[#22c55e]"
                    )}
                  >
                    {m.trend}
                  </div>
                </div>
              ))}
            </div>

            {/* Body */}
            <div className="grid lg:grid-cols-3">
              {/* Tire list */}
              <div className="border-white/8 p-5 lg:border-r">
                <div className="mb-4 border-b border-white/8 pb-2.5 font-mono text-[10px] uppercase tracking-wider text-white/30">
                  Ban Perlu Perhatian
                </div>
                <div className="flex flex-col gap-3.5">
                  {tires.map((t) => (
                    <div key={t.id} className="flex items-center gap-3">
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-orange/12 font-mono text-[8px] font-bold text-orange ring-1 ring-inset ring-orange/20">
                        {t.id}
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="truncate text-xs font-medium text-white/80">
                          {t.model}
                        </div>
                        <div className="truncate text-[10px] text-white/35">{t.meta}</div>
                        <div className="mt-1.5 h-[3px] overflow-hidden rounded-full bg-white/10">
                          <div
                            className="h-full rounded-full"
                            style={{ width: `${t.pct}%`, background: levelColor[t.level] }}
                          />
                        </div>
                      </div>
                      <div className="text-right">
                        <div
                          className="text-xs font-semibold"
                          style={{ color: levelColor[t.level] }}
                        >
                          {t.pct}%
                        </div>
                        <div className="text-[9px] text-white/30">terpakai</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Alerts */}
              <div className="border-t border-white/8 p-5 lg:border-t-0 lg:border-r">
                <div className="mb-4 border-b border-white/8 pb-2.5 font-mono text-[10px] uppercase tracking-wider text-white/30">
                  Notifikasi Terbaru
                </div>
                <div className="flex flex-col gap-3.5">
                  {alerts.map((a, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <span
                        className="mt-1 h-2 w-2 shrink-0 rounded-full"
                        style={{ background: a.color, boxShadow: `0 0 6px ${a.color}99` }}
                      />
                      <div>
                        <div className="text-[11px] leading-relaxed text-white/55">{a.text}</div>
                        <div className="mt-0.5 text-[9px] text-white/25">{a.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Chart */}
              <div className="border-t border-white/8 p-5 lg:border-t-0">
                <div className="mb-4 border-b border-white/8 pb-2.5 font-mono text-[10px] uppercase tracking-wider text-white/30">
                  Sebaran Kondisi Ban
                </div>
                <div className="flex items-center gap-5">
                  <svg viewBox="0 0 90 90" className="h-24 w-24 shrink-0">
                    <circle cx="45" cy="45" r="35" fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="14" />
                    <circle cx="45" cy="45" r="35" fill="none" stroke="#22c55e" strokeWidth="14" strokeDasharray="132 88" transform="rotate(-90 45 45)" />
                    <circle cx="45" cy="45" r="35" fill="none" stroke="#f59e0b" strokeWidth="14" strokeDasharray="44 176" strokeDashoffset="-132" transform="rotate(-90 45 45)" />
                    <circle cx="45" cy="45" r="35" fill="none" stroke="#ef4444" strokeWidth="14" strokeDasharray="20 200" strokeDashoffset="-176" transform="rotate(-90 45 45)" />
                    <text x="45" y="42" textAnchor="middle" fill="white" fontSize="13" fontWeight="700">2.847</text>
                    <text x="45" y="54" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="7">total ban</text>
                  </svg>
                  <div className="flex flex-1 flex-col gap-2 text-[11px]">
                    {[
                      { c: "#22c55e", l: "Kondisi Baik", p: "60%" },
                      { c: "#f59e0b", l: "Perlu Pantau", p: "25%" },
                      { c: "#ef4444", l: "Ganti Segera", p: "15%" },
                    ].map((x) => (
                      <div key={x.l} className="flex items-center gap-2 text-white/50">
                        <span className="h-2 w-2 rounded-sm" style={{ background: x.c }} />
                        {x.l}
                        <span className="ml-auto font-semibold text-white/75">{x.p}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-5 border-t border-white/8 pt-4">
                  <div className="mb-3 font-mono text-[10px] uppercase tracking-wider text-white/30">
                    Penggantian per Bulan
                  </div>
                  <div className="flex h-14 items-end gap-1.5">
                    {[30, 45, 55, 40, 70, 60].map((hgt, i) => (
                      <div
                        key={i}
                        className={cn(
                          "flex-1 rounded-t",
                          i === 5 ? "bg-orange" : "bg-orange/25"
                        )}
                        style={{ height: `${hgt}%` }}
                      />
                    ))}
                  </div>
                  <div className="mt-1.5 flex gap-1.5">
                    {["Jan", "Feb", "Mar", "Apr", "Mei", "Jun"].map((m) => (
                      <div key={m} className="flex-1 text-center text-[8px] text-white/25">
                        {m}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
