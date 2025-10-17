"use client"

import { useCallback } from "react"
import {
  event,
  trackCTAClick,
  trackFormSubmit,
  trackWhatsAppClick,
  trackContactClick,
  trackDownload,
  trackPortfolioView,
} from "@/lib/gtag"

interface TrackEventParams {
  action: string
  category?: string
  label?: string
  value?: number
  [key: string]: any
}

export function useGoogleAnalytics() {
  const trackEvent = useCallback((params: TrackEventParams) => {
    event(params)
  }, [])

  const trackCTA = useCallback((ctaName: string, location: string) => {
    trackCTAClick(ctaName, location)
  }, [])

  const trackForm = useCallback((formName: string, success: boolean) => {
    trackFormSubmit(formName, success)
  }, [])

  const trackWhatsApp = useCallback(() => {
    trackWhatsAppClick()
  }, [])

  const trackContact = useCallback((contactType: "email" | "phone") => {
    trackContactClick(contactType)
  }, [])

  const trackFileDownload = useCallback((fileName: string) => {
    trackDownload(fileName)
  }, [])

  const trackPortfolio = useCallback((projectName: string) => {
    trackPortfolioView(projectName)
  }, [])

  return {
    trackEvent,
    trackCTA,
    trackForm,
    trackWhatsApp,
    trackContact,
    trackFileDownload,
    trackPortfolio,
  }
}
