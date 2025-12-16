# WCP Development Roadmap

**Purpose**: Consolidated roadmap for the WCP AI Agent Prototype. This file is the single source of truth for planned work, synthesized from `TODO.md` and `development-plan/*`.

**Last Updated**: 2025-12-15  
**Project Version**: 1.0.0  
**Current Status**: Prototype (core workflow implemented; production hardening in progress)

---

## ✅ Open Source (Available Now)

### Phase 0: Foundation
- Core architecture
- Test framework (161 passing tests)
- Documentation structure

### Phase 1: Document Processing
- PDF ingestion
- Text extraction
- Basic parsing

### Phase 2: Basic Validation
- Federal WCP rule implementation
- Validation reporting
- Error handling

## 🔒 Enterprise Only (Consulting Required)

### Phase 3: Advanced Features
- Multi-jurisdiction compliance
- Custom rule engines
- Advanced validation layers
- Audit trail generation

### Phase 4: Production Hardening
- Circuit breakers and retry logic
- Observability and monitoring
- Performance optimization
- Deployment automation

### Phase 5: Enterprise Integration
- Payroll system connectors
- HR platform integration
- API development
- Multi-tenant support

**Need Phases 3+?** See [CONSULTING.md](./CONSULTING.md) for enterprise options.

---

## 📋 Specification Coverage

**Technical Specification Coverage**: 39% (13/33 requirements implemented)

### Current Prototype Capabilities (Phase 0)
- ✅ Basic text input parsing (role, hours, wage)
- ✅ Simple compliance validation (overtime, underpayment)
- ✅ LLM-powered decisions (APPROVED/REVISE/REJECT)
- ✅ REST API endpoints
- ✅ Mock mode for testing

### Path to Production

#### Open Source (Free)
- **Phase 0**: MVP (✅ Complete)
- **Phase 1**: Infrastructure & Reliability
- **Phase 2**: Document Processing & Expanded Extraction

#### Enterprise Edition (Paid)
- **Phase 3**: Advanced Features (RAG-DBWD, persistence, citations)
- **Phase 4**: Production-Ready (Multi-tenant, advanced security)
- **Phase 5**: Future Vision (Custom consulting engagements)

See `docs/REQUIREMENTS-TRACEABILITY.md` for detailed mapping.

---

## 🎯 Roadmap Principles

- **Phase-first planning**: Phase 0 is required before Phase 1; subsequent phases build on prior foundations.
- **Test and documentation parity**: Any feature work must ship with tests and doc updates.
- **Deterministic correctness first**: Tools (extraction/validation) must be reliable before expanding LLM behavior.

---

## ✅ What’s Implemented (Current Capabilities)

- **Core pipeline**: Text WCP input → extraction → validation → decision.
- **Deterministic tools**:
  - `extractWCPTool` (regex extraction)
  - `validateWCPTool` (overtime + underpayment checks)
- **LLM decisioning**:
  - `wcpAgent` using OpenAI `gpt-4o-mini`
  - Structured output with `WCPDecisionSchema`
- **Entry point**:
  - `src/entrypoints/wcp-entrypoint.ts` wraps `agent.generate()` with `maxSteps` and step callbacks
- **Demos**:
  - `npm run test` (simple demo runner)
  - `npm run showcase` (multi-scenario showcase)
- **Testing (partial)**:
  - Jest ESM configuration and initial unit/integration tests exist under `tests/`

---

## 🚨 Phase 0 (MVP Stabilization) — Critical

**Goal**: Make the prototype robust against invalid input and obvious runtime failures.

**Primary Deliverables**:
- **Error handling + input validation hardening**
  - Validate `extractWCPTool` parsing failures (no silent defaults)
  - Validate NaN / impossible values (hours > 168, negative numbers)
  - Improve unknown role handling (structured finding instead of rate=0)
- **Environment validation**
  - Validate `OPENAI_API_KEY` presence/format on startup
  - Add a root `.env.example` (not just `showcase/.env.example`)
- **Testing baseline**
  - Expand unit tests for tools and integration tests for core workflow

**Source References**:
- `TODO.md`
  - Item 0: Test Suite Implementation
  - Item 1: Error Handling and Input Validation
  - Item 4: Configuration and Environment Setup
- `development-plan/PHASE-0-MVP.md`

**Exit Criteria**:
- No crashes on malformed input
- Clear, actionable error messages
- Tests cover critical paths and error cases

---

## 🔥 Phase 1 (Core Improvements) — High

**Goal**: Improve maintainability and readiness for expansion.

**Primary Deliverables**:
- **Shared infrastructure utilities**
  - Logging, retry, error types, and structured error responses
- **Configuration management**
  - Centralize agent/tool configuration (model selection, maxSteps, etc.)
- **Test suite expansion**
  - Increase coverage and add more integration/system coverage where appropriate

**Source References**:
- `development-plan/PHASE-1-CORE-IMPROVEMENTS.md`
- `TODO.md` Item 5: Infrastructure and Utilities

---

## 📋 Phase 2 (Enhanced Features) — Medium

**Goal**: Add real-world inputs and expand domain coverage.

**Primary Deliverables**:
- **PDF parsing**
  - Use `pdf-parse` to extract text from PDF WCPs and reuse existing parsing/validation pipeline
- **Additional DBWD roles**
  - Add roles beyond Electrician/Laborer (e.g., Plumber) with tests
- **Evaluation framework**
  - Build a harness for running large sets of mock WCPs and scoring outcomes

**Source References**:
- `development-plan/PHASE-2-ENHANCED-FEATURES.md`
- `TODO.md` Items 2-4, 8-12 (8 features total)

---

## 📋 Phase 3 (Advanced Features) — Medium 🏢 Enterprise

**Goal**: Scale beyond hardcoded rules and single-document flows.

**Primary Deliverables**:
- **RAG-based DBWD lookup**
  - Vector DB-backed DBWD rate retrieval (replace hardcoded table)
- **Workflow chaining + batch processing**
  - Multi-document processing via Mastra workflows
- **Caching + monitoring enhancements**

**Source References**:
- `development-plan/PHASE-3-ADVANCED-FEATURES.md`
- `TODO.md` Items 6, 13-16, OCR (6 features total)

---

## 📋 Phase 4 (Production Ready) — Medium 🏢 Enterprise

**Goal**: Provide a deployable service interface with operational controls.

**Primary Deliverables**:
- **API surface**
  - REST endpoints for single and batch processing
  - Input validation, response normalization, error handling
- **Security**
  - Authn/authz, rate limiting
- **Operations**
  - Deployment procedures, health checks, metrics

**Source References**:
- `development-plan/PHASE-4-PRODUCTION-READY.md`
- `TODO.md` Item 7 (Production Deployment Suite - 1 comprehensive feature)

---

## 🔮 Future (By Request)

These are intentionally not scheduled until explicitly needed:

- **Overtime pay calculation validation** (requires richer wage breakdown input)
- **Fringe benefit validation** (requires richer compensation representation)
- **Advanced capabilities** (integrations, database storage, analytics)

**Source References**:
- `TODO.md` Items 11-12 (Overtime and Fringe Benefits)
