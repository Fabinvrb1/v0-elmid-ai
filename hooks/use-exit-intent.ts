"use client"

import { useEffect, useState } from "react"
import { shouldShowNewsletterPopup } from "@/lib/cookies"

interface UseExitIntentOptions {
  enabled?: boolean
  sensitivity?: number // pixels from top to trigger
  delay?: number // delay before enabling detection (ms)
}

/**
 * Hook to detect when user's mouse exits the page from the top
 * Commonly used for exit-intent popups
 */
export function useExitIntent(options: UseExitIntentOptions = {}) {
  const { enabled = true, sensitivity = 50, delay = 1000 } = options

  const [shouldShow, setShouldShow] = useState(false)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    // Check if popup should be shown based on cookies
    if (!shouldShowNewsletterPopup() || !enabled) {
      return
    }

    // Delay before enabling detection (prevent immediate trigger)
    const delayTimer = setTimeout(() => {
      setIsReady(true)
    }, delay)

    return () => clearTimeout(delayTimer)
  }, [enabled, delay])

  useEffect(() => {
    if (!isReady || shouldShow) {
      return
    }

    const handleMouseLeave = (e: MouseEvent) => {
      // Check if mouse is leaving from the top of the page
      const shouldTrigger =
        e.clientY <= sensitivity &&
        e.movementY < 0 && // Moving upward
        !shouldShow

      if (shouldTrigger) {
        setShouldShow(true)
      }
    }

    // Add event listener
    document.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [isReady, shouldShow, sensitivity])

  return shouldShow
}
