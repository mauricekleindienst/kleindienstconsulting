# Kleindienst Gastro Consulting

Website für die Gastronomieberatung von Mario Kleindienst in München & Umgebung.
Next.js 16 (App Router) · React 19 · Tailwind CSS 4 · TypeScript · statischer Export als Cloudflare Worker (Static Assets).

## Entwicklung

```bash
npm install
npm run dev      # http://localhost:3000
npm run lint
npm run build    # Statischer Export nach ./out
npm run preview  # Build + lokaler Worker inkl. Passwortschutz (http://localhost:8788, Passwort: vorschau)
npm run deploy   # Build + wrangler deploy
npm run typecheck
```

### Tests (End-to-End)

```bash
npm run test:e2e                          # Build + Playwright gegen lokalen Worker (offen + mit Passwort)
RELEASE=1 npx playwright test -g Livegang # Vor dem Livegang: schlägt fehl, solange [Platzhalter] existieren
```

Geprüft werden u. a.: alle Seiten laden ohne Konsolen-/Netzwerkfehler, axe (WCAG 2.2 AA) ohne Verstöße,
Überschriften-Hierarchie, SEO-Metadaten, interne Links und Anker, externe Links (`noopener`), 404-Seite,
FAQ per Maus/Tastatur, Skip-Link, mobiles Menü (Fokus, Escape, `inert`, Resize), Schnellkontakt-Leiste,
Touch-Ziele ≥ 44 px, kein horizontales Scrollen, keine Cookies und keine Drittanbieter-Requests,
JSON-LD, robots/sitemap/OG-Bild, Sicherheits-Header, Pflichtangaben in Impressum und Datenschutz.

## Cloudflare (Workers Builds)

Konfiguration steht in [`wrangler.jsonc`](wrangler.jsonc): Der statische Export `./out` wird als
Static Assets ausgeliefert, davor läuft der Worker [`worker/index.ts`](worker/index.ts) (Passwortschutz).

| Einstellung | Wert |
|---|---|
| Build command | `npm run build` |
| Deploy command | `npx wrangler deploy` |
| Root directory | `/` |

### Passwortschutz (Vorschau)

Die gesamte Website ist nur mit Passwort erreichbar, solange im Worker unter
**Workers & Pages → kleindienstconsulting → Settings → Variables and Secrets** das Secret
**`SITE_PASSWORD`** gesetzt ist (alternativ: `npx wrangler secret put SITE_PASSWORD`).
Secrets wirken sofort, ohne neues Deployment. Wichtig: als Typ **„Secret“** anlegen (verschlüsselt).
Dank `"keep_vars": true` in `wrangler.jsonc` bleibt die Variable auch bei neuen Deployments erhalten.

- Öffentlich sind nur `/zugang` sowie Impressum und Datenschutz des Betreibers (Mousewerk) unter `/zugang/…`.
- Alle anderen Seiten, Daten (`*.txt`) und Bilder: ohne Passwort gesperrt, jede Antwort trägt `X-Robots-Tag: noindex`. `robots.txt` und `sitemap.xml` bleiben öffentlich (Google Search Console).
- Nach dem Login: HttpOnly-Cookie `kgc_zugang` (30 Tage), signiert mit dem Passwort. **Passwort ändern = alle abmelden.**
- Abmelden: `/zugang/abmelden`.
- Empfehlung: in Cloudflare unter *Security → WAF → Rate limiting rules* POST-Anfragen auf `/zugang` begrenzen (z. B. 10 pro Minute und IP).

**Livegang:** Secret `SITE_PASSWORD` löschen – die Website ist sofort öffentlich und indexierbar.

## Inhalte pflegen

Alle Texte, Firmendaten, Leistungen, Werdegang, FAQ und Presse stehen zentral in
[`src/content/site.ts`](src/content/site.ts). Komponenten müssen für Textänderungen nicht angefasst werden.

## Vor dem Livegang (Pflicht)

Werte in `[eckigen Klammern]` in `src/content/site.ts` sind Platzhalter:

- [x] **Impressum-Angaben** (§ 5 DDG): Hauserweg 5, 82061 Neuried · 0151 54609111 · info@gastro-kleindienst.de
- [ ] **USt-IdNr.** eintragen – oder `vatId` leeren (z. B. Kleinunternehmer)
- [x] **Handelsregister**: keine Eintragung (Einzelunternehmen)
- [x] **Domain**: `https://gastro-kleindienst.de`
- [x] **Portrait**: `public/mario-kleindienst.jpg`
- [x] **Werdegang** bestätigt (2007 bis 2025, plus Restaurant Hannappel)
- [x] **Rechtsform**: Einzelunternehmen
- [x] **Zitat aus dem Arbeitszeugnis**: entfernt
- [ ] **Datenschutzerklärung** und Impressum juristisch prüfen lassen (die Texte sind sorgfältige Vorlagen, keine Rechtsberatung)
- [ ] Mit Cloudflare den **Auftragsverarbeitungsvertrag (DPA)** abschließen (Dashboard → Manage Account → Configurations → Data Processing Addendum)
- [ ] Secret **`SITE_PASSWORD` entfernen**

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

MK-Wappen mit Kochmütze/Krone: Original `public/brand/mk-logo.png` (schwarz, transparent).
Eingefärbte Varianten und Icons erzeugt `node scripts/brand.mjs` (nach Logo-Änderung einmal ausführen):

| Datei | Verwendung |
|---|---|
| `public/brand/mk-logo-ink.png` | Header, Zugangsseite (Schiefer auf Hell) |
| `public/brand/mk-logo-linen.png` | Footer, Vorschaubild (Leinen auf Dunkel) |
| `public/brand/mk-logo-ink-gross.png` | Druck, Dokumente, Social Media |
| `src/app/icon.png`, `src/app/apple-icon.png` | Favicon, iPhone-Homescreen (Krone + MK auf Flaschengrün) |

Farben: Leinen `#F6F6F1` · Schiefer `#141916` · Flaschengrün `#1E3A2F` · Messing `#7C5E25` / `#D9BF86`
Schriften: Bricolage Grotesque (Überschriften), Geist (Text), Geist Mono (nur Küchenbon)
