import type { Metadata } from "next"
import { LegalPage } from "@/components/legal-page"
import { operator } from "@/content/operator"

export const metadata: Metadata = { title: "Impressum" }

export default function ZugangImpressumPage() {
  const o = operator

  return (
    <LegalPage title="Impressum" updated={o.lastUpdated}>
      <section>
        <h2>Angaben gemäß § 5 DDG</h2>
        <p>
          {o.name}
          <br />
          Inhaber: {o.proprietor}
          <br />
          {o.legalForm}
        </p>
        <p>
          {o.street}
          <br />
          {o.postalCode} {o.city}
          <br />
          {o.country}
        </p>
        <p>
          E-Mail: <a href={`mailto:${o.email}`}>{o.email}</a>
          <br />
          Telefon: <a href={`tel:${o.phone}`}>{o.phoneDisplay}</a>
        </p>
      </section>

      <section>
        <h2>Umsatzsteuer-Identifikationsnummer</h2>
        <p>Umsatzsteuer-Identifikationsnummer gemäß § 27a UStG: {o.vatId}</p>
      </section>

      <section>
        <h2>Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h2>
        <p>
          {o.proprietor}, {o.street}, {o.postalCode} {o.city}
        </p>
      </section>

      <section>
        <h2>Verbraucherstreitbeilegung</h2>
        <p>
          Wir sind nicht bereit und nicht verpflichtet, an Streitbeilegungsverfahren vor einer
          Verbraucherschlichtungsstelle teilzunehmen (§ 36 VSBG). Die Plattform der EU-Kommission zur
          Online-Streitbeilegung wurde zum 20. Juli 2025 eingestellt.
        </p>
      </section>

      <section>
        <h2>Haftung für Inhalte</h2>
        <p>
          Als Diensteanbieter sind wir gemäß § 7 Abs. 1 DDG für eigene Inhalte auf diesen Seiten nach
          den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 DDG sind wir als Diensteanbieter
          jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen
          oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
        </p>
      </section>

      <section>
        <h2>Haftung für Links</h2>
        <p>
          Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen
          Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für
          die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten
          verantwortlich.
        </p>
      </section>

      <section>
        <h2>Urheberrecht</h2>
        <p>
          Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem
          deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der
          Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des
          jeweiligen Autors bzw. Erstellers.
        </p>
      </section>
    </LegalPage>
  )
}
