# Documentation Guide

**Purpose**: Quick reference guide to all project documentation.

**Last Updated**: 2025-01-27  
**Status**: Prototype

---

## 📚 Core Documentation (Start Here)

### Essential Reading
1. **README.md** - Project overview, features, quick start
2. **CONTEXT.md** - Architecture decisions, philosophy, project context
3. **AGENTS.md** - Developer guide, patterns, conventions
4. **docs/PROMPT-VALIDATION.md** - ⚠️ **MANDATORY**: Prompt validation system
5. **docs/PROMPT-VALIDATION-QUICK.md** - Quick 5-minute validation checklist
6. **docs/DOCUMENTATION-MAINTENANCE.md** - ⚠️ **MANDATORY**: Automatic documentation maintenance guide
7. **docs/TOOL-CALL-LIMITS.md** - ⚠️ **RECOMMENDED**: Tool call optimization guidelines
8. **CLAUDE.md** - Quick reference for developers
9. **WORKFLOW.md** - User workflows and validation guide
10. **TODO.md** - All pending features, fixes, and improvements
11. **OPERATIONS.md** - Deployment and operations guide (optional)

### Historical & Reference
12. **CHANGELOG.md** - Complete version history
13. **EVALS.md** - Evaluation criteria, test scenarios, quality checks
14. **INDEX.md** - Project-wide navigation index
15. **DOCUMENTATION.md** - Documentation navigation guide (this file)
16. **DOCUMENTATION-OVERVIEW.md** - Overview of all documentation files

---

## 📁 Documentation Structure

```
wcp-agent/
├── README.md                    # Main project overview
├── CONTEXT.md                   # Architecture & philosophy
├── AGENTS.md                    # Developer guide
├── CLAUDE.md                    # Quick reference
├── DOCUMENTATION.md             # Documentation navigation guide (this file)
├── DOCUMENTATION-OVERVIEW.md    # Overview of all documentation files
├── WORKFLOW.md                  # User workflows & validation
├── TODO.md                      # Pending features, fixes & improvements
├── OPERATIONS.md                # Deployment and operations guide
├── CHANGELOG.md                 # Version history
├── EVALS.md                     # Evaluation guide
│
├── INDEX.md                     # ⚠️ MANDATORY: Project-wide index - Maps all files and directories
│
├── docs/                        # Additional technical documentation
│   ├── PROMPT-VALIDATION.md     # ⚠️ MANDATORY: Validation system
│   ├── PROMPT-VALIDATION-QUICK.md # Quick 5-minute validation checklist
│   ├── DOCUMENTATION-MAINTENANCE.md # ⚠️ MANDATORY: Automatic documentation maintenance guide
│   └── TOOL-CALL-LIMITS.md      # ⚠️ RECOMMENDED: Tool call optimization guidelines
│
├── src/                         # Source code
│   ├── mastra/
│   │   ├── tools/
│   │   │   └── wcp-tools.ts     # Extract & validate tools
│   │   ├── agents/
│   │   │   └── wcp-agent.ts     # LLM agent with decision logic
│   │   └── index.ts             # Mastra registration
│   └── index.ts                 # Test script
│
├── tests/                       # Test suite (when implemented)
│   ├── unit/                    # Unit tests
│   ├── integration/             # Integration tests
│   ├── system/                  # System tests
│   └── workflows/               # Workflow tests
│
└── _archive/                    # Archived documentation files
    └── documentation/           # Archived documentation files (see _archive/README.md)
```

---

## 🗺️ Quick Navigation - "I Want To..."

### Understand the Project
- **Quick overview** → [`README.md`](README.md) (Purpose & Features sections)
- **What it does** → [`README.md`](README.md) (Features section) or [`CONTEXT.md`](CONTEXT.md) (What Is This Project)
- **Architecture** → [`CONTEXT.md`](CONTEXT.md) (Architecture Decisions) or [`AGENTS.md`](AGENTS.md) (Architecture Overview)
- **Value proposition** → [`CONTEXT.md`](CONTEXT.md) (Core Value Proposition) or [`README.md`](README.md) (Core Value Proposition)

### Get Started
- **5-minute setup** → [`README.md`](README.md) (Getting Started section)
- **Installation** → [`README.md`](README.md) (Installation section)
- **Run demo** → [`README.md`](README.md) (Quick Demo section) - Run `npm run showcase`
- **Environment setup** → [`README.md`](README.md) (Installation section)

### See It In Action
- **Run showcase** → `npm run showcase` (see [`README.md`](README.md) Quick Demo section)
- **Demo scenarios** → [`README.md`](README.md) (Showcase Demo Scenarios section)
- **Example outputs** → See showcase output when running `npm run showcase`

### Develop/Code
- **Developer guide** → [`AGENTS.md`](AGENTS.md)
- **Code patterns** → [`AGENTS.md`](AGENTS.md) (Key Patterns section)
- **File locations** → [`INDEX.md`](INDEX.md) (Core Files section)
- **Architecture** → [`CONTEXT.md`](CONTEXT.md) (Architecture Decisions)
- **Before coding** → [`docs/PROMPT-VALIDATION.md`](docs/PROMPT-VALIDATION.md) ⚠️ **MANDATORY**

### Find Files
- **Complete file mapping** → [`INDEX.md`](INDEX.md)
- **Source code files** → [`INDEX.md`](INDEX.md) (Core Files section)
- **Documentation files** → [`INDEX.md`](INDEX.md) (Documentation section)
- **Configuration files** → [`INDEX.md`](INDEX.md) (Configuration section)

### Understand Workflows
- **User workflows** → [`WORKFLOW.md`](WORKFLOW.md)
- **Test scenarios** → [`WORKFLOW.md`](WORKFLOW.md) (Validation Testing section)
- **Decision logic** → [`WORKFLOW.md`](WORKFLOW.md) (Decision Workflow section)

### See What's Planned
- **Pending features** → [`TODO.md`](TODO.md)
- **Future roadmap** → [`TODO.md`](TODO.md) (Prioritization Summary)

### Evaluate/Test
- **Evaluation criteria** → [`EVALS.md`](EVALS.md)
- **Test scenarios** → [`EVALS.md`](EVALS.md) (Test Scenarios section)
- **Quality checks** → [`EVALS.md`](EVALS.md) (Quick Evaluation Checklist)

### Troubleshoot
- **Common issues** → [`README.md`](README.md) (Troubleshooting section)
- **Build issues** → [`README.md`](README.md) (Troubleshooting section)

---

## 📁 File Location Quick Reference

### Code Files
| What | Where |
|------|-------|
| WCP Tools | `src/mastra/tools/wcp-tools.ts` |
| WCP Agent | `src/mastra/agents/wcp-agent.ts` |
| Mastra Registration | `src/mastra/index.ts` |
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
- **INDEX.md** - ⚠️ **MANDATORY**: Project-wide navigation index mapping all files
- **DOCUMENTATION.md** - Central guide to all documentation (this file)
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
6. See: `docs/TOOL-CALL-LIMITS.md` for complete guidelines (if available)

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

**Steps 3-6: Test Creation and Documentation Maintenance**
1. **Before coding**: Plan tests, read maintenance guide, identify change type, copy checklist
2. **During coding**: Write tests alongside code, keep checklist visible
3. **After coding**: Run test suite, update ALL required docs using checklist
4. **Before complete**: Verify all tests pass, verify consistency, check off all items

**This should be automatic - tests and documentation updates are part of the implementation, not optional.**

### Documentation Maintenance Guide

`docs/DOCUMENTATION-MAINTENANCE.md` provides:
- **Automatic workflow** (Steps 0-6: Tool Call Awareness, Script-First, Validation, Before/During/After coding)
- **Auto-update triggers** for all change types (feature, bug, test, refactor, etc.)
- **Copy-paste checklists** for each change category
- **Verification steps** (version consistency, dates, links)
- **Common mistakes to avoid**

### Built-In Reminders

**These files contain automatic reminders:**
- `AGENTS.md` - Top of file has mandatory documentation section
- `CHANGELOG.md` - Header warns about automatic updates
- `docs/DOCUMENTATION-MAINTENANCE.md` - Complete automatic workflow guide

---

**Last Updated**: 2025-01-27
