import { z } from "zod"
import registry from "../../registry.json" assert { type: "json" }

export const listComponentsTool = {
  name: "list_orixakit_components",
  description:
    "List all available Orixakit registry items. Optionally filter by category: ui, blocks, hooks, ai.",
  schema: {
    category: z
      .enum(["ui", "blocks", "hooks", "ai", "all"])
      .optional()
      .default("all"),
  },
  handler: async ({ category }: { category: string }) => {
    const items =
      category === "all"
        ? registry.items
        : registry.items.filter((item) =>
            item.categories?.includes(category)
          )

    const text = items
      .map(
        (item) =>
          `• ${item.name} [${item.type}] — ${item.description}`
      )
      .join("\n")

    return {
      content: [
        {
          type: "text" as const,
          text: text || "No items found for that category.",
        },
      ],
    }
  },
}
