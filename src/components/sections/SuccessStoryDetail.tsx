"use client";

import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";
import type { Story } from "@/lib/content";

export function SuccessStoryDetail({
  story,
  otherStories,
  whatsappUrl,
}: {
  story: Story;
  otherStories: Story[];
  whatsappUrl: string;
}) {
  const waLink =
    whatsappUrl ||
    `https://wa.me/6281234567890?text=${encodeURIComponent(
      `Halo SaveMile, saya membaca case study ${story.title} dan ingin berkonsultasi mengenai armada kami.`,
    )}`;

  return (
    <div className="pt-24 pb-20 sm:pt-32 sm:pb-28">
      <Container>
        {/* Breadcrumb */}
        <Reveal>
          <nav className="flex items-center gap-2 text-xs font-medium text-muted">
            <Link href="/" className="transition-colors hover:text-orange">
              Home
            </Link>
            <span>/</span>
            <Link
              href="/insight/success-story"
              className="transition-colors hover:text-orange"
            >
              Success Story
            </Link>
            <span>/</span>
            <span className="truncate max-w-50 sm:max-w-none text-ink font-semibold">
              {story.tag}
            </span>
          </nav>
        </Reveal>

        {/* Hero Header */}
        <Reveal delay={100} className="mt-6 max-w-4xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center rounded-full bg-orange/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-orange ring-1 ring-inset ring-orange/20">
              {story.tag}
            </span>
            {story.units && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-surface-2 px-3 py-1 text-xs font-semibold text-muted ring-1 ring-inset ring-line/80">
                <Icon name="truck" className="h-3.5 w-3.5 text-orange" />
                {story.units}
              </span>
            )}
          </div>

          <h1 className="mt-4 font-display text-2xl sm:text-4xl lg:text-5xl font-extrabold leading-tight text-ink text-balance">
            {story.title}
          </h1>

          <p className="mt-4 text-base sm:text-lg leading-relaxed text-muted text-pretty">
            {story.description}
          </p>
        </Reveal>

        {/* Key Metrics Bar */}
        {story.metrics && story.metrics.length > 0 && (
          <Reveal delay={150} className="mt-8">
            <div className="grid gap-4 sm:grid-cols-3">
              {story.metrics.map((m) => (
                <div
                  key={`${m.label}-${m.value}`}
                  className="rounded-2xl bg-card p-5 ring-1 ring-inset ring-line/80 shadow-xs flex flex-col justify-between"
                >
                  <span className="text-xs font-semibold text-muted uppercase tracking-wider">
                    {m.label}
                  </span>
                  <span className="mt-2 font-display text-2xl sm:text-3xl font-extrabold text-orange">
                    {m.value}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>
        )}

        {/* Featured Image */}
        <Reveal delay={200} className="mt-8">
          <div className="relative aspect-video overflow-hidden rounded-3xl bg-dark ring-1 ring-inset ring-line/80 shadow-md">
            {story.image ? (
              <Image
                src={story.image}
                alt={story.title}
                fill
                priority
                sizes="100vw"
                className="object-cover"
              />
            ) : (
              <div
                aria-hidden
                className="absolute inset-0 bg-linear-to-br from-dark-2 to-dark flex items-center justify-center"
              >
                <Icon name="truck" className="h-24 w-24 text-white/10" />
              </div>
            )}
          </div>
        </Reveal>

        {/* Main Content Layout: 2 Columns */}
        <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:items-start">
          {/* Left Column: Challenge, Solution, Body (8 cols) */}
          <div className="lg:col-span-8 space-y-10">
            {/* Tantangan */}
            {story.challenge && (
              <Reveal delay={250}>
                <div className="rounded-card bg-surface-2/60 p-6 sm:p-8 ring-1 ring-inset ring-line/70">
                  <div className="flex items-center gap-3">
                    <div className="grid h-10 w-10 place-items-center rounded-xl bg-orange/10 text-orange">
                      <Icon name="target" className="h-5 w-5" />
                    </div>
                    <h2 className="font-display text-xl font-bold text-ink">
                      Tantangan Armada
                    </h2>
                  </div>
                  <p className="mt-4 text-base leading-relaxed text-muted text-pretty">
                    {story.challenge}
                  </p>
                </div>
              </Reveal>
            )}

            {/* Solusi SaveMile */}
            {story.solution && (
              <Reveal delay={300}>
                <div className="rounded-card bg-card p-6 sm:p-8 ring-1 ring-inset ring-line/70 shadow-xs">
                  <div className="flex items-center gap-3">
                    <div className="grid h-10 w-10 place-items-center rounded-xl bg-orange/10 text-orange">
                      <Icon name="shield" className="h-5 w-5" />
                    </div>
                    <h2 className="font-display text-xl font-bold text-ink">
                      Solusi SaveMile
                    </h2>
                  </div>
                  <p className="mt-4 text-base leading-relaxed text-muted text-pretty">
                    {story.solution}
                  </p>
                </div>
              </Reveal>
            )}

            {/* Content Body Paragraphs */}
            {story.body && story.body.length > 0 && (
              <Reveal delay={350}>
                <div className="space-y-6 text-base leading-relaxed text-ink/85">
                  <h2 className="font-display text-2xl font-bold text-ink">
                    Studi Kasus & Analisis Dampak
                  </h2>
                  {story.body.map((paragraph) => (
                    <p key={paragraph} className="text-pretty">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </Reveal>
            )}
          </div>

          {/* Right Column: Sticky Sidebar (4 cols) */}
          <div className="lg:col-span-4 lg:sticky lg:top-28 space-y-6">
            {/* Quick Summary Card */}
            <Reveal delay={250}>
              <div className="rounded-card bg-card p-6 ring-1 ring-inset ring-line/70 shadow-xs">
                <h3 className="font-display text-sm font-bold uppercase tracking-wider text-muted">
                  Ringkasan Proyek
                </h3>

                <dl className="mt-4 space-y-4 text-sm">
                  <div>
                    <dt className="text-xs text-muted">Kategori Industri</dt>
                    <dd className="font-semibold text-ink mt-0.5">
                      {story.tag}
                    </dd>
                  </div>

                  {story.units && (
                    <div className="border-t border-line/60 pt-3">
                      <dt className="text-xs text-muted">Skala Armada</dt>
                      <dd className="font-semibold text-ink mt-0.5">
                        {story.units}
                      </dd>
                    </div>
                  )}

                  <div className="border-t border-line/60 pt-3">
                    <dt className="text-xs text-muted">Layanan Terpakai</dt>
                    <dd className="font-semibold text-orange mt-0.5">
                      Tire Monitoring & Consulting
                    </dd>
                  </div>
                </dl>
              </div>
            </Reveal>

            {/* CTA Card */}
            <Reveal delay={300}>
              <div className="beam relative overflow-hidden rounded-card bg-dark p-6 text-white shadow-lg">
                <span className="beam-line" aria-hidden />

                <span className="inline-flex items-center gap-1.5 font-mono text-[10px] font-bold uppercase tracking-wider text-orange">
                  <Icon name="consult" className="h-3.5 w-3.5" />
                  Konsultasi Armada
                </span>

                <h3 className="mt-2 font-display text-lg font-bold text-white">
                  Ingin hasil serupa untuk armada Anda?
                </h3>

                <p className="mt-2 text-xs text-white/70 leading-relaxed">
                  Konsultasikan kebutuhan ban kendaraan Anda dengan tim
                  spesialis SaveMile gratis.
                </p>

                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-orange px-5 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-xs transition-all hover:bg-orange/90 hover:scale-[1.02] active:scale-[0.98]"
                >
                  <Icon name="whatsapp" className="h-4 w-4" />
                  Chat WhatsApp
                </a>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Recommendations / Other Success Stories */}
        {otherStories.length > 0 && (
          <div className="mt-24 border-t border-line/70 pt-16">
            <Reveal>
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                  <span className="font-mono text-xs font-bold uppercase tracking-widest text-orange">
                    Success Story Lainnya
                  </span>
                  <h2 className="mt-1 font-display text-2xl sm:text-3xl font-extrabold text-ink">
                    Cerita Penghematan Lainnya
                  </h2>
                </div>

                <Link
                  href="/insight/success-story"
                  className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-orange hover:underline"
                >
                  Lihat Semua
                  <Icon name="arrow" className="h-3.5 w-3.5" />
                </Link>
              </div>
            </Reveal>

            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {otherStories.slice(0, 3).map((item, idx) => (
                <Reveal key={item.slug} delay={idx * 100}>
                  <Link
                    href={item.href}
                    className="beam group relative flex h-full flex-col overflow-hidden rounded-card bg-card shadow-xs ring-1 ring-inset ring-line/70 transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                  >
                    <span className="beam-line" aria-hidden />
                    <div className="relative aspect-16/10 overflow-hidden bg-dark">
                      {item.image ? (
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          sizes="(max-width:640px) 100vw, 33vw"
                          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                      ) : (
                        <div
                          aria-hidden
                          className="absolute inset-0 bg-linear-to-br from-dark-2 to-dark"
                        />
                      )}
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-orange">
                        {item.tag}
                      </span>
                      <h3 className="mt-2 font-display text-base font-bold leading-snug text-ink text-balance line-clamp-2">
                        {item.title}
                      </h3>
                      <span className="mt-4 inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-orange">
                        Baca Selengkapnya
                        <Icon
                          name="arrow"
                          className="h-3 w-3 transition-transform group-hover:translate-x-1"
                        />
                      </span>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        )}
      </Container>
    </div>
  );
}
