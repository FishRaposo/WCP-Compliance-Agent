/**
 * Workflow Tests - Error Handling
 * 
 * Tests error handling workflows across the entire system.
 * 
 * @file tests/workflows/test_error_handling_workflow.test.ts
 * @see EVALS.md for testing strategy
 * @see AGENTS.md for test patterns
 * @see WORKFLOW.md for error handling workflows
 */

import { describe, it, expect, vi } from 'vitest';
import { 
  WCPError, 
  ValidationError, 
  NotFoundError,
  extractErrorDetails,
  formatApiError,
  asyncHandler 
} from '../../src/utils/errors.js';
import { processWCP } from '../../src/services/wcp-service.js';
import { generateWcpDecision } from '../../src/entrypoints/wcp-entrypoint.js';

describe('Error Handling Workflow', () => {
  describe('Error Classes', () => {
    it('should create WCPError with correct properties', () => {
      const error = new WCPError('Test error', 'TEST_CODE', 500, { detail: 'info' });

      expect(error.message).toBe('Test error');
      expect(error.code).toBe('TEST_CODE');
      expect(error.statusCode).toBe(500);
      expect(error.details).toEqual({ detail: 'info' });
      expect(error.name).toBe('WCPError');
    });

    it('should create ValidationError with correct defaults', () => {
      const error = new ValidationError('Invalid input');

      expect(error.message).toBe('Invalid input');
      expect(error.code).toBe('VALIDATION_ERROR');
      expect(error.statusCode).toBe(400);
      expect(error.name).toBe('ValidationError');
    });

    it('should convert errors to JSON', () => {
      const error = new NotFoundError('Resource not found');
      const json = error.toJSON();

      expect(json).toEqual({
        error: {
          name: 'NotFoundError',
          code: 'NOT_FOUND',
          message: 'Resource not found',
          statusCode: 404,
          details: undefined,
        },
      });
    });
  });

  describe('Error Extraction', () => {
    it('should extract details from WCPError', () => {
      const error = new WCPError('Test', 'TEST', 500, { foo: 'bar' });
      const details = extractErrorDetails(error);

      expect(details.message).toBe('Test');
      expect(details.code).toBe('TEST');
      expect(details.statusCode).toBe(500);
      expect(details.details).toEqual({ foo: 'bar' });
    });

    it('should extract details from regular Error', () => {
      const error = new Error('Regular error');
      const details = extractErrorDetails(error);

      expect(details.message).toBe('Regular error');
      expect(details.code).toBe('UNKNOWN_ERROR');
      expect(details.statusCode).toBe(500);
      expect(details.details).toBeDefined();
    });

    it('should handle unknown errors', () => {
      const details = extractErrorDetails('string error');

      expect(details.message).toBe('string error');
      expect(details.code).toBe('UNKNOWN_ERROR');
      expect(details.statusCode).toBe(500);
    });
  });

  describe('API Error Formatting', () => {
    it('should format WCPError for API response', () => {
      const error = new ValidationError('Invalid input', { field: 'email' });
      const formatted = formatApiError(error);

      expect(formatted.success).toBe(false);
      expect(formatted.error).toEqual({
        message: 'Invalid input',
        code: 'VALIDATION_ERROR',
        statusCode: 400,
      });
    });

    it('should handle unknown errors in API format', () => {
      const formatted = formatApiError('unknown error');

      expect(formatted.success).toBe(false);
      expect(formatted.error.code).toBe('UNKNOWN_ERROR');
      expect(formatted.error.statusCode).toBe(500);
    });
  });

  describe('Async Error Handler', () => {
    it('should handle successful async operations', async () => {
      const result = await asyncHandler(async () => {
        return { data: 'success' };
      });

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toEqual({ data: 'success' });
      }
    });

    it('should handle WCPError in async operations', async () => {
      const result = await asyncHandler(async () => {
        throw new ValidationError('Async validation error');
      });

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error).toBeInstanceOf(ValidationError);
        expect(result.error.code).toBe('VALIDATION_ERROR');
      }
    });

    it('should wrap unknown errors in WCPError', async () => {
      const result = await asyncHandler(async () => {
        throw new Error('Unknown async error');
      });

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error).toBeInstanceOf(WCPError);
        expect(result.error.code).toBe('INTERNAL_ERROR');
      }
    });
  });

  describe('End-to-End Error Workflow', () => {
    
    // Mock agent for error testing
    const createMockAgent = (status: string, findings: any[] = []) => {
      return {
        generate: vi.fn(async () => ({
          object: {
            status,
            explanation: `Decision: ${status}`,
            findings,
            trace: [],
            health: {
              cycleTime: 100,
              tokenUsage: 50,
              validationScore: findings.length === 0 ? 1.0 : 0.8,
              confidence: status === "Approved" ? 0.95 : status === "Revise" ? 0.85 : 0.90,
            }
          },
          text: `Decision: ${status}`,
          toolResults: [],
        }))
      };
    };

    it('should handle invalid WCP format error', async () => {
      // Mock agent that simulates error handling
      const mockAgent = createMockAgent("Reject", [
        { type: 'Invalid Format', detail: 'Missing required fields' }
      ]);
      const getAgent = vi.fn(async () => mockAgent);

      const response = await generateWcpDecision({
        content: 'Invalid format',
        mastraInstance: { getAgent },
        maxSteps: 3,
      });

      // Should return Reject status for invalid format
      expect(response.object.status).toBe('Reject');
      expect(response.object.findings).toContainEqual(
        expect.objectContaining({ type: 'Invalid Format' })
      );
    });

    it('should handle unknown role error', async () => {
      // Mock agent that simulates unknown role handling
      const mockAgent = createMockAgent("Reject", [
        { type: 'Unknown Role', detail: 'Role UnknownRole not found in DBWD rates' }
      ]);
      const getAgent = vi.fn(async () => mockAgent);

      const response = await generateWcpDecision({
        content: 'Role: UnknownRole, Hours: 40, Wage: $50.00',
        mastraInstance: { getAgent },
        maxSteps: 3,
      });

      expect(response.object.status).toBe('Reject'); // Should reject unknown role
      expect(response.object.findings).toContainEqual(
        expect.objectContaining({ type: 'Unknown Role' })
      );
    });
  });
});
