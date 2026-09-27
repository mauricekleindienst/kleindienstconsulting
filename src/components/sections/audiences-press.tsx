import { audiences, press } from "@/content/site"
import { Section, SectionHeader, SectionTitle } from "../ui/section"

export function AudiencesAndPress() {
  return (
    <Section aria-labelledby="zielgruppen-title">
      <div className="grid gap-16 lg:grid-cols-2 lg:gap-20">
        <div>
          <SectionHeader>
            <SectionTitle id="zielgruppen-title">Vom Wirtshaus bis zum Flughafen</SectionTitle>
          </SectionHeader>
          <ul className="mt-10 divide-y divide-line border-y border-line">
            {audiences.map((audience) => (
              <li key={audience} className="py-4 font-display text-xl font-semibold">
                {audience}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <SectionHeader>
            <h2 className="font-display text-3xl font-bold sm:text-4xl">In der Presse</h2>
          </SectionHeader>
          <ul className="mt-10 space-y-4">
            {press.map((article) => (
              <li key={article.href}>
                <a
                  href={article.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block rounded-md border border-line bg-sheet p-6 transition-colors hover:border-ink/40"
                >
                  <p className="text-sm text-brass">
                    {article.outlet}, {article.year}
                  </p>
                  <p className="mt-2 font-display text-xl font-bold group-hover:underline group-hover:decoration-brass group-hover:underline-offset-4">
                    {article.title}
                  </p>
                  <p className="mt-2 leading-relaxed text-muted">{article.teaser}</p>
                  <span className="sr-only">(öffnet in neuem Tab)</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  )
}
