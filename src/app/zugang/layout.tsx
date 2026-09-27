import type { Metadata } from "next"
import Link from "next/link"
import { LogoMark } from "@/components/logo-mark"
import { Container } from "@/components/ui/container"
import { operator } from "@/content/operator"

export const metadata: Metadata = {
  title: { default: "Zugang", template: "%s · Zugang" },
  robots: { index: false, follow: false },
}

/** Schlanker Rahmen der öffentlichen Zugangsseite – ohne Links in den geschützten Bereich. */
export default function ZugangLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex min-h-dvh flex-col">
      <header className="border-b border-line">
        <Container className="flex h-18 items-center">
          <Link href="/zugang" className="inline-flex min-h-11 items-center gap-3" translate="no">
            <LogoMark className="size-10 shrink-0" />
            <span className="flex flex-col leading-none">
              <span className="font-display text-[1.4rem] font-bold">Kleindienst</span>
              <span className="mt-1 text-[0.8rem] text-current/65">Gastro Consulting München</span>
            </span>
          </Link>
        </Container>
      </header>
      <main id="inhalt" className="flex-1">
        {children}
      </main>
      <footer className="border-t border-line">
        <Container className="flex flex-col gap-3 py-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            Vorschau betrieben von{" "}
            <a href={operator.url} target="_blank" rel="noopener" className="text-ink underline-offset-4 hover:underline">
              {operator.name}
              <span className="sr-only"> (öffnet in neuem Tab)</span>
            </a>
          </p>
          <ul className="flex gap-6">
            <li>
              <Link href="/zugang/impressum" className="inline-flex min-h-11 items-center hover:text-ink">
                Impressum
              </Link>
            </li>
            <li>
              <Link href="/zugang/datenschutz" className="inline-flex min-h-11 items-center hover:text-ink">
                Datenschutz
              </Link>
            </li>
          </ul>
        </Container>
      </footer>
    </div>
  )
}
