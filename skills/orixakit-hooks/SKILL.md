---
name: orixakit-hooks
description: Use this skill when the user needs React utility hooks from Orixakit: useLocalStorage, useDebounce, useMediaQuery. Trigger on any mention of @orixakit hooks or these hook names.
---

# Orixakit Hooks

Utility hooks for common React patterns.

## Install

```bash
npx shadcn@latest add @orixakit/use-local-storage
npx shadcn@latest add @orixakit/use-debounce
npx shadcn@latest add @orixakit/use-media-query
```

Or use direct URLs:

```bash
npx shadcn@latest add https://orixakit.dev/r/use-local-storage.json
npx shadcn@latest add https://orixakit.dev/r/use-debounce.json
npx shadcn@latest add https://orixakit.dev/r/use-media-query.json
```

## useLocalStorage

Type-safe localStorage hook with SSR safety and JSON serialization.

**Signature:**
```typescript
function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((prev: T) => T)) => void, () => void]
```

**Returns:**
- `[value, setValue, removeValue]`
- SSR-safe: reads from localStorage on mount only
- Serializes with JSON automatically

**Usage:**

```tsx
import { useLocalStorage } from "@/hooks/use-local-storage"

// Basic usage
const [theme, setTheme, removeTheme] = useLocalStorage<"light" | "dark">(
  "theme",
  "light"
)

// With component
export function ThemeToggle() {
  const [theme, setTheme] = useLocalStorage<"light" | "dark">("theme", "light")

  return (
    <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
      Current theme: {theme}
    </button>
  )
}

// With updater function
const [count, setCount] = useLocalStorage("count", 0)
setCount((prev) => prev + 1)

// Remove value
removeTheme()
```

**Features:**
- Type-safe with TypeScript generics
- SSR-safe (no hydration mismatch)
- Automatic JSON serialization/deserialization
- Error handling with console warnings
- Supports updater functions like useState

## useDebounce

Debounce any value or callback with configurable delay.

**Signature:**
```typescript
function useDebounce<T>(value: T, delay?: number): T
```

**Parameters:**
- `value` — Value to debounce
- `delay` — Debounce delay in milliseconds (default: 300)

**Returns:**
- Debounced value

**Usage:**

```tsx
import { useDebounce } from "@/hooks/use-debounce"
import { useEffect, useState } from "react"

// Search input with debounced API call
export function SearchUsers() {
  const [searchQuery, setSearchQuery] = useState("")
  const [results, setResults] = useState([])
  const debouncedSearch = useDebounce(searchQuery, 400)

  useEffect(() => {
    if (debouncedSearch) {
      fetch(`/api/users/search?q=${debouncedSearch}`)
        .then((res) => res.json())
        .then(setResults)
    }
  }, [debouncedSearch])

  return (
    <div>
      <input
        type="text"
        placeholder="Search users..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <ul>
        {results.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  )
}
```

**Common Patterns:**

```tsx
// Debounce form input
const [formValue, setFormValue] = useState("")
const debouncedFormValue = useDebounce(formValue, 500)

useEffect(() => {
  // Save to database
  saveFormData(debouncedFormValue)
}, [debouncedFormValue])

// Debounce window resize
const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })
const debouncedSize = useDebounce(windowSize, 300)

useEffect(() => {
  const handleResize = () => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    })
  }

  window.addEventListener("resize", handleResize)
  return () => window.removeEventListener("resize", handleResize)
}, [])
```

## useMediaQuery

Reactive media query hook. SSR-safe.

**Signature:**
```typescript
function useMediaQuery(query: string): boolean
```

**Parameters:**
- `query` — CSS media query string (e.g., "(max-width: 768px)")

**Returns:**
- `boolean` — Whether the media query matches

**Usage:**

```tsx
import { useMediaQuery } from "@/hooks/use-media-query"

// Responsive layout
export function ResponsiveLayout() {
  const isMobile = useMediaQuery("(max-width: 768px)")
  const isTablet = useMediaQuery("(max-width: 1024px)")

  return (
    <div>
      {isMobile && <MobileNav />}
      {!isMobile && <DesktopNav />}
    </div>
  )
}

// Dark mode preference
export function DarkModeToggle() {
  const prefersDark = useMediaQuery("(prefers-color-scheme: dark)")

  return (
    <button>
      {prefersDark ? "🌙 Dark Mode" : "☀️ Light Mode"}
    </button>
  )
}

// Landscape orientation
export function OrientationDetector() {
  const isLandscape = useMediaQuery("(orientation: landscape)")

  return (
    <div>
      {isLandscape ? "Landscape" : "Portrait"}
    </div>
  )
}
```

**Common Media Queries:**

```tsx
// Breakpoints
const isMobile = useMediaQuery("(max-width: 640px)")
const isTablet = useMediaQuery("(max-width: 1024px)")
const isDesktop = useMediaQuery("(min-width: 1025px)")

// Device features
const prefersDark = useMediaQuery("(prefers-color-scheme: dark)")
const prefersLight = useMediaQuery("(prefers-color-scheme: light)")
const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)")

// Orientation
const isPortrait = useMediaQuery("(orientation: portrait)")
const isLandscape = useMediaQuery("(orientation: landscape)")

// Touch capability
const isTouchDevice = useMediaQuery("(hover: none)")
const hasHover = useMediaQuery("(hover: hover)")
```

**Features:**
- SSR-safe (returns false initially)
- Reactive updates on media query changes
- Automatic event listener cleanup
- No external dependencies

## Common Patterns

### Responsive Component

```tsx
import { useMediaQuery } from "@/hooks/use-media-query"

export function ResponsiveGrid() {
  const isMobile = useMediaQuery("(max-width: 640px)")
  const isTablet = useMediaQuery("(max-width: 1024px)")

  const cols = isMobile ? 1 : isTablet ? 2 : 4

  return (
    <div style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
      {/* Grid items */}
    </div>
  )
}
```

### Search with Debounce and LocalStorage

```tsx
import { useLocalStorage } from "@/hooks/use-local-storage"
import { useDebounce } from "@/hooks/use-debounce"
import { useEffect, useState } from "react"

export function SearchWithHistory() {
  const [query, setQuery] = useState("")
  const [history, setHistory, clearHistory] = useLocalStorage<string[]>(
    "search_history",
    []
  )
  const debouncedQuery = useDebounce(query, 300)

  useEffect(() => {
    if (debouncedQuery && !history.includes(debouncedQuery)) {
      setHistory([debouncedQuery, ...history.slice(0, 9)])
    }
  }, [debouncedQuery])

  return (
    <div>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
      />
      <div>
        {history.map((item) => (
          <button key={item} onClick={() => setQuery(item)}>
            {item}
          </button>
        ))}
        <button onClick={clearHistory}>Clear History</button>
      </div>
    </div>
  )
}
```

### Adaptive UI Based on Device

```tsx
import { useMediaQuery } from "@/hooks/use-media-query"

export function AdaptiveUI() {
  const isMobile = useMediaQuery("(max-width: 768px)")
  const prefersDark = useMediaQuery("(prefers-color-scheme: dark)")
  const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)")

  return (
    <div
      style={{
        backgroundColor: prefersDark ? "#1a1a1a" : "#ffffff",
        animation: prefersReducedMotion ? "none" : "fadeIn 0.3s",
        padding: isMobile ? "1rem" : "2rem",
      }}
    >
      {isMobile ? <MobileLayout /> : <DesktopLayout />}
    </div>
  )
}
```
