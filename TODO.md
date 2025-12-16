# TODO.md - Pending Features, Fixes & Improvements

**Purpose**: This document consolidates all pending features, fixes, and improvements for the WCP AI Agent Prototype.

**⚠️ MANDATORY**: This file MUST be updated whenever todos are created via `todo_write` tool.

**🚨 CRITICAL RULE**: When creating todos using the `todo_write` tool, you MUST immediately update this file with the new todo items.

**Last Updated**: 2025-12-16  
**Project Status**: Phase 1 Complete (Infrastructure & Configuration)  
**Audit Date**: 2025-12-16 (Phase 1 completion verification)

---

## 📋 Summary

**Core Features**: ✅ **Complete** - Initial prototype with WCP text input parsing, DBWD validation, and LLM-powered compliance decision-making

**Build Status**: ✅ Successfully builds and compiles (verified 2025-12-16)

**Test Suite**: ✅ **Complete** - All tests passing (169/169 active tests, 28 server-dependent skipped), verified for Phase 1

**Error Handling**: ✅ **Complete** - Comprehensive error handling with response validation and API-specific error types

**Input Validation**: ✅ **Complete** - Full input validation in both extractWCPTool and validateWCPTool

**Environment Setup**: ✅ **Complete** - Working environment validation with clear error messages

**Documentation**: ✅ **Complete** - Comprehensive documentation system with Phase 0 completion documented

---

## 🗺️ Planned Features Summary

This section provides a high-level mapping of all planned features across development phases. For detailed requirements, see the linked phase documents.

**Legend**:
- 🏢 **Enterprise** - Features available in Enterprise Edition only
- 📋 **Standard** - Features available in all editions

### Feature Count by Phase
- **Phase 2**: 8 features 📋 Standard (Document Processing, Data Extraction, RAG Lookup, Enhanced Parsing, DBWD Roles, Evaluation, Overtime, Fringe Benefits)
- **Phase 3**: 6 features 🏢 Enterprise (Database, Batch Processing, Advanced Validation, Citations, Workflows, OCR)
- **Phase 4**: 1 feature 🏢 Enterprise (Production Deployment Suite)
- **Total**: 15 planned features

| Phase | Priority | Focus Areas | TODO Items | Details |
|-------|----------|-------------|------------|---------|
| **Phase 0: MVP** | 🔥 **Complete** (2025-12-15) | Error handling, validation, environment setup, tests | [PHASE-0-MVP.md](development-plan/PHASE-0-MVP.md) |
| **Phase 1: Core** | 🔥 **Complete** (2025-12-16) | Infrastructure, configuration, utilities | Item 5 | [PHASE-1-CORE-IMPROVEMENTS.md](development-plan/PHASE-1-CORE-IMPROVEMENTS.md) |
| **Phase 2: Enhanced** | 📋 **Next** | 8 features: PDF/CSV parsing, data extraction, RAG lookup | Items 2-4, 8-12 | [PHASE-2-ENHANCED-FEATURES.md](development-plan/PHASE-2-ENHANCED-FEATURES.md) |
| **Phase 3: Advanced** | 🏢 Enterprise | 6 features: Database, batch processing, workflows | Items 6, 13-16, OCR | [PHASE-3-ADVANCED-FEATURES.md](development-plan/PHASE-3-ADVANCED-FEATURES.md) |
| **Phase 4: Production** | 🏢 Enterprise | 1 feature: Production deployment suite | Item 7 | [PHASE-4-PRODUCTION-READY.md](development-plan/PHASE-4-PRODUCTION-READY.md) |

**See [ROADMAP.md](ROADMAP.md) for the complete product roadmap and phase dependencies.**

---

## 🔥 High Priority Items

### ✅ COMPLETED - Phase 1 Core Improvements (Critical) - 2025-12-16

All Phase 1 requirements have been successfully implemented and verified:

- **Configuration Management**: Complete configuration system with centralized config files
- **Infrastructure Utilities**: All core utilities implemented (retry, validator, health-check, monitor, metrics, database, logger, errors)
- **Mastra Integration**: PinoLogger and LibSQLStore fully integrated
- **Test Suite**: 197 tests implemented (169 passing, 28 server-dependent skipped)
- **Build Status**: All dependencies installed, build successful

### 🔥 High Priority Items (Ready for Phase 2)

#### 5. Infrastructure and Utilities - ✅ **COMPLETE** (2025-12-16)

- **Status**: ✅ Implementation complete, all tests passing
- **Overview**: Added logging, monitoring, and utility infrastructure for production readiness
- **Completed Requirements**: 
  - [x] Add structured logging (PinoLogger from @mastra/loggers)
  - [x] Add health check endpoints with actual checks
  - [x] Add retry utility for API failures
  - [x] Add metrics collection
  - [x] Add error tracking and reporting
  - [x] Add configuration management system
  - [x] Add database utility for LibSQL integration
  - [x] Add comprehensive input validation
  - [x] Add performance monitoring
- **Technical Implementation**:
  - Dependencies: @mastra/loggers@0.10.19, @mastra/libsql@0.16.4
  - Storage configuration using LibSQLStore in `src/mastra/index.ts`
  - Configuration files: `src/config/*.ts` (agent, db, app)
  - Utilities: `src/utils/*.ts` (8 utility files)
  - Test coverage: 197 tests (169 passing, 28 server-dependent)
## 📋 Medium Priority Items (Phase 2 - Next)

### 2. Document Processing Suite

#### PDF Parsing Integration
- **Status**: Planned for Phase 2
- **Overview**: Add PDF parsing support to handle real WCP documents
- **Requirements**:
  - [ ] Install and integrate `pdf-parse` package
  - [ ] Update `extractWCPTool` to handle PDF inputs
  - [ ] Add PDF text extraction and preprocessing
  - [ ] Add PDF metadata extraction
  - [ ] Add PDF error handling and validation
  - [ ] Add PDF parsing tests
- **Technical Details**:
  - PDF parsing with `pdf-parse` package
  - Text preprocessing and cleaning
  - Metadata extraction for document tracking
  - Error handling for corrupted/unreadable PDFs
- **Notes**: See [PHASE-2-ENHANCED-FEATURES.md](development-plan/PHASE-2-ENHANCED-FEATURES.md) for complete requirements

#### CSV Parsing Support
- **Status**: Planned for Phase 2
- **Overview**: Add CSV parsing for structured WCP data imports
- **Requirements**:
  - [ ] Install `csv-parser` or `papaparse` package
  - [ ] Create CSV parsing function for structured WCP data
  - [ ] Support various CSV formats (different column headers)
  - [ ] Handle CSV encoding issues
  - [ ] Add CSV validation and error handling
  - [ ] Add CSV parsing tests
- **Notes**: Quick win for Phase 2

#### OCR Support (Optional)
- **Status**: Planned for Phase 3 🏢 Enterprise
- **Overview**: Add OCR capabilities for scanned PDFs
- **Requirements**:
  - [ ] Install `tesseract.js` for OCR capabilities
  - [ ] Create OCR preprocessing for scanned PDFs
  - [ ] Add image preprocessing for better OCR accuracy
  - [ ] Add OCR confidence scoring
  - [ ] Add OCR fallback mechanisms
- **Notes**: Optional advanced feature for Phase 3

### 3. Expanded Data Extraction

- **Status**: Planned for Phase 2
- **Overview**: Extract full WCP data model (11 fields vs current 3)
- **Requirements**:
  - [ ] Update `TWCPReport` schema to match specification (11 fields)
  - [ ] Extract employee names (not just roles)
  - [ ] Extract job titles with DBWD classification mapping
  - [ ] Extract locality information (county/zip)
  - [ ] Extract hours by day (not just total)
  - [ ] Extract separate base and fringe rates
  - [ ] Detect and extract signatures
  - [ ] Extract project and subcontractor information
  - [ ] Handle multiple employees per WCP
  - [ ] Validate required fields presence
- **Notes**: Critical for real-world WCP compliance

### 4. RAG-Based DBWD Rate Lookup

- **Status**: Planned for Phase 2
- **Overview**: Replace hardcoded DBWD rates with RAG-based lookup from vector DB
- **Requirements**:
  - [ ] Set up vector DB (Pinecone, Weaviate, or similar)
  - [ ] Create DBWD PDF chunking pipeline
  - [ ] Create RAG tool for DBWD rate lookup
  - [ ] Update validateWCPTool to use RAG lookup
  - [ ] Add caching for frequently accessed rates
  - [ ] Add RAG integration tests
- **Technical Details**:
  - Vector DB integration with embeddings
  - PDF processing and chunking
  - Semantic search capabilities
  - Caching strategy for performance
- **Notes**: See [PHASE-2-ENHANCED-FEATURES.md](development-plan/PHASE-2-ENHANCED-FEATURES.md) for complete requirements

### 6. Multi-Document Workflows

- **Status**: Planned for Phase 3 🏢 Enterprise
- **Overview**: Support workflow chaining for batch processing of multiple WCP documents
- **Requirements**:
  - [ ] Create workflow using `createWorkflow` and `createStep` from Mastra
  - [ ] Create WCP workflow steps (extract → validate → decide)
  - [ ] Support parallel workflow execution
  - [ ] Add workflow error handling and progress tracking
  - [ ] Add workflow tests
- **Technical Details**:
  - Mastra workflow orchestration
  - Parallel processing capabilities
  - Progress tracking and status reporting
  - Error handling in workflow context
- **Notes**: See [PHASE-3-ADVANCED-FEATURES.md](development-plan/PHASE-3-ADVANCED-FEATURES.md) for complete requirements

### 7. Production Deployment

- **Status**: Planned for Phase 4 🏢 Enterprise
- **Overview**: Deploy to production with full operational capabilities
- **Requirements**:
  - [ ] Implement REST/GraphQL API endpoints
  - [ ] Add authentication and authorization
  - [ ] Add rate limiting and security measures
  - [ ] Set up production deployment pipeline
  - [ ] Add comprehensive monitoring and alerting
  - [ ] Add performance optimization
  - [ ] Add production deployment tests
- **Technical Details**:
  - API gateway and middleware
  - Authentication and authorization system
  - Rate limiting and DDoS protection
  - Security headers and HTTPS/TLS encryption
  - CI/CD pipeline with automated testing
  - Production monitoring and observability
- **Notes**: See [PHASE-4-PRODUCTION-READY.md](development-plan/PHASE-4-PRODUCTION-READY.md) for complete requirements

---

## 📋 Medium Priority Items

### 8. Enhanced Input Parsing

- **Status**: Planned for Phase 2
- **Overview**: Improve input parsing with better regex and LLM support
- **Requirements**:
  - [ ] Improve regex patterns for better matching
  - [ ] Add LLM-based parsing for unstructured input
  - [ ] Add parsing fallback mechanisms
  - [ ] Support various input formats (text, PDF, JSON)
  - [ ] Add parsing tests for edge cases
- **Technical Details**:
  - Advanced regex patterns
  - LLM-based data extraction
  - Fallback parsing strategies
  - Multiple input format support
- **Notes**: This is a lower priority compared to PDF parsing

### 9. Additional DBWD Roles

- **Status**: Phase 2 (basic) → Phase 3 (extended)
- **Overview**: Add comprehensive support for all DBWD roles
- **Phase 2 Requirements** (Quick win):
  - [ ] Add Plumber role to DBWD rates
  - [ ] Add other common roles (Carpenter, Mason, etc.)
  - [ ] Create role configuration file
  - [ ] Support role aliases and case-insensitive matching
  - [ ] Add role validation tests
- **Phase 3 Requirements** (Full coverage) 🏢 Enterprise:
  - [ ] Add all remaining DBWD roles from official documents
  - [ ] Create automated DBWD rate import system
  - [ ] Support regional rate variations
  - [ ] Add comprehensive role validation
  - [ ] Add extended role tests
- **Technical Details**:
  - Extended DBWD rate structure
  - Role configuration management
  - Case-insensitive matching
  - Role alias support
  - Regional rate support
  - Automated rate import system
- **Notes**: Phase 2 adds common roles, Phase 3 provides full DBWD coverage

### 10. Evaluation Framework

- **Status**: Planned for Phase 2
- **Overview**: Implement evaluation framework to test on 50+ mock WCPs and achieve >95% accuracy
- **Requirements**:
  - [ ] Create evaluation framework
  - [ ] Add evaluation scorers (tool call appropriateness, completeness, compliance accuracy)
  - [ ] Create test dataset with expected outcomes
  - [ ] Add accuracy reporting and metrics
  - [ ] Add evaluation tests
- **Technical Details**:
  - Evaluation metrics and scoring
  - Test data management
  - Accuracy calculation and reporting
  - Performance benchmarking
- **Notes**: This will help validate the effectiveness of the WCP processing system

### 11. Overtime Pay Validation

- **Status**: Planned for Phase 2
- **Overview**: Add proper overtime pay validation with correct calculations
- **Requirements**:
  - [ ] Calculate overtime pay correctly (1.5x for hours > 40)
  - [ ] Add overtime violation findings
  - [ ] Validate overtime calculations in decisions
  - [ ] Add overtime validation tests
- **Technical Details**:
  - Overtime calculation logic (1.5x rate)
  - Overtime violation detection
  - Integration with compliance decision-making
  - Validation of overtime pay calculations
- **Notes**: This is important for complete compliance checking

### 12. Fringe Benefit Validation

- **Status**: Planned for Phase 2
- **Overview**: Add validation for fringe benefit compliance
- **Requirements**:
  - [ ] Validate fringe benefits meet DBWD requirements
  - [ ] Add fringe benefit violation findings
  - [ ] Support various fringe benefit structures
  - [ ] Add fringe benefit validation tests
- **Technical Details**:
  - Fringe benefit compliance rules
  - Multiple benefit structure support
  - Integration with existing validation system
  - Fringe benefit calculation validation
- **Notes**: This completes the compliance checking capabilities

### 13. Persistence Layer & Database

- **Status**: Planned for Phase 3 🏢 Enterprise
- **Overview**: Implement full database integration for storing WCPs, decisions, and audit trails
- **Requirements**:
  - [ ] Complete database.ts implementation (currently stubs)
  - [ ] Set up PostgreSQL database (Supabase or managed instance)
  - [ ] Create database schema matching specification
  - [ ] Implement tables: docs, wcp_reports, dbwd_records, decisions, audit_traces
  - [ ] Add database connection pooling
  - [ ] Add database migrations
  - [ ] Add database backup strategy
  - [ ] Support tenant isolation (multi-tenancy prep)
  - [ ] Support document versioning
  - [ ] Add database indexing for performance
- **Notes**: Critical for Phase 3 features

### 14. Batch Processing

- **Status**: Planned for Phase 3 🏢 Enterprise
- **Overview**: Add batch processing capabilities for large-scale processing
- **Requirements**:
  - [ ] Create batch processing API endpoints
  - [ ] Support async processing with status tracking
  - [ ] Add job queue system
  - [ ] Support bulk file uploads
  - [ ] Add batch result aggregation
  - [ ] Add batch processing monitoring
  - [ ] Add batch error handling and retry
- **Notes**: Essential for enterprise deployments

### 15. Advanced Validation Features

- **Status**: Planned for Phase 3 🏢 Enterprise
- **Overview**: Implement advanced validation including signatures and arithmetic checks
- **Requirements**:
  - [ ] Add signature validation capabilities
  - [ ] Implement arithmetic validation for totals
  - [ ] Add cross-field validation rules
  - [ ] Support custom validation rules
  - [ ] Add validation rule configuration
  - [ ] Add validation audit logging
- **Notes**: Completes compliance checking capabilities

### 16. Citation System

- **Status**: Planned for Phase 3 🏢 Enterprise
- **Overview**: Add DBWD citation support for decisions
- **Requirements**:
  - [ ] Store DBWD citations with decisions
  - [ ] Link findings to specific DBWD sections
  - [ ] Generate citation reports
  - [ ] Support citation formatting
  - [ ] Add citation validation
- **Notes**: Important for audit and compliance

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
- [ ] Add performance optimizations
- [ ] Improve code documentation consistency

---

## 📊 Status Summary

### Implementation Progress
- **Core Features**: ✅ Complete (Phase 0)
- **Error Handling**: ✅ Complete (Phase 0)
- **Input Validation**: ✅ Complete (Phase 0)
- **Environment Setup**: ✅ Complete (Phase 0)
- **Test Suite**: ✅ Complete (Phase 1)
- **Documentation**: ✅ Complete (Phase 1)
- **Infrastructure**: ✅ Complete (Phase 1)
- **Configuration**: ✅ Complete (Phase 1)

### Phase Status
- **Phase 0**: ✅ **Complete** (2025-12-15) - All MVP requirements implemented and verified
- **Phase 1**: ✅ **Complete** (2025-12-16) - All infrastructure and utilities implemented and verified
- **Phase 2**: 📋 **Next** - Enhanced features with PDF parsing and RAG lookup
- **Phase 3**: 📋 **Planned** - Advanced features with workflows and batch processing
- **Phase 4**: 📋 **Planned** - Production deployment with full operational capabilities

### Critical Path for Next Development
1. **Start Phase 2**: Implement Document Processing Suite and Data Extraction (Items 2-4)
2. **Continue Phase 2**: Add RAG lookup, DBWD roles, and evaluation framework (Items 8-12)
3. **Progress to Phase 3**: Implement database, workflows, and batch processing (Items 6, 13-16)
4. **Prepare Phase 4**: Production deployment suite implementation (Item 7)

---

## 📚 Related Documentation

- **README.md** - Project overview and getting started guide
- **CONTEXT.md** - Project architecture and philosophy
- **AGENTS.md** - Developer guide with patterns and conventions
- **WORKFLOW.md** - User workflows and validation guide
- **EVALS.md** - Evaluation and testing guide
- **CHANGELOG.md** - Version history
- **docs/INDEX.md** - Documentation navigation hub
- **development-plan/** - Complete phase planning and requirements
- **PHASE-0-MVP.md** - Phase 0 MVP requirements (COMPLETED)
- **PHASE-1-CORE-IMPROVEMENTS.md** - Phase 1 core improvements (COMPLETE)
- **PHASE-2-ENHANCED-FEATURES.md** - Phase 2 enhanced features (PLANNED)
- **PHASE-3-ADVANCED-FEATURES.md** - Phase 3 advanced features (PLANNED)
- **PHASE-4-PRODUCTION-READY.md** - Phase 4 production guide (PLANNED)

---

**Last Updated**: 2025-12-16  
**Version**: 0.1.0  
**Status**: Phase 1 Complete - Ready for Phase 2  
**Maintained By**: WCP AI Agent Prototype Team