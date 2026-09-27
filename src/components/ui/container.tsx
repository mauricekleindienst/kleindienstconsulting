import type { ComponentProps } from "react"
import { cn } from "@/lib/cn"

export function Container({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-6xl",
        // Seitenabstand – im iPhone-Querformat mindestens so breit wie Notch/Dynamic Island
        "pr-[max(1.25rem,env(safe-area-inset-right))] pl-[max(1.25rem,env(safe-area-inset-left))]",
        "sm:pr-[max(2rem,env(safe-area-inset-right))] sm:pl-[max(2rem,env(safe-area-inset-left))]",
        className,
      )}
      {...props}
    />
  )
}
