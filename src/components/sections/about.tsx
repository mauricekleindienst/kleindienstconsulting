import { career, principles, site, testimonial } from "@/content/site"
import { yearsInTrade } from "@/lib/experience"
import { Portrait } from "../portrait"
import { LinkedIn } from "../ui/icons"
import { Section, SectionHeader, SectionTitle } from "../ui/section"

export function About() {
  return (
    <Section id="ueber-mich" tone="deep" aria-labelledby="ueber-mich-title">
      <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Portrait />
          <div className="mt-6 flex items-center justify-between gap-4">
            <div>
              <p className="font-display text-2xl font-bold" translate="no">
                {site.owner.name}
              </p>
              <p className="text-muted">{site.owner.role}</p>
            </div>
            <a
              href={site.owner.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-2 rounded-md border border-ink/25 px-4 transition-colors hover:border-ink hover:bg-ink hover:text-linen"
            >
              <LinkedIn className="size-4" />
              LinkedIn
              <span className="sr-only">(öffnet in neuem Tab)</span>
            </a>
          </div>
        </div>

        <div>
          <SectionHeader>
            <SectionTitle id="ueber-mich-title">Über {yearsInTrade()} Jahre am Pass, jetzt an Ihrer Seite</SectionTitle>
          </SectionHeader>

          <div className="mt-8 max-w-[62ch] space-y-5 text-lg leading-relaxed text-ink-soft">
            <p>
              Mein Handwerk habe ich 1988 als Koch gelernt. Seitdem stehe ich in Küchen, seit fast
              zwei Jahrzehnten als Küchenchef in München und Oberbayern: in den Augustiner
              Bräustuben, im Spöckmeier, bei der Neueröffnung am Mohrenplatz und für die
              Kuffler-Gruppe am Münchner Flughafen und im Spatenhaus an der Oper.
            </p>
            <p>
              Für Rauschenberger habe ich die Gastronomie der Motorworld München geplant, und 2025
              habe ich die Gastronomie im Paulaner Festzelt auf dem Oktoberfest geplant und
              umgesetzt. Wareneinsatz, Dienstpläne, Inventuren, HACCP, die Karte und Abläufe für
              tausende Gäste am Tag: Das ist mein Alltag.
            </p>
            <p>
              Dieses Wissen gebe ich heute als Berater weiter. Ohne Foliensätze, dafür mit dem Blick
              eines Küchenchefs, der weiß, was an einem vollen Samstagabend wirklich zählt.
            </p>
          </div>

          <ul className="mt-12 grid gap-8 sm:grid-cols-3 sm:gap-6">
            {principles.map((principle) => (
              <li key={principle.title}>
                <h3 className="font-display text-xl font-bold">{principle.title}</h3>
                <p className="mt-2 leading-relaxed text-muted">{principle.text}</p>
              </li>
            ))}
          </ul>

          <figure className="mt-14 border-l-4 border-brass pl-6 sm:pl-8">
            <blockquote className="text-xl leading-relaxed sm:text-2xl">
              <p>„{testimonial.quote}“</p>
            </blockquote>
            <figcaption className="mt-4 text-muted">
              <span className="font-semibold text-ink">{testimonial.source}</span>, {testimonial.context}
            </figcaption>
          </figure>

          <div className="mt-16">
            <h3 className="font-display text-2xl font-bold">Werdegang</h3>
            <ol className="mt-6 divide-y divide-ink/10 border-y border-ink/10">
              {career.map((station) => (
                <li
                  key={`${station.period}-${station.place}`}
                  className="grid gap-1 py-4 sm:grid-cols-[8.5rem_1fr] sm:gap-6"
                >
                  <p className="text-muted tabular-nums">{station.period}</p>
                  <div>
                    <p className="font-medium">
                      {station.role}, {station.place}
                    </p>
                    {"note" in station ? <p className="text-muted">{station.note}</p> : null}
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </Section>
  )
}
