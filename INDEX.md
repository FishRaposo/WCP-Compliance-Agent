# Project Index - WCP AI Agent Prototype

**Purpose**: Complete navigation index mapping all files and directories in the project.

**⚠️ MANDATORY**: This file is REQUIRED for all projects.

**Why INDEX.md is valuable:**
- Quick file discovery without reading multiple docs
- Visual file mapping with purposes and locations
- Cross-references between directories
- Statistics and metrics at a glance
- Essential navigation tool for developers

**Last Updated**: 2025-12-14  
**Version**: 1.0.0

---

## 🎯 Quick Navigation

- **[Core Files](#core-files)** - Main application code
- **[Entry Point](#entry-point)** - How to start the application
- **[Configuration](#configuration)** - Config files and settings
- **[Documentation](#documentation)** - All documentation files
- **[Tests](#tests)** - Test suite organization (if applicable)
- **[Utilities](#utilities)** - Helper scripts and tools
- **[Directories](#directories)** - Subdirectories and their purposes

---

## 🎯 Core Files

**Location**: `src/` directory  
**Purpose**: Main application code for WCP AI Agent Prototype

| File | Purpose | Lines | Key Components |
|------|---------|-------|----------------|
| **src/index.ts** | Demo runner for agent validation | 46 | Calls entrypoint, structured output, audit trail logging |
| **src/entrypoints/wcp-entrypoint.ts** | LLM entrypoint orchestration | 31 | generateWcpDecision, agent retrieval, bounded execution |
| **showcase/scripts/showcase.ts** | Showcase demo script (6 scenarios) | 216 | Professional demo with color-coded output, multiple scenarios |
| **src/mastra/index.ts** | Mastra registration | 30 | Mastra instance, agent registration |
| **src/mastra/tools/wcp-tools.ts** | WCP tools for extraction and validation | 106 | extractWCPTool, validateWCPTool, DBWD rates |
| **src/mastra/agents/wcp-agent.ts** | WCP agent for compliance decision-making | 75 | wcpAgent, WCPDecisionSchema, OpenAI integration |

### Example/Mockup Files

| File | Purpose | Status |
|------|---------|--------|
| **.env.example** | Environment variables template | ✅ Ready to use |
| **jest.config.js.example** | Jest configuration template | 📝 Template |
| **tests/setup.ts.example** | Test setup template | 📝 Template |
| **tests/unit/test_wcp_tools.example.ts** | Unit test example | 📝 Template |
| **tests/integration/test_wcp_integration.example.ts** | Integration test example | 📝 Template |
| **tests/system/test_wcp_system.example.ts** | System test example | 📝 Template |
| **tests/workflows/test_wcp_workflows.example.ts** | Workflow test example | 📝 Template |
| **src/utils/error-handler.ts.example** | Error handler utility template | 📝 Template |
| **src/utils/validator.ts.example** | Input validator utility template | 📝 Template |
| **src/utils/env-validator.ts.example** | Environment validator template | 📝 Template |
| **src/config/app-config.ts.example** | Application configuration template | 📝 Template |
| **README-EXAMPLES.md** | Guide for using example files | ✅ Ready to use |

---

## 🚀 Entry Point

| File | Purpose | Usage |
|------|---------|-------|
| **src/index.ts** | Demo runner for agent validation | `npm run test` or `ts-node --esm src/index.ts` |
| **src/entrypoints/wcp-entrypoint.ts** | LLM entrypoint orchestration | Imported by `src/index.ts` |
| **showcase/scripts/showcase.ts** | Showcase demo script (6 scenarios) | `npm run showcase` |

---

## 📁 File Location Quick Reference

### Code Files
| What | Where |
|------|-------|
| WCP Tools | `src/mastra/tools/wcp-tools.ts` |
| WCP Agent | `src/mastra/agents/wcp-agent.ts` |
| Mastra Registration | `src/mastra/index.ts` |
| LLM Entrypoint | `src/entrypoints/wcp-entrypoint.ts` |
| Showcase Script | `showcase/scripts/showcase.ts` |
| Test Script | `src/index.ts` |

### Documentation Files
| What | Where |
|------|-------|
| Project Overview | `README.md` |
| Architecture | `CONTEXT.md` |
| Developer Guide | `AGENTS.md` |
| File Index | `INDEX.md` |
| Workflows | `WORKFLOW.md` |
| TODO List | `TODO.md` |

### Configuration Files
| What | Where |
|------|-------|
| Package Config | `package.json` |
| TypeScript Config | `tsconfig.json` |
| Environment Variables | `.env` (create this) |
| Git Ignore | `.gitignore` |

---

## 🛠️ Utilities

Currently no utility files. Future utilities will be added to `utils/` directory.

**See**: `utils/INDEX.md` for details (when utils/ has 5+ files)

---

## 📚 Documentation

### Root-Level Documentation

| File | Purpose | Audience |
|------|---------|----------|
| **README.md** | Project overview & quick start | Everyone |
| **CONTEXT.md** | Architecture & philosophy | Developers |
| **AGENTS.md** | Developer guide | Developers |
| **CLAUDE.md** | Quick reference | Developers |
| **DOCUMENTATION.md** | Documentation navigation guide | Everyone |
| **DOCUMENTATION-OVERVIEW.md** | Overview of all documentation files | Everyone |
| **WORKFLOW.md** | User workflows & validation | QA testers, developers |
| **OPERATIONS.md** | Deployment and operations guide | Developers, DevOps |
| **TODO.md** | Pending features, fixes & improvements | Project managers, developers |
| **CHANGELOG.md** | Version history | Everyone |
| **EVALS.md** | Evaluation guide | QA testers, developers |
| **INDEX.md** | Project-wide navigation index | Everyone |

**See**: `docs/INDEX.md` for technical documentation (when docs/ has 5+ files)

---

## 📦 Configuration

**Location**: Root directory

| File | Purpose |
|------|---------|
| **package.json** | Node.js package configuration, dependencies, scripts |
| **tsconfig.json** | TypeScript compiler configuration |
| **.gitignore** | Git ignore patterns |
| **.env** | Environment variables (create this with OPENAI_API_KEY) |
| **dist/** | Compiled JavaScript (generated by npm run build) |

**See**: `config/INDEX.md` for details (when config/ has 5+ files)

---

## 💾 Data Files

Currently no data files. Future data files will be added to `data/` directory.

**See**: `data/INDEX.md` for details (when data/ has 5+ files)

---

## 📖 Documentation Files

**Location**: `docs/` directory

| File | Purpose |
|------|---------|
| **docs/PROMPT-VALIDATION.md** | ⚠️ **MANDATORY**: 5-phase validation system |
| **docs/PROMPT-VALIDATION-QUICK.md** | Quick 5-minute validation checklist |
| **docs/DOCUMENTATION-MAINTENANCE.md** | ⚠️ **MANDATORY**: Automatic documentation maintenance guide |
| **docs/TOOL-CALL-LIMITS.md** | ⚠️ **RECOMMENDED**: Tool call optimization guidelines |
| **docs/MVP-TEMPLATE-REBUILD-PLAN.md** | MVP refactoring plan and execution log |
| **docs/PROJECT-MAPPING.md** | Complete project mapping and reference |
| **docs/AI Payroll Compliance Agent — Technical Specification.md** | Technical specification document |
| **docs/DOCUMENTATION-BLUEPRINT.md** | Documentation architecture blueprint |

### Development Plan Documentation

**Location**: `docs/development-plan/`

| File | Purpose |
|------|---------|
| **docs/development-plan/OVERVIEW.md** | High-level overview of all development phases |
| **docs/development-plan/PHASE-0-MVP.md** | Phase 0: MVP requirements and implementation |
| **docs/development-plan/PHASE-1-CORE-IMPROVEMENTS.md** | Phase 1: Core improvements roadmap |
| **docs/development-plan/PHASE-2-ENHANCED-FEATURES.md** | Phase 2: Enhanced features plan |
| **docs/development-plan/PHASE-3-ADVANCED-FEATURES.md** | Phase 3: Advanced features roadmap |
| **docs/development-plan/PHASE-4-PRODUCTION-READY.md** | Phase 4: Production-ready deployment guide |
| **docs/development-plan/IMPLEMENTATION-GUIDE.md** | Implementation patterns and examples |
| **docs/development-plan/TESTING-GUIDE.md** | Testing guide and best practices |

---

## 🧪 Tests

**Location**: `tests/` directory

### Test Organization

Test types and their locations:
- **Unit Tests**: `tests/unit/` - Test isolated modules and functions
- **Integration Tests**: `tests/integration/` - Test cross-module workflows
- **System Tests**: `tests/system/` - Test end-to-end scenarios
- **Workflow Tests**: `tests/workflows/` - Test complete workflows

| Directory | Purpose | Test Files |
|-----------|---------|------------|
| **tests/unit/** | Isolated module/function tests | `test_wcp_tools.test.ts` |
| **tests/integration/** | Cross-module workflow tests | `test_wcp_integration.test.ts` |
| **tests/system/** | End-to-end scenario tests | (planned) |
| **tests/workflows/** | Complete workflow simulation tests | (planned) |

**See**: `tests/INDEX.md` for complete mapping (when tests/ has 5+ files)
**See**: `tests/TEST_ORGANIZATION.md` for test organization guide (recommended for complex test suites)

---

## 📂 Directories

### Active Directories

| Directory | Purpose | Key Files |
|-----------|---------|-----------|
| **src/** | Source code | index.ts, mastra/ |
| **src/mastra/** | Mastra framework code | tools/, agents/, index.ts |
| **src/mastra/tools/** | Mastra tools | wcp-tools.ts |
| **src/mastra/agents/** | Mastra agents | wcp-agent.ts |
| **docs/** | Technical documentation | PROMPT-VALIDATION.md, DOCUMENTATION-MAINTENANCE.md |
| **tests/** | Test suite | (planned) |

### Archive/Deprecated Directories

| Directory | Purpose |
|-----------|---------|
| **_archive/** | Archive directory (currently empty - reserved for future archival needs) |

---

## 📊 Project Statistics

- **Core Files**: 5 files in `src/`
- **Showcase Script**: 1 file in `showcase/scripts/` (`showcase/scripts/showcase.ts`)
- **Root Documentation**: 15 files
- **Technical Documentation**: 4 files in `docs/` (3 mandatory + 1 recommended)
- **Optional Documentation**: 2 files (OPERATIONS.md, docs/TOOL-CALL-LIMITS.md)
- **Test Files**: 2 files (Jest)
- **Showcase Script**: 1 file (`showcase/scripts/showcase.ts`) - Professional demo with 6 scenarios
- **Configuration Files**: 3 files (package.json, tsconfig.json, .gitignore)
- **Build Status**: ✅ Successfully builds and compiles
- **Dependencies**: Mastra 0.24.0, @ai-sdk/openai 2.0.65, Zod 3.22.0, chalk 5.3.0
- **Archive**: 1 directory (`_archive/`) - Contains archived documentation files
- **Showcase Ready**: ✅ Professional demo script with multiple scenarios

---

## 🗺️ Navigation Quick Links

### By Purpose

- **Understanding the code**: `src/` → Core files → Module docstrings
- **Understanding architecture**: `CONTEXT.md` → Architecture decisions
- **Finding documentation**: `DOCUMENTATION.md` → Documentation navigation guide
- **Finding tests**: `tests/` → Test suite (when implemented)

### By Directory - Index Files

Each major directory has its own INDEX.md for detailed mapping:

- **Root**: This file (`INDEX.md`) - ⚠️ **MANDATORY** - Complete project overview
- **docs/**: `docs/INDEX.md` - ⚠️ **MANDATORY** when docs/ has 5+ files
- **config/**: `config/INDEX.md` - ⚠️ **MANDATORY** when config/ has 5+ files
- **data/**: `data/INDEX.md` - ⚠️ **MANDATORY** when data/ has 5+ files
- **tests/**: `tests/INDEX.md` - ⚠️ **MANDATORY** when tests/ has 5+ files
- **utils/**: `utils/INDEX.md` - ⚠️ **MANDATORY** when utils/ has 5+ files

---

## 📁 Codebase Structure Overview

### Directory Structure

```
wcp-agent/
├── src/                          # Source code
│   ├── entrypoints/              # Entrypoints (LLM orchestration)
│   │   └── wcp-entrypoint.ts      # LLM entrypoint orchestration
│   ├── mastra/                   # Mastra framework code
│   │   ├── tools/                # Mastra tools
│   │   │   └── wcp-tools.ts      # Extract & validate tools
│   │   ├── agents/               # Mastra agents
│   │   │   └── wcp-agent.ts      # LLM agent with decision logic
│   │   └── index.ts              # Mastra registration
│   └── index.ts                  # Demo runner
├── showcase/                     # Showcase folder (scripts + docs)
│   ├── scripts/
│   │   └── showcase.ts          # Showcase demo script (6 scenarios)
│   └── [documentation files]     # Showcase documentation
├── docs/                         # Technical documentation
│   ├── PROMPT-VALIDATION.md      # Validation system
│   ├── PROMPT-VALIDATION-QUICK.md # Quick validation checklist
│   ├── DOCUMENTATION-MAINTENANCE.md # Documentation maintenance guide
│   └── TOOL-CALL-LIMITS.md       # Tool call optimization guidelines
├── tests/                        # Test suite
│   ├── unit/
│   │   ├── test_wcp_tools.test.ts
│   │   └── test_wcp_tools.example.ts  # Unit test example
│   ├── integration/
│   │   ├── test_wcp_integration.test.ts
│   │   └── test_wcp_integration.example.ts  # Integration test example
│   ├── system/                   # System tests (planned)
│   │   └── test_wcp_system.example.ts  # System test example
│   ├── workflows/                # Workflow tests (planned)
│   │   └── test_wcp_workflows.example.ts  # Workflow test example
│   ├── setup.ts                  # Jest setup
│   └── setup.ts.example          # Test setup template
├── src/
│   ├── utils/                    # Utility functions (planned)
│   │   ├── error-handler.ts.example  # Error handler template
│   │   ├── validator.ts.example     # Input validator template
│   │   └── env-validator.ts.example # Environment validator template
│   └── config/                   # Configuration (planned)
│       └── app-config.ts.example    # Application config template
├── .env.example                  # Environment variables template
├── jest.config.js               # Jest configuration
├── jest.config.js.example       # Jest configuration template
└── README-EXAMPLES.md            # Example files guide
├── showcase/                     # Showcase documentation (for recruiters/hiring managers)
│   ├── README.md                 # Showcase folder overview
│   ├── PROJECT-OVERVIEW.md       # Comprehensive project overview
│   ├── SHOWCASE.md               # Demo guide and talking points
│   ├── QUICK-START.md            # 5-minute setup guide
│   └── SHOWCASE-QUICK-START.md   # Quick reference for showcase
├── _archive/                     # Archive directory (archived documentation files)
│   ├── README.md                 # Archive directory documentation
│   └── documentation/            # Archived documentation files
├── README.md                     # Project overview
├── CONTEXT.md                    # Architecture & philosophy
├── AGENTS.md                     # Developer guide
├── CLAUDE.md                     # Quick reference
├── DOCUMENTATION.md              # Documentation navigation guide
├── DOCUMENTATION-OVERVIEW.md     # Overview of all documentation files
├── WORKFLOW.md                   # User workflows & validation
├── TODO.md                       # Pending features, fixes & improvements
├── CHANGELOG.md                  # Version history
├── EVALS.md                      # Evaluation guide
├── INDEX.md                      # Project-wide navigation index (this file)
├── package.json                  # Node.js package configuration
├── tsconfig.json                 # TypeScript compiler configuration
├── .gitignore                    # Git ignore patterns
├── .env                          # Environment variables (create this with OPENAI_API_KEY)
├── dist/                         # Compiled JavaScript (generated by npm run build)
```

### Core Files Table

| File | Responsibility | Key Components |
|------|---------------|----------------|
| **src/mastra/tools/wcp-tools.ts** | Data extraction and validation | extractWCPTool, validateWCPTool, DBWD rates |
| **src/mastra/agents/wcp-agent.ts** | Compliance decision-making | wcpAgent, WCPDecisionSchema, OpenAI integration |
| **src/mastra/index.ts** | Mastra registration | Mastra instance, agent registration |
| **src/index.ts** | Test script | Agent execution, structured output, audit trail logging |

### Finding Code by Functionality

- **WCP Data Extraction**: `src/mastra/tools/wcp-tools.ts` → `extractWCPTool`
- **WCP Data Validation**: `src/mastra/tools/wcp-tools.ts` → `validateWCPTool`
- **Compliance Decision-Making**: `src/mastra/agents/wcp-agent.ts` → `wcpAgent`
- **Agent Execution**: `src/index.ts` → Test script

### Design Principles

1. **Hybrid Approach**: Combines deterministic tools for accuracy with LLM agents for reasoning
2. **Type Safety**: Zod schemas throughout for type-safe validation
3. **Bounded Execution**: maxSteps=3 prevents infinite loops
4. **Full Auditability**: Step-by-step traces for compliance auditing
5. **Extensibility**: Designed for easy extension to new features

---

## 📚 Related Documentation

- **README.md** - Project overview and getting started
- **CONTEXT.md** - Architecture decisions and philosophy
- **AGENTS.md** - Developer guide with patterns
- **DOCUMENTATION.md** - Central guide to all documentation

---

**Last Updated**: 2025-01-27  
**Version**: 1.0.0  
**Maintained By**: WCP AI Agent Prototype Team
