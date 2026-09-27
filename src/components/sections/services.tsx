import { services } from "@/content/site"
import { Section, SectionHeader, SectionLead, SectionTitle } from "../ui/section"

export function Services() {
  return (
    <Section id="leistungen" tone="deep" aria-labelledby="leistungen-title">
      <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
        <SectionHeader className="lg:sticky lg:top-28 lg:self-start">
          <SectionTitle id="leistungen-title">Wobei ich Sie unterstütze</SectionTitle>
          <SectionLead>
            Einzelne Baustelle oder komplette Neuaufstellung: Sie bekommen genau die Hilfe, die Ihr
            Betrieb gerade braucht, und nicht mehr.
          </SectionLead>
        </SectionHeader>

        <ul className="divide-y divide-ink/15 border-y border-ink/15">
          {services.map((service) => (
            <li key={service.title} className="grid gap-4 py-8 sm:grid-cols-[1fr_1.3fr] sm:gap-10">
              <h3 className="font-display text-2xl font-bold">{service.title}</h3>
              <div>
                <p className="leading-relaxed text-ink-soft">{service.summary}</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {service.points.map((point) => (
                    <li key={point} className="rounded-md bg-linen px-3 py-1 text-sm text-ink-soft">
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  )
}
