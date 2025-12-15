/**
 * Logging Utility
 * 
 * Provides structured logging with multiple formats and levels.
 * Supports both JSON and text formats for different environments.
 * 
 * @file src/utils/logger.ts
 * @see AGENTS.md for coding patterns
 * @see CONTEXT.md for architecture decisions
 */

import { getConfig } from './config.js';

// Log levels hierarchy
const LOG_LEVELS = {
  error: 0,
  warn: 1,
  info: 2,
  debug: 3,
} as const;

type LogLevel = keyof typeof LOG_LEVELS;

// Log entry interface
interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  context?: Record<string, any>;
  error?: Error;
}

/**
 * Logger class for structured logging
 */
export class Logger {
  private level: LogLevel;
  private format: 'json' | 'text';
  private service: string;

  constructor(service: string = 'wcp-agent') {
    const config = getConfig();
    this.level = config.logging.level;
    this.format = config.logging.format;
    this.service = service;
  }

  /**
   * Check if a log level should be logged
   */
  private shouldLog(level: LogLevel): boolean {
    return LOG_LEVELS[level] <= LOG_LEVELS[this.level];
  }

  /**
   * Format log entry as JSON
   */
  private formatJson(entry: LogEntry): string {
    const logObj = {
      timestamp: entry.timestamp,
      level: entry.level,
      message: entry.message,
      service: this.service,
      ...(entry.context && { context: entry.context }),
      ...(entry.error && { 
        error: {
          name: entry.error.name,
          message: entry.error.message,
          stack: entry.error.stack,
        }
      }),
    };
    return JSON.stringify(logObj);
  }

  /**
   * Format log entry as text
   */
  private formatText(entry: LogEntry): string {
    const contextStr = entry.context ? ` ${JSON.stringify(entry.context)}` : '';
    const errorStr = entry.error ? `\n  Error: ${entry.error.message}` : '';
    return `${entry.timestamp} [${entry.level.toUpperCase()}] ${this.service}: ${entry.message}${contextStr}${errorStr}`;
  }

  /**
   * Write log entry
   */
  private write(entry: LogEntry): void {
    if (!this.shouldLog(entry.level)) {
      return;
    }

    const formatted = this.format === 'json' 
      ? this.formatJson(entry)
      : this.formatText(entry);

    // Write to appropriate stream
    if (entry.level === 'error') {
      console.error(formatted);
    } else {
      console.log(formatted);
    }
  }

  /**
   * Log debug message
   */
  debug(message: string, context?: Record<string, any>): void {
    this.write({
      timestamp: new Date().toISOString(),
      level: 'debug',
      message,
      context,
    });
  }

  /**
   * Log info message
   */
  info(message: string, context?: Record<string, any>): void {
    this.write({
      timestamp: new Date().toISOString(),
      level: 'info',
      message,
      context,
    });
  }

  /**
   * Log warning message
   */
  warn(message: string, context?: Record<string, any>): void {
    this.write({
      timestamp: new Date().toISOString(),
      level: 'warn',
      message,
      context,
    });
  }

  /**
   * Log error message
   */
  error(message: string, error?: Error, context?: Record<string, any>): void {
    this.write({
      timestamp: new Date().toISOString(),
      level: 'error',
      message,
      context,
      error,
    });
  }

  /**
   * Create child logger with additional context
   */
  child(context: Record<string, any>): Logger {
    const childLogger = new Logger(this.service);
    
    // Override write method to include child context
    const originalWrite = childLogger.write.bind(childLogger);
    childLogger.write = (entry: LogEntry) => {
      originalWrite({
        ...entry,
        context: { ...context, ...entry.context },
      });
    };
    
    return childLogger;
  }
}

// Global logger instance
let globalLogger: Logger | null = null;

/**
 * Get global logger instance
 */
export function getLogger(service?: string): Logger {
  if (!globalLogger) {
    globalLogger = new Logger(service || 'wcp-agent');
  } else if (service) {
    return globalLogger.child({ service });
  }
  return globalLogger;
}

/**
 * Reset global logger (useful for testing)
 */
export function resetLogger(): void {
  globalLogger = null;
}
