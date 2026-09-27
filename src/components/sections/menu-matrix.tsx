import { cn } from "@/lib/cn"
import { Section, SectionHeader, SectionLead, SectionTitle } from "../ui/section"

// Reihenfolge = Raster von oben links nach unten rechts.
// Y-Achse: Beliebtheit (oben hoch), X-Achse: Deckungsbeitrag (rechts hoch).
const quadrants = [
  {
    name: "Renner",
    rule: "beliebt, niedriger Deckungsbeitrag",
    action: "Rezeptur und Portion prüfen, Preis vorsichtig anheben.",
    tone: "bg-linen/10",
  },
  {
    name: "Stars",
    rule: "beliebt, hoher Deckungsbeitrag",
    action: "Prominent platzieren, Qualität sichern.",
    tone: "bg-brass-light text-green",
  },
  {
    name: "Penner",
    rule: "selten bestellt, niedriger Deckungsbeitrag",
    action: "Überarbeiten oder konsequent streichen.",
    tone: "ring-1 ring-inset ring-linen/20",
  },
  {
    name: "Rätsel",
    rule: "selten bestellt, hoher Deckungsbeitrag",
    action: "Besser beschreiben, neu platzieren, im Service empfehlen.",
    tone: "bg-linen/10",
  },
] as const

export function MenuMatrix() {
  return (
    <Section tone="green" aria-labelledby="matrix-title">
      <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <SectionHeader>
          <SectionTitle id="matrix-title">Jedes Gericht muss sich seinen Platz verdienen</SectionTitle>
          <SectionLead>
            Mit der Menü-Matrix bewerten wir jedes Gericht nach Beliebtheit und Deckungsbeitrag. Das
            Ergebnis ist eine Karte, die schlanker ist, mehr verdient und sich in der Küche leichter
            produzieren lässt.
          </SectionLead>
        </SectionHeader>

        <figure>
          <div className="relative grid grid-cols-2 gap-2.5 pb-8 pl-8">
            {quadrants.map((quadrant) => (
              <div key={quadrant.name} className={cn("flex min-h-44 flex-col rounded-md p-4 sm:min-h-52 sm:p-6", quadrant.tone)}>
                <p className="font-display text-2xl font-bold sm:text-3xl">{quadrant.name}</p>
                <p className="mt-1 text-sm">{quadrant.rule}</p>
                <p className="mt-auto pt-4 text-sm leading-snug sm:text-base">{quadrant.action}</p>
              </div>
            ))}
            <span
              aria-hidden
              className="absolute top-0 bottom-8 left-0 flex w-6 rotate-180 items-center justify-center text-sm text-linen/70 [writing-mode:vertical-rl]"
            >
              Beliebtheit
            </span>
            <span aria-hidden className="absolute right-0 bottom-0 left-8 text-center text-sm text-linen/70">
              Deckungsbeitrag
            </span>
          </div>
          <figcaption className="sr-only">
            Menü-Matrix: Die senkrechte Achse zeigt die Beliebtheit, die waagerechte den
            Deckungsbeitrag eines Gerichts.
          </figcaption>
        </figure>
      </div>
    </Section>
  )
}
