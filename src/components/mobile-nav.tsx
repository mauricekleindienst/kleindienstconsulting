"use client"

import Link from "next/link"
import { useEffect, useId, useState } from "react"
import { createPortal } from "react-dom"
import { navigation } from "@/content/site"
import { Close, Menu } from "./ui/icons"

export function MobileNav() {
  const [open, setOpen] = useState(false)
  const panelId = useId()

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false)
    }
    document.addEventListener("keydown", onKey)
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", onKey)
      document.body.style.overflow = ""
    }
  }, [open])

  const close = () => setOpen(false)

  return (
    <div className="md:hidden">
      <button
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
              id={panelId}
              className="fixed inset-x-0 top-[calc(4.5rem+env(safe-area-inset-top))] bottom-0 z-50 overflow-y-auto overscroll-contain bg-linen md:hidden"
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
              </nav>
            </div>,
            document.body,
          )
        : null}
    </div>
  )
}
