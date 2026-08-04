import { site } from "@/lib/content";
import { Icon } from "@/components/ui/Icon";

/** Tombol WhatsApp mengambang, tampil di semua halaman. */
export function FloatingWhatsApp() {
  return (
    <a
      href={site.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat WhatsApp"
      className="group fixed bottom-5 right-5 z-50 flex items-center justify-center rounded-full bg-wa p-4 text-white shadow-[0_14px_34px_-10px_rgba(37,211,102,0.6)] transition-transform duration-200 hover:-translate-y-0.5 hover:brightness-95 sm:bottom-6 sm:right-6"
    >
      <Icon name="whatsapp" className="h-6 w-6 shrink-0" />
      <span className="max-w-0 overflow-hidden whitespace-nowrap text-sm font-semibold opacity-0 transition-all duration-300 group-hover:ml-2.5 group-hover:max-w-40 group-hover:opacity-100">
        Chat WhatsApp
      </span>
    </a>
  );
}
