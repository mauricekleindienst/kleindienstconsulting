import Image from "next/image"
import { services } from "@/content/site"
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
  "Restaurant Hannappel",
] as const

export function Hero() {
  const years = yearsInTrade()

  // Konkrete Belege aus dem Werdegang statt allgemeiner Versprechen
  const proof = [
    { value: `${years}+ Jahre`, label: "in der Gastronomie" },
    { value: "Wiesn 2025", label: "Paulaner Festzelt" },
    { value: "16 Punkte", label: "Restaurant Hannappel" },
  ] as const

  return (
    <section className="overflow-hidden">
      <Container className="grid gap-14 pt-12 pb-16 sm:pt-16 lg:grid-cols-[1.25fr_0.75fr] lg:items-center lg:gap-12 lg:pt-20 lg:pb-20">
        <div>
          <h1>
            <span className="block text-lg font-medium text-brass">Gastronomieberatung in München</span>
            <span className="mt-4 block font-display text-display-xl font-extrabold">
              Gastronomie, die sich rechnet.
            </span>
          </h1>
          <p className="mt-8 max-w-[36rem] text-lg leading-relaxed text-ink-soft sm:text-xl">
            Beratung vom Küchenchef für Restaurants, Wirtshäuser, Hotels und Festzelte: Kalkulation,
            Karte, Küche und Team so aufstellen, dass am Monatsende mehr übrig bleibt.
          </p>

          <dl className="mt-8 grid max-w-[36rem] grid-cols-3 gap-x-4 border-y border-line py-5 sm:gap-x-6">
            {proof.map((item) => (
              <div key={item.value} className="flex flex-col-reverse justify-end">
                <dt className="mt-0.5 text-xs leading-snug text-muted sm:text-sm">{item.label}</dt>
                <dd className="font-display text-base font-bold min-[400px]:text-lg sm:text-xl">{item.value}</dd>
              </div>
            ))}
          </dl>

          <div data-primary-cta className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/#kontakt">Kostenfreies Erstgespräch</ButtonLink>
            <ButtonLink href="/#leistungen" variant="secondary">
              Leistungen ansehen
            </ButtonLink>
          </div>
        </div>

        <Bon />
      </Container>

      {/* Stationen als durchlaufendes Band */}
      <div className="border-y border-line bg-linen-deep">
        <Container className="flex flex-col gap-3 py-6 lg:flex-row lg:items-baseline lg:gap-8">
          <p className="shrink-0 text-sm text-muted">Küchen und Gastronomie geführt unter anderem in</p>
          <ul className="flex flex-wrap gap-x-6 gap-y-1 font-display text-lg font-semibold text-ink-soft">
            {houses.map((house) => (
              <li key={house} translate="no">
                {house}
              </li>
            ))}
          </ul>
        </Container>
      </div>
    </section>
  )
}

/** Der Küchenbon als Motiv: So kommt eine Bestellung am Pass an. */
function Bon() {
  return (
    <figure className="relative mx-auto w-full max-w-[22rem] lg:mr-0">
      {/* Bondrucker-Schlitz */}
      <div aria-hidden className="relative z-10 h-5 rounded-md bg-ink shadow-[inset_0_-4px_0_rgb(255_255_255/0.08)]" />
      <div className="-mt-2 origin-top rotate-[1.5deg] px-3">
        <div className="animate-print bon-edge bg-sheet px-6 pt-6 pb-6 font-mono text-[0.84rem] leading-relaxed text-ink shadow-[0_24px_40px_-24px_rgb(20_25_22/0.45)]">
          <div className="text-center">
            <Image
              src="/brand/mk-logo-ink.png"
              alt=""
              width={240}
              height={199}
              className="mx-auto h-14 w-auto opacity-90"
            />
            <p className="mt-3 font-semibold tracking-wider">KÜCHENPASS</p>
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
