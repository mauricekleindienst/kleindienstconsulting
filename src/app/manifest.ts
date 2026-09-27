export const dynamic = "force-static"

import type { MetadataRoute } from "next"
import { site } from "@/content/site"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: site.shortName,
    description: site.description,
    lang: "de",
    start_url: "/",
    display: "browser",
    background_color: "#f6f6f1",
    theme_color: "#1e3a2f",
    icons: [
      { src: "/icon.png", type: "image/png", sizes: "512x512" },
      { src: "/apple-icon.png", type: "image/png", sizes: "180x180" },
    ],
  }
}
