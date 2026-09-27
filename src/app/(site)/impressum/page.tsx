import type { Metadata } from "next"
import { LegalPage } from "@/components/legal-page"
import { site } from "@/content/site"
import { pageOpenGraph } from "@/lib/og"
import { mailtoHref, telHref } from "@/lib/contact"

export const metadata: Metadata = {
  title: "Impressum",
  description: `Impressum von ${site.name} – Angaben gemäß § 5 DDG.`,
  ...pageOpenGraph("Impressum", "/impressum"),
  alternates: { canonical: "/impressum" },
  robots: { index: true, follow: true },
}

export default function ImpressumPage() {
  const { legal, contact, owner } = site

  return (
    <LegalPage title="Impressum" updated={legal.lastUpdated}>
      <section>
        <h2>Angaben gemäß § 5 DDG</h2>
        <p>
          {legal.companyName}
          <br />
          Inhaber: {legal.proprietor}
          <br />
          {legal.street}
          <br />
          {legal.postalCode} {legal.city}
          <br />
          {legal.country}
        </p>
        <p>Rechtsform: {legal.legalForm}</p>
      </section>

      <section>
        <h2>Kontakt</h2>
        <p>
          Telefon: <a href={telHref()}>{contact.phoneDisplay}</a>
          <br />
          E-Mail: <a href={mailtoHref("Anfrage über die Website")}>{contact.email}</a>
        </p>
      </section>

      {legal.register ? (
        <section>
          <h2>Registereintrag</h2>
          <p>
            Registergericht: {legal.register.court}
            <br />
            Registernummer: {legal.register.number}
          </p>
        </section>
      ) : null}

      {legal.vatId ? (
        <section>
          <h2>Umsatzsteuer-ID</h2>
          <p>
            Umsatzsteuer-Identifikationsnummer gemäß § 27a Umsatzsteuergesetz:
            <br />
            {legal.vatId}
          </p>
        </section>
      ) : null}

      <section>
        <h2>Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h2>
        <p>
          {owner.name}
          <br />
          {legal.street}, {legal.postalCode} {legal.city}
        </p>
      </section>

      <section>
        <h2>Verbraucherstreitbeilegung</h2>
        <p>
          Wir sind nicht bereit und nicht verpflichtet, an Streitbeilegungsverfahren vor einer
          Verbraucherschlichtungsstelle teilzunehmen (§ 36 VSBG).
        </p>
      </section>

      <section>
        <h2>Haftung für Inhalte</h2>
        <p>
          Als Diensteanbieter sind wir für eigene Inhalte auf diesen Seiten nach den allgemeinen
          Gesetzen verantwortlich. Wir sind jedoch nicht verpflichtet, übermittelte oder gespeicherte
          fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine
          rechtswidrige Tätigkeit hinweisen. Verpflichtungen zur Entfernung oder Sperrung der Nutzung
          von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine
          diesbezügliche Haftung ist erst ab dem Zeitpunkt der Kenntnis einer konkreten
          Rechtsverletzung möglich. Bei Bekanntwerden entsprechender Rechtsverletzungen werden wir
          diese Inhalte umgehend entfernen.
        </p>
      </section>

      <section>
        <h2>Haftung für Links</h2>
        <p>
          Unser Angebot enthält Links zu externen Websites Dritter (z. B. Presseartikel), auf deren
          Inhalte wir keinen Einfluss haben. Für diese fremden Inhalte ist stets der jeweilige Anbieter
          oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der
          Verlinkung auf mögliche Rechtsverstöße überprüft; rechtswidrige Inhalte waren zu diesem
          Zeitpunkt nicht erkennbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige
          Links umgehend entfernen.
        </p>
      </section>

      <section>
        <h2>Urheberrecht</h2>
        <p>
          Die durch den Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem
          deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der
          Verwertung außerhalb der Grenzen des Urheberrechts bedürfen der schriftlichen Zustimmung des
          jeweiligen Autors bzw. Erstellers. Soweit Inhalte auf dieser Seite nicht vom Betreiber
          erstellt wurden, werden die Urheberrechte Dritter beachtet und entsprechend gekennzeichnet.
        </p>
      </section>
    </LegalPage>
  )
}
