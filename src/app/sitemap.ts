export const dynamic = "force-static"

import type { MetadataRoute } from "next"
import { serviceDetails } from "@/content/services"
import { site } from "@/content/site"

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()
  return [
    { url: site.url, lastModified, changeFrequency: "monthly", priority: 1 },
    ...serviceDetails.map((service) => ({
      url: `${site.url}/leistungen/${service.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    { url: `${site.url}/impressum`, lastModified, changeFrequency: "yearly", priority: 0.2 },
    { url: `${site.url}/datenschutz`, lastModified, changeFrequency: "yearly", priority: 0.2 },
  ]
}
