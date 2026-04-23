# Contributing to Orixakit

Thank you for your interest in contributing to Orixakit! This guide will help you understand how to add new components or improve existing ones.

## 📋 Before You Start

- Ensure your component follows the [shadcn/ui design philosophy](https://ui.shadcn.com/docs/philosophy)
- Components should be **composable**, **accessible**, and **production-ready**
- Review existing components to understand our patterns and conventions
- Check [open issues](https://github.com/yourusername/orixakit/issues) to avoid duplicates

## 🏗️ Component Structure

All components follow this directory structure:

```
registry/new-york/{category}/{component-name}/
├── component-name.tsx          # Main component file
├── component-name.stories.tsx  # (Optional) Storybook stories
└── README.md                   # (Optional) Component documentation
```

### Categories

- **ui/** — UI primitives (buttons, inputs, cards, etc.)
- **blocks/** — Full-page blocks (login forms, dashboards, etc.)
- **hooks/** — React hooks
- **ai/** — AI-powered components

## 📝 Component Guidelines

### 1. Component File

Create a component that extends shadcn/ui components:

```tsx
/**
 * MyComponent
 * Brief description of what this component does.
 * @orixakit/my-component
 */
"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface MyComponentProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Description of prop */
  variant?: "default" | "outline"
  /** Description of prop */
  size?: "sm" | "md" | "lg"
}

export function MyComponent({
  variant = "default",
  size = "md",
  className,
  ...props
}: MyComponentProps) {
  return (
    <div
      className={cn(
        "my-component",
        variant === "default" && "bg-primary text-primary-foreground",
        variant === "outline" && "border border-primary",
        size === "sm" && "px-2 py-1",
        size === "md" && "px-4 py-2",
        size === "lg" && "px-6 py-3",
        className
      )}
      {...props}
    />
  )
}
```

### 2. Update registry.json

Add your component to `registry.json`:

```json
{
  "name": "my-component",
  "type": "registry:ui",
  "title": "My Component",
  "description": "A brief description of what this component does.",
  "registryDependencies": ["button", "card"],
  "files": [
    {
      "path": "registry/new-york/ui/my-component/my-component.tsx",
      "type": "registry:ui"
    }
  ],
  "categories": ["ui", "primitives"]
}
```

### 3. Build Registry

Generate the registry JSON:

```bash
pnpm exec shadcn build
```

This creates `public/r/my-component.json` with your component's full definition.

## ✅ Code Style

### TypeScript
- Use strict TypeScript with proper types
- Export interfaces for component props
- Use `React.ReactNode` for flexible content slots

### React
- Use functional components with hooks
- Prefer composition over inheritance
- Keep components focused and single-responsibility

### Tailwind CSS
- Use Tailwind utilities for styling
- Leverage design tokens from `index.css`
- Avoid inline styles
- Use `cn()` utility for conditional classes

### Accessibility
- Include `aria-*` attributes where appropriate
- Ensure keyboard navigation works
- Test with screen readers
- Follow [WAI-ARIA practices](https://www.w3.org/WAI/ARIA/apg/)

### Documentation
- Add JSDoc comments to components
- Document all props with descriptions
- Include usage examples in comments
- Explain complex logic

## 🔍 Testing

Before submitting:

1. **Type Check**
   ```bash
   pnpm exec tsc --noEmit
   ```

2. **Build Registry**
   ```bash
   pnpm exec shadcn build
   ```

3. **Verify JSON**
   ```bash
   node -e "const r = require('./public/r/my-component.json'); console.log(r.name);"
   ```

4. **Manual Testing**
   - Test in the dev server
   - Test on mobile
   - Test with keyboard navigation
   - Test with screen readers

## 📤 Submitting a Pull Request

1. **Fork the repository**
   ```bash
   git clone https://github.com/yourusername/orixakit.git
   cd orixakit
   ```

2. **Create a feature branch**
   ```bash
   git checkout -b feat/my-component
   ```

3. **Make your changes**
   - Add component files
   - Update `registry.json`
   - Build registry: `pnpm exec shadcn build`
   - Test thoroughly

4. **Commit with clear messages**
   ```bash
   git add .
   git commit -m "feat: add my-component

   - Adds MyComponent with variant and size props
   - Includes accessibility features
   - Follows shadcn/ui patterns"
   ```

5. **Push and create PR**
   ```bash
   git push origin feat/my-component
   ```

6. **Fill out the PR template**
   - Describe what your component does
   - Link any related issues
   - Explain design decisions
   - Include screenshots/demos if applicable

## 🎯 PR Review Checklist

Your PR will be reviewed for:

- ✅ **Functionality** — Does the component work as intended?
- ✅ **Code Quality** — Is the code clean and maintainable?
- ✅ **Accessibility** — Is it accessible to all users?
- ✅ **Documentation** — Is it well-documented?
- ✅ **Consistency** — Does it follow Orixakit patterns?
- ✅ **Tests** — Does it pass all checks?
- ✅ **Performance** — Is it performant?

## 🚀 Component Ideas

We're always looking for new components! Here are some ideas:

### UI Primitives
- Advanced form inputs (date picker, time picker, color picker)
- Data display (table, pagination, breadcrumb)
- Feedback (toast, alert, modal)
- Navigation (tabs, menu, dropdown)

### Blocks
- Authentication (signup, password reset, 2FA)
- Ecommerce (product card, cart, checkout)
- Analytics (charts, metrics, reports)
- Settings (profile, preferences, account)

### Hooks
- Form handling (useForm, useFormState)
- Data fetching (useFetch, useQuery)
- State management (useAsync, useReducer)
- Performance (useMemoized, useCallbackRef)

### AI Components
- Streaming text display
- AI-powered search
- Suggestion UI
- Prompt builder

## 📚 Resources

- [shadcn/ui Documentation](https://ui.shadcn.com)
- [Radix UI Primitives](https://www.radix-ui.com)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [React Docs](https://react.dev)
- [WAI-ARIA Practices](https://www.w3.org/WAI/ARIA/apg/)

## 🤔 Questions?

- **Issues:** [GitHub Issues](https://github.com/yourusername/orixakit/issues)
- **Discussions:** [GitHub Discussions](https://github.com/yourusername/orixakit/discussions)
- **Email:** hello@orixakit.dev

---

**Thank you for contributing to Orixakit! 🎉**
