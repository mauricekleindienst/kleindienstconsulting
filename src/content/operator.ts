/**
 * Betreiber der Vorschau-Seite (Passwort-Schranke).
 * Solange die Website nicht öffentlich ist, betreibt Mousewerk die öffentlich
 * erreichbare Zugangsseite – daher gelten dort Impressum und Datenschutz von Mousewerk.
 */
export const operator = {
  name: "Mousewerk",
  proprietor: "Maurice Kleindienst",
  legalForm: "Einzelunternehmen",
  street: "Weserstraße 16 A",
  postalCode: "34125",
  city: "Kassel",
  country: "Deutschland",
  email: "info@mousewerk.de",
  phone: "+4915168707152",
  phoneDisplay: "+49 1516 8707152",
  vatId: "DE463851440",
  url: "https://mousewerk.de",
  lastUpdated: "09.09.2026",
} as const
