"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

interface StaggerContainerProps {
  children: ReactNode
  /**
   * Delay between each child animation (in seconds)
   * @default 0.1
   */
  staggerDelay?: number
  /**
   * Additional CSS classes
   */
  className?: string
}

/**
 * StaggerContainer component - Animates children in sequence
 * Each child appears with a stagger delay
 *
 * @example
 * <StaggerContainer staggerDelay={0.15}>
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 *   <div>Item 3</div>
 * </StaggerContainer>
 */
export function StaggerContainer({ children, staggerDelay = 0.1, className }: StaggerContainerProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={{
        visible: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/**
 * StaggerItem component - Individual item to be used inside StaggerContainer
 * Automatically animates when parent container is in view
 */
export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.5,
            ease: [0.25, 0.4, 0.25, 1],
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
