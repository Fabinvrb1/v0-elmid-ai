"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { contactFormSchema, type ContactFormData } from "@/lib/schemas/contact"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  ArrowRight,
  ArrowLeft,
  Check,
  Monitor,
  Smartphone,
  Database,
  Brain,
  ShoppingCart,
  RefreshCw,
  Briefcase,
  HelpCircle
} from "lucide-react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

const TOTAL_STEPS = 5

const projectTypeOptions = [
  { value: "web", label: "Desenvolvimento Web", icon: Monitor, description: "Sites e aplicações web" },
  { value: "mobile", label: "Aplicativo Mobile", icon: Smartphone, description: "Apps iOS e Android" },
  { value: "system", label: "Sistema Personalizado", icon: Database, description: "Soluções corporativas" },
  { value: "ai", label: "Inteligência Artificial", icon: Brain, description: "IA e Machine Learning" },
  { value: "ecommerce", label: "E-commerce", icon: ShoppingCart, description: "Loja virtual completa" },
  { value: "modernization", label: "Modernização", icon: RefreshCw, description: "Atualização de sistemas" },
  { value: "consulting", label: "Consultoria Tech", icon: Briefcase, description: "Assessoria técnica" },
  { value: "other", label: "Outro", icon: HelpCircle, description: "Conte-nos sua necessidade" },
]

export function MultiStepContactForm() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    trigger,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    mode: "onChange",
  })

  const projectType = watch("projectType")
  const name = watch("name")
  const email = watch("email")

  const nextStep = async () => {
    let isValid = false

    // Validate current step before proceeding
    switch (currentStep) {
      case 1:
        isValid = await trigger("projectType")
        break
      case 2:
        isValid = await trigger(["name", "email"])
        break
      case 3:
        isValid = true // Optional fields
        break
      case 4:
        isValid = await trigger("message")
        break
      case 5:
        isValid = await trigger("acceptTerms")
        break
      default:
        isValid = true
    }

    if (isValid && currentStep < TOTAL_STEPS) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || "Erro ao enviar mensagem")
      }

      toast.success("Mensagem enviada com sucesso!", {
        description: "Redirecionando...",
        duration: 3000,
      })

      setTimeout(() => {
        router.push("/contato/obrigado")
      }, 2000)
    } catch (error) {
      console.error("[v0] Erro ao enviar formulário:", error)
      toast.error("Erro ao enviar mensagem", {
        description: error instanceof Error ? error.message : "Tente novamente mais tarde.",
        duration: 5000,
      })
      setIsSubmitting(false)
    }
  }

  const progress = (currentStep / TOTAL_STEPS) * 100

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-muted-foreground">
            Etapa {currentStep} de {TOTAL_STEPS}
          </span>
          <span className="text-sm font-medium text-primary">{Math.round(progress)}%</span>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-primary to-accent"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          />
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <AnimatePresence mode="wait">
          {/* Step 1: Project Type */}
          {currentStep === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-foreground mb-2">
                  Que tipo de projeto você precisa?
                </h2>
                <p className="text-muted-foreground">
                  Escolha a opção que melhor descreve seu projeto
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {projectTypeOptions.map((option) => {
                  const Icon = option.icon
                  return (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => {
                        setValue("projectType", option.value as any)
                        setTimeout(nextStep, 300)
                      }}
                      className={`p-6 rounded-xl border-2 transition-all text-left hover:shadow-lg hover:scale-105 ${
                        projectType === option.value
                          ? "border-primary bg-primary/5"
                          : "border-border bg-card hover:border-primary/50"
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <div className={`p-3 rounded-lg ${
                          projectType === option.value ? "bg-primary/10" : "bg-muted"
                        }`}>
                          <Icon className={`w-6 h-6 ${
                            projectType === option.value ? "text-primary" : "text-muted-foreground"
                          }`} />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-foreground mb-1">{option.label}</h3>
                          <p className="text-sm text-muted-foreground">{option.description}</p>
                        </div>
                        {projectType === option.value && (
                          <Check className="w-5 h-5 text-primary flex-shrink-0" />
                        )}
                      </div>
                    </button>
                  )
                })}
              </div>
              {errors.projectType && (
                <p className="text-sm text-destructive text-center">{errors.projectType.message}</p>
              )}
            </motion.div>
          )}

          {/* Step 2: Personal Info */}
          {currentStep === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-foreground mb-2">
                  Como podemos te chamar?
                </h2>
                <p className="text-muted-foreground">
                  Precisamos de algumas informações básicas
                </p>
              </div>

              <div className="space-y-6 max-w-md mx-auto">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-lg">
                    Seu nome completo <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="name"
                    {...register("name")}
                    placeholder="João Silva"
                    className="h-14 text-lg"
                    autoFocus
                  />
                  {errors.name && (
                    <p className="text-sm text-destructive">{errors.name.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-lg">
                    Seu melhor e-mail <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    {...register("email")}
                    placeholder="joao@empresa.com"
                    className="h-14 text-lg"
                  />
                  {errors.email && (
                    <p className="text-sm text-destructive">{errors.email.message}</p>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 3: Project Details */}
          {currentStep === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-foreground mb-2">
                  Sobre o projeto
                </h2>
                <p className="text-muted-foreground">
                  Isso nos ajuda a entender melhor suas necessidades (opcional)
                </p>
              </div>

              <div className="space-y-6 max-w-md mx-auto">
                <div className="space-y-2">
                  <Label htmlFor="budget" className="text-lg">
                    Orçamento estimado
                  </Label>
                  <select
                    id="budget"
                    {...register("budget")}
                    className="h-14 text-lg w-full rounded-md border border-input bg-background px-3 py-2"
                  >
                    <option value="">Selecione uma faixa</option>
                    <option value="up-to-20k">Até R$ 20.000</option>
                    <option value="20k-50k">R$ 20.000 - R$ 50.000</option>
                    <option value="50k-100k">R$ 50.000 - R$ 100.000</option>
                    <option value="above-100k">Acima de R$ 100.000</option>
                    <option value="not-sure">Não sei ainda</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="timeline" className="text-lg">
                    Prazo desejado
                  </Label>
                  <select
                    id="timeline"
                    {...register("timeline")}
                    className="h-14 text-lg w-full rounded-md border border-input bg-background px-3 py-2"
                  >
                    <option value="">Selecione o prazo</option>
                    <option value="urgent">Urgente (até 1 mês)</option>
                    <option value="short">Curto (2-3 meses)</option>
                    <option value="medium">Médio (4-6 meses)</option>
                    <option value="flexible">Flexível</option>
                  </select>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 4: Project Description */}
          {currentStep === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-foreground mb-2">
                  Conte-nos mais sobre seu projeto
                </h2>
                <p className="text-muted-foreground">
                  Quanto mais detalhes, melhor poderemos ajudar
                </p>
              </div>

              <div className="space-y-6 max-w-2xl mx-auto">
                <div className="space-y-2">
                  <Label htmlFor="message" className="text-lg">
                    Descrição do projeto <span className="text-destructive">*</span>
                  </Label>
                  <Textarea
                    id="message"
                    {...register("message")}
                    placeholder="Ex: Preciso de um site para minha empresa de consultoria. Gostaria que tivesse uma área de blog, formulário de contato e integração com WhatsApp..."
                    className="min-h-[200px] text-lg resize-none"
                    autoFocus
                  />
                  {errors.message && (
                    <p className="text-sm text-destructive">{errors.message.message}</p>
                  )}
                  <p className="text-sm text-muted-foreground">
                    Mínimo de 50 caracteres
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 5: Additional Contact Info */}
          {currentStep === 5 && (
            <motion.div
              key="step5"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-foreground mb-2">
                  Últimas informações
                </h2>
                <p className="text-muted-foreground">
                  Informações adicionais para entrarmos em contato (opcional)
                </p>
              </div>

              <div className="space-y-6 max-w-md mx-auto">
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-lg">
                    Telefone/WhatsApp
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    {...register("phone")}
                    placeholder="(11) 94818-2061"
                    className="h-14 text-lg"
                  />
                  {errors.phone && (
                    <p className="text-sm text-destructive">{errors.phone.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company" className="text-lg">
                    Empresa
                  </Label>
                  <Input
                    id="company"
                    {...register("company")}
                    placeholder="Nome da sua empresa"
                    className="h-14 text-lg"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="howFound" className="text-lg">
                    Como conheceu a elmid.ai?
                  </Label>
                  <select
                    id="howFound"
                    {...register("howFound")}
                    className="h-14 text-lg w-full rounded-md border border-input bg-background px-3 py-2"
                  >
                    <option value="">Selecione uma opção</option>
                    <option value="google">Google</option>
                    <option value="referral">Indicação</option>
                    <option value="linkedin">LinkedIn</option>
                    <option value="instagram">Instagram</option>
                    <option value="other">Outro</option>
                  </select>
                </div>

                <div className="flex items-start gap-3 pt-4">
                  <input
                    type="checkbox"
                    id="acceptTerms"
                    {...register("acceptTerms")}
                    className="mt-1"
                  />
                  <Label htmlFor="acceptTerms" className="text-sm cursor-pointer leading-relaxed">
                    Aceito receber comunicações da elmid.ai e concordo com a{" "}
                    <a href="/privacy" className="text-primary hover:underline">
                      Política de Privacidade
                    </a>{" "}
                    <span className="text-destructive">*</span>
                  </Label>
                </div>
                {errors.acceptTerms && (
                  <p className="text-sm text-destructive">{errors.acceptTerms.message}</p>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between mt-12 gap-4">
          {currentStep > 1 ? (
            <Button
              type="button"
              variant="outline"
              size="lg"
              onClick={prevStep}
              className="w-32"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>
          ) : (
            <div className="w-32" />
          )}

          {currentStep < TOTAL_STEPS ? (
            <Button
              type="button"
              size="lg"
              onClick={nextStep}
              className="w-32"
            >
              Próximo
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button
              type="submit"
              size="lg"
              disabled={isSubmitting}
              className="w-32"
            >
              {isSubmitting ? "Enviando..." : "Enviar"}
            </Button>
          )}
        </div>
      </form>
    </div>
  )
}
