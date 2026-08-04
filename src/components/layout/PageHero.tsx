import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";

/**
 * Banner standar untuk sub-halaman (About, Career, Contact, dll).
 * Gaya sederhana: gambar background + judul halaman di kiri bawah.
 * Props `eyebrow` & `description` dipertahankan untuk kompatibilitas
 * pemanggil lama, tapi tidak lagi ditampilkan.
 */
export function PageHero({
  titleLead,
  titleAccent,
  image,
}: {
  eyebrow?: string;
  titleLead: string;
  titleAccent: string;
  description?: string;
  image?: string;
}) {
  return (
    <section className="relative flex min-h-[38vh] items-end overflow-hidden bg-dark pt-28 pb-10 text-paper sm:min-h-[42vh] sm:pb-12">
      <div aria-hidden className="absolute inset-0">
        {image ? (
          <Image
            src={image}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        ) : (
          <>
            <div className="linegrid absolute inset-0 opacity-[0.12] text-white" />
            <Icon
              name="tire"
              className="absolute -right-16 top-1/2 h-104 w-104 -translate-y-1/2 text-white/5"
            />
          </>
        )}
        {/* Overlay agar judul tetap terbaca di atas gambar */}
        <div className="absolute inset-0 bg-linear-to-t from-dark via-dark/55 to-dark/20" />
      </div>

      <Container className="relative z-10">
        <h1 className="fade-up font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-white text-balance sm:text-5xl">
          {titleLead}
          <span className="text-white">{titleAccent}</span>
        </h1>
      </Container>
    </section>
  );
}
