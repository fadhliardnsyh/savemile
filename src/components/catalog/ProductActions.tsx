"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";

/**
 * Bagian interaktif di halaman detail: pilih ukuran → pesan WhatsApp otomatis
 * berisi merek, nama, tipe, dan ukuran terpilih.
 */
export function ProductActions({
  brandChip,
  name,
  tipe,
  sizes,
  whatsapp,
}: {
  brandChip: string;
  name: string;
  tipe: string;
  sizes: string[];
  whatsapp: string;
}) {
  const [size, setSize] = useState(sizes[0] ?? "");

  const message = `Halo SaveMile, saya tertarik dengan ban berikut:\n\n• Merek: ${brandChip}\n• Nama: ${name}\n• Tipe: ${tipe}\n${size ? `• Ukuran: ${size}\n` : ""}\nBoleh minta info ketersediaan & harga?`;
  const waHref = `${whatsapp}?text=${encodeURIComponent(message)}`;

  return (
    <div className="mt-7">
      {/* Ukuran (pilih) */}
      {sizes.length > 0 && (
        <>
          <div className="flex items-center justify-between">
            <h2 className="font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-muted">
              Pilih ukuran
            </h2>
            <span className="text-xs text-muted">
              Dipilih: <span className="font-mono font-semibold text-orange">{size}</span>
            </span>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {sizes.map((s) => {
              const selected = s === size;
              return (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSize(s)}
                  aria-pressed={selected}
                  className={cn(
                    "rounded-lg px-3 py-2 font-mono text-sm font-semibold ring-1 ring-inset transition-all duration-150",
                    selected
                      ? "bg-orange text-white ring-orange"
                      : "bg-paper-2 text-ink ring-line hover:-translate-y-0.5 hover:ring-orange/50"
                  )}
                >
                  {s}
                </button>
              );
            })}
          </div>
        </>
      )}

      {/* CTA */}
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button
          href={waHref}
          variant="wa"
          size="lg"
          external
          data-wa-location="Product Detail CTA"
        >
          <Icon name="whatsapp" className="h-5 w-5" />
          Konsultasi &amp; Pesan
        </Button>
        <Button href="/solusi/ban" variant="outline" size="lg">
          <Icon name="arrow" className="h-4 w-4 rotate-180" />
          Kembali ke katalog
        </Button>
      </div>

      <p className="mt-4 text-xs text-muted">
        Distributor resmi · SNI Certified · Garansi produk · Pengiriman seluruh Indonesia
      </p>
    </div>
  );
}
