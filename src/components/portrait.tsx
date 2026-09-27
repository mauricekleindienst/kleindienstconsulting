import Image from "next/image"
import { site } from "@/content/site"
import { LogoMark } from "./logo-mark"

/** Zeigt das Portrait, sobald eines in site.ts hinterlegt ist – sonst die Bildmarke. */
export function Portrait() {
  const { portrait } = site.owner

  return (
    <div className="relative aspect-[4/3] overflow-hidden rounded-md bg-green sm:aspect-[4/5]">
      {portrait ? (
        <Image
          src={portrait.src}
          alt={portrait.alt}
          fill
          sizes="(min-width: 1024px) 400px, 90vw"
          className="object-cover"
        />
      ) : (
        <div className="grid h-full place-items-center text-linen">
          <LogoMark accent="var(--color-brass-light)" className="size-40 opacity-90" />
        </div>
      )}
    </div>
  )
}
