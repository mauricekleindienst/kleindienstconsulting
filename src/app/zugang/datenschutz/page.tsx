import type { Metadata } from "next"
import { LegalPage } from "@/components/legal-page"
import { operator } from "@/content/operator"

export const metadata: Metadata = { title: "Datenschutzerklärung" }

export default function ZugangDatenschutzPage() {
  const o = operator

  return (
    <LegalPage title="Datenschutz­erklärung" updated={o.lastUpdated}>
      <section>
        <h2>1. Verantwortlicher</h2>
        <p>
          {o.name}, Inhaber {o.proprietor}
          <br />
          {o.street}, {o.postalCode} {o.city}
          <br />
          E-Mail: <a href={`mailto:${o.email}`}>{o.email}</a>
          <br />
          Telefon: {o.phoneDisplay}
        </p>
        <p>
          Diese Datenschutzerklärung gilt für die passwortgeschützte Vorschau dieser Website, die{" "}
          {o.name} im Auftrag von Kleindienst Gastro Consulting entwickelt und betreibt.
        </p>
      </section>

      <section>
        <h2>2. Hosting und Server-Logfiles</h2>
        <p>
          Die Website wird über Cloudflare Workers der Cloudflare, Inc., 101 Townsend St., San Francisco,
          CA 94107, USA bereitgestellt. Beim Aufruf verarbeitet Cloudflare technisch notwendige Daten
          wie IP-Adresse, Datum und Uhrzeit, aufgerufene Adresse, Referrer und Browserkennung, um die
          Seite auszuliefern und vor Angriffen zu schützen.
        </p>
        <p>
          Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO; unser berechtigtes Interesse liegt in einer
          sicheren und stabilen Bereitstellung. Mit Cloudflare besteht ein Vertrag zur
          Auftragsverarbeitung (Art. 28 DSGVO). Cloudflare ist unter dem EU-US Data Privacy Framework
          zertifiziert (Art. 45 DSGVO); ergänzend gelten Standardvertragsklauseln. Weitere
          Informationen:{" "}
          <a href="https://www.cloudflare.com/de-de/privacypolicy/" target="_blank" rel="noopener noreferrer">
            Datenschutzerklärung von Cloudflare
          </a>
          .
        </p>
      </section>

      <section>
        <h2>3. Zugangs-Cookie</h2>
        <p>
          Nach Eingabe des richtigen Passworts setzen wir ein Cookie („kgc_zugang“), damit Sie die
          Vorschau ohne erneute Eingabe ansehen können. Es enthält keine personenbezogenen Angaben,
          sondern nur einen kryptografischen Nachweis der Freischaltung, und wird nach 30 Tagen
          gelöscht. Das Cookie ist für den von Ihnen ausdrücklich gewünschten Zugang unbedingt
          erforderlich (§ 25 Abs. 2 Nr. 2 TDDDG); Rechtsgrundlage für die weitere Verarbeitung ist
          Art. 6 Abs. 1 lit. f DSGVO. Weitere Cookies, Analyse- oder Tracking-Werkzeuge setzen wir nicht
          ein.
        </p>
        <p>
          Das eingegebene Passwort wird nur zur Prüfung verwendet und nicht gespeichert.
        </p>
      </section>

      <section>
        <h2>4. Kontaktaufnahme</h2>
        <p>
          Wenn Sie uns per E-Mail oder Telefon kontaktieren, verarbeiten wir Ihre Angaben zur
          Bearbeitung Ihrer Anfrage (Art. 6 Abs. 1 lit. b bzw. f DSGVO) und löschen sie, sobald die
          Anfrage erledigt ist und keine gesetzlichen Aufbewahrungspflichten entgegenstehen.
        </p>
      </section>

      <section>
        <h2>5. Ihre Rechte</h2>
        <p>Sie haben im Rahmen der gesetzlichen Bestimmungen das Recht auf:</p>
        <ul>
          <li>Auskunft (Art. 15 DSGVO)</li>
          <li>Berichtigung (Art. 16 DSGVO)</li>
          <li>Löschung (Art. 17 DSGVO)</li>
          <li>Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
          <li>Datenübertragbarkeit (Art. 20 DSGVO)</li>
          <li>
            <strong>Widerspruch</strong> gegen Verarbeitungen nach Art. 6 Abs. 1 lit. f DSGVO (Art. 21
            DSGVO)
          </li>
        </ul>
        <p>Eine formlose Nachricht an {o.email} genügt.</p>
        <h3>Beschwerderecht</h3>
        <p>
          Sie können sich bei einer Datenschutz-Aufsichtsbehörde beschweren (Art. 77 DSGVO). Zuständig
          für uns ist der Hessische Beauftragte für Datenschutz und Informationsfreiheit,
          Gustav-Stresemann-Ring 1, 65189 Wiesbaden,{" "}
          <a href="https://datenschutz.hessen.de" target="_blank" rel="noopener noreferrer">
            datenschutz.hessen.de
          </a>
          .
        </p>
      </section>

      <section>
        <h2>6. Verschlüsselung</h2>
        <p>Die Übertragung erfolgt ausschließlich verschlüsselt über HTTPS (TLS).</p>
      </section>
    </LegalPage>
  )
}
