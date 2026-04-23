import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js"
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js"
import { listComponentsTool } from "./tools/list-components.js"
import { getComponentTool } from "./tools/get-component.js"
import { searchComponentsTool } from "./tools/search-components.js"
import { installHintTool } from "./tools/install-hint.js"

const server = new McpServer({
  name: "orixakit",
  version: "1.0.0",
  description:
    "Orixakit registry MCP server. Browse, search, and install @orixakit components.",
})

server.tool(
  listComponentsTool.name,
  listComponentsTool.description,
  listComponentsTool.schema,
  listComponentsTool.handler
)
server.tool(
  getComponentTool.name,
  getComponentTool.description,
  getComponentTool.schema,
  getComponentTool.handler
)
server.tool(
  searchComponentsTool.name,
  searchComponentsTool.description,
  searchComponentsTool.schema,
  searchComponentsTool.handler
)
server.tool(
  installHintTool.name,
  installHintTool.description,
  installHintTool.schema,
  installHintTool.handler
)

async function main() {
  const transport = new StdioServerTransport()
  await server.connect(transport)
  console.error("Orixakit MCP server running on stdio")
}

main()
