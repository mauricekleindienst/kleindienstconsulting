import { steps } from "@/content/site"
import { Section, SectionHeader, SectionLead, SectionTitle } from "../ui/section"

export function Process() {
  return (
    <Section id="vorgehen" aria-labelledby="vorgehen-title">
      <SectionHeader>
        <SectionTitle id="vorgehen-title">In vier Gängen zum Ergebnis</SectionTitle>
        <SectionLead>
          Strukturiert und transparent, und immer mit Blick darauf, was im Tagesgeschäft machbar ist.
        </SectionLead>
      </SectionHeader>

      {/* Echte Abfolge – daher nummeriert */}
      <ol className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
        {steps.map((step, index) => (
          <li key={step.title} className="border-t-2 border-green pt-6">
            <span className="font-display text-5xl font-extrabold text-brass tabular-nums">{index + 1}</span>
            <h3 className="mt-3 font-display text-2xl font-bold">{step.title}</h3>
            <p className="mt-3 leading-relaxed text-muted">{step.text}</p>
          </li>
        ))}
      </ol>
    </Section>
  )
}
