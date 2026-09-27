/**
 * Passwortschutz für die gesamte Website (Cloudflare Pages Function).
 *
 * Aktiv, sobald in Cloudflare die Umgebungsvariable SITE_PASSWORD gesetzt ist
 * (Pages → Settings → Variables and Secrets, Typ „Secret“). Ohne die Variable
 * ist die Website öffentlich – kein neues Deployment nötig.
 *
 * Öffentlich bleiben nur die Zugangsseite (/zugang, inkl. Impressum und
 * Datenschutz des Betreibers) und die statischen Build-Dateien.
 */

interface Env {
  SITE_PASSWORD?: string
}

const COOKIE = "kgc_zugang"
const MAX_AGE = 60 * 60 * 24 * 30 // 30 Tage
const GATE = "/zugang"

/** Pfade, die auch ohne Passwort erreichbar sein müssen. */
const PUBLIC_PATHS = [
  /^\/zugang(?:\.html|\.txt)?$/,
  /^\/zugang\//,
  /^\/_next\/static\//,
  /^\/icon\.svg$/,
  /^\/favicon\.ico$/,
]

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

export const onRequest: PagesFunction<Env> = async ({ request, env, next }) => {
  const password = env.SITE_PASSWORD
  if (!password) return next()

  const url = new URL(request.url)
  const path = url.pathname
  const expected = await sign(password)

  // Suchmaschinen während der Vorschau komplett aussperren
  if (path === "/robots.txt") {
    return new Response("User-agent: *\nDisallow: /\n", {
      headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" },
    })
  }

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

  // Seitenaufrufe zur Zugangsseite umleiten, alles andere (Daten, Bilder) abweisen
  const wantsPage = request.method === "GET" && (request.headers.get("Accept") ?? "").includes("text/html")
  if (wantsPage) return redirect(`${GATE}?next=${encodeURIComponent(path + url.search)}`)
  return new Response("Zugang nur mit Passwort.", {
    status: 401,
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store", "X-Robots-Tag": "noindex" },
  })
}
