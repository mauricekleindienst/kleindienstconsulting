export const dynamic = "force-static"

import { ImageResponse } from "next/og"
import { site } from "@/content/site"
import { brand, ogFonts, ogLogo } from "@/lib/og"

export const alt = "Kleindienst Gastro Consulting – Gastronomieberatung in München und Umgebung"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

/** Vorschaubild für WhatsApp, LinkedIn, Facebook, X, Slack, iMessage & Co. */
export default async function OpenGraphImage() {
  const logo = await ogLogo()
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: brand.green,
          color: brand.linen,
          fontFamily: "Geist",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <img src={logo} width={116} height={96} alt="" />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontFamily: "Bricolage", fontSize: 42, lineHeight: 1 }}>Kleindienst</div>
            <div style={{ fontSize: 22, marginTop: 8, opacity: 0.75 }}>Gastro Consulting München</div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 26, color: brand.brassLight }}>Gastronomieberatung in München und Umgebung</div>
          <div style={{ fontFamily: "Bricolage", fontSize: 92, lineHeight: 1, marginTop: 18, letterSpacing: -2 }}>
            Gastronomie, die sich rechnet.
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24, opacity: 0.8 }}>
          <div>{`${site.owner.name} · über 35 Jahre Gastronomie`}</div>
          <div>Kalkulation · Speisekarte · Küche · Personal</div>
        </div>
      </div>
    ),
    { ...size, fonts: await ogFonts() },
  )
}
