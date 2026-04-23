---
name: orixakit-components
description: Use this skill whenever the user wants to use, install, or learn about Orixakit UI primitive components: OrixButton, OrixInput, OrixCard. Trigger on any mention of @orixakit primitives, installing orix-button, orix-input, or orix-card, or building UI with Orixakit.
---

# Orixakit UI Components

## Install

```bash
# Namespace method (requires components.json setup — see below)
npx shadcn@latest add @orixakit/orix-button
npx shadcn@latest add @orixakit/orix-input
npx shadcn@latest add @orixakit/orix-card

# Direct URL method (no config needed)
npx shadcn@latest add https://orixakit.dev/r/orix-button.json
npx shadcn@latest add https://orixakit.dev/r/orix-input.json
npx shadcn@latest add https://orixakit.dev/r/orix-card.json
```

## Configure namespace in components.json

```json
{
  "registries": {
    "@orixakit": "https://orixakit.dev/r/{name}.json"
  }
}
```

## OrixButton

Extended button component with loading state, icon support, and full-width option.

```tsx
import { OrixButton } from "@/components/ui/orix-button"
import { Send } from "lucide-react"

// With loading state
<OrixButton loading>Submitting...</OrixButton>

// With left icon
<OrixButton leftIcon={<Send className="h-4 w-4" />}>Send</OrixButton>

// With right icon
<OrixButton rightIcon={<Send className="h-4 w-4" />}>Send</OrixButton>

// Full width
<OrixButton fullWidth variant="outline">Cancel</OrixButton>

// All variants combined
<OrixButton 
  loading={isLoading}
  leftIcon={<Send className="h-4 w-4" />}
  fullWidth
  variant="default"
>
  Submit
</OrixButton>
```

**Props:**
- `loading?: boolean` — Shows spinner and disables button
- `leftIcon?: React.ReactNode` — Icon before text
- `rightIcon?: React.ReactNode` — Icon after text
- `fullWidth?: boolean` — Makes button 100% width
- All standard shadcn Button props (variant, size, disabled, etc.)

## OrixInput

Input component with integrated label, error state, and optional icon slot.

```tsx
import { OrixInput } from "@/components/ui/orix-input"
import { Mail, Lock } from "lucide-react"

// Basic usage
<OrixInput
  label="Email"
  type="email"
  placeholder="you@example.com"
/>

// With icon
<OrixInput
  label="Email"
  type="email"
  placeholder="you@example.com"
  icon={<Mail className="h-4 w-4" />}
/>

// With error state
<OrixInput
  label="Password"
  type="password"
  placeholder="••••••••"
  icon={<Lock className="h-4 w-4" />}
  error="Password must be at least 6 characters"
/>
```

**Props:**
- `label?: string` — Label text displayed above input
- `error?: string` — Error message displayed below input
- `icon?: React.ReactNode` — Icon displayed inside input (left side)
- All standard HTML input attributes (type, placeholder, value, onChange, etc.)

## OrixCard

Card component with header slot, body, and optional footer. Supports hover elevation.

```tsx
import { OrixCard } from "@/components/ui/orix-card"

// Basic usage
<OrixCard title="Revenue" description="Last 30 days">
  <p className="text-2xl font-bold">$12,400</p>
</OrixCard>

// With hover effect
<OrixCard 
  title="Analytics" 
  description="Monthly overview"
  hover
>
  <p>Your content here</p>
</OrixCard>

// With footer
<OrixCard 
  title="Settings" 
  footer={<button>Save</button>}
>
  <input type="text" placeholder="Setting value" />
</OrixCard>

// All features combined
<OrixCard
  title="User Profile"
  description="Update your information"
  hover
  footer={<button className="w-full">Update Profile</button>}
>
  <div className="space-y-4">
    <input type="text" placeholder="Name" />
    <input type="email" placeholder="Email" />
  </div>
</OrixCard>
```

**Props:**
- `title?: string` — Card title
- `description?: string` — Card subtitle/description
- `hover?: boolean` — Adds hover elevation effect
- `footer?: React.ReactNode` — Content for footer section
- All standard HTML div attributes

## Common Patterns

### Form Inputs with Validation

```tsx
import { OrixInput } from "@/components/ui/orix-input"
import { OrixButton } from "@/components/ui/orix-button"
import { useState } from "react"

export function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      // Validate and submit
      await submitLogin({ email, password })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <OrixInput
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={errors.email}
      />
      <OrixInput
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={errors.password}
      />
      <OrixButton type="submit" fullWidth loading={loading}>
        Sign In
      </OrixButton>
    </form>
  )
}
```

### Stats Dashboard

```tsx
import { OrixCard } from "@/components/ui/orix-card"

export function StatsDashboard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <OrixCard title="Total Revenue" description="Last 30 days" hover>
        <p className="text-2xl font-bold">$45,231.89</p>
        <p className="text-xs text-muted-foreground mt-2">+20.1% from last month</p>
      </OrixCard>
      <OrixCard title="Active Users" description="This month" hover>
        <p className="text-2xl font-bold">2,543</p>
        <p className="text-xs text-muted-foreground mt-2">+12% from last month</p>
      </OrixCard>
    </div>
  )
}
```
