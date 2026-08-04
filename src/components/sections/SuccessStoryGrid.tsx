"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";
import type { Story } from "@/lib/content";
import { cn } from "@/lib/cn";

const PER_PAGE = 15; // 3 kolom x 5 baris

export function SuccessStoryGrid({ items }: { items: Story[] }) {
  const [page, setPage] = useState(1);
  const pageCount = Math.max(1, Math.ceil(items.length / PER_PAGE));
  const current = Math.min(page, pageCount);
  const start = (current - 1) * PER_PAGE;
  const shown = items.slice(start, start + PER_PAGE);

  return (
    <div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((s, i) => (
          <Reveal key={s.title} delay={(i % 3) * 90}>
            <GridStoryCard story={s} />
          </Reveal>
        ))}
      </div>

      {pageCount > 1 && (
        <div className="mt-14 flex items-center justify-center gap-2">
          <PageArrow
            label="Halaman sebelumnya"
            disabled={current === 1}
            onClick={() => setPage(current - 1)}
          >
            <Icon name="arrow" className="h-4 w-4 rotate-180" />
          </PageArrow>

          {Array.from({ length: pageCount }, (_, i) => i + 1).map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => setPage(n)}
              aria-current={n === current ? "page" : undefined}
              className={cn(
                "grid h-10 w-10 place-items-center rounded-full text-sm font-semibold transition-colors",
                n === current
                  ? "bg-orange text-white"
                  : "text-ink/70 hover:bg-ink/5",
              )}
            >
              {n}
            </button>
          ))}

          <PageArrow
            label="Halaman berikutnya"
            disabled={current === pageCount}
            onClick={() => setPage(current + 1)}
          >
            <Icon name="arrow" className="h-4 w-4" />
          </PageArrow>
        </div>
      )}
    </div>
  );
}

/** Kartu grid: gambar di atas, teks di bawah (di luar gambar). */
function GridStoryCard({ story }: { story: Story }) {
  return (
    <Link
      href={story.href}
      className="beam group relative flex h-full flex-col overflow-hidden rounded-card bg-card shadow-(--shadow-soft) ring-1 ring-inset ring-line/70 transition-all duration-300 hover:-translate-y-1 hover:shadow-(--shadow-lift)"
    >
      <span className="beam-line" aria-hidden />

      {/* Gambar */}
      <div className="relative aspect-16/10 overflow-hidden bg-dark">
        {story.image ? (
          <Image
            src={story.image}
            alt={story.title}
            fill
            sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        ) : (
          <div aria-hidden className="absolute inset-0">
            <div className="absolute inset-0 bg-linear-to-br from-dark-2 to-dark" />
            <Icon
              name="truck"
              className="absolute -right-4 bottom-2 h-28 w-28 text-white/6"
            />
          </div>
        )}
      </div>

      {/* Teks */}
      <div className="flex flex-1 flex-col p-6">
        <span className="font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-orange">
          Success Story · {story.tag}
        </span>
        <h3 className="mt-2 font-display text-lg font-bold leading-snug text-ink text-balance">
          {story.title}
        </h3>
        <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-muted text-pretty">
          {story.description}
        </p>
        <span className="mt-4 inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-orange">
          Read case study
          <Icon
            name="arrow"
            className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1"
          />
        </span>
      </div>
    </Link>
  );
}

function PageArrow({
  children,
  disabled,
  onClick,
  label,
}: {
  children: React.ReactNode;
  disabled: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className="grid h-10 w-10 place-items-center rounded-full border border-line text-ink/70 transition-colors hover:border-orange/50 hover:text-orange disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-line disabled:hover:text-ink/70"
    >
      {children}
    </button>
  );
}
