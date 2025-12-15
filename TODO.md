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

- **Status**: Partially Complete
- **Priority**: 🔥 **Critical**
- **Overview**: Implement comprehensive error handling with structured error types and input validation throughout the codebase

#### Current State
- **Basic Error Handling**: ✅ Try-catch blocks exist in src/index.ts and showcase/scripts/showcase.ts
- **Structured Error Types**: ❌ Missing (examples exist in _archive/error-handler.ts.example)
- **Input Validation**: ❌ Missing - tools return default values instead of validating
- **Environment Validation**: ❌ Missing - no startup validation
- **API Error Handling**: ⚠️ Basic - server.ts has try-catch but no structured errors

#### Requirements
- [ ] Create structured error types (WCPError, ValidationError, APIError, ConfigurationError)
- [ ] Add input validation to extractWCPTool (validate content, check for NaN, range validation)
- [ ] Add input validation to validateWCPTool
- [ ] Add response validation in src/index.ts
- [ ] Add environment variable validation on startup (see _archive/env-validator.ts.example)
- [ ] Add error handling to API server with structured responses

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
