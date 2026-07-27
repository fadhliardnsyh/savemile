import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/layout/Logo";
import { Icon } from "@/components/ui/Icon";
import { footerColumns, site } from "@/lib/content";

export function Footer() {
  return (
    <footer className="relative z-10 mt-auto border-t border-line bg-paper-2">
      <Container className="py-14">
        <div className="grid gap-10 lg:grid-cols-5">
          {/* Brand + address */}
          <div className="lg:col-span-2">
            <Logo className="h-6" />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
              {site.blurb}
            </p>
            <div className="mt-5 space-y-1.5 text-sm text-ink-soft">
              <p className="max-w-xs">{site.address}</p>
              <p className="font-mono">{site.email}</p>
            </div>
          </div>

          {/* Menu columns */}
          {footerColumns.map((col) => (
            <div key={col.title}>
              <h3 className="font-mono text-xs uppercase tracking-[0.14em] text-muted">
                {col.title}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-ink-soft transition-colors hover:text-orange"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-line pt-6 pb-16 sm:flex-row sm:items-center sm:pb-6 sm:pr-24">
          <p className="text-sm text-muted">
            © {new Date().getFullYear()} {site.name}. Seluruh hak cipta dilindungi.
          </p>
          <Link
            href={site.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-ink-soft transition-colors hover:text-wa"
          >
            <Icon name="whatsapp" className="h-4 w-4" />
            Konsultasi via WhatsApp
          </Link>
        </div>
      </Container>
    </footer>
  );
}
