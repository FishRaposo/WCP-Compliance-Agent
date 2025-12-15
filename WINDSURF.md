# WINDSURF.md - Windsurf (Codeium) AI Development Guide

**Purpose**: Guidance for Windsurf/Codeium AI when working with the WCP AI Agent Prototype repository.

**Version**: 1.0  
**Last Updated**: 2025-01-27  
**Project Status**: Prototype → Production-Ready

---

## 🎯 Project Overview

**WCP AI Agent Prototype**: TypeScript-based AI agent for validating Weekly Certified Payrolls (WCPs) against Davis-Bacon Wage Determinations (DBWD).

- **Framework**: Mastra.ai v0.24.0 with OpenAI GPT-4o-mini
- **Architecture**: Hybrid approach (deterministic tools + LLM reasoning)
- **Language**: TypeScript with ES modules
- **Test Suite**: Jest (planned - see TODO.md)
- **Documentation**: 17 files with comprehensive guides

---

## ⚡ Essential Commands

```bash
# Install dependencies
npm install

# Run showcase demo (6 scenarios)
npm run showcase

# Run basic test script
npm run test

# Build the project
npm run build

# Type checking
npm run type-check

# Linting
npm run lint

# Frontend development
cd frontend && npm run dev
```

---

## 🏗️ Directory Structure

```
├── src/                     # Source code
│   ├── mastra/             # Mastra framework code
│   │   ├── tools/          # Deterministic tools
│   │   └── agents/         # LLM agents
│   ├── entrypoints/        # Entry points
│   ├── types/              # TypeScript types
│   └── server.ts           # API server
├── showcase/               # Demo materials
│   ├── scripts/            # Showcase script
│   └── *.md               # Showcase documentation
├── tests/                  # Test suite
│   ├── unit/               # Unit tests
│   ├── integration/        # Integration tests
│   ├── system/             # System tests
│   └── workflows/          # Workflow tests
├── docs/                   # Technical documentation
├── development-plan/       # Phased development plan
├── frontend/               # React web interface
└── _archive/               # Example templates
```

---

## 📋 Development Phases

| Phase | Priority | Timeline | Focus Areas |
|-------|----------|----------|-------------|
| **Phase 0: MVP** | 🔥 Critical | 1-2 weeks | Error handling, validation, environment setup |
| **Phase 1: Core** | 🔥 High | 2-3 weeks | Infrastructure, configuration, utilities |
| **Phase 2: Enhanced** | 📋 Medium | 3-4 weeks | PDF parsing, evaluation framework |
| **Phase 3: Advanced** | 📋 Medium | 4-6 weeks | RAG lookup, workflows, batch processing |
| **Phase 4: Production** | 📋 Medium | 4-6 weeks | API, auth, security, deployment |

**See**: `development-plan/OVERVIEW.md` for complete roadmap

---

## 🔧 Key Technologies

**Core Stack**:
- **Runtime**: Node.js v20.0.0+
- **Language**: TypeScript with ES modules
- **AI Framework**: Mastra.ai v0.24.0
- **LLM**: OpenAI GPT-4o-mini via @ai-sdk/openai
- **Validation**: Zod v3.22.0
- **Testing**: Jest
- **Frontend**: React + Vite
- **API**: Hono framework

---

## ✅ Before Committing

```bash
# Run all checks
npm run build        # Must compile without errors
npm run test         # Tests must pass
npm run lint         # Code must pass linting
npm run type-check   # TypeScript must validate
```

**Critical Requirements**:
- ✅ Build succeeds
- ✅ All tests pass
- ✅ Documentation updated (see docs/DOCUMENTATION-MAINTENANCE.md)
- ✅ CHANGELOG.md updated

---

## 🎯 Windsurf Tips

### Code Patterns
1. **Tool Creation**: Follow patterns in `src/mastra/tools/wcp-tools.ts`
2. **Agent Creation**: Follow patterns in `src/mastra/agents/wcp-agent.ts`
3. **Error Handling**: Use structured error types (planned for Phase 0)
4. **Validation**: Use Zod schemas throughout

### Documentation
1. **Mandatory**: Complete `docs/PROMPT-VALIDATION.md` before any changes
2. **Automatic**: Update documentation DURING implementation, not after
3. **Reference**: Check `AGENTS.md` for development patterns

### Testing
1. **Test-First**: Write tests alongside code
2. **Coverage**: Aim for >80% test coverage
3. **Types**: Unit, Integration, System, Workflow tests required

---

## 🚨 Critical Issues (Phase 0)

High-priority items that need immediate attention:
- ❌ No input validation in `wcp-tools.ts`
- ❌ No structured error handling
- ❌ No test suite (directory exists but empty)
- ❌ No environment variable validation

**See**: `TODO.md` for complete list of pending items

---

## 📚 Key Documentation

### Essential Reading
- **[README.md](./README.md)** - Project overview and quick start
- **[TODO.md](./TODO.md)** - Detailed requirements and pending items
- **[AGENTS.md](./AGENTS.md)** - Developer guide with patterns
- **[CONTEXT.md](./CONTEXT.md)** - Architecture decisions

### Development
- **[development-plan/OVERVIEW.md](./development-plan/OVERVIEW.md)** - Phased roadmap
- **[docs/IMPLEMENTATION-GUIDE.md](./docs/IMPLEMENTATION-GUIDE.md)** - Code examples
- **[docs/TESTING-GUIDE.md](./docs/TESTING-GUIDE.md)** - Testing patterns

### Reference
- **[ROADMAP.md](./ROADMAP.md)** - Consolidated roadmap
- **[CHANGELOG.md](./CHANGELOG.md)** - Version history
- **[docs/INDEX.md](./docs/INDEX.md)** - Documentation navigation

---

## 🔍 Quick Reference

### Common Tasks

**Adding a new tool**:
1. Create in `src/mastra/tools/`
2. Use `createTool` from `@mastra/core/tools`
3. Add Zod schemas for input/output
4. Export in `src/mastra/index.ts`

**Adding a new agent**:
1. Create in `src/mastra/agents/`
2. Use `Agent` from `@mastra/core`
3. Define decision schema with Zod
4. Register tools in agent constructor

**Running tests**:
```bash
# Specific test file
npm test tests/unit/test_wcp_tools.test.ts

# All tests
npm test

# With coverage
npm test -- --coverage
```

---

## 📝 Development Workflow

1. **Read**: Complete prompt validation (`docs/PROMPT-VALIDATION.md`)
2. **Plan**: Review TODO.md and development plan
3. **Implement**: Follow patterns in AGENTS.md
4. **Test**: Write tests alongside code
5. **Document**: Update documentation during implementation
6. **Validate**: Run all checks before commit

---

**Status**: PROTOTYPE 🚧  
**Next Milestone**: Phase 0 MVP (Critical fixes and validation)
