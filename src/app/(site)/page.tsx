import { About } from "@/components/sections/about"
import { AudiencesAndPress } from "@/components/sections/audiences-press"
import { Contact } from "@/components/sections/contact"
import { Faq } from "@/components/sections/faq"
import { Hero } from "@/components/sections/hero"
import { MenuMatrix } from "@/components/sections/menu-matrix"
import { Process } from "@/components/sections/process"
import { Region } from "@/components/sections/region"
import { Services } from "@/components/sections/services"
import { jsonLd, structuredData } from "@/lib/structured-data"

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(structuredData()) }} />
      <Hero />
      <Services />
      <MenuMatrix />
      <Process />
      <About />
      <AudiencesAndPress />
      <Region />
      <Faq />
      <Contact />
    </>
  )
}
