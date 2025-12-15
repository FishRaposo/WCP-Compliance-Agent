/**
 * Configuration Tests
 * 
 * @file tests/unit/test_config.test.ts
 */

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { getAgentConfig, DEFAULT_AGENT_CONFIG } from '../../src/config/agent-config.js';
import { getDatabaseConfig, DEFAULT_DATABASE_CONFIG } from '../../src/config/db-config.js';
import { getAppConfig, DEFAULT_APP_CONFIG } from '../../src/config/app-config.js';

describe('Configuration', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  describe('Agent Configuration', () => {
    it('should return default config when no env vars set', () => {
      const config = getAgentConfig();
      
      expect(config.model).toBe(DEFAULT_AGENT_CONFIG.model);
      expect(config.maxSteps).toBe(DEFAULT_AGENT_CONFIG.maxSteps);
    });

    it('should use environment variables when set', () => {
      process.env.OPENAI_MODEL = 'gpt-4';
      process.env.MAX_STEPS = '5';
      
      const config = getAgentConfig();
      
      expect(config.model).toBe('gpt-4');
      expect(config.maxSteps).toBe(5);
    });
  });

  describe('Database Configuration', () => {
    it('should return default config when no env vars set', () => {
      const config = getDatabaseConfig();
      
      expect(config.url).toBe(DEFAULT_DATABASE_CONFIG.url);
      expect(config.maxConnections).toBe(DEFAULT_DATABASE_CONFIG.maxConnections);
    });

    it('should use DATABASE_URL when set', () => {
      process.env.DATABASE_URL = 'file:./custom.db';
      
      const config = getDatabaseConfig();
      
      expect(config.url).toBe('file:./custom.db');
    });
  });

  describe('Application Configuration', () => {
    it('should return config based on NODE_ENV', () => {
      const config = getAppConfig();
      
      // In test environment, NODE_ENV is typically 'test'
      expect(['development', 'test', 'staging', 'production']).toContain(config.environment);
      expect(config.api.port).toBe(3000);
    });

    it('should use environment variables when set', () => {
      process.env.NODE_ENV = 'production';
      process.env.PORT = '8080';
      
      const config = getAppConfig();
      
      expect(config.environment).toBe('production');
      expect(config.api.port).toBe(8080);
    });

    it('should enable observability in production', () => {
      process.env.NODE_ENV = 'production';
      
      const config = getAppConfig();
      
      expect(config.observability.enabled).toBe(true);
      expect(config.features.observability).toBe(true);
    });
  });
});
