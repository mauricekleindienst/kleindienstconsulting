import { serviceArea } from "@/content/site"
import { Section, SectionHeader, SectionLead, SectionTitle } from "../ui/section"

export function Region() {
  return (
    <Section tone="deep" aria-labelledby="region-title">
      <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-20">
        <SectionHeader>
          <SectionTitle id="region-title">Gastronomieberatung in München und Umgebung</SectionTitle>
          <SectionLead>
            Die Münchner Gastronomie kenne ich aus der eigenen Küche: vom Traditionswirtshaus in der
            Altstadt über die Hotelküche bis zur Verkehrsgastronomie am Flughafen. Ich kenne die Gäste,
            die Lieferanten, den Personalmarkt und die Kosten der Region. Deshalb berate ich Betriebe in
            der Stadt und im Umland persönlich vor Ort – vom Wirtshaus und Biergarten über Hotels und
            Kantinen bis zum Festzelt auf der Wiesn.
          </SectionLead>
        </SectionHeader>

        <ul className="flex flex-wrap gap-2.5">
          {serviceArea.map((place) => (
            <li
              key={place}
              className="rounded-md border border-ink/15 bg-linen px-4 py-2 text-ink-soft first:border-green first:bg-green first:text-linen"
            >
              {place}
            </li>
          ))}
        </ul>
      </div>
    </Section>
  )
}
