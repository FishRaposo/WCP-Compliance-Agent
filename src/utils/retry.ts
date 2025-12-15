/**
 * Retry Utility
 * 
 * Provides retry logic with exponential backoff for API failures
 * and transient errors.
 * 
 * @file src/utils/retry.ts
 * @see AGENTS.md for coding patterns
 * @see CONTEXT.md for architecture decisions
 */

import { getLogger } from './logger.js';

const logger = getLogger('retry');

/**
 * Retry options interface
 */
export interface RetryOptions {
  /** Maximum number of retry attempts */
  maxRetries?: number;
  /** Initial delay in milliseconds */
  initialDelay?: number;
  /** Maximum delay in milliseconds */
  maxDelay?: number;
  /** Multiplier for exponential backoff */
  backoffMultiplier?: number;
  /** Function to determine if error should trigger retry */
  shouldRetry?: (error: Error) => boolean;
}

/**
 * Default retry options
 */
const DEFAULT_OPTIONS: Required<RetryOptions> = {
  maxRetries: 3,
  initialDelay: 1000,
  maxDelay: 10000,
  backoffMultiplier: 2,
  shouldRetry: (error: Error) => {
    // Retry on network errors, rate limits, and temporary failures
    const retryableErrors = [
      'ECONNRESET',
      'ETIMEDOUT',
      'ENOTFOUND',
      'RATE_LIMIT',
      'Too Many Requests',
      '429',
      '503',
      '504',
    ];
    
    return retryableErrors.some(pattern => 
      error.message.includes(pattern) || error.name.includes(pattern)
    );
  },
};

/**
 * Calculate delay with exponential backoff
 */
function calculateDelay(attempt: number, options: Required<RetryOptions>): number {
  const delay = options.initialDelay * Math.pow(options.backoffMultiplier, attempt);
  return Math.min(delay, options.maxDelay);
}

/**
 * Sleep for specified milliseconds
 */
function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Retry a function with exponential backoff
 * 
 * @param fn Function to retry
 * @param options Retry options
 * @returns Promise that resolves with function result
 * @throws Error if all retries fail
 * 
 * @example
 * ```typescript
 * const result = await retry(
 *   async () => await apiCall(),
 *   { maxRetries: 3, initialDelay: 1000 }
 * );
 * ```
 */
export async function retry<T>(
  fn: () => Promise<T>,
  options: RetryOptions = {}
): Promise<T> {
  const opts = { ...DEFAULT_OPTIONS, ...options };
  let lastError: Error;
  
  for (let attempt = 0; attempt <= opts.maxRetries; attempt++) {
    try {
      logger.debug(`Executing function (attempt ${attempt + 1}/${opts.maxRetries + 1})`);
      const result = await fn();
      
      if (attempt > 0) {
        logger.info(`Function succeeded after ${attempt} retries`);
      }
      
      return result;
    } catch (error) {
      lastError = error as Error;
      
      // Check if we should retry
      const shouldRetry = opts.shouldRetry(lastError);
      const isLastAttempt = attempt === opts.maxRetries;
      
      if (!shouldRetry || isLastAttempt) {
        logger.error(
          `Function failed after ${attempt + 1} attempts`,
          lastError,
          { shouldRetry, isLastAttempt }
        );
        throw lastError;
      }
      
      // Calculate delay and wait
      const delay = calculateDelay(attempt, opts);
      logger.warn(
        `Function failed, retrying in ${delay}ms`,
        { attempt: attempt + 1, error: lastError.message }
      );
      
      await sleep(delay);
    }
  }
  
  // This should never be reached, but TypeScript needs it
  throw lastError!;
}

/**
 * Retry wrapper with custom shouldRetry function
 * 
 * @example
 * ```typescript
 * const result = await retryWithCondition(
 *   async () => await apiCall(),
 *   (error) => error.message.includes('timeout'),
 *   { maxRetries: 5 }
 * );
 * ```
 */
export async function retryWithCondition<T>(
  fn: () => Promise<T>,
  shouldRetry: (error: Error) => boolean,
  options: Omit<RetryOptions, 'shouldRetry'> = {}
): Promise<T> {
  return retry(fn, { ...options, shouldRetry });
}

/**
 * Retry specifically for API calls (catches common API errors)
 * 
 * @example
 * ```typescript
 * const result = await retryApiCall(
 *   async () => await fetch(url),
 *   { maxRetries: 3 }
 * );
 * ```
 */
export async function retryApiCall<T>(
  fn: () => Promise<T>,
  options: Omit<RetryOptions, 'shouldRetry'> = {}
): Promise<T> {
  return retry(fn, {
    ...options,
    shouldRetry: (error: Error) => {
      // API-specific retryable errors
      const apiErrors = [
        'ECONNRESET',
        'ETIMEDOUT',
        'ENOTFOUND',
        'RATE_LIMIT',
        'RateLimitError',
        'Too Many Requests',
        '429',
        '503',
        '504',
        'API_ERROR',
      ];
      
      return apiErrors.some(pattern => 
        error.message.includes(pattern) || 
        error.name.includes(pattern) ||
        (error as any).code === pattern
      );
    },
  });
}
