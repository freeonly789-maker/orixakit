import { z } from "zod"
import registry from "../../registry.json" assert { type: "json" }

export const installHintTool = {
  name: "get_install_command",
  description:
    "Returns the exact CLI command to install one or more Orixakit components into a project.",
  schema: {
    names: z
      .array(z.string())
      .describe("Array of component names to install"),
  },
  handler: async ({ names }: { names: string[] }) => {
    const valid = names.filter((n) =>
      registry.items.some((i) => i.name === n)
    )
    const invalid = names.filter(
      (n) => !registry.items.some((i) => i.name === n)
    )

    const lines: string[] = []

    if (valid.length) {
      // Namespaced install (requires components.json configured)
      const namespaced = valid.map((n) => `@orixakit/${n}`).join(" ")
      lines.push(`# Option A — via namespace (add @orixakit to components.json first):`)
      lines.push(`npx shadcn@latest add ${namespaced}`)
      lines.push(``)
      // Direct URL install
      lines.push(`# Option B — direct URL (no config needed):`)
      valid.forEach((n) => {
        lines.push(`npx shadcn@latest add https://orixakit.dev/r/${n}.json`)
      })
    }

    if (invalid.length) {
      lines.push(``)
      lines.push(`# Not found in registry: ${invalid.join(", ")}`)
    }

    return { content: [{ type: "text" as const, text: lines.join("\n") }] }
  },
}
