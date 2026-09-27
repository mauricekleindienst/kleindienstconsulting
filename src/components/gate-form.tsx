"use client"

import { useSearchParams } from "next/navigation"
import { useId } from "react"

/**
 * Passwortformular. Wird ohne JavaScript per normalem POST an /zugang geschickt;
 * die Prüfung übernimmt die Cloudflare Pages Function (functions/_middleware.ts).
 */
export function GateForm() {
  const params = useSearchParams()
  const failed = params.get("fehler") === "1"
  const next = params.get("next") ?? "/"
  return <Form failed={failed} next={next} />
}

/** Serverseitig vorgerenderte Variante (ohne Query-Parameter), bis der Client übernimmt. */
export function GateFormFallback() {
  return <Form failed={false} next="/" />
}

function Form({ failed, next }: { failed: boolean; next: string }) {
  const inputId = useId()
  const errorId = useId()

  return (
    <form method="post" action="/zugang" className="mt-10">
      <input type="hidden" name="next" value={next} />
      <label htmlFor={inputId} className="block font-medium">
        Zugangspasswort
      </label>
      <input
        id={inputId}
        name="password"
        type="password"
        required
        autoComplete="current-password"
        spellCheck={false}
        aria-invalid={failed || undefined}
        aria-describedby={failed ? errorId : undefined}
        className="mt-2 block min-h-12 w-full rounded-md border border-ink/30 bg-sheet px-4 text-base transition-[border-color] focus:border-green aria-invalid:border-[#a3261c]"
      />
      <p id={errorId} role="alert" className="mt-2 min-h-6 text-sm text-[#a3261c]">
        {failed ? "Das Passwort stimmt nicht. Bitte versuchen Sie es erneut." : null}
      </p>
      <button
        type="submit"
        className="mt-2 inline-flex min-h-12 w-full items-center justify-center rounded-md bg-green px-6 font-medium text-linen transition-[background-color] hover:bg-green-hover"
      >
        Website öffnen
      </button>
    </form>
  )
}
