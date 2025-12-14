/**
 * Mastra Instance Registration
 *
 * Registers all agents, tools, and workflows with Mastra framework.
 *
 * Current Registration:
 * - Agents: wcpAgent (WCP compliance auditor)
 *
 * Future Registration (planned):
 * - Workflows: wcpWorkflow (multi-document processing)
 * - Scorers: wcpScorers (evaluation framework)
 * - Memory: Agent memory for context
 *
 * @file src/mastra/index.ts
 * @see AGENTS.md - Mastra registration patterns
 * @see TODO.md - Future enhancements and roadmap
 *
 * Note: Future registration plans are documented in TODO.md
 */
// External dependencies
import { Mastra } from "@mastra/core";
// Internal dependencies
import { wcpAgent } from "./agents/wcp-agent.js";
/**
 * Mastra Instance
 *
 * Main Mastra instance for the WCP AI Agent Prototype.
 * Configured with agents, ready for extension with workflows and scorers.
 */
export const mastra = new Mastra({
    agents: { wcpAgent },
});
//# sourceMappingURL=index.js.map