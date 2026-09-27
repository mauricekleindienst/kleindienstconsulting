import Image from "next/image"
import { site } from "@/content/site"
import { Container } from "../ui/container"

/** Foto von Mario Kleindienst mittig auf der Seite – erscheint, sobald ein Foto hinterlegt ist. */
export function PhotoBand() {
  const { portrait, name } = site.owner
  if (!portrait) return null

  return (
    <section aria-label={`Foto von ${name}`} className="bg-linen-deep pt-4 sm:pt-8">
      <Container>
        <figure className="relative isolate mx-auto max-w-5xl overflow-hidden rounded-md bg-ink">
          <Image
            src={portrait.src}
            alt={portrait.alt}
            width={portrait.width}
            height={portrait.height}
            sizes="(min-width: 1100px) 1024px, 100vw"
            loading="lazy"
            className="aspect-[4/5] w-full object-cover sm:aspect-[3/2] lg:aspect-[16/9]"
            style={{ objectPosition: portrait.focus }}
          />
          <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/85 via-ink/45 to-transparent px-5 pt-24 pb-6 text-center text-linen sm:pb-8">
            <span className="block font-display text-2xl font-bold sm:text-3xl" translate="no">
              {name}
            </span>
            <span className="mt-1 block text-linen/90">Küchenchef und Gastronomieberater aus München</span>
          </figcaption>
        </figure>
      </Container>
    </section>
  )
}
