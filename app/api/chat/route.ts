import { streamText } from "ai"

// System message with Elmid context
const systemMessage = `Você é o assistente virtual da Elmid, uma software house especializada em desenvolvimento web, mobile e soluções personalizadas de software.

SOBRE A ELMID:
- Desenvolvemos aplicações web modernas com Next.js, React e Node.js
- Criamos aplicativos mobile nativos e híbridos
- Oferecemos soluções personalizadas de software para empresas
- Trabalhamos com as tecnologias mais modernas do mercado
- Temos uma equipe experiente e comprometida com a qualidade

SERVIÇOS PRINCIPAIS:
1. Desenvolvimento Web (sites, sistemas, e-commerce)
2. Aplicativos Mobile (iOS e Android)
3. Consultoria em Tecnologia
4. Integração de Sistemas
5. Manutenção e Suporte

SEU PAPEL:
- Seja prestativo, profissional e amigável
- Responda perguntas sobre nossos serviços
- Sugira agendar uma reunião para discutir projetos em detalhes
- Colete informações básicas sobre o projeto do cliente
- Forneça informações de contato quando solicitado

CONTATO:
- Email: contato@elmid.ai
- Site: elmid.ai

Mantenha as respostas concisas e objetivas. Se o cliente demonstrar interesse em um projeto, incentive-o a agendar uma reunião ou solicitar um orçamento.`

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()

    // Rate limiting check (basic implementation)
    const userMessages = messages.filter((m: any) => m.role === "user")
    if (userMessages.length > 20) {
      return new Response(
        JSON.stringify({
          error: "Rate limit exceeded. Please contact us directly.",
        }),
        {
          status: 429,
          headers: { "Content-Type": "application/json" },
        },
      )
    }

    const result = streamText({
      model: "openai/gpt-4o-mini",
      system: systemMessage,
      messages,
      temperature: 0.7,
      maxTokens: 500,
    })

    return result.toDataStreamResponse()
  } catch (error) {
    console.error("[v0] Chat API error:", error)
    return new Response(
      JSON.stringify({
        error: "Failed to process chat request",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    )
  }
}
