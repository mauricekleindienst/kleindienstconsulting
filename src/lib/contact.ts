import { site } from "@/content/site"

export function mailtoHref(subject = "Anfrage Erstgespräch") {
  return `mailto:${site.contact.email}?subject=${encodeURIComponent(subject)}`
}

export function telHref() {
  return `tel:${site.contact.phone.replace(/[^\d+]/g, "")}`
}
