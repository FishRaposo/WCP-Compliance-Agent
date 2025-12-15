/**
 * Error Handling Middleware
 * 
 * Express middleware for consistent error handling across the API.
 * 
 * @file src/middleware/error-handler.ts
 * @see AGENTS.md for coding patterns
 * @see CONTEXT.md for architecture decisions
 */

import type { Request, Response, NextFunction } from 'express';
import { formatApiError, WCPError } from '../utils/errors.js';
import { getLogger } from '../utils/logger.js';

const logger = getLogger('middleware:error-handler');

/**
 * Global error handling middleware
 */
export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  // Format error for response
  const errorResponse = formatApiError(err);
  
  // Log error
  if (err instanceof WCPError) {
    logger.error(`WCP Error: ${err.message}`, err, {
      path: req.path,
      method: req.method,
      code: err.code,
      statusCode: err.statusCode,
    });
  } else {
    logger.error(`Unexpected error: ${err.message}`, err, {
      path: req.path,
      method: req.method,
    });
  }

  // Send error response
  res.status(errorResponse.error.statusCode).json(errorResponse);
}

/**
 * 404 not found middleware
 */
export function notFoundHandler(req: Request, res: Response): void {
  logger.warn('Route not found', {
    path: req.path,
    method: req.method,
    ip: req.ip,
  });

  res.status(404).json({
    success: false,
    error: {
      message: `Route ${req.method} ${req.path} not found`,
      code: 'NOT_FOUND',
      statusCode: 404,
    },
  });
}

/**
 * Request logging middleware
 */
export function requestLogger(req: Request, res: Response, next: NextFunction): void {
  const start = Date.now();
  
  // Log request
  logger.info('Incoming request', {
    method: req.method,
    path: req.path,
    ip: req.ip,
    userAgent: req.get('user-agent'),
  });

  // Log response when finished
  res.on('finish', () => {
    const duration = Date.now() - start;
    logger.info('Request completed', {
      method: req.method,
      path: req.path,
      statusCode: res.statusCode,
      duration: `${duration}ms`,
    });
  });

  next();
}

/**
 * Async error wrapper for route handlers
 */
export function asyncErrorHandler<T extends any[]>(
  fn: (...args: [...T, NextFunction]) => Promise<any>
) {
  return (...args: [...T, NextFunction]) => {
    const next = args[args.length - 1] as NextFunction;
    Promise.resolve(fn(...args)).catch(next);
  };
}
