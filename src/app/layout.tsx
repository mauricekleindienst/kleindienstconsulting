import type { Metadata, Viewport } from "next"
import { Bricolage_Grotesque, Geist, Geist_Mono } from "next/font/google"
import { site } from "@/content/site"
import "./globals.css"

// next/font lädt die Schriften zur Build-Zeit herunter und liefert sie von der
// eigenen Domain aus – es entsteht keine Verbindung zu Google (DSGVO-konform).
const geist = Geist({ subsets: ["latin"], variable: "--font-geist-sans", display: "swap" })
const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
  axes: ["wdth"],
})
// Nur auf dem Bon im Einsatz – nicht vorladen, damit Überschrift und Fließtext Vorrang haben
const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
  preload: false,
})

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Gastronomieberatung München & Umgebung | Kleindienst Gastro Consulting",
    template: `%s · ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.owner.name }],
  keywords: [
    "Gastronomieberatung München",
    "Gastro Consulting München",
    "Restaurantberatung München",
    "Gastronomieberater Oberbayern",
    "Küchenberatung",
    "Speisekarten-Engineering",
    "Wareneinsatz senken",
    "HACCP Beratung",
    "Neueröffnung Restaurant München",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: site.locale,
    url: "/",
    siteName: site.name,
    title: "Gastronomieberatung München & Umgebung | Kleindienst Gastro Consulting",
    description: site.description,
  },
  twitter: { card: "summary_large_image" },
  formatDetection: { telephone: false },
  robots: { index: true, follow: true },
  other: { "geo.region": "DE-BY", "geo.placename": "München" },
}

export const viewport: Viewport = {
  themeColor: "#f6f6f1",
  viewportFit: "cover",
  colorScheme: "light",
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de" className={`${geist.variable} ${bricolage.variable} ${geistMono.variable}`}>
      <body className="min-h-dvh">{children}</body>
    </html>
  )
}
