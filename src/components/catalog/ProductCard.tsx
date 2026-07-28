import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import {
  compatibleLabels,
  fiturLabels,
  medanLabels,
  tipeLabels,
  type Product,
} from "@/lib/catalog";
import { cn } from "@/lib/cn";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/solusi/ban/${product.id}`}
      className="beam group relative flex h-full flex-col rounded-[20px] bg-card shadow-[var(--shadow-soft)] ring-1 ring-inset ring-line/70 transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]"
    >
      <span className="beam-line" aria-hidden />

      {/* Gambar */}
      <div className="relative flex h-44 items-center justify-center overflow-hidden rounded-t-[20px] bg-paper-2">
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(circle_at_50%_60%,rgba(252,61,4,0.08),transparent_70%)]"
        />
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            width={400}
            height={400}
            className="h-[88%] w-auto object-contain drop-shadow-[0_12px_28px_rgba(0,0,0,0.15)] transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <Icon
            name="tire"
            className="h-24 w-24 text-ink/15 transition-transform duration-500 group-hover:scale-105 group-hover:rotate-45"
          />
        )}
        <span
          className={cn(
            "absolute bottom-3 left-3 rounded-full px-2.5 py-1 font-mono text-[9px] font-semibold uppercase tracking-wider",
            product.brand === "tiron"
              ? "bg-[#c0392b]/10 text-[#c0392b] ring-1 ring-inset ring-[#c0392b]/20"
              : "bg-dark/8 text-dark ring-1 ring-inset ring-dark/15"
          )}
        >
          {product.brandChip}
        </span>
        <span className="absolute right-3 top-3 rounded-full bg-orange/10 px-2.5 py-1 font-mono text-[9px] font-semibold uppercase tracking-wider text-orange ring-1 ring-inset ring-orange/20">
          {tipeLabels[product.tipe]}
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-xl font-bold leading-tight text-ink">
          {product.name}
        </h3>
        <div className="mt-0.5 text-xs font-medium text-muted">
          Ban {tipeLabels[product.tipe]} {product.brandChip}
        </div>

        {product.compatible.length > 0 && (
          <ChipRow title="Cocok untuk" items={product.compatible.map((c) => compatibleLabels[c])} />
        )}
        {product.medan.length > 0 && (
          <ChipRow title="Medan" items={product.medan.map((m) => medanLabels[m])} />
        )}
        {product.fitur.length > 0 && (
          <ChipRow title="Fitur" items={product.fitur.map((f) => fiturLabels[f])} />
        )}

        {/* Ukuran */}
        <div className="mt-4 border-t border-line pt-4">
          <p className="mb-2 font-mono text-[10px] font-semibold uppercase tracking-wider text-ink/45">
            Ukuran tersedia
          </p>
          <div className="flex flex-wrap gap-1.5">
            {product.sizes.slice(0, 5).map((s, i) => (
              <span
                key={`${s + i}`}
                className="rounded-md bg-paper-2 px-2.5 py-1 font-mono text-[10px] font-semibold text-ink"
              >
                {s}
              </span>
            ))}
            {product.sizes.length > 5 && (
              <span className="rounded-md bg-paper-2 px-2.5 py-1 font-mono text-[10px] font-semibold text-muted">
                +{product.sizes.length - 5}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

function ChipRow({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="mt-4">
      <p className="mb-2 font-mono text-[10px] font-semibold uppercase tracking-wider text-ink/45">
        {title}
      </p>
      <div className="flex flex-wrap gap-1.5">
        {items.map((t) => (
          <span
            key={t}
            className="rounded-full border border-line bg-paper-2/60 px-2.5 py-1 text-[10px] font-medium text-muted"
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}
