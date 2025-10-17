import { z } from "zod"

// Schema de validação para o formulário de contato
export const contactFormSchema = z.object({
  name: z.string().min(3, "Nome deve ter no mínimo 3 caracteres").max(100, "Nome muito longo"),
  email: z.string().email("Email inválido").min(1, "Email é obrigatório"),
  phone: z
    .string()
    .optional()
    .refine(
      (val) => {
        if (!val) return true
        // Formato brasileiro: (XX) XXXXX-XXXX ou (XX) XXXX-XXXX
        const phoneRegex = /^$$?[1-9]{2}$$?\s?9?\d{4}-?\d{4}$/
        return phoneRegex.test(val.replace(/\s/g, ""))
      },
      { message: "Telefone inválido. Use o formato (XX) XXXXX-XXXX" },
    ),
  company: z.string().optional(),
  cargo: z.string().optional(),
  projectType: z.enum(["web", "mobile", "system", "ecommerce", "modernization", "consulting", "ai", "other"], {
    required_error: "Selecione um tipo de projeto",
  }),
  budget: z
    .enum(["up-to-20k", "20k-50k", "50k-100k", "above-100k", "not-sure"], {
      required_error: "Selecione um orçamento estimado",
    })
    .optional(),
  timeline: z
    .enum(["urgent", "short", "medium", "flexible"], {
      required_error: "Selecione um prazo",
    })
    .optional(),
  howFound: z
    .enum(["google", "referral", "linkedin", "instagram", "other"], {
      required_error: "Selecione como conheceu",
    })
    .optional(),
  message: z.string().min(50, "Descreva seu projeto com no mínimo 50 caracteres").max(2000, "Mensagem muito longa"),
  acceptTerms: z.boolean().refine((val) => val === true, {
    message: "Você deve aceitar os termos para continuar",
  }),
})

export type ContactFormData = z.infer<typeof contactFormSchema>
