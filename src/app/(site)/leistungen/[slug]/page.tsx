import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ButtonLink } from "@/components/ui/button-link"
import { Container } from "@/components/ui/container"
import { Plus } from "@/components/ui/icons"
import { serviceArea, site } from "@/content/site"
import { serviceBySlug, serviceDetails } from "@/content/services"
import { mailtoHref } from "@/lib/contact"
import { ogImage } from "@/lib/og"
import { jsonLd } from "@/lib/structured-data"

export const dynamicParams = false

export function generateStaticParams() {
  return serviceDetails.map((service) => ({ slug: service.slug }))
}

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const service = serviceBySlug((await params).slug)
  if (!service) return {}
  const url = `/leistungen/${service.slug}`
  return {
    title: { absolute: `${service.seoTitle} | Kleindienst` },
    description: service.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: site.locale,
      siteName: site.name,
      title: service.seoTitle,
      description: service.metaDescription,
      url,
      images: [ogImage],
    },
    twitter: { card: "summary_large_image", images: [ogImage] },
  }
}

export default async function ServicePage({ params }: Props) {
  const service = serviceBySlug((await params).slug)
  if (!service) notFound()

  const others = serviceDetails.filter((other) => other.slug !== service.slug)
  const url = `${site.url}/leistungen/${service.slug}`

  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: service.title,
        serviceType: `Gastronomieberatung: ${service.title}`,
        description: service.metaDescription,
        url,
        provider: { "@id": `${site.url}/#business` },
        areaServed: serviceArea.map((name) => ({ "@type": "Place", name })),
        availableLanguage: "de",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Startseite", item: site.url },
          { "@type": "ListItem", position: 2, name: "Leistungen", item: `${site.url}/#leistungen` },
          { "@type": "ListItem", position: 3, name: service.title, item: url },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: service.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(data) }} />

      <Container className="pt-8 sm:pt-10">
        <nav aria-label="Brotkrumen" className="text-sm text-muted">
          <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <li>
              <Link href="/" className="inline-flex min-h-11 items-center hover:text-ink hover:underline">
                Startseite
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li>
              <Link href="/#leistungen" className="inline-flex min-h-11 items-center hover:text-ink hover:underline">
                Leistungen
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li aria-current="page" className="text-ink">
              {service.title}
            </li>
          </ol>
        </nav>
      </Container>

      <Container className="pt-6 pb-16 sm:pb-20">
        <header className="max-w-3xl">
          <p className="text-lg font-medium text-brass">Gastronomieberatung in München</p>
          <h1 className="mt-4 font-display text-display-lg font-extrabold">{service.h1}</h1>
          <p className="mt-6 max-w-[62ch] text-lg leading-relaxed text-ink-soft sm:text-xl">{service.intro}</p>
          <div data-primary-cta className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={mailtoHref(`Anfrage: ${service.title}`)}>Kostenfreies Erstgespräch</ButtonLink>
            <ButtonLink href="/#kontakt" variant="secondary">
              Alle Kontaktwege
            </ButtonLink>
          </div>
        </header>
      </Container>

      <section aria-labelledby="probleme" className="bg-linen-deep py-16 sm:py-20">
        <Container className="grid gap-10 lg:grid-cols-2 lg:gap-20">
          <div>
            <h2 id="probleme" className="font-display text-3xl font-bold sm:text-4xl">
              Kennen Sie das?
            </h2>
            <ul className="mt-8 space-y-4">
              {service.problems.map((problem) => (
                <li key={problem} className="flex gap-3 text-lg leading-relaxed text-ink-soft">
                  <span aria-hidden className="mt-3 h-px w-4 shrink-0 bg-brass" />
                  {problem}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-display text-3xl font-bold sm:text-4xl">Was Sie davon haben</h2>
            <ul className="mt-8 space-y-4">
              {service.results.map((result) => (
                <li key={result} className="flex gap-3 text-lg leading-relaxed text-ink-soft">
                  <span aria-hidden className="mt-2 grid size-5 shrink-0 place-items-center rounded-full bg-green text-[0.7rem] text-linen">
                    ✓
                  </span>
                  {result}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <section aria-labelledby="vorgehen-leistung" className="py-16 sm:py-20">
        <Container>
          <h2 id="vorgehen-leistung" className="font-display text-3xl font-bold sm:text-4xl">
            So gehe ich vor
          </h2>
          <ol className="mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {service.approach.map((step, index) => (
              <li key={step.title} className="border-t-2 border-green pt-6">
                <span className="font-display text-4xl font-extrabold text-brass tabular-nums">{index + 1}</span>
                <h3 className="mt-3 font-display text-xl font-bold">{step.title}</h3>
                <p className="mt-2 leading-relaxed text-muted">{step.text}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section aria-labelledby="faq-leistung" className="bg-linen-deep py-16 sm:py-20">
        <Container className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <h2 id="faq-leistung" className="font-display text-3xl font-bold sm:text-4xl">
            Häufige Fragen zu {service.title}
          </h2>
          <div className="divide-y divide-ink/15 border-y border-ink/15">
            {service.faqs.map((faq) => (
              <details key={faq.question} className="group">
                <summary className="flex min-h-16 list-none items-center justify-between gap-6 py-5 font-display text-xl font-bold [&::-webkit-details-marker]:hidden">
                  {faq.question}
                  <Plus className="shrink-0 text-brass transition-transform duration-300 group-open:rotate-45" />
                </summary>
                <p className="max-w-[62ch] pb-6 leading-relaxed text-muted">{faq.answer}</p>
              </details>
            ))}
          </div>
        </Container>
      </section>

      <section aria-labelledby="weitere-leistungen" className="py-16 sm:py-20">
        <Container>
          <h2 id="weitere-leistungen" className="font-display text-3xl font-bold sm:text-4xl">
            Weitere Leistungen der Gastronomieberatung
          </h2>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((other) => (
              <li key={other.slug}>
                <Link
                  href={`/leistungen/${other.slug}`}
                  className="flex min-h-16 items-center justify-between gap-4 rounded-md border border-line bg-sheet px-5 py-4 font-display text-lg font-bold transition-colors hover:border-ink/40"
                >
                  {other.title}
                  <span aria-hidden className="text-brass">
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section data-contact-area aria-labelledby="cta-leistung" className="bg-green py-16 text-linen sm:py-20">
        <Container className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <h2 id="cta-leistung" className="font-display text-3xl font-bold sm:text-4xl">
              Sprechen wir über Ihren Betrieb
            </h2>
            <p className="mt-4 text-lg text-linen/80">
              Das Erstgespräch ist kostenfrei. Ich berate Betriebe in München und Umgebung persönlich
              vor Ort.
            </p>
          </div>
          <ButtonLink href={mailtoHref(`Anfrage: ${service.title}`)} variant="onDark" className="shrink-0">
            Erstgespräch anfragen
          </ButtonLink>
        </Container>
      </section>
    </>
  )
}
