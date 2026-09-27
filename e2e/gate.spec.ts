import AxeBuilder from "@axe-core/playwright"
import { expect, test } from "@playwright/test"
import { E2E_PASSWORD, GATED_URL } from "../playwright.config"

test.use({ baseURL: GATED_URL })

test.describe("Passwort-Schranke", () => {
  test("ohne Passwort ist keine Inhaltsseite erreichbar", async ({ page }) => {
    for (const path of ["/", "/impressum", "/datenschutz", "/gibt-es-nicht"]) {
      await page.goto(path)
      await expect(page, path).toHaveURL(/\/zugang\?next=/)
      await expect(page.getByRole("heading", { level: 1 })).toHaveText("Bald geöffnet")
    }
  })

  test("Inhalte, Daten und Bilder sind ohne Passwort gesperrt", async ({ request }) => {
    for (const path of ["/index.txt", "/index.html", "/impressum.txt", "/__next._full.txt", "/sitemap.xml"]) {
      const response = await request.get(path, { maxRedirects: 0 })
      expect([401, 303], path).toContain(response.status())
      expect(await response.text(), path).not.toContain("Kalkulation")
    }
  })

  test("Link-Vorschau funktioniert trotz Passwort (WhatsApp, LinkedIn, iMessage …)", async ({ request, baseURL }) => {
    for (const agent of ["WhatsApp/2.23.20.0", "LinkedInBot/1.0 (compatible; Mozilla/5.0)", "facebookexternalhit/1.1", "Twitterbot/1.0", "Slackbot-LinkExpanding 1.0"]) {
      const response = await request.get("/impressum", { headers: { "User-Agent": agent }, maxRedirects: 0 })
      expect(response.status(), agent).toBe(200)
      const html = await response.text()
      expect(html, agent).toContain('property="og:title" content="Gastronomieberatung München')
      expect(html, agent).toContain(`property="og:image" content="${baseURL}/opengraph-image`)
      expect(html, agent).not.toContain("Angaben gemäß § 5 DDG") // kein geschützter Inhalt
    }
    const image = await request.get("/opengraph-image")
    expect(image.status()).toBe(200)
    expect(image.headers()["content-type"]).toContain("image/png")
    expect((await request.get("/apple-icon.png")).status()).toBe(200)
    expect((await request.get("/icon.png")).status()).toBe(200)
  })

  test("Suchmaschinen werden ausgesperrt", async ({ page, request }) => {
    expect(await (await request.get("/robots.txt")).text()).toContain("Disallow: /")
    const response = await page.goto("/zugang")
    expect(response?.headers()["x-robots-tag"]).toContain("noindex")
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/)
  })

  test("Zugangsseite ist barrierefrei (axe)", async ({ page }) => {
    await page.goto("/zugang?fehler=1")
    const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa", "best-practice"]).analyze()
    expect(results.violations.map((v) => v.id)).toEqual([])
  })

  test("Impressum und Datenschutz des Betreibers sind öffentlich", async ({ page }) => {
    await page.goto("/zugang")
    await page.getByRole("link", { name: "Impressum" }).click()
    await expect(page).toHaveURL("/zugang/impressum")
    await expect(page.getByText("Maurice Kleindienst").first()).toBeVisible()
    await expect(page.getByText("Weserstraße 16 A").first()).toBeVisible()
    await expect(page.getByText("DE463851440")).toBeVisible()
    await expect(page.getByRole("link", { name: "info@mousewerk.de" })).toHaveAttribute("href", "mailto:info@mousewerk.de")

    await page.getByRole("link", { name: "Datenschutz" }).click()
    await expect(page).toHaveURL("/zugang/datenschutz")
    await expect(page.getByText("Cloudflare Pages").first()).toBeVisible()
    await expect(page.getByText("kgc_zugang").first()).toBeVisible()
  })

  test("falsches Passwort zeigt Fehler und öffnet nichts", async ({ page, context }) => {
    await page.goto("/impressum")
    await page.getByLabel("Zugangspasswort").fill("falsch")
    await page.getByRole("button", { name: "Website öffnen" }).click()
    await expect(page).toHaveURL(/\/zugang\?fehler=1/)
    await expect(page.locator("form").getByRole("alert")).toHaveText(/stimmt nicht/)
    await expect(page.getByLabel("Zugangspasswort")).toHaveAttribute("aria-invalid", "true")
    expect(await context.cookies()).toEqual([])
  })

  test("richtiges Passwort öffnet die Website und führt zur gewünschten Seite", async ({ page, context }) => {
    await page.goto("/impressum")
    await page.getByLabel("Zugangspasswort").fill(E2E_PASSWORD)
    await page.getByLabel("Zugangspasswort").press("Enter")
    await expect(page).toHaveURL("/impressum")
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Impressum")

    const [cookie] = await context.cookies()
    expect(cookie).toMatchObject({ name: "kgc_zugang", httpOnly: true, secure: true, sameSite: "Lax" })

    // Freigeschaltet: Startseite, Navigation und Daten laden
    await page.goto("/")
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Gastronomie, die sich rechnet")
    await page.locator("footer").getByRole("link", { name: "Datenschutz" }).click()
    await expect(page).toHaveURL("/datenschutz")
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Datenschutz")
  })

  test("funktioniert auch ohne JavaScript", async ({ browser }) => {
    const context = await browser.newContext({ baseURL: GATED_URL, javaScriptEnabled: false })
    const page = await context.newPage()
    await page.goto("/datenschutz")
    await page.getByLabel("Zugangspasswort").fill(E2E_PASSWORD)
    await page.getByRole("button", { name: "Website öffnen" }).click()
    // Ohne JS kennt das Formular das Ziel nicht (Query wird clientseitig gelesen) → Startseite
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Gastronomie")
    await context.close()
  })

  test("gefälschtes Cookie wird abgewiesen, Abmelden sperrt wieder", async ({ page, context }) => {
    await context.addCookies([{ name: "kgc_zugang", value: "gefaelscht", url: GATED_URL }])
    await page.goto("/")
    await expect(page).toHaveURL(/\/zugang/)

    await page.getByLabel("Zugangspasswort").fill(E2E_PASSWORD)
    await page.getByRole("button", { name: "Website öffnen" }).click()
    await expect(page).toHaveURL("/")
    await page.goto("/zugang/abmelden")
    await page.goto("/")
    await expect(page).toHaveURL(/\/zugang/)
  })

  test("kein Open Redirect über den next-Parameter", async ({ request }) => {
    for (const next of ["//evil.example", "https://evil.example", "/\\evil.example"]) {
      const response = await request.post("/zugang", { form: { password: E2E_PASSWORD, next }, maxRedirects: 0 })
      expect(response.status()).toBe(303)
      expect(response.headers()["location"], next).toBe("/")
    }
  })
})
