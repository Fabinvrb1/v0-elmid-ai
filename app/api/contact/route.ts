import { type NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"
import { contactFormSchema } from "@/lib/schemas/contact"
import { checkRateLimit } from "@/lib/rate-limit"
import { getCompanyEmailTemplate, getClientEmailTemplate } from "@/lib/email-templates/contact-template"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    // Obter IP do cliente para rate limiting
    const ip = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown"

    // Verificar rate limit (máximo 3 envios por hora por IP)
    const rateLimit = checkRateLimit(ip, 3, 60 * 60 * 1000)

    if (!rateLimit.allowed) {
      const resetDate = new Date(rateLimit.resetTime)
      return NextResponse.json(
        {
          success: false,
          error: `Limite de envios excedido. Tente novamente após ${resetDate.toLocaleTimeString("pt-BR")}.`,
        },
        { status: 429 },
      )
    }

    // Parse e validação do body
    const body = await request.json()
    const validationResult = contactFormSchema.safeParse(body)

    if (!validationResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Dados inválidos",
          details: validationResult.error.flatten().fieldErrors,
        },
        { status: 400 },
      )
    }

    const data = validationResult.data

    // Enviar email para a empresa
    const companyEmailResult = await resend.emails.send({
      from: process.env.EMAIL_FROM || "contato@elmid.ai",
      to: process.env.EMAIL_TO || "contato@elmid.ai",
      subject: `Novo Contato: ${data.name} - ${data.projectType}`,
      html: getCompanyEmailTemplate(data),
    })

    if (companyEmailResult.error) {
      console.error("[v0] Erro ao enviar email para empresa:", companyEmailResult.error)
      throw new Error("Falha ao enviar email para empresa")
    }

    // Enviar auto-resposta para o cliente
    const clientEmailResult = await resend.emails.send({
      from: process.env.EMAIL_FROM || "contato@elmid.ai",
      to: data.email,
      subject: "Recebemos sua mensagem - Elmid.ai",
      html: getClientEmailTemplate(data.name),
    })

    if (clientEmailResult.error) {
      console.error("[v0] Erro ao enviar auto-resposta:", clientEmailResult.error)
      // Não falhar a requisição se apenas a auto-resposta falhar
    }

    return NextResponse.json(
      {
        success: true,
        message: "Mensagem enviada com sucesso! Entraremos em contato em breve.",
        remaining: rateLimit.remaining,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("[v0] Erro no endpoint de contato:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Erro ao processar sua solicitação. Tente novamente mais tarde.",
      },
      { status: 500 },
    )
  }
}
