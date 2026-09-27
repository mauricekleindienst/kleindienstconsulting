export const dynamic = "force-static"

import { ImageResponse } from "next/og"
import { brand, OgMark } from "@/lib/og"

export const size = { width: 180, height: 180 }
export const contentType = "image/png"

/** Icon für den iOS-Homescreen und Link-Vorschauen (iMessage). */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: brand.green }}>
        <OgMark size={132} />
      </div>
    ),
    size,
  )
}
