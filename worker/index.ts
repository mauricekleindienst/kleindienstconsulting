/**
 * Cloudflare Worker vor dem statischen Export (./out, Binding ASSETS) mit
 * Passwortschutz für die gesamte Website.
 *
 * Aktiv, sobald im Worker das Secret SITE_PASSWORD gesetzt ist
 * (Workers & Pages → kleindienstconsulting → Settings → Variables and Secrets).
 * Ohne das Secret ist die Website öffentlich.
 *
 * Öffentlich bleiben nur die Zugangsseite (/zugang, inkl. Impressum und
 * Datenschutz des Betreibers), robots.txt, sitemap.xml und die statischen Build-Dateien.
 */

import { site } from "../src/content/site"

interface Env {
  ASSETS: Fetcher
  SITE_PASSWORD?: string
}

const COOKIE = "kgc_zugang"
const MAX_AGE = 60 * 60 * 24 * 30 // 30 Tage
const GATE = "/zugang"

/** Für Suchmaschinen: immer unverändert ausliefern (kein Passwort, kein noindex). */
const CRAWLER_FILES = /^\/(robots\.txt|sitemap\.xml)$/

/** Pfade, die auch ohne Passwort erreichbar sein müssen. */
const PUBLIC_PATHS = [
  /^\/zugang(?:\.html|\.txt)?$/,
  /^\/zugang\//,
  /^\/_next\/static\//,
  /^\/icon\.png$/,
  /^\/favicon\.ico$/,
  // Für Link-Vorschauen (WhatsApp, LinkedIn, iMessage …) und Homescreen-Icons
  /^\/opengraph-image$/,
  /^\/apple-icon\.png$/,
  /^\/brand\//,
  /^\/manifest\.webmanifest$/,
]

/** Crawler, die Link-Vorschauen erzeugen. Sie bekommen die Zugangsseite mit den
 *  Marken-Metadaten direkt (200) statt einer Weiterleitung. */
const PREVIEW_BOTS =
  /facebookexternalhit|facebot|twitterbot|linkedinbot|whatsapp|slackbot|telegrambot|discordbot|applebot|skypeuripreview|pinterest|redditbot|embedly|iframely|xing|mastodon|bluesky|signal|googleother|vkshare|quora link preview|outbrain|w3c_validator/i

/** Beim Build eingetragene Domain (site.url). Absolute Links in HTML, Sitemap & Co.
 *  werden auf die tatsächlich aufgerufene Domain umgeschrieben – so funktionieren
 *  Vorschaubilder und Canonicals auf workers.dev genauso wie auf der eigenen Domain. */
const BUILD_ORIGIN = new URL(site.url).origin

const encoder = new TextEncoder()

/** Zugangsnachweis: HMAC über eine feste Kennung, mit dem Passwort als Schlüssel.
 *  Wird das Passwort geändert, verlieren alle bisherigen Freischaltungen ihre Gültigkeit. */
async function sign(password: string) {
  const key = await crypto.subtle.importKey("raw", encoder.encode(password), { name: "HMAC", hash: "SHA-256" }, false, [
    "sign",
  ])
  const mac = await crypto.subtle.sign("HMAC", key, encoder.encode("kleindienst-zugang-v1"))
  return [...new Uint8Array(mac)].map((b) => b.toString(16).padStart(2, "0")).join("")
}

/** Vergleich in konstanter Zeit, damit die Antwortzeit nichts über das Passwort verrät. */
function safeEqual(a: string, b: string) {
  const x = encoder.encode(a)
  const y = encoder.encode(b)
  let diff = x.length ^ y.length
  for (let i = 0; i < Math.max(x.length, y.length); i++) diff |= (x[i] ?? 0) ^ (y[i] ?? 0)
  return diff === 0
}

function readCookie(request: Request, name: string) {
  const header = request.headers.get("Cookie") ?? ""
  for (const part of header.split(";")) {
    const [key, ...value] = part.trim().split("=")
    if (key === name) return value.join("=")
  }
  return null
}

/** Nur interne Pfade als Rücksprungziel zulassen (kein Open Redirect). */
function safeNext(value: File | string | null) {
  const next = typeof value === "string" ? value : ""
  return next.startsWith("/") && !next.startsWith("//") && !next.startsWith("/\\") && !next.startsWith(GATE)
    ? next
    : "/"
}

function redirect(location: string, init: { cookie?: string } = {}) {
  const headers = new Headers({ Location: location, "Cache-Control": "no-store" })
  if (init.cookie) headers.append("Set-Cookie", init.cookie)
  return new Response(null, { status: 303, headers })
}

/** Während der Vorschau: nicht indexieren, nicht in geteilten Caches ablegen. */
function privately(response: Response, path: string) {
  const copy = new Response(response.body, response)
  copy.headers.set("X-Robots-Tag", "noindex, nofollow")
  // Unveränderliche Build-Dateien dürfen gecacht werden, Inhalte nicht
  if (!path.startsWith("/_next/static/")) copy.headers.set("Cache-Control", "private, no-store")
  return copy
}

export default {
  async fetch(request, env) {
    const response = await gate(request, env, (input = request) => env.ASSETS.fetch(input))
    const url = new URL(request.url)
    return withRequestOrigin(response, url.origin, url.pathname)
  },
} satisfies ExportedHandler<Env>

async function withRequestOrigin(response: Response, origin: string, path: string) {
  if (origin === BUILD_ORIGIN || !response.body) return response
  const type = response.headers.get("Content-Type") ?? ""

  // HTML: nur Attribute in Meta-/Link-Tags umschreiben. Die eingebetteten
  // Next.js-Daten sind längenkodiert und dürfen nicht verändert werden.
  if (type.startsWith("text/html")) {
    const swap = (attribute: string) => ({
      element(element: Element) {
        const value = element.getAttribute(attribute)
        if (value?.startsWith(BUILD_ORIGIN)) element.setAttribute(attribute, origin + value.slice(BUILD_ORIGIN.length))
      },
    })
    return new HTMLRewriter().on("meta[content]", swap("content")).on("link[href]", swap("href")).transform(response)
  }

  // Sitemap, robots.txt und Manifest enthalten absolute URLs als Klartext
  if (/^\/(sitemap\.xml|robots\.txt|manifest\.webmanifest)$/.test(path)) {
    const body = (await response.text()).replaceAll(BUILD_ORIGIN, origin)
    const headers = new Headers(response.headers)
    headers.delete("Content-Length")
    headers.delete("ETag")
    return new Response(body, { status: response.status, statusText: response.statusText, headers })
  }
  return response
}

async function gate(request: Request, env: Env, next: (input?: Request | string) => Promise<Response>) {
  const password = env.SITE_PASSWORD
  if (!password) return next()

  const url = new URL(request.url)
  const path = url.pathname
  const expected = await sign(password)

  // robots.txt und Sitemap bleiben für Suchmaschinen erreichbar (Search Console)
  if (CRAWLER_FILES.test(path)) return next()

  // Passwort prüfen
  if (path === GATE && request.method === "POST") {
    const form = await request.formData().catch(() => null)
    const given = form?.get("password")
    const target = safeNext(form?.get("next") ?? null)

    if (typeof given === "string" && given.length > 0 && safeEqual(await sign(given), expected)) {
      const cookie = `${COOKIE}=${expected}; Path=/; Max-Age=${MAX_AGE}; HttpOnly; Secure; SameSite=Lax`
      return redirect(target, { cookie })
    }
    // Brute-Force bremsen
    await new Promise((resolve) => setTimeout(resolve, 800))
    return redirect(`${GATE}?fehler=1&next=${encodeURIComponent(target)}`)
  }

  // Abmelden
  if (path === `${GATE}/abmelden`) {
    return redirect(GATE, { cookie: `${COOKIE}=; Path=/; Max-Age=0; HttpOnly; Secure; SameSite=Lax` })
  }

  const authorized = safeEqual(readCookie(request, COOKIE) ?? "", expected)
  if (authorized || PUBLIC_PATHS.some((pattern) => pattern.test(path))) {
    return privately(await next(), path)
  }

  // Link-Vorschau-Crawler: Zugangsseite mit Marken-Metadaten direkt ausliefern
  if (request.method === "GET" && PREVIEW_BOTS.test(request.headers.get("User-Agent") ?? "")) {
    const preview = await next(new URL(GATE, url).toString())
    return privately(new Response(preview.body, { status: 200, headers: preview.headers }), GATE)
  }

  // Seitenaufrufe zur Zugangsseite umleiten, alles andere (Daten, Bilder) abweisen
  const wantsPage = request.method === "GET" && (request.headers.get("Accept") ?? "").includes("text/html")
  if (wantsPage) return redirect(`${GATE}?next=${encodeURIComponent(path + url.search)}`)
  return new Response("Zugang nur mit Passwort.", {
    status: 401,
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store", "X-Robots-Tag": "noindex" },
  })
}
