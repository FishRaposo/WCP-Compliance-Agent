/**
 * Health Check Utility Tests
 * 
 * @file tests/unit/test_health_check.test.ts
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { checkHealth, isHealthy, waitForHealth } from '../../src/utils/health-check.js';

describe('Health Check Utility', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('checkHealth', () => {
    it('should return overall health status', async () => {
      const health = await checkHealth();
      
      expect(health).toHaveProperty('status');
      expect(health).toHaveProperty('checks');
      expect(health).toHaveProperty('timestamp');
      expect(health).toHaveProperty('uptime');
      expect(['healthy', 'degraded', 'unhealthy']).toContain(health.status);
    });

    it('should include system check', async () => {
      const health = await checkHealth();
      
      expect(health.checks).toHaveProperty('system');
      expect(health.checks.system).toHaveProperty('status');
      expect(health.checks.system).toHaveProperty('duration');
    });

    it('should include OpenAI check', async () => {
      const health = await checkHealth();
      
      expect(health.checks).toHaveProperty('openai');
      expect(health.checks.openai).toHaveProperty('status');
    });

    it('should include database check', async () => {
      const health = await checkHealth();
      
      expect(health.checks).toHaveProperty('database');
    });
  });

  describe('isHealthy', () => {
    it('should return boolean health status', async () => {
      const healthy = await isHealthy();
      
      expect(typeof healthy).toBe('boolean');
    });
  });

  describe('waitForHealth', () => {
    it('should resolve when system is healthy', async () => {
      const result = await waitForHealth(3, 10);
      
      expect(typeof result).toBe('boolean');
    });
  });
});
