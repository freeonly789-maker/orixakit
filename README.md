# Orixakit Registry

A production-ready **shadcn-compatible component registry** with 11 carefully crafted components spanning UI primitives, blocks, hooks, and AI-powered components.

**Live Demo:** [orixakit.dev](https://orixakit.dev)

---

## 📦 What's Included

### UI Primitives (3)
- **OrixButton** — Extended button with loading state, icon support, and full-width option
- **OrixInput** — Input with integrated label, error state, and icon slot
- **OrixCard** — Card with header slot, body, and optional footer with hover elevation

### Blocks (3)
- **orix-login-01** — Email + password login form with validation and error handling
- **orix-dashboard-01** — Stats grid with responsive 2/4-column layout
- **orix-sidebar-01** — Collapsible sidebar with nav links and active state

### Hooks (3)
- **useLocalStorage** — Type-safe localStorage hook with SSR safety
- **useDebounce** — Debounce any value with configurable delay
- **useMediaQuery** — Reactive media query hook (SSR-safe)

### AI Components (2)
- **OrixChatInput** — Textarea-based chat input with Cmd+Enter shortcut
- **OrixAiCard** — Streaming-ready card for AI responses with copy button

---

## 🚀 Quick Start

### Install Components

**Option 1: Via namespace (requires components.json setup)**
```bash
npx shadcn@latest add @orixakit/orix-button
npx shadcn@latest add @orixakit/orix-input
npx shadcn@latest add @orixakit/orix-card
```

**Option 2: Direct URL (no config needed)**
```bash
npx shadcn@latest add https://orixakit.dev/r/orix-button.json
npx shadcn@latest add https://orixakit.dev/r/orix-input.json
npx shadcn@latest add https://orixakit.dev/r/orix-card.json
```

### Configure Namespace (Optional)

Add to your `components.json`:
```json
{
  "registries": {
    "@orixakit": "https://orixakit.dev/r/{name}.json"
  }
}
```

Then install with:
```bash
npx shadcn@latest add @orixakit/orix-button
```

---

## 📚 Documentation

Each component has a dedicated documentation page with:
- **Props documentation** — Complete prop tables with types and descriptions
- **Code examples** — Ready-to-use code snippets
- **Installation commands** — Copy-paste ready commands
- **Usage patterns** — Common use cases and patterns

Visit the [component registry](https://orixakit.dev) to explore all components.

---

## 🛠️ Development

### Prerequisites
- Node.js 18+
- pnpm 10+

### Setup

```bash
# Clone the repository
git clone https://github.com/yourusername/orixakit.git
cd orixakit

# Install dependencies
pnpm install

# Start dev server
pnpm dev

# Build registry
pnpm exec shadcn build

# Start MCP server
pnpm mcp:server
```

### Project Structure

```
orixakit/
├── client/                 # Frontend React app
│   ├── src/
│   │   ├── pages/         # Page components
│   │   ├── components/    # Reusable components
│   │   └── App.tsx        # Main app with routing
│   └── index.html
├── registry/              # Component source files
│   └── new-york/
│       ├── ui/            # UI primitives
│       ├── blocks/        # Full-page blocks
│       ├── hooks/         # React hooks
│       └── ai/            # AI components
├── mcp/                   # MCP server
│   ├── server.ts
│   └── tools/
├── skills/                # AI skills documentation
├── public/r/              # Built registry JSON files
├── registry.json          # Registry definition
└── package.json
```

---

## 🔄 Automated Builds

This repository uses GitHub Actions to automatically build and validate the registry on every push.

### Workflows

**Build Registry** (`.github/workflows/build-registry.yml`)
- Runs on push to `main` when registry files change
- Tests on Node.js 18.x and 20.x
- Validates registry schema
- Generates registry JSON files
- Uploads artifacts

**Deployment** (`.github/workflows/deploy.yml`)
- Deploys to production on successful build
- Updates registry JSON in `public/r/`
- Publishes to npm (optional)

---

## 🤖 MCP Server

The Orixakit MCP server lets AI coding assistants browse and install components without leaving their chat.

### Available Tools

| Tool | Purpose |
|------|---------|
| `list_orixakit_components` | List all components, optionally filtered by category |
| `get_orixakit_component` | Get full metadata and file contents for a component |
| `search_orixakit_components` | Full-text search across names, descriptions, categories |
| `get_install_command` | Get exact install command for any component |

### Connect MCP Server

**Claude Code:**
```json
{
  "mcpServers": {
    "orixakit": {
      "command": "npx",
      "args": ["-y", "tsx", "https://raw.githubusercontent.com/yourusername/orixakit/main/mcp/server.ts"]
    }
  }
}
```

**Cursor / Windsurf:**
```json
{
  "orixakit": {
    "command": "npx",
    "args": ["-y", "tsx", "./mcp/server.ts"]
  }
}
```

---

## 🎓 Skills

Orixakit includes AI skills that guide LLMs on using components effectively:

- **orixakit-components** — UI primitives usage guide
- **orixakit-blocks** — Full-page blocks implementation guide
- **orixakit-hooks** — React hooks usage patterns
- **orixakit-ai** — AI component implementation guide

---

## 📋 Registry API

### Get All Components
```bash
curl https://orixakit.dev/registry.json
```

### Get Single Component
```bash
curl https://orixakit.dev/r/orix-button.json
```

### Response Format
```json
{
  "$schema": "https://ui.shadcn.com/schema/registry-item.json",
  "name": "orix-button",
  "title": "Orix Button",
  "description": "Extended button with loading state...",
  "type": "registry:ui",
  "files": [
    {
      "path": "registry/new-york/ui/orix-button/orix-button.tsx",
      "content": "..."
    }
  ],
  "categories": ["ui", "primitives"]
}
```

---

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on:
- Adding new components
- Updating existing components
- Submitting pull requests
- Code style and conventions

### Adding a Component

1. Create component files in `registry/new-york/{category}/{name}/`
2. Add entry to `registry.json`
3. Run `pnpm exec shadcn build` to generate JSON
4. Submit pull request with description

---

## 📝 License

MIT © 2026 Orixakit

---

## 🔗 Links

- **Website:** [orixakit.dev](https://orixakit.dev)
- **GitHub:** [github.com/yourusername/orixakit](https://github.com/yourusername/orixakit)
- **Registry JSON:** [orixakit.dev/registry.json](https://orixakit.dev/registry.json)
- **shadcn/ui:** [ui.shadcn.com](https://ui.shadcn.com)
- **MCP Spec:** [modelcontextprotocol.io](https://modelcontextprotocol.io)

---

## 💡 Support

- **Issues:** [GitHub Issues](https://github.com/yourusername/orixakit/issues)
- **Discussions:** [GitHub Discussions](https://github.com/yourusername/orixakit/discussions)
- **Twitter:** [@orixakit](https://twitter.com/orixakit)

---

**Built with ❤️ using React, TypeScript, Tailwind CSS, and shadcn/ui**
