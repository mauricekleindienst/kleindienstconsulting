export const dynamic = "force-static"

import { ImageResponse } from "next/og"

export const alt = "Kleindienst Gastro Consulting – Gastronomieberatung in München & Umgebung"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: "#1e3a2f",
          color: "#f6f6f1",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <svg width="88" height="88" viewBox="0 0 48 48" fill="none">
            <circle cx="24" cy="24" r="22" stroke="#f6f6f1" strokeWidth="2" />
            <path d="M16.5 35.5V12.5c3.6 1.4 4.6 5 4.6 9.5v13.5z" fill="#f6f6f1" />
            <path d="M21.4 25 29 16" stroke="#f6f6f1" strokeWidth="3" strokeLinecap="round" />
            <path d="m23.6 23.2 7.4 12" stroke="#f6f6f1" strokeWidth="3" strokeLinecap="round" />
            <circle cx="31.6" cy="12.6" r="2.4" fill="#d9bf86" />
          </svg>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 44 }}>Kleindienst</div>
            <div style={{ fontSize: 20, opacity: 0.7 }}>Gastro Consulting München</div>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 76, lineHeight: 1.05, maxWidth: 950 }}>
            Gastronomie, die sich rechnet.
          </div>
          <div style={{ marginTop: 28, fontSize: 28, color: "#d9bf86" }}>
            Gastronomieberatung in München und Umgebung, Mario Kleindienst
          </div>
        </div>
      </div>
    ),
    size,
  )
}
