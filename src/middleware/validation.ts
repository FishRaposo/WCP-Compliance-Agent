/**
 * Validation Middleware
 * 
 * Express middleware for request validation using Zod schemas.
 * 
 * @file src/middleware/validation.ts
 * @see AGENTS.md for coding patterns
 * @see CONTEXT.md for architecture decisions
 */

import type { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { ValidationError } from '../utils/errors.js';

/**
 * Create validation middleware from Zod schema
 */
export function validateRequest(
  schema: z.ZodSchema,
  source: 'body' | 'query' | 'params' = 'body'
) {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      const data = req[source];
      const result = schema.safeParse(data);

      if (!result.success) {
        const errors = result.error.issues.map(issue => ({
          field: issue.path.join('.'),
          message: issue.message,
        }));

        throw new ValidationError(
          `Validation failed for ${source}`,
          { errors, source }
        );
      }

      // Replace the original data with validated data
      req[source] = result.data;
      next();
    } catch (error) {
      next(error);
    }
  };
}

/**
 * WCP Analysis request schema
 */
export const AnalyzeRequestSchema = z.object({
  content: z.string().min(1, 'WCP content is required'),
  maxSteps: z.number().min(1).max(10).optional().default(3),
});

export type AnalyzeRequest = z.infer<typeof AnalyzeRequestSchema>;

/**
 * Bulk analysis request schema
 */
export const BulkAnalyzeRequestSchema = z.object({
  requests: z.array(AnalyzeRequestSchema).min(1, 'At least one request is required'),
});

export type BulkAnalyzeRequest = z.infer<typeof BulkAnalyzeRequestSchema>;

/**
 * Health check query schema
 */
export const HealthQuerySchema = z.object({
  detailed: z.enum(['true', 'false']).optional().transform(val => val === 'true'),
});

export type HealthQuery = z.infer<typeof HealthQuerySchema>;
