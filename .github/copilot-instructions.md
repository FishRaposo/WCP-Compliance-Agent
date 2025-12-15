# GitHub Copilot Instructions for WCP Compliance Agent

## Project Overview

The WCP AI Agent Prototype is a TypeScript-based compliance automation system that validates Weekly Certified Payrolls (WCPs) against Davis-Bacon Wage Determinations (DBWD). The project uses a hybrid approach combining deterministic tools for accuracy with LLM agents for reasoning and explainability.

**Tech Stack:**
- Framework: Mastra.ai v0.24.0
- Language: TypeScript (ES modules with .js extensions)
- LLM: OpenAI GPT-4o-mini
- Validation: Zod v3.22.0
- Runtime: Node.js v20.0.0+
- Testing: Jest
- Build Status: ✅ Successfully builds and compiles

## Core Principles

1. **Hybrid Architecture**: Combines deterministic tools for accuracy with LLM agents for reasoning
2. **Type Safety**: Zod schemas throughout for type-safe validation
3. **Bounded Execution**: maxSteps=3 prevents infinite loops
4. **Full Auditability**: Step-by-step traces for compliance auditing
5. **Extensibility**: Designed for easy extension to new features

## Mandatory Requirements for AI Agents

### 1. Prompt Validation (MANDATORY)
**Before ANY code changes, documentation updates, or system modifications:**
- Read and complete `docs/PROMPT-VALIDATION.md` for comprehensive validation
- Use `docs/PROMPT-VALIDATION-QUICK.md` for rapid 5-minute checks
- All confidence levels must be ≥ 7/10 to proceed
- Validate task understanding, codebase understanding, requirements, process, and autonomous operation capability

### 2. Tool Call Limit Awareness (MANDATORY)
**Always be mindful of tool call limits:**
- Batch operations when possible (multiple file reads in parallel)
- Use efficient tools: `grep` for exact searches, `glob` for file patterns, avoid redundant operations
- Cache information - avoid re-reading files or re-searching patterns
- Plan all tool calls needed before starting operations

### 3. Script-First Approach (MANDATORY)
**Create scripts and automation rather than manual tasks:**
- Evaluate if task should be automated before doing it manually
- Create scripts in `utils/` directory using TypeScript
- Include proper error handling, logging, and documentation
- Benefits: reusability, consistency, time savings, executable documentation

### 4. Automatic Test Creation (MANDATORY)
**Tests are REQUIRED, not optional:**
- Write tests DURING implementation, not after
- Run tests immediately after writing them
- Test types: Unit (`tests/unit/`), Integration (`tests/integration/`), System (`tests/system/`), Workflow (`tests/workflows/`)
- Run full test suite before marking complete
- All tests must pass before completion

### 5. Automatic Documentation Updates (MANDATORY)
**Documentation updates are AUTOMATIC and MANDATORY:**
- Read `docs/DOCUMENTATION-MAINTENANCE.md` before starting
- Update documentation DURING implementation
- Required updates: CHANGELOG.md (always), README.md (user-facing), AGENTS.md (patterns), WORKFLOW.md (workflows)
- Follow checklists from documentation maintenance guide

## Coding Standards

### Import Organization
```typescript
// 1. External dependencies
import { openai } from "@ai-sdk/openai";
import { Agent } from "@mastra/core";
import { z } from "zod";

// 2. Internal dependencies
import { extractWCPTool, validateWCPTool } from "../tools/wcp-tools.js";

// 3. Type imports (if any)
```

### File Naming Conventions
- Source files: `kebab-case.ts` (e.g., `wcp-tools.ts`)
- Exports: `camelCase` (e.g., `extractWCPTool`, `wcpAgent`)
- Documentation: `UPPERCASE.md` (e.g., `README.md`, `CONTEXT.md`)

### Code Quality Standards
1. **Type Safety**: Use TypeScript types and Zod schemas throughout
2. **Error Handling**: Handle errors with specific exception types and logging
3. **Logging**: Use entry/exit logging for critical functions
4. **Function Focus**: Keep functions focused (single responsibility)
5. **Input Validation**: Validate and sanitize inputs
6. **Security**: Never log sensitive data
7. **Documentation**: Add docstrings to all public functions/classes
8. **No Warning Suppressions**: Avoid `@ts-ignore` or `// eslint-disable` unless truly necessary
9. **Async/Await**: Use async/await correctly (always await async calls)

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
    // Tool logic with error handling
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
import { myTool } from "../tools/my-tool.js";

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
  outputSchema: MyDecisionSchema,
});
```

## Testing Requirements

### Test Types
1. **Unit Tests** (`tests/unit/`) - Test isolated modules and functions
2. **Integration Tests** (`tests/integration/`) - Test cross-module workflows
3. **System Tests** (`tests/system/`) - Test end-to-end scenarios
4. **Workflow Tests** (`tests/workflows/`) - Test complete workflows

### Test Execution
1. Run tests immediately after writing: `npm test tests/unit/test_module.test.ts`
2. Verify new tests pass before continuing
3. Fix any failing tests immediately
4. Run full test suite before marking complete: `npm test`

### Test Organization
- Use descriptive test names: `test_<function>_<scenario>`
- Extract common setup to fixtures
- Use test framework's parametrization when applicable
- Keep tests isolated and independent
- Avoid redundant testing

## Directory Structure

```
src/
├── entrypoints/
│   └── wcp-entrypoint.ts      # LLM entrypoint orchestration
├── mastra/
│   ├── tools/
│   │   └── wcp-tools.ts        # Extract & validate tools
│   ├── agents/
│   │   └── wcp-agent.ts        # LLM agent with decision logic
│   └── index.ts                # Mastra registration
├── server.ts                   # API Server (Hono)
└── index.ts                    # Test script

tests/
├── unit/                       # Unit tests
├── integration/                # Integration tests
├── system/                     # System tests
└── workflows/                  # Workflow tests

docs/
├── INDEX.md                    # Documentation navigation hub
├── PROMPT-VALIDATION.md        # Validation system (MANDATORY)
├── DOCUMENTATION-MAINTENANCE.md # Documentation workflow (MANDATORY)
└── TOOL-CALL-LIMITS.md         # Tool optimization (RECOMMENDED)
```

## Key Components

### Tools (src/mastra/tools/wcp-tools.ts)
- `extractWCPTool`: Regex-based parser for role, hours, and wage extraction
- `validateWCPTool`: Compliance checker against DBWD rates

### Agent (src/mastra/agents/wcp-agent.ts)
- `wcpAgent`: Mastra Agent with OpenAI GPT-4o-mini model
- `WCPDecisionSchema`: Structured output schema (status, explanation, findings, trace)

### Decision Logic
- **Approved**: No violations found (isValid: true, findings: [])
- **Revise**: Minor violations (e.g., overtime >40 hours)
- **Reject**: Major violations (e.g., underpayment, invalid input)

## Common Tasks

### Adding a New Feature
1. Read `docs/DOCUMENTATION-MAINTENANCE.md` FIRST - Copy the feature addition checklist
2. Plan tests for each test type (unit, integration, system, workflow)
3. Create/update code following existing patterns
4. Create/update tests DURING implementation (REQUIRED)
5. Follow coding best practices (REQUIRED)
6. Update documentation DURING implementation (not after)
7. Run full test suite before marking complete

### Development Commands
```bash
npm run test         # Run test script
npm run build        # Build TypeScript
npm start            # Start compiled code
npm run dev          # Run with Mastra dev server
npm run showcase     # Run showcase demo (CLI)
npm run serve        # Start API server
```

## Common Pitfalls to Avoid

### ❌ Don't Do:
- Skip tests or write them after implementation
- Skip documentation updates
- Read the same file multiple times
- Use inefficient tools when better options exist
- Suppress TypeScript/ESLint warnings unnecessarily
- Make changes without validation

### ✅ Do:
- Write tests DURING implementation
- Update documentation DURING implementation
- Batch operations when possible
- Use type hints for all functions
- Add docstrings to all public functions/classes
- Handle errors with specific exception types and logging
- Keep functions focused (single responsibility)
- Validate and sanitize inputs

## Important Documentation Files

- **README.md** - Project overview and getting started
- **AGENTS.md** - Developer guide with patterns and conventions (YOU SHOULD READ THIS)
- **CONTEXT.md** - Architecture decisions and philosophy
- **WORKFLOW.md** - User workflows and validation guide
- **EVALS.md** - Evaluation criteria and test scenarios
- **TODO.md** - Future roadmap and prioritization
- **CHANGELOG.md** - Version history (UPDATE FOR EVERY CHANGE)
- **docs/PROMPT-VALIDATION.md** - ⚠️ MANDATORY validation before any operation
- **docs/DOCUMENTATION-MAINTENANCE.md** - ⚠️ MANDATORY documentation update workflow

## Decision-Making Workflow

The agent makes compliance decisions based on validation findings:

1. **Extract** WCP data using `extractWCPTool` (regex-based parser)
2. **Validate** against DBWD rates using `validateWCPTool`
3. **Decide** based on findings:
   - **Approved**: No violations
   - **Revise**: Minor violations (overtime, wage close to threshold)
   - **Reject**: Major violations (underpayment, invalid input, unknown role)
4. **Return** structured output with explanation, findings, and trace

See **WORKFLOW.md** for detailed workflows and **EVALS.md** for evaluation criteria.

## Module System

- **ES modules**: Use `.js` extensions for internal imports (TypeScript compiles to JS)
- Example: `import { extractWCPTool } from "../tools/wcp-tools.js";`
- **NOT** `.ts` extensions in import statements

## Additional Resources

For more detailed information, refer to:
- **AGENTS.md** - Comprehensive developer guide (patterns, conventions, examples)
- **docs/INDEX.md** - Complete documentation navigation
- **WORKFLOW.md** - Detailed workflow validation scenarios
- **EVALS.md** - Evaluation and testing guide

---

**Last Updated**: 2025-12-15  
**Project Status**: Prototype
