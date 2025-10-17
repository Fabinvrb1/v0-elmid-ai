"use client"

import { useInView } from "framer-motion"
import { useRef } from "react"

interface UseScrollAnimationOptions {
  /**
   * Percentage of element that must be visible to trigger animation (0-1)
   * @default 0.1
   */
  threshold?: number
  /**
   * Whether to trigger animation only once
   * @default true
   */
  triggerOnce?: boolean
  /**
   * Margin around the viewport for triggering
   * @default "0px"
   */
  margin?: string
}

/**
 * Custom hook for scroll-based animations
 * Returns a ref to attach to the element and whether it's in view
 *
 * @example
 * const { ref, isInView } = useScrollAnimation({ threshold: 0.2 })
 * return <div ref={ref}>{isInView && "I'm visible!"}</div>
 */
export function useScrollAnimation(options: UseScrollAnimationOptions = {}) {
  const { threshold = 0.1, triggerOnce = true, margin = "0px" } = options

  const ref = useRef(null)
  const isInView = useInView(ref, {
    once: triggerOnce,
    amount: threshold,
    margin,
  })

  return { ref, isInView }
}
