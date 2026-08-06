import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { Icon, type IconName } from "@/components/ui/Icon";
import { ProductCard } from "@/components/catalog/ProductCard";
import { ProductActions } from "@/components/catalog/ProductActions";
import { CtaSection } from "@/components/sections/CtaSection";
import {
  relatedProducts,
  tipeLabels,
  compatibleLabels,
  medanIcons,
  medanLabels,
  fiturLabels,
  type Medan,
} from "@/lib/catalog";
import { consultCta, site } from "@/lib/content";
import { cn } from "@/lib/cn";

import { getCatalogProductsServer, getProductByIdServer } from "@/lib/payload";

export async function generateStaticParams() {
  const products = await getCatalogProductsServer();
  return products.map((p) => ({ id: p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const p = await getProductByIdServer(id);
  if (!p) return { title: "Produk tidak ditemukan" };
  return {
    title: `${p.name} · Ban ${p.brandChip}`,
    description:
      p.description ||
      `Ban ${tipeLabels[p.tipe]} ${p.brandChip} ${p.name} dari SaveMile.`,
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProductByIdServer(id);
  if (!product) notFound();

  const allProducts = await getCatalogProductsServer();
  const related = relatedProducts(product, 3).map(
    (rp) => allProducts.find((ap) => ap.id === rp.id) || rp,
  );

  return (
    <>
      <Navbar />
      <main className="relative z-10 flex-1 pt-24 pb-8 sm:pt-28">
        <Container>
          {/* Breadcrumb */}
          <nav className="mb-8 flex flex-wrap items-center gap-2 text-xs">
            <Link
              href="/"
              className="text-muted transition-colors hover:text-orange"
            >
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
            {/* ── Gambar ── */}
            <div className="lg:sticky lg:top-24 lg:self-start">
              <div className="relative flex aspect-square items-center justify-center overflow-hidden rounded-[28px] bg-paper-2 ring-1 ring-inset ring-line">
                <div
                  aria-hidden
                  className="absolute inset-0 bg-[radial-gradient(circle_at_50%_55%,rgba(252,61,4,0.1),transparent_70%)]"
                />
                {product.image ? (
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={800}
                    height={800}
                    className="h-[82%] w-auto object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.18)]"
                    priority
                  />
                ) : (
                  <Icon name="tire" className="h-48 w-48 text-ink/12" />
                )}
                <span className="absolute right-5 top-5 rounded-full bg-orange/10 px-3 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-wider text-orange ring-1 ring-inset ring-orange/20">
                  {tipeLabels[product.tipe] || product.tipe}
                </span>
                <span
                  className={cn(
                    "absolute bottom-5 left-5 rounded-full px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider",
                    product.brand === "tiron"
                      ? "bg-[#c0392b]/10 text-[#c0392b] ring-1 ring-inset ring-[#c0392b]/20"
                      : "bg-dark/8 text-dark ring-1 ring-inset ring-dark/15",
                  )}
                >
                  {product.brandChip}
                </span>
              </div>
            </div>

            {/* ── Info ── */}
            <div>
              <div className="font-mono text-xs font-semibold uppercase tracking-[0.12em] text-orange">
                Ban {tipeLabels[product.tipe]} · {product.brandChip}
              </div>
              <h1 className="mt-2 font-display text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">
                {product.name}
              </h1>

              {product.description && (
                <p className="mt-6 text-base leading-relaxed text-ink-soft text-pretty">
                  {product.description}
                </p>
              )}

              {/* Cocok untuk */}
              {product.compatible.length > 0 && (
                <ChipBlock
                  title="Cocok untuk"
                  items={product.compatible.map((c) => compatibleLabels[c])}
                />
              )}

              {/* Medan */}
              {product.medan.length > 0 && (
                <ChipBlock
                  title="Medan"
                  items={product.medan.map((m) => ({
                    label: medanLabels[m] || m,
                    icon: medanIcons[m as Medan],
                  }))}
                />
              )}

              {/* Fitur */}
              {product.fitur.length > 0 && (
                <ChipBlock
                  title="Fitur"
                  items={product.fitur.map((f) => fiturLabels[f])}
                />
              )}

              {/* Ukuran (pilih) + CTA */}
              <ProductActions
                brandChip={product.brandChip}
                name={product.name}
                tipe={tipeLabels[product.tipe]}
                sizes={product.sizes}
                whatsapp={site.whatsapp}
              />
            </div>
          </div>

          {/* ── Produk terkait ── */}
          {related.length > 0 && (
            <div className="mt-20 border-t border-line pt-14">
              <div className="mb-8 flex items-end justify-between gap-4">
                <h2 className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
                  Produk terkait
                </h2>
                <Link
                  href="/solusi/ban"
                  className="group inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted transition-colors hover:text-orange"
                >
                  Lihat semua
                  <Icon
                    name="arrow"
                    className="h-4 w-4 transition-transform group-hover:translate-x-1"
                  />
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

function ChipBlock({
  title,
  items,
}: {
  title: string;
  items: (string | { label: string; icon?: IconName })[];
}) {
  return (
    <div className="mt-7">
      <h2 className="font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-muted">
        {title}
      </h2>
      <div className="mt-3 flex flex-wrap gap-2.5">
        {items.map((item) => {
          const label = typeof item === "string" ? item : item.label;
          const icon = typeof item === "string" ? undefined : item.icon;
          return (
            <span
              key={label}
              className="inline-flex items-center gap-2 rounded-xl bg-orange/8 px-3.5 py-2 text-xs font-medium text-ink ring-1 ring-inset ring-orange/25"
            >
              {icon && <Icon name={icon} className="h-3.5 w-3.5 text-orange" />}
              {label}
            </span>
          );
        })}
      </div>
    </div>
  );
}
