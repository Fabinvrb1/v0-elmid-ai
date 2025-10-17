"use client"

import type React from "react"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { Loader2, Send, CheckCircle2 } from "lucide-react"
import { contactFormSchema, type ContactFormData } from "@/lib/schemas/contact"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { useRouter } from "next/navigation"

export function EnhancedContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    watch,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  })

  const projectType = watch("projectType")
  const budget = watch("budget")
  const timeline = watch("timeline")
  const howFound = watch("howFound")
  const acceptTerms = watch("acceptTerms")

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)
    setIsSuccess(false)

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

      // Sucesso
      setIsSuccess(true)
      toast.success("Mensagem enviada com sucesso!", {
        description: "Redirecionando para página de confirmação...",
        duration: 3000,
      })

      // Redirect para página de obrigado
      setTimeout(() => {
        router.push("/contato/obrigado")
      }, 2000)
    } catch (error) {
      console.error("[v0] Erro ao enviar formulário:", error)
      toast.error("Erro ao enviar mensagem", {
        description: error instanceof Error ? error.message : "Tente novamente mais tarde.",
        duration: 5000,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" id="contact-form">
      {/* Nome Completo */}
      <div className="space-y-2">
        <Label htmlFor="name" className="text-foreground">
          Nome Completo <span className="text-destructive">*</span>
        </Label>
        <Input
          id="name"
          type="text"
          placeholder="Seu nome completo"
          className="bg-background border-border text-foreground"
          {...register("name")}
          disabled={isSubmitting}
        />
        {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
      </div>

      {/* Email e Telefone - Grid 2 colunas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-foreground">
            Email Profissional <span className="text-destructive">*</span>
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="seu@email.com"
            className="bg-background border-border text-foreground"
            {...register("email")}
            disabled={isSubmitting}
          />
          {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone" className="text-foreground">
            Telefone/WhatsApp
          </Label>
          <Input
            id="phone"
            type="tel"
            placeholder="(11) 94818-2061"
            className="bg-background border-border text-foreground"
            {...register("phone")}
            disabled={isSubmitting}
          />
          {errors.phone && <p className="text-sm text-destructive">{errors.phone.message}</p>}
        </div>
      </div>

      {/* Empresa e Cargo - Grid 2 colunas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="company" className="text-foreground">
            Empresa
          </Label>
          <Input
            id="company"
            type="text"
            placeholder="Nome da empresa"
            className="bg-background border-border text-foreground"
            {...register("company")}
            disabled={isSubmitting}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="cargo" className="text-foreground">
            Cargo
          </Label>
          <Input
            id="cargo"
            type="text"
            placeholder="Seu cargo"
            className="bg-background border-border text-foreground"
            {...register("cargo")}
            disabled={isSubmitting}
          />
        </div>
      </div>

      {/* Tipo de Projeto */}
      <div className="space-y-2">
        <Label htmlFor="projectType" className="text-foreground">
          Tipo de Projeto <span className="text-destructive">*</span>
        </Label>
        <Select
          value={projectType}
          onValueChange={(value) => setValue("projectType", value as ContactFormData["projectType"])}
          disabled={isSubmitting}
        >
          <SelectTrigger className="bg-background border-border text-foreground">
            <SelectValue placeholder="Selecione o tipo de projeto" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="web">Desenvolvimento Web</SelectItem>
            <SelectItem value="mobile">Aplicativo Mobile</SelectItem>
            <SelectItem value="system">Sistema Personalizado</SelectItem>
            <SelectItem value="ecommerce">E-commerce</SelectItem>
            <SelectItem value="modernization">Modernização de Sistema</SelectItem>
            <SelectItem value="consulting">Consultoria Tech</SelectItem>
            <SelectItem value="ai">Inteligência Artificial</SelectItem>
            <SelectItem value="other">Outro</SelectItem>
          </SelectContent>
        </Select>
        {errors.projectType && <p className="text-sm text-destructive">{errors.projectType.message}</p>}
      </div>

      {/* Orçamento e Prazo - Grid 2 colunas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="budget" className="text-foreground">
            Orçamento Estimado
          </Label>
          <Select
            value={budget}
            onValueChange={(value) => setValue("budget", value as ContactFormData["budget"])}
            disabled={isSubmitting}
          >
            <SelectTrigger className="bg-background border-border text-foreground">
              <SelectValue placeholder="Selecione o orçamento" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="up-to-20k">Até R$ 20.000</SelectItem>
              <SelectItem value="20k-50k">R$ 20.000 - R$ 50.000</SelectItem>
              <SelectItem value="50k-100k">R$ 50.000 - R$ 100.000</SelectItem>
              <SelectItem value="above-100k">Acima de R$ 100.000</SelectItem>
              <SelectItem value="not-sure">Não sei ainda</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="timeline" className="text-foreground">
            Prazo Desejado
          </Label>
          <Select
            value={timeline}
            onValueChange={(value) => setValue("timeline", value as ContactFormData["timeline"])}
            disabled={isSubmitting}
          >
            <SelectTrigger className="bg-background border-border text-foreground">
              <SelectValue placeholder="Selecione o prazo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="urgent">Urgente (até 1 mês)</SelectItem>
              <SelectItem value="short">Curto (2-3 meses)</SelectItem>
              <SelectItem value="medium">Médio (4-6 meses)</SelectItem>
              <SelectItem value="flexible">Flexível</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Como Conheceu */}
      <div className="space-y-2">
        <Label htmlFor="howFound" className="text-foreground">
          Como Conheceu a elmid.ai?
        </Label>
        <Select
          value={howFound}
          onValueChange={(value) => setValue("howFound", value as ContactFormData["howFound"])}
          disabled={isSubmitting}
        >
          <SelectTrigger className="bg-background border-border text-foreground">
            <SelectValue placeholder="Selecione uma opção" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="google">Google</SelectItem>
            <SelectItem value="referral">Indicação</SelectItem>
            <SelectItem value="linkedin">LinkedIn</SelectItem>
            <SelectItem value="instagram">Instagram</SelectItem>
            <SelectItem value="other">Outro</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Mensagem */}
      <div className="space-y-2">
        <Label htmlFor="message" className="text-foreground">
          Descreva Seu Projeto <span className="text-destructive">*</span>
        </Label>
        <Textarea
          id="message"
          placeholder="Conte-nos sobre seu projeto... (mínimo 50 caracteres)"
          className="bg-background border-border text-foreground min-h-[150px] resize-none"
          {...register("message")}
          disabled={isSubmitting}
        />
        {errors.message && <p className="text-sm text-destructive">{errors.message.message}</p>}
      </div>

      {/* Checkbox LGPD */}
      <div className="flex items-start gap-3">
        <Checkbox
          id="acceptTerms"
          checked={acceptTerms}
          onCheckedChange={(checked) => setValue("acceptTerms", checked as boolean)}
          disabled={isSubmitting}
        />
        <Label htmlFor="acceptTerms" className="text-sm text-muted-foreground cursor-pointer leading-relaxed">
          Aceito receber comunicações da elmid.ai e concordo com a{" "}
          <a href="/privacy" className="text-primary hover:underline">
            Política de Privacidade
          </a>{" "}
          <span className="text-destructive">*</span>
        </Label>
      </div>
      {errors.acceptTerms && <p className="text-sm text-destructive">{errors.acceptTerms.message}</p>}

      {/* Botão de Envio */}
      <Button
        type="submit"
        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
        disabled={isSubmitting || isSuccess}
        size="lg"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Enviando...
          </>
        ) : isSuccess ? (
          <>
            <CheckCircle2 className="mr-2 h-5 w-5" />
            Enviado com sucesso!
          </>
        ) : (
          <>
            <Send className="mr-2 h-5 w-5" />
            Enviar Solicitação
          </>
        )}
      </Button>
    </form>
  )
}
