/**
 * API Client
 * 
 * HTTP client for making API requests to internal and external services.
 * Provides error handling, retries, and timeout management.
 * 
 * @file src/services/api-client.ts
 * @see AGENTS.md for coding patterns
 * @see CONTEXT.md for architecture decisions
 */

import { getConfig } from '../utils/config.js';
import { getLogger } from '../utils/logger.js';
import { ExternalApiError, RateLimitError, asyncHandler } from '../utils/errors.js';

const logger = getLogger('services:api-client');

export interface RequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  headers?: Record<string, string>;
  body?: any;
  timeout?: number;
  retries?: number;
  retryDelay?: number;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: {
    message: string;
    code: string;
    statusCode?: number;
  };
  statusCode: number;
  headers: Record<string, string>;
}

/**
 * Make HTTP request with error handling and retries
 */
export async function makeRequest(
  url: string,
  options: RequestOptions = {}
): Promise<ApiResponse> {
  const config = getConfig();
  const {
    method = 'GET',
    headers = {},
    body,
    timeout = config.agent.timeout,
    retries = 3,
    retryDelay = 1000,
  } = options;

  logger.debug(`Making ${method} request to ${url}`);

  return asyncHandler(async () => {
    let lastError: any;

    for (let attempt = 0; attempt < retries; attempt++) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), timeout);

        const fetchOptions: RequestInit = {
          method,
          headers: {
            'Content-Type': 'application/json',
            ...headers,
          },
          signal: controller.signal,
        };

        if (body) {
          fetchOptions.body = JSON.stringify(body);
        }

        const response = await fetch(url, fetchOptions);
        clearTimeout(timeoutId);

        const responseData = await response.text();
        let data: any;

        try {
          data = JSON.parse(responseData);
        } catch {
          data = responseData;
        }

        // Check for rate limiting
        if (response.status === 429) {
          throw new RateLimitError('Rate limit exceeded', {
            retryAfter: response.headers.get('Retry-After'),
          });
        }

        // Check for other errors
        if (!response.ok) {
          throw new ExternalApiError(
            `HTTP ${response.status}: ${response.statusText}`,
            {
              statusCode: response.status,
              statusText: response.statusText,
              data,
            }
          );
        }

        logger.debug(`Request successful: ${method} ${url} - ${response.status}`);

        return {
          success: true,
          data,
          statusCode: response.status,
          headers: Object.fromEntries(response.headers.entries()),
        };
      } catch (error) {
        lastError = error;
        
        logger.warn(`Request failed (attempt ${attempt + 1}/${retries}): ${method} ${url}`, {
          error: error instanceof Error ? error.message : String(error),
        });

        if (attempt < retries - 1) {
          // Wait before retrying
          await new Promise(resolve => setTimeout(resolve, retryDelay * (attempt + 1)));
        }
      }
    }

    // All retries failed
    logger.error(`All retries failed for ${method} ${url}`, lastError);
    throw lastError;
  }).then(result => {
    if (result.success) {
      return result.data;
    } else {
      return {
        success: false,
        error: {
          message: result.error.message,
          code: result.error.code,
          statusCode: result.error.statusCode,
        },
        statusCode: result.error.statusCode || 500,
        headers: {},
      };
    }
  });
}

/**
 * Make GET request
 */
export function get(url: string, options?: Omit<RequestOptions, 'method'>) {
  return makeRequest(url, { ...options, method: 'GET' });
}

/**
 * Make POST request
 */
export function post(url: string, body: any, options?: Omit<RequestOptions, 'method' | 'body'>) {
  return makeRequest(url, { ...options, method: 'POST', body });
}

/**
 * Make PUT request
 */
export function put(url: string, body: any, options?: Omit<RequestOptions, 'method' | 'body'>) {
  return makeRequest(url, { ...options, method: 'PUT', body });
}

/**
 * Make DELETE request
 */
export function del(url: string, options?: Omit<RequestOptions, 'method'>) {
  return makeRequest(url, { ...options, method: 'DELETE' });
}

/**
 * OpenAI API client
 */
export class OpenAIClient {
  private baseUrl: string;
  private apiKey: string;

  constructor() {
    const config = getConfig();
    this.baseUrl = 'https://api.openai.com/v1';
    this.apiKey = config.openai.apiKey;
  }

  /**
   * Make request to OpenAI API
   */
  async makeRequest<T = any>(
    endpoint: string,
    body: any,
    options: RequestOptions = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    
    logger.debug(`OpenAI API request: ${endpoint}`);

    const result = await makeRequest(url, {
      ...options,
      method: 'POST',
      body,
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        ...options.headers,
      },
    });

    if (!result.success) {
      throw new ExternalApiError(
        `OpenAI API error: ${result.error?.message}`,
        result.error
      );
    }

    return result.data as T;
  }

  /**
   * Create chat completion
   */
  async createChatCompletion(messages: any[], options: any = {}) {
    const config = getConfig();
    
    return this.makeRequest('/chat/completions', {
      model: config.openai.model,
      messages,
      max_tokens: config.openai.maxTokens,
      ...options,
    });
  }
}
