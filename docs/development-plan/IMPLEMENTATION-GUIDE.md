# Implementation Guide

**Purpose**: This document provides detailed implementation guidance, code examples, patterns, and best practices for executing the development plan phases.

**Last Updated**: 2025-01-27  
**Version**: 1.0.0

---

## 📋 Table of Contents

1. [Implementation Patterns](#implementation-patterns)
2. [Code Examples](#code-examples)
3. [Testing Patterns](#testing-patterns)
4. [Error Handling Patterns](#error-handling-patterns)
5. [Integration Patterns](#integration-patterns)
6. [Migration Procedures](#migration-procedures)
7. [Rollback Procedures](#rollback-procedures)
8. [Performance Benchmarks](#performance-benchmarks)
9. [Security Considerations](#security-considerations)
10. [Documentation Templates](#documentation-templates)

---

## 🎨 Implementation Patterns

### Pattern 1: Error Handling Structure

**Standard Error Handling Pattern**:
```typescript
// src/utils/error-handler.ts
export class WCPError extends Error {
  constructor(
    message: string,
    public code: string,
    public statusCode: number = 500,
    public details?: Record<string, unknown>
  ) {
    super(message);
    this.name = 'WCPError';
  }
}

export class ValidationError extends WCPError {
  constructor(message: string, details?: Record<string, unknown>) {
    super(message, 'VALIDATION_ERROR', 400, details);
    this.name = 'ValidationError';
  }
}

export class APIError extends WCPError {
  constructor(message: string, details?: Record<string, unknown>) {
    super(message, 'API_ERROR', 502, details);
    this.name = 'APIError';
  }
}

// Usage in tools
export const extractWCPTool = createTool({
  // ... tool config
  execute: async ({ context }) => {
    try {
      // Validation
      if (!context.content || typeof context.content !== 'string') {
        throw new ValidationError('Content must be a non-empty string', {
          received: typeof context.content,
        });
      }

      // Processing
      const roleMatch = context.content.match(/Role:\s*(\w+)/i);
      if (!roleMatch) {
        throw new ValidationError('Role not found in input', {
          input: context.content,
        });
      }

      // Return result
      return { role: roleMatch[1], hours: 0, wage: 0 };
    } catch (error) {
      if (error instanceof WCPError) {
        throw error; // Re-throw known errors
      }
      // Wrap unknown errors
      throw new WCPError(
        'Unexpected error in extractWCPTool',
        'UNEXPECTED_ERROR',
        500,
        { originalError: error instanceof Error ? error.message : String(error) }
      );
    }
  },
});
```

### Pattern 2: Input Validation Structure

**Comprehensive Input Validation Pattern**:
```typescript
// src/utils/validator.ts
import { z } from 'zod';
import { ValidationError } from './error-handler.js';

export const WCPInputSchema = z.object({
  content: z.string().min(1, 'Content cannot be empty'),
});

export const ExtractedWCPSchema = z.object({
  role: z.string().min(1, 'Role cannot be empty'),
  hours: z.number().min(0).max(168, 'Hours must be between 0 and 168'),
  wage: z.number().min(0, 'Wage cannot be negative'),
});

export const ValidationInputSchema = z.object({
  role: z.string().min(1),
  hours: z.number().min(0).max(168),
  wage: z.number().min(0),
});

export function validateInput<T>(schema: z.ZodSchema<T>, data: unknown): T {
  try {
    return schema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new ValidationError('Input validation failed', {
        errors: error.errors,
        received: data,
      });
    }
    throw error;
  }
}
```

### Pattern 3: Environment Variable Validation

**Environment Variable Validation Pattern**:
```typescript
// src/utils/env-validator.ts
import { z } from 'zod';

const EnvSchema = z.object({
  OPENAI_API_KEY: z.string().min(1, 'OPENAI_API_KEY is required').startsWith('sk-', 'Invalid API key format'),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  LOG_LEVEL: z.enum(['debug', 'info', 'warn', 'error']).default('info'),
});

export type Env = z.infer<typeof EnvSchema>;

export function validateEnv(): Env {
  try {
    return EnvSchema.parse(process.env);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const missingVars = error.errors.map(e => e.path.join('.')).join(', ');
      throw new Error(
        `Missing or invalid environment variables: ${missingVars}\n` +
        `Please check your .env file or create one from .env.example`
      );
    }
    throw error;
  }
}

// Usage in index.ts
import { validateEnv } from './utils/env-validator.js';

(async () => {
  try {
    // Validate environment variables first
    const env = validateEnv();
    console.log('Environment validated successfully');

    // Continue with application startup
    // ...
  } catch (error) {
    console.error('Failed to start application:', error);
    process.exit(1);
  }
})();
```

---

## 💻 Code Examples

### Example 1: Complete Tool with Error Handling

```typescript
// src/mastra/tools/wcp-tools.ts (Phase 0 MVP)
import { createTool } from "@mastra/core/tools";
import { z } from "zod";
import { ValidationError } from "../../utils/error-handler.js";
import { validateInput, ExtractedWCPSchema } from "../../utils/validator.js";

export const extractWCPTool = createTool({
  id: "extract-wcp",
  description: "Extract hours, wage, and role from WCP text input.",
  inputSchema: z.object({
    content: z.string().describe("Raw WCP text"),
  }),
  outputSchema: ExtractedWCPSchema,
  execute: async ({ context }) => {
    // Step 1: Validate input
    const input = validateInput(
      z.object({ content: z.string().min(1) }),
      context
    );

    // Step 2: Extract role
    const roleMatch = input.content.match(/Role:\s*(\w+)/i);
    if (!roleMatch || !roleMatch[1]) {
      throw new ValidationError("Role not found in input", {
        input: input.content,
        pattern: "Role: <role_name>",
      });
    }
    const role = roleMatch[1];

    // Step 3: Extract hours
    const hoursMatch = input.content.match(/Hours:\s*(\d+\.?\d*)/i);
    if (!hoursMatch || !hoursMatch[1]) {
      throw new ValidationError("Hours not found in input", {
        input: input.content,
        pattern: "Hours: <number>",
      });
    }
    const hours = parseFloat(hoursMatch[1]);
    if (isNaN(hours)) {
      throw new ValidationError("Hours must be a valid number", {
        extracted: hoursMatch[1],
      });
    }
    if (hours < 0 || hours > 168) {
      throw new ValidationError("Hours must be between 0 and 168", {
        hours,
      });
    }

    // Step 4: Extract wage
    const wageMatch = input.content.match(/Wage:\s*\$?(\d+\.?\d*)/i);
    if (!wageMatch || !wageMatch[1]) {
      throw new ValidationError("Wage not found in input", {
        input: input.content,
        pattern: "Wage: $<number> or Wage: <number>",
      });
    }
    const wage = parseFloat(wageMatch[1]);
    if (isNaN(wage)) {
      throw new ValidationError("Wage must be a valid number", {
        extracted: wageMatch[1],
      });
    }
    if (wage < 0) {
      throw new ValidationError("Wage cannot be negative", { wage });
    }

    // Step 5: Validate and return
    return validateInput(ExtractedWCPSchema, { role, hours, wage });
  },
});
```

### Example 2: Test Structure

```typescript
// tests/unit/test_wcp_tools.ts (Phase 0 MVP)
import { describe, it, expect } from '@jest/globals';
import { extractWCPTool, validateWCPTool } from '../../src/mastra/tools/wcp-tools.js';
import { ValidationError } from '../../src/utils/error-handler.js';

describe('extractWCPTool', () => {
  describe('Valid Input', () => {
    it('should extract role, hours, and wage correctly', async () => {
      const result = await extractWCPTool.execute({
        context: { content: 'Role: Electrician, Hours: 40, Wage: $55.00' },
      });
      expect(result).toEqual({
        role: 'Electrician',
        hours: 40,
        wage: 55.00,
      });
    });

    it('should handle wage without dollar sign', async () => {
      const result = await extractWCPTool.execute({
        context: { content: 'Role: Laborer, Hours: 35, Wage: 30' },
      });
      expect(result).toEqual({
        role: 'Laborer',
        hours: 35,
        wage: 30,
      });
    });
  });

  describe('Invalid Input', () => {
    it('should throw ValidationError for empty content', async () => {
      await expect(
        extractWCPTool.execute({ context: { content: '' } })
      ).rejects.toThrow(ValidationError);
    });

    it('should throw ValidationError for missing role', async () => {
      await expect(
        extractWCPTool.execute({
          context: { content: 'Hours: 40, Wage: $55.00' },
        })
      ).rejects.toThrow(ValidationError);
    });

    it('should throw ValidationError for invalid hours (>168)', async () => {
      await expect(
        extractWCPTool.execute({
          context: { content: 'Role: Electrician, Hours: 200, Wage: $55.00' },
        })
      ).rejects.toThrow(ValidationError);
    });

    it('should throw ValidationError for negative wage', async () => {
      await expect(
        extractWCPTool.execute({
          context: { content: 'Role: Electrician, Hours: 40, Wage: -$10' },
        })
      ).rejects.toThrow(ValidationError);
    });
  });
});
```

---

## 🧪 Testing Patterns

### Test Coverage Requirements

**Phase 0 MVP**:
- Unit tests: >50% coverage
- Critical paths: 100% coverage
- Error handling: All error scenarios tested

**Phase 1+**:
- Unit tests: >80% coverage
- Integration tests: All workflows tested
- System tests: All end-to-end scenarios tested

### Test Structure

```
tests/
├── unit/
│   ├── test_wcp_tools.ts
│   ├── test_wcp_agent.ts
│   └── test_utils.ts
├── integration/
│   ├── test_wcp_integration.ts
│   └── test_error_handling_integration.ts
├── system/
│   └── test_wcp_system.ts
├── workflows/
│   └── test_wcp_workflows.ts
└── setup.ts
```

### Test Scenarios Checklist

**For extractWCPTool**:
- [ ] Valid input with all fields
- [ ] Valid input without dollar sign
- [ ] Empty content
- [ ] Missing role
- [ ] Missing hours
- [ ] Missing wage
- [ ] Invalid hours (>168)
- [ ] Negative hours
- [ ] Negative wage
- [ ] Non-numeric hours
- [ ] Non-numeric wage
- [ ] Case-insensitive matching

**For validateWCPTool**:
- [ ] Valid WCP (no violations)
- [ ] Overtime violation (>40 hours)
- [ ] Underpayment violation (wage < base rate)
- [ ] Unknown role
- [ ] Multiple violations
- [ ] Edge case: exactly 40 hours
- [ ] Edge case: wage exactly equals base rate

---

## 🛡️ Error Handling Patterns

### Error Classification

1. **ValidationError** (400): User input is invalid
2. **APIError** (502): External API failure
3. **ConfigurationError** (500): Configuration issue
4. **UnexpectedError** (500): Unexpected system error

### Error Response Format

```typescript
interface ErrorResponse {
  error: {
    code: string;
    message: string;
    statusCode: number;
    details?: Record<string, unknown>;
    timestamp: string;
    traceId?: string;
  };
}
```

### Error Logging Pattern

```typescript
import { logger } from './utils/logger.js';

try {
  // Operation
} catch (error) {
  if (error instanceof WCPError) {
    logger.warn('WCP error occurred', {
      code: error.code,
      message: error.message,
      details: error.details,
    });
  } else {
    logger.error('Unexpected error occurred', {
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
    });
  }
  throw error;
}
```

---

## 🔗 Integration Patterns

### Tool Integration Pattern

```typescript
// Tools are integrated into agents via Mastra configuration
import { mastra } from './mastra/index.js';

const agent = await mastra.getAgent('wcpAgent');

// Agent automatically has access to tools
const result = await agent.generate([...], {
  tools: { extractWCP: extractWCPTool, validateWCP: validateWCPTool },
});
```

### Configuration Integration Pattern

```typescript
// src/config/app-config.ts
import { z } from 'zod';
import { validateEnv } from '../utils/env-validator.js';

const AppConfigSchema = z.object({
  openai: z.object({
    apiKey: z.string(),
    model: z.string().default('gpt-4o-mini'),
  }),
  agent: z.object({
    maxSteps: z.number().default(3),
  }),
});

export type AppConfig = z.infer<typeof AppConfigSchema>;

export function loadConfig(): AppConfig {
  const env = validateEnv();
  return AppConfigSchema.parse({
    openai: {
      apiKey: env.OPENAI_API_KEY,
      model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
    },
    agent: {
      maxSteps: parseInt(process.env.AGENT_MAX_STEPS || '3', 10),
    },
  });
}
```

---

## 🔄 Migration Procedures

### Phase 0 → Phase 1 Migration

1. **Backup Current State**:
   ```bash
   git tag phase-0-complete
   git branch phase-1-migration
   ```

2. **Update Dependencies**:
   ```bash
   npm install @mastra/loggers @mastra/libsql
   ```

3. **Migrate Error Handling**:
   - Replace try-catch blocks with error handler utility
   - Update error types to use WCPError classes
   - Add structured error logging

4. **Run Tests**:
   ```bash
   npm test
   ```

5. **Verify Functionality**:
   ```bash
   npm run showcase
   ```

### Rollback Procedure

```bash
# If migration fails, rollback to previous phase
git checkout phase-0-complete
git branch -D phase-1-migration
```

---

## 📊 Performance Benchmarks

### Phase 0 MVP Targets

- **Tool Execution**: <100ms per tool call
- **Agent Response**: <2 seconds for single WCP
- **Memory Usage**: <100MB for single execution
- **Error Handling**: <10ms overhead

### Phase 1+ Targets

- **Tool Execution**: <50ms per tool call
- **Agent Response**: <1 second for single WCP
- **Memory Usage**: <200MB for single execution
- **Batch Processing**: >10 WCPs/second

### Performance Testing

```typescript
// tests/performance/test_performance.ts
import { performance } from 'perf_hooks';

describe('Performance Tests', () => {
  it('should process WCP in under 2 seconds', async () => {
    const start = performance.now();
    await processWCP('Role: Electrician, Hours: 40, Wage: $55.00');
    const end = performance.now();
    expect(end - start).toBeLessThan(2000);
  });
});
```

---

## 🔒 Security Considerations

### Phase 0 MVP Security

- [ ] Environment variables not logged
- [ ] API keys not exposed in error messages
- [ ] Input sanitization for all user inputs
- [ ] No SQL injection vulnerabilities (no SQL used yet)

### Phase 1+ Security

- [ ] Rate limiting on API calls
- [ ] Input validation and sanitization
- [ ] Error messages don't expose system internals
- [ ] Logging doesn't expose sensitive data

### Phase 4 Security

- [ ] Authentication and authorization
- [ ] HTTPS/TLS encryption
- [ ] CORS configuration
- [ ] Security headers
- [ ] Input validation middleware
- [ ] Rate limiting middleware

---

## 📝 Documentation Templates

### Code Documentation Template

```typescript
/**
 * Tool/Function Name
 * 
 * Description of what this tool/function does.
 * 
 * @param {Type} paramName - Description of parameter
 * @returns {Type} Description of return value
 * @throws {ErrorType} When this error occurs
 * 
 * @example
 * ```typescript
 * const result = await myTool.execute({ context: { input: 'test' } });
 * ```
 * 
 * @see Related documentation or files
 */
```

### Test Documentation Template

```typescript
/**
 * Test Suite: Component Name
 * 
 * Tests for [component] covering:
 * - Valid input scenarios
 * - Invalid input scenarios
 * - Error handling scenarios
 * - Edge cases
 * 
 * Coverage Target: >80%
 */
```

---

## 🎯 Implementation Checklist

### Before Starting Any Phase

- [ ] Read phase requirements document
- [ ] Review TODO.md for related items
- [ ] Review AGENTS.md for patterns
- [ ] Set up development environment
- [ ] Create feature branch
- [ ] Review acceptance criteria

### During Implementation

- [ ] Write tests alongside code
- [ ] Update documentation as you code
- [ ] Follow error handling patterns
- [ ] Use validation utilities
- [ ] Log appropriately
- [ ] Run tests frequently

### After Implementation

- [ ] All tests pass
- [ ] Test coverage meets target
- [ ] Documentation updated
- [ ] CHANGELOG.md updated
- [ ] Code review completed
- [ ] Performance benchmarks met

---

**Last Updated**: 2025-01-27  
**Version**: 1.0.0

