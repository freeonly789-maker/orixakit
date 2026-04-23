import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Copy, Check, Search } from "lucide-react"

const REGISTRY_ITEMS = [
  {
    name: "orix-button",
    title: "Orix Button",
    description: "Extended button with loading state, icon support, and size variants.",
    type: "registry:ui",
    categories: ["ui", "primitives"],
  },
  {
    name: "orix-input",
    title: "Orix Input",
    description: "Input with built-in label, error state, and icon slot.",
    type: "registry:ui",
    categories: ["ui", "primitives"],
  },
  {
    name: "orix-card",
    title: "Orix Card",
    description: "Card with header slot, body, and optional footer. Supports hover elevation.",
    type: "registry:ui",
    categories: ["ui", "primitives"],
  },
  {
    name: "orix-login-01",
    title: "Login Form",
    description: "Email + password login form with validation, error handling, and submit state.",
    type: "registry:block",
    categories: ["blocks", "auth"],
  },
  {
    name: "orix-dashboard-01",
    title: "Dashboard Overview",
    description: "Stats grid with cards showing key metrics. Responsive 2/4-col layout.",
    type: "registry:block",
    categories: ["blocks", "dashboard"],
  },
  {
    name: "orix-sidebar-01",
    title: "App Sidebar",
    description: "Collapsible sidebar with nav links, user avatar, and active state.",
    type: "registry:block",
    categories: ["blocks", "layout"],
  },
  {
    name: "use-local-storage",
    title: "useLocalStorage",
    description: "Type-safe localStorage hook with SSR safety and JSON serialization.",
    type: "registry:hook",
    categories: ["hooks", "utils"],
  },
  {
    name: "use-debounce",
    title: "useDebounce",
    description: "Debounce any value or callback with configurable delay.",
    type: "registry:hook",
    categories: ["hooks", "utils"],
  },
  {
    name: "use-media-query",
    title: "useMediaQuery",
    description: "Reactive media query hook. SSR-safe.",
    type: "registry:hook",
    categories: ["hooks", "utils"],
  },
  {
    name: "orix-chat-input",
    title: "Chat Input",
    description: "Textarea-based chat input with send button, file attach slot, and keyboard shortcut (Cmd+Enter).",
    type: "registry:component",
    categories: ["ai", "input"],
  },
  {
    name: "orix-ai-card",
    title: "AI Response Card",
    description: "Streaming-ready card for displaying AI-generated content. Includes loading skeleton and copy button.",
    type: "registry:component",
    categories: ["ai", "display"],
  },
]

const CATEGORIES = [
  { id: "all", label: "All Components", icon: "📦" },
  { id: "ui", label: "UI Primitives", icon: "🎨" },
  { id: "blocks", label: "Blocks", icon: "🏗️" },
  { id: "hooks", label: "Hooks", icon: "🪝" },
  { id: "ai", label: "AI Components", icon: "🤖" },
]

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const filteredItems = useMemo(() => {
    return REGISTRY_ITEMS.filter((item) => {
      const matchesCategory = selectedCategory === "all" || item.categories.includes(selectedCategory)
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesCategory && matchesSearch
    })
  }, [searchQuery, selectedCategory])

  const handleCopy = (name: string) => {
    const command = `npx shadcn@latest add https://orixakit.dev/r/${name}.json`
    navigator.clipboard.writeText(command)
    setCopiedId(name)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const getCategoryBadgeColor = (category: string) => {
    const colors: Record<string, string> = {
      ui: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100",
      primitives: "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-200",
      blocks: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100",
      auth: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-100",
      dashboard: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100",
      layout: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-100",
      hooks: "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-100",
      utils: "bg-pink-50 text-pink-700 dark:bg-pink-950 dark:text-pink-200",
      ai: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100",
      input: "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-200",
      display: "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-200",
    }
    return colors[category] || "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100"
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold tracking-tight">Orixakit</h1>
              <p className="text-muted-foreground mt-2">
                A production-ready shadcn-compatible component registry
              </p>
            </div>
            <div className="text-right">
              <Badge variant="outline" className="text-sm">
                11 Components
              </Badge>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-12">
        {/* Search and Filter */}
        <div className="space-y-6 mb-12">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search components..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.id)}
                className="gap-2"
              >
                <span>{category.icon}</span>
                {category.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-sm text-muted-foreground">
            Showing {filteredItems.length} of {REGISTRY_ITEMS.length} components
          </p>
        </div>

        {/* Components Grid */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <div
                key={item.name}
                className="group border rounded-lg p-6 hover:shadow-lg transition-all duration-200 bg-card hover:border-primary/50"
              >
                {/* Header */}
                <div className="mb-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-lg">{item.title}</h3>
                      <p className="text-xs text-muted-foreground font-mono">{item.name}</p>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-muted-foreground mb-4">{item.description}</p>

                {/* Categories */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {item.categories.map((cat) => (
                    <Badge
                      key={cat}
                      variant="secondary"
                      className={`text-xs ${getCategoryBadgeColor(cat)}`}
                    >
                      {cat}
                    </Badge>
                  ))}
                </div>

                {/* Install Command */}
                <div className="bg-muted/50 rounded p-3 mb-4 border border-border/50">
                  <p className="text-xs text-muted-foreground mb-2">Install:</p>
                  <code className="text-xs font-mono break-all">
                    npx shadcn@latest add @orixakit/{item.name}
                  </code>
                </div>

                {/* Copy Button */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleCopy(item.name)}
                  className="w-full gap-2"
                >
                  {copiedId === item.name ? (
                    <>
                      <Check className="h-4 w-4" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4" />
                      Copy Install Command
                    </>
                  )}
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No components found matching your search.</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t bg-muted/50 mt-12">
        <div className="container py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h4 className="font-semibold mb-4">About</h4>
              <p className="text-sm text-muted-foreground">
                Orixakit is a production-ready component registry built with shadcn/ui, Next.js, and TypeScript.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="https://ui.shadcn.com" className="text-primary hover:underline">
                    shadcn/ui
                  </a>
                </li>
                <li>
                  <a href="https://nextjs.org" className="text-primary hover:underline">
                    Next.js
                  </a>
                </li>
                <li>
                  <a href="https://tailwindcss.com" className="text-primary hover:underline">
                    Tailwind CSS
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Registry</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="/registry.json" className="text-primary hover:underline">
                    Registry JSON
                  </a>
                </li>
                <li>
                  <a href="https://github.com" className="text-primary hover:underline">
                    GitHub
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t pt-8 text-center text-sm text-muted-foreground">
            <p>© 2026 Orixakit. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
