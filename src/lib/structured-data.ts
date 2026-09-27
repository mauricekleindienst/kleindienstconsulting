import { serviceByTitle } from "@/content/services"
import { faqs, serviceArea, services, site } from "@/content/site"

/** Schema.org-Daten für lokale Suche (Google Business-Rich-Results) und FAQ. */
/** Platzhalter wie "[PLZ]" nicht an Suchmaschinen ausliefern. */
function real(value: string) {
  return value.startsWith("[") ? undefined : value
}

export function structuredData() {
  const business = {
    "@type": "ProfessionalService",
    "@id": `${site.url}/#business`,
    name: site.name,
    description: site.description,
    url: site.url,
    image: [`${site.url}/mario-kleindienst.jpg`, `${site.url}/opengraph-image`],
    logo: `${site.url}/brand/mk-logo-ink-gross.png`,
    geo: { "@type": "GeoCoordinates", latitude: site.geo.latitude, longitude: site.geo.longitude },
    hasMap: `https://www.google.com/maps/search/?api=1&query=${site.geo.latitude},${site.geo.longitude}`,
    email: real(site.contact.email),
    telephone: real(site.contact.phone),
    priceRange: "€€",
    address: {
      "@type": "PostalAddress",
      streetAddress: real(site.legal.street),
      postalCode: real(site.legal.postalCode),
      addressLocality: real(site.legal.city),
      addressRegion: "Bayern",
      addressCountry: "DE",
    },
    areaServed: serviceArea.map((name) => ({ "@type": "Place", name })),
    founder: { "@id": `${site.url}/#owner` },
    sameAs: [site.owner.linkedin],
    knowsLanguage: "de",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Leistungen der Gastronomieberatung",
      itemListElement: services.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.title,
          description: service.summary,
          url: serviceByTitle(service.title) ? `${site.url}/leistungen/${serviceByTitle(service.title)!.slug}` : undefined,
        },
      })),
    },
  }

  const person = {
    "@type": "Person",
    "@id": `${site.url}/#owner`,
    name: site.owner.name,
    jobTitle: site.owner.role,
    image: `${site.url}/mario-kleindienst.jpg`,
    hasOccupation: { "@type": "Occupation", name: "Gastronomieberater", occupationLocation: { "@type": "City", name: "München" } },
    worksFor: { "@id": `${site.url}/#business` },
    sameAs: [site.owner.linkedin],
    knowsAbout: [
      "Gastronomieberatung",
      "Küchenleitung",
      "Speisekarten-Engineering",
      "Wareneinsatz",
      "HACCP",
      "Personalplanung",
    ],
  }

  const faqPage = {
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  }

  const website = {
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    url: site.url,
    name: site.name,
    inLanguage: "de-DE",
    publisher: { "@id": `${site.url}/#business` },
  }

  return { "@context": "https://schema.org", "@graph": [business, person, faqPage, website] }
}

/** Serialisiert JSON-LD sicher für ein <script>-Tag (verhindert "</script>"-Injection). */
export function jsonLd(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c")
}
