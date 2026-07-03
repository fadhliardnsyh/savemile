import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { VehicleIcon, CharIcon } from "@/components/catalog/CatalogIcons";
import { charLabels, vehicleLabels, type Product } from "@/lib/catalog";
import { cn } from "@/lib/cn";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/solusi/ban/${product.id}`}
      className={cn(
        "beam group relative flex h-full flex-col rounded-[20px] bg-card shadow-[var(--shadow-soft)] ring-1 ring-inset transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]",
        product.best ? "ring-orange/35" : "ring-line/70"
      )}
    >
      <span className="beam-line" aria-hidden />

      {/* Badge */}
      {product.badge && (
        <span className="absolute right-3.5 top-3.5 z-10 inline-flex items-center gap-1 rounded-full bg-orange px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-white">
          {product.badge === "Terlaris" && (
            <svg viewBox="0 0 24 24" className="h-2.5 w-2.5" fill="currentColor" aria-hidden>
              <path d="m12 2 3 6.5 7 .8-5.2 4.7 1.4 6.9L12 17.8 5.8 20.9l1.4-6.9L2 9.3l7-.8z" />
            </svg>
          )}
          {product.badge}
        </span>
      )}

      {/* Image */}
      <div className="relative flex h-44 items-center justify-center overflow-hidden rounded-t-[20px] bg-paper-2">
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(circle_at_50%_60%,rgba(241,90,36,0.08),transparent_70%)]"
        />
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            width={400}
            height={300}
            className="h-[85%] w-[85%] object-contain drop-shadow-[0_12px_28px_rgba(0,0,0,0.15)] transition-transform duration-500 group-hover:scale-105"
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
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-5">
        <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.1em] text-orange">
          {product.series}
        </div>
        <h3 className="mt-1 font-display text-xl font-bold leading-tight text-ink">
          {product.name}
        </h3>
        <div className="mt-0.5 text-xs font-medium text-muted">
          {product.subname}
        </div>

        {/* Vehicle fit */}
        <div className="mt-4 flex items-center gap-3 rounded-lg border border-line bg-paper-2/60 px-3 py-2.5">
          <span className="font-mono text-[9px] font-semibold uppercase tracking-wider text-muted">
            Cocok untuk
          </span>
          <div className="flex items-center gap-2.5 text-ink">
            {product.fit.map((active, i) => (
              <span key={i} title={vehicleLabels[i]}>
                <VehicleIcon type={i as 0 | 1 | 2} active={active} />
              </span>
            ))}
          </div>
        </div>

        {/* Characteristics */}
        <div className="mt-4">
          <div className="font-mono text-[9px] font-semibold uppercase tracking-wider text-muted">
            Karakteristik
          </div>
          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1.5">
            {product.characteristics.map((c) => (
              <span key={c} className="flex items-center gap-1.5 text-[11px] font-medium text-ink">
                <CharIcon name={c} className="h-3.5 w-3.5 text-orange" />
                {charLabels[c]}
              </span>
            ))}
          </div>
        </div>

        <p className="mt-4 text-[13px] leading-relaxed text-muted text-pretty">
          {product.description}
        </p>

        {/* Tags */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {product.tags.map((t) => (
            <span
              key={t}
              className="rounded-full border border-line bg-paper-2/60 px-2.5 py-1 text-[10px] font-medium text-muted"
            >
              {t}
            </span>
          ))}
        </div>

        {/* Sizes */}
        <div className="mt-4 flex flex-wrap gap-1.5 border-t border-line pt-4">
          {product.sizes.map((s) => (
            <span
              key={s}
              className="rounded-md bg-paper-2 px-2.5 py-1 font-mono text-[10px] font-semibold text-ink"
            >
              {s}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
