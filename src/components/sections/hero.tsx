import { services, site } from "@/content/site"
import { yearsInTrade } from "@/lib/experience"
import { ButtonLink } from "../ui/button-link"
import { Container } from "../ui/container"

const houses = [
  "Paulaner Festzelt auf der Wiesn",
  "Spatenhaus an der Oper",
  "Motorworld München",
  "Kuffler am Flughafen",
  "Augustiner Bräustuben",
  "Zum Spöckmeier",
] as const

export function Hero() {
  const years = yearsInTrade()

  return (
    <section className="overflow-hidden">
      <Container className="grid gap-16 pt-12 pb-20 sm:pt-16 lg:grid-cols-[1.2fr_0.8fr] lg:gap-12 lg:pt-20 lg:pb-24">
        <div className="flex flex-col justify-center">
          <h1>
            <span className="block text-lg font-medium text-brass">Gastronomieberatung in München</span>
            <span className="mt-4 block font-display text-display-xl font-extrabold">
              Gastronomie, die sich rechnet.
            </span>
          </h1>
          <p className="mt-8 max-w-[34rem] text-lg leading-relaxed text-ink-soft sm:text-xl">
            {site.owner.name} stand über {years} Jahre als Koch und Küchenchef am Pass. Heute sorgt er
            dafür, dass in Ihrem Betrieb Kalkulation, Karte und Küche zusammenpassen und am Monatsende
            mehr übrig bleibt.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/#kontakt">Kostenfreies Erstgespräch</ButtonLink>
            <ButtonLink href="/#leistungen" variant="secondary">
              Leistungen ansehen
            </ButtonLink>
          </div>

          <div className="mt-14 border-t border-line pt-6">
            <p className="text-sm text-muted">Küchen und Gastronomie geführt unter anderem in</p>
            <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-1 font-display text-lg font-semibold text-ink-soft">
              {houses.map((house) => (
                <li key={house} translate="no">
                  {house}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Bon />
      </Container>
    </section>
  )
}

/** Der Küchenbon als Motiv: So kommt eine Bestellung am Pass an. */
function Bon() {
  return (
    <figure className="relative mx-auto w-full max-w-[22rem] lg:mr-0">
      {/* Bondrucker-Schlitz */}
      <div aria-hidden className="relative z-10 h-5 rounded-md bg-ink shadow-[inset_0_-4px_0_rgb(255_255_255/0.08)]" />
      <div className="-mt-2 px-3">
        <div className="animate-print bon-edge bg-sheet px-6 pt-8 pb-6 font-mono text-[0.84rem] leading-relaxed text-ink shadow-[0_24px_40px_-24px_rgb(20_25_22/0.45)]">
          <div className="text-center">
            <p className="font-semibold tracking-wider">KÜCHENPASS</p>
            <p className="text-muted">Tisch 1: Ihr Betrieb</p>
          </div>
          <hr className="my-4 border-dashed border-ink/30" />
          <ul className="space-y-1.5">
            {services.slice(0, 4).map((service) => (
              <li key={service.title} className="grid grid-cols-[2ch_1fr] gap-2">
                <span>1×</span>
                <span>{service.title}</span>
              </li>
            ))}
            <li className="grid grid-cols-[2ch_1fr] gap-2 text-muted">
              <span />
              <span>Extra: HACCP-Check</span>
            </li>
          </ul>
          <hr className="my-4 border-dashed border-ink/30" />
          <p className="flex justify-between font-semibold">
            <span>Summe</span>
            <span>mehr Marge</span>
          </p>
          <p className="mt-1 flex justify-between text-muted">
            <span>Erstgespräch</span>
            <span>0,00 €</span>
          </p>
          <hr className="my-4 border-dashed border-ink/30" />
          <p className="text-center">Service, bitte!</p>
        </div>
      </div>
      <figcaption className="sr-only">
        Ein Küchenbon als Sinnbild: Kalkulation, Speisekarte, Küchenorganisation und Personal – das
        Erstgespräch ist kostenfrei.
      </figcaption>
    </figure>
  )
}
