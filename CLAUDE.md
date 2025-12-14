# CLAUDE.md - WCP AI Agent Prototype Code Reference

**Purpose**: This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository. It's a quick reference for common tasks and patterns.

**⚠️ MANDATORY STEPS BEFORE ANY CODE CHANGE:**

1. **Tool Call Limit Awareness** - ⚠️ **CRITICAL**: Always be mindful of tool call limits
   - Batch operations when possible (multiple `read_file` calls in parallel)
   - Use efficient tools (`grep` instead of `codebase_search` when possible)
   - Cache information - don't re-read files or re-search patterns
   - Plan tool usage before starting operations
   - See `docs/TOOL-CALL-LIMITS.md` for complete guidelines (if available)
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

**Last Updated**: 2025-01-27  
**Project Status**: Prototype

---

## Project Overview

**WCP AI Agent Prototype** is a functional mini-agent that processes Weekly Certified Payrolls (WCPs), validates them against Davis-Bacon Wage Determinations (DBWD), and makes compliance decisions using a hybrid approach of deterministic tools and LLM reasoning.

**Core Philosophy**: Hybrid approach combining deterministic tools for accuracy with LLM agents for reasoning and explanation.

**Key Tech Stack:**
- TypeScript (ES modules with .js extensions)
- Mastra.ai (v0.24.0)
- @ai-sdk/openai (v2.0.65)
- OpenAI GPT-4o-mini
- Zod (v3.22.0)
- Node.js (v20.0.0+)

**Build Status**: ✅ Successfully builds and compiles
**Dependencies**: All dependencies properly installed and working

---

## Development Commands

### Running the Application

```bash
# Run test script directly (requires .env file with OPENAI_API_KEY)
npm run test

# Or using ts-node directly (requires --esm flag for ES modules)
ts-node --esm src/index.ts

# Build TypeScript (compiles to dist/)
npm run build

# Start compiled code (requires .env file with OPENAI_API_KEY)
npm start

# Run with Mastra dev server (opens playground at http://localhost:4111)
npm run dev
```

### Environment Setup

```bash
# Create .env file with your OpenAI API key
echo "OPENAI_API_KEY=your_openai_api_key_here" > .env

# Note: See `.env.example` for environment variable template
```

### Testing

```bash
# Run all tests (when test suite is implemented)
npm test

# Run specific test file
npm test tests/unit/test_module.test.ts
```

---

## Common Patterns

### Tool Creation Pattern

```typescript
import { createTool } from "@mastra/core/tools";
import { z } from "zod";

export const myTool = createTool({
  id: "my-tool",
  description: "Tool description",
  inputSchema: z.object({
    // Input schema
  }),
  outputSchema: z.object({
    // Output schema
  }),
  execute: async ({ context }) => {
    // Tool logic
    return {
      // Output
    };
  },
});
```

### Agent Creation Pattern

```typescript
import { openai } from "@ai-sdk/openai";
import { Agent } from "@mastra/core";
import { z } from "zod";
import { myTool } from "../tools/my-tool";

const MyDecisionSchema = z.object({
  // Decision schema
});

export const myAgent = new Agent({
  name: "my-agent",
  instructions: [
    // Agent instructions
  ],
  model: openai("gpt-4o-mini"),
  tools: { myTool },
});
```

---

## File Locations

- **Tools**: `src/mastra/tools/`
- **Agents**: `src/mastra/agents/`
- **Mastra Registration**: `src/mastra/index.ts`
- **Test Script**: `src/index.ts`
- **Configuration**: `package.json`, `tsconfig.json`

---

## Key Components

- `extractWCPTool`: Regex-based parser for role, hours, and wage extraction
- `validateWCPTool`: Compliance checker against DBWD rates
- `wcpAgent`: Mastra Agent with OpenAI GPT-4o-mini model
- `WCPDecisionSchema`: Structured output schema for compliance decisions

---

## Adding Features

1. **Plan**: Read `docs/PROMPT-VALIDATION.md` and complete validation
2. **Design**: Design feature following existing patterns
3. **Implement**: Create tools and agents following patterns
4. **Test**: Write tests for new features
5. **Document**: Update documentation (README.md, CONTEXT.md, AGENTS.md, CHANGELOG.md)

---

## Testing

### Test Types

- **Unit Tests**: `tests/unit/` - Test isolated modules and functions
- **Integration Tests**: `tests/integration/` - Test cross-module workflows
- **System Tests**: `tests/system/` - Test end-to-end scenarios
- **Workflow Tests**: `tests/workflows/` - Test complete workflows

### Test Execution

```bash
# Run all tests
npm test

# Run specific test file
npm test tests/unit/test_module.test.ts
```

---

**Last Updated**: 2025-01-27  
**Project Status**: Prototype
