# TODO.md - Pending Features, Fixes & Improvements

**Purpose**: This document consolidates all pending features, fixes, improvements, and optional enhancements for the WCP AI Agent Prototype.

**⚠️ MANDATORY**: This file MUST be updated whenever todos are created via `todo_write` tool.

**🚨 CRITICAL RULE**: When creating todos using the `todo_write` tool, you MUST immediately update this file with the new todo items.

**Last Updated**: 2025-01-27  
**Project Status**: Prototype  
**Audit Date**: 2025-01-27 (Complete codebase and documentation review - second pass)

---

## 📋 Summary

**Core Features**: ✅ **Complete** - Initial prototype with WCP text input parsing, DBWD validation, and LLM-powered compliance decision-making

**Build Status**: ✅ Successfully builds and compiles

---

## 🗺️ Planned Features Summary

This section provides a high-level mapping of all planned features across development phases. For detailed requirements, see the linked phase documents.

| Phase | Priority | Focus Areas | TODO Items | Details |
|-------|----------|-------------|------------|---------|
| **Phase 0: MVP** | 🔥 Critical | Error handling, validation, environment setup | Items 0, 1, 4 | [PHASE-0-MVP.md](development-plan/PHASE-0-MVP.md) |
| **Phase 1: Core** | 🔥 High | Infrastructure, configuration, utilities | Item 5 | [PHASE-1-CORE-IMPROVEMENTS.md](development-plan/PHASE-1-CORE-IMPROVEMENTS.md) |
| **Phase 2: Enhanced** | 📋 Medium | PDF parsing, more roles, evaluation | Items 2, 9, 10 | [PHASE-2-ENHANCED-FEATURES.md](development-plan/PHASE-2-ENHANCED-FEATURES.md) |
| **Phase 3: Advanced** | 📋 Medium | RAG lookup, workflows, batch processing | Items 3, 6 | [PHASE-3-ADVANCED-FEATURES.md](development-plan/PHASE-3-ADVANCED-FEATURES.md) |
| **Phase 4: Production** | 📋 Medium | API, auth, security, deployment | Item 7 | [PHASE-4-PRODUCTION-READY.md](development-plan/PHASE-4-PRODUCTION-READY.md) |

**See [ROADMAP.md](ROADMAP.md) for the complete product roadmap and phase dependencies.**

---

## 🔥 High Priority Items

### 0. Test Suite Implementation

- **Status**: Missing
- **Priority**: 🔥 **Critical**
- **Overview**: Implement comprehensive test suite (unit, integration, system, workflow tests) for all components

#### Current State
- **Directory Structure**: ✅ Exists (tests/unit/, tests/integration/, tests/system/, tests/workflows/)
- **Test Files**: ❌ Only placeholder/example files exist (test_*.example.ts or empty test files)
- **Test Framework**: ✅ Jest configured (jest.config.js, tests/setup.ts)
- **Test Runner**: ✅ npm run test works but runs no actual tests
- **Coverage**: ❌ No coverage reporting configured

#### Requirements
- [ ] Create actual unit tests for `extractWCPTool` and `validateWCPTool`
- [ ] Create unit tests for `wcpAgent`
- [ ] Create integration tests for WCP processing workflow
- [ ] Create system tests for end-to-end scenarios
- [ ] Create workflow tests for complete user scenarios
- [ ] Add test fixtures for common test data
- [ ] Add coverage reporting (jest --coverage)
- [ ] Add CI/CD test automation

---

### 1. Error Handling and Input Validation

- **Status**: Partially Complete (~50%)
- **Priority**: 🔥 **Critical**
- **Overview**: Add comprehensive error handling and input validation for all tools and agents
- **Progress**: Basic try-catch blocks exist in src/index.ts and showcase/scripts/showcase.ts, but missing response validation and specific error types

#### Critical Issues Found

**src/index.ts Issues**:
- ✅ **Has try-catch block**: Basic error handling implemented (FIXED)
- ✅ **Error handling for agent.getAgent()**: Covered by try-catch (FIXED)
- ✅ **Error handling for agent.generate()**: Covered by try-catch (FIXED)
- ❌ **No validation for response.object**: response.object might be null/undefined, code doesn't check before using
- ✅ **Error handling for API failures**: Covered by try-catch (FIXED)
- ⚠️ **Limited error specificity**: Error handling is generic - could be more specific for different error types

**src/mastra/tools/wcp-tools.ts Issues**:
- ✅ **extractWCPTool validation**: Now throws errors for missing data, failed matches, and invalid numbers (FIXED)
- ✅ **NaN validation**: Added checks for isNaN (FIXED)
- ✅ **Empty string validation**: Added check for empty content (FIXED)
- ✅ **Regex match validation**: Added checks for match failure (FIXED)
- ❌ **validateWCPTool doesn't validate negative numbers**: No validation for negative hours or wages
- ❌ **validateWCPTool doesn't validate impossible values**: No validation for hours > 168 (impossible per week)
- ✅ **Unknown role handling issue**: Unknown role returns finding instead of default values (FIXED)

#### Requirements
- [x] Add try-catch block in `src/index.ts` for error handling (COMPLETED)
- [x] Add error handling for `agent.getAgent()` failures (COMPLETED - covered by try-catch)
- [x] Add error handling for `agent.generate()` failures (COMPLETED - covered by try-catch)
- [ ] Add validation for `response.object` being null/undefined (showcase/scripts/showcase.ts has this but index.ts doesn't)
- [ ] Add specific error types/handling for different failure scenarios (API errors, validation errors, etc.)
- [ ] Add error handling for API failures (OpenAI API rate limits, network failures)
- [x] Add input validation for `extractWCPTool` (empty string, null, undefined, invalid format)
- [x] Add NaN validation for parseFloat results in `extractWCPTool`
- [x] Add validation for invalid regex matches in `extractWCPTool` (should throw error or return error status)
- [ ] Add input validation for `validateWCPTool` (negative numbers, invalid hours >168, invalid wages)
- [x] Add error handling for unknown roles in `validateWCPTool` (returns finding instead of defaulting to 0)
- [ ] Add error handling for malformed input
- [ ] Add error handling for tool execution failures
- [ ] Add error handling for agent generation failures
- [ ] Add input validation utility (`src/utils/validator.ts`)
- [ ] Integrate error handling utilities from Item 5 (Infrastructure and Utilities)
- [ ] Add tests for error handling and input validation

#### Technical Details
- **Files to Modify**: 
  - `src/index.ts`: Add try-catch block, error handling for agent.getAgent() and agent.generate(), validation for response.object
  - `src/mastra/tools/wcp-tools.ts`: Add input validation, NaN validation, error handling for invalid input
  - `src/mastra/agents/wcp-agent.ts`: Add error handling in agent instructions
- **New Files Needed**:
  - `src/utils/validator.ts`: Input validation utility
  - `tests/unit/test_error_handling.ts`: Unit tests for error handling
  - `tests/unit/test_input_validation.ts`: Unit tests for input validation
  - `tests/integration/test_error_handling_integration.ts`: Integration tests for error handling
- **Dependencies**: Error handling utilities (from Item 5), logging utility (from Item 5)

#### Notes
- Error handling should be graceful (no crashes)
- Error messages should be clear and informative
- Error handling should follow AGENTS.md best practices
- Error handling should be tested thoroughly
- Error handling utilities (error-handler.ts, logger.ts) are created in Item 5 (Infrastructure and Utilities)
- Unknown roles should return a finding instead of defaulting to { base: 0, fringe: 0 }
- Invalid input should be validated and rejected with clear error messages

---

### 2. PDF Parsing Integration

- **Status**: Planned
- **Priority**: 📋 **Medium**
- **Overview**: Integrate PDF parsing for real PDF document processing

#### Requirements
- [ ] Install and configure `pdf-parse` package
- [ ] Update extractWCPTool to handle PDF inputs
- [ ] Add PDF error handling (corrupted PDFs, unreadable PDFs)
- [ ] Add PDF fallback to text extraction
- [ ] Add PDF parsing tests

---

### 3. RAG-Based DBWD Rate Lookup

- **Status**: Planned
- **Priority**: 📋 **Medium**
- **Overview**: Replace hardcoded DBWD rates with RAG-based lookup from vector DB

#### Requirements
- [ ] Set up vector DB (Pinecone, Weaviate, or similar)
- [ ] Create DBWD PDF chunking pipeline
- [ ] Create RAG tool for DBWD rate lookup
- [ ] Update validateWCPTool to use RAG lookup
- [ ] Add caching for frequently accessed rates

---

### 4. Configuration and Environment Setup

- **Status**: Partially Complete
- **Priority**: 🔥 **Critical**
- **Overview**: Implement configuration management and environment validation

#### Current State
- **.env.example**: ✅ Created with comprehensive template
- **Environment Validation**: ❌ Missing - no startup validation
- **Configuration System**: ❌ Missing - no centralized app configuration

#### Requirements
- [ ] Add environment variable validation on startup
- [ ] Create centralized configuration system (see _archive/app-config.ts.example)
- [ ] Add configuration validation
- [ ] Add environment-specific configuration (dev, staging, production)

---

### 5. Infrastructure and Utilities

- **Status**: Missing
- **Priority**: 🔥 **High**
- **Overview**: Add logging, monitoring, and utility infrastructure

#### Requirements
- [ ] Add structured logging (PinoLogger from @mastra/loggers)
- [ ] Add health check endpoints with actual checks
- [ ] Add retry utility for API failures
- [ ] Add metrics collection
- [ ] Add error tracking and reporting

---

### 6. Multi-Document Workflows

- **Status**: Planned
- **Priority**: 📋 **Medium**
- **Overview**: Support workflow chaining for batch processing of multiple WCP documents

#### Requirements
- [ ] Create workflow using `createWorkflow` and `createStep` from Mastra
- [ ] Create WCP workflow steps (extract → validate → decide)
- [ ] Support parallel workflow execution
- [ ] Add workflow error handling and progress tracking

---

### 7. Production Deployment

- **Status**: Planned
- **Priority**: 📋 **Medium**
- **Overview**: Deploy to production with full operational capabilities

#### Requirements
- [ ] Implement REST/GraphQL API endpoints
- [ ] Add authentication and authorization
- [ ] Add rate limiting and security measures
- [ ] Set up production deployment pipeline
- [ ] Add comprehensive monitoring and alerting

---

## 📋 Medium Priority Items

### 8. Enhanced Input Parsing

- **Status**: Missing
- **Priority**: 📋 **Medium**
- **Overview**: Improve input parsing with better regex and LLM support

#### Requirements
- [ ] Improve regex patterns for better matching
- [ ] Add LLM-based parsing for unstructured input
- [ ] Add parsing fallback mechanisms
- [ ] Support various input formats (text, PDF, JSON)

---

### 9. Additional DBWD Roles

- **Status**: Planned
- **Priority**: 📋 **Medium**
- **Overview**: Add support for additional DBWD roles beyond Electrician and Laborer

#### Requirements
- [ ] Add Plumber role to DBWD rates
- [ ] Add other common roles (Carpenter, Mason, etc.)
- [ ] Create role configuration file
- [ ] Support role aliases and case-insensitive matching

---

### 10. Evaluation Framework

- **Status**: Planned
- **Priority**: 📋 **Medium**
- **Overview**: Implement evaluation framework to test on 50+ mock WCPs and achieve >95% accuracy

#### Requirements
- [ ] Create evaluation framework
- [ ] Add evaluation scorers (tool call appropriateness, completeness, compliance accuracy)
- [ ] Create test dataset with expected outcomes
- [ ] Add accuracy reporting and metrics

---

### 11. Overtime Pay Validation

- **Status**: Missing
- **Priority**: 📋 **Medium**
- **Overview**: Add proper overtime pay validation with correct calculations

#### Requirements
- [ ] Calculate overtime pay correctly (1.5x for hours > 40)
- [ ] Add overtime violation findings
- [ ] Validate overtime calculations in decisions

---

### 12. Fringe Benefit Validation

- **Status**: Missing
- **Priority**: 📋 **Medium**
- **Overview**: Add validation for fringe benefit compliance

#### Requirements
- [ ] Validate fringe benefits meet DBWD requirements
- [ ] Add fringe benefit violation findings
- [ ] Support various fringe benefit structures

---

### 13. Additional DBWD Roles (Extended)

- **Status**: Planned
- **Priority**: 📋 **Low**
- **Overview**: Add comprehensive support for all DBWD roles

#### Requirements
- [ ] Add all remaining DBWD roles from official documents
- [ ] Create automated DBWD rate import system
- [ ] Support regional rate variations

---

## 🔧 Minor Issues

### Package Configuration
- [ ] Fill in package.json author field
- [ ] Add repository URL to package.json
- [ ] Add keywords for better npm discovery

### Code Quality
- [ ] Remove duplicate type definitions between backend and frontend
- [ ] Remove unused exports from src/types/index.ts
- [ ] Update documentation references to archived files

---

## 📊 Status Summary

### Implementation Progress
- **Core Features**: ✅ Complete
- **Test Suite**: ❌ Missing
- **Error Handling**: ⚠️ 30% - Basic exists, needs structured types
- **Input Validation**: ❌ Missing
- **Configuration**: ⚠️ 50% - .env.example exists, needs system
- **Infrastructure**: ❌ Missing
- **Documentation**: ⚠️ 75% - Good coverage but some inaccuracies

### Critical Path for MVP Completion
1. Implement input validation in wcp-tools.ts
2. Add structured error types and handling
3. Create actual test implementations
4. Add environment variable validation
5. Fix documentation inconsistencies
