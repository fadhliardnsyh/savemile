import Image from "next/image";
import Link from "next/link";
import { Icon, type IconName } from "@/components/ui/Icon";
import {
  compatibleLabels,
  fiturLabels,
  medanIcons,
  medanLabels,
  tipeLabels,
  type Medan,
  type Product,
} from "@/lib/catalog";
import { cn } from "@/lib/cn";

export function ProductCard({
  product,
  labels,
}: {
  product: Product;
  labels?: {
    tipeLabels?: Record<string, string>;
    compatibleLabels?: Record<string, string>;
    medanLabels?: Record<string, string>;
    medanIcons?: Record<string, IconName>;
    fiturLabels?: Record<string, string>;
  };
}) {
  const tLabels = labels?.tipeLabels || tipeLabels;
  const cLabels = labels?.compatibleLabels || compatibleLabels;
  const mLabels = labels?.medanLabels || medanLabels;
  const mIcons = labels?.medanIcons || medanIcons;
  const fLabels = labels?.fiturLabels || fiturLabels;

  const tipeText = tLabels[product.tipe] || product.tipe;

  return (
    <Link
      href={`/solusi/ban/${product.id}`}
      className="beam group relative flex h-full flex-col rounded-[20px] bg-card shadow-(--shadow-soft) ring-1 ring-inset ring-line/70 transition-all duration-300 hover:-translate-y-1 hover:shadow-(--shadow-lift)"
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
              : "bg-dark/8 text-dark ring-1 ring-inset ring-dark/15",
          )}
        >
          {product.brandChip}
        </span>
        <span className="absolute right-3 top-3 rounded-full bg-orange/10 px-2.5 py-1 font-mono text-[9px] font-semibold uppercase tracking-wider text-orange ring-1 ring-inset ring-orange/20">
          {tipeText}
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-xl font-bold leading-tight text-ink">
          {product.name}
        </h3>
        <div className="mt-0.5 text-xs font-medium text-muted">
          Ban {tipeText} {product.brandChip}
        </div>

        {product.compatible.length > 0 && (
          <ChipRow
            title="Cocok untuk"
            items={product.compatible.map((c) => cLabels[c] || c)}
          />
        )}
        {product.medan.length > 0 && (
          <ChipRow
            title="Medan"
            items={product.medan.map((m) => ({
              label: mLabels[m] || m,
              icon: (mIcons[m] || medanIcons[m as Medan] || "road") as IconName,
            }))}
          />
        )}
        {product.fitur.length > 0 && (
          <ChipRow
            title="Fitur"
            items={product.fitur.map((f) => fLabels[f] || f)}
          />
        )}

        {/* Ukuran */}
        <div className="mt-4 border-t border-line pt-4">
          <p className="mb-2 font-mono text-[10px] font-semibold uppercase tracking-wider text-ink/45">
            Ukuran tersedia
          </p>
          <div className="flex flex-wrap gap-1.5">
            {product.sizes.slice(0, 5).map((s) => (
              <span
                key={s}
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

function ChipRow({
  title,
  items,
}: {
  title: string;
  items: (string | { label: string; icon?: IconName })[];
}) {
  return (
    <div className="mt-4">
      <p className="mb-2 font-mono text-[10px] font-semibold uppercase tracking-wider text-ink/45">
        {title}
      </p>
      <div className="flex flex-wrap gap-1.5">
        {items.map((item) => {
          const label = typeof item === "string" ? item : item.label;
          const icon = typeof item === "string" ? undefined : item.icon;
          return (
            <span
              key={label}
              className="inline-flex items-center gap-1.5 rounded-full border border-line bg-paper-2/60 px-2.5 py-1 text-[10px] font-medium text-muted"
            >
              {icon && (
                <Icon name={icon} className="h-3 w-3 shrink-0 text-orange" />
              )}
              {label}
            </span>
          );
        })}
      </div>
    </div>
  );
}
