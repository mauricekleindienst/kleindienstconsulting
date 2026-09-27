import Link from "next/link"
import { navigation } from "@/content/site"
import { Logo } from "./logo"
import { MobileNav } from "./mobile-nav"
import { ButtonLink } from "./ui/button-link"
import { Container } from "./ui/container"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-linen/90 pt-[env(safe-area-inset-top)] backdrop-blur-md">
      <Container className="flex h-18 items-center justify-between gap-6">
        <Logo />
        <nav aria-label="Hauptnavigation" className="hidden md:block">
          <ul className="flex items-center gap-8">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-ink-soft underline-offset-8 transition-colors hover:text-ink hover:underline hover:decoration-brass hover:decoration-2"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-2">
          <div className="hidden md:block">
            <ButtonLink href="/#kontakt" className="min-h-11 px-5">
              Erstgespräch vereinbaren
            </ButtonLink>
          </div>
          <MobileNav />
        </div>
      </Container>
    </header>
  )
}
