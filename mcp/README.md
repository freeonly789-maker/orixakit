# Orixakit MCP Server

The Orixakit MCP server lets AI coding assistants (Claude Code, Cursor, Windsurf, Copilot, etc.) browse, search, and install @orixakit components without leaving their chat.

## Available Tools

| Tool | What it does |
|---|---|
| `list_orixakit_components` | List all items, optionally filtered by category |
| `get_orixakit_component` | Get full metadata + file contents for one item |
| `search_orixakit_components` | Full-text search across names, descriptions, categories |
| `get_install_command` | Get the exact `npx shadcn add` command for any item |

## Connect via Claude Code

Add to your Claude Code MCP config (`~/.claude/claude_desktop_config.json`):

```json
{
  "mcpServers": {
    "orixakit": {
      "command": "npx",
      "args": ["-y", "tsx", "https://raw.githubusercontent.com/YOU/orixakit/main/mcp/server.ts"]
    }
  }
}
```

## Connect via Cursor / Windsurf

Add to `.cursor/mcp.json` or `.windsurf/mcp.json`:

```json
{
  "orixakit": {
    "command": "npx",
    "args": ["-y", "tsx", "./mcp/server.ts"]
  }
}
```

## Example Prompts

- "List all Orixakit AI components"
- "Show me the orix-login-01 block details"
- "Search for dashboard components in Orixakit"
- "Give me the install command for orix-chat-input and use-debounce"
