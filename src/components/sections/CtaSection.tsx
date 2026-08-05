import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/layout/Logo";
import { Icon, type IconName } from "@/components/ui/Icon";
import { site, type CtaContent } from "@/lib/content";
import { getWaUrl } from "@/lib/whatsapp";

type CtaAction = {
  label: string;
  href: string;
  icon?: IconName;
  external?: boolean;
};

/**
 * Section CTA standar: kartu membulat dengan background abu-abu tipis,
 * badge logo, judul, deskripsi, dan tombol aksi.
 * Dipakai konsisten di semua halaman — cukup oper konten yang berbeda.
 * Default: tombol WhatsApp (+ Telepon). Untuk aksi lain, oper `action`.
 */
export function CtaSection({
  content,
  showPhone = false,
  action,
}: {
  content: CtaContent;
  showPhone?: boolean;
  action?: CtaAction;
}) {
  const waHref = content.whatsappUrl || getWaUrl(site.whatsapp, content.whatsappMessage);

  return (
    <section className="relative z-10 py-16 sm:py-20">
      <Container>
        <Reveal delay={60}>
          <div className="rounded-4xl bg-paper-2 px-6 py-14 text-center sm:px-12 sm:py-20">
            <Logo className="mx-auto h-6" />

            <h2 className="mx-auto mt-6 max-w-2xl font-display text-4xl font-extrabold tracking-tight text-ink text-balance sm:text-5xl">
              {content.titleLead}
              <span className="text-orange">{content.titleAccent}</span>
            </h2>

            <p className="mx-auto mt-4 max-w-md text-muted text-pretty">
              {content.description}
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              {action ? (
                <Button
                  href={action.href}
                  variant="primary"
                  size="lg"
                  external={action.external}
                >
                  {action.icon && (
                    <Icon name={action.icon} className="h-5 w-5" />
                  )}
                  {action.label}
                </Button>
              ) : (
                <Button href={waHref} variant="wa" size="lg" external>
                  <Icon name="whatsapp" className="h-5 w-5" />
                  {content.whatsappLabel}
                </Button>
              )}
              {showPhone && (
                <Button href={`tel:${site.phone}`} variant="outline" size="lg">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.6}
                    aria-hidden="true"
                  >
                    <path
                      d="M4 5c0 8 7 15 15 15l2.5-3.5-4-2-2 2c-3-1.5-5.5-4-7-7l2-2-2-4z"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Telepon Sekarang
                </Button>
              )}
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
