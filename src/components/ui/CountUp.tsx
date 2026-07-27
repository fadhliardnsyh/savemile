"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Menampilkan angka yang menghitung naik dari 0 saat masuk viewport.
 * Menerima string tampilan (mis. "30.000+", "99%") — bagian angka dianimasikan,
 * prefix/suffix (%, +, dll.) dipertahankan. Format ribuan mengikuti id-ID.
 */
function parse(value: string) {
  const prefix = value.match(/^[^\d]*/)?.[0] ?? "";
  const suffix = value.match(/[^\d]*$/)?.[0] ?? "";
  const target = parseInt(value.replace(/[^\d]/g, "") || "0", 10);
  return { prefix, suffix, target };
}

export function CountUp({
  value,
  className,
  duration = 1600,
}: {
  value: string;
  className?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const { prefix, suffix, target } = parse(value);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) {
      // setState di rAF agar tidak dipanggil sinkron di body effect
      const raf0 = requestAnimationFrame(() => setDisplay(target));
      return () => cancelAnimationFrame(raf0);
    }

    let raf = 0;
    let startTs = 0;
    const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

    const step = (ts: number) => {
      if (!startTs) startTs = ts;
      const p = Math.min((ts - startTs) / duration, 1);
      setDisplay(Math.round(easeOutExpo(p) * target));
      if (p < 1) raf = requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          raf = requestAnimationFrame(step);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
    };
  }, [target, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display.toLocaleString("id-ID")}
      {suffix}
    </span>
  );
}
