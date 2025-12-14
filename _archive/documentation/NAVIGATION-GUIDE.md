# Navigation Guide - Finding What You Need

**Purpose**: Quick reference guide to help you find exactly what you're looking for in the WCP AI Agent Prototype codebase and documentation.

**Last Updated**: 2025-01-27

---

## 🎯 I Want To...

### Understand the Project
- **Quick overview** → [`PROJECT-OVERVIEW.md`](../PROJECT-OVERVIEW.md) (Executive Summary)
- **What it does** → [`PROJECT-OVERVIEW.md`](../PROJECT-OVERVIEW.md) (What It Does section)
- **Architecture** → [`PROJECT-OVERVIEW.md`](../PROJECT-OVERVIEW.md) (Architecture section) or [`CONTEXT.md`](../CONTEXT.md)
- **Value proposition** → [`PROJECT-OVERVIEW.md`](../PROJECT-OVERVIEW.md) (Executive Summary)

### Get Started
- **5-minute setup** → [`QUICK-START.md`](../QUICK-START.md)
- **Installation** → [`README.md`](../README.md) (Getting Started section)
- **Run demo** → [`QUICK-START.md`](../QUICK-START.md) or [`SHOWCASE.md`](../SHOWCASE.md)
- **Environment setup** → [`README.md`](../README.md) (Installation section)

### See It In Action
- **Run showcase** → `npm run showcase` or [`SHOWCASE.md`](../SHOWCASE.md)
- **Demo scenarios** → [`SHOWCASE.md`](../SHOWCASE.md) (Demo Scenarios section)
- **Example outputs** → [`SHOWCASE.md`](../SHOWCASE.md) (Output Format section)
- **Talking points** → [`SHOWCASE.md`](../SHOWCASE.md) (Key Talking Points section)

### Develop/Code
- **Developer guide** → [`AGENTS.md`](../AGENTS.md)
- **Code patterns** → [`AGENTS.md`](../AGENTS.md) (Key Patterns section)
- **File locations** → [`INDEX.md`](../INDEX.md) (Core Files section)
- **Architecture** → [`CONTEXT.md`](../CONTEXT.md) (Architecture Decisions)
- **Before coding** → [`docs/PROMPT-VALIDATION.md`](PROMPT-VALIDATION.md) ⚠️ **MANDATORY**

### Find Files
- **Complete file mapping** → [`INDEX.md`](../INDEX.md)
- **Source code files** → [`INDEX.md`](../INDEX.md) (Core Files section)
- **Documentation files** → [`INDEX.md`](../INDEX.md) (Documentation section)
- **Configuration files** → [`INDEX.md`](../INDEX.md) (Configuration section)

### Understand Workflows
- **User workflows** → [`WORKFLOW.md`](../WORKFLOW.md)
- **Test scenarios** → [`WORKFLOW.md`](../WORKFLOW.md) (Validation Testing section)
- **Decision logic** → [`WORKFLOW.md`](../WORKFLOW.md) (Decision Workflow section)

### See What's Planned
- **Pending features** → [`TODO.md`](../TODO.md)
- **Future roadmap** → [`PROJECT-OVERVIEW.md`](../PROJECT-OVERVIEW.md) (Future Roadmap section)

### Evaluate/Test
- **Evaluation criteria** → [`EVALS.md`](../EVALS.md)
- **Test scenarios** → [`EVALS.md`](../EVALS.md) (Test Scenarios section)
- **Quality checks** → [`EVALS.md`](../EVALS.md) (Quick Evaluation Checklist)

### Troubleshoot
- **Common issues** → [`QUICK-START.md`](../QUICK-START.md) (Troubleshooting section)
- **Showcase issues** → [`SHOWCASE.md`](../SHOWCASE.md) (Troubleshooting section)
- **Build issues** → [`README.md`](../README.md) (Development section)

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
| Quick Start | `QUICK-START.md` |
| Project Overview | `PROJECT-OVERVIEW.md` |
| Showcase Guide | `SHOWCASE.md` |
| Developer Guide | `AGENTS.md` |
| Architecture | `CONTEXT.md` |
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

## 🗺️ Documentation Structure

### Entry Points (Start Here)
1. **QUICK-START.md** - 5-minute setup guide
2. **PROJECT-OVERVIEW.md** - Comprehensive overview
3. **README.md** - Project overview and quick start
4. **SHOWCASE.md** - Demo guide

### Core Documentation
- **CONTEXT.md** - Architecture and philosophy
- **AGENTS.md** - Developer guide
- **WORKFLOW.md** - User workflows
- **INDEX.md** - Complete file mapping

### Technical Documentation (`docs/`)
- **PROMPT-VALIDATION.md** - ⚠️ Mandatory validation system
- **DOCUMENTATION-MAINTENANCE.md** - ⚠️ Mandatory documentation workflow
- **ORGANIZATION.md** - Codebase organization
- **ARCHIVE-ANALYSIS.md** - Archive feature analysis
- **NAVIGATION-GUIDE.md** - This file


---

## 🎯 By Audience

### First-Time Visitors
1. [`QUICK-START.md`](../QUICK-START.md) - Get started in 5 minutes
2. [`PROJECT-OVERVIEW.md`](../PROJECT-OVERVIEW.md) - Understand what it does
3. Run `npm run showcase` - See it in action

### Developers
1. [`AGENTS.md`](../AGENTS.md) - Developer guide
2. [`docs/PROMPT-VALIDATION.md`](PROMPT-VALIDATION.md) - ⚠️ Read before coding
3. [`CONTEXT.md`](../CONTEXT.md) - Architecture decisions
4. [`INDEX.md`](../INDEX.md) - Find files

### Project Managers
1. [`PROJECT-OVERVIEW.md`](../PROJECT-OVERVIEW.md) - Complete overview
2. [`TODO.md`](../TODO.md) - Pending features

### QA/Testers
1. [`WORKFLOW.md`](../WORKFLOW.md) - Test scenarios
2. [`EVALS.md`](../EVALS.md) - Evaluation criteria
3. [`SHOWCASE.md`](../SHOWCASE.md) - Demo scenarios

### Stakeholders/Clients
1. [`PROJECT-OVERVIEW.md`](../PROJECT-OVERVIEW.md) - Executive Summary
2. [`SHOWCASE.md`](../SHOWCASE.md) - Demo guide
3. Run `npm run showcase` - Live demo

---

## 🔍 Search Tips

### Finding Code
- **Tools** → Search for "extractWCPTool" or "validateWCPTool"
- **Agent** → Search for "wcpAgent"
- **Schemas** → Search for "WCPDecisionSchema"

### Finding Documentation
- **Quick start** → Search for "QUICK-START" or "5-minute"
- **Architecture** → Search for "CONTEXT" or "architecture"
- **Workflows** → Search for "WORKFLOW" or "scenarios"

### Finding Configuration
- **Dependencies** → Check `package.json`
- **TypeScript** → Check `tsconfig.json`
- **Environment** → Check `.env` (create this)

---

## 📚 Documentation Reading Order

### For Understanding (30 minutes)
1. [`QUICK-START.md`](../QUICK-START.md) (5 min) - Setup
2. [`PROJECT-OVERVIEW.md`](../PROJECT-OVERVIEW.md) (15 min) - Overview
3. [`SHOWCASE.md`](../SHOWCASE.md) (10 min) - Demo guide

### For Development (1 hour)
1. [`AGENTS.md`](../AGENTS.md) (20 min) - Developer guide
2. [`CONTEXT.md`](../CONTEXT.md) (15 min) - Architecture
3. [`docs/PROMPT-VALIDATION.md`](PROMPT-VALIDATION.md) (15 min) - ⚠️ Mandatory
4. [`WORKFLOW.md`](../WORKFLOW.md) (10 min) - Workflows

### For Deep Dive (2+ hours)
1. All core documentation files
3. [`docs/`](.) - Technical documentation
4. Source code exploration

---

## 🆘 Still Can't Find It?

1. **Check INDEX.md** - Complete file mapping
2. **Search the codebase** - Use your IDE's search
3. **Check DOCUMENTATION.md** - Documentation navigation guide
4. **Read QUICK-START.md** - Common tasks section

---

**Last Updated**: 2025-01-27

