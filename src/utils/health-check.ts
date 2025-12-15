/**
 * Health Check Utility
 * 
 * Provides system health checks for dependencies and services.
 * Used for monitoring and readiness probes.
 * 
 * @file src/utils/health-check.ts
 * @see AGENTS.md for coding patterns
 * @see CONTEXT.md for architecture decisions
 */

import { getLogger } from './logger.js';

const logger = getLogger('health-check');

/**
 * Health check status
 */
export type HealthStatus = 'healthy' | 'degraded' | 'unhealthy';

/**
 * Individual check result
 */
export interface CheckResult {
  status: HealthStatus;
  message?: string;
  duration?: number;
  details?: Record<string, any>;
}

/**
 * Overall health status
 */
export interface OverallHealthStatus {
  status: HealthStatus;
  checks: {
    system: CheckResult;
    openai: CheckResult;
    database?: CheckResult;
  };
  timestamp: string;
  uptime: number;
}

/**
 * Check system health (memory, uptime)
 */
async function checkSystemHealth(): Promise<CheckResult> {
  const start = Date.now();
  
  try {
    const memoryUsage = process.memoryUsage();
    const memoryUsageMB = memoryUsage.heapUsed / 1024 / 1024;
    const memoryLimitMB = memoryUsage.heapTotal / 1024 / 1024;
    const memoryPercent = (memoryUsageMB / memoryLimitMB) * 100;
    
    let status: HealthStatus = 'healthy';
    let message = 'System is healthy';
    
    if (memoryPercent > 90) {
      status = 'unhealthy';
      message = 'Memory usage critical (>90%)';
    } else if (memoryPercent > 75) {
      status = 'degraded';
      message = 'Memory usage high (>75%)';
    }
    
    return {
      status,
      message,
      duration: Date.now() - start,
      details: {
        memoryUsageMB: Math.round(memoryUsageMB),
        memoryLimitMB: Math.round(memoryLimitMB),
        memoryPercent: Math.round(memoryPercent),
        uptime: process.uptime(),
        platform: process.platform,
        nodeVersion: process.version,
      },
    };
  } catch (error) {
    logger.error('System health check failed', error as Error);
    return {
      status: 'unhealthy',
      message: `System check failed: ${(error as Error).message}`,
      duration: Date.now() - start,
    };
  }
}

/**
 * Check OpenAI API health
 */
async function checkOpenAIHealth(): Promise<CheckResult> {
  const start = Date.now();
  
  try {
    // Check if API key is configured
    const apiKey = process.env.OPENAI_API_KEY;
    
    if (!apiKey) {
      return {
        status: 'unhealthy',
        message: 'OpenAI API key not configured',
        duration: Date.now() - start,
      };
    }
    
    // Basic validation
    if (!apiKey.startsWith('sk-')) {
      return {
        status: 'degraded',
        message: 'OpenAI API key format may be invalid',
        duration: Date.now() - start,
      };
    }
    
    return {
      status: 'healthy',
      message: 'OpenAI API configured',
      duration: Date.now() - start,
      details: {
        model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
        keyPrefix: apiKey.substring(0, 7) + '...',
      },
    };
  } catch (error) {
    logger.error('OpenAI health check failed', error as Error);
    return {
      status: 'unhealthy',
      message: `OpenAI check failed: ${(error as Error).message}`,
      duration: Date.now() - start,
    };
  }
}

/**
 * Check database health (placeholder for future database integration)
 */
async function checkDatabaseHealth(): Promise<CheckResult> {
  const start = Date.now();
  
  try {
    // Placeholder: Will be implemented when database is integrated
    const dbUrl = process.env.DATABASE_URL;
    
    if (!dbUrl) {
      return {
        status: 'healthy',
        message: 'Database not configured (optional)',
        duration: Date.now() - start,
        details: {
          configured: false,
        },
      };
    }
    
    // Future: Add actual database connection check
    return {
      status: 'healthy',
      message: 'Database configured',
      duration: Date.now() - start,
      details: {
        configured: true,
        url: dbUrl.substring(0, 20) + '...',
      },
    };
  } catch (error) {
    logger.error('Database health check failed', error as Error);
    return {
      status: 'unhealthy',
      message: `Database check failed: ${(error as Error).message}`,
      duration: Date.now() - start,
    };
  }
}

/**
 * Determine overall health status from individual checks
 */
function determineOverallStatus(checks: Record<string, CheckResult>): HealthStatus {
  const statuses = Object.values(checks).map(check => check.status);
  
  if (statuses.some(status => status === 'unhealthy')) {
    return 'unhealthy';
  }
  
  if (statuses.some(status => status === 'degraded')) {
    return 'degraded';
  }
  
  return 'healthy';
}

/**
 * Perform comprehensive health check
 * 
 * @returns Overall health status with individual check results
 */
export async function checkHealth(): Promise<OverallHealthStatus> {
  logger.debug('Running health checks');
  
  const [systemCheck, openaiCheck, databaseCheck] = await Promise.all([
    checkSystemHealth(),
    checkOpenAIHealth(),
    checkDatabaseHealth(),
  ]);
  
  const checks = {
    system: systemCheck,
    openai: openaiCheck,
    database: databaseCheck,
  };
  
  const overallStatus = determineOverallStatus(checks);
  
  logger.info('Health check completed', {
    status: overallStatus,
    system: systemCheck.status,
    openai: openaiCheck.status,
    database: databaseCheck.status,
  });
  
  return {
    status: overallStatus,
    checks,
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  };
}

/**
 * Simple health check that returns boolean
 * 
 * @returns True if system is healthy, false otherwise
 */
export async function isHealthy(): Promise<boolean> {
  const health = await checkHealth();
  return health.status === 'healthy';
}

/**
 * Wait for system to be healthy
 * 
 * @param maxAttempts Maximum number of attempts
 * @param delayMs Delay between attempts in milliseconds
 * @returns True if system becomes healthy, false otherwise
 */
export async function waitForHealth(
  maxAttempts: number = 10,
  delayMs: number = 1000
): Promise<boolean> {
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const healthy = await isHealthy();
    
    if (healthy) {
      logger.info('System is healthy');
      return true;
    }
    
    logger.warn(`System not healthy, retrying... (${attempt + 1}/${maxAttempts})`);
    await new Promise(resolve => setTimeout(resolve, delayMs));
  }
  
  logger.error('System failed to become healthy');
  return false;
}
