import Link from "next/link"
import type { ComponentProps } from "react"
import { cn } from "@/lib/cn"

const variants = {
  primary: "bg-green text-linen hover:bg-green-hover",
  secondary: "border border-ink/25 text-ink hover:border-ink hover:bg-ink hover:text-linen",
  onDark: "bg-linen text-green hover:bg-brass-light",
  outlineOnDark: "border border-linen/40 text-linen hover:border-linen hover:bg-linen/10",
} as const

type ButtonLinkProps = ComponentProps<typeof Link> & { variant?: keyof typeof variants }

export function ButtonLink({ variant = "primary", className, ...props }: ButtonLinkProps) {
  return (
    <Link
      className={cn(
        "inline-flex min-h-12 items-center justify-center gap-2 rounded-md px-6 font-medium",
        "transition-[background-color,border-color,color] duration-200 ease-out",
        variants[variant],
        className,
      )}
      {...props}
    />
  )
}
