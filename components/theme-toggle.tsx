'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <button
        className="relative h-10 w-10 rounded-full border border-border bg-card flex items-center justify-center transition-all"
        aria-label="Toggle theme"
      >
        <Sun className="h-[1.2rem] w-[1.2rem] text-foreground" />
      </button>
    )
  }

  const isDark = theme === 'dark'

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="group relative h-10 w-10 rounded-full border border-border bg-card hover:bg-muted flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg dark:hover:shadow-primary/20 overflow-hidden"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {/* Glow effect no dark mode */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/0 to-primary/0 dark:from-primary/10 dark:to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Icons com animação */}
      <div className="relative">
        <Sun
          className={`absolute h-[1.2rem] w-[1.2rem] text-foreground transition-all duration-300 ${
            isDark
              ? 'rotate-90 scale-0 opacity-0'
              : 'rotate-0 scale-100 opacity-100'
          }`}
        />
        <Moon
          className={`h-[1.2rem] w-[1.2rem] text-foreground transition-all duration-300 ${
            isDark
              ? 'rotate-0 scale-100 opacity-100'
              : '-rotate-90 scale-0 opacity-0'
          }`}
        />
      </div>

      {/* Ripple effect sutil */}
      <span className="absolute inset-0 rounded-full opacity-0 group-hover:animate-ping bg-primary/20" />
    </button>
  )
}
