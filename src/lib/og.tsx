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

/** MK-Wappen (hell) als Data-URL für Satori. */
export async function ogLogo() {
  const file = await readFile(join(process.cwd(), "public/brand/mk-logo-linen.png"))
  return `data:image/png;base64,${file.toString("base64")}`
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
