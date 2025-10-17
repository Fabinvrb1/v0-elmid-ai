"use client"

import { motion, useScroll, useSpring } from "framer-motion"

/**
 * ScrollProgress component - Shows reading progress at top of page
 * Displays a fixed bar that fills as user scrolls down
 *
 * @example
 * // Add to layout.tsx
 * <ScrollProgress />
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()

  // Add spring physics for smooth animation
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  return <motion.div className="fixed top-0 left-0 right-0 h-[3px] bg-primary origin-left z-50" style={{ scaleX }} />
}
