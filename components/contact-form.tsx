"use client"

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
import { useGoogleAnalytics } from "@/hooks/use-google-analytics"

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const { trackForm } = useGoogleAnalytics()

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
      trackForm("Contact Form", true)
      toast.success("Mensagem enviada com sucesso!", {
        description: "Entraremos em contato em breve.",
        duration: 5000,
      })

      // Limpar formulário após 2 segundos
      setTimeout(() => {
        reset()
        setIsSuccess(false)
      }, 2000)
    } catch (error) {
      console.error("[v0] Erro ao enviar formulário:", error)
      trackForm("Contact Form", false)
      toast.error("Erro ao enviar mensagem", {
        description: error instanceof Error ? error.message : "Tente novamente mais tarde.",
        duration: 5000,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Nome */}
      <div className="space-y-2">
        <Label htmlFor="name" className="text-foreground">
          Nome completo <span className="text-destructive">*</span>
        </Label>
        <Input
          id="name"
          type="text"
          placeholder="Seu nome"
          className="bg-background border-border text-foreground"
          {...register("name")}
          disabled={isSubmitting}
        />
        {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
      </div>

      {/* Email */}
      <div className="space-y-2">
        <Label htmlFor="email" className="text-foreground">
          Email <span className="text-destructive">*</span>
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

      {/* Telefone e Empresa - Grid 2 colunas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Telefone */}
        <div className="space-y-2">
          <Label htmlFor="phone" className="text-foreground">
            Telefone
          </Label>
          <Input
            id="phone"
            type="tel"
            placeholder="(11) 99999-9999"
            className="bg-background border-border text-foreground"
            {...register("phone")}
            disabled={isSubmitting}
          />
          {errors.phone && <p className="text-sm text-destructive">{errors.phone.message}</p>}
        </div>

        {/* Empresa */}
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
          {errors.company && <p className="text-sm text-destructive">{errors.company.message}</p>}
        </div>
      </div>

      {/* Tipo de Projeto */}
      <div className="space-y-2">
        <Label htmlFor="projectType" className="text-foreground">
          Tipo de projeto <span className="text-destructive">*</span>
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
            <SelectItem value="system">Sistema Corporativo</SelectItem>
            <SelectItem value="consulting">Consultoria</SelectItem>
            <SelectItem value="other">Outro</SelectItem>
          </SelectContent>
        </Select>
        {errors.projectType && <p className="text-sm text-destructive">{errors.projectType.message}</p>}
      </div>

      {/* Mensagem */}
      <div className="space-y-2">
        <Label htmlFor="message" className="text-foreground">
          Mensagem <span className="text-destructive">*</span>
        </Label>
        <Textarea
          id="message"
          placeholder="Conte-nos sobre seu projeto..."
          className="bg-background border-border text-foreground min-h-[120px] resize-none"
          {...register("message")}
          disabled={isSubmitting}
        />
        {errors.message && <p className="text-sm text-destructive">{errors.message.message}</p>}
      </div>

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
            Enviar mensagem
          </>
        )}
      </Button>

      {/* Informação de Rate Limit */}
      <p className="text-xs text-muted-foreground text-center">Limite de 3 mensagens por hora para prevenir spam</p>
    </form>
  )
}
