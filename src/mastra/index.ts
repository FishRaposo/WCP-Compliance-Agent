/**
 * Mastra Instance Registration
 * 
 * Registers all agents, tools, and workflows with Mastra framework.
 * Includes Phase 1 enhancements:
 * - PinoLogger for structured logging
 * - LibSQLStore for persistent storage
 * - Observability for AI tracing
 * 
 * Current Registration:
 * - Agents: wcpAgent (WCP compliance auditor)
 * - Logger: PinoLogger (structured logging)
 * - Storage: LibSQLStore (SQLite storage)
 * - Observability: AI tracing for production monitoring
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
import { PinoLogger } from "@mastra/loggers";
import { LibSQLStore } from "@mastra/libsql";
import { mkdirSync } from "fs";
import { dirname } from "path";

// Internal dependencies
import { wcpAgent } from "./agents/wcp-agent.js";
import { getDatabaseConfig } from "../config/db-config.js";
import { getAppConfig } from "../config/app-config.js";

/**
 * Get database configuration for storage
 */
const dbConfig = getDatabaseConfig();

/**
 * Get application configuration for observability
 */
const appConfig = getAppConfig();

/**
 * Determine if we're in development mode
 */
const isDev = appConfig.environment === 'development' || appConfig.environment === 'test';

/**
 * Ensure database directory exists
 * LibSQLStore requires the directory to exist before creating the database file
 */
function ensureDatabaseDirectory(dbUrl: string): void {
  // Extract directory from file:// URL or path
  const match = dbUrl.match(/^file:(.+)$/);
  if (match) {
    const dbPath = match[1];
    const dir = dirname(dbPath);
    try {
      mkdirSync(dir, { recursive: true });
    } catch (error) {
      // Directory might already exist, ignore error
    }
  }
}

// Ensure database directory exists before creating storage
ensureDatabaseDirectory(dbConfig.url);

/**
 * Mastra Instance
 * 
 * Main Mastra instance for the WCP AI Agent Prototype.
 * Configured with:
 * - Agents: wcpAgent for WCP compliance validation
 * - Logger: PinoLogger for structured, searchable logs
 * - Storage: LibSQLStore for persistent audit trail
 * - Observability: Enabled in production for AI tracing
 */
export const mastra = new Mastra({
  agents: { wcpAgent },
  
  // Structured logging with Pino
  logger: new PinoLogger({
    level: (process.env.LOG_LEVEL as any) || 'info',
  }),
  
  // Persistent storage with SQLite
  storage: new LibSQLStore({
    url: dbConfig.url,
  }),
});
