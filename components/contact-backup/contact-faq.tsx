"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function ContactFAQ() {
  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Perguntas Frequentes</h2>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>Em quanto tempo terei uma resposta?</AccordionTrigger>
          <AccordionContent>
            Nossa equipe retorna em até 24 horas úteis. Priorizamos um atendimento rápido e personalizado para cada
            projeto.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2">
          <AccordionTrigger>Quanto custa um projeto?</AccordionTrigger>
          <AccordionContent>
            Os valores variam de acordo com a complexidade, escopo e tecnologias envolvidas. Após analisar seu projeto,
            enviamos uma proposta personalizada com valores transparentes e detalhados.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3">
          <AccordionTrigger>Atendem presencialmente?</AccordionTrigger>
          <AccordionContent>
            Atendemos 100% remoto, o que nos permite trabalhar com clientes de todo o Brasil com a mesma qualidade e
            eficiência. Utilizamos ferramentas modernas de comunicação e gestão de projetos.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-4">
          <AccordionTrigger>Trabalham com todo o Brasil?</AccordionTrigger>
          <AccordionContent>
            Sim! Atendemos empresas de todo território nacional. Nosso modelo de trabalho remoto nos permite entregar
            projetos de alta qualidade independente da localização.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-5">
          <AccordionTrigger>Posso agendar uma reunião antes?</AccordionTrigger>
          <AccordionContent>
            Claro! Use nosso calendário para agendar 30 minutos gratuitos com um especialista. É uma ótima oportunidade
            para discutir seu projeto e tirar dúvidas antes de enviar uma proposta formal.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-6">
          <AccordionTrigger>Como funciona o processo?</AccordionTrigger>
          <AccordionContent>
            Nosso processo é dividido em 4 etapas: 1) Análise detalhada do seu projeto (24h), 2) Reunião estratégica
            para alinhamento (48h), 3) Envio da proposta personalizada (72h), 4) Início do desenvolvimento após
            aprovação.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
