# Codebase and Documentation Organization

**Purpose**: This document describes the organization structure of the WCP AI Agent Prototype codebase and documentation.

**Last Updated**: 2025-01-27  
**Version**: 1.0.0

---

## 📁 Directory Structure

### Source Code (`src/`)

```
src/
├── index.ts                    # Test script (entry point)
└── mastra/                     # Mastra framework code
    ├── index.ts                # Mastra registration
    ├── tools/                  # Deterministic tools
    │   └── wcp-tools.ts        # Extract & validate tools
    └── agents/                 # LLM agents
        └── wcp-agent.ts        # Compliance decision-making agent
```

**Organization Principles**:
- **Separation of Concerns**: Tools, agents, and registration are separated
- **Modularity**: Each component is in its own file
- **Clear Hierarchy**: Source code → Mastra → Tools/Agents

### Documentation Structure

#### Root-Level Documentation (13 files)

**Core Documentation**:
1. **README.md** - Project overview and getting started
2. **CONTEXT.md** - Architecture decisions and philosophy
3. **AGENTS.md** - Developer implementation guide

**Technical Documentation**:
4. **WORKFLOW.md** - User workflows and validation guide
5. **EVALS.md** - Evaluation and testing guide
6. **TODO.md** - Pending features and improvements
7. **CHANGELOG.md** - Version history

**Navigation & Reference**:
8. **INDEX.md** - Project-wide navigation index
9. **DOCUMENTATION.md** - Documentation navigation guide
10. **DOCUMENTATION-OVERVIEW.md** - Overview of all documentation files
12. **CLAUDE.md** - Quick reference for developers

#### Technical Documentation (`docs/` - 8 files)

1. **PROMPT-VALIDATION.md** - ⚠️ **MANDATORY**: 5-phase validation system
2. **PROMPT-VALIDATION-QUICK.md** - Quick 5-minute validation checklist
3. **DOCUMENTATION-MAINTENANCE.md** - ⚠️ **MANDATORY**: Automatic documentation maintenance guide
4. **ORGANIZATION.md** - Codebase and documentation organization structure (this file)
5. **ARCHIVE-ANALYSIS.md** - Analysis of archived files and implementation recommendations
6. **NAVIGATION-GUIDE.md** - ⭐ **Navigation guide** - Find what you need quickly
7. **SHOWCASE-QUICK-START.md** - Quick start guide for showcase demo
8. **TOOL-CALL-LIMITS.md** - ⚠️ **RECOMMENDED**: Tool call optimization guidelines

### Configuration Files

- **package.json** - Node.js package configuration
- **tsconfig.json** - TypeScript compiler configuration
- **.gitignore** - Git ignore patterns
- **.env.example** - Example environment variables file (referenced in documentation)

### Archive (`_archive/`)

- Currently empty - reserved for future archival needs

---

## 📝 Code Organization

### Import Organization

**Standard Import Order**:
1. **External dependencies** - Third-party packages (e.g., `@mastra/core`, `zod`)
2. **Internal dependencies** - Project files (e.g., `./tools/wcp-tools`)
3. **Type imports** - Type-only imports (if any)

**Example**:
```typescript
// External dependencies
import { openai } from "@ai-sdk/openai";
import { Agent } from "@mastra/core";
import { z } from "zod";

// Internal dependencies
import { extractWCPTool, validateWCPTool } from "../tools/wcp-tools";
```

### File Naming Conventions

- **Source files**: `kebab-case.ts` (e.g., `wcp-tools.ts`, `wcp-agent.ts`)
- **Exports**: `camelCase` (e.g., `extractWCPTool`, `validateWCPTool`, `wcpAgent`)
- **Documentation files**: `UPPERCASE.md` (e.g., `README.md`, `CONTEXT.md`)
- **Configuration files**: `lowercase.json` or `.lowercase` (e.g., `package.json`, `.gitignore`)

### Code Structure

**Tool Files** (`src/mastra/tools/`):
- Constants (e.g., `DBWDRates`)
- Tool definitions (e.g., `extractWCPTool`, `validateWCPTool`)
- Exports

**Agent Files** (`src/mastra/agents/`):
- Schema definitions (e.g., `WCPDecisionSchema`)
- Agent definitions (e.g., `wcpAgent`)
- Exports

**Registration Files** (`src/mastra/index.ts`):
- Imports
- Mastra instance creation
- Exports

**Test Scripts** (`src/index.ts`):
- Imports
- Test execution code
- Console output

---

## 📚 Documentation Organization

### Documentation Categories

**By Purpose**:
- **Understanding "Why"**: CONTEXT.md (philosophy, architecture decisions)
- **Understanding "How"**: AGENTS.md (implementation patterns, conventions)
- **Understanding "What"**: README.md (features, overview), WORKFLOW.md (user workflows), EVALS.md (evaluation criteria)

**By Audience**:
- **Everyone**: README.md, INDEX.md, CHANGELOG.md, DOCUMENTATION.md
- **Developers**: CONTEXT.md, AGENTS.md, CLAUDE.md, docs/PROMPT-VALIDATION.md, docs/DOCUMENTATION-MAINTENANCE.md
- **QA Testers**: WORKFLOW.md, EVALS.md
- **Project Managers**: TODO.md, CHANGELOG.md

**By Type**:
- **Core Documentation**: README.md, CONTEXT.md, AGENTS.md
- **Technical Documentation**: WORKFLOW.md, EVALS.md, docs/PROMPT-VALIDATION.md, docs/DOCUMENTATION-MAINTENANCE.md
- **Navigation & Reference**: INDEX.md, DOCUMENTATION.md, DOCUMENTATION-OVERVIEW.md, CLAUDE.md
- **Project Management**: TODO.md, CHANGELOG.md

### Documentation Structure Standards

**All Documentation Files Follow This Structure**:
1. **Header** - Title, purpose, last updated, version, status
2. **Overview** - Brief description of the document
3. **Main Content** - Organized by sections and subsections
4. **Related Documentation** - Links to related docs
5. **Footer** - Last updated, version, status

**Section Organization**:
- Use consistent heading levels (##, ###, ####)
- Use consistent formatting (tables, code blocks, lists)
- Use consistent cross-references (See **FILE.md** for details)
- Use consistent status indicators (✅, 🚧, ❌, ⚠️)

---

## 🔄 Organizational Principles

### Code Organization Principles

1. **Separation of Concerns**: Tools, agents, and registration are separated
2. **Modularity**: Each component is in its own file
3. **Clear Hierarchy**: Source code → Mastra → Tools/Agents
4. **Consistent Naming**: Files use kebab-case, exports use camelCase
5. **Import Organization**: External dependencies first, then internal dependencies
6. **Type Safety**: Zod schemas throughout for type-safe validation

### Documentation Organization Principles

1. **By Purpose**: Organized by what they help understand (Why, How, What)
2. **By Audience**: Organized by who should read them (Everyone, Developers, QA, PMs)
3. **By Type**: Organized by document type (Core, Technical, Navigation, Management)
4. **Consistent Structure**: All docs follow the same structure
5. **Cross-References**: All docs reference each other appropriately
6. **Navigation**: INDEX.md provides complete navigation

### File Organization Principles

1. **Root Level**: Core documentation and configuration files
2. **docs/**: Technical documentation (mandatory guides)
3. **src/**: Source code organized by framework (Mastra)
4. **tests/**: Test suite (planned, organized by test type)
5. **_archive/**: Archived code that doesn't fit the structure

---

## ✅ Organization Checklist

### Code Organization

- [x] Source code organized by framework (Mastra)
- [x] Tools and agents separated into different directories
- [x] Consistent file naming (kebab-case for files)
- [x] Consistent export naming (camelCase for exports)
- [x] Import organization (external → internal)
- [x] Type safety (Zod schemas throughout)
- [x] Clear separation of concerns

### Documentation Organization

- [x] Root-level documentation organized by purpose
- [x] Technical documentation in `docs/` directory
- [x] Consistent documentation structure
- [x] Consistent cross-references
- [x] Navigation index (INDEX.md)
- [x] Documentation navigation guide (DOCUMENTATION.md)
- [x] Documentation overview (DOCUMENTATION-OVERVIEW.md)

### Configuration Organization

- [x] Configuration files at root level
- [x] Environment variables documented (.env.example referenced)
- [x] TypeScript configuration (tsconfig.json)
- [x] Package configuration (package.json)
- [x] Git ignore patterns (.gitignore)

### Archive Organization

- [x] Archived code in `_archive/` directory
- [x] Archived code documented in INDEX.md
- [x] Archived code excluded from main structure

---

## 📊 Organization Statistics

### Code Organization

- **Source Files**: 5 files (includes showcase script)
  - `src/index.ts` - Test script (basic test)
  - `showcase/scripts/showcase.ts` - Showcase demo script (6 scenarios)
  - `src/mastra/index.ts` - Mastra registration
  - `src/mastra/tools/wcp-tools.ts` - Extract & validate tools
  - `src/mastra/agents/wcp-agent.ts` - Compliance decision-making agent
- **Directory Structure**: 3 levels (src → mastra → tools/agents)
- **Import Organization**: Standardized (external → internal)
- **File Naming**: Consistent (kebab-case)

### Documentation Organization

- **Root-Level Documentation**: 15 files (includes QUICK-START.md, PROJECT-OVERVIEW.md, SHOWCASE.md, OPERATIONS.md)
- **Technical Documentation**: 8 files in `docs/` (includes NAVIGATION-GUIDE.md, ARCHIVE-ANALYSIS.md, SHOWCASE-QUICK-START.md, TOOL-CALL-LIMITS.md)
- **Total Documentation**: 23 files
- **Documentation Categories**: 4 (Core, Technical, Navigation, Management)
- **Documentation Structure**: Consistent across all files
- **Archive Analysis**: See `docs/ARCHIVE-ANALYSIS.md` for features identified from archived weather example

### Configuration Organization

- **Configuration Files**: 3 files (package.json, tsconfig.json, .gitignore)
- **Environment Files**: .env file (create with OPENAI_API_KEY - .env.example planned for Phase 0 MVP)
- **Build Output**: dist/ directory (generated by npm run build)
- **Archive**: 1 directory (`_archive/`)
- **Build Status**: ✅ Successfully builds and compiles
- **Dependencies**: Mastra 0.24.0, @ai-sdk/openai 2.0.65, Zod 3.22.0, chalk 5.3.0

---

## 🔍 Organization Verification

### Code Verification

- ✅ All source files follow consistent naming
- ✅ All imports are organized (external → internal)
- ✅ All exports are consistent (camelCase)
- ✅ All files are in correct directories
- ✅ All file paths match documentation

### Documentation Verification

- ✅ All documentation files follow consistent structure
- ✅ All cross-references work correctly
- ✅ All file paths are accurate
- ✅ All documentation is organized by purpose
- ✅ All documentation is organized by audience

### Configuration Verification

- ✅ All configuration files are at root level
- ✅ All configuration files are documented
- ✅ All environment variables are documented
- ✅ All archive code is properly archived

---

## 📚 Related Documentation

- **INDEX.md** - Complete file mapping and codebase structure
- **AGENTS.md** - Developer guide with patterns and conventions
- **CONTEXT.md** - Architecture decisions and philosophy
- **DOCUMENTATION.md** - Documentation navigation guide
- **DOCUMENTATION-OVERVIEW.md** - Overview of all documentation files

---

**Last Updated**: 2025-01-27  
**Version**: 1.0.0  
**Maintained By**: WCP AI Agent Prototype Team

