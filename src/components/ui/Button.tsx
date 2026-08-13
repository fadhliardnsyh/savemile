import Link from "next/link";
import { cn } from "@/lib/cn";

type Variant = "primary" | "dark" | "outline" | "outlineLight" | "glass" | "ghost" | "wa";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 font-medium rounded-full transition-all duration-200 ease-out whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-orange disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary:
    "bg-orange text-white hover:bg-orange-deep shadow-[var(--shadow-orange)] hover:-translate-y-0.5 focus-visible:ring-offset-paper",
  dark: "bg-ink text-paper hover:bg-dark-2 hover:-translate-y-0.5 focus-visible:ring-offset-paper",
  outline:
    "border border-ink/20 text-ink hover:border-ink/50 hover:bg-ink/[0.03] focus-visible:ring-offset-paper",
  outlineLight:
    "border border-white/35 text-white hover:border-white/70 hover:bg-white/10 focus-visible:ring-white focus-visible:ring-offset-transparent",
  glass:
    "bg-white/10 text-white backdrop-blur-md hover:bg-white/20 focus-visible:ring-white focus-visible:ring-offset-transparent",
  ghost:
    "text-ink/80 hover:text-ink hover:bg-ink/[0.05] focus-visible:ring-offset-paper",
  wa: "bg-wa text-white hover:brightness-95 shadow-[0_12px_30px_-12px_rgba(37,211,102,0.55)] hover:-translate-y-0.5 focus-visible:ring-wa",
};

const sizes: Record<Size, string> = {
  md: "h-11 px-5 text-sm",
  lg: "h-13 px-7 text-base",
};

export function Button({
  href,
  onClick,
  type = "button",
  variant = "primary",
  size = "md",
  className,
  children,
  external,
  ...rest
}: {
  href?: string;
  onClick?: (e: React.MouseEvent) => void;
  type?: "button" | "submit" | "reset";
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
  external?: boolean;
  [key: string]: unknown;
}) {
  if (href) {
    return (
      <Link
        href={href}
        onClick={onClick}
        className={cn(base, variants[variant], sizes[size], className)}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...rest}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={cn(base, variants[variant], sizes[size], className)}
      {...rest}
    >
      {children}
    </button>
  );
}
