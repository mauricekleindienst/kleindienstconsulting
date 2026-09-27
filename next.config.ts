import type { NextConfig } from "next"

// Statischer Export für Cloudflare Pages (Ausgabe in ./out).
// Sicherheits-Header stehen in public/_headers, der Passwortschutz in functions/_middleware.ts.
const nextConfig: NextConfig = {
  output: "export",
  poweredByHeader: false,
  images: { unoptimized: true },
}

export default nextConfig
