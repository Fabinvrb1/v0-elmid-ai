"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

interface FadeInProps {
  children: ReactNode
  /**
   * Delay before animation starts (in seconds)
   * @default 0
   */
  delay?: number
  /**
   * Duration of the animation (in seconds)
   * @default 0.5
   */
  duration?: number
  /**
   * Direction of the slide animation
   * @default "up"
   */
  direction?: "up" | "down" | "left" | "right"
  /**
   * Additional CSS classes
   */
  className?: string
}

/**
 * FadeIn component - Animates children with fade in + slide effect
 * Triggers when element enters viewport
 *
 * @example
 * <FadeIn direction="up" delay={0.2}>
 *   <h1>Hello World</h1>
 * </FadeIn>
 */
export function FadeIn({ children, delay = 0, duration = 0.5, direction = "up", className }: FadeInProps) {
  // Define initial position based on direction
  const directionOffset = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { y: 0, x: 40 },
    right: { y: 0, x: -40 },
  }

  return (
    <motion.div
      initial={{
        opacity: 0,
        ...directionOffset[direction],
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
      }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.4, 0.25, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
