import type { NextConfig } from "next"

// Statischer Export für Cloudflare Workers Static Assets (Ausgabe in ./out).
// Sicherheits-Header stehen in public/_headers, der Passwortschutz in worker/index.ts.
const nextConfig: NextConfig = {
  output: "export",
  poweredByHeader: false,
  images: { unoptimized: true },
}

export default nextConfig
