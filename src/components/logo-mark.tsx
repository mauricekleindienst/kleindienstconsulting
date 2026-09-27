import type { SVGProps } from "react"

/**
 * Bildmarke „Teller-K“
 * – Tellerrand: der Teller als Bühne jedes Gastronomen
 * – K-Stamm als Kochmesser-Klinge: Handwerk aus der Küche
 * – Messing-Punkt als Garnitur: das Tüpfelchen auf dem i
 */
export function LogoMark({
  accent = "var(--color-brass)",
  ...props
}: SVGProps<SVGSVGElement> & { accent?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden focusable={false} {...props}>
      <circle cx="24" cy="24" r="22" stroke="currentColor" strokeWidth="2" />
      <circle cx="24" cy="24" r="17.5" stroke="currentColor" strokeWidth="0.75" opacity="0.35" />
      <path d="M16.5 35.5V12.5c3.6 1.4 4.6 5 4.6 9.5v13.5z" fill="currentColor" />
      <path d="M21.4 25 29 16" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path d="m23.6 23.2 7.4 12" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <circle cx="31.6" cy="12.6" r="2.4" fill={accent} />
    </svg>
  )
}
