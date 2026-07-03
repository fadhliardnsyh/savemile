import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { Icon, type IconName } from "@/components/ui/Icon";
import { site, type CtaContent } from "@/lib/content";

type CtaAction = {
  label: string;
  href: string;
  icon?: IconName;
  external?: boolean;
};

/**
 * Section CTA standar (tema gelap + glow oranye).
 * Dipakai konsisten di semua halaman — cukup oper konten yang berbeda.
 * Default: tombol WhatsApp (+ Telepon). Untuk aksi lain, oper `action`.
 */
export function CtaSection({
  content,
  showPhone = true,
  action,
}: {
  content: CtaContent;
  showPhone?: boolean;
  action?: CtaAction;
}) {
  return (
    <section className="relative z-10 overflow-hidden bg-dark py-20 text-paper sm:py-24">
      <div
        aria-hidden
        className="absolute left-1/2 top-0 h-96 w-[42rem] -translate-x-1/2 rounded-full bg-orange/15 blur-3xl"
      />
      <Container className="relative text-center">
        <Reveal className="flex justify-center">
          <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.16em] text-orange">
            <span className="h-1.5 w-1.5 rounded-full bg-orange" />
            {content.eyebrow}
          </span>
        </Reveal>
        <Reveal delay={60}>
          <h2 className="mx-auto mt-4 max-w-2xl font-display text-3xl font-extrabold tracking-tight text-white text-balance sm:text-4xl">
            {content.titleLead}
            <span className="text-orange">{content.titleAccent}</span>
          </h2>
        </Reveal>
        <Reveal delay={120}>
          <p className="mx-auto mt-4 max-w-md text-paper/60 text-pretty">
            {content.description}
          </p>
        </Reveal>
        <Reveal delay={180}>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            {action ? (
              <Button href={action.href} variant="primary" size="lg" external={action.external}>
                {action.icon && <Icon name={action.icon} className="h-5 w-5" />}
                {action.label}
              </Button>
            ) : (
              <Button href={site.whatsapp} variant="wa" size="lg" external>
                <Icon name="whatsapp" className="h-5 w-5" />
                {content.whatsappLabel}
              </Button>
            )}
            {showPhone && (
              <Button href={`tel:${site.phone}`} variant="glass" size="lg">
                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.6}
                  aria-hidden
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
        </Reveal>
      </Container>
    </section>
  );
}
