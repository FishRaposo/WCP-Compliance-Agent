# Example Files Guide

**Purpose**: This document explains the example/mockup files in the project and how to use them.

**Last Updated**: 2025-01-27

---

## 📋 Overview

This project includes example/mockup files (with `.example` extension) that show the structure and implementation patterns for files that need to be created. These files serve as templates and guides for implementation.

---

## 📁 Example Files

### Configuration Files

#### `.env.example`
**Location**: Root directory  
**Purpose**: Template for environment variables  
**Status**: Ready to use  
**Usage**:
```bash
# Copy to create your .env file
cp .env.example .env

# Edit .env with your actual API keys
# Then run: npm run test or npm run showcase
```

**Contains**:
- Required: `OPENAI_API_KEY`
- Optional: `OPENAI_MODEL`, `AGENT_MAX_STEPS`, `LOG_LEVEL`, `NODE_ENV`
- Future: Database, Redis, Vector DB configuration (commented out)

---

### Test Files

#### `tests/unit/test_wcp_tools.example.ts`
**Location**: `tests/unit/`  
**Purpose**: Example unit tests for WCP tools  
**Status**: Template - needs implementation  
**Usage**:
```bash
# 1. Install Jest
npm install --save-dev jest @types/jest ts-jest @jest/globals

# 2. Copy example file
cp tests/unit/test_wcp_tools.example.ts tests/unit/test_wcp_tools.ts

# 3. Implement tests
# 4. Run: npm test
```

**Contains**:
- Unit tests for `extractWCPTool`
- Unit tests for `validateWCPTool`
- Valid input scenarios
- Invalid input scenarios
- Edge cases

#### `tests/integration/test_wcp_integration.example.ts`
**Location**: `tests/integration/`  
**Purpose**: Example integration tests  
**Status**: Template - needs implementation  
**Usage**: Same as unit tests example

**Contains**:
- End-to-end workflow tests
- Error handling integration tests
- Tool call integration tests

#### `jest.config.js.example`
**Location**: Root directory  
**Purpose**: Jest configuration template  
**Status**: Template - needs implementation  
**Usage**:
```bash
# Copy to create Jest config
cp jest.config.js.example jest.config.js

# Adjust configuration as needed
# Run: npm test
```

**Contains**:
- TypeScript/ESM configuration
- Test file patterns
- Coverage thresholds
- Module name mapping

#### `tests/setup.ts.example`
**Location**: `tests/`  
**Purpose**: Test setup configuration  
**Status**: Template - needs implementation  
**Usage**: Copy to `tests/setup.ts` and reference in `jest.config.js`

**Contains**:
- Environment variable setup
- Global test utilities
- Mock configuration
- Cleanup code

---

### Utility Files

#### `src/utils/error-handler.ts.example`
**Location**: `src/utils/`  
**Purpose**: Error handler utility template  
**Status**: Template - needs implementation (Phase 0 MVP)  
**Usage**:
```bash
# Copy to create error handler
cp src/utils/error-handler.ts.example src/utils/error-handler.ts

# Import and use in tools/agents
# Add tests
```

**Contains**:
- `WCPError` base class
- `ValidationError` class
- `APIError` class
- `ConfigurationError` class
- `UnexpectedError` class
- Error response formatting

#### `src/utils/validator.ts.example`
**Location**: `src/utils/`  
**Purpose**: Input validator utility template  
**Status**: Template - needs implementation (Phase 0 MVP)  
**Usage**: Copy to `src/utils/validator.ts` and implement

**Contains**:
- Zod schemas for validation
- `validateInput` function
- `validateNonEmptyString` function
- `validatePositiveNumber` function
- `validateHours` function
- `validateWage` function
- `validateRole` function

#### `src/utils/env-validator.ts.example`
**Location**: `src/utils/`  
**Purpose**: Environment variable validator template  
**Status**: Template - needs implementation (Phase 0 MVP)  
**Usage**: Copy to `src/utils/env-validator.ts` and call `validateEnv()` at startup

**Contains**:
- Environment schema definition
- `validateEnv` function
- `getEnv` helper function
- `requireEnv` helper function

---

### Configuration Files

#### `src/config/app-config.ts.example`
**Location**: `src/config/`  
**Purpose**: Application configuration template  
**Status**: Template - needs implementation (Phase 1)  
**Usage**: Copy to `src/config/app-config.ts` and implement

**Contains**:
- Application configuration schema
- `loadConfig` function
- Default configuration values

---

## 🚀 Quick Start

### Step 1: Set Up Environment
```bash
# Copy .env.example to .env
cp .env.example .env

# Edit .env with your OpenAI API key
# OPENAI_API_KEY=sk-your-actual-key-here
```

### Step 2: Set Up Tests (Phase 0 MVP)
```bash
# Install Jest
npm install --save-dev jest @types/jest ts-jest @jest/globals

# Copy Jest config
cp jest.config.js.example jest.config.js

# Copy test setup
cp tests/setup.ts.example tests/setup.ts

# Copy test examples
cp tests/unit/test_wcp_tools.example.ts tests/unit/test_wcp_tools.ts
cp tests/integration/test_wcp_integration.example.ts tests/integration/test_wcp_integration.ts

# Run tests
npm test
```

### Step 3: Set Up Utilities (Phase 0 MVP)
```bash
# Create utils directory
mkdir -p src/utils

# Copy utility examples
cp src/utils/error-handler.ts.example src/utils/error-handler.ts
cp src/utils/validator.ts.example src/utils/validator.ts
cp src/utils/env-validator.ts.example src/utils/env-validator.ts

# Implement and integrate
```

### Step 4: Set Up Configuration (Phase 1)
```bash
# Create config directory
mkdir -p src/config

# Copy config example
cp src/config/app-config.ts.example src/config/app-config.ts

# Implement and integrate
```

---

## 📝 Implementation Checklist

### Phase 0 MVP
- [ ] Copy `.env.example` to `.env` and fill in API key
- [ ] Copy `jest.config.js.example` to `jest.config.js`
- [ ] Copy `tests/setup.ts.example` to `tests/setup.ts`
- [ ] Copy test example files and implement tests
- [ ] Copy `src/utils/error-handler.ts.example` and implement
- [ ] Copy `src/utils/validator.ts.example` and implement
- [ ] Copy `src/utils/env-validator.ts.example` and implement
- [ ] Integrate utilities into tools and agents
- [ ] Add tests for utilities

### Phase 1: Core Improvements
- [ ] Copy `src/config/app-config.ts.example` and implement
- [ ] Integrate configuration into application
- [ ] Add tests for configuration

---

## 🔗 Related Documentation

- **TODO.md** - Detailed requirements for all pending items
- **README.md** - Project overview and setup instructions
- **AGENTS.md** - Developer guide with patterns

---

**Last Updated**: 2025-01-27

