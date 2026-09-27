import { readFile } from "node:fs/promises"
import { site } from "@/content/site"
import { join } from "node:path"

/** Markenfarben für generierte Bilder (Satori kennt keine CSS-Variablen). */
export const brand = {
  green: "#1e3a2f",
  linen: "#f6f6f1",
  brassLight: "#d9bf86",
} as const

const fontFile = (pkg: string, file: string) => readFile(join(process.cwd(), "node_modules/@fontsource", pkg, "files", file))

/** Schriften für ImageResponse (statische WOFF-Dateien, zur Build-Zeit gelesen). */
export async function ogFonts() {
  const [display, body] = await Promise.all([
    fontFile("bricolage-grotesque", "bricolage-grotesque-latin-800-normal.woff"),
    fontFile("geist-sans", "geist-sans-latin-400-normal.woff"),
  ])
  return [
    { name: "Bricolage", data: display, weight: 800 as const, style: "normal" as const },
    { name: "Geist", data: body, weight: 400 as const, style: "normal" as const },
  ]
}

/** Bildmarke „Teller-K“ als SVG für Satori. */
export function OgMark({ size, color = brand.linen, accent = brand.brassLight }: { size: number; color?: string; accent?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <circle cx="24" cy="24" r="22" stroke={color} strokeWidth="2" />
      <path d="M16.5 35.5V12.5c3.6 1.4 4.6 5 4.6 9.5v13.5z" fill={color} />
      <path d="M21.4 25 29 16" stroke={color} strokeWidth="3" strokeLinecap="round" />
      <path d="m23.6 23.2 7.4 12" stroke={color} strokeWidth="3" strokeLinecap="round" />
      <circle cx="31.6" cy="12.6" r="2.4" fill={accent} />
    </svg>
  )
}

/** Für Unterseiten, die eigene openGraph-Metadaten setzen (die überschreiben sonst das Bild). */
export const ogImage = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  type: "image/png",
  alt: "Kleindienst Gastro Consulting – Gastronomieberatung in München und Umgebung",
} as const

/** Vollständige Open-Graph-Angaben für Unterseiten (Next ersetzt den Eltern-Block komplett). */
export function pageOpenGraph(title: string, url: string) {
  return {
    openGraph: {
      type: "website" as const,
      locale: site.locale,
      siteName: site.name,
      title: `${title} · ${site.name}`,
      url,
      images: [ogImage],
    },
    twitter: { card: "summary_large_image" as const, images: [ogImage] },
  }
}
