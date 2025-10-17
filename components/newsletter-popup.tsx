"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Mail, Loader2, CheckCircle2 } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { useExitIntent } from "@/hooks/use-exit-intent"
import { shouldShowNewsletterPopup, markNewsletterPopupClosed, markNewsletterSubscribed } from "@/lib/cookies"
import { toast } from "sonner"

// Validation schema
const newsletterSchema = z.object({
  email: z.string().email("Email inválido"),
  consent: z.boolean().refine((val) => val === true, {
    message: "Você precisa aceitar receber emails",
  }),
})

type NewsletterFormData = z.infer<typeof newsletterSchema>

export function NewsletterPopup() {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [timeoutTriggered, setTimeoutTriggered] = useState(false)

  // Exit intent detection
  const exitIntentTriggered = useExitIntent({
    enabled: true,
    sensitivity: 50,
    delay: 2000, // Wait 2 seconds before enabling
  })

  // Form setup
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<NewsletterFormData>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: {
      consent: false,
    },
  })

  const consent = watch("consent")

  // Timeout trigger (30 seconds)
  useEffect(() => {
    if (!shouldShowNewsletterPopup()) {
      return
    }

    const timer = setTimeout(() => {
      setTimeoutTriggered(true)
    }, 30000) // 30 seconds

    return () => clearTimeout(timer)
  }, [])

  // Show popup when exit intent or timeout is triggered
  useEffect(() => {
    if ((exitIntentTriggered || timeoutTriggered) && shouldShowNewsletterPopup()) {
      setIsOpen(true)
    }
  }, [exitIntentTriggered, timeoutTriggered])

  // Handle form submission
  const onSubmit = async (data: NewsletterFormData) => {
    setIsLoading(true)

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: data.email }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || "Erro ao inscrever")
      }

      // Success
      setIsSuccess(true)
      markNewsletterSubscribed()
      toast.success("Inscrição realizada com sucesso!")

      // Close popup after 3 seconds
      setTimeout(() => {
        setIsOpen(false)
      }, 3000)
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Erro ao inscrever. Tente novamente.")
    } finally {
      setIsLoading(false)
    }
  }

  // Handle close
  const handleClose = () => {
    setIsOpen(false)
    markNewsletterPopupClosed()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <AnimatePresence mode="wait">
          {!isSuccess ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <DialogHeader>
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <DialogTitle className="text-center text-2xl">Fique por dentro das novidades tech!</DialogTitle>
                <DialogDescription className="text-center">
                  Receba conteúdos exclusivos sobre desenvolvimento, tendências e dicas.
                </DialogDescription>
              </DialogHeader>

              <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    {...register("email")}
                    disabled={isLoading}
                    className={errors.email ? "border-destructive" : ""}
                  />
                  {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
                </div>

                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="consent"
                    checked={consent}
                    onCheckedChange={(checked) => setValue("consent", checked as boolean)}
                    disabled={isLoading}
                  />
                  <Label htmlFor="consent" className="text-sm font-normal leading-tight cursor-pointer">
                    Aceito receber emails com conteúdos, novidades e ofertas da Elmid AI
                  </Label>
                </div>
                {errors.consent && <p className="text-sm text-destructive">{errors.consent.message}</p>}

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Inscrevendo...
                    </>
                  ) : (
                    "Inscrever-se"
                  )}
                </Button>

                <p className="text-center text-xs text-muted-foreground">
                  Respeitamos sua privacidade. Cancele a qualquer momento.
                </p>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="py-8 text-center"
            >
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                <CheckCircle2 className="h-8 w-8 text-green-600" />
              </div>
              <DialogTitle className="mb-2 text-2xl">Obrigado!</DialogTitle>
              <DialogDescription>Verifique seu email para confirmar sua inscrição.</DialogDescription>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  )
}
