import Link from "next/link"
import { navigation, site } from "@/content/site"
import { mailtoHref, telHref } from "@/lib/contact"
import { Logo } from "./logo"
import { Container } from "./ui/container"
import { LinkedIn } from "./ui/icons"

export function SiteFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-ink pb-[calc(5.5rem+env(safe-area-inset-bottom))] text-linen md:pb-0">
      <Container className="grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div className="sm:col-span-2">
          <Logo accent="var(--color-brass-light)" />
          <p className="mt-6 max-w-sm text-linen/70">
            Gastronomieberatung aus der Küche heraus, für Betriebe in {site.contact.region}.
          </p>
        </div>
        <nav aria-labelledby="footer-seiten">
          <h2 id="footer-seiten" className="font-display text-lg font-bold">
            Seiten
          </h2>
          <ul className="mt-4 space-y-2">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-linen/75 transition-colors hover:text-linen">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <h2 className="font-display text-lg font-bold">Kontakt</h2>
          <ul className="mt-4 space-y-2">
            <li>
              <a href={mailtoHref()} className="break-all text-linen/75 transition-colors hover:text-linen">
                {site.contact.email}
              </a>
            </li>
            <li>
              <a href={telHref()} className="text-linen/75 tabular-nums transition-colors hover:text-linen">
                {site.contact.phoneDisplay}
              </a>
            </li>
            <li>
              <a
                href={site.owner.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-linen/75 transition-colors hover:text-linen"
              >
                <LinkedIn className="size-4" />
                LinkedIn
                <span className="sr-only">(öffnet in neuem Tab)</span>
              </a>
            </li>
          </ul>
        </div>
      </Container>
      <Container className="flex flex-col gap-4 border-t border-linen/15 py-6 text-sm text-linen/65 sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {year} <span translate="no">{site.legal.companyName}</span>
        </p>
        <ul className="flex flex-wrap gap-x-6 gap-y-2">
          <li>
            <Link href="/impressum" className="transition-colors hover:text-linen">
              Impressum
            </Link>
          </li>
          <li>
            <Link href="/datenschutz" className="transition-colors hover:text-linen">
              Datenschutz
            </Link>
          </li>
          <li>
            <a href="https://mousewerk.de" target="_blank" rel="noopener" className="transition-colors hover:text-linen">
              Made by <span translate="no" className="font-medium text-linen/85">Mousewerk</span>
              <span className="sr-only">(öffnet in neuem Tab)</span>
            </a>
          </li>
        </ul>
      </Container>
    </footer>
  )
}
