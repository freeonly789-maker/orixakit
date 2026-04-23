import { z } from "zod"
import registry from "../../registry.json" assert { type: "json" }

export const searchComponentsTool = {
  name: "search_orixakit_components",
  description:
    "Search Orixakit components by keyword. Matches against name, title, description, and categories.",
  schema: {
    query: z.string().describe("Search keyword, e.g. 'login', 'button', 'ai'"),
  },
  handler: async ({ query }: { query: string }) => {
    const q = query.toLowerCase()
    const results = registry.items.filter(
      (item) =>
        item.name.toLowerCase().includes(q) ||
        item.title?.toLowerCase().includes(q) ||
        item.description?.toLowerCase().includes(q) ||
        item.categories?.some((c) => c.toLowerCase().includes(q))
    )

    if (!results.length) {
      return {
        content: [
          { type: "text" as const, text: `No results for "${query}".` },
        ],
      }
    }

    const text = results
      .map((i) => `• ${i.name} — ${i.description}`)
      .join("\n")

    return { content: [{ type: "text" as const, text }] }
  },
}
