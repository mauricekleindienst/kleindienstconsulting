"use client"

import Link from "next/link"
import { useEffect, useId, useRef, useState } from "react"
import { createPortal } from "react-dom"
import { navigation, site } from "@/content/site"
import { Close, LinkedIn, Menu } from "./ui/icons"

/** Bereiche hinter dem geöffneten Menü – werden für Tastatur und Screenreader gesperrt. */
const BACKGROUND = "main, footer, nav[aria-label='Schnellkontakt']"

export function MobileNav() {
  const [open, setOpen] = useState(false)
  const panelId = useId()
  const toggleRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return

    const background = document.querySelectorAll<HTMLElement>(BACKGROUND)
    background.forEach((el) => (el.inert = true))
    document.body.style.overflow = "hidden"
    panelRef.current?.querySelector("a")?.focus()

    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return
      setOpen(false)
      toggleRef.current?.focus()
    }
    // Beim Wechsel auf Desktop-Breite schließen, sonst bliebe das Scrollen gesperrt
    const desktop = window.matchMedia("(min-width: 64rem)")
    const onResize = () => desktop.matches && setOpen(false)

    document.addEventListener("keydown", onKey)
    desktop.addEventListener("change", onResize)
    return () => {
      background.forEach((el) => (el.inert = false))
      document.body.style.overflow = ""
      document.removeEventListener("keydown", onKey)
      desktop.removeEventListener("change", onResize)
    }
  }, [open])

  const close = () => setOpen(false)

  return (
    <div className="lg:hidden">
      <button
        ref={toggleRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? "Menü schließen" : "Menü öffnen"}
        onClick={() => setOpen((value) => !value)}
        className="grid size-11 place-items-center rounded-md border border-ink/20 transition-colors hover:border-ink"
      >
        {open ? <Close /> : <Menu />}
      </button>

      {/* Portal: Der Header nutzt backdrop-filter, der fixed-Kinder sonst einschließen würde */}
      {open
        ? createPortal(
            <div
              ref={panelRef}
              id={panelId}
              className="fixed inset-x-0 top-[calc(4.5rem+env(safe-area-inset-top))] bottom-0 z-50 overflow-y-auto overscroll-contain bg-linen lg:hidden"
            >
              <nav
                aria-label="Mobile Navigation"
                className="px-5 pt-4 pb-[calc(2.5rem+env(safe-area-inset-bottom))]"
              >
                <ul className="divide-y divide-line border-b border-line">
                  {navigation.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={close}
                        className="flex min-h-16 items-center font-display text-3xl font-bold"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/#kontakt"
                  onClick={close}
                  className="mt-8 flex min-h-14 items-center justify-center rounded-md bg-green font-medium text-linen"
                >
                  Erstgespräch vereinbaren
                </Link>
                <a
                  href={site.owner.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 flex min-h-14 items-center justify-center gap-2 rounded-md border border-ink/25 font-medium"
                >
                  <LinkedIn className="size-5" />
                  LinkedIn
                  <span className="sr-only">(öffnet in neuem Tab)</span>
                </a>
              </nav>
            </div>,
            document.body,
          )
        : null}
    </div>
  )
}
