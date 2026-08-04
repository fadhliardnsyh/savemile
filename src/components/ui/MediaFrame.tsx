import Image from "next/image";
import { cn } from "@/lib/cn";
import { Icon, type IconName } from "@/components/ui/Icon";

/**
 * Bingkai media serbaguna. Jika `src` diisi, menampilkan foto (next/image).
 * Jika kosong, menampilkan placeholder bertekstur — taruh file di
 * `public/assets/images/` lalu isi `src` (mis. "/assets/images/truk.jpg").
 */
export function MediaFrame({
  src,
  alt = "",
  caption = "Taruh foto di sini",
  icon = "tire",
  ratio = "aspect-[4/3]",
  className,
  rounded = "rounded-2xl",
}: {
  src?: string;
  alt?: string;
  caption?: string;
  icon?: IconName;
  ratio?: string;
  className?: string;
  rounded?: string;
}) {
  return (
    <div
      className={cn(
        "relative w-full overflow-hidden border border-ink/10 bg-paper-2",
        ratio,
        rounded,
        className,
      )}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width:768px) 100vw, 50vw"
        />
      ) : (
        <div className="dotgrid absolute inset-0 grid place-items-center text-orange/30">
          <div className="flex flex-col items-center gap-3 text-center">
            <span className="grid h-16 w-16 place-items-center rounded-2xl bg-card text-orange shadow-(--shadow-soft)">
              <Icon name={icon} className="h-8 w-8" />
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
              {caption}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
