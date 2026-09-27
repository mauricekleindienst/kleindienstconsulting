import Image from "next/image"
import { site } from "@/content/site"

/** Großes Foto von Mario Kleindienst in der Seitenmitte – erscheint, sobald ein Foto hinterlegt ist. */
export function PhotoBand() {
  const { portrait, name } = site.owner
  if (!portrait) return null

  return (
    <figure className="relative isolate overflow-hidden bg-ink">
      <Image
        src={portrait.src}
        alt={portrait.alt}
        width={portrait.width}
        height={portrait.height}
        sizes="100vw"
        loading="lazy"
        className="aspect-[4/5] w-full object-cover sm:aspect-[16/9] lg:aspect-[21/9]"
        style={{ objectPosition: portrait.focus }}
      />
      <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/85 via-ink/40 to-transparent px-5 pt-24 pb-8 text-center text-linen sm:pb-10">
        <span className="block font-display text-2xl font-bold sm:text-3xl" translate="no">
          {name}
        </span>
        <span className="mt-1 block text-linen/85">Küchenchef und Gastronomieberater aus München</span>
      </figcaption>
    </figure>
  )
}
