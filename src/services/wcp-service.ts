/**
 * WCP Service
 * 
 * Business logic service for WCP processing and analysis.
 * Orchestrates tools and agents to provide high-level WCP operations.
 * 
 * @file src/services/wcp-service.ts
 * @see AGENTS.md for coding patterns
 * @see CONTEXT.md for architecture decisions
 */

import { generateWcpDecision } from '../entrypoints/wcp-entrypoint.js';
import { getLogger } from '../utils/logger.js';
import { asyncHandler } from '../utils/errors.js';
import type { WCPDecision } from '../types/index.js';

const logger = getLogger('services:wcp');

/**
 * Process a single WCP and return compliance decision
 */
export async function processWCP(
  content: string,
  maxSteps: number = 3
): Promise<{ success: true; data: WCPDecision } | { success: false; error: any }> {
  return asyncHandler(async () => {
    logger.info('Processing WCP', { 
      contentLength: content.length, 
      maxSteps 
    });

    const result = await generateWcpDecision({
      content,
      maxSteps,
    });

    logger.info('WCP processed successfully', {
      status: result.object.status,
      findingsCount: result.object.findings.length,
    });

    return result.object;
  });
}

/**
 * Process multiple WCPs in bulk
 */
export async function processWCPsBulk(
  requests: Array<{ content: string; maxSteps?: number }>
): Promise<Array<{ success: boolean; data?: WCPDecision; error?: any; content: string }>> {
  logger.info('Processing WCPs in bulk', { count: requests.length });

  const results = await Promise.allSettled(
    requests.map(async (request, index) => {
      try {
        const result = await processWCP(request.content, request.maxSteps || 3);
        
        if (result.success) {
          return {
            success: true,
            data: result.data,
            content: request.content,
          };
        } else {
          return {
            success: false,
            error: result.error,
            content: request.content,
          };
        }
      } catch (error) {
        logger.error(`Error processing WCP at index ${index}`, error as Error);
        return {
          success: false,
          error,
          content: request.content,
        };
      }
    })
  );

  logger.info('Bulk processing completed', { 
    total: results.length,
    successful: results.filter(r => r.status === 'fulfilled' && (r.value as any).success).length,
  });

  return results.map((result, index) => {
    if (result.status === 'fulfilled') {
      return result.value;
    } else {
      return {
        success: false,
        error: result.reason,
        content: requests[index]?.content || '',
      };
    }
  });
}

/**
 * Validate WCP content format (basic validation)
 */
export function validateWCPFormat(content: string): boolean {
  // Check for required fields
  const hasRole = /Role:\s*\w+/i.test(content);
  const hasHours = /Hours:\s*\d+/i.test(content);
  const hasWage = /Wage:\s*\$?\d+/i.test(content);

  const isValid = hasRole && hasHours && hasWage;

  logger.debug('WCP format validation', {
    hasRole,
    hasHours,
    hasWage,
    isValid,
  });

  return isValid;
}

/**
 * Get WCP statistics from processed decisions
 */
export function getWCPStats(
  decisions: WCPDecision[]
): {
  total: number;
  approved: number;
  revise: number;
  reject: number;
  avgConfidence: number;
  avgProcessingTime: number;
} {
  const total = decisions.length;
  const approved = decisions.filter(d => d.status === 'Approved').length;
  const revise = decisions.filter(d => d.status === 'Revise').length;
  const reject = decisions.filter(d => d.status === 'Reject').length;

  const avgConfidence = decisions.reduce((sum, d) => 
    sum + (d.health?.confidence || 0), 0) / total || 0;

  const avgProcessingTime = decisions.reduce((sum, d) => 
    sum + (d.health?.cycleTime || 0), 0) / total || 0;

  return {
    total,
    approved,
    revise,
    reject,
    avgConfidence,
    avgProcessingTime,
  };
}
