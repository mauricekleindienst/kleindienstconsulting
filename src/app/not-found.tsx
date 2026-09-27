import { ButtonLink } from "@/components/ui/button-link"
import { Container } from "@/components/ui/container"

export default function NotFound() {
  return (
    <main id="inhalt">
      <Container className="flex min-h-[80dvh] flex-col items-start justify-center py-24">
      <p className="font-display text-8xl font-extrabold text-brass">404</p>
      <h1 className="mt-6 font-display text-4xl font-bold">Dieses Gericht steht nicht auf der Karte.</h1>
      <p className="mt-4 max-w-md text-lg text-muted">
        Die gesuchte Seite gibt es nicht (mehr). Auf der Startseite finden Sie alles Wichtige.
      </p>
      <ButtonLink href="/" className="mt-10">
        Zur Startseite
      </ButtonLink>
    </Container>
    </main>
  )
}
