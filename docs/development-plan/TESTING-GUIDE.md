# Testing Guide

**Purpose**: Comprehensive guide for writing, running, and maintaining tests across all development phases.

**Last Updated**: 2025-01-27  
**Version**: 1.0.0

---

## 📋 Table of Contents

1. [Test Framework Setup](#test-framework-setup)
2. [Test Structure](#test-structure)
3. [Test Types](#test-types)
4. [Test Scenarios](#test-scenarios)
5. [Test Coverage Requirements](#test-coverage-requirements)
6. [Running Tests](#running-tests)
7. [Test Best Practices](#test-best-practices)
8. [Test Maintenance](#test-maintenance)

---

## 🛠️ Test Framework Setup

### Phase 0 MVP: Basic Setup

**Dependencies**:
```json
{
  "devDependencies": {
    "jest": "^29.7.0",
    "@types/jest": "^29.5.0",
    "ts-jest": "^29.1.0",
    "@jest/globals": "^29.7.0"
  }
}
```

**Jest Configuration** (`jest.config.js`):
```javascript
export default {
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'node',
  extensionsToTreatAsEsm: ['.ts'],
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  testMatch: ['**/tests/**/*.test.ts'],
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*.d.ts',
    '!src/index.ts', // Exclude test scripts
    '!showcase/scripts/showcase.ts',
  ],
  coverageThreshold: {
    global: {
      branches: 50,
      functions: 50,
      lines: 50,
      statements: 50,
    },
  },
};
```

**Package.json Scripts**:
```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "test:unit": "jest tests/unit",
    "test:integration": "jest tests/integration",
    "test:system": "jest tests/system"
  }
}
```

### Phase 1+: Enhanced Setup

**Additional Dependencies**:
```json
{
  "devDependencies": {
    "@mastra/test-utils": "^0.24.0", // If available
    "supertest": "^6.3.0", // For API testing (Phase 4)
    "@types/supertest": "^2.0.16"
  }
}
```

---

## 📁 Test Structure

### Directory Structure

```
tests/
├── unit/
│   ├── test_wcp_tools.ts
│   ├── test_wcp_agent.ts
│   ├── test_error_handler.ts
│   ├── test_validator.ts
│   └── test_utils.ts
├── integration/
│   ├── test_wcp_integration.ts
│   ├── test_error_handling_integration.ts
│   └── test_workflow_integration.ts
├── system/
│   ├── test_wcp_system.ts
│   └── test_end_to_end.ts
├── workflows/
│   └── test_wcp_workflows.ts
├── fixtures/
│   ├── valid-wcps.ts
│   ├── invalid-wcps.ts
│   └── mock-responses.ts
└── setup.ts
```

### Test File Naming Convention

- Unit tests: `test_<component>.ts`
- Integration tests: `test_<feature>_integration.ts`
- System tests: `test_<scenario>_system.ts`
- Workflow tests: `test_<workflow>_workflows.ts`

---

## 🧪 Test Types

### Unit Tests

**Purpose**: Test individual components in isolation.

**Example**:
```typescript
// tests/unit/test_wcp_tools.ts
import { describe, it, expect, beforeEach } from '@jest/globals';
import { extractWCPTool } from '../../src/mastra/tools/wcp-tools.js';
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
  });

  describe('Invalid Input', () => {
    it('should throw ValidationError for empty content', async () => {
      await expect(
        extractWCPTool.execute({ context: { content: '' } })
      ).rejects.toThrow(ValidationError);
    });
  });
});
```

### Integration Tests

**Purpose**: Test interactions between components.

**Example**:
```typescript
// tests/integration/test_wcp_integration.ts
import { describe, it, expect } from '@jest/globals';
import { mastra } from '../../src/mastra/index.js';

describe('WCP Processing Integration', () => {
  it('should process WCP end-to-end', async () => {
    const agent = await mastra.getAgent('wcpAgent');
    const response = await agent.generate([
      { role: 'user', content: 'Role: Electrician, Hours: 40, Wage: $55.00' },
    ], {
      structuredOutput: { schema: WCPDecisionSchema },
      maxSteps: 3,
    });

    expect(response.object).toBeDefined();
    expect(response.object.status).toBe('Approved');
  });
});
```

### System Tests

**Purpose**: Test complete system behavior.

**Example**:
```typescript
// tests/system/test_wcp_system.ts
import { describe, it, expect } from '@jest/globals';

describe('WCP System Tests', () => {
  it('should handle complete workflow with error recovery', async () => {
    // Test complete system with error scenarios
  });
});
```

---

## 📝 Test Scenarios

### extractWCPTool Test Scenarios

**Valid Scenarios**:
- [ ] Standard format: "Role: Electrician, Hours: 40, Wage: $55.00"
- [ ] Without dollar sign: "Role: Laborer, Hours: 35, Wage: 30"
- [ ] Decimal hours: "Role: Electrician, Hours: 40.5, Wage: $55.00"
- [ ] Decimal wage: "Role: Electrician, Hours: 40, Wage: $55.50"
- [ ] Case-insensitive: "role: electrician, hours: 40, wage: $55.00"
- [ ] Extra whitespace: "Role:  Electrician  , Hours:  40  , Wage:  $55.00  "

**Invalid Scenarios**:
- [ ] Empty content
- [ ] Missing role
- [ ] Missing hours
- [ ] Missing wage
- [ ] Invalid hours (>168)
- [ ] Negative hours
- [ ] Negative wage
- [ ] Non-numeric hours
- [ ] Non-numeric wage
- [ ] Null input
- [ ] Undefined input
- [ ] Non-string input

### validateWCPTool Test Scenarios

**Valid Scenarios**:
- [ ] Valid WCP (no violations)
- [ ] Valid WCP with exactly 40 hours
- [ ] Valid WCP with wage exactly equal to base rate

**Violation Scenarios**:
- [ ] Overtime violation (>40 hours)
- [ ] Underpayment violation (wage < base rate)
- [ ] Unknown role
- [ ] Multiple violations (overtime + underpayment)

**Edge Cases**:
- [ ] Exactly 40 hours (no overtime)
- [ ] Exactly 41 hours (overtime)
- [ ] Wage exactly equals base rate
- [ ] Wage $0.01 below base rate
- [ ] Wage $0.01 above base rate

---

## 📊 Test Coverage Requirements

### Phase 0 MVP

- **Overall Coverage**: >50%
- **Critical Paths**: 100%
- **Error Handling**: All error scenarios tested
- **Input Validation**: All validation rules tested

### Phase 1+

- **Overall Coverage**: >80%
- **All Components**: >80%
- **Error Handling**: 100%
- **Integration Points**: 100%

### Coverage Reports

```bash
# Generate coverage report
npm run test:coverage

# View HTML coverage report
open coverage/lcov-report/index.html
```

---

## 🚀 Running Tests

### Basic Commands

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run with coverage
npm run test:coverage

# Run specific test file
npm test tests/unit/test_wcp_tools.ts

# Run tests matching pattern
npm test -- --testNamePattern="extractWCPTool"
```

### CI/CD Integration

```yaml
# .github/workflows/test.yml
name: Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '20'
      - run: npm install
      - run: npm test
      - run: npm run test:coverage
```

---

## ✅ Test Best Practices

### 1. Test Organization

- Group related tests with `describe` blocks
- Use descriptive test names
- Follow AAA pattern (Arrange, Act, Assert)

### 2. Test Isolation

- Each test should be independent
- Use `beforeEach`/`afterEach` for setup/teardown
- Don't rely on test execution order

### 3. Test Data

- Use fixtures for reusable test data
- Create test data factories
- Use meaningful test data

### 4. Error Testing

- Test both success and failure paths
- Test error messages
- Test error types

### 5. Coverage

- Aim for meaningful coverage, not just high numbers
- Focus on critical paths
- Don't test implementation details

---

## 🔧 Test Maintenance

### When to Update Tests

- When adding new features
- When fixing bugs
- When refactoring code
- When requirements change

### Test Review Checklist

- [ ] All tests pass
- [ ] Coverage meets requirements
- [ ] Tests are readable and maintainable
- [ ] Tests follow best practices
- [ ] Test data is appropriate
- [ ] Error scenarios are covered

---

**Last Updated**: 2025-01-27  
**Version**: 1.0.0

