import { faqs } from "@/content/site"
import { Plus } from "../ui/icons"
import { Section, SectionHeader, SectionTitle } from "../ui/section"

export function Faq() {
  return (
    <Section id="faq" aria-labelledby="faq-title">
      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <SectionHeader>
          <SectionTitle id="faq-title">Häufige Fragen</SectionTitle>
        </SectionHeader>

        {/* Natives <details>: zugänglich, ohne JavaScript, per Tastatur bedienbar */}
        <div className="divide-y divide-line border-y border-line">
          {faqs.map((faq) => (
            <details key={faq.question} className="group">
              <summary className="flex min-h-16 list-none items-center justify-between gap-6 py-5 font-display text-xl font-bold [&::-webkit-details-marker]:hidden">
                {faq.question}
                <Plus className="shrink-0 text-brass transition-transform duration-300 group-open:rotate-45" />
              </summary>
              <p className="max-w-[62ch] pb-6 leading-relaxed text-muted">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </Section>
  )
}
