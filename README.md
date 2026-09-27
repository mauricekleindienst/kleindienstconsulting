# Kleindienst Gastro Consulting

Website für die Gastronomieberatung von Mario Kleindienst in München & Umgebung.
Next.js 16 (App Router) · React 19 · Tailwind CSS 4 · TypeScript · komplett statisch.

## Entwicklung

```bash
npm install
npm run dev      # http://localhost:3000
npm run lint
npm run build    # Produktions-Build
```

### Tests (End-to-End)

```bash
npm run test:e2e                          # Build + Playwright (Desktop, Pixel 7, 320 px)
RELEASE=1 npx playwright test -g Livegang # Vor dem Livegang: schlägt fehl, solange [Platzhalter] existieren
```

Geprüft werden u. a.: alle Seiten laden ohne Konsolen-/Netzwerkfehler, axe (WCAG 2.2 AA) ohne Verstöße,
Überschriften-Hierarchie, SEO-Metadaten, interne Links und Anker, externe Links (`noopener`), 404-Seite,
FAQ per Maus/Tastatur, Skip-Link, mobiles Menü (Fokus, Escape, `inert`, Resize), Schnellkontakt-Leiste,
Touch-Ziele ≥ 44 px, kein horizontales Scrollen, keine Cookies und keine Drittanbieter-Requests,
JSON-LD, robots/sitemap/OG-Bild, Sicherheits-Header, Pflichtangaben in Impressum und Datenschutz.

Deployment: Repository bei Vercel importieren – keine weitere Konfiguration nötig.

## Inhalte pflegen

Alle Texte, Firmendaten, Leistungen, Werdegang, FAQ und Presse stehen zentral in
[`src/content/site.ts`](src/content/site.ts). Komponenten müssen für Textänderungen nicht angefasst werden.

## Vor dem Livegang (Pflicht)

Werte in `[eckigen Klammern]` in `src/content/site.ts` sind Platzhalter:

- [ ] **Impressum-Angaben** (§ 5 DDG): ladungsfähige Geschäftsanschrift, Telefon, E-Mail, Rechtsform
- [ ] **USt-IdNr.** eintragen – oder `vatId` leeren (z. B. Kleinunternehmer)
- [ ] **Handelsregister** nur bei Eintragung (`register`)
- [ ] **Domain** in `site.url` setzen (wirkt auf Canonical, Sitemap, Open Graph, Schema.org)
- [ ] **Portrait**: professionelles Foto als `public/mario-kleindienst.jpg` ablegen und in `owner.portrait` eintragen
- [ ] **Werdegang nach 2020** prüfen (Spatenhaus-Zeitraum ist aus Presseberichten abgeleitet)
- [ ] **Zitat aus dem Arbeitszeugnis**: Veröffentlichung mit Haus Kuffler abstimmen – oder entfernen
- [ ] **Datenschutzerklärung** und Impressum juristisch prüfen lassen (die Texte sind sorgfältige Vorlagen, keine Rechtsberatung)
- [ ] Mit dem Hoster (Vercel) den **Auftragsverarbeitungsvertrag (DPA)** abschließen

## Rechtliches – umgesetzt

- Impressum nach § 5 DDG und § 18 Abs. 2 MStV, Hinweis nach § 36 VSBG (ohne die seit Juli 2025 abgeschaltete OS-Plattform)
- Datenschutzerklärung nach DSGVO inkl. Hosting, Server-Logs, Betroffenenrechten, BayLDA als Aufsichtsbehörde
- **Keine Cookies, kein Tracking, keine Drittanbieter-Einbindungen** → kein Cookie-Banner nötig (§ 25 TDDDG)
- Schriften werden zur Build-Zeit über `next/font` lokal eingebunden – keine Verbindung zu Google (vgl. LG München I, 3 O 17493/20)
- Presseartikel werden nur **verlinkt**; Fotos der Abendzeitung sind urheberrechtlich geschützt und wurden bewusst nicht übernommen

## SEO – umgesetzt

- Titel/Description/Keywords auf „Gastronomieberatung München“ ausgerichtet, H1 enthält das Keyword
- Schema.org JSON-LD: `ProfessionalService` mit `areaServed` (München, Umland, Oberbayern), `Person`, `FAQPage`, `WebSite`
- `sitemap.xml`, `robots.txt`, Canonicals, Open-Graph-Bild (generiert), `lang="de"`, `geo.region`
- Abschnitt „Gastronomieberatung in München und Umgebung“ für lokale Suche

## Marke

Bildmarke „Teller-K“ (`src/components/logo-mark.tsx`, Datei: `public/brand/kleindienst-bildmarke.svg`):
Tellerrand als Bühne des Gastronomen, K-Stamm als Kochmesser-Klinge, Messing-Punkt als Garnitur.

Farben: Leinen `#F6F6F1` · Schiefer `#141916` · Flaschengrün `#1E3A2F` · Messing `#7C5E25` / `#D9BF86`
Schriften: Bricolage Grotesque (Überschriften), Geist (Text), Geist Mono (nur Küchenbon)
