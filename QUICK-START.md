# Quick Start Guide - WCP AI Agent Prototype

**Purpose**: Get up and running in 5 minutes.

**Last Updated**: 2025-12-14  
**Project Status**: Prototype

---

## 🚀 Prerequisites

- Node.js (v20.0.0 or higher)
- npm
- OpenAI API key

---

## ⚡ 5-Minute Quick Start

### 1. Install

```bash
# Install dependencies
npm install
```

### 2. Configure

Create `.env` in the project root (recommended: copy from `.env.example`):

```bash
cp .env.example .env
```

Then edit `.env` and set:

- `OPENAI_API_KEY`

API keys: https://platform.openai.com/api-keys

### 3. Run a demo

```bash
# Run the multi-scenario showcase
npm run showcase
```

Or run the smaller demo runner:

```bash
npm run test
```

---

## 🔧 Common Commands

```bash
# Build TypeScript
npm run build

# Run Jest tests (no live OpenAI calls required)
npm run test:jest

# Run Mastra dev server
npm run dev
```

---

## 📚 Next Reading

- `README.md` (project gateway)
- `ROADMAP.md` (planned features)
- `AGENTS.md` (developer workflow + rules)
- `CONTEXT.md` (architecture decisions)
- `WORKFLOW.md` (validation scenarios)
- `EVALS.md` (evaluation criteria)

---

**Last Updated**: 2025-12-14
