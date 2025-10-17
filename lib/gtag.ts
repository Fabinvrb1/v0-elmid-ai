// Google Analytics helper functions
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID || ""

// Check if GA is enabled (only in production with valid ID)
export const isGAEnabled = (): boolean => {
  return process.env.NODE_ENV === "production" && !!GA_TRACKING_ID
}

// Page view tracking
export const pageview = (url: string): void => {
  if (!isGAEnabled()) return

  window.gtag("config", GA_TRACKING_ID, {
    page_path: url,
  })
}

// Event tracking
interface EventParams {
  action: string
  category?: string
  label?: string
  value?: number
  [key: string]: any
}

export const event = ({ action, category, label, value, ...params }: EventParams): void => {
  if (!isGAEnabled()) return

  window.gtag("event", action, {
    event_category: category,
    event_label: label,
    value: value,
    ...params,
  })
}

// Predefined event helpers
export const trackCTAClick = (ctaName: string, location: string): void => {
  event({
    action: "cta_click",
    category: "engagement",
    label: ctaName,
    location: location,
  })
}

export const trackFormSubmit = (formName: string, success: boolean): void => {
  event({
    action: success ? "form_submit_success" : "form_submit_error",
    category: "conversion",
    label: formName,
  })
}

export const trackWhatsAppClick = (): void => {
  event({
    action: "whatsapp_click",
    category: "contact",
    label: "WhatsApp Button",
  })
}

export const trackContactClick = (contactType: "email" | "phone"): void => {
  event({
    action: "contact_click",
    category: "contact",
    label: contactType,
  })
}

export const trackScrollDepth = (depth: number): void => {
  event({
    action: "scroll_depth",
    category: "engagement",
    label: `${depth}%`,
    value: depth,
  })
}

export const trackTimeOnPage = (seconds: number): void => {
  event({
    action: "time_on_page",
    category: "engagement",
    label: `${seconds}s`,
    value: seconds,
  })
}

export const trackDownload = (fileName: string): void => {
  event({
    action: "file_download",
    category: "engagement",
    label: fileName,
  })
}

export const trackPortfolioView = (projectName: string): void => {
  event({
    action: "portfolio_view",
    category: "engagement",
    label: projectName,
  })
}
