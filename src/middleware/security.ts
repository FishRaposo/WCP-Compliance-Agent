/**
 * Security Middleware
 * 
 * Express middleware for security-related functionality.
 * 
 * @file src/middleware/security.ts
 * @see AGENTS.md for coding patterns
 * @see CONTEXT.md for architecture decisions
 */

import type { Request, Response, NextFunction } from 'express';
import crypto from 'crypto';

// Simple in-memory rate limit store (in production, use Redis)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

/**
 * Rate limiting middleware
 */
export function rateLimiter(
  options = {
    windowMs: 15 * 60 * 1000, // 15 minutes
    maxRequests: 100, // 100 requests per window
  }
) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const key = req.ip || 'unknown';
    const now = Date.now();
    
    // Clean up old entries
    for (const [k, data] of rateLimitStore.entries()) {
      if (data.resetTime < now) {
        rateLimitStore.delete(k);
      }
    }
    
    // Get or create entry
    let entry = rateLimitStore.get(key);
    if (!entry || entry.resetTime < now) {
      entry = {
        count: 0,
        resetTime: now + options.windowMs,
      };
      rateLimitStore.set(key, entry);
    }
    
    // Increment count
    entry.count++;
    
    // Set headers
    res.setHeader('X-RateLimit-Limit', options.maxRequests);
    res.setHeader('X-RateLimit-Remaining', Math.max(0, options.maxRequests - entry.count));
    res.setHeader('X-RateLimit-Reset', new Date(entry.resetTime).toISOString());
    
    // Check limit
    if (entry.count > options.maxRequests) {
      res.status(429).json({
        success: false,
        error: {
          message: 'Too many requests',
          code: 'RATE_LIMIT_EXCEEDED',
          statusCode: 429,
        },
      });
      return;
    }
    
    next();
  };
}

/**
 * CORS middleware configuration
 */
export function corsMiddleware(
  options = {
    origin: process.env.CORS_ORIGIN || '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  }
) {
  return (req: Request, res: Response, next: NextFunction): void => {
    res.header('Access-Control-Allow-Origin', options.origin);
    res.header('Access-Control-Allow-Methods', options.methods.join(','));
    res.header('Access-Control-Allow-Headers', options.allowedHeaders.join(','));
    res.header('Access-Control-Allow-Credentials', String(options.credentials));
    
    if (req.method === 'OPTIONS') {
      res.sendStatus(200);
    } else {
      next();
    }
  };
}

/**
 * Security headers middleware
 */
export function securityHeaders(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  // Remove sensitive headers
  res.removeHeader('X-Powered-By');
  
  // Add security headers
  res.header('X-Content-Type-Options', 'nosniff');
  res.header('X-Frame-Options', 'DENY');
  res.header('X-XSS-Protection', '1; mode=block');
  res.header('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.header('Content-Security-Policy', "default-src 'self'");
  res.header('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  
  next();
}

/**
 * API key authentication middleware
 */
export function apiKeyAuth(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const apiKey = req.header('X-API-Key');
  const expectedKey = process.env.API_KEY;
  
  // If no API key is configured, allow all requests
  if (!expectedKey) {
    next();
    return;
  }
  
  // Validate API key
  if (!apiKey || apiKey !== expectedKey) {
    res.status(401).json({
      success: false,
      error: {
        message: 'Invalid or missing API key',
        code: 'UNAUTHORIZED',
        statusCode: 401,
      },
    });
    return;
  }
  
  next();
}

/**
 * Generate secure random token
 */
export function generateSecureToken(length: number = 32): string {
  return crypto.randomBytes(length).toString('hex');
}
