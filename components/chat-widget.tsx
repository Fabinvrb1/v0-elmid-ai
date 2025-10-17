"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useChat } from "ai/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { X, Send, MessageCircle } from "lucide-react"

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const { messages, input, handleInputChange, handleSubmit, isLoading, setMessages } = useChat({
    api: "/api/chat",
    initialMessages: [],
    onFinish: () => {
      // Save to localStorage after each message
      saveToLocalStorage()
    },
  })

  // Load chat history from localStorage on mount
  useEffect(() => {
    const savedMessages = localStorage.getItem("elmid-chat-history")
    if (savedMessages) {
      try {
        const parsed = JSON.parse(savedMessages)
        setMessages(parsed)
        setHasInteracted(true)
      } catch (e) {
        console.error("Failed to parse chat history")
      }
    }
  }, [setMessages])

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  // Send initial message when chat opens for the first time
  useEffect(() => {
    if (isOpen && !hasInteracted && messages.length === 0) {
      setMessages([
        {
          id: "welcome",
          role: "assistant",
          content: "Olá! Como posso ajudar?",
          createdAt: new Date(),
        },
      ])
      setHasInteracted(true)
      saveToLocalStorage()
    }
  }, [isOpen, hasInteracted, messages.length, setMessages])

  const saveToLocalStorage = () => {
    localStorage.setItem("elmid-chat-history", JSON.stringify(messages))
  }

  const handleQuickAction = (action: string) => {
    handleInputChange({
      target: { value: action },
    } as React.ChangeEvent<HTMLInputElement>)

    // Auto-submit after a brief delay
    setTimeout(() => {
      const form = document.querySelector("form[data-chat-form]") as HTMLFormElement
      if (form) {
        form.requestSubmit()
      }
    }, 100)
  }

  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  // Rate limiting: max 20 messages per session
  const userMessageCount = messages.filter((m) => m.role === "user").length
  const isRateLimited = userMessageCount >= 20

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-gradient-to-br from-purple-600 to-purple-700 text-white shadow-lg transition-all hover:scale-110 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-purple-300"
        aria-label="Abrir chat"
      >
        {isOpen ? <X className="h-6 w-6 mx-auto" /> : <MessageCircle className="h-6 w-6 mx-auto" />}
      </button>

      {/* Chat Window */}
      <div
        className={`fixed bottom-24 right-6 z-50 w-[380px] h-[600px] bg-background border border-border rounded-2xl shadow-2xl transition-all duration-300 flex flex-col ${
          isOpen ? "translate-x-0 opacity-100" : "translate-x-[calc(100%+2rem)] opacity-0 pointer-events-none"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-t-2xl">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center">
              <MessageCircle className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-semibold">Assistente Elmid</h3>
              <p className="text-xs text-white/80">Online agora</p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="hover:bg-white/20 rounded-full p-1 transition-colors"
            aria-label="Fechar chat"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-muted/20">
          {messages.map((message, index) => (
            <div
              key={message.id || index}
              className={`flex ${
                message.role === "user" ? "justify-end" : "justify-start"
              } animate-in fade-in duration-300`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                  message.role === "user"
                    ? "bg-purple-600 text-white rounded-br-sm"
                    : "bg-muted text-foreground rounded-bl-sm"
                }`}
              >
                <p className="text-sm whitespace-pre-wrap break-words">{message.content}</p>
                <p className={`text-xs mt-1 ${message.role === "user" ? "text-white/70" : "text-muted-foreground"}`}>
                  {formatTime(message.createdAt || new Date())}
                </p>
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {isLoading && (
            <div className="flex justify-start animate-in fade-in duration-300">
              <div className="bg-muted rounded-2xl rounded-bl-sm px-4 py-3">
                <div className="flex gap-1">
                  <div className="h-2 w-2 rounded-full bg-muted-foreground/50 animate-bounce [animation-delay:-0.3s]"></div>
                  <div className="h-2 w-2 rounded-full bg-muted-foreground/50 animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="h-2 w-2 rounded-full bg-muted-foreground/50 animate-bounce"></div>
                </div>
              </div>
            </div>
          )}

          {/* Quick Action Buttons */}
          {messages.length <= 1 && !isLoading && (
            <div className="flex flex-col gap-2 pt-2">
              <p className="text-xs text-muted-foreground text-center mb-2">Ou escolha uma opção:</p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleQuickAction("Quero conhecer os serviços da Elmid")}
                className="text-left justify-start"
              >
                Ver serviços
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleQuickAction("Gostaria de solicitar um orçamento")}
                className="text-left justify-start"
              >
                Solicitar orçamento
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleQuickAction("Quero agendar uma reunião")}
                className="text-left justify-start"
              >
                Agendar reunião
              </Button>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-border bg-background rounded-b-2xl">
          {isRateLimited ? (
            <div className="text-center text-sm text-muted-foreground">
              Limite de mensagens atingido. Entre em contato diretamente conosco.
            </div>
          ) : (
            <form onSubmit={handleSubmit} data-chat-form className="flex gap-2">
              <Input
                ref={inputRef}
                value={input}
                onChange={handleInputChange}
                placeholder="Digite sua mensagem..."
                disabled={isLoading}
                className="flex-1"
              />
              <Button
                type="submit"
                size="icon"
                disabled={isLoading || !input.trim()}
                className="bg-purple-600 hover:bg-purple-700"
              >
                <Send className="h-4 w-4" />
              </Button>
            </form>
          )}
          <p className="text-xs text-muted-foreground text-center mt-2">{userMessageCount}/20 mensagens</p>
        </div>
      </div>
    </>
  )
}
