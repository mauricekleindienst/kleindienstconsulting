import type { ReactNode } from "react"
import { Container } from "./ui/container"

/** Layout für Rechtstexte: gut lesbare Zeilenlänge, klare Hierarchie. */
export function LegalPage({ title, updated, children }: { title: string; updated: string; children: ReactNode }) {
  return (
    <Container className="py-16 sm:py-24">
      <article className="mx-auto max-w-3xl">
        <h1 className="font-display text-display-lg font-extrabold">{title}</h1>
        <p className="mt-4 text-sm text-muted">Stand: {updated}</p>
        <div className="mt-12 max-w-[70ch] space-y-10 leading-relaxed text-ink-soft [&_a]:text-green [&_a]:decoration-brass [&_a]:underline [&_a]:underline-offset-4 [&_a:hover]:text-green-hover [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-ink [&_h3]:mt-6 [&_h3]:font-semibold [&_h3]:text-ink [&_li]:ml-5 [&_li]:list-disc [&_p]:mt-3 [&_ul]:mt-3 [&_ul]:space-y-1">
          {children}
        </div>
      </article>
    </Container>
  )
}
