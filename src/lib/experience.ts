import { site } from "@/content/site"

/** Volle Jahre seit Ausbildungsbeginn, abgerundet auf die nächste Fünf ("über 35"). */
export function yearsInTrade(now = new Date()) {
  const years = now.getFullYear() - site.owner.careerStart
  return Math.floor(years / 5) * 5
}
