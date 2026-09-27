import { site } from "@/content/site"
import { mailtoHref, telHref } from "@/lib/contact"
import { ButtonLink } from "../ui/button-link"
import { LinkedIn, Mail, MapPin, Phone } from "../ui/icons"
import { Section, SectionHeader, SectionLead, SectionTitle } from "../ui/section"

export function Contact() {
  const channels = [
    { icon: Phone, label: "Telefon", value: site.contact.phoneDisplay, href: telHref(), external: false },
    { icon: Mail, label: "E-Mail", value: site.contact.email, href: mailtoHref(), external: false },
    { icon: LinkedIn, label: "LinkedIn", value: site.owner.name, href: site.owner.linkedin, external: true },
    { icon: MapPin, label: "Einsatzgebiet", value: site.contact.region, href: null, external: false },
  ] as const

  return (
    <Section id="kontakt" tone="green" aria-labelledby="kontakt-title">
      <div className="grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
        <SectionHeader>
          <SectionTitle id="kontakt-title" className="text-display-xl">
            Reden wir über Ihren Betrieb
          </SectionTitle>
          <SectionLead>
            Das Erstgespräch ist kostenfrei und unverbindlich. Erzählen Sie mir, wo der Schuh drückt.
            Ich melde mich innerhalb von zwei Werktagen.
          </SectionLead>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={mailtoHref()} variant="onDark">
              Erstgespräch per E-Mail anfragen
            </ButtonLink>
            <ButtonLink href={telHref()} variant="outlineOnDark">
              Direkt anrufen
            </ButtonLink>
          </div>
        </SectionHeader>

        <ul className="divide-y divide-linen/20 border-y border-linen/20">
          {channels.map(({ icon: Icon, label, value, href, external }) => (
            <li key={label} className="flex items-center gap-5 py-5">
              <span className="grid size-11 shrink-0 place-items-center rounded-md bg-linen/10 text-brass-light">
                <Icon />
              </span>
              <div className="min-w-0">
                <p className="text-sm text-linen/70">{label}</p>
                {href ? (
                  <a
                    href={href}
                    className="block truncate text-lg hover:underline hover:decoration-brass-light hover:underline-offset-4"
                    {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  >
                    {value}
                    {external ? <span className="sr-only"> (öffnet in neuem Tab)</span> : null}
                  </a>
                ) : (
                  <p className="text-lg">{value}</p>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  )
}
