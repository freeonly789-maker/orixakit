---
name: orixakit-ai
description: Use this skill when the user needs AI-specific UI components from Orixakit: OrixChatInput or OrixAiCard. Trigger on chat UI, AI response display, streaming UI, @orixakit ai components, orix-chat-input, orix-ai-card.
---

# Orixakit AI Components

UI components designed for AI-powered applications.

## Install

```bash
npx shadcn@latest add @orixakit/orix-chat-input
npx shadcn@latest add @orixakit/orix-ai-card
```

Or use direct URLs:

```bash
npx shadcn@latest add https://orixakit.dev/r/orix-chat-input.json
npx shadcn@latest add https://orixakit.dev/r/orix-ai-card.json
```

## OrixChatInput

Textarea-based chat input with send button, file attach slot, and keyboard shortcut (Cmd+Enter / Ctrl+Enter).

**Props:**
- `onSend: (message: string) => void` — Callback when message is sent
- `placeholder?: string` — Input placeholder text (default: "Type your message...")
- `disabled?: boolean` — Disable input and send button
- `maxRows?: number` — Maximum rows before scrolling (default: 5)
- `attachSlot?: React.ReactNode` — Custom attachment button/component

**Usage:**

```tsx
import { OrixChatInput } from "@/components/ui/orix-chat-input"
import { useState } from "react"

export function ChatInterface() {
  const [messages, setMessages] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const handleSend = async (message: string) => {
    setMessages((prev) => [...prev, { role: "user", content: message }])
    setIsLoading(true)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      })

      const data = await response.json()
      setMessages((prev) => [...prev, { role: "assistant", content: data.reply }])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 overflow-auto p-4">
        {/* Messages */}
      </div>
      <div className="p-4 border-t">
        <OrixChatInput
          onSend={handleSend}
          disabled={isLoading}
          placeholder="Ask me anything..."
        />
      </div>
    </div>
  )
}
```

**Features:**
- Auto-expanding textarea
- Send on Cmd+Enter or Ctrl+Enter
- File attachment slot
- Loading state
- Responsive design

**Keyboard Shortcuts:**
- **Cmd+Enter** (Mac) or **Ctrl+Enter** (Windows/Linux) — Send message
- **Shift+Enter** — New line

**With Custom Attachment:**

```tsx
import { OrixChatInput } from "@/components/ui/orix-chat-input"
import { Paperclip } from "lucide-react"
import { useRef } from "react"

export function ChatWithAttachment() {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleAttach = () => {
    fileInputRef.current?.click()
  }

  return (
    <>
      <OrixChatInput
        onSend={(message) => console.log(message)}
        attachSlot={
          <button
            onClick={handleAttach}
            className="p-2 hover:bg-muted rounded-md"
          >
            <Paperclip className="h-4 w-4" />
          </button>
        }
      />
      <input
        ref={fileInputRef}
        type="file"
        hidden
        onChange={(e) => {
          const file = e.target.files?.[0]
          if (file) console.log("File selected:", file.name)
        }}
      />
    </>
  )
}
```

## OrixAiCard

Card for displaying AI-generated content. Shows a loading skeleton while streaming, includes copy-to-clipboard button.

**Props:**
- `loading?: boolean` — Show loading skeleton
- `content?: string` — AI response content
- `model?: string` — Model name for attribution (e.g., "claude-3-sonnet")
- `onCopy?: () => void` — Callback when copy button clicked
- `className?: string` — Additional CSS classes

**Usage:**

```tsx
import { OrixAiCard } from "@/components/ui/orix-ai-card"
import { useState } from "react"

export function AiResponseDisplay() {
  const [response, setResponse] = useState("")
  const [loading, setLoading] = useState(false)

  const handleGenerate = async () => {
    setLoading(true)
    setResponse("")

    try {
      const stream = await fetch("/api/generate", {
        method: "POST",
      }).then((r) => r.body?.getReader())

      if (!stream) return

      while (true) {
        const { done, value } = await stream.read()
        if (done) break

        const chunk = new TextDecoder().decode(value)
        setResponse((prev) => prev + chunk)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <button onClick={handleGenerate}>Generate Response</button>
      <OrixAiCard
        loading={loading}
        content={response}
        model="claude-3-sonnet"
        onCopy={() => console.log("Copied!")}
      />
    </div>
  )
}
```

**Features:**
- Loading skeleton animation
- Copy-to-clipboard button
- Model attribution
- Streaming-ready
- Markdown support

**With Streaming:**

```tsx
import { OrixAiCard } from "@/components/ui/orix-ai-card"
import { useState, useEffect } from "react"

export function StreamingResponse({ prompt }: { prompt: string }) {
  const [content, setContent] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const stream = async () => {
      try {
        const response = await fetch("/api/stream", {
          method: "POST",
          body: JSON.stringify({ prompt }),
        })

        const reader = response.body?.getReader()
        if (!reader) return

        while (true) {
          const { done, value } = await reader.read()
          if (done) break

          const text = new TextDecoder().decode(value)
          setContent((prev) => prev + text)
        }
      } finally {
        setLoading(false)
      }
    }

    stream()
  }, [prompt])

  return (
    <OrixAiCard
      loading={loading}
      content={content}
      model="claude-3-sonnet"
    />
  )
}
```

## Common Patterns

### Full Chat Application

```tsx
import { OrixChatInput } from "@/components/ui/orix-chat-input"
import { OrixAiCard } from "@/components/ui/orix-ai-card"
import { useState } from "react"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  loading?: boolean
}

export function ChatApp() {
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const handleSend = async (userMessage: string) => {
    // Add user message
    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: userMessage,
    }
    setMessages((prev) => [...prev, userMsg])

    // Add loading assistant message
    const assistantMsg: Message = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: "",
      loading: true,
    }
    setMessages((prev) => [...prev, assistantMsg])
    setIsLoading(true)

    try {
      // Stream response
      const response = await fetch("/api/chat", {
        method: "POST",
        body: JSON.stringify({ message: userMessage }),
      })

      const reader = response.body?.getReader()
      if (!reader) return

      let fullContent = ""
      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        const chunk = new TextDecoder().decode(value)
        fullContent += chunk

        // Update assistant message
        setMessages((prev) => [
          ...prev.slice(0, -1),
          { ...assistantMsg, content: fullContent, loading: false },
        ])
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Messages */}
      <div className="flex-1 overflow-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            {msg.role === "assistant" ? (
              <OrixAiCard
                loading={msg.loading}
                content={msg.content}
                model="claude-3-sonnet"
              />
            ) : (
              <div className="bg-primary text-primary-foreground rounded-lg p-4 max-w-md">
                {msg.content}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="border-t p-4">
        <OrixChatInput
          onSend={handleSend}
          disabled={isLoading}
          placeholder="Ask me anything..."
        />
      </div>
    </div>
  )
}
```

### AI Assistant with Multiple Models

```tsx
import { OrixChatInput } from "@/components/ui/orix-chat-input"
import { OrixAiCard } from "@/components/ui/orix-ai-card"
import { useState } from "react"

export function MultiModelChat() {
  const [model, setModel] = useState("claude-3-sonnet")
  const [content, setContent] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSend = async (message: string) => {
    setLoading(true)
    setContent("")

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        body: JSON.stringify({ message, model }),
      })

      const reader = response.body?.getReader()
      if (!reader) return

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        const chunk = new TextDecoder().decode(value)
        setContent((prev) => prev + chunk)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <select
        value={model}
        onChange={(e) => setModel(e.target.value)}
        className="border rounded p-2"
      >
        <option value="claude-3-sonnet">Claude 3 Sonnet</option>
        <option value="claude-3-opus">Claude 3 Opus</option>
        <option value="gpt-4">GPT-4</option>
      </select>

      <OrixChatInput onSend={handleSend} disabled={loading} />

      <OrixAiCard
        loading={loading}
        content={content}
        model={model}
      />
    </div>
  )
}
```
