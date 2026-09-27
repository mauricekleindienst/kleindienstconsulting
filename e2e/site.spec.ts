import AxeBuilder from "@axe-core/playwright"
import { expect, test, type Page } from "@playwright/test"

const pages = ["/", "/impressum", "/datenschutz"] as const

/** Sammelt Konsolenfehler und fehlgeschlagene Requests einer Seite. */
function trackErrors(page: Page) {
  const errors: string[] = []
  page.on("console", (msg) => {
    if (msg.type() === "error") errors.push(`console: ${msg.text()}`)
  })
  page.on("pageerror", (error) => errors.push(`pageerror: ${error.message}`))
  page.on("response", (response) => {
    if (response.status() >= 400) errors.push(`${response.status()} ${response.url()}`)
  })
  return errors
}

test.describe("Alle Seiten", () => {
  for (const path of pages) {
    test(`${path} lädt fehlerfrei`, async ({ page }) => {
      const errors = trackErrors(page)
      const response = await page.goto(path, { waitUntil: "networkidle" })
      expect(response?.status()).toBe(200)
      await expect(page.locator("h1")).toHaveCount(1)
      await expect(page.locator("html")).toHaveAttribute("lang", "de")
      await expect(page).toHaveTitle(/Kleindienst/)
      expect(errors).toEqual([])
    })

    test(`${path} ohne horizontales Scrollen`, async ({ page }) => {
      await page.goto(path, { waitUntil: "networkidle" })
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)
      expect(overflow).toBeLessThanOrEqual(0)
    })

    test(`${path} ohne Barrierefreiheits-Verstöße (axe, WCAG 2.2 AA)`, async ({ page }) => {
      await page.emulateMedia({ reducedMotion: "reduce" })
      await page.goto(path, { waitUntil: "networkidle" })
      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa", "best-practice"])
        .analyze()
      expect(results.violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target).join(", ")}`)).toEqual([])
    })

    test(`${path} Überschriften-Hierarchie ohne Sprünge`, async ({ page }) => {
      await page.goto(path)
      const levels = await page.$$eval("h1, h2, h3, h4, h5, h6", (hs) => hs.map((h) => Number(h.tagName[1])))
      expect(levels[0]).toBe(1)
      for (let i = 1; i < levels.length; i++) expect(levels[i] - levels[i - 1]).toBeLessThanOrEqual(1)
    })

    test(`${path} Meta-Daten für SEO und Link-Vorschau`, async ({ page, baseURL, request }) => {
      // Crawler lesen das Server-HTML (ohne JavaScript) – genau das wird geprüft
      const html = await (await request.get(path)).text()
      const meta = (attr: "property" | "name", key: string) =>
        html.match(new RegExp(`<meta ${attr}="${key}" content="([^"]*)"`))?.[1]

      expect(html.match(/<meta name="description" content="([^"]{50,})"/), "description").toBeTruthy()
      // Absolute URLs zeigen auf die aufgerufene Domain (Worker schreibt site.url um)
      expect(html.match(/<link rel="canonical" href="([^"]*)"/)?.[1]).toMatch(new RegExp(`^${baseURL}`))
      for (const property of ["og:title", "og:description", "og:url", "og:image", "og:image:width", "og:type", "og:locale"])
        expect(meta("property", property), property).toBeTruthy()
      expect(meta("property", "og:url")).toMatch(new RegExp(`^${baseURL}`))
      expect(meta("name", "twitter:card")).toBe("summary_large_image")
      const image = meta("property", "og:image")!
      expect(image).toMatch(new RegExp(`^${baseURL}/opengraph-image`))
      const imageResponse = await request.get(image)
      expect(imageResponse.status()).toBe(200)
      expect(imageResponse.headers()["content-type"]).toContain("image/png")
      expect(html).toContain('rel="apple-touch-icon"')
      expect(html).toContain('rel="manifest"')

      await page.goto(path)
      await expect(page.locator('meta[name="viewport"]')).not.toHaveAttribute("content", /user-scalable=no|maximum-scale=1\b/)
    })
  }

  test("interne Links führen zu existierenden Seiten und Ankern", async ({ page, request }) => {
    const hrefs = new Set<string>()
    for (const path of pages) {
      await page.goto(path)
      for (const href of await page.$$eval("a[href^='/']", (as) => as.map((a) => a.getAttribute("href")!)))
        hrefs.add(href)
    }
    for (const href of hrefs) {
      const [path, hash] = href.split("#")
      const response = await request.get(path || "/")
      expect(response.status(), href).toBe(200)
      if (hash) {
        await page.goto(path || "/")
        await expect(page.locator(`#${hash}`), href).toHaveCount(1)
      }
    }
  })

  test("externe Links öffnen sicher in neuem Tab", async ({ page }) => {
    for (const path of pages) {
      await page.goto(path)
      for (const link of await page.locator("a[href^='http']").all()) {
        await expect(link, await link.getAttribute("href") ?? "").toHaveAttribute("target", "_blank")
        await expect(link).toHaveAttribute("rel", /noopener/)
      }
    }
  })

  test("unbekannte URL liefert gestaltete 404-Seite", async ({ page }) => {
    const response = await page.goto("/gibt-es-nicht")
    expect(response?.status()).toBe(404)
    await expect(page.getByRole("heading", { level: 1 })).toContainText("nicht auf der Karte")
    await page.getByRole("link", { name: "Zur Startseite", exact: true }).click()
    await expect(page).toHaveURL("/")
  })
})

test.describe("Startseite", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/", { waitUntil: "networkidle" })
  })

  test("Hero mit Keyword, Bon und Calls-to-Action", async ({ page }) => {
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Gastronomieberatung in München")
    await expect(page.getByText("KÜCHENPASS")).toBeVisible()
    await page.getByRole("link", { name: "Kostenfreies Erstgespräch" }).click()
    await expect(page).toHaveURL(/#kontakt$/)
    await expect(page.locator("#kontakt")).toBeInViewport()
  })

  test("Anker-Ziele liegen nicht unter dem Sticky-Header", async ({ page }) => {
    for (const id of ["leistungen", "vorgehen", "ueber-mich", "faq", "kontakt"]) {
      await page.goto(`/#${id}`)
      await page.waitForTimeout(600)
      const headerBottom = await page.locator("header").evaluate((h) => h.getBoundingClientRect().bottom)
      const title = page.locator(`#${id} h2`).first()
      const top = await title.evaluate((el) => el.getBoundingClientRect().top)
      expect(top, id).toBeGreaterThanOrEqual(headerBottom)
    }
  })

  test("FAQ lässt sich per Klick und Tastatur öffnen", async ({ page }) => {
    const first = page.locator("#faq details").first()
    await first.locator("summary").click()
    await expect(first).toHaveAttribute("open", "")
    await first.locator("summary").press("Enter")
    await expect(first).not.toHaveAttribute("open", "")
  })

  test("Kontaktwege sind korrekt verlinkt", async ({ page }) => {
    const contact = page.locator("#kontakt")
    await expect(contact.locator("a[href^='mailto:']").first()).toHaveAttribute("href", /subject=/)
    await expect(contact.locator("a[href^='tel:']").first()).toHaveAttribute("href", /^tel:\+?\d+$/)
    await expect(contact.getByRole("link", { name: /Mario Kleindienst/ })).toHaveAttribute(
      "href",
      /linkedin\.com\/in\/mario-kleindienst-64324a213/,
    )
  })

  test("Footer: Rechtliches, LinkedIn und Mousewerk", async ({ page }) => {
    const footer = page.locator("footer")
    await expect(footer.getByRole("link", { name: "Impressum" })).toHaveAttribute("href", "/impressum")
    await expect(footer.getByRole("link", { name: "Datenschutz" })).toHaveAttribute("href", "/datenschutz")
    await expect(footer.getByRole("link", { name: /LinkedIn/ })).toHaveAttribute("href", /linkedin\.com/)
    await expect(footer.getByRole("link", { name: /Made by Mousewerk/ })).toHaveAttribute("href", "https://mousewerk.de")
  })

  test("strukturierte Daten sind gültiges JSON-LD ohne Platzhalter", async ({ page }) => {
    const raw = await page.locator('script[type="application/ld+json"]').textContent()
    const data = JSON.parse(raw!)
    const types = data["@graph"].map((n: { "@type": string }) => n["@type"])
    expect(types).toEqual(expect.arrayContaining(["ProfessionalService", "Person", "FAQPage", "WebSite"]))
    // Platzhalter wie "[PLZ]" dürfen nicht an Suchmaschinen gehen
    expect(raw).not.toMatch(/"\[[^\]"]+\]"/)
  })

  test("Skip-Link springt zum Inhalt", async ({ page, isMobile }) => {
    test.skip(isMobile, "Tastaturbedienung auf Desktop")
    await page.keyboard.press("Tab")
    const skip = page.getByRole("link", { name: "Zum Inhalt springen" })
    await expect(skip).toBeFocused()
    await expect(skip).toBeInViewport()
    await page.keyboard.press("Enter")
    await expect(page).toHaveURL(/#inhalt$/)
  })

  test("keine Cookies und keine Drittanbieter-Requests (DSGVO)", async ({ page, context, baseURL }) => {
    const foreign: string[] = []
    page.on("request", (r) => {
      if (!r.url().startsWith(baseURL!) && !r.url().startsWith("data:")) foreign.push(r.url())
    })
    await page.reload({ waitUntil: "networkidle" })
    await page.mouse.wheel(0, 20000)
    await page.waitForTimeout(500)
    expect(foreign).toEqual([])
    expect(await context.cookies()).toEqual([])
  })
})

test.describe("Mobil", () => {
  test.beforeEach(({ isMobile }) => test.skip(!isMobile, "nur mobil"))

  test("Menü öffnet, navigiert, schließt per Escape", async ({ page }) => {
    await page.goto("/")
    const toggle = page.getByRole("button", { name: "Menü öffnen" })
    await expect(toggle).toHaveAttribute("aria-expanded", "false")
    await toggle.click()
    const mobileNav = page.getByRole("navigation", { name: "Mobile Navigation" })
    await expect(mobileNav).toBeVisible()
    await expect(page.getByRole("button", { name: "Menü schließen" })).toHaveAttribute("aria-expanded", "true")
    await page.keyboard.press("Escape")
    await expect(mobileNav).toBeHidden()

    await page.getByRole("button", { name: "Menü öffnen" }).click()
    await mobileNav.getByRole("link", { name: "FAQ" }).click()
    await expect(mobileNav).toBeHidden()
    await expect(page).toHaveURL(/#faq$/)
    await expect(page.locator("#faq h2")).toBeInViewport()
  })

  test("Menü: Fokus wandert hinein, Hintergrund gesperrt, Escape gibt Fokus zurück", async ({ page }) => {
    await page.goto("/")
    const toggle = page.getByRole("button", { name: "Menü öffnen" })
    await toggle.click()
    const mobileNav = page.getByRole("navigation", { name: "Mobile Navigation" })
    await expect(mobileNav.getByRole("link").first()).toBeFocused()
    expect(await page.locator("main").evaluate((el) => (el as HTMLElement).inert)).toBe(true)
    await page.keyboard.press("Escape")
    await expect(page.getByRole("button", { name: "Menü öffnen" })).toBeFocused()
    expect(await page.locator("main").evaluate((el) => (el as HTMLElement).inert)).toBe(false)
  })

  test("Menü schließt beim Wechsel auf Desktop-Breite und gibt Scrollen frei", async ({ page }) => {
    await page.goto("/")
    await page.getByRole("button", { name: "Menü öffnen" }).click()
    expect(await page.evaluate(() => document.body.style.overflow)).toBe("hidden")
    await page.setViewportSize({ width: 1280, height: 800 })
    await expect(page.getByRole("navigation", { name: "Mobile Navigation" })).toBeHidden()
    expect(await page.evaluate(() => document.body.style.overflow)).toBe("")
  })

  test("Schnellkontakt-Leiste ist sichtbar und verdeckt keinen Footer-Inhalt", async ({ page }) => {
    await page.goto("/")
    const bar = page.getByRole("navigation", { name: "Schnellkontakt" })
    await expect(bar).toBeVisible()
    await expect(bar.getByRole("link", { name: "Anrufen" })).toHaveAttribute("href", /^tel:/)
    await expect(bar.getByRole("link", { name: "E-Mail schreiben" })).toHaveAttribute("href", /^mailto:/)
    await page.evaluate(() => {
      document.documentElement.style.scrollBehavior = "auto"
      window.scrollTo(0, document.body.scrollHeight)
    })
    const barTop = await bar.evaluate((el) => el.getBoundingClientRect().top)
    const lastLink = page.locator("footer a").last()
    const linkBottom = await lastLink.evaluate((el) => el.getBoundingClientRect().bottom)
    expect(linkBottom).toBeLessThanOrEqual(barTop)
  })

  test("Touch-Ziele sind mindestens 44 px hoch", async ({ page }) => {
    await page.goto("/")
    const small = await page.$$eval("header a, header button, main a.inline-flex, nav[aria-label='Schnellkontakt'] a", (els) =>
      els
        .filter((el) => (el as HTMLElement).offsetParent !== null)
        .map((el) => ({ text: el.textContent?.trim(), h: el.getBoundingClientRect().height }))
        .filter((e) => e.h < 44),
    )
    expect(small).toEqual([])
  })
})

test.describe("Rechtliches", () => {
  test("Impressum enthält die Pflichtangaben", async ({ page }) => {
    await page.goto("/impressum")
    for (const heading of ["Angaben gemäß § 5 DDG", "Kontakt", "§ 18 Abs. 2 MStV", "Verbraucherstreitbeilegung"])
      await expect(page.locator("main").getByRole("heading", { name: heading })).toBeVisible()
  })

  test("Datenschutzerklärung deckt Pflichtthemen ab", async ({ page }) => {
    await page.goto("/datenschutz")
    for (const text of ["Verantwortlicher", "Hosting", "Cookies", "Ihre Rechte", "Aufsichtsbehörde", "BayLDA"])
      await expect(page.getByText(text).first()).toBeVisible()
  })

  // Vor dem Livegang: RELEASE=1 npx playwright test -g Livegang
  test("Livegang: keine Platzhalter mehr", async ({ page }) => {
    test.skip(!process.env.RELEASE, "nur mit RELEASE=1")
    for (const path of pages) {
      await page.goto(path)
      expect(await page.locator("body").innerText(), path).not.toMatch(/\[[^\]]+\]/)
    }
  })
})

test.describe("SEO-Dateien", () => {
  test("robots.txt, sitemap.xml, Icon und OG-Bild", async ({ request }) => {
    const robots = await request.get("/robots.txt")
    expect(robots.status()).toBe(200)
    expect(await robots.text()).toContain("Sitemap:")

    const sitemap = await request.get("/sitemap.xml")
    expect(sitemap.status()).toBe(200)
    const xml = await sitemap.text()
    for (const path of ["/impressum", "/datenschutz"]) expect(xml).toContain(path)

    const icon = await request.get("/icon.png")
    expect(icon.status()).toBe(200)
    expect((await request.get("/apple-icon.png")).headers()["content-type"]).toContain("image/png")
    const manifest = await (await request.get("/manifest.webmanifest")).json()
    expect(manifest.name).toBe("Kleindienst Gastro Consulting")

    const og = await request.get("/opengraph-image")
    expect(og.status()).toBe(200)
    expect(og.headers()["content-type"]).toContain("image/png")
  })

  test("Sicherheits-Header gesetzt", async ({ request }) => {
    const headers = (await request.get("/")).headers()
    expect(headers["x-content-type-options"]).toBe("nosniff")
    expect(headers["x-frame-options"]).toBe("DENY")
    expect(headers["referrer-policy"]).toBeTruthy()
    expect(headers["x-powered-by"]).toBeUndefined()
  })
})
