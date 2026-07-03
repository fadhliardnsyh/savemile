import { cn } from "@/lib/cn";

/** Label kecil di atas judul section (mis. "Fitur"). */
export function SectionLabel({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-orange",
        className
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-orange" />
      {children}
    </span>
  );
}
