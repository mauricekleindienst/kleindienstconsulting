import type { Metadata } from "next"
import { Suspense } from "react"
import { GateForm, GateFormFallback } from "@/components/gate-form"
import { Container } from "@/components/ui/container"

// Link-Vorschauen zeigen während der Vorschau-Phase diese Seite – daher die vollen Marken-Metadaten
export const metadata: Metadata = {
  title: { absolute: "Gastronomieberatung München & Umgebung | Kleindienst Gastro Consulting" },
  description:
    "Gastronomieberatung von Ex-Küchenchef Mario Kleindienst: Kalkulation, Speisekarte, Küche und Personal. Die Website befindet sich in Vorbereitung.",
}

export default function ZugangPage() {
  return (
    <Container className="grid place-items-center py-16 sm:py-24">
      <div className="w-full max-w-md">
        <h1 className="font-display text-display-lg font-extrabold">Bald geöffnet</h1>
        <p className="mt-5 text-lg leading-relaxed text-ink-soft">
          Diese Website befindet sich in Vorbereitung. Mit dem Zugangspasswort können Sie sie schon
          jetzt ansehen.
        </p>
        <Suspense fallback={<GateFormFallback />}>
          <GateForm />
        </Suspense>
      </div>
    </Container>
  )
}
