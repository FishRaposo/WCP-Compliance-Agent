# WCP AI Agent Prototype - Documentation Index

**Purpose**: Central navigation hub for all project documentation.

**Last Updated**: 2025-01-27  
**Project Status**: Prototype

---

## 🗺️ Quick Navigation

### 🚀 Getting Started
- [**README.md**](../README.md) - Project overview, features, and quick start
- [**QUICK-START**](showcase/QUICK-START.md) - 5-minute setup guide
- [**Installation Guide**](#installation) - Detailed setup instructions

### 🎯 Showcase & Demo
- [**PROJECT OVERVIEW**](showcase/PROJECT-OVERVIEW.md) - Comprehensive project overview
- [**SHOWCASE GUIDE**](showcase/SHOWCASE.md) - Demo scenarios and talking points
- [**SHOWCASE QUICK START**](showcase/SHOWCASE-QUICK-START.md) - Quick demo reference

### 🏗️ Architecture & Development
- [**CONTEXT**](../CONTEXT.md) - Architecture decisions and philosophy
- [**AGENTS.md**](../AGENTS.md) - Developer implementation guide
- [**WORKFLOW.md**](../WORKFLOW.md) - User workflows and validation
- [**PROJECT MAPPING**](PROJECT-MAPPING.md) - Complete file and feature mapping
- [**TEMPLATE MAPPING**](TEMPLATE-MAPPING.md) - Template system compliance analysis

### 📋 Development Resources
- [**TODO.md**](../TODO.md) - Pending features and improvements
- [**EVALS.md**](../EVALS.md) - Evaluation criteria and test scenarios
- [**CHANGELOG.md**](../CHANGELOG.md) - Version history
- [**PROMPT VALIDATION**](PROMPT-VALIDATION.md) - Mandatory validation system

### 📚 Technical Documentation
- [**DOCUMENTATION MAINTENANCE**](DOCUMENTATION-MAINTENANCE.md) - Documentation workflow
- [**TOOL CALL LIMITS**](TOOL-CALL-LIMITS.md) - Optimization guidelines
- [**QUICK PROMPT VALIDATION**](PROMPT-VALIDATION-QUICK.md) - 5-minute validation

---

## 📂 Documentation Structure

```
docs/
├── INDEX.md                    # This file - documentation hub
├── PROJECT-MAPPING.md          # Complete project mapping
├── PROMPT-VALIDATION.md        # Mandatory validation system
├── PROMPT-VALIDATION-QUICK.md  # Quick validation checklist
├── DOCUMENTATION-MAINTENANCE.md # Documentation workflow
├── TOOL-CALL-LIMITS.md         # Tool optimization
└── showcase/                   # Showcase and demo materials
    ├── README.md               # Showcase overview
    ├── PROJECT-OVERVIEW.md     # Comprehensive project overview
    ├── SHOWCASE.md             # Demo guide
    ├── QUICK-START.md          # 5-minute setup
    └── SHOWCASE-QUICK-START.md # Quick demo reference
```

---

## 🚀 Installation

### Prerequisites
- Node.js (v20.0.0 or higher)
- npm or yarn
- OpenAI API key

### Quick Setup

```bash
# 1. Clone and install
git clone <repository-url>
cd wcp-ai-agent
npm install

# 2. Configure environment
cp .env.example .env
# Edit .env with your OPENAI_API_KEY

# 3. Run the demo
npm run showcase
```

### Web Interface Setup

```bash
# Start API server
npm run serve

# Start frontend (new terminal)
cd frontend
npm install
npm run dev
```

---

## 🎯 Key Documentation Paths

### Code Files
| What | Where |
|------|-------|
| WCP Tools | `src/mastra/tools/wcp-tools.ts` |
| WCP Agent | `src/mastra/agents/wcp-agent.ts` |
| Mastra Registration | `src/mastra/index.ts` |
| LLM Entrypoint | `src/entrypoints/wcp-entrypoint.ts` |
| Showcase Script | `showcase/scripts/showcase.ts` |
| Test Script | `src/index.ts` |
| API Server | `src/server.ts` |

### Documentation Files
| What | Where |
|------|-------|
| Project Overview | `README.md` |
| Architecture | `CONTEXT.md` |
| Developer Guide | `AGENTS.md` |
| Operations Guide | `OPERATIONS.md` |
| File Index | `INDEX.md` |
| Workflows | `WORKFLOW.md` |
| TODO List | `TODO.md` |
| Version History | `CHANGELOG.md` |
| Evaluation Guide | `EVALS.md` |

### Configuration Files
| What | Where |
|------|-------|
| Package Config | `package.json` |
| TypeScript Config | `tsconfig.json` |
| Environment Variables | `.env` (create this) |
| Git Ignore | `.gitignore` |
| Jest Config | `jest.config.js` |

### Example Files (in _archive/)
| What | Where |
|------|-------|
| Error Handler | `_archive/error-handler.ts.example` |
| Validator | `_archive/validator.ts.example` |
| Env Validator | `_archive/env-validator.ts.example` |
| App Config | `_archive/app-config.ts.example` |
| Jest Config | `_archive/jest.config.js.example` |
| Test Setup | `_archive/setup.ts.example` |

---

## 📊 Project Statistics

- **Core Files**: 7 files in `src/`
- **Showcase Script**: 1 file in `showcase/scripts/` (`showcase.ts`)
- **Frontend Files**: 7 files in `frontend/`
- **Root Documentation**: 11 files
- **Technical Documentation**: 20+ files in `docs/`
- **Test Files**: 5 files (structure exists, needs implementation)
- **Configuration Files**: 4 files (package.json, tsconfig.json, .gitignore, jest.config.js)
- **Build Status**: ✅ Successfully builds and compiles
- **Dependencies**: Mastra 0.24.0, @ai-sdk/openai 2.0.65, Zod 3.22.0, chalk 5.3.0
- **Archive**: 1 directory (`_archive/`) - Contains example templates and archived documentation

---

## 🗺️ Navigation Quick Links

### By Purpose

- **Understanding the code**: `src/` → Core files → Module docstrings
- **Understanding architecture**: `CONTEXT.md` → Architecture decisions
- **Finding documentation**: `DOCUMENTATION.md` → Documentation navigation guide
- **Finding tests**: `tests/` → Test suite (when implemented)
- **Deployment guide**: `OPERATIONS.md` → Complete deployment and troubleshooting
- **Implementation examples**: `_archive/*.example` files → Code templates

### By Directory - Index Files

Each major directory has its own documentation:

- **Root**: `INDEX.md` (this file) - Complete project overview
- **docs/**: Technical documentation (mandatory guides, development plans)
- **tests/**: Test suite (planned - unit, integration, system, workflow)
- **showcase/**: Demo materials and recruiter-focused documentation
- **frontend/**: React web interface documentation
- **_archive/**: Example templates and archived documentation

---

## 📖 Reading Order for New Developers

1. **Start Here**: [README.md](../README.md) - Understand the project
2. **Quick Setup**: [QUICK-START.md](showcase/QUICK-START.md) - Get running in 5 minutes
3. **Architecture**: [CONTEXT.md](../CONTEXT.md) - Understand design decisions
4. **Development**: [AGENTS.md](../AGENTS.md) - Learn development patterns
5. **Workflows**: [WORKFLOW.md](../WORKFLOW.md) - Understand user flows

---

## 📝 Contributing to Documentation

### Documentation Rules
1. **Mandatory**: Complete [PROMPT VALIDATION](PROMPT-VALIDATION.md) before any changes
2. **Mandatory**: Follow [DOCUMENTATION MAINTENANCE](DOCUMENTATION-MAINTENANCE.md) workflow
3. Update CHANGELOG.md for all documentation changes
4. Keep documentation in sync with code changes

### Style Guide
- Use clear, concise language
- Include code examples where helpful
- Add navigation links at the top of each file
- Use consistent formatting (Markdown tables, code blocks, etc.)
- Update the "Last Updated" field when making changes

---

## 🔍 Finding Information

### By Role
- **Developers**: See [AGENTS.md](../AGENTS.md), [WORKFLOW.md](../WORKFLOW.md)
- **Recruiters**: See [showcase/PROJECT-OVERVIEW.md](showcase/PROJECT-OVERVIEW.md)
- **Users**: See [README.md](../README.md), [showcase/QUICK-START.md](showcase/QUICK-START.md)

### By Topic
- **Architecture**: [CONTEXT.md](../CONTEXT.md), [PROJECT-MAPPING.md](PROJECT-MAPPING.md)
- **Features**: [README.md](../README.md), [showcase/SHOWCASE.md](showcase/SHOWCASE.md)
- **Development**: [AGENTS.md](../AGENTS.md), [TODO.md](../TODO.md)
- **Testing**: [EVALS.md](../EVALS.md), [WORKFLOW.md](../WORKFLOW.md)

---

**Last Updated**: 2025-01-27  
**Maintained as part of the WCP AI Agent Prototype**
