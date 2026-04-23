---
name: orixakit-blocks
description: Use this skill when the user wants to scaffold auth pages, dashboards, or sidebars using Orixakit blocks. Triggers on: orix-login-01, orix-dashboard-01, orix-sidebar-01, login block, dashboard block, @orixakit blocks.
---

# Orixakit Blocks

Full-page blocks. Each block installs as complete files into your app directory.

## Install

```bash
npx shadcn@latest add @orixakit/orix-login-01
npx shadcn@latest add @orixakit/orix-dashboard-01
npx shadcn@latest add @orixakit/orix-sidebar-01
```

Or use direct URLs:

```bash
npx shadcn@latest add https://orixakit.dev/r/orix-login-01.json
npx shadcn@latest add https://orixakit.dev/r/orix-dashboard-01.json
npx shadcn@latest add https://orixakit.dev/r/orix-sidebar-01.json
```

## orix-login-01

**Installs to:** `app/login/page.tsx` + `components/login-form.tsx`

**Includes:**
- Email/password input fields with icons
- Zod schema validation
- React Hook Form integration
- Loading state during submission
- Error message display
- Automatic form handling

**Auto-installed dependencies:** `zod`, `react-hook-form`, `@hookform/resolvers`

**Customization:**

```tsx
// In components/login-form.tsx, modify the onSubmit handler:
async function onSubmit(values: LoginSchema) {
  // Replace with your actual authentication logic
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(values),
  })
  
  if (!response.ok) {
    // Handle error
    console.error("Login failed")
  }
}
```

**Features:**
- Pre-configured form validation
- Accessible form inputs with labels
- Loading spinner during submission
- Error state handling
- Responsive layout

## orix-dashboard-01

**Installs to:** `app/dashboard/page.tsx` + `components/stats-card.tsx`

**Includes:**
- Responsive stats grid (2 columns on mobile, 4 on desktop)
- Stats card component with metrics
- Placeholder data for customization
- Hover elevation effects

**Customization:**

```tsx
// In app/dashboard/page.tsx, replace placeholder data:
export default function DashboardPage() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatsCard
        title="Total Revenue"
        value="$45,231.89"
        description="+20.1% from last month"
      />
      {/* Add more StatsCard components */}
    </div>
  )
}
```

**Features:**
- Mobile-first responsive design
- Hover effects on cards
- Easy data binding
- Consistent spacing

## orix-sidebar-01

**Installs to:** `components/sidebar.tsx`

**Includes:**
- Collapsible navigation sidebar
- Active link state highlighting
- User avatar slot
- Responsive behavior
- Toggle animation

**Usage:**

```tsx
import { Sidebar } from "@/components/sidebar"

export default function Layout({ children }) {
  const navItems = [
    { label: "Dashboard", href: "/dashboard", active: true },
    { label: "Analytics", href: "/analytics" },
    { label: "Reports", href: "/reports" },
    { label: "Settings", href: "/settings" },
  ]

  return (
    <div className="flex">
      <Sidebar 
        items={navItems}
        onNavigate={(href) => router.push(href)}
      />
      <main className="flex-1">
        {children}
      </main>
    </div>
  )
}
```

**Props:**
- `items?: NavItem[]` — Navigation items array
- `onNavigate?: (href: string) => void` — Callback when item clicked

**NavItem interface:**
```typescript
interface NavItem {
  label: string
  href: string
  active?: boolean
}
```

**Features:**
- Toggle collapse/expand
- Active state indicator
- User info footer
- Smooth transitions

## Common Patterns

### Complete App Layout with Sidebar

```tsx
import { Sidebar } from "@/components/sidebar"
import { useRouter } from "next/navigation"

export default function RootLayout({ children }) {
  const router = useRouter()

  const navItems = [
    { label: "Dashboard", href: "/dashboard", active: true },
    { label: "Analytics", href: "/analytics" },
    { label: "Reports", href: "/reports" },
    { label: "Settings", href: "/settings" },
  ]

  return (
    <html>
      <body>
        <Sidebar 
          items={navItems}
          onNavigate={(href) => router.push(href)}
        />
        {children}
      </body>
    </html>
  )
}
```

### Protected Routes with Login

```tsx
// middleware.ts
import { NextRequest, NextResponse } from "next/server"

export function middleware(request: NextRequest) {
  const token = request.cookies.get("auth_token")

  if (!token && request.nextUrl.pathname !== "/login") {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*", "/analytics/:path*"],
}
```

### Dashboard with Real Data

```tsx
import { StatsCard } from "@/components/stats-card"
import { useEffect, useState } from "react"

export default function DashboardPage() {
  const [stats, setStats] = useState(null)

  useEffect(() => {
    fetch("/api/stats")
      .then((res) => res.json())
      .then(setStats)
  }, [])

  if (!stats) return <div>Loading...</div>

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatsCard
        title="Total Revenue"
        value={`$${stats.revenue.toLocaleString()}`}
        description={`+${stats.revenueGrowth}% from last month`}
      />
      <StatsCard
        title="Active Users"
        value={stats.activeUsers.toLocaleString()}
        description={`+${stats.userGrowth}% from last month`}
      />
      {/* Add more cards */}
    </div>
  )
}
```
