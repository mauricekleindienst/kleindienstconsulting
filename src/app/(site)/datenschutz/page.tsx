import type { Metadata } from "next"
import { LegalPage } from "@/components/legal-page"
import { site } from "@/content/site"
import { pageOpenGraph } from "@/lib/og"

export const metadata: Metadata = {
  title: "Datenschutzerklärung",
  description: `Datenschutzerklärung von ${site.name} nach DSGVO.`,
  ...pageOpenGraph("Datenschutzerklärung", "/datenschutz"),
  alternates: { canonical: "/datenschutz" },
}

export default function DatenschutzPage() {
  const { legal, contact } = site

  return (
    <LegalPage title="Datenschutz­erklärung" updated={legal.lastUpdated}>
      <section>
        <h2>1. Auf einen Blick</h2>
        <p>
          Der Schutz Ihrer Daten ist uns wichtig. Diese Website ist bewusst datensparsam gebaut:{" "}
          <strong>Wir setzen keine Cookies, keine Analyse- oder Tracking-Tools und keine
          Social-Media-Plugins ein</strong>. Schriften werden von unserem eigenen Server geladen, es
          werden keine Karten oder Videos von Drittanbietern eingebunden. Personenbezogene Daten
          verarbeiten wir nur, soweit es für den Betrieb der Website technisch notwendig ist oder Sie
          uns von sich aus kontaktieren.
        </p>
      </section>

      <section>
        <h2>2. Verantwortlicher</h2>
        <p>
          Verantwortlich für die Datenverarbeitung auf dieser Website im Sinne der
          Datenschutz-Grundverordnung (DSGVO) ist:
        </p>
        <p>
          {legal.companyName}, Inhaber {legal.proprietor}
          <br />
          {legal.street}, {legal.postalCode} {legal.city}
          <br />
          E-Mail: {contact.email}
          <br />
          Telefon: {contact.phoneDisplay}
        </p>
        <p>
          Ein Datenschutzbeauftragter ist nicht bestellt, da die gesetzlichen Voraussetzungen hierfür
          nicht vorliegen.
        </p>
      </section>

      <section>
        <h2>3. Hosting und Server-Logfiles</h2>
        <p>
          Diese Website wird über Cloudflare Workers der Cloudflare, Inc., 101 Townsend St., San
          Francisco, CA 94107, USA bereitgestellt. Beim Aufruf der Website verarbeitet Cloudflare
          automatisch Informationen, die Ihr Browser übermittelt:
        </p>
        <ul>
          <li>IP-Adresse</li>
          <li>Datum und Uhrzeit der Anfrage</li>
          <li>aufgerufene Seite bzw. Datei</li>
          <li>Referrer-URL</li>
          <li>verwendeter Browser und Betriebssystem</li>
        </ul>
        <p>
          Die Verarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Unser berechtigtes
          Interesse liegt in der sicheren und fehlerfreien Bereitstellung der Website. Mit Cloudflare
          besteht ein Vertrag zur Auftragsverarbeitung nach Art. 28 DSGVO. Cloudflare ist unter dem
          EU-US Data Privacy Framework zertifiziert; die Übermittlung in die USA stützt sich auf den
          Angemessenheitsbeschluss der EU-Kommission (Art. 45 DSGVO) sowie ergänzend auf
          Standardvertragsklauseln (Art. 46 Abs. 2 lit. c DSGVO). Weitere Informationen:{" "}
          <a href="https://www.cloudflare.com/de-de/privacypolicy/" target="_blank" rel="noopener noreferrer">
            Datenschutzerklärung von Cloudflare
          </a>
          .
        </p>
      </section>

      <section>
        <h2>4. Cookies und Endgerätezugriff</h2>
        <p>
          Diese Website setzt keine Analyse-, Marketing- oder Tracking-Cookies und greift nicht auf
          Informationen in Ihrem Endgerät zu, die nicht für die Bereitstellung des ausdrücklich
          gewünschten Dienstes unbedingt erforderlich sind (§ 25 Abs. 2 Nr. 2 TDDDG). Ein Cookie-Banner
          ist daher nicht erforderlich.
        </p>
        <p>
          Solange sich die Website in der passwortgeschützten Vorschau befindet, wird nach Eingabe des
          Passworts ein technisch notwendiges Zugangs-Cookie („kgc_zugang“, Laufzeit 30 Tage) gesetzt.
          Es enthält keine personenbezogenen Angaben.
        </p>
      </section>

      <section>
        <h2>5. Schriftarten</h2>
        <p>
          Die verwendeten Schriftarten sind lokal auf unserem Server eingebunden. Beim Aufruf der
          Website wird keine Verbindung zu Servern von Google oder anderen Drittanbietern aufgebaut.
        </p>
      </section>

      <section>
        <h2>6. Kontaktaufnahme per E-Mail oder Telefon</h2>
        <p>
          Wenn Sie uns per E-Mail oder Telefon kontaktieren, verarbeiten wir Ihre Angaben (z. B. Name,
          Kontaktdaten, Inhalt Ihrer Anfrage) zur Bearbeitung Ihres Anliegens. Rechtsgrundlage ist
          Art. 6 Abs. 1 lit. b DSGVO, sofern Ihre Anfrage mit der Anbahnung oder Erfüllung eines
          Vertrags zusammenhängt, andernfalls Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der
          Beantwortung von Anfragen). Ihre Daten werden gelöscht, sobald die Anfrage abschließend
          bearbeitet ist und keine gesetzlichen Aufbewahrungspflichten (z. B. nach HGB oder AO)
          entgegenstehen.
        </p>
      </section>

      <section>
        <h2>7. Externe Links</h2>
        <p>
          Unsere Website enthält Links zu externen Angeboten (z. B. LinkedIn, Abendzeitung München, Mousewerk).
          Erst wenn Sie einen solchen Link anklicken, werden Daten an den jeweiligen Anbieter
          übertragen. Für die dortige Datenverarbeitung ist ausschließlich der jeweilige Anbieter
          verantwortlich.
        </p>
      </section>

      <section>
        <h2>8. Ihre Rechte</h2>
        <p>Sie haben im Rahmen der gesetzlichen Bestimmungen jederzeit das Recht auf:</p>
        <ul>
          <li>Auskunft über Ihre gespeicherten Daten (Art. 15 DSGVO)</li>
          <li>Berichtigung unrichtiger Daten (Art. 16 DSGVO)</li>
          <li>Löschung (Art. 17 DSGVO)</li>
          <li>Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
          <li>Datenübertragbarkeit (Art. 20 DSGVO)</li>
          <li>
            <strong>Widerspruch</strong> gegen Verarbeitungen auf Grundlage von Art. 6 Abs. 1 lit. f
            DSGVO aus Gründen, die sich aus Ihrer besonderen Situation ergeben (Art. 21 DSGVO)
          </li>
        </ul>
        <p>
          Zur Ausübung Ihrer Rechte genügt eine formlose Nachricht an {contact.email}.
        </p>
        <h3>Beschwerderecht bei einer Aufsichtsbehörde</h3>
        <p>
          Sie haben das Recht, sich bei einer Datenschutz-Aufsichtsbehörde zu beschweren (Art. 77
          DSGVO). Für nicht-öffentliche Stellen in Bayern ist dies das Bayerische Landesamt für
          Datenschutzaufsicht (BayLDA), Promenade 18, 91522 Ansbach,{" "}
          <a href="https://www.lda.bayern.de" target="_blank" rel="noopener noreferrer">
            www.lda.bayern.de
          </a>
          .
        </p>
      </section>

      <section>
        <h2>9. SSL-/TLS-Verschlüsselung</h2>
        <p>
          Diese Website nutzt aus Sicherheitsgründen eine SSL- bzw. TLS-Verschlüsselung. Eine
          verschlüsselte Verbindung erkennen Sie an „https://“ in der Adresszeile Ihres Browsers.
        </p>
      </section>

      <section>
        <h2>10. Keine automatisierte Entscheidungsfindung</h2>
        <p>
          Eine automatisierte Entscheidungsfindung einschließlich Profiling nach Art. 22 DSGVO findet
          nicht statt.
        </p>
      </section>
    </LegalPage>
  )
}
