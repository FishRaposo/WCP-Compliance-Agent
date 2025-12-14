# Documentation Blueprint

**Purpose**: This file provides templates and guidelines for creating comprehensive project documentation. Use these templates to structure documentation for new projects or to standardize existing documentation.

**Location**: This file (`DOCUMENTATION-BLUEPRINT.md`) should be placed in the **root folder** of the project.

**Based on**: Proven documentation patterns from multiple production projects, refined for universal applicability across all software projects.

**Last Updated**: 2025-01-27 (AI-First Assumption - All AI Instructions Mandatory)  
**Version**: 4.0.0

**⚠️ PRIORITY #1 FOR AI AGENTS**: **AUTOMATIC DOCUMENTATION UPDATES ARE MANDATORY**

**🚨 CRITICAL RULE**: Code changes are INCOMPLETE without documentation updates. Documentation updates MUST happen automatically during every code change - not as an afterthought.

These templates include comprehensive automatic documentation update requirements. All templates include mandatory documentation maintenance sections that ensure documentation is automatically updated when making code changes. **This is the highest priority workflow step.**

---

## 📑 Table of Contents

### Getting Started
- [Quick Start Guide](#-quick-start-guide) - First-time user guide
- [Language & Framework Adaptation](#-language--framework-adaptation-guide) - How to adapt to your project
- [File Creation Order](#-file-creation-order) - Recommended sequence

### Core Concepts
- [Overview](#-overview) - Core principles and 15 documentation files
- [Documentation Organization](#-documentation-organization-root-vs-docs) - Root vs. `docs/` structure
- [Documentation Consolidation](#-documentation-consolidation-guidelines) - When to merge vs. separate

### Project Variations
- [Project Type Variations](#-project-type-variations) - Web apps, CLI tools, libraries, APIs
- [Project Size Variations](#-project-size-variations) - Small vs. large projects
- [Team Size Considerations](#-team-size-considerations) - Solo vs. team projects

### File Templates (15 Core Files)
- [README.md Template](#1-readmemd-template)
- [CONTEXT.md Template](#2-contextmd-template)
- [AGENTS.md Template](#3-agentsmd-template)
- [CLAUDE.md Template](#4-claudemd-template)
- [DOCUMENTATION.md Template](#5-documentationmd-template)
- [WORKFLOW.md Template](#6-workflowmd-template)
- [CHANGELOG.md Template](#7-changelogmd-template)
- [EVALS.md Template](#8-evalsmd-template)
- [TODO.md Template](#9-todomd-template)
- [INDEX.md Template](#10b-indexmd-template)
- [PROMPT-VALIDATION.md Template](#4a-prompt-validationmd-template)
- [PROMPT-VALIDATION-QUICK.md Template](#4b-prompt-validation-quickmd-template)
- [DOCUMENTATION-MAINTENANCE.md Template](#4c-documentation-maintenancemd-template)
- [DOCUMENTATION-OVERVIEW.md Template](#10-documentation-overviewmd-template)
- [OPERATIONS.md Template](#10a-operationsmd-template) (Optional)

### Additional Resources
- [Migration Guide](#-migration-guide-for-existing-projects) - Adopting these templates
- [FAQ & Troubleshooting](#-faq--troubleshooting) - Common questions
- [Checklist Quick Reference](#-checklist-quick-reference) - All checklists in one place
- [Version History](#-version-history) - Template changelog

---

## 🚀 Quick Start Guide

**First time using these templates? Start here.**

### For New Projects

1. **Copy this file** to your project root as `DOCUMENTATION-BLUEPRINT.md`
2. **Read the [Language & Framework Adaptation Guide](#-language--framework-adaptation-guide)** to understand how to customize
3. **Follow the [File Creation Order](#-file-creation-order)** - Start with README.md
4. **Adapt all templates** - Replace `[placeholder]` values with your project information
5. **Create mandatory files first**:
   - `docs/PROMPT-VALIDATION.md`
   - `docs/DOCUMENTATION-MAINTENANCE.md`
   - `CHANGELOG.md`

### For Existing Projects

1. **Read the [Migration Guide](#-migration-guide-for-existing-projects)** for step-by-step adoption
2. **Assess your current documentation** - What exists? What's missing?
3. **Prioritize by importance** - Start with README.md, then AGENTS.md
4. **Gradually adopt** - Don't try to create all 15 files at once
5. **Update existing docs** - Enhance current docs rather than replacing everything

### Essential vs. Optional Files

**Must Have (Start Here):**
- ✅ README.md
- ✅ CHANGELOG.md
- ✅ docs/DOCUMENTATION-MAINTENANCE.md
- ✅ docs/PROMPT-VALIDATION.md (or QUICK version)

**Highly Recommended:**
- ✅ CONTEXT.md
- ✅ AGENTS.md
- ✅ TODO.md
- ✅ INDEX.md (if 20+ files)

**Add As Needed:**
- WORKFLOW.md (when you have user workflows)
- EVALS.md (when testing is important)
- CLAUDE.md (for developer quick reference)
- DOCUMENTATION.md (when you have many docs)
- DOCUMENTATION-OVERVIEW.md (meta-documentation)

### Common Scenarios

**"I have a small project (< 10 files)"**
- Focus on: README.md, CHANGELOG.md, CONTEXT.md
- Skip: INDEX.md, complex test organization
- See: [Project Size Variations](#-project-size-variations)

**"I'm building a web application"**
- Emphasize: WORKFLOW.md, EVALS.md, OPERATIONS.md
- See: [Project Type Variations](#-project-type-variations)

**"I'm working solo"**
- Simplify: Less formal structure, focus on personal reference
- See: [Team Size Considerations](#-team-size-considerations)

**"I'm migrating an existing project"**
- See: [Migration Guide](#-migration-guide-for-existing-projects)

---

## 🎯 Overview

**⚠️ FOR AI AGENTS: AUTOMATIC DOCUMENTATION UPDATES ARE MANDATORY**

**Before proceeding with these templates, understand this critical principle:**

🚨 **CODE CHANGES WITHOUT DOCUMENTATION UPDATES = INCOMPLETE WORK**

**Every code change MUST include:**
1. **Automatic documentation update** (using checklists in `docs/DOCUMENTATION-MAINTENANCE.md`)
2. **CHANGELOG.md update** (REQUIRED for every change - no exceptions)
3. **Related documentation updates** (based on change type)

**This is automatic - not optional. Documentation updates are part of implementation, not a separate step.**

These templates define **15 core documentation files** that provide complete coverage for any software project:

1. **README.md** - Project overview & user guide
2. **CONTEXT.md** - Project context & philosophy
3. **AGENTS.md** - Developer implementation guide
4. **docs/PROMPT-VALIDATION.md** - ⚠️ **MANDATORY**: Prompt validation system
5. **docs/PROMPT-VALIDATION-QUICK.md** - Quick 5-minute validation checklist
6. **docs/DOCUMENTATION-MAINTENANCE.md** - ⚠️ **MANDATORY**: Automatic documentation maintenance guide
7. **CLAUDE.md** - Quick reference for developers
8. **DOCUMENTATION.md** - Documentation navigation guide
9. **DOCUMENTATION-BLUEPRINT.md** - Documentation templates & guidelines (reference file - root folder, optional)
10. **DOCUMENTATION-OVERVIEW.md** - Overview of all documentation files
11. **WORKFLOW.md** - User workflows & validation guide
12. **CHANGELOG.md** - Version history
13. **EVALS.md** - Evaluation & testing guide
14. **TODO.md** - Pending features & improvements
15. **INDEX.md** - ⚠️ **MANDATORY** (when project has 20+ files or complex structure): Project-wide navigation index mapping all files and directories

**Optional Recommended Documentation:**
- **docs/TOOL-CALL-LIMITS.md** - ⚠️ **RECOMMENDED**: Tool call optimization guidelines (referenced in prompt validation and workflow sections)

---

## 🔧 Language & Framework Adaptation Guide

**⚠️ IMPORTANT**: These templates are designed to be universal and language-agnostic. All code examples, file paths, and commands should be adapted to your project's specific language, framework, and conventions.

### Key Adaptation Points:

1. **File Extensions**: Replace `[ext]` or `.py` with your language's extension (e.g., `.js`, `.go`, `.rs`, `.java`, `.ts`, `.cpp`)
2. **Test Framework**: Replace `[test_framework]` or `pytest` with your test framework (e.g., `jest`, `mocha`, `go test`, `cargo test`, `mvn test`)
3. **Directory Structures**: Replace `[core_directory]` with your project's structure (e.g., `lib/`, `src/`, `app/`, `packages/`)
4. **Test Configuration**: Adapt test config files to your framework (e.g., `conftest.py` → `setup.js` for Jest, `helpers.go` for Go)
5. **Code Examples**: All code examples are illustrative - adapt syntax to your language's conventions
6. **Commands**: Replace command examples with your project's build/test/run commands

### Examples of Adaptation:

| Template Reference | Python Project | Node.js Project | Go Project |
|---------------------|----------------|-----------------|------------|
| `[ext]` | `.py` | `.js` or `.ts` | `.go` |
| `[test_framework]` | `pytest` | `jest` or `mocha` | `go test` |
| `[core_directory]` | `lib/` | `src/` | `internal/` |
| Test config | `conftest.py` | `setup.js` | `helpers.go` |
| Test runner | `run_tests.py` | `npm test` | `scripts/test.sh` |

**When using these templates:**
- Search for `[placeholder]` values and replace with your project-specific information
- Adapt all code examples to your language's syntax and conventions
- Update directory structures to match your project's organization
- Replace test framework references with your project's testing tools
- Customize file extensions to match your project's file types

---

## 🎨 Project Type Variations

Different project types may emphasize different documentation files. Adapt these templates to your project type:

### Web Applications
**Emphasize:**
- ✅ WORKFLOW.md - User workflows and UI interactions
- ✅ EVALS.md - User experience testing and validation
- ✅ OPERATIONS.md - Deployment and production operations
- ✅ docs/ARCHITECTURE.md - System architecture (if complex)

**Optional:**
- API documentation (if exposing APIs)
- Frontend/backend separation documentation

### CLI Tools & Scripts
**Emphasize:**
- ✅ README.md - Command usage and examples
- ✅ CONTEXT.md - Design philosophy and use cases
- ✅ WORKFLOW.md - Command workflows and pipelines

**Simplify:**
- Less emphasis on UI workflows
- Focus on command reference and examples

### Libraries & SDKs
**Emphasize:**
- ✅ README.md - Installation and API overview
- ✅ docs/CORE_API_REFERENCE.md - Complete API documentation
- ✅ CONTEXT.md - Design decisions and patterns
- ✅ EVALS.md - API testing and compatibility

**Optional:**
- Version compatibility matrix
- Migration guides between versions

### APIs & Microservices
**Emphasize:**
- ✅ docs/CORE_API_REFERENCE.md - Endpoint documentation
- ✅ OPERATIONS.md - Deployment and scaling
- ✅ EVALS.md - API testing and performance
- ✅ docs/ARCHITECTURE.md - Service architecture

**Optional:**
- API versioning strategy
- Rate limiting and authentication docs

### Mobile Applications
**Emphasize:**
- ✅ WORKFLOW.md - User flows and navigation
- ✅ EVALS.md - Platform-specific testing
- ✅ README.md - Platform requirements and setup

**Optional:**
- Platform-specific deployment guides
- App store submission documentation

### Data Science / ML Projects
**Emphasize:**
- ✅ CONTEXT.md - Methodology and assumptions
- ✅ EVALS.md - Model evaluation and metrics
- ✅ README.md - Data requirements and setup

**Optional:**
- Model documentation
- Experiment tracking documentation

---

## 📏 Project Size Variations

### Small Projects (< 10 files, simple structure)

**Essential Files Only:**
- ✅ README.md
- ✅ CHANGELOG.md
- ✅ CONTEXT.md (simplified)

**Skip:**
- ❌ INDEX.md (not needed for small projects)
- ❌ Complex test organization
- ❌ Multiple documentation files

**Simplified Approach:**
- Combine related content (e.g., philosophy + architecture in CONTEXT.md)
- Use single comprehensive README.md
- Minimal formal structure

### Medium Projects (10-50 files, moderate complexity)

**Standard Set:**
- ✅ All essential files (README, CHANGELOG, CONTEXT, AGENTS)
- ✅ INDEX.md (if 20+ files)
- ✅ TODO.md
- ✅ Basic test organization

**Optional:**
- WORKFLOW.md (if user-facing)
- EVALS.md (if testing is important)
- CLAUDE.md (for developer reference)

### Large Projects (50+ files, complex structure)

**Full Documentation Suite:**
- ✅ All 15 core files
- ✅ Subdirectory INDEX.md files (when directories have 5+ files)
- ✅ Comprehensive test organization
- ✅ Detailed architecture documentation
- ✅ Complete API references

**Additional Considerations:**
- Multiple specialized guides in `docs/`
- Cross-references between documents
- Regular documentation audits

---

## 👥 Team Size Considerations

### Solo Developer Projects

**Focus:**
- Personal reference and memory aid
- Less formal structure acceptable
- Quick updates over comprehensive documentation

**Simplified:**
- Combine related files (e.g., CONTEXT + AGENTS)
- Use quick validation (PROMPT-VALIDATION-QUICK.md)
- Focus on what helps you remember decisions

**Still Important:**
- CHANGELOG.md (for future you)
- README.md (for users/collaborators)
- Basic CONTEXT.md (for decision context)

### Small Teams (2-5 developers)

**Standard Approach:**
- Follow templates as designed
- Emphasize communication through documentation
- Regular documentation reviews

**Key Files:**
- AGENTS.md (shared conventions)
- CONTEXT.md (shared understanding)
- CHANGELOG.md (coordination)

### Large Teams (5+ developers)

**Comprehensive Documentation:**
- Full template implementation
- Multiple specialized guides
- Regular documentation maintenance
- Documentation ownership assignments

**Additional Needs:**
- Onboarding documentation
- Team-specific guides
- Cross-team communication docs

---

## 📋 File Creation Order

When starting a new project, create documentation files in this order:

1. **README.md** (Start here - everyone needs this)
2. **CONTEXT.md** (Define philosophy early)
3. **TODO.md** (Track what's pending)
4. **CHANGELOG.md** (Start tracking changes immediately)
5. **docs/PROMPT-VALIDATION.md** (⚠️ **MANDATORY**: Create validation system early)
6. **docs/PROMPT-VALIDATION-QUICK.md** (Quick validation checklist)
7. **docs/DOCUMENTATION-MAINTENANCE.md** (⚠️ **MANDATORY**: Create maintenance guide early)
8. **INDEX.md** (⚠️ **MANDATORY** when project has 20+ files or complex structure: Create project-wide index for navigation)
9. **AGENTS.md** (As development begins)
10. **CLAUDE.md** (Quick reference for developers)
11. **WORKFLOW.md** (As features are added)
12. **EVALS.md** (As testing requirements are defined)
13. **DOCUMENTATION.md** (When documentation structure stabilizes)
14. **DOCUMENTATION-BLUEPRINT.md** (Documentation templates & guidelines - reference file, optional)
15. **DOCUMENTATION-OVERVIEW.md** (Final meta-document)

---

## 📁 Documentation Organization: Root vs. `docs/`

**Understanding Documentation Structure:**

**Root-Level Documentation** (User-Facing, High-Level):
- **Purpose**: Entry points, navigation, philosophy, user workflows
- **Audience**: Everyone (developers, users, PMs, QA testers)
- **Examples**: README.md, CONTEXT.md, AGENTS.md, WORKFLOW.md, DOCUMENTATION.md, CHANGELOG.md, EVALS.md, TODO.md, INDEX.md
- **Characteristics**: 
  - High-level overview
  - User-friendly language
  - Navigation and quick reference
  - Status tracking (CHANGELOG, TODO, EVALS)

**`docs/` Directory** (Technical, Detailed):
- **Purpose**: Detailed technical documentation, implementation guides, API references
- **Audience**: Developers, technical teams
- **Examples**: 
  - ARCHITECTURE.md - Detailed system architecture
  - CORE_API_REFERENCE.md - Complete API documentation
  - WORKFLOW.md - Technical workflow system (different from root WORKFLOW.md)
  - TESTING.md - Comprehensive testing guide
  - SETUP_GUIDE.md - Complete setup guide (includes Quick Start section)
  - OPERATIONS.md - Production deployment and troubleshooting (consolidated operational guide)
  - COMMANDS.md - Complete command reference (if applicable)
  - INTEGRATION_GUIDE.md - Integration with external services (optional)
- **Characteristics**:
  - Technical depth
  - Implementation details
  - API specifications
  - Operational guides

**Note on Documentation Consolidation**:
- **SETUP_GUIDE.md** should include a "Quick Start" section at the top for rapid setup
- **OPERATIONS.md** combines deployment and troubleshooting (both operational concerns)
- **CONTEXT.md** (root) should include implementation history section
- **INDEX.md** (root) should include codebase structure overview
- Archive project-specific/meta documentation to `_archive/docs/` after migration/analysis complete

**When to create technical docs in `docs/`:**
- ✅ Complex architecture needs detailed explanation
- ✅ API has many endpoints/functions
- ✅ System has sophisticated workflows (technical workflows)
- ✅ Testing requirements are extensive
- ✅ Deployment process is complex
- ✅ Troubleshooting needs comprehensive guide
- ✅ Multiple specialized guides are needed

**Note**: Root-level `WORKFLOW.md` is for **user workflows** (UI flows, validation). Technical `docs/WORKFLOW.md` is for **system workflows** (processing pipelines, internal flows).

**Naming Convention:**
- **Root**: Capital case (README.md, CONTEXT.md, INDEX.md)
- **docs/**: Capital case (ARCHITECTURE.md, TESTING.md, INDEX.md)

---

## 🔄 Documentation Consolidation Guidelines

**Principle**: Maintain separation of concerns while reducing file count. Merge related concerns, keep distinct concerns separate, archive project-specific one-time docs.

### When to Consolidate

**✅ Merge Related Concerns** (Same Operational Domain):
- **Quick Start + Complete Setup** → `SETUP_GUIDE.md` (Quick Start as section at top)
- **Deployment + Troubleshooting** → `OPERATIONS.md` (both operational management)
- **Implementation History** → `CONTEXT.md` (provides context for decisions)
- **Codebase Structure** → `INDEX.md` (both are navigation/overview)

**❌ Keep Separate** (Distinct Concerns):
- **ARCHITECTURE.md** - Detailed architecture (distinct from CONTEXT.md philosophy)
- **CORE_API_REFERENCE.md** - Complete API docs (distinct concern)
- **TESTING.md** - Testing guide (distinct concern)
- **WORKFLOW.md** - Technical workflows (distinct from root WORKFLOW.md)

### Consolidation Patterns

**Pattern 1: Quick Reference → Complete Guide**
```markdown
# Complete Guide

## Quick Reference (5 minutes)
[Quick start content]

## Complete Guide
[Full detailed content]
```

**Pattern 2: Operational Concerns Merge**
```markdown
# Operations Guide

## Deployment
[Deployment content]

## Troubleshooting
[Troubleshooting content]
```

**Pattern 3: Context Extension**
```markdown
# Context

[Philosophy and architecture decisions]

## Implementation History
[Timeline, milestones, progress]
```

**Pattern 4: Navigation Extension**
```markdown
# Project Index

[File and directory mapping]

## Codebase Structure Overview
[Directory structure, organization]
```

### Archiving Strategy

**Archive Project-Specific/Meta Documentation**:
- Move to `_archive/docs/` or `_deprecated/docs/`
- One-time migration documentation (after migration complete)
- Meta-analysis documents (after improvements implemented)
- Project-specific utilities documentation

**When to Archive**:
- ✅ Migration/documentation consolidation complete
- ✅ Meta-analysis completed and improvements implemented
- ✅ One-time project utilities no longer actively used
- ✅ Reference documentation superseded by consolidated docs

**Archive Location**:
- `_archive/docs/` - For historical reference
- `_deprecated/docs/` - For deprecated features

### Consolidation Checklist

**Before Consolidating**:
1. ✅ Identify related concerns (same operational domain)
2. ✅ Verify no distinct concerns are being merged
3. ✅ Plan merge structure (sections, organization)
4. ✅ Review dependencies and references

**During Consolidation**:
1. ✅ Create consolidated file structure
2. ✅ Copy content from source files
3. ✅ Update all references/links in documentation
4. ✅ Update INDEX.md and DOCUMENTATION.md
5. ✅ Move source files to archive
6. ✅ Delete source files (after merge verified)

**After Consolidation**:
1. ✅ Verify all references updated
2. ✅ Test navigation and links
3. ✅ Update CHANGELOG.md
4. ✅ Update documentation index files

---

## 📝 File Templates

### 1. README.md Template

```markdown
# [Project Name]

**Tagline:** [One-line project description]

## 🎯 Purpose

[2-3 sentences describing what the project does and why it exists]

## ✨ Features

### Core Features
- **[Feature Category 1]**: [Description]
- **[Feature Category 2]**: [Description]
- **[Feature Category 3]**: [Description]

### [Additional Feature Categories]
- **[Feature]**: [Description]
- **[Feature]**: [Description]

## 🚀 Getting Started

### Prerequisites
- [Technology/Platform requirements]
- [Version requirements]

### Installation
```bash
# Installation steps
```

### Platform Support
- **Platform 1**: ✅ Fully supported (version X+)
- **Platform 2**: 🚧 Planned - See `TODO.md`
- **Platform 3**: 🚧 Limited support - See `TODO.md`

[Platform-specific feature sections if applicable]

## 📊 Project Statistics

- **Total Files**: [Number]
- **Routes**: [Number]
- **Services**: [Number]
- **Test Files**: [Number]

## 📚 Documentation

- **README.md** - This file (project overview)
- **CONTEXT.md** - Architecture decisions and philosophy
- **AGENTS.md** - Developer implementation guide
- [Other relevant docs]

## 📜 License

[License information]

---

**Version**: [X.Y.Z]  
**Last Updated**: [YYYY-MM-DD]  
**Status**: [Project status]
```

**Key Sections to Include:**
- Project purpose and tagline
- Complete feature list (organized by category) - Consider linking to FEATURES.md if feature list is extensive
- Installation and quick start guide
- Platform support status
- Project statistics (if applicable)
- Links to other documentation (including FEATURES.md if present)
- License information

**Update Triggers:**
- User-facing features added (update FEATURES.md and feature tests if project uses feature tracking)
- Version changes
- Statistics change
- Platform support changes

**Feature Tracking Integration (Optional but Recommended):**
- If project has comprehensive feature tracking (e.g., `FEATURES.md`), README.md should link to it
- Feature tests (`tests/features/` or equivalent) can validate features from feature documentation
- When adding features, update feature documentation and create/update feature tests if applicable
- Note: Feature tracking is optional - not all projects need this level of feature documentation

---

### 2. CONTEXT.md Template

```markdown
# CONTEXT.md - Project Context & Overview

**Purpose**: This document provides high-level context about the [Project Name], its philosophy, architecture decisions, and current state. Use this to understand the "what" and "why" before diving into the "how" (see AGENTS.md for implementation details).

**Last Updated**: [YYYY-MM-DD]  
**Project Status**: [Current status]

---

## 🎯 What Is This Project?

**[Project Name]** is [brief description]. It's designed to [core value proposition].

### Core Value Proposition

1. **[Principle 1]**: [Description]
2. **[Principle 2]**: [Description]
3. **[Principle 3]**: [Description]
4. **[Principle 4]**: [Description]
5. **[Principle 5]**: [Description]

---

## 🧠 Key Concepts

### [Concept 1]

[Detailed explanation of a key concept]

### [Concept 2]

[Detailed explanation]

---

## 🏗️ Architecture Decisions

### Why [Technology Choice]?

- **[Reason 1]**: [Explanation]
- **[Reason 2]**: [Explanation]
- **[Reason 3]**: [Explanation]

### Why [Design Pattern]?

[Explanation of design decisions]

---

## 📊 Current State

### ✅ Implemented Features

**[Feature Category 1]**:
- Feature 1
- Feature 2

**[Feature Category 2]**:
- Feature 1
- Feature 2

### 🚧 Future Considerations

[Future plans, limitations, considerations]

---

## 📚 Related Documentation

- **[Other doc files]**

---

**Last Updated**: [YYYY-MM-DD]  
**Project Status**: [Status]  
**Maintained By**: [Team/Individual]
```

**Key Sections to Include:**
- Project philosophy and value proposition
- Key technical concepts (explain important algorithms, patterns, etc.)
- Architecture decisions with rationale ("why" not just "what")
- Current feature state organized by category
- Future considerations
- **Implementation History section** (includes timeline, current status, recent fixes, performance metrics)

**Update Triggers:**
- Architecture changes
- Philosophy changes
- Design decisions
- Feature additions
- Code quality improvements
- Performance optimizations
- Version releases

**Note**: CONTEXT.md should include an "Implementation History" section covering:
- Current codebase status and code quality metrics
- Implementation timeline with version history
- Recent investigations and fixes
- Performance metrics
- Next steps and known issues

---

### 3. AGENTS.md Template

```markdown
# AGENTS.md - Developer Guide

**Purpose**: This document helps developers understand the codebase architecture, patterns, and conventions for making changes to the [Project Name].

**🚨 PRIORITY #1: AUTOMATIC TEST CREATION AND DOCUMENTATION UPDATES**

**⚠️ FOR AI AGENTS: Before reading further, understand these critical principles:**

**CODE CHANGES WITHOUT TESTS = INCOMPLETE WORK**  
**CODE CHANGES WITHOUT DOCUMENTATION UPDATES = INCOMPLETE WORK**

**Every code change MUST include:**
1. **Automatic test creation/updates** - Tests are part of implementation, not optional
2. **Automatic documentation updates** - See `docs/DOCUMENTATION-MAINTENANCE.md` for complete workflow

**Both happen DURING implementation, not after. This is mandatory, not optional.**

**Last Updated**: [YYYY-MM-DD]  
**Project Status**: [Status]

---

## ⚠️ MANDATORY SECTIONS CHECKLIST

**AGENTS.md MUST include these sections (in this order):**

1. ✅ **Tool Call Limit Awareness** (MANDATORY)
   - Tool call efficiency principles
   - Batch operations guidance
   - Tool selection guidelines (grep vs codebase_search, etc.)
   - Information caching strategies
   - Reference to `docs/TOOL-CALL-LIMITS.md`

2. ✅ **Prompt Validation System** (MANDATORY)
   - 5-phase validation process
   - Confidence level requirements (≥ 7/10)
   - Tool call limit assessment in Phase 5 (Autonomous Operation)
   - Quick validation option reference

3. ✅ **Script-First Approach** (MANDATORY)
   - Automation prioritization philosophy
   - Script creation guidelines and examples
   - When to create scripts vs. manual work

4. ✅ **Automatic Test Creation** (MANDATORY)
   - Core test types (Unit, Integration, System, Workflow)
     - **All 4 types mandatory for**: Projects with multiple modules, external integrations, complex workflows, or user-facing features
     - **Simplified testing acceptable for**: Simple scripts, single-module projects, internal tools with limited scope (Unit + Integration may be sufficient)
   - Optional: Feature Tests (if project has comprehensive feature tracking like FEATURES.md)
   - Test execution requirements (run immediately, run full suite)
   - Test consolidation and optimization requirements
   - Avoid redundant testing principles
   - Note: Test framework and syntax examples (e.g., pytest) should be adapted to project's testing framework

5. ✅ **Automatic Documentation Updates** (MANDATORY)
   - Reference to `docs/DOCUMENTATION-MAINTENANCE.md`
   - Update workflow integration
   - Checklist requirements

6. ✅ **Coding Best Practices** (MANDATORY)
   - Comprehensive code quality standards (10+ standards)
   - Type hints, docstrings, error handling patterns
   - Examples and code patterns

7. ✅ **Test Best Practices** (MANDATORY)
   - Test organization principles
   - Consolidation and optimization requirements
   - Avoid redundant testing guidelines
   - Fixture usage and parametrize patterns

**This checklist ensures consistency across all projects using these templates.**

---

## ⚠️ MANDATORY: Prompt Validation System

**🤖 FOR AI AGENTS: Complete validation BEFORE any operation**

**ALL AI AGENTS MUST VALIDATE UNDERSTANDING BEFORE STARTING ANY TASK**

### Pre-Operation Validation (REQUIRED)

**Before ANY code changes, documentation updates, or system modifications:**

1. **Complete Prompt Validation**: Read and complete `docs/PROMPT-VALIDATION.md`
   - Validate task understanding (what, why, scope)
   - Validate codebase understanding (where, how)
   - Validate requirements understanding (success criteria, constraints)
   - Validate process understanding (execution plan, testing)
   - Validate autonomous operation capability (all info available, error handling)
   - All confidence levels must be ≥ 7/10 to proceed

2. **Quick Validation**: Use `docs/PROMPT-VALIDATION-QUICK.md` for rapid checks
   - 5-minute validation checklist
   - Go/No-Go decision criteria
   - Must pass all gates before proceeding

**Only proceed when ALL validation gates are passed.**

---

## 🤖 MANDATORY: Script-First Approach

**⚠️ PRIORITY: Create scripts and automation tools rather than doing tasks manually**

**ALL AI AGENTS MUST PRIORITIZE AUTOMATION AND TOOL CREATION**

### Script-First Philosophy

**Before performing any repetitive or complex task directly:**

1. **Evaluate for Automation**: Ask yourself:
   - Will this task need to be done multiple times?
   - Could a script make this faster, more reliable, or reusable?
   - Would this benefit other developers?
   - Is this a one-time task or recurring?

2. **Create Automation Scripts**:
   - Write automation scripts in appropriate directory (e.g., `utils/`, `scripts/`, `tools/`) for reusable tools
   - Use your project's primary language/framework (adapt to your project's stack)
   - Include proper error handling and logging
   - Add docstrings explaining purpose and usage
   - Make scripts executable and user-friendly
   - Document in README or appropriate guide

3. **Benefits of Script-First**:
   - **Reusability**: Scripts can be used repeatedly without re-implementation
   - **Consistency**: Same task always executes the same way
   - **Time Savings**: Faster than manual repetition
   - **Documentation**: Scripts serve as executable documentation
   - **Collaboration**: Other agents/developers can use the same tools
   - **Quality**: Scripts can include validation and error handling

### Examples

**❌ Don't Do Directly:**
- Manually updating 50+ files one by one
- Manually running the same sequence of commands repeatedly
- Manually transforming data across multiple files
- Manually validating multiple conditions across codebase

**✅ Do Create Scripts For:**
- Bulk file operations (renames, updates, transformations)
- Code quality checks across multiple files
- Documentation generation or updates
- Data validation or migration
- Test execution and reporting
- Any task requiring more than 3 manual steps

### Script Location and Naming

- **Location**: Place scripts in `utils/` directory (root level)
- **Naming**: Use descriptive names like `update_documentation.[ext]`, `validate_config.[ext]` (adapt `[ext]` to your language)
- **Documentation**: Include comprehensive docstrings and usage examples
- **Testing**: Test scripts before using for important tasks

**Remember: If you find yourself repeating a task more than once, create a script instead.**

---

## ⚠️ MANDATORY: Documentation Updates Required

**🤖 FOR AI AGENTS: Documentation updates are AUTOMATIC and MANDATORY**

**ALL AI AGENTS MUST FOLLOW THIS WORKFLOW BEFORE ANY CODE CHANGES**

1. **Step 0 - Tool Call Limit Awareness**: ✅ Assess and optimize tool usage before ANY operation
   - Plan all tool calls needed (files to read, searches to perform)
   - Batch operations when possible (multiple `read_file` calls in parallel)
   - Choose efficient tools (`grep` vs `codebase_search`, `glob_file_search` vs `list_dir`)
   - Cache information - avoid re-reading files or re-searching patterns
   - See `docs/TOOL-CALL-LIMITS.md` for complete guidelines
2. **Step 1 - Script-First Evaluation**: ✅ Evaluate if task should be automated (script vs manual)
   - If repetitive/complex, create script in `utils/` directory
   - See script-first philosophy section above for guidelines
3. **Step 2 - Prompt Validation**: ✅ Complete prompt validation (`docs/PROMPT-VALIDATION.md`)
   - Include tool call limit assessment in Phase 5 (Autonomous Operation)
   - Include script-first evaluation in process understanding phase
   - All validation gates must pass
   - All confidence levels must be ≥ 7/10
4. **Step 3 - Before Starting**: Read `docs/DOCUMENTATION-MAINTENANCE.md` - it contains checklists for every type of change
5. **Step 4 - During Development**: Keep documentation in mind - note what needs updating
6. **Step 5 - Before Completing**: Use the appropriate checklist from `docs/DOCUMENTATION-MAINTENANCE.md`
7. **Step 6 - Always Update**: `CHANGELOG.md` is REQUIRED for every change

---

## 🏗️ Architecture Overview

### Tech Stack
- **Framework**: [Framework name and version]
- **State Management**: [State management solution]
- **Navigation**: [Navigation solution]
- **Storage**: [Storage solution]
- **UI**: [UI framework/design system]

### Core Principles

1. **[Principle 1]**: [Description]
2. **[Principle 2]**: [Description]
3. **[Principle 3]**: [Description]
4. **[Principle 4]**: [Description]
5. **[Principle 5]**: [Description]

---

## 📁 Directory Structure

### Core Layer (`[core_directory]/`)

**[Subdirectory]** (`[core_directory]/[subdir]/`)
- **Purpose**: [Purpose of this directory]
- **Conventions**: [Conventions for this directory]
- **Key Files**: [Important files]

**Note**: Replace `[core_directory]` with your project's actual core directory name (e.g., `lib/`, `src/`, `app/`, `packages/`, etc.)

---

## 🔑 Key Patterns

### [Pattern Name] Pattern

```[language]
// Example code pattern
```

### [Pattern Name] Pattern

```[language]
// Example code pattern
```

---

## 🔄 Common Tasks

### Adding a New Feature

**🚨 PRIORITY: Tests and documentation updates happen DURING implementation, not after.**

1. **Read `docs/DOCUMENTATION-MAINTENANCE.md` FIRST** - Copy the feature addition checklist
2. **Plan Tests**: Identify test requirements for each test type:
   - **Unit Tests** (`tests/unit/`) - For isolated module/function testing
   - **Integration Tests** (`tests/integration/`) - For cross-module workflow testing
   - **System Tests** (`tests/system/`) - For end-to-end scenario testing
   - **Workflow Tests** (`tests/workflows/`) - For complete workflow simulation testing
3. **[Step 1]**: [Description]
4. **[Step 2]**: [Description]
5. **[Step 3]**: [Description]
6. **Create/Update Tests DURING implementation** (REQUIRED):
   - **Unit Tests**: `tests/unit/test_{module}.[ext]` - Test isolated modules and functions (adapt file extension to your language, e.g., `.py`, `.js`, `.go`, `.rs`, `.java`)
   - **Integration Tests**: `tests/integration/test_{feature}_integration.[ext]` - Test cross-module workflows
   - **System Tests**: `tests/system/test_{scenario}.[ext]` - Test end-to-end scenarios
   - **Workflow Tests**: `tests/workflows/test_{workflow_type}.[ext]` - Test complete workflows
   - Test success scenarios, error conditions, and edge cases for each test type
   - **🚨 CRITICAL: Follow test best practices**:
     - Use shared fixtures/setup from test configuration files (e.g., `tests/conftest.py`, `tests/setup.js`, `tests/helpers.go`, etc.)
     - Consolidate similar tests using your test framework's parametrization feature (if available)
     - Example: `@pytest.mark.parametrize` (pytest), `@ParameterizedTest` (JUnit), etc.
     - Use descriptive test names (`test_<function>_<scenario>`)
     - Mock external services (no real API calls)
     - Add docstrings/comments to all tests
     - Use appropriate test markers/annotations as supported by your test framework
     - Extract common logic to helper functions
     - Keep tests isolated and independent
   - **🚨 CRITICAL: Run tests immediately after writing**:
     - Run specific test file using your project's test framework command
     - Example: `[test_framework] [test_path]` (e.g., `pytest tests/unit/test_module.py -v`, `npm test`, `go test ./...`, etc.)
     - Verify new tests pass before continuing
     - Fix any failing tests immediately
     - Optional: Use test runner script if project has one (e.g., `python run_tests.py`, `npm run test:quick`, etc.)
   - **Run full test suite periodically**: 
     - Use your project's test command to check for regressions
     - Example: `[test_framework] [test_directory]` (e.g., `pytest tests/ -v`, `npm test`, `go test ./...`, etc.)
     - Optional: Use test runner script if available
   - **Run full test suite before marking complete**: 
     - All tests must pass using your project's test framework
     - Example: `[test_framework] [test_directory]` - All tests must pass
     - Optional: Use test runner script if available
7. **Follow coding best practices** (REQUIRED):
   - Use type hints for all functions (required)
   - Add docstrings to all public functions/classes (required)
   - No warning suppressions (`# type: ignore` only when truly necessary)
   - Use async/await correctly (always await async calls)
   - Handle errors with specific exception types and logging
   - Use entry/exit logging for critical functions
   - Keep functions focused (single responsibility)
   - Organize code logically (imports, constants, classes, functions)
   - Validate and sanitize inputs
   - Never log sensitive data
8. **Update documentation DURING implementation** (not after):
   - Update `CHANGELOG.md` immediately when adding the feature
   - Update `README.md` if feature is user-facing
   - Update `AGENTS.md` if patterns/architecture change
   - Update `WORKFLOW.md` if user workflows change
   - Update `EVALS.md` if tests are added
   - Update `tests/INDEX.md` if adding new test files
9. **Verify all tests pass and documentation is updated** before marking complete

### Adding a New [Component Type]

**🚨 REMINDER: Documentation updates are MANDATORY for every change.**

[Steps and guidelines]
- ✅ Update `CHANGELOG.md` (REQUIRED)
- ✅ Update relevant documentation files based on change type
- ✅ Update "Last Updated" dates in all modified files

---

## 🎨 Coding Best Practices

**⚠️ NOTE**: All code examples in this section are illustrative. Adapt all syntax, conventions, and patterns to your project's language, framework, and style guide.

### Code Quality Standards

**🚨 MANDATORY: Code Quality is Non-Negotiable**

1. **Type Hints** (REQUIRED where supported):
   ```[language]
   // Example: Type hints/annotations (adapt to your language)
   // Python example:
   async def process_query(
       query: str,
       service: Optional[Service] = None
   ) -> Result:
       """Process query and return answer."""
   ```
   - **Required in**: TypeScript, Python, Go, Rust, Java, C#, Swift, Kotlin
   - **Not required in**: Plain JavaScript, shell scripts, HTML/CSS, JSON, YAML, configuration files
   - **Optional but recommended in**: JavaScript (if using JSDoc), PHP (if using type declarations)
   - Use type hints/annotations for all function parameters and return values (where language supports it)
   - Use nullable type annotations for optional values (e.g., `Optional[Type]`, `Type | None`, `Type?`)
   - Use collection type annotations (e.g., `List[Type]`, `Type[]`, `[]Type`)
   - Note: Adapt syntax to your language's conventions

2. **Documentation Comments** (REQUIRED):
   ```python
   # Example: Python docstring (Google style)
   async def retrieve(
       query: str,
       filters: Optional[Dict[str, Any]] = None,
       top_k: int = 5
   ) -> List[Dict[str, Any]]:
       """
       Retrieve documents from vector store using semantic search.
       
       Args:
           query: Search query string
           filters: Optional filters (domain, country, topic)
           top_k: Number of results to return (default: 5)
       
       Returns:
           List of document dictionaries with content and metadata
       """
   ```
   - Every public function/class must have documentation
   - Use your language's documentation style (JSDoc, Go doc comments, Rust doc comments, etc.)
   - Include parameter descriptions and return value descriptions
   - Document exceptions/errors that may be raised
   - Note: Adapt format to your language's conventions (JSDoc, Go doc, Rust doc, JavaDoc, etc.)

3. **No Warning Suppressions** (REQUIRED):
   ```python
   # Example: Python (adapt to your language)
   # ❌ Don't suppress warnings
   # result: Any = some_function()  # type: ignore
   
   # ✅ Fix the underlying issue or use proper typing
   result: Dict[str, Any] = some_function()
   ```
   - Never suppress warnings/errors unless absolutely necessary (e.g., `# type: ignore`, `@ts-ignore`, `//nolint`, etc.)
   - Never suppress linter warnings in config files
   - Fix root causes instead of hiding symptoms
   - All warnings should be visible and addressed
   - Note: Adapt suppression syntax to your language's conventions

4. **Async/Concurrency Best Practices** (if using async/concurrent code):
   ```python
   # Example: Python async/await (adapt to your language's async patterns)
   # ✅ Correct: Proper async/await usage
   async def fetch_data(url: str) -> Dict[str, Any]:
       async with http_client.session() as session:
           async with session.get(url) as response:
               return await response.json()
   
   # ❌ Wrong: Blocking calls in async functions
   async def fetch_data(url: str):
       response = blocking_http_call(url)  # Blocking!
   ```
   - Always use async context managers/patterns where applicable
   - Always await/await async function calls
   - Never use blocking I/O in async functions
   - Use async iterators where applicable
   - Note: Adapt patterns to your language (async/await, Promises, goroutines, channels, etc.)
   - Note: Skip this section if your project doesn't use async/concurrent code

5. **Error Handling Best Practices**:
   ```python
   # Example: Python error handling (adapt to your language's error handling patterns)
   # ✅ Good: Specific error handling with logging
   try:
       result = await operation()
   except SpecificError as e:
       logger.error(f"Operation failed: {e}", exc_info=True)
       return fallback_value
   except Exception as e:
       logger.critical(f"Unexpected error: {e}", exc_info=True)
       raise
   ```
   - Catch/handle specific errors first, general errors last
   - Always log errors with context (stack traces, error details)
   - Provide fallback values when appropriate
   - Don't catch and ignore silently
   - Note: Adapt to your language's error handling (try/catch, error returns, Result types, etc.)

6. **Logging Best Practices**:
   ```python
   # Example: Python logging (adapt to your logging framework)
   # ✅ Good: Entry/exit logging with timing
   async def process_request(query: str) -> Answer:
       start_time = time.time()
       logger.info(f"→ [process_request] Entry - query: {query[:50]}...")
       
       try:
           result = await _do_work(query)
           elapsed = time.time() - start_time
           
           if elapsed > 5.0:
               logger.warning(f"⚠ Slow operation: {elapsed:.2f}s")
           
           logger.info(f"← [process_request] Exit - time: {elapsed:.2f}s")
           return result
       except Exception as e:
           logger.error(f"✗ [process_request] Error: {e}", exc_info=True)
           raise
   ```
   - Log entry/exit for critical functions
   - Include timing/performance information
   - Use appropriate log levels (DEBUG, INFO, WARNING, ERROR, CRITICAL, or equivalent)
   - Truncate long values in log messages
   - Include context (parameters, state) in log messages
   - Note: Adapt to your logging framework (Winston, logrus, zap, etc.)

7. **Function Design Best Practices**:
   ```python
   # ✅ Good: Single responsibility, focused function
   async def process_input(input: str) -> ProcessedResult:
       """Process input performing single operation."""
       # Do one thing well
   
   # ❌ Bad: Multiple responsibilities
   async def process_and_normalize_and_validate(input: str):
       # Too many responsibilities
   ```
   - Single Responsibility Principle: One function, one purpose
   - Keep functions focused and concise
   - Extract complex logic to helper functions
   - Functions should be testable in isolation

8. **Code Organization Best Practices**:
   ```python
   # Example: Python code organization (adapt to your language's conventions)
   # ✅ Good: Logical grouping and clear structure
   # Imports: Standard library first
   import asyncio
   from typing import Optional, Dict, Any
   
   # Imports: Third-party second
   import external_library
   
   # Imports: Local modules last
   from local_module import LocalClass
   from another_module import another_function
   
   # Constants at module level
   DEFAULT_TIMEOUT = 30
   
   # Classes
   class MyService:
       pass
   
   # Functions
   async def helper_function():
       pass
   ```
   - Organize imports: stdlib → third-party → local (or your language's convention)
   - Group related functionality together
   - Use constants for magic numbers
   - Follow your language/framework's style guide (PEP 8, Google Style, Airbnb Style, etc.)
   - Note: Adapt import organization and structure to your language's conventions

9. **Performance Best Practices**:
   ```python
   # Example: Performance optimization (adapt to your language/framework)
   # ✅ Good: Use caching for expensive operations
   @lru_cache(maxsize=128)  # Example: Python decorator
   def expensive_computation(input: str) -> str:
       # Cached result
       return result
   
   # ✅ Good: Batch operations when possible
   async def batch_process(items: List[Item]) -> List[Result]:
       tasks = [process_item(item) for item in items]
       return await asyncio.gather(*tasks)
   ```
   - Cache expensive computations (use your language's caching mechanisms)
   - Batch operations when possible
   - Use async/concurrent patterns for I/O operations (if applicable)
   - Profile slow operations and optimize
   - Note: Adapt caching and batching patterns to your language/framework

10. **Security Best Practices**:
    ```python
    # Example: Security practices (adapt to your language/framework)
    # ✅ Good: Validate input, sanitize output
    def validate_user_input(input: str) -> str:
        if not input or len(input) > MAX_INPUT_LENGTH:
            raise ValueError("Invalid input")
        return sanitize(input.strip())
    
    # ✅ Good: Never log sensitive data
    logger.info(f"Processing request: {request[:50]}...")  # Truncated
    # ❌ Never: logger.info(f"API key: {api_key}")  # Security risk
    ```
    - Validate and sanitize all inputs
    - Never log sensitive information (API keys, passwords, tokens, personal data)
    - Use secure defaults for configuration
    - Follow principle of least privilege
    - Note: Adapt validation and sanitization to your language/framework's security libraries

---

## 🧪 Test Best Practices

### ⚠️ MANDATORY: Avoid Redundant Testing

**🚨 CRITICAL PRINCIPLE**: Don't re-test what's already validated.

**Test Only When Necessary:**
1. **Test New Code**: Always test new functionality, new code paths, new features
2. **Test Changed Code**: Update tests when code changes, but focus on what changed
3. **Test Integration Points**: Test how modules work together, not re-testing isolated components
4. **Test When Issues Occur**: Add tests when bugs are found or regressions occur
5. **Don't Re-Test Validated Code**: If functionality is already tested and hasn't changed, don't duplicate tests

**When NOT to Test:**
- ✅ Functionality already thoroughly tested and hasn't changed
- ✅ Isolated components that are already unit tested (unless integration point changes)
- ✅ Code paths already covered by existing tests

**Before Writing Tests:**
- ✅ Review existing test coverage
- ✅ Identify what actually needs testing (new/changed code only)
- ✅ Focus on new code paths, integration points, and error handling
- ✅ Update existing tests when code behavior changes, don't duplicate

### Test Organization

1. **Use Shared Fixtures** (REQUIRED):
   ```python
   # ✅ Good: Use fixtures from test configuration
   def test_function(service, sample_input):
       """Test using shared fixtures."""
       result = function(service, sample_input)
       assert result is not None
   
   # ❌ Bad: Duplicate setup in each test
   def test_function():
       service = Service("temp")  # Duplicate setup
       input_data = InputData(text="test")  # Duplicate setup
   ```
   - Always use fixtures/setup from test configuration files (adapt to your test framework: `tests/conftest.py` for pytest, `tests/setup.js` for Jest, `tests/helpers.go` for Go, etc.)
   - Avoid duplicating setup/teardown code
   - Use appropriate fixture scopes as supported by your test framework (function, class, module, session, etc.)

2. **Consolidate Similar Tests** (REQUIRED):
   ```python
   # Example: Python/pytest parametrization (adapt to your test framework)
   # ✅ Good: Use parametrization for test variations
   @pytest.mark.parametrize("input_value,expected_output", [
       ("input1", "output1"),
       ("input2", "output2"),
       ("input3", "output3"),
   ])
   def test_function_with_variations(input_value, expected_output):
       """Test function with multiple input variations."""
       result = function(input_value)
       assert result == expected_output
   
   # ❌ Bad: Separate test for each variation
   def test_function_input1():
       # Duplicate test logic
   def test_function_input2():
       # Duplicate test logic
   ```
   - Use your test framework's parametrization feature for test variations
   - Examples: `@pytest.mark.parametrize` (pytest), `@ParameterizedTest` (JUnit), `it.each` (Jest), etc.
   - Group related tests in the same class/file
   - Extract common test logic to helper functions

3. **Test Naming Conventions**:
   ```python
   # ✅ Good: Descriptive test names
   def test_function_extracts_data_from_input():
       """Test that function extracts expected data from input."""
   
   def test_service_saves_data_with_metadata():
       """Test that service saves data with complete metadata."""
   
   # ❌ Bad: Vague test names
   def test_function():
       # What does this test?
   def test_save():
       # What does this test?
   ```
   - Use descriptive names: `test_<function>_<scenario>`
   - Test names should explain what is tested
   - Include docstrings for complex tests

4. **Mock External Services** (REQUIRED):
   ```python
   # ✅ Good: Mock external API calls (example using Python unittest.mock)
   @patch('module.external_service')
   def test_external_service_call(mock_service):
       """Test external service call with mocked dependency."""
       mock_service.return_value.method.return_value = Mock()
       # Test logic
   
   # ❌ Bad: Real API calls in tests
   def test_external_service_call():
       result = await real_external_call()  # Expensive and unreliable
   ```
   - Never make real API calls in unit tests
   - Mock external dependencies (APIs, databases, file system, network calls)
   - Use your test framework's mocking capabilities (e.g., `unittest.mock`, `jest.mock`, `gomock`, etc.)

5. **Test Edge Cases**:
   ```python
   # ✅ Good: Test edge cases (example using Python/pytest)
   def test_function_empty_input():
       """Test function handles empty input."""
       result = function("")
       assert result == expected_empty_result
   
   def test_function_very_long_input():
       """Test function handles very long input."""
       long_input = "a" * MAX_INPUT_LENGTH
       result = function(long_input)
       assert len(result) <= MAX_OUTPUT_LENGTH
   ```
   Note: Adapt syntax and assertions to your project's test framework and language
   - Test empty inputs, None values, boundary conditions
   - Test error conditions and exception handling
   - Test invalid inputs and malformed data

6. **Test Isolation** (REQUIRED):
   ```python
   # Example: Test isolation (adapt to your test framework)
   # ✅ Good: Independent tests
   def test_function(fixture):
       """Test independent of other tests."""
       result = function("test")
       assert result is not None
   
   # ❌ Bad: Tests that depend on each other
   def test_first():
       global_state = "modified"
   
   def test_second():
       assert global_state == "modified"  # Depends on test_first
   ```
   - Each test should be independent
   - No shared state between tests
   - Use fixtures/setup functions for common setup, not global variables
   - Note: Adapt isolation patterns to your test framework's capabilities

7. **Test Organization Principles**:
   - **By Test Type**: Organize into unit/, integration/, system/, workflows/
   - **By Module**: Group tests for same module together
   - **By Feature**: Group related functionality tests
   - **One test file per module** (for unit tests)

8. **Test Quality Standards**:
   ```python
   # Example: Test quality (adapt to your test framework)
   # ✅ Good: Clear, focused test
   def test_function_extracts_data():
       """Test that function extracts expected data from input."""
       input_data = "test input"
       result = function(input_data)
       
       assert "expected" in result.data
       assert len(result.data) == 1
       assert result.input == input_data
   ```
   - One assertion per test concept (can have multiple assertions if testing one thing)
   - Clear arrange-act-assert structure (or your framework's equivalent)
   - Test one thing at a time
   - Use descriptive assertions with messages
   - Note: Adapt assertion syntax to your test framework (assert, expect, require, etc.)

9. **Test Documentation**:
   - Add docstrings to all test functions explaining what is tested
   - Document complex test setup in docstrings
   - Use comments for non-obvious test logic
   - Keep test code readable and self-documenting

10. **Test Performance**:
    - Keep tests fast (most should run in <1 second)
    - Use appropriate fixtures (function scope for fast, session scope sparingly)
    - Mock slow operations (network, file I/O, database)
    - Use markers for slow tests (`@pytest.mark.slow`)

---

## 🎨 UI Patterns

[UI-specific patterns and conventions]

---

## 🛠️ Development Tools

### Test Runner Script (Optional but Recommended)

**Recommended**: Create a comprehensive test runner script for standardized test execution across all test types.

**Script Location**: `[test_runner_script]` (root directory or `scripts/` directory)
- **Python projects**: `run_tests.py` or `scripts/run_tests.py`
- **Node.js projects**: `scripts/test.js` or use `npm test` with custom scripts
- **Go projects**: `scripts/test.sh` or use `go test ./...` with wrapper
- **Other languages**: Adapt to your project's conventions

**Usage Examples** (adapt to your test framework):
```bash
# Run all test suites (unit, integration, system, workflow)
[test_runner_command]

# Run only tests that failed in the last run (faster iteration)
[test_runner_command] --failed-only

# Run only unit tests
[test_runner_command] --unit

# Quick run (unit tests only, skip slow tests)
[test_runner_command] --quick

# Generate coverage report
[test_runner_command] --coverage
```

**Features** (implement as applicable to your test framework):
- Runs all test suites (unit, integration, system, workflow)
- Provides comprehensive summary with pass rates
- Supports focusing on failures only (if test framework supports it)
- Quick validation mode (unit tests only, skips slow)
- Coverage reporting option (if available)
- Per-suite breakdown with timing information
- Clear failure indicators and suggestions

**Benefits**:
- Faster iteration: Focus on failing tests only
- Better visibility: Summary shows pass rates and per-suite breakdown
- Consistent execution: Standardized test running across all suites
- Time savings: Skip already validated tests automatically

**When to Use**:
- **Quick validation**: `[test_runner_command] --quick` (after making changes)
- **Full validation**: `[test_runner_command]` (before marking complete)
- **Focus on failures**: `[test_runner_command] --failed-only` (when fixing issues)
- **Coverage check**: `[test_runner_command] --coverage` (for coverage reports)

**Alternative**: Direct test framework commands (for specific test files or advanced options):
```bash
# Run specific test file
[test_framework] [test_path] [options]

# Examples:
# pytest tests/unit/test_module.py -v
# npm test -- tests/unit/test_module.test.js
# go test ./tests/unit/... -v
# cargo test --test test_module
```

**Note**: Adapt test runner script to your project's test framework and conventions. The script is recommended for better organization and summary reporting, but direct test framework commands work for specific test files or advanced features.

---

### Other Development Tools

[Other development tools, commands, scripts]

---

## ⚠️ Common Pitfalls

### [Common Mistake]

❌ **Wrong**: [Bad example]
✅ **Correct**: [Good example]

---

## 📚 Reference Files

### Models
- `[file path]`: [Description]

### Services
- `[file path]`: [Description]

### Test Files
- `[file path]`: [Description]

---

## 🎯 Quick Reference

### File Locations

- **Routes**: `[path]`
- **Models**: `[path]`
- **Services**: `[path]`
- **Features**: `[path]`

### Key [Components]

- `[component name]`: [Description]
- `[component name]`: [Description]

---

**Last Updated**: [YYYY-MM-DD]  
**Project Status**: [Status]  
**Maintained By**: [Team]
```

**Key Sections to Include:**
- ⚠️ MANDATORY prompt validation system
- 🤖 MANDATORY script-first approach (automation prioritization)
- ⚠️ MANDATORY test creation and updates section:
  - **Unit Tests** (`tests/unit/`) - Always required for code changes
  - **Integration Tests** (`tests/integration/`) - Required for cross-module features
  - **System Tests** (`tests/system/`) - Required for end-to-end scenarios
  - **Workflow Tests** (`tests/workflows/`) - Required for workflow changes
- ⚠️ MANDATORY coding best practices section:
  - Type hints (required)
  - Docstrings (required)
  - No warning suppressions (required)
  - Async/await best practices
  - Error handling best practices
  - Logging best practices
  - Function design best practices
  - Code organization best practices
  - Performance best practices
  - Security best practices
- ⚠️ MANDATORY test best practices section:
  - Test naming conventions
  - Test isolation requirements
  - Shared fixture usage (required)
  - Test consolidation with parametrize (required)
  - Mocking external services
  - Edge case testing
  - Test organization
  - Code quality in tests
- ⚠️ MANDATORY documentation update warnings
- Test-first philosophy and test organization details
- Architecture overview (tech stack, principles)
- Complete directory structure with explanations
- Code patterns with examples
- Common tasks (adding features, components, etc.) - all include test requirements for all applicable test types
- UI patterns (if applicable)
- Development tools
- Common pitfalls with examples
- Reference file lists
- Quick reference section

**Update Triggers:**
- Code patterns change
- Architecture changes
- New conventions added
- Directory structure changes
- Platform-specific features added

---

### 4. CLAUDE.md Template

```markdown
# CLAUDE.md - [Project Name] Code Reference

**Purpose**: This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository. It's a quick reference for common tasks and patterns.

**⚠️ MANDATORY STEPS BEFORE ANY CODE CHANGE:**

1. **Tool Call Limit Awareness** - ⚠️ **CRITICAL**: Always be mindful of tool call limits
   - Batch operations when possible (multiple `read_file` calls in parallel)
   - Use efficient tools (`grep` instead of `codebase_search` when possible)
   - Cache information - don't re-read files or re-search patterns
   - Plan tool usage before starting operations
   - See `docs/TOOL-CALL-LIMITS.md` for complete guidelines
2. **Script-First Evaluation** - Before doing any task manually, evaluate if it should be automated
   - Create scripts in `utils/` for repetitive or complex tasks
   - Scripts improve reusability, consistency, and time savings
   - See `AGENTS.md` for script-first philosophy details
3. **Complete Prompt Validation** - Read and complete `docs/PROMPT-VALIDATION.md` (or `docs/PROMPT-VALIDATION-QUICK.md` for rapid validation)
   - All validation gates must pass
   - All confidence levels must be ≥ 7/10
   - Include tool call limit assessment and script-first evaluation in process understanding phase
4. **Plan Tests** - Identify test requirements BEFORE coding
   - Review existing tests for affected modules
   - Plan new tests or test updates needed
   - Determine test type (unit/integration/system/workflow)
5. **TODO Management** - If creating todos via `todo_write` tool:
   - **REQUIRED**: Update `TODO.md` immediately
   - Add new items to appropriate priority section
   - Include status, priority, overview, requirements, technical details, and notes
   - Update prioritization summary table if counts change
6. **Read Documentation Maintenance** - Read `docs/DOCUMENTATION-MAINTENANCE.md` to understand documentation requirements

**Last Updated**: [YYYY-MM-DD]  
**Project Status**: [Status]

---

## Project Overview

**[Project Name]** is [brief description]. [Key technologies and concepts].

**Core Philosophy**: [Philosophy statement].

**Key Tech Stack:**
- [Technology 1]
- [Technology 2]
- [Technology 3]

## Development Commands

### Running the [Application/Service]
```bash
# Command
```

### Code Generation
```bash
# Command
```

### Testing
```bash
# Command
```

### Building
```bash
# Command
```

## Common Patterns

### [Pattern Name]
```[language]
// Pattern example
```

### [Pattern Name]
```[language]
// Pattern example
```

## File Locations

- **Routes**: `[path]`
- **Models**: `[path]`
- **Services**: `[path]`
- **[Category]**: `[path]`

## Key [Components]

- `[Component]`: [Description]
- `[Component]`: [Description]

## Adding Features

[Quick workflow for adding features]

## Testing

[Testing commands and structure]

---

**Last Updated**: [YYYY-MM-DD]  
**Project Status**: [Status]
```

**Key Sections to Include:**
- Quick project overview
- Development commands (running, testing, building, code generation)
- Common patterns quick reference
- File locations quick lookup
- Key components list
- Adding features workflow
- Testing commands

**Update Triggers:**
- Commands change
- File structure changes
- New workflows
- New features added

---

### 5. DOCUMENTATION.md Template

```markdown
# Documentation Guide

**Purpose**: Quick reference guide to all project documentation.

**Last Updated**: [YYYY-MM-DD]  
**Status**: [Status]

---

## 📚 Core Documentation (Start Here)

### Essential Reading
1. **README.md** - Project overview, features, quick start
2. **CONTEXT.md** - Architecture decisions, philosophy, project context
3. **AGENTS.md** - Developer guide, patterns, conventions
4. **docs/PROMPT-VALIDATION.md** - ⚠️ **MANDATORY**: Prompt validation system
5. **docs/PROMPT-VALIDATION-QUICK.md** - Quick 5-minute validation checklist
6. **docs/DOCUMENTATION-MAINTENANCE.md** - ⚠️ **MANDATORY**: Automatic documentation maintenance guide
7. **CLAUDE.md** - Quick reference for developers
8. **WORKFLOW.md** - User workflows and validation guide
9. **TODO.md** - All pending features, fixes, and improvements

### Historical & Reference
10. **CHANGELOG.md** - Complete version history
11. **EVALS.md** - Evaluation criteria, test scenarios, quality checks
12. **[Other docs]**

---

## 📁 Documentation Structure

```
├── README.md                    # Main project overview
├── CONTEXT.md                   # Architecture & philosophy
├── AGENTS.md                    # Developer guide
├── CLAUDE.md                    # Quick reference
├── DOCUMENTATION.md             # Documentation navigation guide
├── DOCUMENTATION-BLUEPRINT.md   # Documentation templates & guidelines (reference file, optional)
├── DOCUMENTATION-OVERVIEW.md    # Overview of all documentation files
├── WORKFLOW.md                  # User workflows & validation
├── TODO.md                      # Pending features, fixes & improvements
├── CHANGELOG.md                 # Version history
├── EVALS.md                     # Evaluation guide
│
├── INDEX.md                     # ⚠️ MANDATORY (when 20+ files or complex structure): Project-wide index - Maps all files and directories
│
├── docs/                        # Additional technical documentation
│   ├── PROMPT-VALIDATION.md     # ⚠️ MANDATORY: Validation system
│   ├── PROMPT-VALIDATION-QUICK.md # Quick 5-minute validation checklist
│   ├── DOCUMENTATION-MAINTENANCE.md # ⚠️ MANDATORY: Automatic documentation maintenance guide
│   ├── INDEX.md                 # ⚠️ MANDATORY: Documentation directory index (when docs/ has 5+ files)
│   ├── ARCHITECTURE.md          # Detailed system architecture (if applicable)
│   ├── CORE_API_REFERENCE.md    # Complete API documentation (if applicable)
│   ├── WORKFLOW.md              # Technical workflow system (if applicable)
│   ├── TESTING.md               # Comprehensive testing guide (if applicable)
│   ├── [subdirectory]/          # [Description]
│   └── [other technical docs]   # [Description]
│
├── config/                      # Configuration files (if applicable)
│   ├── INDEX.md                 # ⚠️ MANDATORY: Configuration files index (when config/ has 5+ files)
│   └── [config files]           # Configuration files
│
├── data/                        # Data files (if applicable)
│   ├── INDEX.md                 # ⚠️ MANDATORY: Data files index (when data/ has 5+ files)
│   └── [data files]             # Data files
│
├── tests/                       # Test suite (if applicable)
│   ├── INDEX.md                 # ⚠️ MANDATORY: Test files index (when tests/ has 5+ files)
│   ├── TEST_ORGANIZATION.md     # Test organization guide (recommended for complex test suites)
│   └── [test files]             # Test files
│
└── utils/                       # Utilities (if applicable)
    ├── INDEX.md                 # ⚠️ MANDATORY: Utilities index (when utils/ has 5+ files)
    └── [utility files]          # Utility files
```

---

## 🎯 Documentation by Purpose

### Understanding "Why" (Philosophy & Decisions)
- **CONTEXT.md** - Project philosophy, architecture decisions, design rationale

### Understanding "How" (Implementation)
- **AGENTS.md** - Detailed implementation patterns, code structure, conventions
- **docs/PROMPT-VALIDATION.md** - ⚠️ **MANDATORY**: Validation system before any operation
- **CLAUDE.md** - Quick commands and patterns for development

### Understanding "What" (Features & Status)
- **README.md** - Complete feature list and overview
- **WORKFLOW.md** - How users interact with features
- **CHANGELOG.md** - What changed in each version
- **EVALS.md** - What's tested and how to verify
- **TODO.md** - What's not yet implemented

### Navigation & Reference
- **INDEX.md** - ⚠️ **MANDATORY** (when project has 20+ files or complex structure): Project-wide navigation index mapping all files
- **DOCUMENTATION.md** - Central guide to all documentation (this file)
- **DOCUMENTATION-BLUEPRINT.md** - Documentation templates & guidelines (reference file, optional)
- **DOCUMENTATION-OVERVIEW.md** - Overview of all documentation files

---

## 📋 Documentation by Audience

### New Developers
1. Read **CONTEXT.md** (understand philosophy)
2. Read **README.md** (understand features)
3. Read **AGENTS.md** (learn implementation patterns)
4. Reference **CLAUDE.md** (quick commands)

### QA Testers
1. Read **WORKFLOW.md** (user workflows for validation)
2. Read **EVALS.md** (evaluation criteria and test scenarios)

### Project Managers
1. Read **README.md** (feature overview)
2. Read **TODO.md** (pending items and remaining work)
3. Reference **CHANGELOG.md** (version history)

### Developers
1. ⚠️ **MANDATORY**: Complete **docs/PROMPT-VALIDATION.md** before any operation
   - All validation gates must pass
   - All confidence levels must be ≥ 7/10
   - Quick option: **docs/PROMPT-VALIDATION-QUICK.md** for rapid 5-minute validation
2. Read **CLAUDE.md** (quick reference)
3. Reference **AGENTS.md** (implementation patterns)
4. Check **CONTEXT.md** (project philosophy)

---

## ⚠️ Documentation Maintenance (AUTOMATIC FOR AI AGENTS)

**🤖 FOR AI AGENTS: Prompt validation and documentation updates are AUTOMATIC and MANDATORY**

**All operations require two mandatory steps:**

1. **Prompt Validation**: `docs/PROMPT-VALIDATION.md` - **REQUIRED BEFORE ANY OPERATION**
   - Complete 5-phase validation system
   - All validation gates must pass
   - All confidence levels must be ≥ 7/10
   - Quick option: `docs/PROMPT-VALIDATION-QUICK.md` for rapid validation

2. **Documentation Maintenance**: `docs/DOCUMENTATION-MAINTENANCE.md` - **REQUIRED READING BEFORE ANY CODE CHANGES**

### Validation & Documentation Workflow

**Implementation Steps (7 Steps):**

**Step 0: Tool Call Limit Awareness** (⚠️ CRITICAL FIRST STEP)
1. Assess tool usage needs - identify all files/operations required
2. Plan batching strategy - group independent operations for parallel execution
3. Choose efficient tools - use `grep` vs `codebase_search`, `glob_file_search` vs `list_dir`
4. Avoid redundancy - don't re-read files or re-search patterns
5. Cache information - reuse already-gathered information
6. See: `docs/TOOL-CALL-LIMITS.md` for complete guidelines

**Step 1: Script-First Evaluation** (MANDATORY SECOND STEP)
1. Evaluate if task should be automated (script vs manual)
2. If repetitive/complex, create script in `utils/` directory
3. See **AGENTS.md** for script-first philosophy and examples

**Step 2: Prompt Validation** (MANDATORY THIRD STEP)
1. Complete prompt validation (`docs/PROMPT-VALIDATION.md`)
2. Include tool call limit assessment in Phase 5 (Autonomous Operation)
3. Include script-first evaluation in process understanding phase
4. All validation gates passed (including tool call optimization in Gate 5)
5. All confidence levels ≥ 7/10

**Steps 0-3: Test Creation and Documentation Maintenance**
1. **Before coding**: Plan tests, read maintenance guide, identify change type, copy checklist
2. **During coding**: Write tests alongside code, keep checklist visible
3. **After coding**: Run test suite, update ALL required docs using checklist
4. **Before complete**: Verify all tests pass, verify consistency, check off all items

**This should be automatic - tests and documentation updates are part of the implementation, not optional.**

### Documentation Maintenance Guide

`docs/DOCUMENTATION-MAINTENANCE.md` provides:
- **Automatic workflow** (Steps -1 through 3: Validation/Before/During/After coding)
- **Auto-update triggers** for all change types (feature, bug, test, refactor, etc.)
- **Copy-paste checklists** for each change category
- **Verification steps** (version consistency, dates, links)
- **Common mistakes to avoid**

### Built-In Reminders

**These files contain automatic reminders:**
- `AGENTS.md` - Top of file has mandatory documentation section
- `CHANGELOG.md` - Header warns about automatic updates
- `docs/DOCUMENTATION-MAINTENANCE.md` - Complete automatic workflow guide
- `.cursorrules` - Cursor-specific automatic documentation rules

---

**Last Updated**: [YYYY-MM-DD]
```

**Key Sections to Include:**
- Complete list of all documentation files
- Documentation structure overview
- Navigation by purpose (why/how/what)
- Audience-specific guides
- Documentation maintenance references

**Update Triggers:**
- Documentation structure changes
- New documentation files added

---

### 6. WORKFLOW.md Template

```markdown
# WORKFLOW.md - User Workflows & Validation Guide

**Purpose**: This document describes expected user workflows, navigation paths, and feature interactions. Use this for validation testing to ensure each workflow functions correctly.

**Last Updated**: [YYYY-MM-DD]  
**Project Status**: [Status]

---

## 🎯 Workflow Overview

This guide covers all major user workflows in the [Project Name]. Each workflow includes:
- **Steps**: Detailed step-by-step instructions
- **Navigation**: Expected routes and transitions
- **UI States**: What the user should see at each step
- **Validation**: Key points to verify functionality
- **Success Criteria**: How to confirm the workflow completed successfully

---

## 📋 Table of Contents

1. [Workflow Category 1](#1-workflow-category-1)
2. [Workflow Category 2](#2-workflow-category-2)
3. [Workflow Category 3](#3-workflow-category-3)
[Add more as needed]

---

## 1. Workflow Category 1

### Workflow 1.1: [Specific Workflow Name]

**Trigger**: [What causes this workflow to start]

**Steps**:

1. **[Step Name]**
   - **From**: [Starting location/state]
   - **Action**: [What user does]
   - **Expected**: [What should happen]
   - **Validation**: 
     - [Checkpoint 1]
     - [Checkpoint 2]

2. **[Step Name]**
   - [Details]

**Success Criteria**:
- ✅ [Criterion 1]
- ✅ [Criterion 2]

---

## 2. Workflow Category 2

[Similar structure]

---

**Last Updated**: [YYYY-MM-DD]
```

**Key Sections to Include:**
- Workflow overview explaining the structure
- Table of contents
- Multiple workflow categories with:
  - Workflow names
  - Triggers
  - Detailed steps (From/Action/Expected/Validation)
  - Success criteria
- Platform-specific workflows (if applicable)

**Update Triggers:**
- UI changes
- Workflow changes
- New features with user interactions
- Platform-specific features added

---

### 7. CHANGELOG.md Template

```markdown
# CHANGELOG.md

All notable changes to the [Project Name] will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

**⚠️ AUTOMATIC DOCUMENTATION UPDATE REQUIRED**: 

**🤖 FOR AI AGENTS**: This file MUST be updated for EVERY code change. 

**Before making any code change:**

1. ✅ **⚠️ MANDATORY**: Complete prompt validation (`docs/PROMPT-VALIDATION.md` or `docs/PROMPT-VALIDATION-QUICK.md`)
   - All validation gates must pass
   - All confidence levels must be ≥ 7/10
2. ✅ Read `docs/DOCUMENTATION-MAINTENANCE.md` FIRST
3. ✅ Copy the appropriate checklist for your change type
4. ✅ Update this file (CHANGELOG.md) as part of your implementation
5. ✅ Update other docs per the checklist (README.md, AGENTS.md, WORKFLOW.md, EVALS.md)

**This is not optional - prompt validation and documentation updates are mandatory for all code changes.**

See `docs/PROMPT-VALIDATION.md` for prompt validation system.
See `docs/DOCUMENTATION-MAINTENANCE.md` for complete update guidelines and checklists.

---

## [Unreleased]

### Added
- [New features]

### Changed
- [Changes]

### Fixed
- [Bug fixes]

## [X.Y.Z] - YYYY-MM-DD

### Added
- **[Feature Category]**: [Description]
  - Specific feature 1
  - Specific feature 2
- **[Feature Category]**: [Description]

### Changed
- **[Change Category]**: [Description]

### Fixed
- **[Fix Category]**: [Description]

### Technical Changes
- [Technical change 1]
- [Technical change 2]

---

## [Previous Versions]

[Version history continues...]

---

**Format Guidelines**:
- Use [Keep a Changelog](https://keepachangelog.com/) format
- Group changes by type (Added, Changed, Fixed, Technical Changes)
- Include breaking changes if applicable
- Link to related documentation if needed
```

**Key Sections to Include:**
- [Unreleased] section for current work
- Version entries with date (YYYY-MM-DD format)
- Grouped by type: Added, Changed, Fixed, Technical Changes
- Breaking changes section (if applicable)
- Format based on Keep a Changelog standard

**Update Triggers:**
- **ALWAYS** - Every change must be documented here (REQUIRED)

---

### 8. EVALS.md Template

```markdown
# EVALS.md - Evaluation & Testing Guide

**Purpose**: This document provides evaluation criteria, test scenarios, and quality checks for the [Project Name]. Use this to verify feature completeness, code quality, and system reliability.

**Last Updated**: [YYYY-MM-DD]  
**Project Status**: [Status]

---

## 📊 Evaluation Overview

### Current Status

- **[Metric 1]**: [Status]
- **[Metric 2]**: [Status]
- **[Metric 3]**: [Status]
- **[Metric 4]**: [Status]

### Evaluation Categories

1. **Functionality**: Feature completeness and correctness
2. **Code Quality**: Linting, style, best practices
3. **Testing**: Test coverage and test execution
4. **Architecture**: Design patterns and structure
5. **Performance**: Response times and resource usage
6. **User Experience**: UI/UX consistency and accessibility
7. **[Category]**: [Description]
8. **Error Handling**: Graceful degradation and error recovery

---

## 🧪 Test Execution

### Running All Tests

```bash
# Command to run all tests (adapt to your test framework)
[test_framework] tests/ [options]

# Examples:
# pytest tests/ -v
# npm test
# go test ./...
# cargo test
# mvn test
```

### Running Test Categories

```bash
# Unit tests - Test isolated modules and functions
[test_framework] tests/unit/ [options]

# Integration tests - Test cross-module workflows
[test_framework] tests/integration/ [options]

# System tests - Test end-to-end scenarios
[test_framework] tests/system/ [options]

# Workflow tests - Test complete workflows
[test_framework] tests/workflows/ [options]

# All tests
[test_framework] tests/ [options]

# Examples:
# pytest tests/unit/ -v
# npm test -- tests/unit
# go test ./tests/unit/...
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

## 📋 Test Organization Guide

**⚠️ RECOMMENDED: Create `tests/TEST_ORGANIZATION.md`** for complex test suites (>50 tests or multiple test types).

**When to create:**
- ✅ Test suite has multiple test types (Unit, Integration, System, Workflow)
- ✅ Test organization is complex
- ✅ Team needs clear test structure guidelines
- ✅ Test consolidation and optimization is important

**Key Sections to Include:**
- Directory structure with file counts
- Organization principles (by type, module, integration area, scenario, workflow)
- ⚠️ **MANDATORY**: Test consolidation and optimization requirements
- Test structure template with examples
- Fixture usage guidelines
- Consolidation examples (before/after)
- Test naming conventions
- Test isolation requirements

**See Template Below** (section "Test Organization Guide Template") for complete structure.

---

## ✅ Functionality Evaluation

### Core Features Checklist

- [ ] [Feature 1]: [Verification criteria]
- [ ] [Feature 2]: [Verification criteria]
- [ ] [Feature 3]: [Verification criteria]

### [Feature Category] Checklist

- [ ] [Feature]: [Verification criteria]

---

## 📋 Code Quality Evaluation

### Linting
- [ ] Zero errors
- [ ] Zero warnings (or all warnings are visible - no suppressions)
- [ ] No warning suppressions (e.g., `# type: ignore`, `--disable-warnings`)
- [ ] [Other criteria]

### Test Quality
- [ ] All tests pass
- [ ] No skipped tests (tests fail properly instead of silently skipping)
- [ ] Test execution verified (run immediately after writing, run full suite before complete)
- [ ] [Other criteria]

### Style
- [ ] [Style requirement 1]
- [ ] [Style requirement 2]

### Warning Visibility
- [ ] No warning suppressions in code (`# type: ignore`, etc.)
- [ ] No warning suppressions in config (`--disable-warnings`, etc.)
- [ ] All warnings and issues are visible (no hidden problems)
- [ ] All skipped tests fixed or removed (tests fail properly instead)

---

## 🏗️ Architecture Evaluation

- [ ] [Architecture criteria 1]
- [ ] [Architecture criteria 2]

---

## ⚡ Performance Evaluation

- [ ] [Performance criteria 1]
- [ ] [Performance criteria 2]

---

## 🎨 UX Evaluation

- [ ] [UX criteria 1]
- [ ] [UX criteria 2]

---

## 🚀 Quick Evaluation Checklist

### Pre-Release Checklist

**Functionality:**
- [ ] All features work as expected
- [ ] [Platform-specific] features work
- [ ] No critical bugs
- [ ] All user flows tested

**Code Quality:**
- [ ] Zero linter errors/warnings
- [ ] Code follows style guide
- [ ] [Other quality checks]

---

**Last Updated**: [YYYY-MM-DD]
```

**Key Sections to Include:**
- Evaluation overview and current status
- Test execution commands (all 4 test types)
- Test organization guide reference (`tests/TEST_ORGANIZATION.md`)
- Functionality evaluation checklists (by feature category)
- Code quality evaluation
- Architecture evaluation
- Performance evaluation
- UX evaluation
- Error handling evaluation
- Platform compatibility (if applicable)
- Quick evaluation checklist

**Update Triggers:**
- Test requirements change
- Evaluation criteria change
- New features added
- Platform support changes

---

### 8a. tests/TEST_ORGANIZATION.md Template (⚠️ RECOMMENDED)

```markdown
# Test Organization Guide

**Purpose**: Document the organization and structure of the test suite.

**⚠️ RECOMMENDED**: Create this file for complex test suites (>50 tests or multiple test types).

**Last Updated**: [YYYY-MM-DD]  
**Version**: [X.Y.Z]

---

## 📁 Directory Structure

```
tests/
├── README.md                    # Main test suite documentation
├── INDEX.md                     # ⚠️ MANDATORY: Test files index (when 5+ files)
├── TEST_ORGANIZATION.md         # This file (organization guide)
├── [test_config_file]           # Shared fixtures and configuration (e.g., `conftest.py` for pytest, `setup.js` for Jest, `helpers.go` for Go)
├── [test_config_file]           # Test framework configuration (e.g., `pytest.ini`, `jest.config.js`, `.testconfig`)
│
├── unit/                        # Unit Tests ([X] files)
│   ├── test_[module].[ext]        # Test isolated modules (adapt [ext] to your language)
│   └── [other unit tests]       # ...
│
├── integration/                 # Integration Tests ([X] files)
│   ├── test_[feature]_integration.[ext] # Test cross-module workflows
│   └── [other integration tests]    # ...
│
├── system/                      # System Tests ([X] files)
│   ├── test_[scenario].[ext]      # Test end-to-end scenarios
│   └── [other system tests]    # ...
│
└── workflows/                   # Workflow Tests ([X] files)
    ├── test_[workflow_type].[ext] # Test complete workflows
    └── [other workflow tests]   # ...
```

---

## 🗂️ Organization Principles

### 1. By Test Type
Tests are organized into four main categories:
- **Unit Tests** (`tests/unit/`): Isolated module tests - Always required for code changes
- **Integration Tests** (`tests/integration/`): Cross-module workflows - Required for cross-module features
- **System Tests** (`tests/system/`): End-to-end scenarios - Required for end-to-end scenarios
- **Workflow Tests** (`tests/workflows/`): Complete workflow simulations - Required for workflow changes

### 2. By Module (Unit Tests)
- One test file per module: `test_{module_name}.[ext]` (adapt `[ext]` to your language's test file extension)
- Split large modules into multiple test files by functionality (if needed)

### 3. By Integration Area (Integration Tests)
- Organize by integration topic
- Test cross-module workflows

### 4. By Scenario (System Tests)
- Organize by end-to-end scenario
- Test complete user journeys

### 5. By Workflow Type (Workflow Tests)
- Organize by workflow category
- Test complete workflow simulations

---

## ⚠️ MANDATORY: Test Consolidation and Optimization

**🚨 CRITICAL REQUIREMENT**: All generated tests MUST be consolidated and optimized.

**Before marking tests complete, ensure:**

1. **✅ Use Shared Fixtures**:
   - Always use fixtures from your test framework's configuration file (e.g., `tests/conftest.py` for pytest, `tests/setup.js` for Jest, `tests/helpers.go` for Go) for common setup
   - Avoid duplicating setup/teardown code
   - Example: Use shared fixtures like `data_store`, `sample_query`, `temp_data_dir` (adapt names to your project)

2. **✅ Consolidate Similar Tests**:
   - Use your test framework's parametrization feature for test variations (e.g., `@pytest.mark.parametrize` for pytest, `@ParameterizedTest` for JUnit, `it.each` for Jest)
   - Group related tests in the same class or test suite
   - Extract common test logic to helper functions

3. **✅ Reuse Test Utilities**:
   - Use helper functions from your test configuration file or test utilities (e.g., `conftest.py` for pytest, `setup.js` for Jest, `helpers.go` for Go)
   - Create shared test helpers if needed
   - Avoid copy-pasting test code

4. **✅ Follow Organization Principles**:
   - Place tests in appropriate directories (unit/integration/system/workflows)
   - Use consistent naming conventions
   - One test file per module (for unit tests)

5. **✅ Optimize Test Execution**:
   - Use appropriate test framework markers/annotations (e.g., `@pytest.mark.asyncio` for pytest, `@it.skip` for Jest, `t.Skip()` for Go, etc.)
   - Minimize setup/teardown overhead
   - Use fixtures efficiently (scope appropriately)

**Example - Before Consolidation** (adapt to your language):
```[language]
// ❌ Don't: Duplicate setup in each test
function testInput1() {
    const service = new Service("temp");
    const inputData = new InputData({ text: "test" });
    // test code
}

function testInput2() {
    const service = new Service("temp");  // Duplicate setup
    const inputData = new InputData({ text: "test2" });  // Duplicate setup
    // test code
}
```

**Example - After Consolidation** (adapt to your language and test framework):
```[language]
// ✅ Do: Use fixtures and parametrization
// Python/pytest: @pytest.mark.parametrize("input_value,expected", [...])
// JavaScript/Jest: test.each([...])
// Go: table-driven tests with struct slices
test.each([
    ["test", "expected1"],
    ["test2", "expected2"],
])("input variations: %s", (inputValue, expected) => {
    const service = getService();  // From shared fixture
    const inputData = new InputData({ text: inputValue });
    // test code
});
```

---

## 📝 Test Structure Template

**Adapt this template to your project's language and test framework:**

### Python/pytest Example:
```python
"""
Unit Tests for module.[ext]

Tests for [description].

**Last Updated**: [YYYY-MM-DD]
**Version**: [X.Y.Z]
"""

import pytest
from unittest.mock import Mock, AsyncMock
from tests.conftest import service, sample_input  # Use shared fixtures
from module import function_to_test


class TestFunction:
    """Tests for function_to_test."""

    def test_basic_usage(self, data_store):
        """Test basic usage."""
        result = function_to_test("input", data_store)
        assert result is not None

    @pytest.mark.parametrize("input,expected", [
        ("input1", "expected1"),
        ("input2", "expected2"),
    ])
    def test_variations(self, data_store, input, expected):
        """Test function with multiple inputs."""
        result = function_to_test(input, data_store)
        assert result == expected
```

### JavaScript/Jest Example:
```javascript
/**
 * Unit Tests for module.[ext]
 * 
 * Tests for [description].
 * 
 * Last Updated: [YYYY-MM-DD]
 * Version: [X.Y.Z]
 */

const { functionToTest } = require('../module');
const { service, sampleInput } = require('../tests/setup'); // Use shared fixtures

describe('functionToTest', () => {
  test('basic usage', () => {
    const result = functionToTest('input', service);
    expect(result).not.toBeNull();
  });

  test.each([
    ['input1', 'expected1'],
    ['input2', 'expected2'],
  ])('variations: %s', (input, expected) => {
    const result = functionToTest(input, service);
    expect(result).toBe(expected);
  });
});
```

### Go Example:
```go
// Unit Tests for module.[ext]
//
// Tests for [description].
//
// Last Updated: [YYYY-MM-DD]
// Version: [X.Y.Z]

package module_test

import (
    "testing"
    "github.com/stretchr/testify/assert"
    "yourproject/module"
    "yourproject/tests/helpers" // Use shared fixtures
)

func TestFunction(t *testing.T) {
    service := helpers.SetupService()
    
    t.Run("basic usage", func(t *testing.T) {
        result := module.FunctionToTest("input", service)
        assert.NotNil(t, result)
    })
    
    testCases := []struct {
        input    string
        expected string
    }{
        {"input1", "expected1"},
        {"input2", "expected2"},
    }
    
    for _, tc := range testCases {
        t.Run(tc.input, func(t *testing.T) {
            result := module.FunctionToTest(tc.input, service)
            assert.Equal(t, tc.expected, result)
        })
    }
}
```

**Note**: Adapt the template to your project's language, test framework, and conventions. The key principles (shared fixtures, parametrization, clear naming) apply across all languages.

---

**Last Updated**: [YYYY-MM-DD]  
**Version**: [X.Y.Z]
```

**When to create:**
- ✅ Test suite has multiple test types (Unit, Integration, System, Workflow)
- ✅ Test organization is complex
- ✅ Team needs clear test structure guidelines
- ✅ Test consolidation and optimization is important

**Key Sections to Include:**
- Directory structure with file counts
- Organization principles (by type, module, integration area, scenario, workflow)
- ⚠️ **MANDATORY**: Test consolidation and optimization requirements
- Test structure template with examples
- Fixture usage guidelines
- Consolidation examples (before/after)
- Test naming conventions
- Test isolation requirements

**Update Triggers:**
- Test organization changes
- New test types added
- Test structure changes
- Consolidation principles updated

---

### 9. TODO.md Template

```markdown
# TODO.md - Pending Features, Fixes & Improvements

**Purpose**: This document consolidates all pending features, fixes, improvements, and optional enhancements for the [Project Name].

**⚠️ MANDATORY**: This file MUST be updated whenever todos are created via `todo_write` tool.

**🚨 CRITICAL RULE**: When creating todos using the `todo_write` tool, you MUST immediately update this file with the new todo items.

**Last Updated**: [YYYY-MM-DD]  
**Project Status**: [Status]

---

## 📋 Summary

**Core Features**: ✅ **[Status]** - [Description of what's complete]

**Pending Items**: [Description of pending work]

---

## 🔥 High Priority Items

### [Item Number]. [Item Name]

- **Status**: [Status (Planned/In Progress/Blocked)]
- **Priority**: 🔥 **Critical** / ⚠️ **High** / 📋 **Medium** / 💡 **Low**
- **Overview**: [Brief description]

#### Requirements
- [ ] [Requirement 1]
- [ ] [Requirement 2]
- [ ] [Requirement 3]

#### Technical Details
- **Files to Modify**: 
  - `[file path]`: [Description]
  - `[file path]`: [Description]
- **New Files Needed**:
  - `[file path]`: [Description]
- **Dependencies**: [Dependency information]

#### Notes
[Additional notes, considerations, or blockers]

---

## 📋 Medium Priority Items

### [Item Number]. [Item Name]

[Similar structure]

---

## 💡 Low Priority Items

### [Item Number]. [Item Name]

[Similar structure]

---

## 🔮 Future (User-Requested Only)

### [Item Number]. [Item Name]

[Features that are not actively planned but may be added if requested]

---

## 📊 Prioritization Summary

| Priority | Count | Focus Areas |
|----------|-------|-------------|
| Critical | [X] | [Areas] |
| High | [X] | [Areas] |
| Medium | [X] | [Areas] |
| Low | [X] | [Areas] |

---

**Last Updated**: [YYYY-MM-DD]
```

**Key Sections to Include:**
- ⚠️ **MANDATORY**: Update instructions when creating todos
- Summary of what's complete vs. pending
- Items organized by priority:
  - High Priority (Critical/High)
  - Medium Priority
  - Low Priority
  - Future (User-Requested Only)
- Each item should include:
  - Status
  - Priority level
  - Overview
  - Requirements checklist
  - Technical details (files, dependencies)
  - Notes
- Prioritization summary table

**⚠️ MANDATORY UPDATE REQUIREMENT:**
- **When creating todos via `todo_write` tool**: Update `TODO.md` immediately
- **When completing todos**: Remove items from `TODO.md` and move to "Completed Items" section

**Update Triggers:**
- Items completed
- New items added
- Priorities change
- Status changes

---

### 4a. PROMPT-VALIDATION.md Template

```markdown
# Prompt Validation System

**Purpose**: Autonomous validation system to ensure developers fully understand their tasks and operational context before executing any work.

**⚠️ MANDATORY**: Complete this validation BEFORE starting any task.

**Last Updated**: [YYYY-MM-DD]  
**Version**: 1.0.0

---

## 🎯 Overview

This validation system ensures developers:

1. **Understand the task** - What needs to be done and why
2. **Understand the context** - Codebase, architecture, and constraints
3. **Understand the requirements** - Success criteria, constraints, and expectations
4. **Understand the process** - How to execute, validate, and document
5. **Can operate autonomously** - Have all information needed without human intervention

**This validation must be completed BEFORE any code changes, documentation updates, or system modifications.**

---

## 🔍 Pre-Operation Validation Checklist

### Phase 1: Task Understanding
[Task comprehension checklist - see actual file for full template]

### Phase 2: Codebase Understanding
[Codebase comprehension checklist]

### Phase 3: Requirements Understanding
[Requirements comprehension checklist]

### Phase 4: Process Understanding
[Process comprehension checklist]

### Phase 5: Autonomous Operation Capability
[Autonomy verification checklist]

---

## ✅ Validation Self-Assessment

[Confidence scoring and self-assessment questions]

---

## 🚦 Validation Gates

[All gates must pass before proceeding]

---

**Last Updated**: [YYYY-MM-DD]  
**Version**: 1.0.0
```

**Key Sections to Include:**
- 5-phase validation system (Task, Codebase, Requirements, Process, Autonomy)
- **Phase 5: Tool Call Limit Assessment** (REQUIRED):
  - Planned tool calls identification
  - Batching strategy for operations
  - Tool efficiency selection (grep vs codebase_search, glob_file_search vs list_dir)
  - Redundancy avoidance (re-reading files, re-searching patterns)
  - Information caching strategies
  - Reference to `docs/TOOL-CALL-LIMITS.md`
- **Gate 5: Tool Call Optimization Check** (REQUIRED):
  - Batched operations verified
  - Efficient tools chosen
  - Redundancy avoided
- Validation gates and confidence level requirements (≥ 7/10)
- Task-specific checklists (feature, bug fix, refactor, documentation)
- Autonomous operation strategies (including tool usage optimization in Information Gathering section)
- Error resolution guidance
- Self-assessment questions

**Update Triggers:**
- Validation process changes
- New validation requirements
- Workflow changes

---

### 4b. PROMPT-VALIDATION-QUICK.md Template

```markdown
# Prompt Validation - Quick Checklist

**Purpose**: Rapid validation checklist for developers. Complete this BEFORE any operation.

**Full Version**: See `docs/PROMPT-VALIDATION.md` for detailed validation.

**Last Updated**: [YYYY-MM-DD]

---

## ⚡ 5-Minute Quick Validation

[Quick validation checklist for all 5 phases]

---

## 🚦 Go/No-Go Decision

**✅ GO if:**
- All gates checked
- Confidence ≥ 7/10 in all areas
- Execution plan clear
- Documentation checklist ready

**⛔ NO-GO if:**
- Any gate unchecked
- Confidence < 7/10 in any area
- Missing information
- Ambiguous requirements

---

**Last Updated**: [YYYY-MM-DD]
```

**Key Sections to Include:**
- 5-minute rapid validation checklist
- Go/No-Go decision criteria
- Quick reference to full validation system

**Update Triggers:**
- Validation process changes

---

### 4c. DOCUMENTATION-MAINTENANCE.md Template

```markdown
# Documentation Maintenance Guide

**Purpose**: Comprehensive guide for developers to automatically update documentation when making code changes.

**⚠️ MANDATORY**: This guide MUST be followed for EVERY code change.

**Last Updated**: [YYYY-MM-DD]  
**Version**: [X.Y.Z]

---

## 🎯 Quick Start

**🚨 PRIORITY #1: AUTOMATIC DOCUMENTATION UPDATES ARE MANDATORY**

**BEFORE ANY CODE CHANGE:**

1. **⚠️ MANDATORY: Read this file FIRST** (`docs/DOCUMENTATION-MAINTENANCE.md`)
   - **Understand that documentation updates are AUTOMATIC and MANDATORY**
   - **Documentation updates happen DURING implementation, not after**
   - **Code changes without documentation updates = INCOMPLETE WORK**

2. **⚠️ MANDATORY: Complete Prompt Validation** - Read and complete `docs/PROMPT-VALIDATION.md`
   - Include script-first evaluation in process understanding phase

3. **Identify your change type** - Feature, bug fix, refactor, test, etc.

4. **Copy the checklist** - Use the appropriate checklist below

5. **Keep checklist visible** - While coding, track what needs updating

6. **Update documentation DURING coding** - Not after:
   - ✅ **Update CHANGELOG.md immediately** (REQUIRED - no exceptions)
   - ✅ **Update other docs as you make changes**
   - ✅ **Update "Last Updated" dates in all modified files**

7. **Update ALL required docs** - Before marking complete, verify all items checked

**🚨 CRITICAL: Do not mark work complete until ALL documentation is updated.**

---

## 📋 Automatic Workflow (7 Steps)

### Step 0: Tool Call Limit Awareness (REQUIRED FIRST STEP)
1. ✅ **Assess and optimize tool usage** before ANY operation
   - Plan all tool calls needed (files to read, searches to perform)
   - Batch operations when possible (multiple `read_file` calls in parallel)
   - Choose efficient tools (`grep` vs `codebase_search`, `glob_file_search` vs `list_dir`)
   - Cache information - avoid re-reading files or re-searching patterns
   - See `docs/TOOL-CALL-LIMITS.md` for complete guidelines

### Step 1: Script-First Evaluation (REQUIRED SECOND STEP)
1. ✅ **Evaluate if task should be automated** (script vs manual)
2. ✅ **If repetitive/complex, create script** in `utils/` directory
   - Include error handling, logging, and documentation
   - See **AGENTS.md** for script-first philosophy
3. ✅ **Decision documented** (why script or why manual)

### Step 2: Prompt Validation (REQUIRED THIRD STEP)
[Prompt validation steps - see actual file]
   - Include tool call limit assessment in Phase 5 (Autonomous Operation)
   - Include script-first evaluation in process understanding phase

### Step 3: Before Coding
1. ✅ **Read** `docs/DOCUMENTATION-MAINTENANCE.md` FIRST
2. ✅ **Identify** change type (feature/bug/test/refactor/architecture)
3. ✅ **Copy** the appropriate checklist from that file
4. ✅ **TODO Management** (REQUIRED when creating todos):
   - **If creating todos via `todo_write` tool**: Update `TODO.md` immediately
   - Add new items to appropriate priority section (High/Medium/Low/Future)
   - Include status, priority, overview, requirements, technical details, and notes
   - Update prioritization summary table if counts change
5. ✅ **Keep checklist visible** while working

### Step 4: During Coding
1. ✅ Keep checklist visible
2. ✅ **Write tests alongside code implementation** (REQUIRED):
   - **Unit Tests** (`tests/unit/test_{module}.[ext]`) - Test isolated modules and functions (adapt `[ext]` to your language)
   - **Integration Tests** (`tests/integration/test_{feature}_integration.[ext]`) - Test cross-module workflows
   - **System Tests** (`tests/system/test_{scenario}.[ext]`) - Test end-to-end scenarios
   - **Workflow Tests** (`tests/workflows/test_{workflow_type}.[ext]`) - Test complete workflows
3. ✅ **Run tests immediately after writing** (REQUIRED - AUTOMATIC):
   - Run new/modified test files: `[test_framework] tests/[test_type]/test_[file].[ext] [options]`
     - Examples: `pytest tests/unit/test_module.py -v`, `npm test tests/unit/test_module.test.js`, `go test ./tests/unit/... -v`
   - Verify new tests pass before continuing
   - Fix any failing tests immediately
4. ✅ **Run full test suite periodically**: `[test_framework] tests/ [options]` - Check for regressions (e.g., `pytest tests/ -v`, `npm test`, `go test ./...`)
5. ✅ **Update existing tests** as code changes (all test types)
6. ✅ **Run updated tests** - Verify modified tests still pass
7. ✅ Note any unexpected impacts (new features, API changes, etc.)
8. ✅ Update module docstrings if adding new functionality
9. ✅ Add comments explaining non-obvious logic

### Step 5: After Coding (Before Marking Complete)
1. ✅ **Run Full Test Suite**: Execute `[test_framework] tests/ [options]` - **CRITICAL**: All tests must pass (e.g., `pytest tests/ -v`, `npm test`, `go test ./...`)
   - Verify all new tests pass
   - Verify existing tests still pass (no regressions)
   - Run tests by type if needed (unit/integration/system/workflow)
2. ✅ **Fix any failing tests immediately** - Do not proceed until all tests pass
3. ✅ **Verify Test Coverage**: Ensure new/changed functionality has adequate tests
   - All new code has corresponding tests
   - All modified code has updated tests
   - Edge cases and error conditions are tested
4. ✅ **Update Test Documentation**: Update `tests/INDEX.md` if adding new test files
5. ✅ Update `CHANGELOG.md` - **REQUIRED FOR EVERY CHANGE**
6. ✅ Update other docs per checklist
7. ✅ Update "Last Updated" dates in modified files
8. ✅ Verify version numbers are consistent (check `README.md`, `CHANGELOG.md`)

### Step 6: Verification
1. ✅ **All tests pass** (`[test_framework] tests/ [options]`) - **CRITICAL**: Must pass before marking complete (e.g., `pytest tests/ -v`, `npm test`, `go test ./...`)
   - New tests pass
   - Existing tests still pass (no regressions)
   - All test types run successfully
2. ✅ **Test execution verified**:
   - Tests run automatically during implementation (not just after)
   - Tests are run after each significant change
   - Full test suite run before marking complete
3. ✅ **Test coverage is adequate**
4. ✅ All checklist items completed
5. ✅ Links are valid (no broken references)
6. ✅ Version numbers consistent across files
7. ✅ "Last Updated" dates are current (2025-01-27 or later)

---

## 🔄 Auto-Update Triggers by Change Type

### Feature Addition
[Feature addition checklist - see actual file]

### Bug Fix
[Bug fix checklist - see actual file]

### Test Updates
[Test update checklist - see actual file]

### Refactoring
[Refactoring checklist - see actual file]

---

**Last Updated**: [YYYY-MM-DD]  
**Version**: [X.Y.Z]
```

**Key Sections to Include:**
- Quick start (mandatory steps before any code change)
- Test planning and creation requirements specifying all 4 test types:
  - **Unit Tests** (`tests/unit/`) - Always required for code changes
  - **Integration Tests** (`tests/integration/`) - Required for cross-module features
  - **System Tests** (`tests/system/`) - Required for end-to-end scenarios
  - **Workflow Tests** (`tests/workflows/`) - Required for workflow changes
- Automatic workflow (7 steps: Step 0 Tool Call Awareness, Step 1 Script-First, Step 2 Validation, Steps 3-6 implementation/documentation)
- Auto-update triggers by change type with copy-paste checklists (including test requirements for all applicable test types)
- Feature addition checklist (with all applicable test types)
- Bug fix checklist (with all applicable test types)
- Test update checklist (covering all 4 test types)
- Refactoring checklist (with all applicable test types)
- Documentation update process guidelines
- Verification steps (test verification for all test types, version consistency, dates, links)
- Common mistakes to avoid

**Update Triggers:**
- Documentation maintenance process changes
- New change types added
- Workflow changes

---

### 10a. OPERATIONS.md Template (Recommended)

```markdown
# Operations Guide - [Project Name]

**Purpose**: Complete guide for deploying and operating the [Project Name] in production, including deployment instructions and troubleshooting.

**Last Updated**: [YYYY-MM-DD]  
**Status**: Production Ready  
**Version**: [X.Y.Z]

---

## Table of Contents

- [Deployment](#deployment)
  - [Pre-Deployment Checklist](#pre-deployment-checklist)
  - [Deployment Steps](#deployment-steps)
  - [Monitoring & Maintenance](#monitoring--maintenance)
  - [Performance Monitoring](#performance-monitoring)
  - [Security Considerations](#security-considerations)
  - [Scaling Considerations](#scaling-considerations)
- [Troubleshooting](#troubleshooting)
  - [Common Issues](#common-issues)
  - [Error Messages](#error-messages)
  - [Diagnostics](#diagnostics)

---

## Deployment

### Pre-Deployment Checklist

#### ✅ System Requirements
- **[Requirement 1]**: [Version/Specification]
- **[Requirement 2]**: [Version/Specification]

#### ✅ Dependencies Installed
```bash
[Installation command]
```

#### ✅ Configuration Complete
- [ ] [Configuration item 1]
- [ ] [Configuration item 2]

---

### Deployment Steps

#### Step 1: Environment Setup

**1.1 [Setup Task]**
```bash
[Commands]
```

**1.2 [Setup Task]**
[Description]

#### Step 2: Configuration

**2.1 [Configuration Task]**
[Description and examples]

#### Step 3: Verification

**3.1 [Verification Task]**
[Description]

---

### Monitoring & Maintenance

#### Log Monitoring

**Log Files Location**:
- **Main Log**: `[path]`
- **Error Log**: `[path]`

**Monitor Commands**:
```bash
# [Command examples]
```

#### Health Monitoring

**Health Check Script**:
```bash
[Health check command]
```

---

### Performance Monitoring

#### Key Metrics to Monitor

**System Performance**:
- **Metric 1**: [Target value]
- **Metric 2**: [Target value]

#### Monitoring Tools

**Built-in Monitoring**:
- **[Tool 1]**: [Description]
- **[Tool 2]**: [Description]

---

### Security Considerations

#### [Security Area 1]
- [Consideration 1]
- [Consideration 2]

#### [Security Area 2]
- [Consideration 1]
- [Consideration 2]

---

### Scaling Considerations

#### Horizontal Scaling
- [Consideration 1]
- [Consideration 2]

#### Vertical Scaling
- [Consideration 1]
- [Consideration 2]

---

## Troubleshooting

### Common Issues

#### Issue 1: [Issue Name]

**Symptoms**:
```
[Error message or behavior]
```

**Cause**: [Root cause]

**Solution**:
```bash
# [Solution steps]
```

#### Issue 2: [Issue Name]

[Similar structure]

---

### Common Error Messages

| Error | Cause | Solution |
|-------|-------|----------|
| `[Error]` | [Cause] | [Solution] |
| `[Error]` | [Cause] | [Solution] |

---

## Getting Help

If issue persists after trying solutions:

1. **Collect diagnostics**: [Instructions]
2. **Check logs**: [Instructions]
3. **Report issue**: [Instructions]

---

**Last Updated**: [YYYY-MM-DD]  
**Status**: Production Ready  
**Version**: [X.Y.Z]
```

**Key Sections to Include:**
- Deployment checklist and steps
- Monitoring and maintenance procedures
- Performance monitoring guidelines
- Security considerations
- Scaling considerations
- Comprehensive troubleshooting guide
- Common error messages and solutions

**Update Triggers:**
- Deployment process changes
- New deployment environments
- New common issues identified
- Monitoring tools change
- Security considerations change

**Note**: This file consolidates deployment and troubleshooting (both operational concerns) into one comprehensive operations guide.

---

### 10b. CODEBASE-STRUCTURE.md Template (Deprecated)

**⚠️ DEPRECATED**: This template is deprecated. Codebase structure should be included as a section in `INDEX.md` instead.

**Migration**: Add a "Codebase Structure Overview" section to `INDEX.md` with:
- Directory structure visualization
- Core files table with responsibilities
- Finding code by functionality
- Design principles

**See**: INDEX.md template (section 15) for the recommended structure.

**Old Template** (for reference only - do not use for new projects):

```markdown
# Codebase Structure

**Purpose**: Quick navigation guide for the [Project Name] codebase.

**Last Updated**: [YYYY-MM-DD]  
**Version**: [X.Y.Z]

---

## 🎯 Overview

The codebase is **[organized around X core files / follows Y structure]**. [Brief description of organization philosophy].

---

## 📁 Root Directory Structure

```
[Project Name]/
│
├── 🎯 CORE FILES ([X] files) - Main application code
│   ├── [file.py]              # [Description]
│   ├── [file.py]              # [Description]
│   └── [file.py]              # [Description]
│
├── 🚀 ENTRY POINT
│   └── [entry_file.py]        # [Description]
│
├── 📂 SUPPORTING DIRECTORIES
│   ├── [directory]/           # [Description]
│   └── [directory]/           # [Description]
│
└── 🗑️ DEPRECATED / ARCHIVE
    └── [directory]/           # [Description]
```

---

## 🎯 Core Files (Root Directory)

These [X] files contain [description]:

| File | Responsibility | Key Components |
|------|---------------|----------------|
| **[file.py]** | [Responsibility] | [Component 1], [Component 2] |
| **[file.py]** | [Responsibility] | [Component 1], [Component 2] |

**Start here**: All core functionality is in these files. Each file has comprehensive module-level documentation.

---

## 🚀 Quick Start

### [Starting the Application]

```bash
# [Command]
```

### Understanding the Codebase

1. **Read** `README.md` - Project overview
2. **Read** `CONTEXT.md` - Architecture philosophy
3. **Read** `AGENTS.md` - Development patterns
4. **Browse** Core files - Each has comprehensive docstrings

---

## 📂 Directory Details

### `[directory]/` - [Purpose]

[Description of directory]:
- **[file.py]** - [Description]
- **[file.py]** - [Description]

---

## 📊 Codebase Statistics

- **Core Files**: [X] files - Root directory
- **Entry Points**: [X] file(s)
- **Utility Scripts**: [X] file(s)
- **Test Files**: [X] files - `tests/` directory
- **Documentation**: [X] markdown files
- **Configuration Files**: [X]+ files

---

## 🎯 Design Principles

1. **[Principle 1]**: [Description]
2. **[Principle 2]**: [Description]
3. **[Principle 3]**: [Description]

---

## 📚 Related Documentation

- **README.md** - Project overview and getting started
- **CONTEXT.md** - Architecture decisions and philosophy
- **AGENTS.md** - Developer guide with patterns
- **docs/ARCHITECTURE.md** - Detailed system architecture

---

**Last Updated**: [YYYY-MM-DD]  
**Maintained By**: [Team/Individual]
```

**Key Sections to Include:**
- Overview of codebase organization
- Visual directory tree structure
- Core files table (responsibility and components)
- Quick start (how to navigate)
- Directory details (purpose of each directory)
- Codebase statistics (file counts, metrics)
- Design principles (organization philosophy)
- Related documentation links

**Update Triggers:**
- Codebase structure changes
- New directories added
- File organization changes
- Core files added/removed

**When to include:**
- Projects with multiple core files (>5)
- Complex directory structures
- Multiple entry points or utilities
- Teams needing quick codebase navigation

---

### 10b. INDEX.md Template (⚠️ MANDATORY)

```markdown
# Project Index - [Project Name]

**Purpose**: Complete navigation index mapping all files and directories in the project.

**⚠️ MANDATORY**: This file is REQUIRED for all projects.

**Why INDEX.md is valuable:**
- Quick file discovery without reading multiple docs
- Visual file mapping with purposes and locations
- Cross-references between directories
- Statistics and metrics at a glance
- Essential navigation tool for developers

**Last Updated**: [YYYY-MM-DD]  
**Version**: [X.Y.Z]

---

## 🎯 Quick Navigation

- **[Core Files](#core-files)** - Main application code
- **[Entry Point](#entry-point)** - How to start the application
- **[Configuration](#configuration)** - Config files and settings
- **[Data Files](#data-files)** - Data persistence and storage (if applicable)
- **[Documentation](#documentation)** - All documentation files
- **[Tests](#tests)** - Test suite organization (if applicable)
- **[Utilities](#utilities)** - Helper scripts and tools
- **[Directories](#directories)** - Subdirectories and their purposes

---

## 🎯 Core Files

**Location**: Root directory  
**Purpose**: [Description of core files]

| File | Purpose | Lines | Key Components |
|------|---------|-------|----------------|
| **[file.py]** | [Purpose] | [X] | [Component 1], [Component 2] |

---

## 🚀 Entry Point

| File | Purpose | Usage |
|------|---------|-------|
| **[entry.py]** | [Description] | `[command]` |

---

## 🛠️ Utilities

| File | Purpose |
|------|---------|
| **[utility.py]** | [Description] |

**See**: `utils/INDEX.md` for details (when utils/ has 5+ files)

---

## 📚 Documentation

### Root-Level Documentation

| File | Purpose | Audience |
|------|---------|----------|
| **README.md** | Project overview & quick start | Everyone |
| **[Other docs]** | [Descriptions] | [Audience] |

**See**: `docs/INDEX.md` for technical documentation (when docs/ has 5+ files)

---

## 📦 Configuration

**Location**: `config/` directory (or equivalent)

| File | Purpose |
|------|---------|
| **[config_file]** | [Description] |

**See**: `config/INDEX.md` for details (when config/ has 5+ files)

---

## 💾 Data Files

**Location**: `data/` directory (if applicable)

| File | Purpose |
|------|---------|
| **[data_file]** | [Description] |

**See**: `data/INDEX.md` for details (when data/ has 5+ files)

---

## 📖 Documentation Files

**Location**: `docs/` directory (if applicable)

| File | Purpose |
|------|---------|
| **[doc_file]** | [Description] |

**See**: `docs/INDEX.md` for complete mapping (when docs/ has 5+ files)

---

## 🧪 Tests

**Location**: `tests/` directory (if applicable)

### Test Organization

Test types and their locations:
- **Unit Tests**: `tests/unit/` - Test isolated modules and functions
- **Integration Tests**: `tests/integration/` - Test cross-module workflows
- **System Tests**: `tests/system/` - Test end-to-end scenarios
- **Workflow Tests**: `tests/workflows/` - Test complete workflows

| Directory | Purpose | Test Files |
|-----------|---------|------------|
| **tests/unit/** | Isolated module/function tests | [Count] files |
| **tests/integration/** | Cross-module workflow tests | [Count] files |
| **tests/system/** | End-to-end scenario tests | [Count] files |
| **tests/workflows/** | Complete workflow simulation tests | [Count] files |

**See**: `tests/INDEX.md` for complete mapping (when tests/ has 5+ files)
**See**: `tests/TEST_ORGANIZATION.md` for test organization guide (recommended for complex test suites)

---

## 📂 Directories

### Active Directories

| Directory | Purpose | Key Files |
|-----------|---------|-----------|
| **[dir/]** | [Purpose] | [Key files] |

### Archive/Deprecated Directories

| Directory | Purpose |
|-----------|---------|
| **[archive/]** | [Description] |

---

## 📊 Project Statistics

- **Core Files**: [X] files ([Y] lines)
- **Root Documentation**: [X] files
- **Technical Documentation**: [X] files in `docs/`
- **Test Files**: [X] files ([Y] tests)
- **Configuration Files**: [X]+ files

---

## 🗺️ Navigation Quick Links

### By Purpose

- **Understanding the code**: [Link] → Core files → Module docstrings
- **Understanding architecture**: [Link] → [Architecture docs]
- **Finding documentation**: [Link] → [Doc index]
- **Finding tests**: [Link] → [Test index]

### By Directory - Index Files

Each major directory has its own INDEX.md for detailed mapping:

- **Root**: This file (`INDEX.md`) - ⚠️ **MANDATORY** - Complete project overview
- **docs/**: `docs/INDEX.md` - ⚠️ **MANDATORY** when docs/ has 5+ files
- **config/**: `config/INDEX.md` - ⚠️ **MANDATORY** when config/ has 5+ files
- **data/**: `data/INDEX.md` - ⚠️ **MANDATORY** when data/ has 5+ files
- **tests/**: `tests/INDEX.md` - ⚠️ **MANDATORY** when tests/ has 5+ files
- **utils/**: `utils/INDEX.md` - ⚠️ **MANDATORY** when utils/ has 5+ files

---

**Last Updated**: [YYYY-MM-DD]  
**Version**: [X.Y.Z]  
**Maintained By**: [Team/Individual]
```

**Key Sections to Include:**
- ⚠️ **MANDATORY**: This file is required for all projects
- Quick navigation section with anchor links
- Core files mapping with line counts and components
- Entry point documentation
- Directory-by-directory file mapping
- Documentation files index with cross-references
- Configuration files index with cross-references (when applicable)
- Data files index with cross-references (when applicable)
- Test files index with cross-references (when applicable)
- Utilities index with cross-references
- Navigation quick links to subdirectory INDEX.md files
- Project statistics
- Clear indication of when subdirectory INDEX.md files are needed (5+ files)

**Subdirectory INDEX.md Pattern (⚠️ MANDATORY when directory has 5+ files):**

```markdown
# [Directory Name] Directory Index

**Purpose**: Complete mapping of all files in the `[directory]/` directory.

**⚠️ MANDATORY**: Create this file when the directory has 5+ files or complex organization.

**Last Updated**: [YYYY-MM-DD]  
**Version**: [X.Y.Z]

---

## 📁 Files Overview

| File | Purpose | Format | Updates | Lines |
|------|---------|--------|---------|-------|
| **[file]** | [Description] | [Format] | [Auto/Manual] | [X] |

---

## 📊 File Categories

### [Category 1]

- **[file]** - [Description]
- **[file]** - [Description]

### [Category 2]

- **[file]** - [Description]
- **[file]** - [Description]

---

## 🔄 Update Triggers

| File | Update When |
|------|------------|
| **[file]** | [Trigger] |
| **[file]** | [Trigger] |

---

## 📚 Related Documentation

- **[Root INDEX.md](../INDEX.md)** - Complete project overview
- **[Related doc]** - [Description]

---

## 📊 Directory Statistics

- **Total Files**: [X] files
- **Categories**: [X] categories
- **Total Lines**: [Y] lines (if applicable)

---

**Last Updated**: [YYYY-MM-DD]  
**Version**: [X.Y.Z]  
**Maintained By**: [Team/Individual]
```

**When to Create Subdirectory INDEX.md:**
- ✅ **MANDATORY**: When directory has 5+ files
- ✅ **MANDATORY**: When directory has multiple file types
- ✅ **MANDATORY**: When directory has complex organization
- ✅ **MANDATORY**: When quick reference is needed

**Common Subdirectory INDEX.md Files:**
- `docs/INDEX.md` - Documentation directory index
- `config/INDEX.md` - Configuration files index
- `data/INDEX.md` - Data files index
- `tests/INDEX.md` - Test files index
- `utils/INDEX.md` - Utility scripts index

**Update Triggers:**
- New files added to directory
- Directory structure changes
- File purposes change
- File locations change
- Statistics change

**Why Subdirectory INDEX.md is valuable:**
- Quick file discovery within directory
- Clear file purposes and organization
- Update trigger documentation
- Cross-references to related directories
- Statistics and metrics

---

### 10. DOCUMENTATION-OVERVIEW.md Template

```markdown
# Root-Level Documentation Overview

**Purpose**: High-level overview of what each root-level `.md` file covers

**Note**: This documentation structure follows standard documentation templates and guidelines.

**Last Updated**: [YYYY-MM-DD]

---

## 📚 Core Documentation Files (15 files)

### 1. **README.md** - Project Overview & User Guide
**What it covers**:
- Project purpose and tagline
- Complete feature list
- Installation and quick start guide
- Feature descriptions and usage
- Platform support status
- Project statistics
- Links to all other documentation

**Who should read**: Everyone - New users, developers, stakeholders

**Update triggers**: User-facing features, version changes, statistics changes

---

### 3. **AGENTS.md** - Developer Guide
**What it covers**:
- Developer implementation patterns and conventions
- Code structure and organization
- Testing requirements and patterns
- Documentation maintenance workflow
- Prompt validation system integration
- Script-first approach philosophy
- Coding and test best practices

**Who should read**: Developers working on the codebase

**Update triggers**: Architecture/pattern changes, new conventions, workflow changes

---

### 4. **docs/PROMPT-VALIDATION.md** - Prompt Validation System
**What it covers**:
- ⚠️ **MANDATORY**: Complete 5-phase validation system
- Phase 1: Task Understanding (what, why, scope, constraints)
- Phase 2: Codebase Understanding (architecture, modules, patterns)
- Phase 3: Requirements Understanding (functional, non-functional, quality)
- Phase 4: Process Understanding (execution plan, testing, documentation)
- Phase 5: Autonomous Operation (information completeness, error handling, **tool call limit assessment**)
  - **Tool Call Limit Assessment** (REQUIRED): Planned tool calls, batching strategy, tool efficiency, redundancy avoidance, information caching
  - Reference: `docs/TOOL-CALL-LIMITS.md` for complete optimization guidelines
- Confidence level requirements (≥ 7/10 required to proceed)
- Validation gates that must all pass (including tool call optimization in Gate 5)
- Task-specific checklists (feature, bug fix, refactor, documentation)
- Autonomous operation strategies and error resolution guidance
- Self-assessment questions and validation metrics

**Quick Reference**: `docs/PROMPT-VALIDATION-QUICK.md` - 5-minute rapid validation checklist

**Who should read**: **All developers** - Must complete before any operation

**Update triggers**: Validation process changes, new validation requirements, workflow changes

---

### 5. **docs/PROMPT-VALIDATION-QUICK.md** - Quick Validation Checklist
**What it covers**:
- 5-minute rapid validation checklist
- Quick validation for all 5 phases (Task, Codebase, Requirements, Process, Autonomy)
- Go/No-Go decision criteria
- Quick reference to full validation system

**Who should read**: **All developers** - Quick option for rapid validation

**Update triggers**: Validation process changes

---

### 6. **docs/DOCUMENTATION-MAINTENANCE.md** - Automatic Documentation Maintenance Guide
**What it covers**:
- ⚠️ **MANDATORY**: Automatic documentation maintenance system
- 7-step workflow (Step 0: Tool Call Awareness, Step 1: Script-First, Step 2: Validation, Steps 3-6: Implementation/Documentation)
- Auto-update triggers for all change types (feature, bug, test, refactor, etc.)
- Copy-paste checklists for each change category
- Verification steps (version consistency, dates, links)
- Common mistakes to avoid
- Documentation update process guidelines

**Who should read**: **All developers** - Must read before any code changes

**Update triggers**: Documentation maintenance process changes, new change types

---

### 7. **CLAUDE.md** - Quick Reference for Developers
**What it covers**:
- Quick command reference
- Common patterns and workflows
- File locations and key components
- Testing commands and structure
- Import patterns
- Development shortcuts

**Who should read**: Developers needing quick reference

**Update triggers**: Commands change, file structure changes, new workflows, new features

---

### 8. **DOCUMENTATION.md** - Documentation Navigation Guide
**What it covers**:
- Complete list of all documentation files
- Documentation structure overview
- Navigation by purpose (why/how/what/getting started)
- Audience-specific guides
- Documentation maintenance system

**Who should read**: Anyone looking for specific documentation or understanding documentation structure

**Update triggers**: Documentation structure changes, new documentation files added

---

### 11. **WORKFLOW.md** - User Workflows & Validation Guide
**What it covers**:
- Expected user workflows and navigation paths
- Feature interactions and step-by-step instructions
- Validation checkpoints for QA testing
- UI/UX workflows

**Who should read**: QA testers and users

**Update triggers**: UI/workflow changes, user interaction changes

**Note**: Different from `docs/WORKFLOW.md` (technical system workflows)

---

### 12. **CHANGELOG.md** - Version History
**What it covers**:
- Complete version history with dates
- All notable changes organized by version
- Change types (Added, Changed, Fixed, Removed, Security)
- Breaking changes and migration guides

**Who should read**: Everyone

**Update triggers**: ⚠️ **EVERY CHANGE** - REQUIRED for every code change (no exceptions)

---

### 13. **EVALS.md** - Evaluation & Testing Guide
**What it covers**:
- Evaluation criteria and quality standards
- Test scenarios and validation checkpoints
- Quality assurance guidelines
- Testing workflows

**Who should read**: QA testers and developers

**Update triggers**: Test requirements change, evaluation criteria change

---

### 14. **TODO.md** - Pending Features & Improvements
**What it covers**:
- All pending features, fixes, and improvements
- Prioritized by importance (High/Medium/Low/Future)
- Status tracking (pending, in progress, completed)
- Requirements and technical details for each item

**Who should read**: Project managers, developers

**Update triggers**: ⚠️ **REQUIRED** when creating todos via `todo_write` tool, or when completing items

---

### 15. **INDEX.md** - Project-Wide Navigation Index
**What it covers**:
- ⚠️ **MANDATORY**: Complete project-wide index mapping all files and directories
- Core files mapping with purposes, line counts, and components
- Directory-by-directory file mapping
- Cross-references to subdirectory INDEX.md files
- Project statistics and metrics
- Quick navigation with anchor links
- **Codebase Structure Overview section** (directory structure, core files, organization principles)

**Who should read**: Everyone - Essential navigation tool for developers

**Update triggers**: File structure changes, new files added, directory organization changes

**Subdirectory INDEX.md**: ⚠️ **MANDATORY** when directory has 5+ files:
- `docs/INDEX.md` - Documentation directory index
- `config/INDEX.md` - Configuration files index
- `data/INDEX.md` - Data files index
- `tests/INDEX.md` - Test files index
- `utils/INDEX.md` - Utility scripts index

---

**Last Updated**: [YYYY-MM-DD]
```

**Key Sections to Include:**
- Overview of each documentation file with:
  - What it covers
  - Who should read it
  - Update triggers
- Quick reference by purpose
- Quick reference by audience
- Summary table with file metrics (all 15 files)

**Update Triggers:**
- Documentation structure changes
- File purposes change
- New documentation files added

---

## 🎯 Documentation Principles

### 1. **🚨 PRIORITY #1: Automatic Documentation Updates (MANDATORY)**
**This is the highest priority principle for AI agents.**

- **Documentation updates are AUTOMATIC and MANDATORY** - not optional
- **Code changes are INCOMPLETE without documentation updates**
- **Documentation updates happen DURING implementation** - not after
- **Use automatic checklists** from `docs/DOCUMENTATION-MAINTENANCE.md` for every change
- **CHANGELOG.md MUST be updated** for every single change (no exceptions)
- **AI agents MUST update documentation** automatically - no manual reminders needed
- **Never mark work complete** until documentation is updated
- **This workflow is integrated into every code change** - it's not separate

**This principle overrides all others - if you're working on code, you're updating documentation.**

### 2. **Consistency**
- Use consistent formatting across all files
- Standardize headers, sections, and structure
- Use consistent terminology

### 3. **Accessibility**
- Write for multiple audiences (developers, testers, PMs, users)
- Provide clear entry points for different roles
- Use clear navigation and cross-references

### 4. **Completeness**
- Document "why" not just "what"
- Include examples and patterns
- Provide checklists and templates

### 5. **Maintainability (Automatic for AI Agents)**
- Include automatic update triggers for each file
- Provide automatic maintenance guides with checklists
- Make documentation updates part of the implementation workflow
- **AI agents automatically update docs** - no manual reminders needed

### 6. **Hierarchy**
- Start broad (README, CONTEXT)
- Get specific (AGENTS, WORKFLOW)
- Provide quick references (CLAUDE)

---

## 📋 Maintenance Checklist (AUTOMATIC FOR AI AGENTS)

**🤖 FOR AI AGENTS**: This checklist should be run AUTOMATICALLY after every code change.

---

## 📚 Additional Resources

### Optional Recommended Documentation

**For larger projects or projects with complex codebases:**

#### INDEX.md - Codebase Structure Section (⚠️ RECOMMENDED)

**Purpose**: Include codebase structure overview as a section in root `INDEX.md`.

**When to add**: Useful for projects with:
- Multiple core files or modules
- Complex directory structures
- Multiple entry points
- Supporting utilities and tools

**Key sections to include in INDEX.md**:
- **Codebase Structure Overview** section:
  - Overview of codebase organization (core files, directories)
  - Root directory structure (visual tree)
  - Core files table (responsibilities, key components)
  - Directory details (purpose of each directory)
  - Finding code by functionality
  - Design principles (organization philosophy)

**Update triggers**: Codebase structure changes, new directories added, file organization changes

**Note**: 
- This section is part of `INDEX.md` (root) - no separate CODEBASE-STRUCTURE.md needed
- Consolidates navigation and structure overview in one place
- Complements `DOCUMENTATION.md` (navigation for documentation files) and `AGENTS.md` (development patterns)

**Example Structure in INDEX.md**:
```markdown
# Project Index

[File and directory mapping sections]

## 📁 Codebase Structure Overview

[Directory structure, core files, organization principles]
```

---

#### INDEX.md Files (⚠️ MANDATORY)

**Purpose**: Complete navigation index mapping all files and directories in the project.

**⚠️ MANDATORY**: INDEX.md is REQUIRED for projects when:
- **Root INDEX.md**: Project has 20+ files, OR complex directory structure (5+ directories), OR 3+ subdirectories with 5+ files each
- **Subdirectory INDEX.md**: Directory has 5+ files

**Why INDEX.md is valuable:**
- Quick file discovery without reading multiple docs
- Visual file mapping with purposes and locations
- Cross-references between directories
- Statistics and metrics at a glance
- Essential navigation tool for developers

**Root INDEX.md**: ⚠️ **MANDATORY** when project has:
- 20+ files, OR
- Complex directory structure (5+ directories), OR
- 3+ subdirectories with 5+ files each

Create `INDEX.md` in root directory for project-wide mapping when criteria are met.

**Subdirectory INDEX.md**: ⚠️ **MANDATORY** when directory has 5+ files:
- `docs/INDEX.md` - Documentation directory index
- `config/INDEX.md` - Configuration files index
- `data/INDEX.md` - Data files index
- `tests/INDEX.md` - Test files index
- `utils/INDEX.md` - Utility scripts index

**Key sections to include**:
- Quick navigation section
- Core files mapping (with line counts, components)
- Entry point documentation
- Directory-by-directory file mapping
- Documentation files index
- Configuration files index
- Data files index (if applicable)
- Test files index
- Navigation quick links
- Project statistics
- **Codebase Structure Overview section** (recommended)

**Structure**: Create INDEX.md in:
- Root directory (project-wide index)
- Each major subdirectory (config/, data/, docs/, tests/, utils/, etc.)

**Subdirectory INDEX.md files should include**:
- Files in that directory (with purposes)
- File categories
- Update triggers
- Related documentation links
- Statistics specific to that directory

**Update triggers**: New files added, directory structure changes, file purposes change

**Note**: INDEX.md includes:
- Codebase structure overview (as a section)
- Complete file and directory mapping
- Navigation quick links

**INDEX.md complements**:
- `DOCUMENTATION.md` (documentation navigation)
- Directory README.md files (directory-specific docs)

---

### Documentation Maintenance Guide (REQUIRED)

**Create a `docs/DOCUMENTATION-MAINTENANCE.md` file with:**

#### For AI Agents (Automatic System)
- **Automatic workflow (Steps -1 through 3)**: Before/During/After coding process
- **Auto-update triggers**: For all change types (feature, bug, test, refactor, etc.)
- **Copy-paste checklists**: For each change category with REQUIRED items
- **Verification steps**: Version consistency, dates, links, content completeness
- **Common mistakes to avoid**: Prevent documentation gaps

### Built-In Reminders

**These files contain automatic reminders:**
- `AGENTS.md` - Top of file has mandatory documentation section
- `CHANGELOG.md` - Header warns about automatic updates
- `docs/DOCUMENTATION-MAINTENANCE.md` - Complete automatic workflow guide
- `.cursorrules` - Cursor-specific automatic documentation rules

---

### 9. **DOCUMENTATION-OVERVIEW.md** - Overview of All Documentation Files
**What it covers**:
- Overview of each documentation file with:
  - What it covers
  - Who should read it
  - Update triggers
- Quick reference by purpose (why/how/what/navigation)
- Quick reference by audience (developers, QA, PMs)
- Summary table with file metrics (all 15 files including INDEX.md)

**Who should read**: Anyone wanting to understand the documentation structure at a glance

**Update triggers**: Documentation structure changes, file purposes change, new documentation files added

---

## 📊 Quick Reference by Purpose

### Understanding "Why" (Philosophy & Decisions)
- **CONTEXT.md** - Project philosophy, architecture decisions, design rationale

### Understanding "How" (Implementation)
- **AGENTS.md** - Detailed implementation patterns, code structure, conventions
- **docs/PROMPT-VALIDATION.md** - ⚠️ **MANDATORY**: Validation system before any operation
- **CLAUDE.md** - Quick commands and patterns for development

### Understanding "What" (Features & Status)
- **README.md** - Complete feature list and overview
- **WORKFLOW.md** - How users interact with features
- **CHANGELOG.md** - What changed in each version
- **EVALS.md** - What's tested and how to verify
- **TODO.md** - What's not yet implemented

### Navigation & Reference
- **INDEX.md** - ⚠️ **MANDATORY** (when project has 20+ files or complex structure): Project-wide navigation index mapping all files
- **DOCUMENTATION.md** - Central guide to all documentation
- **DOCUMENTATION-BLUEPRINT.md** - Documentation templates & guidelines (reference file, optional)
- **DOCUMENTATION-OVERVIEW.md** - Overview of all documentation files

---

## 📋 Quick Reference by Audience

### New Developers
1. Read **CONTEXT.md** (understand philosophy)
2. Read **README.md** (understand features)
3. Read **AGENTS.md** (learn implementation patterns)
4. Reference **CLAUDE.md** (quick commands)

### QA Testers
1. Read **WORKFLOW.md** (user workflows)
2. Read **EVALS.md** (evaluation criteria and test scenarios)

### Project Managers
1. Read **README.md** (feature overview)
2. Read **TODO.md** (pending items and remaining work)
3. Reference **CHANGELOG.md** (version history)

### Developers
1. ⚠️ **MANDATORY**: Complete **docs/PROMPT-VALIDATION.md** before any operation
   - All validation gates must pass
   - All confidence levels must be ≥ 7/10
   - Quick option: **docs/PROMPT-VALIDATION-QUICK.md** for rapid 5-minute validation
2. Read **CLAUDE.md** (quick reference)
3. Reference **AGENTS.md** (implementation patterns)
4. Check **CONTEXT.md** (project philosophy)

---

## 📝 Summary Table

| File | Primary Purpose | Key Audience | Length | Update Frequency |
|------|----------------|--------------|--------|------------------|
| **README.md** | Project overview & features | Everyone | ~[X] lines | User-facing changes, versions |
| **CONTEXT.md** | Philosophy & architecture | Developers, PMs | ~[X] lines | Architecture changes |
| **AGENTS.md** | Developer guide | Developers | ~[X] lines | Architecture/pattern changes |
| **docs/PROMPT-VALIDATION.md** | ⚠️ Validation system | Developers (mandatory) | ~[X] lines | Validation process changes |
| **docs/PROMPT-VALIDATION-QUICK.md** | Quick validation checklist | Developers (mandatory) | ~[X] lines | Validation process changes |
| **docs/DOCUMENTATION-MAINTENANCE.md** | ⚠️ Documentation maintenance guide | Developers (mandatory) | ~[X] lines | Maintenance process changes |
| **CLAUDE.md** | Quick reference | Developers | ~[X] lines | Commands/patterns change |
| **DOCUMENTATION.md** | Documentation navigation | Everyone | ~[X] lines | Doc structure changes |
| **DOCUMENTATION-BLUEPRINT.md** | Documentation templates | Documentation maintainers | ~[X] lines | Template changes |
| **DOCUMENTATION-OVERVIEW.md** | Overview of all docs | Documentation users | ~[X] lines | Doc structure changes |
| **WORKFLOW.md** | User workflows & validation | QA testers, users | ~[X] lines | UI/workflow changes |
| **CHANGELOG.md** | Version history | Everyone | ~[X] lines | Every change (required) |
| **EVALS.md** | Evaluation & testing guide | QA testers | ~[X] lines | Test requirements change |
| **TODO.md** | Pending features & improvements | PMs, developers | ~[X] lines | Items completed/added |
| **INDEX.md** | Project-wide navigation index | Everyone | ~[X] lines | File structure changes |

---

**Last Updated**: [YYYY-MM-DD]
```

**Key Sections to Include:**
- Overview of each documentation file with:
  - What it covers
  - Who should read it
  - Update triggers
- Quick reference by purpose
- Quick reference by audience
- Summary table with file metrics

**Update Triggers:**
- Documentation structure changes
- File purposes change
- New documentation files added

---

## 🎯 Documentation Principles

### 1. **🚨 PRIORITY #1: Automatic Documentation Updates (MANDATORY)**
**This is the highest priority principle for AI agents.**

- **Documentation updates are AUTOMATIC and MANDATORY** - not optional
- **Code changes are INCOMPLETE without documentation updates**
- **Documentation updates happen DURING implementation** - not after
- **Use automatic checklists** from `docs/DOCUMENTATION-MAINTENANCE.md` for every change
- **CHANGELOG.md MUST be updated** for every single change (no exceptions)
- **AI agents MUST update documentation** automatically - no manual reminders needed
- **Never mark work complete** until documentation is updated
- **This workflow is integrated into every code change** - it's not separate

**This principle overrides all others - if you're working on code, you're updating documentation.**

### 2. **Consistency**
- Use consistent formatting across all files
- Standardize headers, sections, and structure
- Use consistent terminology

### 3. **Accessibility**
- Write for multiple audiences (developers, testers, PMs, users)
- Provide clear entry points for different roles
- Use clear navigation and cross-references

### 4. **Completeness**
- Document "why" not just "what"
- Include examples and patterns
- Provide checklists and templates

### 5. **Maintainability (Automatic for AI Agents)**
- Include automatic update triggers for each file
- Provide automatic maintenance guides with checklists
- Make documentation updates part of the implementation workflow
- **AI agents automatically update docs** - no manual reminders needed

### 6. **Hierarchy**
- Start broad (README, CONTEXT)
- Get specific (AGENTS, WORKFLOW)
- Provide quick references (CLAUDE)

---

## 📋 Maintenance Checklist (AUTOMATIC FOR AI AGENTS)

**🤖 FOR AI AGENTS**: This checklist should be run AUTOMATICALLY after every code change.

### Pre-Completion Verification

When creating/updating documentation, automatically verify:

**Status Headers:**
- [ ] **"Last Updated" date**: Updated to today's date (YYYY-MM-DD format)
- [ ] **Project status**: Matches current state across all files
- [ ] **Version numbers**: Consistent format (e.g., v1.0.0) across all files

**Cross-References:**
- [ ] **Internal links**: All links between files work correctly
- [ ] **File paths**: All referenced file paths are correct
- [ ] **Code examples**: Code examples in docs still work

**Content Quality:**
- [ ] **Completeness**: All sections are filled out (no empty sections)
- [ ] **Accuracy**: Information matches current codebase state
- [ ] **Formatting**: Consistent markdown formatting
- [ ] **Statistics**: File counts, test counts, etc. are accurate

**Documentation Updates (Based on Change Type):**
- [ ] **CHANGELOG.md**: Updated (REQUIRED for every change)
- [ ] **README.md**: Updated if user-facing change
- [ ] **AGENTS.md**: Updated if architecture/patterns change
- [ ] **WORKFLOW.md**: Updated if UI/workflows change
- [ ] **EVALS.md**: Updated if tests change
- [ ] **TODO.md**: **REQUIRED** - Updated when creating todos (add new items), removed when completing items

**Only mark work as complete after ALL checks pass.**

---

## 🔄 Automatic Documentation Update Workflow (For AI Agents)

**⚠️ This workflow is AUTOMATIC and MANDATORY for all code changes**

### Step 0: TOOL CALL LIMIT AWARENESS (REQUIRED FIRST STEP)
1. ✅ **Assess and optimize tool usage** before ANY operation
   - Plan all tool calls needed (files to read, searches to perform)
   - Batch operations when possible (multiple `read_file` calls in parallel)
   - Choose efficient tools (`grep` vs `codebase_search`, `glob_file_search` vs `list_dir`)
   - Cache information - avoid re-reading files or re-searching patterns
   - See `docs/TOOL-CALL-LIMITS.md` for complete guidelines

### Step 1: SCRIPT-FIRST EVALUATION (REQUIRED SECOND STEP)
1. ✅ **Evaluate if task should be automated** (script vs manual)
2. ✅ **If repetitive/complex, create script** in `utils/` directory
   - Include error handling, logging, and documentation
   - See **AGENTS.md** for script-first philosophy
3. ✅ **Decision documented** (why script or why manual)

### Step 2: PROMPT VALIDATION (REQUIRED THIRD STEP)
1. ✅ **Complete prompt validation** (`docs/PROMPT-VALIDATION.md` or `docs/PROMPT-VALIDATION-QUICK.md`)
2. ✅ **Include tool call limit assessment** in Phase 5 (Autonomous Operation)
3. ✅ **Include script-first evaluation** in process understanding phase
4. ✅ **All validation gates passed** (Task, Codebase, Requirements, Process, Autonomy)
5. ✅ **All confidence levels ≥ 7/10**
6. ✅ **Self-assessment questions answered**

**Only proceed to Step 3 when ALL validation gates are passed.**

### Step 3: BEFORE YOU START CODING
1. ✅ **Read** `docs/DOCUMENTATION-MAINTENANCE.md` FIRST
2. ✅ **Identify** change type (feature/bug/test/refactor/architecture)
3. ✅ **Copy** the appropriate checklist from that file
4. ✅ **TODO Management** (REQUIRED when creating todos):
   - **If creating todos via `todo_write` tool**: Update `TODO.md` immediately
   - Add new items to appropriate priority section (High/Medium/Low/Future)
   - Include status, priority, overview, requirements, technical details, and notes
   - Update prioritization summary table if counts change
5. ✅ **Keep checklist visible** while working

### Step 4: MAKE CODE CHANGES
1. ✅ Implement feature/bug fix/test/refactor
2. ✅ **Write tests alongside code** (REQUIRED - all applicable test types):
   - **Unit Tests** (`tests/unit/`) - Always required
   - **Integration Tests** (`tests/integration/`) - If cross-module features
   - **System Tests** (`tests/system/`) - If end-to-end scenarios
   - **Workflow Tests** (`tests/workflows/`) - If workflow changes
   - **Feature Tests** (`tests/features/` or equivalent) - Optional: If project has comprehensive feature tracking (e.g., FEATURES.md), validate features work as specified
   - **🚨 CRITICAL: Avoid redundant testing** (REQUIRED):
     - Test new/changed functionality only, not already validated code
     - Focus on new code paths, integration points, and error handling
     - Update existing tests when code behavior changes
     - Don't duplicate test coverage for unchanged functionality
     - Review existing test coverage before adding new tests
3. ✅ Fix linter errors
4. ✅ **DO NOT mark complete yet**

### Step 5a: EXECUTE, OPTIMIZE & VERIFY TESTS (🚨 MANDATORY - PRIORITY #1a)
**⚠️ CRITICAL: Test execution, optimization, and verification are AUTOMATIC and must happen DURING implementation.**

**🚨 DO NOT MARK WORK COMPLETE UNTIL ALL TESTS ARE PASSING AND OPTIMIZED**

**Note**: Tests are written alongside code in Step 4. This step focuses on execution, optimization, and verification.

1. ✅ **Run tests immediately after writing** (REQUIRED - AUTOMATIC):
   - Run new/modified test files: `[test_framework] tests/[test_type]/test_[file].[ext] [options]`
     - Examples: `pytest tests/unit/test_module.py -v`, `npm test tests/unit/test_module.test.js`, `go test ./tests/unit/... -v`
   - Verify new tests pass before continuing
   - Fix any failing tests immediately
   - Do not proceed until tests pass

2. ✅ **Run full test suite periodically** (AUTOMATIC):
   - Run: `[test_framework] tests/ [options]` after significant changes (e.g., `pytest tests/ -v`, `npm test`, `go test ./...`)
   - Check for regressions in existing tests
   - Fix any failing tests immediately

3. ✅ **Consolidate and optimize tests** (REQUIRED during implementation):
   - **Use shared fixtures** from your test framework's configuration file (e.g., `tests/conftest.py` for pytest, `tests/setup.js` for Jest, `tests/helpers.go` for Go) - avoid duplicate setup
   - **Consolidate similar tests** using your test framework's parametrization feature (e.g., `@pytest.mark.parametrize` for pytest, `@ParameterizedTest` for JUnit, `it.each` for Jest)
   - **Reuse test utilities** and helper functions
   - **Group related tests** appropriately
   - **Remove duplicate test code** - extract to helpers
   - **Follow test organization** principles from `tests/TEST_ORGANIZATION.md`

4. ✅ **Run full test suite before marking complete** (REQUIRED):
   - Run: `[test_framework] tests/ [options]` - All tests must pass (e.g., `pytest tests/ -v`, `npm test`, `go test ./...`)
   - Verify all new tests pass
   - Verify existing tests still pass (no regressions)
   - Run tests by type if needed:
     - `[test_framework] tests/unit/ [options]` - Unit tests
     - `[test_framework] tests/integration/ [options]` - Integration tests (if applicable)
     - `[test_framework] tests/system/ [options]` - System tests (if applicable)
     - `[test_framework] tests/workflows/ [options]` - Workflow tests (if applicable)

5. ✅ **Final test review** (REQUIRED before marking complete):
   - **Review for redundancy**: Remove tests that duplicate already validated functionality
   - **Verify optimization**: Ensure all tests use shared fixtures and are parametrized where appropriate
   - **Verify coverage**: All new/changed code has tests, no redundant coverage
   - **Check organization**: Tests follow `tests/TEST_ORGANIZATION.md` principles

6. ✅ **Update test documentation** if adding new test files (`tests/INDEX.md`)

### Step 5b: UPDATE DOCUMENTATION (🚨 MANDATORY - PRIORITY #1b)
**⚠️ CRITICAL: Documentation updates are AUTOMATIC and must happen DURING implementation, not after.**

**🚨 DO NOT MARK WORK COMPLETE UNTIL ALL DOCUMENTATION IS UPDATED**

1. ✅ **Update CHANGELOG.md** (ALWAYS first - REQUIRED for every change - NO EXCEPTIONS)
   - **This is not optional - every change requires a CHANGELOG entry**
   - **Update immediately when making the code change, not after**
   - **If you cannot update CHANGELOG.md, DO NOT make the code change**

2. ✅ **Update README.md** (if user-facing change)
   - Required for any feature that affects users
   - Update feature lists, examples, or usage instructions

3. ✅ **Update AGENTS.md** (if architecture/patterns change)
   - Required when changing code patterns, conventions, or architecture
   - Update examples, guidelines, or best practices

4. ✅ **Update WORKFLOW.md** (if UI/workflows change)
   - Required when changing user interactions or workflows
   - Update step-by-step instructions or validation checkpoints

5. ✅ **Update EVALS.md** (if tests change)
   - Required when adding, modifying, or removing tests
   - Update test criteria or evaluation checklists

6. ✅ **Update TODO.md** (REQUIRED when creating todos via `todo_write` tool):
   - **When creating todos**: Immediately add to `TODO.md` in appropriate priority section
   - Include status, priority, overview, requirements, technical details, and notes
   - Update prioritization summary table if counts change
   - **When completing todos**: Remove completed items from `TODO.md`
   - **This is mandatory** - todos in code must be reflected in `TODO.md`

7. ✅ **Update version numbers** (if version changes)
   - Ensure consistency across all files
   - Update README.md, CHANGELOG.md, and any version references

8. ✅ **Update "Last Updated" dates** (in every file modified)
   - Use today's date (YYYY-MM-DD format)
   - Update in ALL modified documentation files

9. ✅ **Check off items** on your checklist as you complete them
   - Verify every item is checked before marking complete
   - Documentation updates are part of the implementation, not separate

**🚨 REMEMBER: If documentation is not updated, the work is INCOMPLETE.**

### Step 6: VERIFY CONSISTENCY (BEFORE COMPLETE)
1. ✅ **Version numbers** match across all files
2. ✅ **"Last Updated" dates** are today's date
3. ✅ **Cross-references** are valid
4. ✅ **No broken links**
5. ✅ **All REQUIRED checklist items** are completed

### Step 7: VERIFY DOCUMENTATION (🚨 BEFORE COMPLETING)
**⚠️ CRITICAL VERIFICATION: Documentation must be complete before marking work done.**

1. ✅ **Verify CHANGELOG.md is updated** (REQUIRED - check first)
   - Every change must have an entry
   - Entry must be accurate and complete

2. ✅ **Verify all required docs are updated** (per checklist)
   - All items on your checklist are checked
   - All relevant documentation reflects the changes

3. ✅ **Verify dates and versions are current**
   - "Last Updated" dates are today's date
   - Version numbers are consistent across files

4. ✅ **Verify links and references work**
   - All internal links are valid
   - All file paths are correct

### Step 8: ONLY THEN MARK AS COMPLETE
**🚨 CRITICAL RULES:**
- **Tests are part of the implementation** - not optional
- **Test execution is part of the implementation** - not optional
- **Documentation updates are part of the implementation** - not separate
- **Code changes without tests = INCOMPLETE work**
- **Code changes without test execution = INCOMPLETE work**
- **Code changes without documentation = INCOMPLETE work**
- **If tests are not created/updated, the work is NOT complete**
- **If tests are not run and passing, the work is NOT complete**
- **If documentation is not updated, the work is NOT complete**
- **Only mark complete after ALL checks pass** (test creation, test execution, AND documentation)
- **Never skip tests, test execution, or documentation updates - they are mandatory**

**This workflow should be automatic - don't wait for user reminders. Test creation, test execution, and documentation updates are as important as code changes.**

---

## 📚 Additional Resources

### Optional Recommended Documentation

**For larger projects or projects with complex codebases:**

#### INDEX.md - Codebase Structure Section (⚠️ RECOMMENDED)

**Purpose**: Include codebase structure overview as a section in root `INDEX.md`.

**When to add**: Useful for projects with:
- Multiple core files or modules
- Complex directory structures
- Multiple entry points
- Supporting utilities and tools

**Key sections to include in INDEX.md**:
- **Codebase Structure Overview** section:
  - Overview of codebase organization (core files, directories)
  - Root directory structure (visual tree)
  - Core files table (responsibilities, key components)
  - Directory details (purpose of each directory)
  - Finding code by functionality
  - Design principles (organization philosophy)

**Update triggers**: Codebase structure changes, new directories added, file organization changes

**Note**: 
- This section is part of `INDEX.md` (root) - no separate CODEBASE-STRUCTURE.md needed
- Consolidates navigation and structure overview in one place
- Complements `DOCUMENTATION.md` (navigation for documentation files) and `AGENTS.md` (development patterns)

**Example Structure in INDEX.md**:
```markdown
# Project Index

[File and directory mapping sections]

## 📁 Codebase Structure Overview

[Directory structure, core files, organization principles]
```

---

#### INDEX.md Files (⚠️ MANDATORY)

**Purpose**: Complete navigation index mapping all files and directories in the project.

**⚠️ MANDATORY**: INDEX.md is REQUIRED for projects when:
- **Root INDEX.md**: Project has 20+ files, OR complex directory structure (5+ directories), OR 3+ subdirectories with 5+ files each
- **Subdirectory INDEX.md**: Directory has 5+ files

**Why INDEX.md is valuable:**
- Quick file discovery without reading multiple docs
- Visual file mapping with purposes and locations
- Cross-references between directories
- Statistics and metrics at a glance
- Essential navigation tool for developers

**Root INDEX.md**: ⚠️ **MANDATORY** when project has:
- 20+ files, OR
- Complex directory structure (5+ directories), OR
- 3+ subdirectories with 5+ files each

Create `INDEX.md` in root directory for project-wide mapping when criteria are met.

**Subdirectory INDEX.md**: ⚠️ **MANDATORY** when directory has 5+ files:
- `docs/INDEX.md` - Documentation directory index
- `config/INDEX.md` - Configuration files index
- `data/INDEX.md` - Data files index
- `tests/INDEX.md` - Test files index
- `utils/INDEX.md` - Utility scripts index

**Key sections to include**:
- Quick navigation section
- Core files mapping (with line counts, components)
- Entry point documentation
- Directory-by-directory file mapping
- Documentation files index
- Configuration files index
- Data files index (if applicable)
- Test files index
- Navigation quick links
- Project statistics

**Structure**: Create INDEX.md in:
- Root directory (project-wide index)
- Each major subdirectory (config/, data/, docs/, tests/, utils/, etc.)

**Subdirectory INDEX.md files should include**:
- Files in that directory (with purposes)
- File categories
- Update triggers
- Related documentation links
- Statistics specific to that directory

**Update triggers**: New files added, directory structure changes, file purposes change

**Note**: INDEX.md includes:
- Codebase structure overview (as a section)
- Complete file and directory mapping
- Navigation quick links

**INDEX.md complements**:
- `DOCUMENTATION.md` (documentation navigation)
- Directory README.md files (directory-specific docs)

---

### Documentation Maintenance Guide (REQUIRED)

**Create a `docs/DOCUMENTATION-MAINTENANCE.md` file with:**

#### For AI Agents (Automatic System)
- **Automatic workflow (Steps 0-4)**: Before/During/After coding process
- **Auto-update triggers**: For all change types (feature, bug, test, refactor, etc.)
- **Copy-paste checklists**: For each change category with REQUIRED items
- **Verification steps**: Version consistency, dates, links, content completeness
- **Common mistakes to avoid**: Prevent documentation gaps

#### Key Sections Required
1. **🤖 FOR AI AGENTS: This is MANDATORY - READ FIRST**
   - Script-First Evaluation (Step 0) - Evaluate automation first
   - Critical rule: Code changes incomplete without documentation
   - Automatic documentation update workflow
   - Step-by-step process (Step 0: Tool Call Awareness, Step 1: Script-First, Step 2: Validation, Steps 3-6: Implementation/Documentation)

2. **🔄 Auto-Update Triggers**
   - Step 0: Tool Call Limit Awareness (MANDATORY FIRST STEP)
   - Step 1: Script-First Evaluation (MANDATORY SECOND STEP)
   - Step 2: Prompt Validation (MANDATORY THIRD STEP)
   - When You Add a Feature
   - When You Fix Bugs
   - When You Update Tests
   - When You Modify Architecture
   - When You Refactor Code
   - When You Change Version
   - Each with copy-paste checklist

3. **🤖 Script-First Approach**
   - Step 0: Evaluate if task should be automated (script vs manual)
   - Create scripts in `utils/` for repetitive/complex tasks
   - See `AGENTS.md` for script-first philosophy

4. **⚠️ Prompt Validation System**
   - Step 2: Complete prompt validation before any operation
   - Include script-first evaluation in process understanding phase
   - All validation gates must pass (Task, Codebase, Requirements, Process, Autonomy)
   - All confidence levels must be ≥ 7/10
   - Quick validation option: `docs/PROMPT-VALIDATION-QUICK.md`

5. **📋 Documentation Update Process (AUTOMATIC WORKFLOW)**
   - Step-by-step process (Step 0: Tool Call Awareness, Step 1: Script-First, Step 2: Validation, Steps 3-6: Implementation/Documentation)
   - Update order (CHANGELOG first, then others)
   - Verification checklist

6. **🤖 Automatic Documentation Reminders**
   - AI agent memory system
   - Trigger points
   - Built-in reminders
   - Automation checklist

7. **🚨 Common Mistakes to Avoid**
   - Most common documentation errors
   - Prevention checklist

### Cursor Rules Integration

**Create a `.cursorrules` file** with:
- Mandatory documentation updates rule
- Automatic workflow trigger
- Reference to `docs/DOCUMENTATION-MAINTENANCE.md`
- Reminder that code changes are incomplete without docs

### Example Files
When adapting these templates to your project:
- Replace all `[placeholder]` values with your project-specific information
- Adapt code examples to your project's language and framework
- Customize directory structures to match your project's organization
- Replace test framework references with your project's testing tools
- Update file extensions to match your project's file types

---

**Last Updated**: 2025-01-27 (AI-First Assumption - All AI Instructions Mandatory)  
**Version**: 4.0.0  
**Based on**: Proven documentation patterns from multiple production projects, enhanced with:
- Prompt validation system (5-phase validation before any operation)
- Script-first approach (automation prioritization)
- Mandatory test creation and execution for core test types (unit/integration/system/workflow)
- Optional: Feature tests for projects with comprehensive feature tracking
- Test execution workflow (run immediately after writing, run full suite periodically, run before complete)
- Code quality standards (no warning suppressions, no skipped tests, all warnings visible)
- Codebase navigation patterns and index file mapping
- Automatic documentation maintenance system
- TODO management integration
- **Universal applicability**: Language and framework agnostic with placeholder-based examples that adapt to any project type

---

## 🤖 Automatic Documentation System

### Key Principle (🚨 PRIORITY #1)

**🚨 CODE CHANGES WITHOUT DOCUMENTATION UPDATES = INCOMPLETE WORK**

**This is the #1 priority for all developers working on code.**

**Documentation updates are:**
- **AUTOMATIC** - they happen automatically during every code change
- **MANDATORY** - they are required, not optional
- **IMMEDIATE** - they happen during implementation, not after
- **COMPREHENSIVE** - they cover all affected documentation files
- **VERIFIED** - they must be verified before marking work complete

**If you cannot update documentation, DO NOT make the code change.**

### Required Components

**Every project using these templates MUST include:**

1. **`AGENTS.md`** (with script-first approach)
   - 🤖 MANDATORY script-first philosophy and evaluation criteria
   - Examples of what to script vs. do manually
   - Script location and naming guidelines

2. **`docs/PROMPT-VALIDATION.md`**
   - Complete 5-phase validation system (⚠️ **MANDATORY**)
   - Script-first evaluation in process understanding phase
   - Validation gates and confidence level requirements
   - Task-specific checklists
   - Autonomous operation strategies

3. **`docs/PROMPT-VALIDATION-QUICK.md`**
   - Quick 5-minute validation checklist
   - Go/No-Go decision criteria

4. **`docs/DOCUMENTATION-MAINTENANCE.md`** (CORE DOCUMENTATION)
   - Automatic workflow (Step 0: Tool Call Awareness, Step 1: Script-First, Step 2: Validation, Steps 3-6: Implementation/Documentation)
   - Test creation requirements specifying all 4 test types:
     - **Unit Tests** (`tests/unit/`) - Always required
     - **Integration Tests** (`tests/integration/`) - For cross-module features
     - **System Tests** (`tests/system/`) - For end-to-end scenarios
     - **Workflow Tests** (`tests/workflows/`) - For workflow changes
   - Auto-update triggers for all change types (including test requirements for all applicable test types)
   - Copy-paste checklists (including test creation checklists for all test types)
   - Verification steps (including test verification)

5. **`.cursorrules`** (optional but recommended)
   - Automatic documentation reminders
   - Script-first approach references
   - Reference to maintenance guide
   - Integration with Cursor AI

5. **Enhanced Templates**
   - `AGENTS.md` template includes mandatory script-first, prompt validation and documentation sections at top
   - `CHANGELOG.md` template includes script-first approach and automatic update warnings
   - `CLAUDE.md` template includes script-first evaluation as mandatory first step
   - `DOCUMENTATION.md` template includes script-first and prompt validation in essential reading
   - All templates include "Last Updated" date fields

### Automatic Triggers

**AI agents should automatically:**
- **🚨 PRIORITY #1: Update documentation** for EVERY code change - this is MANDATORY, not optional
- **🚨 PRIORITY #1a: Create and run tests** for EVERY code change - this is MANDATORY, not optional
  - **Create tests** alongside code implementation (all applicable test types)
  - **Run tests immediately after writing** - Verify new tests pass before continuing
  - **Run full test suite periodically** - Check for regressions (`[test_framework] tests/ [options]`, e.g., `pytest tests/ -v`, `npm test`, `go test ./...`)
  - **Run full test suite before marking complete** - All tests must pass (`[test_framework] tests/ [options]`)
- **🚨 PRIORITY #1b: Maintain code quality** for EVERY code change - this is MANDATORY, not optional
  - **Remove warning suppressions** - No `# type: ignore`, `--disable-warnings`, etc.
  - **Fix skipped tests** - Tests should fail properly instead of silently skipping
  - **Ensure all warnings visible** - No hidden problems or suppressed issues
  - **Fix linter errors immediately** - Code quality is part of implementation
- **⚠️ CRITICAL: Tool Call Limit Awareness (Step 0)** - Assess and optimize tool usage before ANY operation
  - Plan all tool calls needed (files to read, searches to perform)
  - Batch operations when possible (multiple `read_file` calls in parallel)
  - Choose efficient tools (`grep` vs `codebase_search`, `glob_file_search` vs `list_dir`)
  - Cache information - avoid re-reading files or re-searching patterns
  - See `docs/TOOL-CALL-LIMITS.md` for complete guidelines
- **Evaluate script-first (Step 1)** after tool call awareness - create scripts for repetitive/complex tasks
- **Complete prompt validation (Step 2)** before ANY operation - include tool call limit assessment and script-first evaluation
- **Read `docs/DOCUMENTATION-MAINTENANCE.md` FIRST** before any code change - copy appropriate checklist
- **Update CHANGELOG.md DURING implementation** for every change (REQUIRED - no exceptions)
- **Update documentation DURING coding**, not after - it's part of implementation
- **Check and update documentation** automatically when:
  - Creating new files (models, services, providers, features)
  - Modifying existing code (behavior changes)
  - Adding features (automatic feature checklist - update docs during implementation)
  - Fixing bugs (automatic bug fix checklist - update docs during implementation)
  - Updating tests (automatic test checklist - update docs during implementation)
  - Refactoring (automatic refactor checklist - update docs during implementation)
- **Verify all documentation is updated** before marking work complete
- **Never skip documentation updates** - they are as important as code changes

### Integration Points

**Prompt validation and documentation maintenance should be referenced in:**
- ✅ System prompts for AI development tools
- ✅ Development workflows
- ✅ Code review checklists
- ✅ CI/CD pipelines (if available)
- ✅ Project onboarding materials

### Success Criteria

**A project has proper automatic documentation when:**
- ✅ `INDEX.md` exists in root directory when project has 20+ files or complex structure (⚠️ **MANDATORY**)
- ✅ Subdirectory `INDEX.md` files exist when directories have 5+ files (⚠️ **MANDATORY**)
- ✅ `AGENTS.md` has mandatory script-first approach section (automation prioritization)
- ✅ `AGENTS.md` has mandatory test creation and execution section (test-first philosophy)
- ✅ `AGENTS.md` has mandatory coding best practices section (comprehensive 10+ standards)
- ✅ `AGENTS.md` has mandatory test best practices section (comprehensive 10+ practices)
- ✅ `AGENTS.md` has mandatory TODO management section (TODO.md updates when creating todos)
- ✅ `AGENTS.md` has mandatory sections checklist (6 mandatory sections)
- ✅ `docs/PROMPT-VALIDATION.md` exists with complete 5-phase validation system including script-first evaluation
- ✅ `docs/PROMPT-VALIDATION-QUICK.md` exists for rapid validation
- ✅ `docs/DOCUMENTATION-MAINTENANCE.md` exists as CORE DOCUMENTATION with automatic workflow (Step 0: Tool Call Awareness, Step 1: Script-First, Step 2: Validation, Steps 3-6: Implementation/Test Execution/Documentation)
- ✅ `tests/TEST_ORGANIZATION.md` exists for complex test suites (recommended)
- ✅ All root-level `.md` files include "Last Updated" dates
- ✅ `AGENTS.md` has mandatory script-first, prompt validation, test creation/execution, TODO management, coding best practices, test best practices, and documentation sections at top
- ✅ `CHANGELOG.md` includes script-first approach, test creation/execution, TODO management, and automatic update warnings
- ✅ `CLAUDE.md` includes script-first evaluation, test execution, TODO management, and coding/test best practices as mandatory steps
- ✅ `TODO.md` includes mandatory update instructions when creating todos
- ✅ `.cursorrules` references script-first approach, prompt validation, test execution, code quality, TODO management, and documentation maintenance
- ✅ Code quality standards enforced (no warning suppressions, no skipped tests, all warnings visible)
- ✅ Test consolidation and optimization required (shared fixtures, parametrize, avoid redundancy)
- ✅ Developers evaluate script-first, complete prompt validation, create/run tests, maintain code quality, update TODO.md when creating todos, and update documentation automatically without user reminders

**This ensures documentation stays current as the project evolves.**

---

## 🔄 Migration Guide for Existing Projects

**Adopting these templates for an existing project? Follow this step-by-step guide.**

### Phase 1: Assessment (Week 1)

1. **Inventory Current Documentation**
   - List all existing `.md` files
   - Identify what's documented vs. what's missing
   - Note documentation quality and completeness

2. **Identify Gaps**
   - Compare existing docs to the 15 core files
   - Prioritize missing critical files (README, CHANGELOG, AGENTS)
   - Note outdated or incomplete documentation

3. **Plan Migration Strategy**
   - Decide: gradual adoption vs. comprehensive overhaul
   - Set timeline and priorities
   - Assign ownership if working in a team

### Phase 2: Essential Files (Week 2-3)

**Start with these critical files:**

1. **README.md** - Enhance or create
   - Add missing sections from template
   - Update feature list
   - Add proper navigation links

2. **CHANGELOG.md** - Create from git history
   - Review commit history
   - Organize by version
   - Document major changes

3. **docs/DOCUMENTATION-MAINTENANCE.md** - Create new
   - Copy template
   - Customize for your project
   - Set up automatic update workflow

4. **docs/PROMPT-VALIDATION.md** - Create new
   - Copy template
   - Adapt validation criteria
   - Create quick version

### Phase 3: Core Documentation (Week 4-6)

**Add these foundational files:**

1. **CONTEXT.md** - Extract from existing docs or create
   - Document architecture decisions
   - Capture project philosophy
   - Add implementation history

2. **AGENTS.md** - Create developer guide
   - Document current patterns
   - Establish conventions
   - Add coding standards

3. **INDEX.md** - Create if project has 20+ files
   - Map all files and directories
   - Add navigation structure
   - Include codebase overview

### Phase 4: Enhancement (Ongoing)

**Add remaining files as needed:**

- TODO.md - Consolidate existing todos
- WORKFLOW.md - Document user workflows
- EVALS.md - Document testing approach
- CLAUDE.md - Create quick reference
- DOCUMENTATION.md - Navigation guide

### Migration Best Practices

**✅ Do:**
- Start with essential files (README, CHANGELOG)
- Enhance existing docs rather than replacing
- Migrate gradually over weeks/months
- Update docs as you work on related code
- Get team buy-in before major changes

**❌ Don't:**
- Try to create all 15 files at once
- Delete existing documentation without backup
- Create empty placeholder files
- Ignore existing documentation patterns
- Force adoption without team discussion

### Common Migration Scenarios

**"I have a README but it's basic"**
- Enhance existing README.md with template sections
- Add missing parts incrementally
- Don't rewrite everything at once

**"I have no documentation"**
- Start with README.md and CHANGELOG.md
- Create CONTEXT.md to capture decisions
- Build other docs as you work on features

**"I have scattered documentation"**
- Consolidate into standard documentation structure
- Archive old/unused docs to `_archive/`
- Create INDEX.md to map everything

**"I have comprehensive docs but different structure"**
- Map existing docs to standard template files
- Gradually reorganize
- Keep what works, adapt what doesn't

---

## ❓ FAQ & Troubleshooting

### General Questions

**Q: Do I really need all 15 files?**  
A: No. Start with essential files (README, CHANGELOG, CONTEXT, AGENTS). Add others as your project grows. See [Project Size Variations](#-project-size-variations).

**Q: Can I combine files?**  
A: Yes, for small projects. See [Documentation Consolidation Guidelines](#-documentation-consolidation-guidelines) for when to merge vs. separate.

**Q: How do I adapt this for my language/framework?**  
A: See [Language & Framework Adaptation Guide](#-language--framework-adaptation-guide). Replace all `[placeholder]` values and adapt examples.

**Q: What if my project doesn't have tests?**  
A: Skip test-related sections, but consider adding basic testing. These templates emphasize testing, but you can adapt them.

**Q: Can I use this for non-software projects?**  
A: The principles apply, but you'll need to adapt templates significantly. Focus on README, CONTEXT, and documentation organization.

### Common Issues

**Issue: "The templates are too verbose for my small project"**  
**Solution**: Use [Project Size Variations](#-project-size-variations) guidance. Combine files, simplify templates, focus on essentials.

**Issue: "I don't understand where to start"**  
**Solution**: Follow the [Quick Start Guide](#-quick-start-guide) and [File Creation Order](#-file-creation-order). Start with README.md.

**Issue: "My team doesn't want to adopt this"**  
**Solution**: Start small - just README and CHANGELOG. Show value, then gradually expand. Get buy-in before major changes.

**Issue: "I'm migrating an existing project and it's overwhelming"**  
**Solution**: Use the [Migration Guide](#-migration-guide-for-existing-projects). Take it phase by phase, don't rush.

**Issue: "The step numbering is confusing"**  
**Solution**: The standardized workflow is: Step 0 (Tool Call Awareness) → Step 1 (Script-First) → Step 2 (Validation) → Steps 3-6 (Implementation). See workflow sections for details.

**Issue: "I can't find a specific template"**  
**Solution**: Use the [Table of Contents](#-table-of-contents) to navigate. Templates are in the "File Templates" section.

**Issue: "The templates reference files I don't have"**  
**Solution**: Many files are optional or conditional. Check the "Essential vs. Optional Files" in [Quick Start Guide](#-quick-start-guide).

### Getting Help

**Still have questions?**
1. Review the [Quick Start Guide](#-quick-start-guide)
2. Check [Project Type Variations](#-project-type-variations) for your project type
3. Review [FAQ & Troubleshooting](#-faq--troubleshooting) (this section)
4. Adapt templates to your needs - these templates are a guide, not a strict requirement

---

## ✅ Checklist Quick Reference

**All checklists from these templates in one place for quick reference.**

### Pre-Development Checklist

- [ ] Step 0: Tool Call Limit Awareness completed
- [ ] Step 1: Script-First Evaluation completed
- [ ] Step 2: Prompt Validation completed (confidence ≥ 7/10)
- [ ] Step 3: Read `docs/DOCUMENTATION-MAINTENANCE.md`
- [ ] Step 3: Identified change type and copied appropriate checklist
- [ ] Step 3: TODO.md updated (if creating todos)

### During Development Checklist

- [ ] Tests written alongside code (all applicable types)
- [ ] Tests run immediately after writing
- [ ] CHANGELOG.md updated
- [ ] Documentation updates tracked (checklist visible)
- [ ] Code quality standards followed

### Before Completion Checklist

- [ ] All tests pass (full test suite run)
- [ ] Tests consolidated and optimized
- [ ] CHANGELOG.md updated
- [ ] All required documentation updated (per checklist)
- [ ] "Last Updated" dates updated
- [ ] Version numbers consistent
- [ ] Links verified (no broken references)

### Feature Addition Checklist

- [ ] README.md updated (if user-facing)
- [ ] WORKFLOW.md updated (if workflows change)
- [ ] AGENTS.md updated (if patterns change)
- [ ] EVALS.md updated (if tests added)
- [ ] CHANGELOG.md updated (REQUIRED)
- [ ] TODO.md updated (if todos created)

### Bug Fix Checklist

- [ ] CHANGELOG.md updated (REQUIRED)
- [ ] Tests added/updated for bug fix
- [ ] EVALS.md updated (if test scenarios change)
- [ ] Documentation updated if behavior changes

### Documentation Update Checklist

- [ ] "Last Updated" date set to today
- [ ] Version numbers consistent
- [ ] All links verified
- [ ] Content accuracy verified
- [ ] Cross-references updated

---

## 📜 Version History

**This section tracks changes to these templates themselves, not your project.**

### Version 4.0.0 - 2025-01-27
**Major Update: Universal Applicability**

**Added:**
- ✅ Comprehensive Table of Contents
- ✅ Quick Start Guide for first-time users
- ✅ Language & Framework Adaptation Guide with examples
- ✅ Project Type Variations (web apps, CLI, libraries, APIs, mobile, ML)
- ✅ Project Size Variations (small, medium, large)
- ✅ Team Size Considerations (solo, small team, large team)
- ✅ Migration Guide for existing projects
- ✅ FAQ & Troubleshooting section
- ✅ Checklist Quick Reference

**Changed:**
- ✅ Standardized step numbering throughout (Step 0-8)
- ✅ Made all code examples language-agnostic with placeholders
- ✅ Generalized test framework references (`[test_framework]` placeholders)
- ✅ Generalized file extensions (`[ext]` placeholders)
- ✅ Made directory structures configurable (`[core_directory]` placeholders)
- ✅ Removed project-specific references
- ✅ Added multi-language test examples (Python, JavaScript, Go)

**Fixed:**
- ✅ Date inconsistencies (updated to 2025-01-27)
- ✅ Step numbering confusion (standardized sequence)
- ✅ Duplicate sections removed (5 duplicate "Automatic Triggers" and "Success Criteria" sections)
- ✅ Numbering errors in workflow sections
- ✅ Inconsistent step references throughout document

### Version 3.5.0 - Previous
- Initial comprehensive templates with 15 core files
- Prompt validation system
- Script-first approach
- Automatic documentation maintenance
- Test creation and execution requirements

---

**Last Updated**: 2025-01-27  
**Version**: 4.0.0  
**Maintained By**: Documentation Templates Community

