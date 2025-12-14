# Phase 0: MVP (Minimum Viable Product)

**Purpose**: Fix critical issues and establish a stable foundation for the WCP AI Agent Prototype.

**Status**: Not Started  
**Priority**: 🔥 Critical  
**Timeline**: 1-2 weeks  
**Dependencies**: None (foundation phase)

---

## 🎯 Goals

1. **Fix Critical Errors**: Resolve all critical error handling issues
2. **Basic Validation**: Add basic input validation to prevent crashes
3. **Environment Setup**: Create `.env.example` and validate environment variables
4. **Basic Testing**: Implement basic test suite to prevent regressions
5. **Documentation**: Update documentation with setup instructions

---

## 📋 Requirements

### 1. Error Handling (Critical)

#### src/index.ts Issues
- [ ] Add try-catch block in async IIFE
- [ ] Add error handling for `agent.getAgent()` failures
- [ ] Add error handling for `agent.generate()` failures
- [ ] Add validation for `response.object` being null/undefined
- [ ] Add error handling for API failures (OpenAI API rate limits, network failures)
- [ ] Add graceful error messages for users

#### src/mastra/tools/wcp-tools.ts Issues
- [ ] Add error handling for invalid input (empty string, null, undefined)
- [ ] Add error handling for invalid regex matches
- [ ] Add error handling for NaN values from parseFloat
- [ ] Add error handling for unknown roles
- [ ] Add error handling for negative numbers
- [ ] Add error handling for impossible values (hours > 168)

**Acceptance Criteria**:
- ✅ No process crashes on invalid input
- ✅ All errors are caught and handled gracefully
- ✅ Error messages are clear and informative
- ✅ Errors are logged appropriately

---

### 2. Input Validation (Critical)

#### extractWCPTool Validation
- [ ] Validate input content is not empty
- [ ] Validate input content is a string
- [ ] Validate regex matches succeeded
- [ ] Validate parseFloat results are not NaN
- [ ] Validate extracted values are within reasonable ranges
- [ ] Return error status for invalid input instead of default values

#### validateWCPTool Validation
- [ ] Validate role is not empty
- [ ] Validate hours is positive and <= 168
- [ ] Validate wage is positive
- [ ] Validate role exists in DBWD rates
- [ ] Return error status for invalid input

**Acceptance Criteria**:
- ✅ Invalid input is rejected with clear error messages
- ✅ No default values returned for invalid input
- ✅ All validation errors are logged
- ✅ Validation errors are returned in structured format

---

### 3. Environment Setup (Critical)

#### .env.example File
- [ ] Create `.env.example` file with required environment variables
- [ ] Document all environment variables in `.env.example`
- [ ] Add comments explaining each environment variable
- [ ] Update `.gitignore` to exclude `.env` file

#### Environment Variable Validation
- [ ] Add environment variable validation on startup
- [ ] Validate `OPENAI_API_KEY` is present
- [ ] Validate `OPENAI_API_KEY` format (starts with `sk-`)
- [ ] Add clear error messages for missing environment variables
- [ ] Add error handling for invalid environment variables

**Acceptance Criteria**:
- ✅ `.env.example` file exists and is complete
- ✅ Environment variables are validated on startup
- ✅ Clear error messages for missing/invalid environment variables
- ✅ Setup instructions are documented in README.md

---

### 4. Basic Test Suite (Critical)

#### Test Framework Setup
- [ ] Install test framework (Jest or Vitest)
- [ ] Configure test framework in `package.json`
- [ ] Create `tests/` directory structure
- [ ] Create test configuration file
- [ ] Add test scripts to `package.json`

#### Unit Tests
- [ ] Create unit tests for `extractWCPTool`
- [ ] Create unit tests for `validateWCPTool`
- [ ] Create unit tests for `wcpAgent` (basic)
- [ ] Test error handling scenarios
- [ ] Test input validation scenarios
- [ ] Test edge cases (empty input, invalid input, unknown roles)

#### Integration Tests
- [ ] Create integration tests for WCP processing workflow
- [ ] Test end-to-end workflow (extract → validate → decide)
- [ ] Test error handling in workflow
- [ ] Test API failures in workflow

**Acceptance Criteria**:
- ✅ Test framework is configured and working
- ✅ Basic test suite is implemented (>50% coverage)
- ✅ All critical paths are tested
- ✅ All tests pass
- ✅ Test coverage report is generated

---

### 5. Documentation Updates

#### README.md Updates
- [ ] Update setup instructions with environment variables
- [ ] Add `.env.example` reference in installation instructions
- [ ] Add error handling notes
- [ ] Add test instructions
- [ ] Update project status to reflect MVP completion

#### CHANGELOG.md Updates
- [ ] Document Phase 0 changes
- [ ] Document critical fixes
- [ ] Document new features (error handling, validation, tests)

#### TODO.md Updates
- [ ] Update status of completed items
- [ ] Mark Phase 0 items as complete
- [ ] Update priority for remaining items

**Acceptance Criteria**:
- ✅ All documentation is updated
- ✅ Setup instructions are complete
- ✅ Error handling is documented
- ✅ Test instructions are documented

---

## 🔧 Technical Details

### Files to Create
- `.env.example` - Example environment variables file
- `tests/unit/test_wcp_tools.ts` - Unit tests for tools
- `tests/unit/test_wcp_agent.ts` - Unit tests for agent
- `tests/integration/test_wcp_integration.ts` - Integration tests
- `tests/setup.ts` or `tests/jest.config.ts` - Test configuration
- `src/utils/validator.ts` - Input validation utility (basic)

### Files to Modify
- `src/index.ts` - Add error handling and environment validation
- `src/mastra/tools/wcp-tools.ts` - Add error handling and input validation
- `src/mastra/agents/wcp-agent.ts` - Add error handling in agent instructions
- `package.json` - Add test scripts and test dependencies
- `README.md` - Update setup instructions and documentation
- `CHANGELOG.md` - Document Phase 0 changes
- `TODO.md` - Update status of completed items

### Dependencies to Add
- Test framework (Jest or Vitest)
- Test utilities
- Environment variable validation library (optional)

### Dependencies to Update
- None (keep existing dependencies)

---

## ✅ Acceptance Criteria

### Functional Requirements
- ✅ No process crashes on invalid input
- ✅ All errors are caught and handled gracefully
- ✅ Error messages are clear and informative
- ✅ Invalid input is rejected with clear error messages
- ✅ Environment variables are validated on startup
- ✅ Basic test suite is implemented and passing

### Non-Functional Requirements
- ✅ Test coverage >50%
- ✅ All critical paths are tested
- ✅ Documentation is updated
- ✅ Setup instructions are complete
- ✅ Error handling is documented

### Quality Gates
- ✅ All tests pass
- ✅ No critical errors
- ✅ Code review completed
- ✅ Documentation review completed
- ✅ Performance benchmarks met (no regressions)

---

## 📊 Success Metrics

### Phase 0 Completion Criteria
- ✅ Zero critical errors
- ✅ Basic test coverage (>50%)
- ✅ Environment setup documented
- ✅ Basic error handling in place
- ✅ All acceptance criteria met

### Key Performance Indicators (KPIs)
- **Error Rate**: <1% (no crashes on valid input)
- **Test Coverage**: >50%
- **Documentation Coverage**: 100% (all critical features documented)
- **Setup Time**: <10 minutes (from clone to running)

---

## 🚀 Getting Started

### Step 1: Set Up Environment
```bash
# Clone repository
git clone <repository-url>
cd wcp-ai-agent

# Install dependencies
npm install

# Create .env file from .env.example
cp .env.example .env
# Edit .env with your OPENAI_API_KEY
```

### Step 2: Run Tests
```bash
# Run all tests
npm test

# Run tests with coverage
npm test -- --coverage
```

### Step 3: Start Development
1. Create feature branch: `git checkout -b phase-0-mvp`
2. Implement error handling in `src/index.ts`
3. Implement input validation in `src/mastra/tools/wcp-tools.ts`
4. Create `.env.example` file
5. Implement environment variable validation
6. Implement basic test suite
7. Update documentation

### Step 4: Verify Completion
1. Run all tests: `npm test`
2. Check test coverage: `npm test -- --coverage`
3. Verify error handling: Test with invalid input
4. Verify environment validation: Test with missing API key
5. Review documentation: Verify all updates are complete

---

## 📝 Detailed Implementation Steps

### Step 1: Create Error Handler Utility

**File**: `src/utils/error-handler.ts`

```typescript
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
```

**Checklist**:
- [ ] Create `src/utils/` directory
- [ ] Create `error-handler.ts` with error classes
- [ ] Export error classes
- [ ] Add JSDoc comments

### Step 2: Create Input Validator Utility

**File**: `src/utils/validator.ts`

```typescript
import { z } from 'zod';
import { ValidationError } from './error-handler.js';

export const ExtractedWCPSchema = z.object({
  role: z.string().min(1, 'Role cannot be empty'),
  hours: z.number().min(0).max(168, 'Hours must be between 0 and 168'),
  wage: z.number().min(0, 'Wage cannot be negative'),
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

**Checklist**:
- [ ] Create validator utility with Zod schemas
- [ ] Add validation functions
- [ ] Add error handling
- [ ] Add tests for validator

### Step 3: Update extractWCPTool

**File**: `src/mastra/tools/wcp-tools.ts`

**Changes**:
1. Import error handler and validator
2. Add input validation at start
3. Replace default values with error throwing
4. Add validation for each extracted value
5. Return validated result

**Checklist**:
- [ ] Import error handler and validator
- [ ] Add input validation
- [ ] Replace "Unknown" with ValidationError
- [ ] Replace 0 defaults with ValidationError
- [ ] Add NaN validation
- [ ] Add range validation (hours 0-168, wage >= 0)
- [ ] Test all error scenarios

### Step 4: Create .env.example

**File**: `.env.example`

```bash
# OpenAI API Configuration
# Get your API key from https://platform.openai.com/api-keys
OPENAI_API_KEY=sk-your-api-key-here

# Optional: Model Selection
# OPENAI_MODEL=gpt-4o-mini

# Optional: Agent Configuration
# AGENT_MAX_STEPS=3

# Optional: Logging
# LOG_LEVEL=info
```

**Checklist**:
- [ ] Create `.env.example` file
- [ ] Add all required variables
- [ ] Add comments explaining each variable
- [ ] Verify `.gitignore` excludes `.env`

### Step 5: Create Environment Validator

**File**: `src/utils/env-validator.ts`

```typescript
import { z } from 'zod';

const EnvSchema = z.object({
  OPENAI_API_KEY: z.string().min(1).startsWith('sk-'),
});

export function validateEnv() {
  try {
    return EnvSchema.parse(process.env);
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new Error(
        `Missing or invalid environment variables: ${error.errors.map(e => e.path.join('.')).join(', ')}\n` +
        `Please check your .env file or create one from .env.example`
      );
    }
    throw error;
  }
}
```

**Checklist**:
- [ ] Create env validator utility
- [ ] Add validation for OPENAI_API_KEY
- [ ] Add clear error messages
- [ ] Integrate into `src/index.ts`

### Step 6: Set Up Test Framework

**Commands**:
```bash
npm install --save-dev jest @types/jest ts-jest
npm install --save-dev @jest/globals
```

**File**: `jest.config.js`

```javascript
export default {
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'node',
  extensionsToTreatAsEsm: ['.ts'],
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  testMatch: ['**/tests/**/*.test.ts'],
  collectCoverageFrom: ['src/**/*.ts', '!src/**/*.d.ts'],
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

**Checklist**:
- [ ] Install Jest and dependencies
- [ ] Create Jest configuration
- [ ] Update `package.json` test script
- [ ] Create `tests/` directory structure
- [ ] Create first test file

### Step 7: Write Unit Tests

**File**: `tests/unit/test_wcp_tools.ts`

See IMPLEMENTATION-GUIDE.md for complete test examples.

**Checklist**:
- [ ] Test valid inputs
- [ ] Test invalid inputs (empty, missing fields)
- [ ] Test edge cases (boundary values)
- [ ] Test error handling
- [ ] Achieve >50% coverage

---

## 📚 Related Documentation

- **TODO.md** - Detailed requirements for error handling and input validation
- **README.md** - Project overview and setup instructions
- **AGENTS.md** - Developer guide with error handling best practices
- **WORKFLOW.md** - User workflows and error handling scenarios
- **CHANGELOG.md** - Version history
- **IMPLEMENTATION-GUIDE.md** - Detailed implementation patterns and code examples

---

## 🔄 Phase 0 → Phase 1 Transition

### Prerequisites for Phase 1
- ✅ Phase 0 is complete (all acceptance criteria met)
- ✅ All critical errors are fixed
- ✅ Basic test suite is implemented
- ✅ Environment setup is documented
- ✅ Error handling is in place

### Handoff to Phase 1
- ✅ Phase 0 documentation is complete
- ✅ Phase 0 code is reviewed and merged
- ✅ Phase 1 planning is complete
- ✅ Phase 1 team is briefed

---

**Last Updated**: 2025-01-27  
**Version**: 1.0.0  
**Status**: Not Started  
**Maintained By**: WCP AI Agent Prototype Team

