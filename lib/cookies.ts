import Cookies from "js-cookie"

// Cookie names
export const COOKIE_NAMES = {
  NEWSLETTER_POPUP_CLOSED: "newsletter_popup_closed",
  NEWSLETTER_SUBSCRIBED: "newsletter_subscribed",
} as const

// Cookie options
const COOKIE_OPTIONS = {
  expires: 7, // 7 days
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
}

/**
 * Set a cookie with default options
 */
export function setCookie(name: string, value: string, days = 7) {
  Cookies.set(name, value, {
    ...COOKIE_OPTIONS,
    expires: days,
  })
}

/**
 * Get a cookie value
 */
export function getCookie(name: string): string | undefined {
  return Cookies.get(name)
}

/**
 * Remove a cookie
 */
export function removeCookie(name: string) {
  Cookies.remove(name)
}

/**
 * Check if newsletter popup should be shown
 */
export function shouldShowNewsletterPopup(): boolean {
  const closed = getCookie(COOKIE_NAMES.NEWSLETTER_POPUP_CLOSED)
  const subscribed = getCookie(COOKIE_NAMES.NEWSLETTER_SUBSCRIBED)

  // Don't show if user closed it or already subscribed
  return !closed && !subscribed
}

/**
 * Mark newsletter popup as closed
 */
export function markNewsletterPopupClosed() {
  setCookie(COOKIE_NAMES.NEWSLETTER_POPUP_CLOSED, "true", 7)
}

/**
 * Mark user as subscribed to newsletter
 */
export function markNewsletterSubscribed() {
  setCookie(COOKIE_NAMES.NEWSLETTER_SUBSCRIBED, "true", 365) // 1 year
}
