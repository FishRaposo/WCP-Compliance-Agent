# Quick Start Guide - WCP AI Agent Prototype

**Purpose**: Get up and running in 5 minutes. Perfect for first-time users and recruiters evaluating the project.

**Last Updated**: 2025-12-15  
**Project Status**: Phase 0 MVP Complete - Production-Ready Foundation

---

## 🚀 5-Minute Quick Start

### Step 1: Install (1 minute)

```bash
# Clone or navigate to project directory
cd "WCP AI Agent Prototype TypeScript with Mastra.ai"

# Install dependencies
npm install
```

### Step 2: Configure (1 minute)

Create `.env` file in project root:

```bash
# Windows PowerShell
echo "OPENAI_API_KEY=your_openai_api_key_here" > .env

# Linux/Mac
echo "OPENAI_API_KEY=your_openai_api_key_here" > .env
```

**Get API Key**: https://platform.openai.com/api-keys

### Step 3: Run Demo (3 minutes)

```bash
# Run the showcase demo (6 scenarios)
npm run showcase
```

**That's it!** You should see professional output with 6 different compliance scenarios.

---

## 📚 What to Read Next

### For Quick Understanding
1. **README.md** (5 min) - Project overview and features
2. **PROJECT-OVERVIEW.md** (10 min) - Comprehensive capabilities showcase
3. **SHOWCASE.md** (5 min) - Demo guide and talking points

### For Development
1. **AGENTS.md** (15 min) - Developer guide and patterns
2. **CONTEXT.md** (10 min) - Architecture decisions
3. **WORKFLOW.md** (10 min) - User workflows

### For Deep Dive
- **INDEX.md** - Complete file mapping
- **TODO.md** - Pending features

---

## 🎯 Common Tasks

### Run the Showcase
```bash
npm run showcase
```

### Run Basic Test
```bash
npm run test
```

### Build Project
```bash
npm run build
```

### Start Development Server
```bash
npm run dev
# Opens Mastra playground at http://localhost:4111
```

---

## 🗺️ Navigation Guide

### I Want To...

**Understand what this project does**
→ Read: `PROJECT-OVERVIEW.md` (Executive Summary section)

**See it in action**
→ Run: `npm run showcase`
→ Read: `SHOWCASE.md`

**Start developing**
→ Read: `AGENTS.md` (Developer guide)
→ Read: `docs/PROMPT-VALIDATION.md` (Mandatory before coding)

**Understand the architecture**
→ Read: `CONTEXT.md`
→ Read: `PROJECT-OVERVIEW.md` (Architecture section)

**Find a specific file**
→ Read: `INDEX.md` (Complete file mapping)

**See what's planned**
→ Read: `TODO.md`

**Understand workflows**
→ Read: `WORKFLOW.md`

**Run tests**
→ Read: `EVALS.md`
→ Note: Test suite planned (see Phase 0 MVP)

---

## 📁 Key Files Quick Reference

### Code Files
- `src/mastra/tools/wcp-tools.ts` - Data extraction & validation tools
- `src/mastra/agents/wcp-agent.ts` - LLM agent for decision-making
- `showcase/scripts/showcase.ts` - Demo script (6 scenarios)
- `src/index.ts` - Basic test script

### Documentation Files
- `PROJECT-OVERVIEW.md` - ⭐ **Start here for comprehensive overview**
- `README.md` - ⭐ **Start here for quick start**
- `SHOWCASE.md` - ⭐ **Start here for demos**
- `INDEX.md` - Complete file mapping
- `AGENTS.md` - Developer guide

### Configuration Files
- `package.json` - Dependencies and scripts
- `tsconfig.json` - TypeScript configuration
- `.env` - Environment variables (create this)

---

## 🆘 Troubleshooting

### "OpenAI API key is missing"
- Make sure `.env` file exists with `OPENAI_API_KEY=your_key`
- Check that the key is valid

### "Cannot find module"
- Run `npm install` to install dependencies
- Check that you're in the project root directory

### "Command not found"
- Make sure Node.js v20+ is installed
- Check `npm --version` works

---

## 📖 Documentation Structure

```
Root Level (Start Here)
├── PROJECT-OVERVIEW.md  ⭐ Comprehensive overview
├── README.md            ⭐ Quick start
├── SHOWCASE.md          ⭐ Demo guide
├── CONTEXT.md           Architecture & philosophy
├── AGENTS.md            Developer guide
└── INDEX.md             Complete file mapping

Technical Docs (docs/)
├── PROMPT-VALIDATION.md          ⚠️ Mandatory before coding
├── DOCUMENTATION-MAINTENANCE.md  ⚠️ Mandatory for docs
└── ORGANIZATION.md               Codebase structure

```

---

## 🎯 Next Steps

1. ✅ **Run the showcase**: `npm run showcase`
2. ✅ **Read PROJECT-OVERVIEW.md**: Understand capabilities
3. ✅ **Explore the code**: Check `src/mastra/` directory
4. ✅ **Read AGENTS.md**: If you want to develop

---

**Last Updated**: 2025-01-27  
**Status**: Showcase-Ready

