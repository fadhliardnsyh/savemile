"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/layout/Logo";
import { nav } from "@/lib/content";
import { cn } from "@/lib/cn";

export function Navbar({ overHero = false }: { overHero?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Tampilan terang (teks putih) saat berada di atas hero gelap & belum discroll
  const light = overHero && !scrolled && !open;

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="relative">
        {/* Background bar — crossfade opacity, tanpa garis border */}
        <div
          aria-hidden
          className={cn(
            "absolute inset-0 bg-paper/85 shadow-[0_10px_30px_-18px_rgba(22,19,14,0.4)] backdrop-blur-md transition-opacity duration-200 ease-out",
            scrolled || open ? "opacity-100" : "opacity-0"
          )}
        />
        <Container className="relative flex h-16 items-center justify-between">
          <Link href="/" aria-label="SaveMile beranda">
            <Logo tone={light ? "dark" : "light"} className="h-12" />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 md:flex">
            {nav.map((group) => (
              <div key={group.label} className="group relative">
                <button
                  type="button"
                  className={cn(
                    "flex items-center gap-1.5 rounded-full px-4 py-2 text-sm transition-colors duration-200 ease-out",
                    light
                      ? "text-white/85 hover:bg-white/10 hover:text-white"
                      : "text-ink-soft hover:bg-ink/[0.04] hover:text-ink"
                  )}
                >
                  {group.label}
                  <svg
                    viewBox="0 0 24 24"
                    className="h-3.5 w-3.5 transition-transform duration-200 group-hover:rotate-180"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    aria-hidden
                  >
                    <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>

                {/* Dropdown */}
                <div className="invisible absolute left-0 top-full pt-2 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
                  <div className="w-72 rounded-2xl border border-line bg-card p-2 shadow-[var(--shadow-lift)]">
                    {group.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block rounded-xl px-3 py-2.5 transition-colors hover:bg-orange-soft/60"
                      >
                        <span className="block text-sm font-medium text-ink">
                          {child.label}
                        </span>
                        {child.desc && (
                          <span className="mt-0.5 block text-xs text-muted">
                            {child.desc}
                          </span>
                        )}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </nav>

          <div className="hidden items-center gap-2 md:flex">
            <Button
              href="/company/contact"
              variant={light ? "glass" : "outline"}
              size="md"
            >
              Kontak
            </Button>
            <Button href="/solusi/ban" variant="primary" size="md">
              Cari Ban
            </Button>
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="Buka menu"
            aria-expanded={open}
            className={cn(
              "grid h-10 w-10 place-items-center rounded-lg border md:hidden",
              light ? "border-white/30" : "border-ink/15"
            )}
          >
            <span className="flex flex-col gap-1.5">
              <span className={cn("h-0.5 w-5 transition-transform", light ? "bg-white" : "bg-ink", open && "translate-y-2 rotate-45")} />
              <span className={cn("h-0.5 w-5 transition-opacity", light ? "bg-white" : "bg-ink", open && "opacity-0")} />
              <span className={cn("h-0.5 w-5 transition-transform", light ? "bg-white" : "bg-ink", open && "-translate-y-2 -rotate-45")} />
            </span>
          </button>
        </Container>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "overflow-y-auto border-b border-line/70 bg-paper/97 backdrop-blur-md transition-[max-height] duration-300 md:hidden",
          open ? "max-h-[80vh]" : "max-h-0"
        )}
      >
        <Container className="flex flex-col gap-1 py-4">
          {nav.map((group) => {
            const expanded = openGroup === group.label;
            return (
              <div key={group.label} className="border-b border-line/60 last:border-0">
                <button
                  type="button"
                  onClick={() => setOpenGroup(expanded ? null : group.label)}
                  className="flex w-full items-center justify-between px-3 py-3 text-sm font-medium text-ink"
                >
                  {group.label}
                  <svg
                    viewBox="0 0 24 24"
                    className={cn("h-4 w-4 transition-transform", expanded && "rotate-180")}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    aria-hidden
                  >
                    <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <div className={cn("overflow-hidden transition-[max-height] duration-300", expanded ? "max-h-60" : "max-h-0")}>
                  <div className="pb-2 pl-3">
                    {group.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={() => setOpen(false)}
                        className="block rounded-lg px-3 py-2 text-sm text-ink-soft hover:bg-ink/[0.04]"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
          <div className="mt-3 flex flex-col gap-2">
            <Button href="/company/contact" variant="outline" size="md">
              Kontak
            </Button>
            <Button href="/solusi/ban" variant="primary" size="md">
              Cari Ban
            </Button>
          </div>
        </Container>
      </div>
    </header>
  );
}
