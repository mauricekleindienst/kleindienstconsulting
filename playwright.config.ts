import { defineConfig, devices } from "@playwright/test"

const PORT = 3100

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: [["list"]],
  use: {
    baseURL: `http://localhost:${PORT}`,
    trace: "retain-on-failure",
    locale: "de-DE",
  },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"], viewport: { width: 1440, height: 900 } } },
    { name: "mobil", use: { ...devices["Pixel 7"] } },
    { name: "mobil-klein", use: { ...devices["Pixel 7"], viewport: { width: 320, height: 640 } } },
  ],
  // Getestet wird der Produktions-Build (npm run build vorher ausführen)
  webServer: {
    command: `npx next start -p ${PORT}`,
    port: PORT,
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
  },
})
