# EVALS.md - Evaluation & Testing Guide

**Purpose**: This document provides evaluation criteria, test scenarios, and quality checks for the WCP AI Agent Prototype. Use this to verify feature completeness, code quality, and system reliability.

**Last Updated**: 2025-01-27  
**Project Status**: Prototype

---

## 📊 Evaluation Overview

### Current Status

- **Functionality**: ✅ Core features implemented
- **Code Quality**: ✅ Type-safe with Zod validation
- **Testing**: 🚧 Test script implemented, full test suite planned
- **Documentation**: ✅ Comprehensive documentation system in place

### Evaluation Categories

1. **Functionality**: Feature completeness and correctness
2. **Code Quality**: Linting, style, best practices
3. **Testing**: Test coverage and test execution
4. **Architecture**: Design patterns and structure
5. **Performance**: Response times and resource usage
6. **User Experience**: UI/UX consistency and accessibility
7. **Error Handling**: Graceful degradation and error recovery
8. **Documentation**: Completeness and accuracy

---

## 🧪 Test Execution

### Running All Tests

```bash
# Command to run all tests (when test suite is implemented)
npm run test

# Or using ts-node directly (requires --esm flag for ES modules)
ts-node --esm src/index.ts
```

### Running Test Categories

```bash
# Unit tests - Test isolated modules and functions (when test suite is implemented)
npm run test tests/unit/

# Integration tests - Test cross-module workflows (when test suite is implemented)
npm run test tests/integration/

# System tests - Test end-to-end scenarios (when test suite is implemented)
npm run test tests/system/

# Workflow tests - Test complete workflows (when test suite is implemented)
npm run test tests/workflows/

# All tests (when test suite is implemented)
npm run test
```

### Test Organization

**⚠️ RECOMMENDED: Create `tests/TEST_ORGANIZATION.md`** for complex test suites (>50 tests or multiple test types).

**When to create:**
- ✅ Test suite has multiple test types (Unit, Integration, System, Workflow)
- ✅ Test organization is complex
- ✅ Team needs clear test structure guidelines
- ✅ Test consolidation and optimization is important

**See**: `tests/TEST_ORGANIZATION.md` - Complete test organization guide (recommended for complex test suites)

---

## ✅ Functionality Evaluation

### Core Features Checklist

- [x] **WCP Text Input Parsing**: Extract role, hours, and wage from text input
- [x] **DBWD Rate Validation**: Validate against hardcoded DBWD rates
- [x] **LLM-Powered Decision Making**: Make compliance decisions (Approve/Revise/Reject)
- [x] **Structured Output**: Return structured JSON with audit trails
- [ ] **PDF Parsing**: Extract WCP data from PDF documents (planned)
- [ ] **RAG-Based DBWD Lookup**: Dynamic DBWD rate lookup from vector DB (planned)
- [ ] **Multi-Document Workflows**: Batch processing of multiple WCP documents (planned)

### Data Extraction Checklist

- [x] **Role Extraction**: Extract role from WCP text input
- [x] **Hours Extraction**: Extract hours from WCP text input
- [x] **Wage Extraction**: Extract wage from WCP text input
- [ ] **PDF Parsing**: Extract data from PDF documents (planned)
- [ ] **Error Handling**: Handle invalid or missing data gracefully

### Validation Checklist

- [x] **Overtime Detection**: Detect hours > 40
- [x] **Underpayment Detection**: Detect wage < base rate
- [x] **DBWD Rate Lookup**: Look up rates for known roles
- [ ] **Unknown Role Handling**: Handle unknown roles gracefully (planned)
- [ ] **RAG-Based Lookup**: Dynamic rate lookup from vector DB (planned)

### Decision Making Checklist

- [x] **Approved Decision**: Return Approved when no violations found
- [x] **Revise Decision**: Return Revise when minor violations found
- [x] **Reject Decision**: Return Reject when major violations found
- [x] **Explanation Generation**: Generate human-readable explanation
- [x] **Trace Log Generation**: Generate step-by-step reasoning log

---

## 📋 Code Quality Evaluation

### Linting
- [ ] Zero errors
- [ ] Zero warnings (or all warnings are visible - no suppressions)
- [ ] No warning suppressions (e.g., `@ts-ignore`, `// eslint-disable`)
- [ ] TypeScript strict mode enabled

### Test Quality
- [ ] All tests pass
- [ ] No skipped tests (tests fail properly instead of silently skipping)
- [ ] Test execution verified (run immediately after writing, run full suite before complete)
- [ ] Test coverage is adequate (>80% target)

### Style
- [ ] Consistent code style
- [ ] Proper indentation and formatting
- [ ] Clear variable and function names
- [ ] Proper comments and documentation

### Warning Visibility
- [ ] No warning suppressions in code (`@ts-ignore`, etc.)
- [ ] No warning suppressions in config (`--disable-warnings`, etc.)
- [ ] All warnings and issues are visible (no hidden problems)
- [ ] All skipped tests fixed or removed (tests fail properly instead)

---

## 🏗️ Architecture Evaluation

### Design Patterns
- [x] **Hybrid Approach**: Combines deterministic tools with LLM agents
- [x] **Type Safety**: Zod schemas throughout for type-safe validation
- [x] **Bounded Execution**: maxSteps=3 prevents infinite loops
- [x] **Full Auditability**: Step-by-step traces for compliance auditing

### Code Organization
- [x] **Separation of Concerns**: Tools, agents, and test scripts are separated
- [x] **Modularity**: Each component is modular and reusable
- [x] **Extensibility**: Designed for easy extension to new features

---

## ⚡ Performance Evaluation

### Response Time
- [ ] **Target**: < 5 seconds for single WCP processing
- [ ] **Measurement**: Measure response time for various inputs
- [ ] **Optimization**: Optimize tool calls and LLM requests

### Resource Usage
- [ ] **Memory**: Monitor memory usage during processing
- [ ] **CPU**: Monitor CPU usage during processing
- [ ] **API Calls**: Monitor API call counts and costs

---

## 🎨 UX Evaluation

### User Experience
- [ ] **Input Format**: Clear input format requirements
- [ ] **Output Format**: Clear output format with explanations
- [ ] **Error Messages**: Clear and informative error messages
- [ ] **Documentation**: Comprehensive documentation for users

---

## 🚀 Quick Evaluation Checklist

### Pre-Release Checklist

- [ ] All core features implemented
- [ ] All tests pass
- [ ] Code quality standards met
- [ ] Documentation is complete
- [ ] Performance targets met
- [ ] Error handling is robust
- [ ] Security considerations addressed

### Functionality Checklist

- [ ] WCP text input parsing works correctly
- [ ] DBWD rate validation works correctly
- [ ] LLM-powered decision making works correctly
- [ ] Structured output is correct
- [ ] Error handling is robust

### Code Quality Checklist

- [ ] Zero linting errors
- [ ] Zero linting warnings (or all visible)
- [ ] All tests pass
- [ ] Test coverage is adequate
- [ ] Code style is consistent

### Documentation Checklist

- [ ] README.md is complete
- [ ] CONTEXT.md is complete
- [ ] AGENTS.md is complete
- [ ] WORKFLOW.md is complete
- [ ] EVALS.md is complete
- [ ] CHANGELOG.md is up to date

---

**Last Updated**: 2025-01-27
