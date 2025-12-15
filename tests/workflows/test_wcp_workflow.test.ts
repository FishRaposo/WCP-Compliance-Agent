/**
 * Workflow Tests - WCP Processing Workflow
 * 
 * Tests complete end-to-end workflows across multiple components.
 * 
 * @file tests/workflows/test_wcp_workflow.test.ts
 * @see EVALS.md for testing strategy
 * @see AGENTS.md for test patterns
 * @see WORKFLOW.md for workflow definitions
 */

import { describe, it, expect } from '@jest/globals';
import { processWCP, processWCPsBulk } from '../../src/services/wcp-service.js';
import { validateWCPFormat } from '../../src/services/wcp-service.js';
import { getWCPStats } from '../../src/services/wcp-service.js';

describe('WCP Processing Workflow', () => {
  describe('Single WCP Processing', () => {
    it('should process valid WCP (Approved workflow)', async () => {
      const content = 'Role: Electrician, Hours: 40, Wage: $55.00';
      
      const result = await processWCP(content);
      
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.status).toBe('Approved');
        expect(result.data.findings).toHaveLength(0);
        expect(result.data.explanation).toBeTruthy();
        expect(result.data.trace).toBeInstanceOf(Array);
        expect(result.data.health).toBeDefined();
      }
    });

    it('should process WCP with overtime (Revise workflow)', async () => {
      const content = 'Role: Electrician, Hours: 45, Wage: $55.00';
      
      const result = await processWCP(content);
      
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.status).toBe('Revise');
        expect(result.data.findings).toContainEqual(
          expect.objectContaining({ type: 'Overtime' })
        );
      }
    });

    it('should process underpaid WCP (Reject workflow)', async () => {
      const content = 'Role: Electrician, Hours: 40, Wage: $30.00';
      
      const result = await processWCP(content);
      
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.status).toBe('Reject');
        expect(result.data.findings).toContainEqual(
          expect.objectContaining({ type: 'Underpay' })
        );
      }
    });
  });

  describe('Bulk WCP Processing', () => {
    it('should process multiple WCPs in parallel', async () => {
      const requests = [
        { content: 'Role: Electrician, Hours: 40, Wage: $55.00' },
        { content: 'Role: Laborer, Hours: 40, Wage: $30.00' },
        { content: 'Role: Electrician, Hours: 45, Wage: $50.00' },
      ];

      const results = await processWCPsBulk(requests);

      expect(results).toHaveLength(3);
      expect(results.filter(r => r.success)).toHaveLength(3);
    });

    it('should handle mix of valid and invalid WCPs', async () => {
      const requests = [
        { content: 'Role: Electrician, Hours: 40, Wage: $55.00' }, // Valid
        { content: 'Invalid content format' }, // Invalid
        { content: 'Role: UnknownRole, Hours: 40, Wage: $10.00' }, // Unknown role
      ];

      const results = await processWCPsBulk(requests);

      expect(results).toHaveLength(3);
      expect(results.filter(r => r.success).length).toBeGreaterThan(0);
      expect(results.filter(r => !r.success).length).toBeGreaterThan(0);
    });

    it('should calculate accurate statistics', async () => {
      const decisions = [
        {
          status: 'Approved',
          explanation: 'Valid WCP',
          findings: [],
          trace: [],
          health: {
            cycleTime: 100,
            confidence: 0.95,
            tokenUsage: 1000,
            validationScore: 1.0,
          },
        },
        {
          status: 'Revise',
          explanation: 'Overtime detected',
          findings: [{ type: 'Overtime', detail: 'Hours > 40' }],
          trace: [],
          health: {
            cycleTime: 150,
            confidence: 0.85,
            tokenUsage: 1200,
            validationScore: 0.8,
          },
        },
      ];

      const stats = getWCPStats(decisions);

      expect(stats.total).toBe(2);
      expect(stats.approved).toBe(1);
      expect(stats.revise).toBe(1);
      expect(stats.reject).toBe(0);
      expect(stats.avgConfidence).toBeCloseTo(0.9, 1);
      expect(stats.avgProcessingTime).toBe(125);
    });
  });

  describe('Content Validation', () => {
    it('should validate correct WCP format', () => {
      const validContent = 'Role: Electrician, Hours: 40, Wage: $55.00';
      expect(validateWCPFormat(validContent)).toBe(true);
    });

    it('should reject invalid WCP format', () => {
      const invalidContent = 'Invalid format without required fields';
      expect(validateWCPFormat(invalidContent)).toBe(false);
    });

    it('should handle edge cases', () => {
      expect(validateWCPFormat('')).toBe(false);
      expect(validateWCPFormat('Role: Electrician')).toBe(false);
      expect(validateWCPFormat('Hours: 40, Wage: $50')).toBe(false);
    });
  });
});
