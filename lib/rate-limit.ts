// Sistema simples de rate limiting usando Map em memória
// Para produção, considere usar Redis ou similar

interface RateLimitEntry {
  count: number
  resetTime: number
}

const rateLimitMap = new Map<string, RateLimitEntry>()

// Limpar entradas antigas a cada 1 hora
setInterval(
  () => {
    const now = Date.now()
    for (const [key, entry] of rateLimitMap.entries()) {
      if (now > entry.resetTime) {
        rateLimitMap.delete(key)
      }
    }
  },
  60 * 60 * 1000,
)

export function checkRateLimit(
  identifier: string,
  maxRequests = 3,
  windowMs: number = 60 * 60 * 1000, // 1 hora
): { allowed: boolean; remaining: number; resetTime: number } {
  const now = Date.now()
  const entry = rateLimitMap.get(identifier)

  if (!entry || now > entry.resetTime) {
    // Nova janela de tempo
    const resetTime = now + windowMs
    rateLimitMap.set(identifier, { count: 1, resetTime })
    return { allowed: true, remaining: maxRequests - 1, resetTime }
  }

  if (entry.count >= maxRequests) {
    // Limite excedido
    return { allowed: false, remaining: 0, resetTime: entry.resetTime }
  }

  // Incrementar contador
  entry.count++
  rateLimitMap.set(identifier, entry)
  return { allowed: true, remaining: maxRequests - entry.count, resetTime: entry.resetTime }
}
