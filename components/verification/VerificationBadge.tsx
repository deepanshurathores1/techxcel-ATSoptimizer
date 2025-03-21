import { Shield, ShieldCheck, ShieldAlert, ShieldX } from "lucide-react"
import { cn } from "@/lib/utils"

interface VerificationBadgeProps {
  score: number
  size?: "sm" | "md" | "lg"
  showText?: boolean
  className?: string
}

export function VerificationBadge({ score, size = "md", showText = true, className }: VerificationBadgeProps) {
  let badgeContent
  let badgeColor
  let badgeText

  if (score >= 90) {
    badgeContent = <ShieldCheck className={cn(size === "sm" ? "h-4 w-4" : size === "md" ? "h-5 w-5" : "h-6 w-6")} />
    badgeColor = "bg-green-50 text-green-600 border-green-200"
    badgeText = "Verified"
  } else if (score >= 70) {
    badgeContent = <Shield className={cn(size === "sm" ? "h-4 w-4" : size === "md" ? "h-5 w-5" : "h-6 w-6")} />
    badgeColor = "bg-blue-50 text-blue-600 border-blue-200"
    badgeText = "Verified"
  } else if (score >= 40) {
    badgeContent = <ShieldAlert className={cn(size === "sm" ? "h-4 w-4" : size === "md" ? "h-5 w-5" : "h-6 w-6")} />
    badgeColor = "bg-amber-50 text-amber-600 border-amber-200"
    badgeText = "Partially Verified"
  } else {
    badgeContent = <ShieldX className={cn(size === "sm" ? "h-4 w-4" : size === "md" ? "h-5 w-5" : "h-6 w-6")} />
    badgeColor = "bg-red-50 text-red-600 border-red-200"
    badgeText = "Unverified"
  }

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 px-2 py-1 rounded-md border",
        badgeColor,
        size === "sm" ? "text-xs" : size === "md" ? "text-sm" : "text-base",
        className,
      )}
    >
      {badgeContent}
      {showText && <span>{badgeText}</span>}
    </div>
  )
}

