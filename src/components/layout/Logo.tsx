import Image from "next/image";
import { cn } from "@/lib/cn";

/**
 * Logo SaveMile (wordmark PNG, oranye).
 * Warna oranye terbaca baik di atas background gelap maupun terang,
 * jadi `tone` tak lagi memengaruhi tampilan (dipertahankan untuk kompatibilitas).
 */
export function Logo({
  className,
}: {
  className?: string;
  tone?: "light" | "dark";
}) {
  return (
    <Image
      src="/assets/logos/savemile-logo.png"
      alt="SaveMile"
      width={1350}
      height={164}
      priority
      className={cn("w-auto", className ?? "h-8")}
    />
  );
}
