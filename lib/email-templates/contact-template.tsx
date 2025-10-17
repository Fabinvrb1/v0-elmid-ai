import type { ContactFormData } from "@/lib/schemas/contact"

const projectTypeLabels = {
  web: "Desenvolvimento Web",
  mobile: "Aplicativo Mobile",
  system: "Sistema Corporativo",
  consulting: "Consultoria",
  other: "Outro",
}

// Template de email para a empresa
export function getCompanyEmailTemplate(data: ContactFormData): string {
  return `
    <!DOCTYPE html>
    <html lang="pt-BR">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Novo Contato - Elmid.ai</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f4f4f5;">
        <table role="presentation" style="width: 100%; border-collapse: collapse;">
          <tr>
            <td align="center" style="padding: 40px 0;">
              <table role="presentation" style="width: 600px; border-collapse: collapse; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                <!-- Header -->
                <tr>
                  <td style="padding: 40px 40px 20px; background: linear-gradient(135deg, #7c3aed 0%, #a855f7 100%); border-radius: 8px 8px 0 0;">
                    <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 600;">
                      Novo Contato Recebido
                    </h1>
                  </td>
                </tr>
                
                <!-- Content -->
                <tr>
                  <td style="padding: 40px;">
                    <p style="margin: 0 0 24px; color: #18181b; font-size: 16px; line-height: 1.5;">
                      Você recebeu uma nova mensagem através do formulário de contato do site.
                    </p>
                    
                    <!-- Contact Details -->
                    <table role="presentation" style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
                      <tr>
                        <td style="padding: 12px; background-color: #f4f4f5; border-radius: 4px;">
                          <strong style="color: #52525b; font-size: 14px;">Nome:</strong>
                          <p style="margin: 4px 0 0; color: #18181b; font-size: 16px;">${data.name}</p>
                        </td>
                      </tr>
                      <tr><td style="height: 8px;"></td></tr>
                      <tr>
                        <td style="padding: 12px; background-color: #f4f4f5; border-radius: 4px;">
                          <strong style="color: #52525b; font-size: 14px;">Email:</strong>
                          <p style="margin: 4px 0 0; color: #18181b; font-size: 16px;">
                            <a href="mailto:${data.email}" style="color: #7c3aed; text-decoration: none;">${data.email}</a>
                          </p>
                        </td>
                      </tr>
                      ${
                        data.phone
                          ? `
                      <tr><td style="height: 8px;"></td></tr>
                      <tr>
                        <td style="padding: 12px; background-color: #f4f4f5; border-radius: 4px;">
                          <strong style="color: #52525b; font-size: 14px;">Telefone:</strong>
                          <p style="margin: 4px 0 0; color: #18181b; font-size: 16px;">${data.phone}</p>
                        </td>
                      </tr>
                      `
                          : ""
                      }
                      ${
                        data.company
                          ? `
                      <tr><td style="height: 8px;"></td></tr>
                      <tr>
                        <td style="padding: 12px; background-color: #f4f4f5; border-radius: 4px;">
                          <strong style="color: #52525b; font-size: 14px;">Empresa:</strong>
                          <p style="margin: 4px 0 0; color: #18181b; font-size: 16px;">${data.company}</p>
                        </td>
                      </tr>
                      `
                          : ""
                      }
                      <tr><td style="height: 8px;"></td></tr>
                      <tr>
                        <td style="padding: 12px; background-color: #f4f4f5; border-radius: 4px;">
                          <strong style="color: #52525b; font-size: 14px;">Tipo de Projeto:</strong>
                          <p style="margin: 4px 0 0; color: #18181b; font-size: 16px;">${projectTypeLabels[data.projectType]}</p>
                        </td>
                      </tr>
                      <tr><td style="height: 8px;"></td></tr>
                      <tr>
                        <td style="padding: 12px; background-color: #f4f4f5; border-radius: 4px;">
                          <strong style="color: #52525b; font-size: 14px;">Mensagem:</strong>
                          <p style="margin: 4px 0 0; color: #18181b; font-size: 16px; white-space: pre-wrap;">${data.message}</p>
                        </td>
                      </tr>
                    </table>
                    
                    <!-- CTA Button -->
                    <table role="presentation" style="width: 100%; border-collapse: collapse;">
                      <tr>
                        <td align="center" style="padding: 20px 0;">
                          <a href="mailto:${data.email}" style="display: inline-block; padding: 14px 32px; background-color: #7c3aed; color: #ffffff; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 16px;">
                            Responder Contato
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                
                <!-- Footer -->
                <tr>
                  <td style="padding: 24px 40px; background-color: #fafafa; border-radius: 0 0 8px 8px; border-top: 1px solid #e4e4e7;">
                    <p style="margin: 0; color: #71717a; font-size: 14px; text-align: center;">
                      Este email foi enviado automaticamente pelo sistema de contato do site Elmid.ai
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `
}

// Template de auto-resposta para o cliente
export function getClientEmailTemplate(name: string): string {
  return `
    <!DOCTYPE html>
    <html lang="pt-BR">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Mensagem Recebida - Elmid.ai</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f4f4f5;">
        <table role="presentation" style="width: 100%; border-collapse: collapse;">
          <tr>
            <td align="center" style="padding: 40px 0;">
              <table role="presentation" style="width: 600px; border-collapse: collapse; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                <!-- Header -->
                <tr>
                  <td style="padding: 40px 40px 20px; background: linear-gradient(135deg, #7c3aed 0%, #a855f7 100%); border-radius: 8px 8px 0 0;">
                    <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 600;">
                      Elmid.ai
                    </h1>
                  </td>
                </tr>
                
                <!-- Content -->
                <tr>
                  <td style="padding: 40px;">
                    <h2 style="margin: 0 0 16px; color: #18181b; font-size: 20px; font-weight: 600;">
                      Olá, ${name}!
                    </h2>
                    
                    <p style="margin: 0 0 16px; color: #18181b; font-size: 16px; line-height: 1.6;">
                      Recebemos sua mensagem e agradecemos pelo contato!
                    </p>
                    
                    <p style="margin: 0 0 16px; color: #18181b; font-size: 16px; line-height: 1.6;">
                      Nossa equipe irá analisar sua solicitação e retornaremos em breve com mais informações sobre como podemos ajudar no seu projeto.
                    </p>
                    
                    <p style="margin: 0 0 24px; color: #18181b; font-size: 16px; line-height: 1.6;">
                      Normalmente respondemos em até 24 horas úteis.
                    </p>
                    
                    <!-- Info Box -->
                    <table role="presentation" style="width: 100%; border-collapse: collapse; margin: 24px 0;">
                      <tr>
                        <td style="padding: 20px; background-color: #f4f4f5; border-left: 4px solid #7c3aed; border-radius: 4px;">
                          <p style="margin: 0; color: #52525b; font-size: 14px; line-height: 1.5;">
                            <strong style="color: #18181b;">Precisa de ajuda urgente?</strong><br>
                            Entre em contato diretamente pelo email: <a href="mailto:contato@elmid.ai" style="color: #7c3aed; text-decoration: none;">contato@elmid.ai</a>
                          </p>
                        </td>
                      </tr>
                    </table>
                    
                    <p style="margin: 24px 0 0; color: #18181b; font-size: 16px; line-height: 1.6;">
                      Atenciosamente,<br>
                      <strong>Equipe Elmid.ai</strong>
                    </p>
                  </td>
                </tr>
                
                <!-- Footer -->
                <tr>
                  <td style="padding: 24px 40px; background-color: #fafafa; border-radius: 0 0 8px 8px; border-top: 1px solid #e4e4e7;">
                    <p style="margin: 0 0 8px; color: #71717a; font-size: 14px; text-align: center;">
                      <strong>Elmid.ai</strong> - Transformando ideias em soluções digitais
                    </p>
                    <p style="margin: 0; color: #71717a; font-size: 12px; text-align: center;">
                      Este é um email automático, por favor não responda.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `
}
