import { useParams, useLocation } from "wouter"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Copy, Check } from "lucide-react"
import { useState } from "react"

interface ComponentInfo {
  name: string
  title: string
  description: string
  type: string
  categories: string[]
  props?: Array<{
    name: string
    type: string
    description: string
    default?: string
  }>
  example?: string
  usage?: string
}

const COMPONENTS: Record<string, ComponentInfo> = {
  "orix-button": {
    name: "orix-button",
    title: "Orix Button",
    description: "Extended button with loading state, icon support, and size variants.",
    type: "UI Primitive",
    categories: ["ui", "primitives"],
    props: [
      {
        name: "loading",
        type: "boolean",
        description: "Shows spinner and disables button",
        default: "false",
      },
      {
        name: "leftIcon",
        type: "React.ReactNode",
        description: "Icon displayed before text",
      },
      {
        name: "rightIcon",
        type: "React.ReactNode",
        description: "Icon displayed after text",
      },
      {
        name: "fullWidth",
        type: "boolean",
        description: "Makes button 100% width",
        default: "false",
      },
    ],
    example: `import { OrixButton } from "@/components/ui/orix-button"
import { Send } from "lucide-react"

export function Example() {
  return (
    <div className="space-y-4">
      <OrixButton>Default Button</OrixButton>
      <OrixButton loading>Loading...</OrixButton>
      <OrixButton leftIcon={<Send className="h-4 w-4" />}>
        Send Message
      </OrixButton>
      <OrixButton fullWidth variant="outline">
        Full Width Button
      </OrixButton>
    </div>
  )
}`,
    usage: `npx shadcn@latest add @orixakit/orix-button`,
  },
  "orix-input": {
    name: "orix-input",
    title: "Orix Input",
    description: "Input with built-in label, error state, and icon slot.",
    type: "UI Primitive",
    categories: ["ui", "primitives"],
    props: [
      {
        name: "label",
        type: "string",
        description: "Label text displayed above input",
      },
      {
        name: "error",
        type: "string",
        description: "Error message displayed below input",
      },
      {
        name: "icon",
        type: "React.ReactNode",
        description: "Icon displayed inside input (left side)",
      },
    ],
    example: `import { OrixInput } from "@/components/ui/orix-input"
import { Mail, Lock } from "lucide-react"

export function Example() {
  return (
    <form className="space-y-4">
      <OrixInput
        label="Email"
        type="email"
        placeholder="you@example.com"
        icon={<Mail className="h-4 w-4" />}
      />
      <OrixInput
        label="Password"
        type="password"
        placeholder="••••••••"
        icon={<Lock className="h-4 w-4" />}
        error="Password must be at least 6 characters"
      />
    </form>
  )
}`,
    usage: `npx shadcn@latest add @orixakit/orix-input`,
  },
  "orix-card": {
    name: "orix-card",
    title: "Orix Card",
    description: "Card with header slot, body, and optional footer. Supports hover elevation.",
    type: "UI Primitive",
    categories: ["ui", "primitives"],
    props: [
      {
        name: "title",
        type: "string",
        description: "Card title",
      },
      {
        name: "description",
        type: "string",
        description: "Card subtitle/description",
      },
      {
        name: "hover",
        type: "boolean",
        description: "Adds hover elevation effect",
        default: "false",
      },
      {
        name: "footer",
        type: "React.ReactNode",
        description: "Content for footer section",
      },
    ],
    example: `import { OrixCard } from "@/components/ui/orix-card"

export function Example() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <OrixCard title="Revenue" description="Last 30 days" hover>
        <p className="text-2xl font-bold">$45,231.89</p>
        <p className="text-xs text-muted-foreground mt-2">+20.1% from last month</p>
      </OrixCard>
      <OrixCard 
        title="Settings" 
        footer={<button className="w-full">Save</button>}
      >
        <input type="text" placeholder="Setting value" />
      </OrixCard>
    </div>
  )
}`,
    usage: `npx shadcn@latest add @orixakit/orix-card`,
  },
  "orix-login-01": {
    name: "orix-login-01",
    title: "Login Form",
    description: "Email + password login form with validation, error handling, and submit state.",
    type: "Block",
    categories: ["blocks", "auth"],
    example: `// Installs to app/login/page.tsx
// Includes email/password validation with React Hook Form
// Auto-installed dependencies: zod, react-hook-form, @hookform/resolvers`,
    usage: `npx shadcn@latest add @orixakit/orix-login-01`,
  },
  "orix-dashboard-01": {
    name: "orix-dashboard-01",
    title: "Dashboard Overview",
    description: "Stats grid with cards showing key metrics. Responsive 2/4-col layout.",
    type: "Block",
    categories: ["blocks", "dashboard"],
    example: `// Installs to app/dashboard/page.tsx
// Responsive stats grid (2 cols mobile, 4 cols desktop)
// Includes StatsCard component with hover effects`,
    usage: `npx shadcn@latest add @orixakit/orix-dashboard-01`,
  },
  "orix-sidebar-01": {
    name: "orix-sidebar-01",
    title: "App Sidebar",
    description: "Collapsible sidebar with nav links, user avatar, and active state.",
    type: "Block",
    categories: ["blocks", "layout"],
    props: [
      {
        name: "items",
        type: "NavItem[]",
        description: "Navigation items array",
      },
      {
        name: "onNavigate",
        type: "(href: string) => void",
        description: "Callback when item clicked",
      },
    ],
    example: `import { Sidebar } from "@/components/sidebar"

export function Layout({ children }) {
  const navItems = [
    { label: "Dashboard", href: "/dashboard", active: true },
    { label: "Analytics", href: "/analytics" },
    { label: "Settings", href: "/settings" },
  ]

  return (
    <div className="flex">
      <Sidebar items={navItems} />
      <main className="flex-1">{children}</main>
    </div>
  )
}`,
    usage: `npx shadcn@latest add @orixakit/orix-sidebar-01`,
  },
  "use-local-storage": {
    name: "use-local-storage",
    title: "useLocalStorage",
    description: "Type-safe localStorage hook with SSR safety and JSON serialization.",
    type: "Hook",
    categories: ["hooks", "utils"],
    props: [
      {
        name: "key",
        type: "string",
        description: "localStorage key",
      },
      {
        name: "initialValue",
        type: "T",
        description: "Initial value if key not found",
      },
    ],
    example: `import { useLocalStorage } from "@/hooks/use-local-storage"

export function ThemeToggle() {
  const [theme, setTheme] = useLocalStorage<"light" | "dark">("theme", "light")

  return (
    <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
      Current theme: {theme}
    </button>
  )
}`,
    usage: `npx shadcn@latest add @orixakit/use-local-storage`,
  },
  "use-debounce": {
    name: "use-debounce",
    title: "useDebounce",
    description: "Debounce any value or callback with configurable delay.",
    type: "Hook",
    categories: ["hooks", "utils"],
    props: [
      {
        name: "value",
        type: "T",
        description: "Value to debounce",
      },
      {
        name: "delay",
        type: "number",
        description: "Debounce delay in milliseconds",
        default: "300",
      },
    ],
    example: `import { useDebounce } from "@/hooks/use-debounce"
import { useEffect, useState } from "react"

export function SearchUsers() {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState([])
  const debouncedQuery = useDebounce(query, 400)

  useEffect(() => {
    if (debouncedQuery) {
      fetch(\`/api/search?q=\${debouncedQuery}\`)
        .then(r => r.json())
        .then(setResults)
    }
  }, [debouncedQuery])

  return (
    <div>
      <input value={query} onChange={e => setQuery(e.target.value)} />
      <ul>
        {results.map(r => <li key={r.id}>{r.name}</li>)}
      </ul>
    </div>
  )
}`,
    usage: `npx shadcn@latest add @orixakit/use-debounce`,
  },
  "use-media-query": {
    name: "use-media-query",
    title: "useMediaQuery",
    description: "Reactive media query hook. SSR-safe.",
    type: "Hook",
    categories: ["hooks", "utils"],
    props: [
      {
        name: "query",
        type: "string",
        description: "CSS media query string",
      },
    ],
    example: `import { useMediaQuery } from "@/hooks/use-media-query"

export function ResponsiveLayout() {
  const isMobile = useMediaQuery("(max-width: 768px)")
  const prefersDark = useMediaQuery("(prefers-color-scheme: dark)")

  return (
    <div>
      {isMobile ? <MobileNav /> : <DesktopNav />}
      {prefersDark && <style>{darkModeStyles}</style>}
    </div>
  )
}`,
    usage: `npx shadcn@latest add @orixakit/use-media-query`,
  },
  "orix-chat-input": {
    name: "orix-chat-input",
    title: "Chat Input",
    description: "Textarea-based chat input with send button, file attach slot, and keyboard shortcut (Cmd+Enter).",
    type: "AI Component",
    categories: ["ai", "input"],
    props: [
      {
        name: "onSend",
        type: "(message: string) => void",
        description: "Callback when message is sent",
      },
      {
        name: "placeholder",
        type: "string",
        description: "Input placeholder text",
        default: '"Type your message..."',
      },
      {
        name: "disabled",
        type: "boolean",
        description: "Disable input and send button",
        default: "false",
      },
      {
        name: "attachSlot",
        type: "React.ReactNode",
        description: "Custom attachment button/component",
      },
    ],
    example: `import { OrixChatInput } from "@/components/ui/orix-chat-input"

export function ChatInterface() {
  const handleSend = async (message: string) => {
    const response = await fetch("/api/chat", {
      method: "POST",
      body: JSON.stringify({ message }),
    })
    const data = await response.json()
    console.log(data.reply)
  }

  return <OrixChatInput onSend={handleSend} />
}`,
    usage: `npx shadcn@latest add @orixakit/orix-chat-input`,
  },
  "orix-ai-card": {
    name: "orix-ai-card",
    title: "AI Response Card",
    description: "Streaming-ready card for displaying AI-generated content. Includes loading skeleton and copy button.",
    type: "AI Component",
    categories: ["ai", "display"],
    props: [
      {
        name: "loading",
        type: "boolean",
        description: "Show loading skeleton",
        default: "false",
      },
      {
        name: "content",
        type: "string",
        description: "AI response content",
      },
      {
        name: "model",
        type: "string",
        description: "Model name for attribution",
      },
      {
        name: "onCopy",
        type: "() => void",
        description: "Callback when copy button clicked",
      },
    ],
    example: `import { OrixAiCard } from "@/components/ui/orix-ai-card"
import { useState } from "react"

export function AiResponse() {
  const [content, setContent] = useState("")
  const [loading, setLoading] = useState(false)

  const handleGenerate = async () => {
    setLoading(true)
    const response = await fetch("/api/generate", { method: "POST" })
    const data = await response.json()
    setContent(data.text)
    setLoading(false)
  }

  return (
    <div>
      <button onClick={handleGenerate}>Generate</button>
      <OrixAiCard loading={loading} content={content} model="claude-3-sonnet" />
    </div>
  )
}`,
    usage: `npx shadcn@latest add @orixakit/orix-ai-card`,
  },
}

export default function ComponentDetail() {
  const params = useParams()
  const [, navigate] = useLocation()
  const [copied, setCopied] = useState(false)

  const componentName = params.name as string
  const component = COMPONENTS[componentName]

  if (!component) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container py-12">
          <Button variant="ghost" onClick={() => navigate("/")} className="mb-8">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Registry
          </Button>
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold mb-2">Component not found</h1>
            <p className="text-muted-foreground">The component "{componentName}" does not exist.</p>
          </div>
        </div>
      </div>
    )
  }

  const handleCopyUsage = () => {
    navigator.clipboard.writeText(component.usage || "")
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-muted/50">
        <div className="container py-8">
          <Button variant="ghost" onClick={() => navigate("/")} className="mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Registry
          </Button>
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">{component.title}</h1>
              <p className="text-muted-foreground text-lg mb-4">{component.description}</p>
              <div className="flex gap-2">
                <Badge variant="outline">{component.type}</Badge>
                {component.categories.map((cat) => (
                  <Badge key={cat} variant="secondary">
                    {cat}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Installation */}
            <section>
              <h2 className="text-2xl font-bold mb-4">Installation</h2>
              <div className="bg-muted/50 rounded-lg p-4 border">
                <div className="flex items-center justify-between">
                  <code className="text-sm font-mono">{component.usage}</code>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleCopyUsage}
                  >
                    {copied ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
            </section>

            {/* Props */}
            {component.props && component.props.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold mb-4">Props</h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 font-semibold">Name</th>
                        <th className="text-left py-3 px-4 font-semibold">Type</th>
                        <th className="text-left py-3 px-4 font-semibold">Description</th>
                        <th className="text-left py-3 px-4 font-semibold">Default</th>
                      </tr>
                    </thead>
                    <tbody>
                      {component.props.map((prop) => (
                        <tr key={prop.name} className="border-b hover:bg-muted/50">
                          <td className="py-3 px-4 font-mono text-xs">{prop.name}</td>
                          <td className="py-3 px-4 font-mono text-xs text-muted-foreground">
                            {prop.type}
                          </td>
                          <td className="py-3 px-4 text-sm">{prop.description}</td>
                          <td className="py-3 px-4 font-mono text-xs">
                            {prop.default || "-"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            )}

            {/* Example */}
            {component.example && (
              <section>
                <h2 className="text-2xl font-bold mb-4">Example</h2>
                <pre className="bg-muted/50 rounded-lg p-4 overflow-x-auto border">
                  <code className="text-sm font-mono">{component.example}</code>
                </pre>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Links */}
            <div className="border rounded-lg p-6 bg-card">
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  View Source
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  View on GitHub
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Report Issue
                </Button>
              </div>
            </div>

            {/* Related Components */}
            <div className="border rounded-lg p-6 bg-card">
              <h3 className="font-semibold mb-4">Related Components</h3>
              <div className="space-y-2 text-sm">
                <p className="text-muted-foreground">
                  Explore other components in the registry
                </p>
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => navigate("/")}
                >
                  Back to Registry
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
