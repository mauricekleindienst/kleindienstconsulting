/**
 * Zentrale Inhalte der Website.
 *
 * Alle Firmendaten, Texte und rechtlichen Angaben leben hier, damit sie an
 * genau einer Stelle gepflegt werden. Werte in [eckigen Klammern] sind
 * Platzhalter und MÜSSEN vor dem Livegang durch echte Angaben ersetzt werden –
 * insbesondere die Pflichtangaben für Impressum und Datenschutzerklärung.
 */

export const site = {
  name: "Kleindienst Gastro Consulting",
  shortName: "Kleindienst",
  url: "https://gastro-kleindienst.de",
  description:
    "Gastronomieberatung in München vom Küchenchef: Kalkulation, Speisekarte, Küche & Personal. Erfahrung aus Wiesn, Spatenhaus & Kuffler. Erstgespräch gratis.",
  locale: "de_DE",
  /** Google Search Console: Verifizierungscode (Meta-Tag-Methode) hier eintragen */
  googleSiteVerification: "" as string,
  /** Standort für die lokale Suche (Neuried bei München) */
  geo: { latitude: 48.0931, longitude: 11.4659 },
  owner: {
    name: "Mario Kleindienst",
    role: "Inhaber & Gastronomieberater",
    /**
     * Foto in /public ablegen und hier eintragen, z. B.
     * { src: "/mario-kleindienst.jpg", alt: "…", width: 1448, height: 1086, focus: "58% 35%" }
     * `focus` = Bildausschnitt (CSS object-position), damit die Person mittig bleibt.
     */
    portrait: {
      src: "/mario-kleindienst.jpg",
      alt: "Gastronomieberater Mario Kleindienst mit verschränkten Armen in einer holzvertäfelten Gaststube",
      width: 1448,
      height: 1086,
      focus: "57% 28%",
    } as null | { src: string; alt: string; width: number; height: number; focus: string },
    linkedin: "https://www.linkedin.com/in/mario-kleindienst-64324a213/",
    /** Ausbildungsbeginn – daraus wird "über 35 Jahre" berechnet. */
    careerStart: 1988,
  },
  contact: {
    email: "info@gastro-kleindienst.de",
    phone: "+4915154609111",
    /** Anzeigeformat der Telefonnummer */
    phoneDisplay: "0151 54609111",
    region: "München & Umgebung",
  },
  /** Pflichtangaben nach § 5 DDG – bitte vollständig ausfüllen. */
  legal: {
    companyName: "Kleindienst Gastro Consulting",
    proprietor: "Mario Kleindienst",
    legalForm: "Einzelunternehmen",
    street: "Hauserweg 5",
    postalCode: "82061",
    city: "Neuried",
    country: "Deutschland",
    /** Leer lassen, falls keine USt-IdNr. vorhanden ist (z. B. Kleinunternehmer). */
    vatId: "[DE000000000]",
    /** Nur bei Eintragung im Handelsregister ausfüllen. */
    register: null as null | { court: string; number: string },
    lastUpdated: "September 2026",
  },
} as const

/** Einsatzgebiet – wird für die lokale Suche (Schema.org areaServed) und den Regionsabschnitt genutzt. */
export const serviceArea = [
  "München",
  "Landkreis München",
  "Starnberg",
  "Fürstenfeldbruck",
  "Dachau",
  "Freising",
  "Erding",
  "Ebersberg",
  "Rosenheim",
  "Garmisch-Partenkirchen",
  "Oberbayern",
] as const

export const navigation = [
  { label: "Leistungen", href: "/#leistungen" },
  { label: "Vorgehen", href: "/#vorgehen" },
  { label: "Über mich", href: "/#ueber-mich" },
  { label: "FAQ", href: "/#faq" },
] as const

export type Service = {
  title: string
  summary: string
  points: readonly string[]
}

export const services: readonly Service[] = [
  {
    title: "Kalkulation & Wareneinsatz",
    summary:
      "Rezepturen, Portionsgrößen, Einkauf, Inventur: Wir machen Ihren Wareneinsatz transparent und holen die Marge zurück, die in der Küche verloren geht.",
    points: ["Rezeptur- & Preiskalkulation", "Einkauf & Lieferanten", "Inventur & Warenwirtschaft"],
  },
  {
    title: "Speisekarten-Engineering",
    summary:
      "Jedes Gericht muss sich seinen Platz verdienen. Wir analysieren Beliebtheit und Deckungsbeitrag und entwickeln eine Karte – auch saisonal –, die verkauft.",
    points: ["Beliebtheit & Deckungsbeitrag", "Sortiment straffen", "Saisonale Angebote"],
  },
  {
    title: "Küchenorganisation & HACCP",
    summary:
      "Klare Posten, saubere Abläufe, sichere Hygiene. Wir strukturieren Ihre Küche so, dass sie auch bei vollem Haus ruhig läuft.",
    points: ["Abläufe & Mise en place", "HACCP & Hygienekonzept", "Standards & Checklisten"],
  },
  {
    title: "Personal & Führung",
    summary:
      "Gute Küche ist Teamarbeit. Wir planen Dienste und Einsatz, schärfen Rollen, schulen Ihr Team und unterstützen bei Recruiting und Ausbildung.",
    points: ["Dienst- & Personalplanung", "Teamführung & Schulung", "Ausbildung (AEVO)"],
  },
  {
    title: "Konzept & Neueröffnung",
    summary:
      "Neueröffnung, Pachtübernahme oder Relaunch: Wir begleiten Sie vom Konzept über Küchenplanung und Karte bis zum ersten vollen Abend.",
    points: ["Konzept & Positionierung", "Pre-Opening-Fahrplan", "Soft Opening & Feinschliff"],
  },
  {
    title: "Betriebs-Check",
    summary:
      "Wenn die Zahlen nicht stimmen, zählt jeder Monat. Wir finden die Ursachen, priorisieren Maßnahmen und begleiten die Umsetzung.",
    points: ["Analyse vor Ort", "Kostenstruktur senken", "Umsetzungsbegleitung"],
  },
]

/**
 * Beruflicher Werdegang ab 2007 plus Restaurant Hannappel (Quellen: Lebenslauf 2015, Arbeitszeugnis Haus Kuffler 2020, Angaben der Familie).
 * Quelle für Spatenhaus: Abendzeitung München (Ess-Klasse, 2023).
 * TODO: Zeiträume nach 2020 prüfen/ergänzen.
 */
export const career = [
  { period: "2025", role: "Planung & Durchführung der Gastronomie", place: "Paulaner Festzelt, Oktoberfest München" },
  { period: "2023", role: "Küchenchef 1. OG", place: "Spatenhaus an der Oper, München", note: "Kuffler Gruppe" },
  { period: "2021 – 2022", role: "Gastronomieplanung", place: "Rauschenberger Gastronomie, Motorworld München" },
  { period: "2016 – 2020", role: "Küchenchef", place: "Haus Kuffler, Flughafen München T2", note: "Mangostin Airport & Bagutta Pizza Culture" },
  { period: "2011 – 2016", role: "Küchenchef", place: "Zum Spöckmeier, München" },
  { period: "2010 – 2011", role: "Küchenchef", place: "Augustiner Bräustuben, München" },
  { period: "2008 – 2010", role: "Sous-Chef / Küchenchef", place: "Hotel Deutsche Eiche, Lochhausen" },
  { period: "2007 – 2008", role: "Küchenchef", place: "Mohrenplatz, Garmisch-Partenkirchen", note: "Neueröffnung" },
  { period: "2000 – 2006", role: "Sous-Chef", place: "Restaurant Hannappel, Essen", note: "16 Punkte" },
] as const

/**
 * Presseberichte. Es wird nur verlinkt – Fotos der Abendzeitung sind
 * urheberrechtlich geschützt und dürfen ohne Lizenz nicht übernommen werden.
 */
export const press = [
  {
    outlet: "Abendzeitung München",
    title: "Ess-Klasse im Spatenhaus: Ganz fein speisen an der Oper",
    teaser:
      "Fünf Gänge mit Weinbegleitung: Für die Gourmet-Aktion der AZ hat Küchenchef Mario Kleindienst ein Menü für das erste Obergeschoss des Spatenhauses entworfen.",
    year: "2023",
    href: "https://www.abendzeitung-muenchen.de/muenchen/essenundtrinken/ess-klasse-im-spatenhaus-ganz-fein-speisen-an-der-oper-art-875273",
  },
  {
    outlet: "Abendzeitung München",
    title: "Die Ess-Klasse im Spatenhaus wird verlängert",
    teaser: "Das Ess-Klasse-Menü von Mario Kleindienst ging in die Verlängerung – bis zum 5. März.",
    year: "2023",
    href: "https://www.abendzeitung-muenchen.de/muenchen/essenundtrinken/ess-klasse/die-ess-klasse-im-spatenhaus-wird-verlaengert-art-881240",
  },
] as const

export const steps = [
  {
    title: "Kennenlernen",
    text: "Im kostenfreien Erstgespräch hören wir zu: Wo stehen Sie, wo wollen Sie hin, was hält Sie auf?",
  },
  {
    title: "Analyse vor Ort",
    text: "Wir erleben Ihren Betrieb als Gast und hinter den Kulissen – und werten Kennzahlen, Karte und Abläufe aus.",
  },
  {
    title: "Maßnahmenplan",
    text: "Sie erhalten konkrete, priorisierte Empfehlungen mit Aufwand, Wirkung und klarer Reihenfolge.",
  },
  {
    title: "Umsetzung",
    text: "Auf Wunsch setzen wir gemeinsam mit Ihrem Team um – bis die Veränderungen im Alltag sitzen.",
  },
] as const

export const audiences = [
  "Wirtshäuser & Brauereigaststätten",
  "Restaurants & gehobene Küche",
  "Hotels & Hotelgastronomie",
  "System- & Verkehrsgastronomie",
  "Festzelte & Eventgastronomie",
  "Betriebs- & Gemeinschaftsverpflegung",
  "Gründer, Pächter & Investoren",
] as const

export const principles = [
  {
    title: "Aus der Küche",
    text: "Empfehlungen von jemandem, der selbst jahrzehntelang am Pass stand – sie funktionieren am vollen Samstagabend, nicht nur auf dem Papier.",
  },
  {
    title: "Zahlen, die sprechen",
    text: "Jede Maßnahme wird an Kennzahlen gemessen. So sehen Sie, was sich wirklich verbessert.",
  },
  {
    title: "Auf Augenhöhe",
    text: "Sie bleiben Gastgeber. Wir bringen den Blick von außen und die Struktur für den nächsten Schritt.",
  },
] as const

export const faqs = [
  {
    question: "Was macht ein Gastronomieberater?",
    answer:
      "Ein Gastronomieberater analysiert Ihren Betrieb von außen und hilft, ihn wirtschaftlicher und besser organisiert zu führen – von Kalkulation, Wareneinsatz und Speisekarte über Küchenabläufe und HACCP bis zu Personal, Konzept und Neueröffnung. Ich bringe dafür über 35 Jahre Erfahrung aus der Küche mit, davon fast zwei Jahrzehnte als Küchenchef in München.",
  },
  {
    question: "Was kostet eine Gastronomieberatung?",
    answer:
      "Das hängt vom Umfang ab. Nach dem kostenfreien Erstgespräch erhalten Sie ein transparentes Angebot – als Tagessatz oder Projektpauschale. Je nach Vorhaben kommen zudem öffentliche Förderprogramme für Unternehmensberatung in Frage; wir prüfen das gerne mit Ihnen.",
  },
  {
    question: "Für welche Betriebe ist die Beratung geeignet?",
    answer:
      "Für inhabergeführte Wirtshäuser und Restaurants ebenso wie für Hotels, Systemgastronomie, Betriebsgastronomie und Gründer – von gutbürgerlich-bayerisch bis zur gehobenen Küche. Entscheidend ist nicht die Größe, sondern der Wille, etwas zu verändern.",
  },
  {
    question: "Wie lange dauert ein Beratungsprojekt?",
    answer:
      "Ein Schnell-Check ist oft in wenigen Tagen erledigt. Konzeptentwicklungen oder Eröffnungsbegleitungen laufen typischerweise über mehrere Wochen bis Monate – immer mit klaren Meilensteinen.",
  },
  {
    question: "Arbeiten Sie auch vor Ort?",
    answer:
      "Ja. Gastronomie versteht man nur im Betrieb. In München und im Umland – von Starnberg über Freising und Erding bis Rosenheim und Garmisch-Partenkirchen – komme ich zu Ihnen. Abstimmungen gerne auch per Telefon oder Video.",
  },
  {
    question: "Wird eine Gastronomieberatung gefördert?",
    answer:
      "Unter bestimmten Voraussetzungen können Beratungskosten für kleine und mittlere Unternehmen über öffentliche Förderprogramme bezuschusst werden. Welche Programme aktuell für Ihren Betrieb in Frage kommen, klären wir gerne im Erstgespräch.",
  },
  {
    question: "Wie vertraulich werden meine Zahlen behandelt?",
    answer:
      "Absolut vertraulich. Auf Wunsch unterzeichnen wir vor Projektbeginn eine Verschwiegenheitsvereinbarung.",
  },
] as const
