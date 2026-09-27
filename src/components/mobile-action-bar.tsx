"use client"

import { useEffect, useState } from "react"
import { mailtoHref, telHref } from "@/lib/contact"
import { cn } from "@/lib/cn"
import { Mail, Phone } from "./ui/icons"

/**
 * Schnellkontakt auf dem Smartphone. Erscheint erst, wenn die Haupt-Buttons der Seite
 * aus dem Bild gescrollt sind, und verschwindet im Kontaktbereich und Footer –
 * dort gibt es die Kontaktwege ohnehin, doppelt wirkt es unruhig.
 */
export function MobileActionBar() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const primary = [...document.querySelectorAll("[data-primary-cta]")]
    const endAreas = [...document.querySelectorAll("[data-contact-area], footer")]
    let frame = 0

    // Direkt aus den aktuellen Positionen berechnen – zuverlässig auch bei schnellen Sprüngen
    const update = () => {
      frame = 0
      const height = window.innerHeight
      const primaryPassed = primary.every((element) => element.getBoundingClientRect().bottom < 0)
      const endVisible = endAreas.some((element) => {
        const rect = element.getBoundingClientRect()
        return rect.top < height && rect.bottom > 0
      })
      setVisible(primaryPassed && !endVisible)
    }
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener("scroll", schedule, { passive: true })
    window.addEventListener("resize", schedule)
    return () => {
      window.removeEventListener("scroll", schedule)
      window.removeEventListener("resize", schedule)
      cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <nav
      aria-label="Schnellkontakt"
      aria-hidden={!visible}
      inert={!visible}
      className={cn(
        "fixed inset-x-0 bottom-0 z-30 border-t border-line bg-linen px-4 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] shadow-[0_-8px_24px_-16px_rgb(20_25_22/0.35)] md:hidden",
        "transition-transform duration-300 ease-out",
        visible ? "translate-y-0" : "translate-y-full",
      )}
    >
      <div className="grid grid-cols-2 gap-3">
        <a
          href={telHref()}
          className="flex min-h-12 items-center justify-center gap-2 rounded-md border border-ink/25 font-medium"
        >
          <Phone className="size-5" />
          <span>Anrufen</span>
        </a>
        <a
          href={mailtoHref()}
          className="flex min-h-12 items-center justify-center gap-2 rounded-md bg-green font-medium text-linen"
        >
          <Mail className="size-5" />
          <span>
            E-Mail<span className="max-[359px]:hidden"> schreiben</span>
          </span>
        </a>
      </div>
    </nav>
  )
}
