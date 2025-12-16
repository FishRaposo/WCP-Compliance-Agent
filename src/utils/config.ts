/**
 * Configuration Management Utility
 * 
 * Provides centralized configuration management with validation and type safety.
 * Implements 12-factor app configuration principles.
 * 
 * @file src/utils/config.ts
 * @see AGENTS.md for coding patterns
 * @see CONTEXT.md for architecture decisions
 */

import { z } from 'zod';

// Configuration schema with validation
const ConfigSchema = z.object({
  // OpenAI Configuration
  openai: z.object({
    apiKey: z.string().min(1, 'OPENAI_API_KEY is required'),
    model: z.string().default('gpt-5-nano'),
    maxTokens: z.number().min(100).max(8000).default(2000),
  }),
  
  // Server Configuration
  server: z.object({
    port: z.number().min(1).max(65535).default(3000),
    host: z.string().default('localhost'),
    environment: z.enum(['development', 'staging', 'production', 'test']).default('development'),
  }),
  
  // Agent Configuration
  agent: z.object({
    maxSteps: z.number().min(1).max(10).default(3),
    timeout: z.number().min(1000).max(60000).default(30000),
  }),
  
  // Logging Configuration
  logging: z.object({
    level: z.enum(['error', 'warn', 'info', 'debug']).default('info'),
    format: z.enum(['json', 'text']).default('json'),
  }),
});

export type Config = z.infer<typeof ConfigSchema>;

/**
 * Load and validate configuration from environment variables
 * @returns Validated configuration object
 * @throws Error if configuration validation fails
 */
export function loadConfig(): Config {
  const config = {
    openai: {
      apiKey: process.env.OPENAI_API_KEY,
      model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
      maxTokens: parseInt(process.env.OPENAI_MAX_TOKENS || '2000', 10),
    },
    server: {
      port: parseInt(process.env.PORT || '3000', 10),
      host: process.env.HOST || 'localhost',
      environment: (process.env.NODE_ENV || 'development') as 'development' | 'staging' | 'production',
    },
    agent: {
      maxSteps: parseInt(process.env.MAX_STEPS || '3', 10),
      timeout: parseInt(process.env.AGENT_TIMEOUT || '30000', 10),
    },
    logging: {
      level: (process.env.LOG_LEVEL || 'info') as 'error' | 'warn' | 'info' | 'debug',
      format: (process.env.LOG_FORMAT || 'json') as 'json' | 'text',
    },
  };

  // Validate configuration
  const result = ConfigSchema.safeParse(config);
  
  if (!result.success) {
    const errors = result.error.issues
      .map(issue => `${issue.path.join('.')}: ${issue.message}`)
      .join('\n');
    
    throw new Error(`Configuration validation failed:\n${errors}`);
  }

  return result.data;
}

/**
 * Get configuration instance (singleton pattern)
 */
let configInstance: Config | null = null;

export function getConfig(): Config {
  if (!configInstance) {
    configInstance = loadConfig();
  }
  return configInstance;
}

/**
 * Reset configuration (useful for testing)
 */
export function resetConfig(): void {
  configInstance = null;
}
