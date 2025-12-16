# WCP Development Roadmap

**Purpose**: Consolidated roadmap for the WCP AI Agent Prototype. This file is the single source of truth for planned work, synthesized from `TODO.md` and `development-plan/*`.

**Last Updated**: 2025-12-16  
**Project Version**: 1.0.0  
**Current Status**: Phase 1 Complete (Infrastructure & Configuration)

---

## ✅ Open Source (Available Now)

### Phase 0: Foundation
- Core architecture
- Test framework (197 passing tests)
- Documentation structure

### Phase 1: Infrastructure
- Configuration management
- Production utilities
- Error handling & logging

### Phase 2: Extraction & Explainability Layer
- **Purpose**: Reference skeleton for building trustworthy AI agents
- PDF + CSV ingestion
- Expanded data model (11 fields)
- Deterministic parsing
- LLM-assisted extraction
- Step-by-step explanations
- **Boundary**: DO NOT USE FOR REAL DECISIONS

## 🔒 Enterprise Only (Consulting Required)

### Phase 3: Advanced Processing Layer
- **Purpose**: Enterprise-grade processing systems
- Decision validation and control frameworks
- Risk management and acceptance criteria
- Enterprise-grade validation systems

*Contact for detailed implementation specifications*

### Phase 4: Production Hardening
- Multi-document processing
- Production deployment suite
- Enterprise security and monitoring
- Scalable batch processing

*Contact for detailed implementation specifications*

### Phase 5: Enterprise Integration
- Payroll system connectors
- HR platform integration
- Multi-tenant support
- Compliance reporting

*Contact for detailed implementation specifications*

**Need Phases 3+?** See [CONSULTING.md](./CONSULTING.md) for enterprise options.

**Ready to implement?** [Hire me on Upwork](https://www.upwork.com/freelancers/~01ca94c53d0d0101f3) for enterprise deployment.

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
- **Phase 1**: Infrastructure & Reliability (✅ Complete)
- **Phase 2**: Extraction & Explainability (Reference skeleton only)

#### Enterprise Edition (Paid)
- **Phase 3**: Authority & Risk Control (Decision authority)
- **Phase 4**: Production-Ready (Multi-document authority)
- **Phase 5**: Enterprise Integration (System connectors)

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

## Phase 1 (Core Improvements) — High

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

## Phase 2 (Extraction & Explainability) — Medium

**Goal**: Provide reference implementation for building trustworthy AI agents - NOT for production decisions.

**Primary Deliverables**:
- **Document ingestion**
  - PDF parsing with `pdf-parse`
  - CSV data import
  - Text extraction pipeline
- **Expanded data model**
  - Full WCP data model (11 fields vs current 3)
  - Deterministic parsing patterns
- **LLM-assisted extraction**
  - Non-authoritative RAG examples
  - Toy DBWD corpus
  - Stubbed vector retrieval
- **Explainability features**
  - Step-by-step reasoning traces
  - Deterministic validation examples
  - Synthetic datasets for testing

**Explicit Boundary**: 
- No authority guarantees
- No acceptance thresholds
- No risk assessment logic
- Educational reference only

**Source References**:
- `development-plan/PHASE-2-ENHANCED-FEATURES.md`

---

## Phase 3 (Advanced Processing) — Medium Enterprise

**Goal**: Scale beyond reference implementation to enterprise-grade processing systems.

**Primary Deliverables**:
- Advanced processing systems
- Database persistence
- Advanced validation
- Document tracking
- Workflow orchestration
- OCR capabilities

**Contact for detailed implementation specifications**

**Ready to implement?** [Hire me on Upwork](https://www.upwork.com/freelancers/~01ca94c53d0d0101f3) for enterprise deployment.

**Source References**:
- Available under enterprise agreement

---

## Phase 4 (Production Hardening) — Medium Enterprise

**Goal**: Provide production-ready processing and operational controls.

**Primary Deliverables**:
- Multi-document processing
- Production deployment suite
- Enterprise security
- Scalable batch processing
- OCR support

**Contact for detailed implementation specifications**

**Ready to implement?** [Hire me on Upwork](https://www.upwork.com/freelancers/~01ca94c53d0d0101f3) for enterprise deployment.

**Source References**:
- Available under enterprise agreement

---

## Future (By Request)

These are intentionally not scheduled until explicitly needed:

- **Overtime pay calculation validation** (requires richer wage breakdown input)
- **Fringe benefit validation** (requires richer compensation representation)
- **Advanced capabilities** (integrations, database storage, analytics)

**Source References**:
- `TODO.md` Items 11-12 (Overtime and Fringe Benefits)
