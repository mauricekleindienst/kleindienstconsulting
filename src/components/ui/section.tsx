import type { ComponentProps } from "react"
import { cn } from "@/lib/cn"
import { Container } from "./container"

/**
 * Zusammensetzbare Abschnitts-Bausteine – Komposition statt Boolean-Props:
 *
 *   <Section id="faq" tone="linen">
 *     <SectionHeader>
 *       <SectionTitle>…</SectionTitle>
 *       <SectionLead>…</SectionLead>
 *     </SectionHeader>
 *     …
 *   </Section>
 */

const tones = {
  linen: "bg-linen text-ink",
  deep: "bg-linen-deep text-ink",
  green: "bg-green text-linen",
  ink: "bg-ink text-linen",
} as const

type SectionProps = ComponentProps<"section"> & { tone?: keyof typeof tones }

export function Section({ tone = "linen", className, children, ...props }: SectionProps) {
  return (
    <section
      data-tone={tone}
      className={cn("group/section py-20 sm:py-28", tones[tone], className)}
      {...props}
    >
      <Container>{children}</Container>
    </section>
  )
}

export function SectionHeader({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("max-w-2xl", className)} {...props} />
}

export function SectionTitle({ className, ...props }: ComponentProps<"h2">) {
  return <h2 className={cn("font-display text-display-lg font-bold", className)} {...props} />
}

export function SectionLead({ className, ...props }: ComponentProps<"p">) {
  return (
    <p
      className={cn(
        "mt-6 max-w-[62ch] text-lg leading-relaxed text-muted",
        "group-data-[tone=green]/section:text-linen/80 group-data-[tone=ink]/section:text-linen/75",
        className,
      )}
      {...props}
    />
  )
}
