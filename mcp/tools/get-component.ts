import { z } from "zod"
import { readFileSync, existsSync } from "fs"
import { join } from "path"
import registry from "../../registry.json" assert { type: "json" }

export const getComponentTool = {
  name: "get_orixakit_component",
  description:
    "Get full details for a specific Orixakit component by name. Returns metadata and file contents.",
  schema: {
    name: z.string().describe("The registry item name, e.g. orix-button"),
  },
  handler: async ({ name }: { name: string }) => {
    const item = registry.items.find((i) => i.name === name)
    if (!item) {
      return {
        content: [
          {
            type: "text" as const,
            text: `Component "${name}" not found in @orixakit registry.`,
          },
        ],
      }
    }

    // Try reading the built JSON from public/r
    const builtPath = join(process.cwd(), "public", "r", `${name}.json`)
    let builtJson = ""
    if (existsSync(builtPath)) {
      builtJson = readFileSync(builtPath, "utf-8")
    }

    return {
      content: [
        {
          type: "text" as const,
          text: JSON.stringify(
            {
              metadata: item,
              builtPayload: builtJson ? JSON.parse(builtJson) : null,
            },
            null,
            2
          ),
        },
      ],
    }
  },
}
