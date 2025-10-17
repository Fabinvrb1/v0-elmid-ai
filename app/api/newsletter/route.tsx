import { type NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"
import { z } from "zod"

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY)

// Validation schema
const newsletterSchema = z.object({
  email: z.string().email("Email inválido"),
})

// Rate limiting (simple in-memory store)
// In production, use Redis or a proper rate limiting service
const rateLimitStore = new Map<string, { count: number; resetAt: number }>()

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const limit = rateLimitStore.get(ip)

  if (!limit || now > limit.resetAt) {
    // Reset or create new limit
    rateLimitStore.set(ip, {
      count: 1,
      resetAt: now + 60 * 60 * 1000, // 1 hour
    })
    return true
  }

  if (limit.count >= 3) {
    // Max 3 requests per hour
    return false
  }

  limit.count++
  return true
}

export async function POST(request: NextRequest) {
  try {
    // Get IP for rate limiting
    const ip = request.headers.get("x-forwarded-for") || "unknown"

    // Check rate limit
    if (!checkRateLimit(ip)) {
      return NextResponse.json({ error: "Muitas tentativas. Tente novamente mais tarde." }, { status: 429 })
    }

    // Parse and validate request body
    const body = await request.json()
    const { email } = newsletterSchema.parse(body)

    // Send welcome email using Resend
    const { data, error } = await resend.emails.send({
      from: process.env.EMAIL_FROM || "Elmid AI <contato@elmid.ai>",
      to: email,
      subject: "Bem-vindo à Newsletter da Elmid AI! 🚀",
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Bem-vindo à Newsletter</title>
          </head>
          <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f9fafb;">
            <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f9fafb; padding: 40px 20px;">
              <tr>
                <td align="center">
                  <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                    <!-- Header -->
                    <tr>
                      <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 20px; text-align: center;">
                        <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700;">
                          Bem-vindo à Elmid AI! 🚀
                        </h1>
                      </td>
                    </tr>
                    
                    <!-- Content -->
                    <tr>
                      <td style="padding: 40px 30px;">
                        <p style="margin: 0 0 20px; color: #374151; font-size: 16px; line-height: 1.6;">
                          Olá!
                        </p>
                        <p style="margin: 0 0 20px; color: #374151; font-size: 16px; line-height: 1.6;">
                          Obrigado por se inscrever na nossa newsletter! Estamos muito felizes em tê-lo(a) conosco.
                        </p>
                        <p style="margin: 0 0 20px; color: #374151; font-size: 16px; line-height: 1.6;">
                          A partir de agora, você receberá:
                        </p>
                        <ul style="margin: 0 0 20px; padding-left: 20px; color: #374151; font-size: 16px; line-height: 1.8;">
                          <li>Conteúdos exclusivos sobre desenvolvimento de software</li>
                          <li>Tendências e novidades em tecnologia e IA</li>
                          <li>Dicas práticas para desenvolvedores</li>
                          <li>Novidades sobre nossos produtos e serviços</li>
                        </ul>
                        <p style="margin: 0 0 30px; color: #374151; font-size: 16px; line-height: 1.6;">
                          Fique atento à sua caixa de entrada!
                        </p>
                        
                        <table width="100%" cellpadding="0" cellspacing="0">
                          <tr>
                            <td align="center">
                              <a href="${process.env.NEXT_PUBLIC_SITE_URL || "https://elmid.ai"}" style="display: inline-block; padding: 14px 32px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #ffffff; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 16px;">
                                Visite nosso site
                              </a>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                      <td style="background-color: #f9fafb; padding: 30px; text-align: center; border-top: 1px solid #e5e7eb;">
                        <p style="margin: 0 0 10px; color: #6b7280; font-size: 14px;">
                          Elmid AI - Desenvolvimento de Software com Inteligência Artificial
                        </p>
                        <p style="margin: 0; color: #9ca3af; font-size: 12px;">
                          Você está recebendo este email porque se inscreveu em nossa newsletter.
                          <br>
                          <a href="#" style="color: #667eea; text-decoration: none;">Cancelar inscrição</a>
                        </p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </body>
        </html>
      `,
    })

    if (error) {
      console.error("Resend error:", error)
      return NextResponse.json({ error: "Erro ao enviar email de boas-vindas" }, { status: 500 })
    }

    // Optionally: Add to your email marketing platform (ConvertKit, Mailchimp, etc.)
    // await addToEmailList(email)

    return NextResponse.json({ success: true, message: "Inscrição realizada com sucesso!" }, { status: 200 })
  } catch (error) {
    console.error("Newsletter API error:", error)

    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Email inválido" }, { status: 400 })
    }

    return NextResponse.json({ error: "Erro ao processar inscrição" }, { status: 500 })
  }
}
