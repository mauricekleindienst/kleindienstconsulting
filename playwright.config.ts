import { defineConfig, devices } from "@playwright/test"

/** Öffentliche Website (ohne SITE_PASSWORD) – so wie nach dem Livegang */
export const OPEN_URL = "http://localhost:8789"
/** Website hinter der Passwort-Schranke (mit SITE_PASSWORD) */
export const GATED_URL = "http://localhost:8788"
export const E2E_PASSWORD = "e2e-passwort"

const pagesDev = (port: number, binding = "") =>
  `WRANGLER_SEND_METRICS=false npx wrangler pages dev out --port ${port} --ip 127.0.0.1 ${binding}`

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: [["list"]],
  use: {
    baseURL: OPEN_URL,
    trace: "retain-on-failure",
    locale: "de-DE",
  },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"], viewport: { width: 1440, height: 900 } } },
    { name: "mobil", use: { ...devices["Pixel 7"] } },
    { name: "mobil-klein", use: { ...devices["Pixel 7"], viewport: { width: 320, height: 640 } } },
  ],
  // Getestet wird der statische Export (./out) inklusive Pages Functions – wie auf Cloudflare.
  // Vorher bauen: npm run build (oder npm run test:e2e)
  webServer: [
    { command: pagesDev(8789), url: `${OPEN_URL}/zugang`, reuseExistingServer: !process.env.CI, timeout: 120_000 },
    {
      command: pagesDev(8788, `--binding SITE_PASSWORD=${E2E_PASSWORD}`),
      url: `${GATED_URL}/zugang`,
      reuseExistingServer: !process.env.CI,
      timeout: 120_000,
    },
  ],
})
