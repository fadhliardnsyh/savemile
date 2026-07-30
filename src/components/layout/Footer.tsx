import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { footerColumns, site } from "@/lib/content";

export function Footer() {
  return (
    <footer className="relative z-10 mt-auto bg-dark text-white">
      <Container className="py-14">
        <div className="grid gap-10 lg:grid-cols-5">
          {/* Brand + address */}
          <div className="lg:col-span-2">
            <Image
              src="/assets/logos/savemile-logo.png"
              alt="SaveMile"
              width={1350}
              height={164}
              className="h-6 w-auto"
            />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/75">
              {site.blurb}
            </p>
            <div className="mt-5 space-y-1.5 text-sm text-white/80">
              <p className="max-w-xs">{site.address}</p>
              <p className="font-mono">{site.email}</p>
            </div>
          </div>

          {/* Menu columns */}
          {footerColumns.map((col) => (
            <div key={col.title}>
              <h3 className="font-mono text-xs uppercase tracking-[0.14em] text-white/60">
                {col.title}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/85 transition-colors hover:text-orange"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-dark-line pt-6 pb-16 sm:flex-row sm:items-center sm:pb-6 sm:pr-24">
          <p className="text-sm text-white/70">
            © {new Date().getFullYear()} {site.name}. Seluruh hak cipta dilindungi.
          </p>
          <Link
            href={site.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-white/85 transition-colors hover:text-white"
          >
            <Icon name="whatsapp" className="h-4 w-4" />
            Konsultasi via WhatsApp
          </Link>
        </div>
      </Container>
    </footer>
  );
}
