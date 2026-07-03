"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

export type SelectOption = { value: string; label: string };

/**
 * Dropdown select custom bergaya SaveMile (bukan <select> native).
 * Animasi buka/tutup halus, tutup saat klik luar / Escape.
 */
export function Select({
  value,
  onChange,
  options,
  ariaLabel,
  align = "right",
  className,
}: {
  value: string;
  onChange: (v: string) => void;
  options: SelectOption[];
  ariaLabel?: string;
  align?: "left" | "right";
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const current = options.find((o) => o.value === value);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={ariaLabel}
        className="flex h-12 items-center gap-2 rounded-full border border-line bg-card pl-4 pr-3.5 text-sm font-medium text-ink outline-none transition-all duration-200 hover:border-orange/50 hover:shadow-[var(--shadow-soft)] focus-visible:border-orange focus-visible:shadow-none focus-visible:ring-4 focus-visible:ring-orange/15"
      >
        <span className="whitespace-nowrap">{current?.label}</span>
        <svg
          viewBox="0 0 24 24"
          className={cn(
            "h-4 w-4 text-muted transition-transform duration-200",
            open && "rotate-180"
          )}
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden
        >
          <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <div
        role="listbox"
        className={cn(
          "absolute z-40 mt-2 min-w-44 origin-top rounded-2xl border border-line bg-card p-1.5 shadow-[var(--shadow-lift)] transition-all duration-200 ease-out",
          align === "right" ? "right-0" : "left-0",
          open
            ? "visible translate-y-0 scale-100 opacity-100"
            : "pointer-events-none invisible -translate-y-1 scale-95 opacity-0"
        )}
      >
        {options.map((o) => {
          const selected = o.value === value;
          return (
            <button
              key={o.value}
              type="button"
              role="option"
              aria-selected={selected}
              onClick={() => {
                onChange(o.value);
                setOpen(false);
              }}
              className={cn(
                "flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2 text-left text-sm transition-colors duration-150",
                selected
                  ? "bg-orange-soft/70 font-semibold text-orange-deep"
                  : "text-ink-soft hover:bg-ink/[0.04]"
              )}
            >
              {o.label}
              {selected && (
                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4 text-orange"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2.4}
                  aria-hidden
                >
                  <path d="m5 12 4 4 10-10" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
