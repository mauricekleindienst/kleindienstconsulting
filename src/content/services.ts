/**
 * Eigene Unterseiten je Leistung (/leistungen/[slug]) – für die Suche nach
 * konkreten Themen wie „Speisekarte optimieren München“ oder „Restaurant eröffnen Beratung“.
 * Keine erfundenen Zahlen: nur Aussagen, die sich auf Mario Kleindiensts Praxis stützen.
 */

export type ServiceDetail = {
  slug: string
  /** Kurzname (wie auf der Startseite) */
  title: string
  /** <title> ohne Marke – mit „ | Kleindienst“ max. ca. 60 Zeichen */
  seoTitle: string
  /** Meta-Description, max. ca. 155 Zeichen */
  metaDescription: string
  h1: string
  intro: string
  problems: readonly string[]
  approach: readonly { title: string; text: string }[]
  results: readonly string[]
  faqs: readonly { question: string; answer: string }[]
}

export const serviceDetails: readonly ServiceDetail[] = [
  {
    slug: "kalkulation-wareneinsatz",
    title: "Kalkulation & Wareneinsatz",
    seoTitle: "Wareneinsatz & Kalkulation München",
    metaDescription:
      "Wareneinsatz senken, Preise richtig kalkulieren, Inventur im Griff: Gastronomieberatung vom Küchenchef für Betriebe in München und Umgebung.",
    h1: "Kalkulation & Wareneinsatz für Restaurants in München",
    intro:
      "Die Marge entscheidet sich in der Küche: bei Rezeptur, Portion, Einkauf und Verderb. Als Küchenchef war ich jahrelang für einen kostenbewussten Wareneinsatz verantwortlich – dieses Handwerkszeug bringe ich in Ihren Betrieb.",
    problems: [
      "Der Wareneinsatz steigt, aber niemand weiß genau, wo das Geld bleibt.",
      "Verkaufspreise sind historisch gewachsen statt sauber kalkuliert.",
      "Portionsgrößen schwanken je nach Schicht und Koch.",
      "Inventuren sind aufwendig und liefern keine verwertbaren Zahlen.",
    ],
    approach: [
      { title: "Zahlen aufnehmen", text: "Wareneinsatz, Einkaufspreise, Verkaufszahlen und Inventuren der letzten Monate auswerten." },
      { title: "Rezepturen kalkulieren", text: "Für die wichtigsten Gerichte Rezepturen mit Mengen, Portionsgrößen und Deckungsbeitrag anlegen." },
      { title: "Einkauf prüfen", text: "Lieferanten, Gebinde und Bestellrhythmus vergleichen, Verderb und Überbestände reduzieren." },
      { title: "Routinen verankern", text: "Einfache Kennzahlen und Inventurabläufe, die Ihr Team im Alltag selbst weiterführt." },
    ],
    results: [
      "Transparente Rezeptur- und Preiskalkulation für Ihre Karte",
      "Nachvollziehbarer Wareneinsatz statt Bauchgefühl",
      "Weniger Verderb und klarere Bestellungen",
      "Kennzahlen, die Sie monatlich selbst im Blick behalten",
    ],
    faqs: [
      {
        question: "Wie hoch sollte der Wareneinsatz in der Gastronomie sein?",
        answer:
          "Das hängt stark vom Konzept ab – ein Wirtshaus rechnet anders als ein Steakhaus oder ein Café. Entscheidend ist, dass Sie Ihren eigenen Wert kennen, ihn je Gericht nachvollziehen können und die Entwicklung regelmäßig prüfen. Genau das richten wir gemeinsam ein.",
      },
      {
        question: "Brauche ich dafür eine spezielle Software?",
        answer:
          "Nein. Wir arbeiten mit dem, was Sie haben – Kassensystem, Warenwirtschaft oder auch Tabellen. Wichtig sind saubere Rezepturen und feste Abläufe, nicht das Werkzeug.",
      },
    ],
  },
  {
    slug: "speisekarte-optimieren",
    title: "Speisekarten-Engineering",
    seoTitle: "Speisekarte optimieren München",
    metaDescription:
      "Speisekarte optimieren nach Beliebtheit und Deckungsbeitrag: schlanker, profitabler, besser zu produzieren. Beratung vom Küchenchef in München.",
    h1: "Speisekarte optimieren: Menu Engineering in München",
    intro:
      "Die Speisekarte ist Ihr wichtigstes Verkaufsinstrument. Ich habe über Jahre Karten geschrieben – vom bayerischen Wirtshaus bis zur gehobenen Küche – und weiß, welche Gerichte Gäste bestellen, welche Geld verdienen und welche die Küche ausbremsen.",
    problems: [
      "Die Karte ist über die Jahre gewachsen und zu lang geworden.",
      "Beliebte Gerichte verdienen kaum etwas.",
      "Einzelne Gerichte blockieren am Pass die ganze Küche.",
      "Saisonale Angebote kosten mehr Aufwand, als sie bringen.",
    ],
    approach: [
      { title: "Verkaufszahlen auswerten", text: "Jedes Gericht nach Beliebtheit und Deckungsbeitrag einordnen." },
      { title: "Sortiment straffen", text: "Gerichte überarbeiten, neu kalkulieren oder konsequent streichen." },
      { title: "Produktion prüfen", text: "Mise en place, Garzeiten und Posten so abstimmen, dass die Karte auch bei vollem Haus funktioniert." },
      { title: "Karte gestalten", text: "Reihenfolge, Beschreibungen und Platzierung so wählen, dass die richtigen Gerichte verkauft werden." },
    ],
    results: [
      "Eine schlankere Karte mit klarem Profil",
      "Mehr Deckungsbeitrag pro Bestellung",
      "Ruhigere Abläufe in der Küche",
      "Saisonale Angebote, die sich rechnen",
    ],
    faqs: [
      {
        question: "Was ist Menu Engineering?",
        answer:
          "Eine Methode, jedes Gericht nach Beliebtheit und Deckungsbeitrag zu bewerten. Daraus ergibt sich, welche Gerichte Sie hervorheben, überarbeiten oder streichen sollten.",
      },
      {
        question: "Wie oft sollte eine Speisekarte überarbeitet werden?",
        answer:
          "Eine grundlegende Prüfung einmal im Jahr ist sinnvoll, dazu saisonale Anpassungen. Bei stark steigenden Einkaufspreisen lohnt sich eine Nachkalkulation auch zwischendurch.",
      },
    ],
  },
  {
    slug: "kuechenorganisation-haccp",
    title: "Küchenorganisation & HACCP",
    seoTitle: "Küchenorganisation & HACCP München",
    metaDescription:
      "Klare Posten, saubere Abläufe, sichere Hygiene: Küchenorganisation und HACCP-Konzept für Restaurants, Hotels und Festzelte in München.",
    h1: "Küchenorganisation & HACCP für Gastronomiebetriebe",
    intro:
      "Ob Wirtshausküche, Flughafengastronomie oder Festzelt auf der Wiesn: Eine Küche muss auch unter Hochdruck ruhig laufen. Ich strukturiere Abläufe, Posten und Hygiene so, wie ich es als Küchenchef selbst geführt habe.",
    problems: [
      "Zu Stoßzeiten staut es sich am Pass.",
      "Jeder arbeitet anders – es fehlen feste Standards.",
      "Das HACCP-Konzept existiert nur auf dem Papier.",
      "Neue Mitarbeiter brauchen zu lange, bis sie eingearbeitet sind.",
    ],
    approach: [
      { title: "Abläufe beobachten", text: "Service und Küche im laufenden Betrieb erleben – vom Wareneingang bis zum Pass." },
      { title: "Posten ordnen", text: "Stationen, Mise en place und Wege so aufteilen, dass niemand dem anderen im Weg steht." },
      { title: "Hygiene praxistauglich machen", text: "HACCP-Konzept, Kontrollpunkte und Dokumentation, die im Alltag wirklich gelebt werden." },
      { title: "Standards festhalten", text: "Checklisten und Einarbeitungsunterlagen für gleichbleibende Qualität." },
    ],
    results: [
      "Kürzere Wartezeiten am Pass",
      "Ein HACCP-Konzept, das einer Kontrolle standhält",
      "Klare Standards für jede Schicht",
      "Schnellere Einarbeitung neuer Mitarbeiter",
    ],
    faqs: [
      {
        question: "Ist ein HACCP-Konzept für jeden Gastronomiebetrieb Pflicht?",
        answer:
          "Lebensmittelunternehmer müssen nach EU-Recht Verfahren auf Grundlage der HACCP-Grundsätze einrichten und dokumentieren. Wie umfangreich das sein muss, hängt vom Betrieb ab – wir erarbeiten eine Lösung, die zu Ihrer Küche passt.",
      },
      {
        question: "Beraten Sie auch Festzelte und Großveranstaltungen?",
        answer:
          "Ja. 2025 habe ich die Gastronomie im Paulaner Festzelt auf dem Oktoberfest geplant und umgesetzt – Abläufe für tausende Gäste am Tag sind mir vertraut.",
      },
    ],
  },
  {
    slug: "personal-fuehrung",
    title: "Personal & Führung",
    seoTitle: "Personal & Führung Gastronomie München",
    metaDescription:
      "Dienstpläne, Einsatzplanung, Teamführung und Ausbildung: Beratung zu Personal in der Gastronomie vom erfahrenen Küchenchef aus München.",
    h1: "Personal & Führung in der Gastronomie",
    intro:
      "Gute Küche ist Teamarbeit. Personalplanung, Einstellung und Führung ganzer Küchenbrigaden gehörten jahrelang zu meinen Aufgaben – als Küchenchef in München und mit Ausbildereignung (AEVO).",
    problems: [
      "Die Personalkosten laufen aus dem Ruder, trotzdem fehlen Leute.",
      "Dienstpläne entstehen kurzfristig und sorgen für Unmut.",
      "Verantwortung liegt bei wenigen, die dauerhaft überlastet sind.",
      "Auszubildende und neue Kräfte werden nicht systematisch angeleitet.",
    ],
    approach: [
      { title: "Bedarf ermitteln", text: "Umsatz, Öffnungszeiten und Auslastung mit dem tatsächlichen Personaleinsatz abgleichen." },
      { title: "Dienste planen", text: "Verlässliche Dienst- und Einsatzpläne, die Stoßzeiten abdecken und Leerlauf vermeiden." },
      { title: "Rollen klären", text: "Zuständigkeiten, Vertretungen und Verantwortung im Team eindeutig festlegen." },
      { title: "Team entwickeln", text: "Schulungen in Küche und Service, Einarbeitung und Ausbildung nach AEVO." },
    ],
    results: [
      "Personaleinsatz passend zum tatsächlichen Bedarf",
      "Planbare Dienstpläne und zufriedenere Mitarbeiter",
      "Entlastete Führungskräfte",
      "Ein Team, das Verantwortung übernimmt",
    ],
    faqs: [
      {
        question: "Helfen Sie auch bei der Suche nach Küchenpersonal?",
        answer:
          "Ich unterstütze bei Stellenprofilen, Auswahl und Probearbeiten – und vor allem dabei, dass gute Leute bleiben: durch klare Abläufe, faire Planung und ordentliche Einarbeitung.",
      },
      {
        question: "Können Sie unser Team direkt schulen?",
        answer:
          "Ja, Schulungen für Küche und Service finden bevorzugt bei Ihnen vor Ort statt, zugeschnitten auf Ihre Karte und Ihre Abläufe.",
      },
    ],
  },
  {
    slug: "restaurant-eroeffnung",
    title: "Konzept & Neueröffnung",
    seoTitle: "Restaurant eröffnen München: Beratung",
    metaDescription:
      "Neueröffnung, Pachtübernahme oder Relaunch: Gastronomiekonzept, Küchenplanung, Karte und Pre-Opening – Beratung in München und Umgebung.",
    h1: "Restaurant eröffnen in München: Konzept & Neueröffnung",
    intro:
      "Von der Idee bis zum ersten vollen Abend: Ich habe Neueröffnungen als Küchenchef verantwortet und die Gastronomie der Motorworld München geplant. Diese Erfahrung hilft Ihnen, teure Fehler vor dem Start zu vermeiden.",
    problems: [
      "Die Idee steht, aber Konzept und Zahlen sind noch unklar.",
      "Küche und Abläufe werden geplant, ohne dass ein Koch mitredet.",
      "Die Karte passt nicht zur Küche, zum Personal oder zum Standort.",
      "Der Eröffnungstermin rückt näher und es fehlt ein Fahrplan.",
    ],
    approach: [
      { title: "Konzept schärfen", text: "Zielgruppe, Standort, Angebot und Preisniveau zu einem stimmigen Profil verbinden." },
      { title: "Küche planen", text: "Geräte, Posten und Wege so planen, dass die Karte effizient produziert werden kann." },
      { title: "Karte und Kalkulation", text: "Speisekarte, Rezepturen und Preise vor dem ersten Gast sauber aufsetzen." },
      { title: "Pre-Opening", text: "Fahrplan, Lieferanten, Personal, Schulung und Soft Opening bis zur Eröffnung." },
    ],
    results: [
      "Ein tragfähiges Gastronomiekonzept mit Zahlen",
      "Eine Küche, die zur Karte passt",
      "Ein klarer Fahrplan bis zur Eröffnung",
      "Ein eingespieltes Team ab dem ersten Tag",
    ],
    faqs: [
      {
        question: "Wann sollte ich einen Gastronomieberater für die Eröffnung einbinden?",
        answer:
          "Möglichst früh – idealerweise bevor Küche und Einrichtung bestellt sind. Viele Kosten entstehen durch Planungen, die später im Betrieb nicht funktionieren.",
      },
      {
        question: "Begleiten Sie auch Pachtübernahmen?",
        answer:
          "Ja. Bei einer Übernahme prüfen wir Küche, Zahlen und Konzept des bestehenden Betriebs und entwickeln daraus einen realistischen Plan für den Neustart.",
      },
    ],
  },
  {
    slug: "betriebs-check",
    title: "Betriebs-Check",
    seoTitle: "Betriebs-Check Gastronomie München",
    metaDescription:
      "Wenn die Zahlen nicht stimmen: Analyse vor Ort, Kosten senken, Maßnahmen umsetzen. Betriebs-Check für Gastronomie in München und Umgebung.",
    h1: "Betriebs-Check für Ihr Restaurant in München",
    intro:
      "Wenn am Monatsende zu wenig übrig bleibt, zählt jeder Monat. Beim Betriebs-Check sehe ich mir Ihren Betrieb als Gast und hinter den Kulissen an – und sage Ihnen klar, wo es hakt und was zuerst zu tun ist.",
    problems: [
      "Der Umsatz stimmt, aber der Gewinn nicht.",
      "Kosten steigen, ohne dass die Ursache klar ist.",
      "Es gibt viele Baustellen und keine klare Reihenfolge.",
      "Ein Blick von außen fehlt – im Alltag bleibt keine Zeit dafür.",
    ],
    approach: [
      { title: "Analyse vor Ort", text: "Küche, Service, Karte, Einkauf und Personal im laufenden Betrieb erleben." },
      { title: "Zahlen prüfen", text: "Wareneinsatz, Personalkosten und Umsatzstruktur auswerten." },
      { title: "Maßnahmenplan", text: "Konkrete, priorisierte Empfehlungen mit Aufwand, Wirkung und Reihenfolge." },
      { title: "Umsetzung", text: "Auf Wunsch begleite ich die Umsetzung, bis die Veränderungen im Alltag sitzen." },
    ],
    results: [
      "Klarheit, wo Geld verloren geht",
      "Ein priorisierter Maßnahmenplan",
      "Schnelle erste Verbesserungen",
      "Begleitung bis zur spürbaren Wirkung",
    ],
    faqs: [
      {
        question: "Wie lange dauert ein Betriebs-Check?",
        answer:
          "Die Analyse vor Ort dauert je nach Betrieb meist ein bis wenige Tage. Den Maßnahmenplan erhalten Sie kurz danach.",
      },
      {
        question: "Was kostet ein Betriebs-Check?",
        answer:
          "Nach dem kostenfreien Erstgespräch erhalten Sie ein transparentes Festpreis-Angebot, abhängig von Größe und Umfang Ihres Betriebs.",
      },
    ],
  },
]

export function serviceBySlug(slug: string) {
  return serviceDetails.find((service) => service.slug === slug)
}

export function serviceByTitle(title: string) {
  return serviceDetails.find((service) => service.title === title)
}
