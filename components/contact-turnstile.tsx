"use client"

import { useEffect, useState } from "react"
import { Turnstile } from "@marsidev/react-turnstile"

export function turnstileSiteKeyConfigured(): boolean {
  return Boolean(process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY)
}

type Props = {
  onSuccess: (token: string) => void
  onExpire?: () => void
}

export function ContactTurnstile({ onSuccess, onExpire }: Props) {
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY
  const [isCompact, setIsCompact] = useState(false)

  useEffect(() => {
    if (typeof window === "undefined") return

    const media = window.matchMedia("(max-width: 380px)")
    const apply = () => setIsCompact(media.matches)
    apply()

    if (typeof media.addEventListener === "function") {
      media.addEventListener("change", apply)
      return () => media.removeEventListener("change", apply)
    }

    media.addListener(apply)
    return () => media.removeListener(apply)
  }, [])

  if (!siteKey) return null

  return (
    <div className="w-full max-w-full overflow-x-auto">
      <div className={`min-h-[65px] flex items-center justify-center ${isCompact ? "min-w-[150px]" : "min-w-[300px]"}`}>
        <Turnstile
          siteKey={siteKey}
          onSuccess={onSuccess}
          onExpire={onExpire}
          options={{ size: isCompact ? "compact" : "normal" }}
        />
      </div>
    </div>
  )
}
