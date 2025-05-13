"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { MessageCircle, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Message {
  role: "user" | "assistant"
  content: string
}

export default function ChatILMButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Assalamu alaikum! I'm ChatILM, your Islamic knowledge assistant. How can I help you today?",
    },
  ])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    // Add user message
    const userMessage: Message = { role: "user", content: input }
    setMessages((prev) => [...prev, userMessage])
    setInput("")

    // Simulate AI response
    setTimeout(() => {
      let response = ""

      if (input.toLowerCase().includes("prayer") || input.toLowerCase().includes("salah")) {
        response =
          "Prayer (Salah) is one of the Five Pillars of Islam. Muslims perform five obligatory prayers daily: Fajr, Dhuhr, Asr, Maghrib, and Isha. Each prayer has specific timings based on the position of the sun."
      } else if (input.toLowerCase().includes("ramadan")) {
        response =
          "Ramadan is the ninth month of the Islamic calendar and a time when Muslims fast from dawn until sunset. It's a period of spiritual reflection, increased devotion, and worship."
      } else if (input.toLowerCase().includes("eid")) {
        response =
          "There are two major Eids in Islam: Eid al-Fitr, which marks the end of Ramadan, and Eid al-Adha, which commemorates Prophet Ibrahim's willingness to sacrifice his son in obedience to Allah."
      } else {
        response =
          "Thank you for your question. I'm a simplified version in this demo. The full ChatILM would provide a comprehensive answer based on Islamic knowledge and sources."
      }

      const assistantMessage: Message = { role: "assistant", content: response }
      setMessages((prev) => [...prev, assistantMessage])
    }, 1000)
  }

  return (
    <>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button className="fixed bottom-4 right-4 rounded-full w-14 h-14 shadow-lg" size="icon">
            <MessageCircle className="h-6 w-6" />
            <span className="sr-only">Open ChatILM</span>
          </Button>
        </SheetTrigger>
        <SheetContent className="w-full sm:max-w-md p-0 flex flex-col h-[90vh] sm:h-full">
          <SheetHeader className="p-4 border-b">
            <div className="flex items-center justify-between">
              <SheetTitle>ChatILM</SheetTitle>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </Button>
            </div>
            <SheetDescription>Your Islamic knowledge assistant</SheetDescription>
          </SheetHeader>

          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] rounded-lg px-4 py-2 ${
                      message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          <form onSubmit={handleSendMessage} className="p-4 border-t flex gap-2">
            <Input
              placeholder="Ask about prayer times, Islamic concepts..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1"
            />
            <Button type="submit">Send</Button>
          </form>
        </SheetContent>
      </Sheet>
    </>
  )
}
