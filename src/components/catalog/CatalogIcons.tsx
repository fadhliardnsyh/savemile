import type { CharKey } from "@/lib/catalog";
import { cn } from "@/lib/cn";

/* ── Vehicle fit icons (siluet kendaraan) ── */
export function VehicleIcon({
  type,
  active,
  className,
}: {
  type: 0 | 1 | 2;
  active: boolean;
  className?: string;
}) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.3,
    strokeLinejoin: "round" as const,
    strokeLinecap: "round" as const,
  };
  const cls = cn(active ? "opacity-90" : "opacity-25", className);

  if (type === 0)
    return (
      <svg width="26" height="16" viewBox="0 0 26 16" className={cls} aria-hidden>
        <path d="M1 11V4h11l3 4v3" {...common} />
        <path d="M12 4l3 4h3v3" {...common} />
        <path d="M1 11h20" {...common} />
        <circle cx="5.5" cy="12.5" r="1.8" {...common} />
        <circle cx="17" cy="12.5" r="1.8" {...common} />
      </svg>
    );
  if (type === 1)
    return (
      <svg width="26" height="16" viewBox="0 0 26 16" className={cls} aria-hidden>
        <path d="M1 11V5h6l3 3v3" {...common} />
        <path d="M10 5h4l4 4v2" {...common} />
        <path d="M1 11h21" {...common} />
        <circle cx="5" cy="12.5" r="1.8" {...common} />
        <circle cx="14" cy="12.5" r="1.8" {...common} />
        <circle cx="19" cy="12.5" r="1.8" {...common} />
      </svg>
    );
  return (
    <svg width="34" height="16" viewBox="0 0 34 16" className={cls} aria-hidden>
      <path d="M1 11V5h5l2 3v3" {...common} />
      <path d="M8 11h2" {...common} />
      <rect x="12" y="4" width="20" height="7" rx="0.6" {...common} />
      <path d="M1 11h31" {...common} />
      <circle cx="4.5" cy="12.5" r="1.8" {...common} />
      <circle cx="24" cy="12.5" r="1.8" {...common} />
      <circle cx="29" cy="12.5" r="1.8" {...common} />
    </svg>
  );
}

/* ── Characteristic icons ── */
const charPaths: Record<CharKey, React.ReactNode> = {
  antiAus: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 12V5" />
      <circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none" />
    </>
  ),
  ketahanan: (
    <>
      <path d="M12 2l8 3.5v6c0 5-3.5 8.5-8 10.5-4.5-2-8-5.5-8-10.5v-6L12 2z" />
      <path d="M9 12l2 2 4-4.5" />
    </>
  ),
  beban: (
    <>
      <path d="M4 18h16M6 18l1.5-9h9L18 18" />
      <path d="M9 9V5h6v4" />
    </>
  ),
  cengkeraman: (
    <>
      <path d="M12 21c-4-3-7-6.5-7-11a7 7 0 0114 0c0 4.5-3 8-7 11z" />
      <path d="M9 10l3 3 4-4.5" />
    </>
  ),
  antiTusukan: (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="3.2" />
      <path d="M12 2v3.5M12 18.5V22M2 12h3.5M18.5 12H22" />
    </>
  ),
  hematBbm: (
    <>
      <path d="M5 21V5a2 2 0 012-2h6a2 2 0 012 2v16" />
      <path d="M5 12h10M15 8l3 2v6a1.5 1.5 0 003 0V9l-3-3" />
      <path d="M3 21h14" />
    </>
  ),
  stabilitas: (
    <>
      <path d="M4 17l5-9 3 5 3-4 5 8" />
      <path d="M3 20h18" />
    </>
  ),
  performaBasah: (
    <>
      <path d="M17.5 13a5.5 5.5 0 11-11 0c0-3 5.5-9 5.5-9s5.5 6 5.5 9z" />
      <path d="M20 16c1.5 1 2 2.2 2 3.2 0 1.6-1.34 2.8-3 2.8" />
    </>
  ),
};

export function CharIcon({
  name,
  className,
}: {
  name: CharKey;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      {charPaths[name]}
    </svg>
  );
}

/* ── Info strip icons ── */
type InfoName = "certificate" | "delivery" | "guarantee" | "headset";
const infoPaths: Record<InfoName, React.ReactNode> = {
  certificate: (
    <>
      <circle cx="12" cy="9" r="5" />
      <path d="M9 13l-1.5 8L12 18l4.5 3L15 13" />
      <path d="M10 9l1.5 1.5L14.5 7.5" />
    </>
  ),
  delivery: (
    <>
      <path d="M3 7h11v9H3zM14 10h3.5l2.5 3v3h-6" />
      <circle cx="7" cy="18" r="1.6" />
      <circle cx="17" cy="18" r="1.6" />
    </>
  ),
  guarantee: (
    <>
      <path d="M12 2l8 3.5v6c0 5-3.5 8.5-8 10.5-4.5-2-8-5.5-8-10.5v-6L12 2z" />
      <path d="M9 12l2 2 4-4.5" />
    </>
  ),
  headset: (
    <>
      <path d="M4 13v-1a8 8 0 0116 0v1" />
      <rect x="3" y="13" width="4" height="6" rx="1.2" />
      <rect x="17" y="13" width="4" height="6" rx="1.2" />
      <path d="M20 19a4 4 0 01-4 3h-2" />
    </>
  ),
};

export function InfoIcon({
  name,
  className,
}: {
  name: InfoName;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      {infoPaths[name]}
    </svg>
  );
}
