"use client"

import { useEffect, useRef } from "react"
import { trackScrollDepth, trackTimeOnPage } from "@/lib/gtag"

export function useScrollTracking() {
  const scrollDepthTracked = useRef<Set<number>>(new Set())
  const startTime = useRef<number>(Date.now())
  const timeTracked = useRef<Set<number>>(new Set())

  useEffect(() => {
    const handleScroll = () => {
      const scrollPercentage = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100,
      )

      // Track scroll depth milestones
      const milestones = [25, 50, 75, 100]
      milestones.forEach((milestone) => {
        if (scrollPercentage >= milestone && !scrollDepthTracked.current.has(milestone)) {
          scrollDepthTracked.current.add(milestone)
          trackScrollDepth(milestone)
        }
      })
    }

    const handleTimeOnPage = () => {
      const timeSpent = Math.floor((Date.now() - startTime.current) / 1000)
      const timeMilestones = [30, 60, 180] // 30s, 1min, 3min

      timeMilestones.forEach((milestone) => {
        if (timeSpent >= milestone && !timeTracked.current.has(milestone)) {
          timeTracked.current.add(milestone)
          trackTimeOnPage(milestone)
        }
      })
    }

    // Set up scroll listener
    window.addEventListener("scroll", handleScroll, { passive: true })

    // Set up time tracking intervals
    const timeInterval = setInterval(handleTimeOnPage, 10000) // Check every 10 seconds

    return () => {
      window.removeEventListener("scroll", handleScroll)
      clearInterval(timeInterval)
    }
  }, [])
}
