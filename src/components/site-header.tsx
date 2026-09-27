import Link from "next/link"
import { navigation, site } from "@/content/site"
import { Logo } from "./logo"
import { MobileNav } from "./mobile-nav"
import { ButtonLink } from "./ui/button-link"
import { Container } from "./ui/container"
import { LinkedIn } from "./ui/icons"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-linen/90 pt-[env(safe-area-inset-top)] backdrop-blur-md">
      <Container className="flex h-18 items-center justify-between gap-6">
        <Logo />
        <nav aria-label="Hauptnavigation" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="inline-flex min-h-11 items-center text-ink-soft underline-offset-8 transition-colors hover:text-ink hover:underline hover:decoration-brass hover:decoration-2"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-2">
          <div className="hidden items-center gap-2 lg:flex">
            <ButtonLink href="/#kontakt" className="min-h-11 px-5">
              Erstgespräch vereinbaren
            </ButtonLink>
            <a
              href={site.owner.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${site.owner.name} auf LinkedIn (öffnet in neuem Tab)`}
              className="grid size-11 place-items-center rounded-md border border-ink/20 transition-colors hover:border-ink hover:bg-ink hover:text-linen"
            >
              <LinkedIn />
            </a>
          </div>
          <MobileNav />
        </div>
      </Container>
    </header>
  )
}
