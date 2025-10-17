"use client"

import { useEffect, useRef } from "react"
import CountUp from "react-countup"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

interface CountUpAnimationProps {
  /**
   * The final number to count up to
   */
  end: number
  /**
   * Duration of the count animation (in seconds)
   * @default 2
   */
  duration?: number
  /**
   * Text to append after the number (e.g., "+", "%")
   */
  suffix?: string
  /**
   * Text to prepend before the number (e.g., "R$", "$")
   */
  prefix?: string
  /**
   * Number of decimal places
   * @default 0
   */
  decimals?: number
  /**
   * Additional CSS classes
   */
  className?: string
}

/**
 * CountUpAnimation component - Animates numbers from 0 to target value
 * Triggers when element enters viewport
 *
 * @example
 * <CountUpAnimation end={150} suffix="+" duration={2.5} />
 */
export function CountUpAnimation({
  end,
  duration = 2,
  suffix = "",
  prefix = "",
  decimals = 0,
  className,
}: CountUpAnimationProps) {
  const { ref, isInView } = useScrollAnimation({ threshold: 0.5 })
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (isInView) {
      hasAnimated.current = true
    }
  }, [isInView])

  return (
    <span ref={ref} className={className}>
      {isInView || hasAnimated.current ? (
        <CountUp
          start={0}
          end={end}
          duration={duration}
          suffix={suffix}
          prefix={prefix}
          decimals={decimals}
          separator=","
        />
      ) : (
        `${prefix}0${suffix}`
      )}
    </span>
  )
}
