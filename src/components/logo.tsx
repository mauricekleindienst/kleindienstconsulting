import Link from "next/link"
import { cn } from "@/lib/cn"
import { LogoMark } from "./logo-mark"

export function Logo({ className, accent }: { className?: string; accent?: string }) {
  return (
    <Link
      href="/"
      translate="no"
      className={cn("group inline-flex min-w-0 items-center gap-3", className)}
    >
      <LogoMark
        accent={accent}
        className="size-10 shrink-0 transition-transform duration-500 ease-out group-hover:-rotate-12 sm:size-11"
      />
      <span className="flex flex-col leading-none">
        <span className="font-display text-[1.4rem] font-bold">Kleindienst</span>
        <span className="mt-1 text-[0.8rem] text-current/65">Gastro Consulting München</span>
        <span className="sr-only">, zur Startseite</span>
      </span>
    </Link>
  )
}
