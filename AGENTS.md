# AGENTS.md - Developer Guide

**Purpose**: This document helps developers understand the codebase architecture, patterns, and conventions for making changes to the WCP AI Agent Prototype.

**Last Updated**: 2025-01-27  
**Project Status**: Prototype

---

## 🗺️ Quick Navigation

**Looking for a file?** → Check [`INDEX.md`](INDEX.md) (complete file mapping)  
**Want architecture?** → Read [`CONTEXT.md`](CONTEXT.md) (design decisions)  
**Want workflows?** → Read [`WORKFLOW.md`](WORKFLOW.md) (user scenarios)  
**Want to develop?** → Read [`AGENTS.md`](AGENTS.md) (developer guide)

---

## 🚨 PRIORITY #1: AUTOMATIC TEST CREATION AND DOCUMENTATION UPDATES

**⚠️ FOR AI AGENTS: Before reading further, understand these critical principles:**

**CODE CHANGES WITHOUT TESTS = INCOMPLETE WORK**  
**CODE CHANGES WITHOUT DOCUMENTATION UPDATES = INCOMPLETE WORK**

**Every code change MUST include:**
1. **Automatic test creation/updates** - Tests are part of implementation, not optional
2. **Automatic documentation updates** - See `docs/DOCUMENTATION-MAINTENANCE.md` for complete workflow

**Both happen DURING implementation, not after. This is mandatory, not optional.**

---

## ⚠️ MANDATORY SECTIONS CHECKLIST

**AGENTS.md MUST include these sections (in this order):**

1. ✅ **Tool Call Limit Awareness** (MANDATORY)
2. ✅ **Prompt Validation System** (MANDATORY)
3. ✅ **Script-First Approach** (MANDATORY)
4. ✅ **Automatic Test Creation** (MANDATORY)
5. ✅ **Automatic Documentation Updates** (MANDATORY)
6. ✅ **Coding Best Practices** (MANDATORY)
7. ✅ **Test Best Practices** (MANDATORY)

---

## ⚠️ MANDATORY: Tool Call Limit Awareness

**🤖 FOR AI AGENTS: Always be mindful of tool call limits**

### Tool Call Efficiency Principles

1. **Batch Operations**: Batch operations when possible (multiple `read_file` calls in parallel)
2. **Tool Selection**: Choose efficient tools:
   - Use `grep` for exact string searches (faster than `codebase_search`)
   - Use `glob_file_search` for file pattern searches (faster than `list_dir`)
   - Use `codebase_search` for semantic searches (when exact patterns aren't known)
3. **Information Caching**: Cache information - avoid re-reading files or re-searching patterns
4. **Redundancy Avoidance**: Don't re-read files or re-search patterns unnecessarily
5. **Planning**: Plan all tool calls needed before starting operations

### Examples

**❌ Don't Do:**
- Read the same file multiple times
- Search for the same pattern multiple times
- Use `codebase_search` when `grep` would work

**✅ Do:**
- Batch multiple `read_file` calls in parallel
- Use `grep` for exact string searches
- Cache information from previous operations
- Plan tool usage before starting

### Reference

See `docs/TOOL-CALL-LIMITS.md` for complete guidelines (if available)

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
   - Include tool call limit assessment in Phase 5 (Autonomous Operation)
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
   - Write automation scripts in `utils/` directory
   - Use TypeScript for consistency with project
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
- **Naming**: Use descriptive names like `update-documentation.ts`, `validate-config.ts`
- **Documentation**: Include comprehensive docstrings and usage examples
- **Testing**: Test scripts before using for important tasks

**Remember: If you find yourself repeating a task more than once, create a script instead.**

---

## ⚠️ MANDATORY: Automatic Test Creation

**🤖 FOR AI AGENTS: Tests are REQUIRED, not optional**

### Core Test Types

**All 4 types mandatory for**: Projects with multiple modules, external integrations, complex workflows, or user-facing features

1. **Unit Tests** (`tests/unit/`) - Test isolated modules and functions
2. **Integration Tests** (`tests/integration/`) - Test cross-module workflows
3. **System Tests** (`tests/system/`) - Test end-to-end scenarios
4. **Workflow Tests** (`tests/workflows/`) - Test complete workflows

**Simplified testing acceptable for**: Simple scripts, single-module projects, internal tools with limited scope (Unit + Integration may be sufficient)

### Test Execution Requirements

1. **Run Tests Immediately**: Run tests immediately after writing (REQUIRED - AUTOMATIC)
   - Run new/modified test files: `npm test tests/unit/test_module.test.ts`
   - Verify new tests pass before continuing
   - Fix any failing tests immediately

2. **Run Full Test Suite**: Run full test suite periodically
   - Check for regressions: `npm test`
   - Run tests by type if needed (unit/integration/system/workflow)

3. **Run Full Test Suite Before Complete**: All tests must pass before marking complete
   - Verify all new tests pass
   - Verify existing tests still pass (no regressions)
   - Run tests by type if needed

### Test Consolidation and Optimization

- **Avoid Redundant Testing**: Don't test the same thing multiple times
- **Use Fixtures**: Extract common test setup to fixtures
- **Use Parametrization**: Use test framework's parametrization feature when applicable
- **Keep Tests Isolated**: Tests should be independent and isolated

### Test Framework

- **Framework**: Use Jest or similar TypeScript test framework
- **Syntax**: Adapt test syntax to your test framework
- **Examples**: See test framework documentation for examples

---

## ⚠️ MANDATORY: Automatic Documentation Updates

**🤖 FOR AI AGENTS: Documentation updates are AUTOMATIC and MANDATORY**

### Documentation Update Workflow

**ALL AI AGENTS MUST FOLLOW THIS WORKFLOW BEFORE ANY CODE CHANGES:**

1. **Step 0 - Tool Call Limit Awareness**: ✅ Assess and optimize tool usage before ANY operation
2. **Step 1 - Script-First Evaluation**: ✅ Evaluate if task should be automated (script vs manual)
3. **Step 2 - Prompt Validation**: ✅ Complete prompt validation (`docs/PROMPT-VALIDATION.md`)
4. **Step 3 - Before Starting**: Read `docs/DOCUMENTATION-MAINTENANCE.md` - it contains checklists for every type of change
5. **Step 4 - During Development**: Keep documentation in mind - note what needs updating
6. **Step 5 - Before Completing**: Use the appropriate checklist from `docs/DOCUMENTATION-MAINTENANCE.md`
7. **Step 6 - Always Update**: `CHANGELOG.md` is REQUIRED for every change

### Required Documentation Updates

- **CHANGELOG.md**: REQUIRED for every change
- **README.md**: Update if feature is user-facing
- **CONTEXT.md**: Update if architecture changes
- **AGENTS.md**: Update if patterns/architecture change
- **WORKFLOW.md**: Update if user workflows change
- **EVALS.md**: Update if tests are added
- **TODO.md**: Update if todos are created or completed

### Reference

See `docs/DOCUMENTATION-MAINTENANCE.md` for complete update guidelines and checklists

---

## 🏗️ Architecture Overview

### Tech Stack

- **Framework**: Mastra.ai v0.24.0 (TypeScript-native AI framework)
- **Language**: TypeScript (ES modules with .js extensions)
- **LLM**: OpenAI GPT-5-nano (via @ai-sdk/openai v2.0.65)
- **Validation**: Zod v3.22.0
- **Runtime**: Node.js v20.0.0+
- **Build Status**: ✅ Successfully builds and compiles
- **Module System**: ES modules (with .js extensions for internal imports)

### Core Principles

1. **Hybrid Approach**: Combines deterministic tools for accuracy with LLM agents for reasoning
2. **Type Safety**: Zod schemas throughout for type-safe validation
3. **Bounded Execution**: maxSteps=3 prevents infinite loops
4. **Full Auditability**: Step-by-step traces for compliance auditing
5. **Extensibility**: Designed for easy extension to new features

---

## 📁 Directory Structure

### Core Layer (`src/`)

**Source Code** (`src/`)
- **Purpose**: Main application code
- **Conventions**: TypeScript files with Zod validation
- **Key Files**: `index.ts`, `mastra/`

**Mastra Framework** (`src/mastra/`)
- **Purpose**: Mastra framework code (tools, agents, registration)
- **Conventions**: Tools and agents follow Mastra.ai patterns
- **Key Files**: `tools/wcp-tools.ts`, `agents/wcp-agent.ts`, `index.ts`

**Tools** (`src/mastra/tools/`)
- **Purpose**: Deterministic tools for data extraction and validation
- **Conventions**: Tools use `createTool` from `@mastra/core/tools`
- **Key Files**: `wcp-tools.ts`

**Agents** (`src/mastra/agents/`)
- **Purpose**: LLM agents for compliance decision-making
- **Conventions**: Agents use `Agent` from `@mastra/core`
- **Key Files**: `wcp-agent.ts`

---

## 🔑 Key Patterns

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
  model: openai("gpt-5-nano"),
  tools: { myTool },
  outputSchema: MyDecisionSchema,
});
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
3. **Create/Update Code**: Implement feature following existing patterns
4. **Create/Update Tests DURING implementation** (REQUIRED):
   - **Unit Tests**: `tests/unit/test_{module}.test.ts` - Test isolated modules and functions
   - **Integration Tests**: `tests/integration/test_{feature}_integration.test.ts` - Test cross-module workflows
   - **System Tests**: `tests/system/test_{scenario}.test.ts` - Test end-to-end scenarios
   - **Workflow Tests**: `tests/workflows/test_{workflow_type}.test.ts` - Test complete workflows
   - **Run tests immediately after writing**: `npm test tests/unit/test_module.test.ts`
   - **Verify new tests pass before continuing**
   - **Fix any failing tests immediately**
5. **Follow coding best practices** (REQUIRED):
   - Use type hints for all functions
   - Add docstrings to all public functions/classes
   - No warning suppressions
   - Use async/await correctly
   - Handle errors with specific exception types and logging
   - Keep functions focused (single responsibility)
   - Validate and sanitize inputs
6. **Update documentation DURING implementation** (not after):
   - Update `CHANGELOG.md` immediately when adding the feature
   - Update `README.md` if feature is user-facing
   - Update `AGENTS.md` if patterns/architecture change
   - Update `WORKFLOW.md` if user workflows change
   - Update `EVALS.md` if tests are added
   - Update `TODO.md` if feature was planned
7. **Run full test suite before marking complete**: All tests must pass

---

## 🎨 Coding Best Practices

### Code Organization Principles

**Import Organization**:
- **Standard Import Order**:
  1. **External dependencies** - Third-party packages (e.g., `@mastra/core`, `zod`)
  2. **Internal dependencies** - Project files (e.g., `./tools/wcp-tools.js`)
  3. **Type imports** - Type-only imports (if any)

**Example**:
```typescript
// External dependencies
import { openai } from "@ai-sdk/openai";
import { Agent } from "@mastra/core";
import { z } from "zod";

// Internal dependencies
import { extractWCPTool, validateWCPTool } from "../tools/wcp-tools.js";
```

**File Naming Conventions**:
- **Source files**: `kebab-case.ts` (e.g., `wcp-tools.ts`, `wcp-agent.ts`)
- **Exports**: `camelCase` (e.g., `extractWCPTool`, `validateWCPTool`, `wcpAgent`)
- **Documentation files**: `UPPERCASE.md` (e.g., `README.md`, `CONTEXT.md`)

**Code Structure**:
- **Separation of Concerns**: Tools, agents, and registration are separated
- **Modularity**: Each component is in its own file
- **Clear Hierarchy**: Source code → Mastra → Tools/Agents

### Code Quality Standards

1. **Type Safety**: Use TypeScript types and Zod schemas throughout
2. **Error Handling**: Handle errors with specific exception types and logging
3. **Logging**: Use entry/exit logging for critical functions
4. **Function Focus**: Keep functions focused (single responsibility)
5. **Code Organization**: Organize code logically (imports, constants, classes, functions)
6. **Input Validation**: Validate and sanitize inputs
7. **Security**: Never log sensitive data
8. **Documentation**: Add docstrings to all public functions/classes
9. **No Warning Suppressions**: No `@ts-ignore` or `// eslint-disable` unless truly necessary
10. **Async/Await**: Use async/await correctly (always await async calls)

### Examples

**❌ Don't Do:**
```typescript
// No type safety
function processWCP(input: any) {
  return input.role;
}

// No error handling
const result = await agent.generate([...]);
```

**✅ Do:**
```typescript
// Type safety with Zod
const WCPInputSchema = z.object({
  role: z.string(),
  hours: z.number(),
  wage: z.number(),
});

function processWCP(input: z.infer<typeof WCPInputSchema>) {
  return input.role;
}

// Error handling
try {
  const result = await agent.generate([...]);
} catch (error) {
  console.error("Error generating response:", error);
  throw error;
}
```

---

## 🧪 Test Best Practices

### Test Organization Principles

1. **Test Types**: Organize tests by type (unit, integration, system, workflow)
2. **Test Isolation**: Tests should be independent and isolated
3. **Test Naming**: Use descriptive test names (`test_<function>_<scenario>`)
4. **Test Fixtures**: Extract common test setup to fixtures
5. **Test Parametrization**: Use test framework's parametrization feature when applicable

### Test Consolidation and Optimization

- **Avoid Redundant Testing**: Don't test the same thing multiple times
- **Use Fixtures**: Extract common test setup to fixtures
- **Use Parametrization**: Use test framework's parametrization feature when applicable
- **Keep Tests Isolated**: Tests should be independent and isolated

### Examples

**❌ Don't Do:**
```typescript
// Redundant testing
test("extractWCPTool extracts role", () => {
  // Test role extraction
});

test("extractWCPTool extracts hours", () => {
  // Test hours extraction
});

test("extractWCPTool extracts wage", () => {
  // Test wage extraction
});
```

**✅ Do:**
```typescript
// Consolidated testing with parametrization
test.each([
  { input: "Role: Electrician, Hours: 45, Wage: $50", expected: { role: "Electrician", hours: 45, wage: 50 } },
  { input: "Role: Laborer, Hours: 40, Wage: $30", expected: { role: "Laborer", hours: 40, wage: 30 } },
])("extractWCPTool extracts data correctly", ({ input, expected }) => {
  // Test data extraction
});
```

---

## 🛠️ Development Tools

### Test Runner Script (Optional but Recommended)

Create a test runner script in `utils/` directory:

```typescript
// utils/run-tests.ts
// Run all test suites (unit, integration, system, workflow)
// Run only tests that failed in the last run (faster iteration)
// Run only unit tests
// Quick run (unit tests only, skip slow tests)
// Generate coverage report
```

### Other Development Tools

- **TypeScript Compiler**: `tsc` for type checking
- **Linter**: ESLint for code quality
- **Formatter**: Prettier for code formatting
- **Test Framework**: Jest for testing

---

## ⚠️ Common Pitfalls

### Common Mistake 1: Skipping Tests

**❌ Don't Do:**
- Skip tests because "they're not important"
- Write tests after implementation
- Skip test execution

**✅ Do:**
- Write tests DURING implementation
- Run tests immediately after writing
- Run full test suite before marking complete

### Common Mistake 2: Skipping Documentation Updates

**❌ Don't Do:**
- Skip documentation updates
- Update documentation after implementation
- Skip CHANGELOG.md updates

**✅ Do:**
- Update documentation DURING implementation
- Update CHANGELOG.md immediately
- Use checklists from `docs/DOCUMENTATION-MAINTENANCE.md`

### Common Mistake 3: Not Optimizing Tool Calls

**❌ Don't Do:**
- Read the same file multiple times
- Search for the same pattern multiple times
- Use inefficient tools

**✅ Do:**
- Batch operations when possible
- Use efficient tools (`grep` vs `codebase_search`)
- Cache information from previous operations

---

## 📚 Reference Files

### Tools

- **src/mastra/tools/wcp-tools.ts**: WCP tools for extraction and validation
  - `extractWCPTool`: Regex-based parser for role, hours, and wage extraction
  - `validateWCPTool`: Compliance checker against DBWD rates
  - DBWD rates: Hardcoded rates for Electrician and Laborer (RAG lookup planned)

### Agents

- **src/mastra/agents/wcp-agent.ts**: WCP agent for compliance decision-making
  - `wcpAgent`: Mastra Agent with OpenAI GPT-5-nano model
  - `WCPDecisionSchema`: Structured output schema (status, explanation, findings, trace)
  - Decision logic: Approved (no issues), Revise (minor fixes), Reject (major violations)

### Test Files

- **tests/unit/**: Unit tests (planned) - Test isolated modules and functions
- **tests/integration/**: Integration tests (planned) - Test cross-module workflows
- **tests/system/**: System tests (planned) - Test end-to-end scenarios
- **tests/workflows/**: Workflow tests (planned) - Test complete workflows

### Documentation References

- **WORKFLOW.md**: Detailed workflow validation scenarios (WCP Processing, Validation, Decision, Error Handling)
- **EVALS.md**: Evaluation criteria and test scenarios (functionality, code quality, architecture, performance)
- **TODO.md**: Future roadmap and prioritization (PDF parsing, RAG lookup, batch processing, production deployment)
- **INDEX.md**: Complete file mapping and codebase structure (core files, directories, design principles)

---

## 🎯 Quick Reference

### File Locations

- **Tools**: `src/mastra/tools/wcp-tools.ts`
- **Agents**: `src/mastra/agents/wcp-agent.ts`
- **Mastra Registration**: `src/mastra/index.ts`
- **Test Script**: `src/index.ts`

### Key Components

- **extractWCPTool**: Regex-based parser for role, hours, and wage extraction
  - Input: Raw WCP text (e.g., "Role: Electrician, Hours: 45, Wage: $50")
  - Output: Structured data (role, hours, wage)
  - Error handling: Currently returns defaults (Unknown, 0, 0) if regex doesn't match - proper error handling planned (see TODO.md)
- **validateWCPTool**: Compliance checker against DBWD rates
  - Input: Extracted data (role, hours, wage)
  - Output: Findings array and validation status
  - Validation: Checks for overtime (>40 hours) and underpayment (< base rate)
  - Error handling: Currently returns { base: 0, fringe: 0 } for unknown roles - proper error handling planned (see TODO.md)
- **wcpAgent**: Mastra Agent with OpenAI GPT-5-nano model
  - Instructions: Compliance auditing workflow (extract → validate → decide)
  - Tools: extractWCP, validateWCP
  - Output: Structured decision (status, explanation, findings, trace)
- **WCPDecisionSchema**: Structured output schema for compliance decisions
  - Status: Approved, Revise, or Reject
  - Explanation: Human-readable justification citing DBWD rules and findings
  - Findings: Array of violation types and details
  - Trace: Step-by-step reasoning log for auditability

### Decision-Making Logic

- **Approved**: No violations found (isValid: true, findings: [])
- **Revise**: Minor violations found (e.g., overtime >40 hours, wage close to base rate)
- **Reject**: Major violations found (e.g., significant underpayment, invalid input, unknown role)

See **WORKFLOW.md** for detailed decision-making workflows and **EVALS.md** for decision-making evaluation criteria.

---

## 📚 Related Documentation

- **README.md** - Project overview and getting started
- **CONTEXT.md** - Architecture decisions and philosophy
- **docs/PROMPT-VALIDATION.md** - ⚠️ **MANDATORY**: Validation system before any operation
- **docs/DOCUMENTATION-MAINTENANCE.md** - ⚠️ **MANDATORY**: Automatic documentation maintenance guide
- **CLAUDE.md** - Quick commands and patterns for development
- **WORKFLOW.md** - User workflows and validation guide
- **EVALS.md** - Evaluation criteria and test scenarios

---

**Last Updated**: 2025-01-27  
**Project Status**: Prototype
