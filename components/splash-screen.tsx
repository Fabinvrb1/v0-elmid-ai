"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"
import Image from "next/image"

export function SplashScreen() {
  const [isLoading, setIsLoading] = useState(true)
  const [particles, setParticles] = useState<Array<{ x: number; y: number; left: string; top: string }>>([])

  useEffect(() => {
    // Generate particle positions only on client
    setParticles(
      [...Array(6)].map(() => ({
        x: Math.random() * 200 - 100,
        y: Math.random() * 200 - 100,
        left: `${50 + Math.random() * 10 - 5}%`,
        top: `${50 + Math.random() * 10 - 5}%`,
      }))
    )

    // Duração total da animação: 2.5 segundos
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-background via-background to-primary/5"
        >
          {/* Animated background circles */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 2, opacity: 0.1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="h-[600px] w-[600px] rounded-full bg-primary/20 blur-3xl" />
          </motion.div>

          {/* Logo container */}
          <div className="relative z-10 flex flex-col items-center gap-8">
            {/* Logo with sophisticated animations */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                ease: [0.34, 1.56, 0.64, 1], // Custom spring-like easing
                delay: 0.2,
              }}
              className="relative"
            >
              {/* Glow effect behind logo */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.5, 0] }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
                className="absolute inset-0 blur-2xl bg-primary/30 rounded-full scale-150"
              />

              {/* Logo image */}
              <motion.div
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                  delay: 1,
                }}
              >
                <Image
                  src="/images/elmid-logo.png"
                  alt="Elmid AI"
                  width={320}
                  height={80}
                  priority
                  className="relative z-10"
                />
              </motion.div>
            </motion.div>

            {/* Loading indicator */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="flex flex-col items-center gap-4"
            >
              {/* Animated dots */}
              <div className="flex gap-2">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0.3 }}
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{
                      duration: 1.5,
                      repeat: Number.POSITIVE_INFINITY,
                      delay: i * 0.2,
                      ease: "easeInOut",
                    }}
                    className="h-2 w-2 rounded-full bg-primary"
                  />
                ))}
              </div>

              {/* Progress bar */}
              <div className="w-48 h-1 bg-muted rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 2.3, ease: "easeInOut" }}
                  className="h-full bg-gradient-to-r from-primary via-primary/80 to-primary rounded-full"
                />
              </div>

              {/* Loading text */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="text-sm text-muted-foreground font-medium"
              >
                Carregando experiência...
              </motion.p>
            </motion.div>
          </div>

          {/* Particle effects */}
          {particles.map((particle, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 0.6, 0],
                scale: [0, 1, 0],
                x: [0, particle.x],
                y: [0, particle.y],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.3,
                ease: "easeOut",
              }}
              className="absolute h-2 w-2 rounded-full bg-primary/40"
              style={{
                left: particle.left,
                top: particle.top,
              }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
