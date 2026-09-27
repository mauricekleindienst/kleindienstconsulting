import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/cn"

const variants = {
  /** Schiefer auf hellem Grund */
  ink: { src: "/brand/mk-logo-ink.png", width: 240, height: 199 },
  /** Leinenweiß auf dunklem Grund */
  linen: { src: "/brand/mk-logo-linen.png", width: 480, height: 397 },
} as const

/** MK-Wappen als Bild (dekorativ – der Name steht daneben als Text). */
export function LogoImage({ variant = "ink", className }: { variant?: keyof typeof variants; className?: string }) {
  const { src, width, height } = variants[variant]
  return <Image src={src} width={width} height={height} alt="" priority className={cn("h-12 w-auto shrink-0 sm:h-14", className)} />
}

export function Logo({
  className,
  variant = "ink",
  href = "/",
}: {
  className?: string
  variant?: keyof typeof variants
  href?: string
}) {
  return (
    <Link href={href} translate="no" className={cn("group inline-flex min-h-11 min-w-0 items-center gap-3", className)}>
      <LogoImage variant={variant} className="transition-transform duration-500 ease-out group-hover:scale-105" />
      <span className="flex flex-col leading-none">
        <span className="font-display text-[1.4rem] font-bold">Kleindienst</span>
        <span className="mt-1 text-[0.8rem] text-current/65">Gastro Consulting München</span>
        {href === "/" ? <span className="sr-only">, zur Startseite</span> : null}
      </span>
    </Link>
  )
}
