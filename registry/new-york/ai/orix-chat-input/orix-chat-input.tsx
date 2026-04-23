/**
 * OrixChatInput
 * Textarea-based chat input with send button, file attach slot, and keyboard shortcut (Cmd+Enter).
 * @orixakit/orix-chat-input
 */
"use client"

import * as React from "react"
import { OrixButton } from "@/components/ui/orix-button"
import { Send, Paperclip } from "lucide-react"
import { cn } from "@/lib/utils"

export interface OrixChatInputProps {
  onSend: (message: string) => void
  placeholder?: string
  disabled?: boolean
  maxRows?: number
  attachSlot?: React.ReactNode
}

export function OrixChatInput({
  onSend,
  placeholder = "Type your message...",
  disabled = false,
  maxRows = 5,
  attachSlot,
}: OrixChatInputProps) {
  const [message, setMessage] = React.useState("")
  const textareaRef = React.useRef<HTMLTextAreaElement>(null)

  const handleSend = () => {
    if (message.trim()) {
      onSend(message)
      setMessage("")
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto"
      }
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
      e.preventDefault()
      handleSend()
    }
  }

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = e.target
    setMessage(textarea.value)
    textarea.style.height = "auto"
    textarea.style.height = Math.min(textarea.scrollHeight, 200) + "px"
  }

  return (
    <div className="w-full border rounded-lg bg-background p-4 space-y-3">
      <textarea
        ref={textareaRef}
        value={message}
        onChange={handleInput}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={disabled}
        rows={1}
        className={cn(
          "w-full resize-none outline-none bg-transparent text-sm",
          "placeholder:text-muted-foreground",
          "disabled:opacity-50 disabled:cursor-not-allowed"
        )}
      />
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {attachSlot ? (
            attachSlot
          ) : (
            <button
              type="button"
              className="p-2 hover:bg-muted rounded-md transition-colors"
              disabled={disabled}
            >
              <Paperclip className="h-4 w-4 text-muted-foreground" />
            </button>
          )}
        </div>
        <OrixButton
          onClick={handleSend}
          disabled={disabled || !message.trim()}
          size="sm"
          leftIcon={<Send className="h-4 w-4" />}
        >
          Send
        </OrixButton>
      </div>
    </div>
  )
}
