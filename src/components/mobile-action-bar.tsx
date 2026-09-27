import { mailtoHref, telHref } from "@/lib/contact"
import { Mail, Phone } from "./ui/icons"

/** Feste Aktionsleiste auf dem Smartphone: Anrufen und E-Mail mit dem Daumen erreichbar. */
export function MobileActionBar() {
  return (
    <nav
      aria-label="Schnellkontakt"
      className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-linen/95 px-4 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] backdrop-blur-md md:hidden"
    >
      <div className="grid grid-cols-2 gap-3">
        <a
          href={telHref()}
          className="flex min-h-12 items-center justify-center gap-2 rounded-md border border-ink/25 font-medium"
        >
          <Phone className="size-5" />
          Anrufen
        </a>
        <a
          href={mailtoHref()}
          className="flex min-h-12 items-center justify-center gap-2 rounded-md bg-green font-medium text-linen"
        >
          <Mail className="size-5" />
          E-Mail<span className="max-[359px]:hidden">&nbsp;schreiben</span>
        </a>
      </div>
    </nav>
  )
}
