"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ProductCard } from "@/components/catalog/ProductCard";
import { Icon } from "@/components/ui/Icon";
import { Select } from "@/components/ui/Select";
import { lenisRef } from "@/lib/lenisRef";
import {
  brandOptions,
  tipeOptions,
  compatibleOptions,
  medanOptions,
  fiturOptions,
  products,
  type Brand,
  type Tipe,
  type Compatible,
  type Medan,
  type Fitur,
  type Product,
} from "@/lib/catalog";
import { cn } from "@/lib/cn";

type Sort = "unggulan" | "az" | "za";

const sizeOptions = Array.from(new Set(products.flatMap((p) => p.sizes))).sort(
  (a, b) => a.localeCompare(b, undefined, { numeric: true })
);

function count<T>(pick: (p: Product) => T[] | T, val: T) {
  return products.filter((p) => {
    const v = pick(p);
    return Array.isArray(v) ? v.includes(val) : v === val;
  }).length;
}

export function CatalogBrowser() {
  const [brand, setBrand] = useState<Brand[]>([]);
  const [tipe, setTipe] = useState<Tipe[]>([]);
  const [compatible, setCompatible] = useState<Compatible[]>([]);
  const [medan, setMedan] = useState<Medan[]>([]);
  const [fitur, setFitur] = useState<Fitur[]>([]);
  const [sizes, setSizes] = useState<string[]>([]);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<Sort>("unggulan");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [highlight, setHighlight] = useState<"kendaraan" | "ukuran" | null>(null);

  const activeCount =
    brand.length + tipe.length + compatible.length + medan.length +
    fitur.length + sizes.length + (query ? 1 : 0);

  const toggle = <T,>(setter: React.Dispatch<React.SetStateAction<T[]>>, val: T) =>
    setter((prev) => (prev.includes(val) ? prev.filter((x) => x !== val) : [...prev, val]));

  const reset = () => {
    setBrand([]);
    setTipe([]);
    setCompatible([]);
    setMedan([]);
    setFitur([]);
    setSizes([]);
    setQuery("");
  };

  // Baca query dari finder hero (?f=kendaraan / ?f=ukuran) → highlight grup filter
  useEffect(() => {
    const f = new URLSearchParams(window.location.search).get("f");
    if (f !== "kendaraan" && f !== "ukuran") return;
    // set state di dalam callback async agar tidak memicu cascading render sinkron
    const raf = requestAnimationFrame(() => {
      setHighlight(f);
      if (window.matchMedia("(max-width: 1023px)").matches) setMobileOpen(true);
      document.querySelectorAll(`[data-group="${f}"]`).forEach((el) => {
        if ((el as HTMLElement).offsetParent !== null)
          el.scrollIntoView({ behavior: "smooth", block: "nearest" });
      });
    });
    const t = setTimeout(() => setHighlight(null), 2800);
    return () => {
      clearTimeout(t);
      cancelAnimationFrame(raf);
    };
  }, []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = products.filter((p) => {
      if (brand.length && !brand.includes(p.brand)) return false;
      if (tipe.length && !tipe.includes(p.tipe)) return false;
      if (compatible.length && !p.compatible.some((c) => compatible.includes(c))) return false;
      if (medan.length && !p.medan.some((m) => medan.includes(m))) return false;
      if (fitur.length && !p.fitur.some((f) => fitur.includes(f))) return false;
      if (sizes.length && !p.sizes.some((s) => sizes.includes(s))) return false;
      if (q && !p.name.toLowerCase().includes(q)) return false;
      return true;
    });
    const sorted = [...list];
    if (sort === "az")
      sorted.sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true }));
    else if (sort === "za")
      sorted.sort((a, b) => b.name.localeCompare(a.name, undefined, { numeric: true }));
    return sorted;
  }, [brand, tipe, compatible, medan, fitur, sizes, query, sort]);

  // ── Pagination ──
  const PAGE_SIZE = 9;
  const [page, setPage] = useState(1);
  const topRef = useRef<HTMLDivElement>(null);

  // reset ke halaman 1 tiap filter berubah (adjust state saat render, bukan effect)
  const filterSig = [brand, tipe, compatible, medan, fitur, sizes, query, sort].join("|");
  const [lastSig, setLastSig] = useState(filterSig);
  if (filterSig !== lastSig) {
    setLastSig(filterSig);
    setPage(1);
  }

  const totalPages = Math.max(1, Math.ceil(results.length / PAGE_SIZE));
  const current = Math.min(page, totalPages);
  const paged = results.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE);
  const rangeStart = results.length ? (current - 1) * PAGE_SIZE + 1 : 0;
  const rangeEnd = Math.min(current * PAGE_SIZE, results.length);

  const goPage = (n: number) => {
    setPage(Math.min(Math.max(1, n), totalPages));
    const el = topRef.current;
    if (!el) return;
    if (lenisRef.current) {
      lenisRef.current.scrollTo(el, { offset: -90 });
    } else {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const panel = (
    <div className="flex flex-col gap-7">
      <FilterGroup title="Merk">
        {brandOptions.map((o) => (
          <CheckRow
            key={o.key}
            label={o.label}
            count={count((p) => p.brand, o.key)}
            checked={brand.includes(o.key)}
            onChange={() => toggle(setBrand, o.key)}
          />
        ))}
      </FilterGroup>

      <FilterGroup title="Tipe">
        {tipeOptions.map((o) => (
          <CheckRow
            key={o.key}
            label={o.label}
            count={count((p) => p.tipe, o.key)}
            checked={tipe.includes(o.key)}
            onChange={() => toggle(setTipe, o.key)}
          />
        ))}
      </FilterGroup>

      <FilterGroup title="Compatible" dataKey="kendaraan" highlight={highlight === "kendaraan"}>
        {compatibleOptions.map((o) => (
          <CheckRow
            key={o.key}
            label={o.label}
            count={count((p) => p.compatible, o.key)}
            checked={compatible.includes(o.key)}
            onChange={() => toggle(setCompatible, o.key)}
          />
        ))}
      </FilterGroup>

      <FilterGroup title="Medan">
        {medanOptions.map((o) => (
          <CheckRow
            key={o.key}
            label={o.label}
            count={count((p) => p.medan, o.key)}
            checked={medan.includes(o.key)}
            onChange={() => toggle(setMedan, o.key)}
          />
        ))}
      </FilterGroup>

      <FilterGroup title="Fitur">
        {fiturOptions.map((o) => (
          <CheckRow
            key={o.key}
            label={o.label}
            count={count((p) => p.fitur, o.key)}
            checked={fitur.includes(o.key)}
            onChange={() => toggle(setFitur, o.key)}
          />
        ))}
      </FilterGroup>

      <FilterGroup title="Ukuran" dataKey="ukuran" highlight={highlight === "ukuran"}>
        {sizeOptions.map((s) => (
          <CheckRow
            key={s}
            mono
            label={s}
            count={count((p) => p.sizes, s)}
            checked={sizes.includes(s)}
            onChange={() => toggle(setSizes, s)}
          />
        ))}
      </FilterGroup>
    </div>
  );

  return (
    <div className="mx-auto w-full max-w-7xl px-5 py-10 sm:px-8">
      <div className="lg:grid lg:grid-cols-[260px_1fr] lg:gap-10">
        {/* ── Sidebar (desktop) ── */}
        <aside className="hidden lg:block">
          <div
            data-lenis-prevent
            className="scrollbar-thin sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto overscroll-contain pb-6 pr-2"
          >
            <div className="mb-5 flex items-center justify-between">
              <h2 className="font-display text-lg font-bold text-ink">Filter</h2>
              {activeCount > 0 && (
                <button
                  type="button"
                  onClick={reset}
                  className="text-xs font-medium text-orange hover:underline"
                >
                  Reset ({activeCount})
                </button>
              )}
            </div>
            {panel}
          </div>
        </aside>

        {/* ── Main ── */}
        <div ref={topRef} className="scroll-mt-24">
          {/* Search + sort bar */}
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="group relative flex-1">
              <Icon
                name="search"
                className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted transition-colors group-focus-within:text-orange"
              />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Cari ban berdasarkan nama (mis. HS314, DSR688)"
                className="h-12 w-full rounded-full border border-line bg-card pl-11 pr-10 text-sm text-ink outline-none transition-all duration-200 placeholder:text-muted hover:border-orange/50 hover:shadow-[var(--shadow-soft)] focus:border-orange focus:shadow-none focus:ring-4 focus:ring-orange/15"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  aria-label="Hapus pencarian"
                  className="absolute right-3.5 top-1/2 grid h-6 w-6 -translate-y-1/2 place-items-center rounded-full text-muted transition-colors hover:bg-ink/[0.06] hover:text-ink"
                >
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2.2} aria-hidden>
                    <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
                  </svg>
                </button>
              )}
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setMobileOpen(true)}
                className="inline-flex h-12 items-center gap-2 rounded-full border border-line bg-card px-4 text-sm font-medium text-ink lg:hidden"
              >
                <Icon name="ruler" className="h-4 w-4 text-orange" />
                Filter{activeCount > 0 && ` (${activeCount})`}
              </button>
              <Select
                value={sort}
                onChange={(v) => setSort(v as Sort)}
                ariaLabel="Urutkan produk"
                options={[
                  { value: "unggulan", label: "Unggulan" },
                  { value: "az", label: "Nama A–Z" },
                  { value: "za", label: "Nama Z–A" },
                ]}
              />
            </div>
          </div>

          {/* Result count */}
          <div className="mb-5 flex items-center justify-between">
            <p className="text-sm text-muted">
              Menampilkan{" "}
              <span className="font-semibold text-ink">
                {rangeStart}–{rangeEnd}
              </span>{" "}
              dari <span className="font-semibold text-ink">{results.length}</span> produk
              {query && (
                <>
                  {" "}
                  untuk <span className="font-semibold text-ink">“{query}”</span>
                </>
              )}
            </p>
            {activeCount > 0 && (
              <button
                type="button"
                onClick={reset}
                className="text-xs font-medium text-orange hover:underline lg:hidden"
              >
                Reset ({activeCount})
              </button>
            )}
          </div>

          {/* Grid */}
          {results.length > 0 ? (
            <>
              <div key={current} className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {paged.map((p, i) => (
                  <div
                    key={p.id}
                    className="fade-up h-full"
                    style={{ ["--d" as string]: `${i * 45}ms` }}
                  >
                    <ProductCard product={p} />
                  </div>
                ))}
              </div>

              {totalPages > 1 && (
                <div className="mt-10 flex flex-wrap items-center justify-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => goPage(current - 1)}
                    disabled={current === 1}
                    aria-label="Halaman sebelumnya"
                    className="grid h-9 w-9 place-items-center rounded-lg border border-line text-ink-soft transition-colors hover:border-orange hover:text-orange disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-line disabled:hover:text-ink-soft"
                  >
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
                      <path d="m15 18-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => goPage(n)}
                      aria-current={n === current ? "page" : undefined}
                      className={cn(
                        "h-9 min-w-9 rounded-lg px-3 text-sm font-medium transition-colors",
                        n === current
                          ? "bg-orange text-white"
                          : "text-ink-soft hover:bg-ink/[0.05]"
                      )}
                    >
                      {n}
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => goPage(current + 1)}
                    disabled={current === totalPages}
                    aria-label="Halaman berikutnya"
                    className="grid h-9 w-9 place-items-center rounded-lg border border-line text-ink-soft transition-colors hover:border-orange hover:text-orange disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-line disabled:hover:text-ink-soft"
                  >
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
                      <path d="m9 18 6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="rounded-2xl border border-dashed border-line py-20 text-center">
              <p className="font-display text-lg font-semibold text-ink">
                Tidak ada produk yang cocok
              </p>
              <p className="mx-auto mt-2 max-w-xs text-sm text-muted">
                Coba ubah atau kurangi filter yang dipilih.
              </p>
              <button
                type="button"
                onClick={reset}
                className="mt-5 inline-flex h-10 items-center rounded-full bg-orange px-5 text-sm font-medium text-white hover:bg-orange-deep"
              >
                Reset filter
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ── Mobile filter drawer ── */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <div
            className="absolute inset-0 bg-ink/40 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute inset-y-0 left-0 flex w-[85%] max-w-sm flex-col bg-paper shadow-2xl">
            <div className="flex items-center justify-between border-b border-line px-5 py-4">
              <h2 className="font-display text-lg font-bold text-ink">Filter</h2>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                aria-label="Tutup filter"
                className="grid h-9 w-9 place-items-center rounded-lg border border-line"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
                  <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
                </svg>
              </button>
            </div>
            <div
              data-lenis-prevent
              className="scrollbar-thin flex-1 overflow-y-auto overscroll-contain px-5 py-5"
            >
              {panel}
            </div>
            <div className="flex gap-3 border-t border-line px-5 py-4">
              <button
                type="button"
                onClick={reset}
                className="h-11 flex-1 rounded-full border border-line text-sm font-medium text-ink"
              >
                Reset
              </button>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="h-11 flex-1 rounded-full bg-orange text-sm font-medium text-white"
              >
                Lihat {results.length} produk
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Sub-komponen ── */
function FilterGroup({
  title,
  children,
  highlight,
  dataKey,
}: {
  title: string;
  children: React.ReactNode;
  highlight?: boolean;
  dataKey?: string;
}) {
  return (
    <div
      data-group={dataKey}
      className={cn(
        "-mx-2 scroll-mt-4 rounded-xl px-2 py-1.5 transition-all duration-300",
        highlight
          ? "bg-orange-soft/50 ring-2 ring-orange/50"
          : "ring-2 ring-transparent"
      )}
    >
      <h3 className="mb-2.5 flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-[0.1em] text-muted">
        {title}
        {highlight && (
          <span className="rounded-full bg-orange px-1.5 py-0.5 text-[9px] font-bold text-white">
            Pilih di sini
          </span>
        )}
      </h3>
      <div className="space-y-0.5">{children}</div>
    </div>
  );
}

function CheckRow({
  label,
  count,
  checked,
  onChange,
  mono,
}: {
  label: string;
  count: number;
  checked: boolean;
  onChange: () => void;
  mono?: boolean;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-2.5 rounded-lg px-2 py-1.5 transition-colors hover:bg-ink/[0.03]">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="sr-only"
      />
      <span
        className={cn(
          "grid h-4 w-4 shrink-0 place-items-center rounded-[5px] border transition-colors",
          checked ? "border-orange bg-orange text-white" : "border-line bg-card"
        )}
      >
        {checked && (
          <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth={3.5} aria-hidden>
            <path d="m5 12 4 4 10-10" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </span>
      <span
        className={cn(
          "flex-1 text-[13px] text-ink-soft",
          mono && "font-mono text-xs"
        )}
      >
        {label}
      </span>
      <span className="font-mono text-[11px] text-muted">{count}</span>
    </label>
  );
}
