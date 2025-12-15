/**
 * Retry Utility Tests
 * 
 * @file tests/unit/test_retry.test.ts
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { retry, retryWithCondition, retryApiCall } from '../../src/utils/retry.js';

describe('Retry Utility', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('retry', () => {
    it('should succeed on first try', async () => {
      const fn = vi.fn().mockResolvedValue('success');
      const result = await retry(fn);
      
      expect(result).toBe('success');
      expect(fn).toHaveBeenCalledTimes(1);
    });

    it('should retry on failure and succeed', async () => {
      const fn = vi.fn()
        .mockRejectedValueOnce(new Error('ECONNRESET'))
        .mockResolvedValue('success');
      
      const result = await retry(fn, { maxRetries: 2, initialDelay: 10 });
      
      expect(result).toBe('success');
      expect(fn).toHaveBeenCalledTimes(2);
    });

    it('should fail after max retries', async () => {
      const error = new Error('ECONNRESET');
      const fn = vi.fn().mockRejectedValue(error);
      
      await expect(retry(fn, { maxRetries: 2, initialDelay: 10 }))
        .rejects.toThrow('ECONNRESET');
      
      expect(fn).toHaveBeenCalledTimes(3); // Initial + 2 retries
    });

    it('should not retry non-retryable errors', async () => {
      const error = new Error('Not retryable');
      const fn = vi.fn().mockRejectedValue(error);
      
      await expect(retry(fn, { maxRetries: 2, initialDelay: 10 }))
        .rejects.toThrow('Not retryable');
      
      expect(fn).toHaveBeenCalledTimes(1);
    });
  });

  describe('retryWithCondition', () => {
    it('should retry based on custom condition', async () => {
      const fn = vi.fn()
        .mockRejectedValueOnce(new Error('Custom error'))
        .mockResolvedValue('success');
      
      const shouldRetry = (error: Error) => error.message.includes('Custom');
      
      const result = await retryWithCondition(fn, shouldRetry, { maxRetries: 2, initialDelay: 10 });
      
      expect(result).toBe('success');
      expect(fn).toHaveBeenCalledTimes(2);
    });
  });

  describe('retryApiCall', () => {
    it('should retry API errors', async () => {
      const fn = vi.fn()
        .mockRejectedValueOnce(new Error('Too Many Requests'))
        .mockResolvedValue('success');
      
      const result = await retryApiCall(fn, { maxRetries: 2, initialDelay: 10 });
      
      expect(result).toBe('success');
      expect(fn).toHaveBeenCalledTimes(2);
    });

    it('should retry 429 status errors', async () => {
      const fn = vi.fn()
        .mockRejectedValueOnce(new Error('429'))
        .mockResolvedValue('success');
      
      const result = await retryApiCall(fn, { maxRetries: 2, initialDelay: 10 });
      
      expect(result).toBe('success');
    });
  });
});
