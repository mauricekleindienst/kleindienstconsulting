import { MobileActionBar } from "@/components/mobile-action-bar"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"

export default function SiteLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <a
        href="#inhalt"
        className="sr-only z-50 rounded-md bg-ink px-5 py-3 text-linen focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
      >
        Zum Inhalt springen
      </a>
      <SiteHeader />
      <main id="inhalt">{children}</main>
      <SiteFooter />
      <MobileActionBar />
    </>
  )
}
