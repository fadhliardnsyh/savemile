import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { VehicleIcon, CharIcon } from "@/components/catalog/CatalogIcons";
import { ProductCard } from "@/components/catalog/ProductCard";
import { ProductActions } from "@/components/catalog/ProductActions";
import { CtaSection } from "@/components/sections/CtaSection";
import {
  charLabels,
  getProduct,
  products,
  relatedProducts,
  vehicleLabels,
} from "@/lib/catalog";
import { consultCta, site } from "@/lib/content";
import { cn } from "@/lib/cn";

export function generateStaticParams() {
  return products.map((p) => ({ id: p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const p = getProduct(id);
  if (!p) return { title: "Produk tidak ditemukan" };
  return {
    title: `${p.name} — Ban ${p.brandChip}`,
    description: p.description,
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = getProduct(id);
  if (!product) notFound();

  const related = relatedProducts(product);

  return (
    <>
      <Navbar />
      <main className="relative z-10 flex-1 pt-24 pb-8 sm:pt-28">
        <Container>
          {/* Breadcrumb */}
          <nav className="mb-8 flex flex-wrap items-center gap-2 text-xs">
            <Link href="/" className="text-muted transition-colors hover:text-orange">
              Beranda
            </Link>
            <span className="text-line">/</span>
            <Link
              href="/solusi/ban"
              className="text-muted transition-colors hover:text-orange"
            >
              Ban
            </Link>
            <span className="text-line">/</span>
            <span className="font-medium text-ink">{product.name}</span>
          </nav>

          <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
            {/* ── Image ── */}
            <div className="lg:sticky lg:top-24 lg:self-start">
              <div className="relative flex aspect-square items-center justify-center overflow-hidden rounded-[28px] bg-paper-2 ring-1 ring-inset ring-line">
                <div
                  aria-hidden
                  className="absolute inset-0 bg-[radial-gradient(circle_at_50%_55%,rgba(241,90,36,0.1),transparent_70%)]"
                />
                {product.image ? (
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={800}
                    height={800}
                    className="h-[80%] w-[80%] object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.18)]"
                    priority
                  />
                ) : (
                  <Icon name="tire" className="h-48 w-48 text-ink/12" />
                )}
                {product.badge && (
                  <span className="absolute right-5 top-5 inline-flex items-center gap-1.5 rounded-full bg-orange px-3 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-wider text-white">
                    {product.badge === "Terlaris" && (
                      <svg viewBox="0 0 24 24" className="h-3 w-3" fill="currentColor" aria-hidden>
                        <path d="m12 2 3 6.5 7 .8-5.2 4.7 1.4 6.9L12 17.8 5.8 20.9l1.4-6.9L2 9.3l7-.8z" />
                      </svg>
                    )}
                    {product.badge}
                  </span>
                )}
                <span
                  className={cn(
                    "absolute bottom-5 left-5 rounded-full px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider",
                    product.brand === "tiron"
                      ? "bg-[#c0392b]/10 text-[#c0392b] ring-1 ring-inset ring-[#c0392b]/20"
                      : "bg-dark/8 text-dark ring-1 ring-inset ring-dark/15"
                  )}
                >
                  {product.brandChip}
                </span>
              </div>
            </div>

            {/* ── Info ── */}
            <div>
              <div className="font-mono text-xs font-semibold uppercase tracking-[0.12em] text-orange">
                {product.series}
              </div>
              <h1 className="mt-2 font-display text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">
                {product.name}
              </h1>
              <p className="mt-2 text-lg text-muted">{product.subname}</p>

              <p className="mt-6 text-base leading-relaxed text-ink-soft text-pretty">
                {product.description}
              </p>

              {/* Cocok untuk */}
              <div className="mt-8">
                <h2 className="font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-muted">
                  Cocok untuk kendaraan
                </h2>
                <div className="mt-3 flex flex-wrap gap-2.5">
                  {product.fit.map((active, i) => (
                    <span
                      key={i}
                      className={cn(
                        "inline-flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-medium ring-1 ring-inset",
                        active
                          ? "bg-orange/8 text-ink ring-orange/25"
                          : "text-muted/50 ring-line line-through"
                      )}
                    >
                      <span className={active ? "text-orange" : "text-muted/40"}>
                        <VehicleIcon type={i as 0 | 1 | 2} active={active} />
                      </span>
                      {vehicleLabels[i]}
                    </span>
                  ))}
                </div>
              </div>

              {/* Karakteristik */}
              <div className="mt-7">
                <h2 className="font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-muted">
                  Karakteristik
                </h2>
                <div className="mt-3 flex flex-wrap gap-2.5">
                  {product.characteristics.map((c) => (
                    <span
                      key={c}
                      className="inline-flex items-center gap-2 rounded-xl bg-card px-3.5 py-2 text-xs font-medium text-ink ring-1 ring-inset ring-line"
                    >
                      <CharIcon name={c} className="h-4 w-4 text-orange" />
                      {charLabels[c]}
                    </span>
                  ))}
                </div>
              </div>

              {/* Ukuran (pilih) + Tags + CTA */}
              <ProductActions
                brandChip={product.brandChip}
                name={product.name}
                subname={product.subname}
                sizes={product.sizes}
                tags={product.tags}
                whatsapp={site.whatsapp}
              />
            </div>
          </div>

          {/* ── Produk terkait ── */}
          {related.length > 0 && (
            <div className="mt-20 border-t border-line pt-14">
              <div className="mb-8 flex items-end justify-between gap-4">
                <h2 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                  Produk terkait
                </h2>
                <Link
                  href="/solusi/ban"
                  className="group inline-flex items-center gap-2 whitespace-nowrap text-xs font-bold uppercase tracking-wider text-muted transition-colors hover:text-orange"
                >
                  Lihat semua
                  <Icon name="arrow" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </div>
          )}
        </Container>
      </main>
      <CtaSection content={consultCta} />
      <Footer />
    </>
  );
}
