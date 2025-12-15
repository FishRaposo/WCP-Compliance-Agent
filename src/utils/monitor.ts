/**
 * Monitoring Utility
 * 
 * Provides performance and error monitoring capabilities.
 * 
 * @file src/utils/monitor.ts
 * @see AGENTS.md for coding patterns
 */

import { getLogger } from './logger.js';

const logger = getLogger('monitor');

export interface PerformanceMetric {
  operation: string;
  duration: number;
  timestamp: string;
}

export interface ErrorMetric {
  error: Error;
  context?: Record<string, any>;
  timestamp: string;
}

const performanceMetrics: PerformanceMetric[] = [];
const errorMetrics: ErrorMetric[] = [];

export function trackPerformance(operation: string, duration: number): void {
  const metric: PerformanceMetric = {
    operation,
    duration,
    timestamp: new Date().toISOString(),
  };
  
  performanceMetrics.push(metric);
  logger.debug(`Performance: ${operation} took ${duration}ms`);
}

export function trackError(error: Error, context?: Record<string, any>): void {
  const metric: ErrorMetric = {
    error,
    context,
    timestamp: new Date().toISOString(),
  };
  
  errorMetrics.push(metric);
  logger.error(`Error tracked: ${error.message}`, error, context);
}

export function getMetrics() {
  return {
    performance: performanceMetrics.slice(-100),
    errors: errorMetrics.slice(-100),
  };
}

export function clearMetrics(): void {
  performanceMetrics.length = 0;
  errorMetrics.length = 0;
}
