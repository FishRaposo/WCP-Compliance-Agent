# MVP Template Rebuild Plan (LLM Entrypoint + Jest)

**Purpose**: Document the exact changes planned to reorganize the MVP to follow the repository’s template conventions, without expanding scope.

**Scope**: Refactor/organization + test harness enablement (Jest). No new product features, no new workflows, no new tools/agents.

**Status**: Applied

---

## Goals

- Make the “LLM entrypoint” a **clean, reusable module boundary**, rather than embedding the core flow only in `src/index.ts`.
- Keep existing behavior intact:
  - `npm run test` still runs a simple demo execution.
  - `npm run showcase` unchanged.
  - Mastra registration remains the single source of truth for agent registration.
- Introduce a **real automated test runner (Jest)** following the repository’s example templates and ESM conventions.
- Update required documentation **during implementation**, including `CHANGELOG.md`.

---

## Current State (Baseline)

- **Entrypoint**: `src/index.ts` (IIFE script) calls:
  - `mastra.getAgent("wcpAgent")`
  - `agent.generate(...)` with `WCPDecisionSchema`
- **Mastra registration**: `src/mastra/index.ts`
- **Agent**: `src/mastra/agents/wcp-agent.ts`
- **Tools**: `src/mastra/tools/wcp-tools.ts`
- **Testing**: Only `.example` test templates exist; `npm run test` is not a test runner.

---

## Target Structure (New Format)

### Code

- `src/entrypoints/`
  - `wcp-entrypoint.ts` (NEW)
    - Exports a small API for running the MVP flow (e.g., `runWcpOnce(...)` or similar).
    - Contains the “LLM entrypoint” orchestration logic:
      - gets agent from Mastra
      - executes `generate` with bounded steps
      - returns the structured response
- `src/index.ts` (MODIFY)
  - Becomes a thin runner that calls `src/entrypoints/wcp-entrypoint.ts`.
  - Preserves current console output behavior and error handling.

### Tests

- `jest.config.js` (NEW) from `jest.config.js.example` with minimal adjustments if needed.
- `tests/setup.ts` (NEW) from `tests/setup.ts.example` with minimal adjustments if needed.
- Convert example tests into real tests (NEW files):
  - `tests/unit/test_wcp_tools.test.ts`
  - `tests/integration/test_wcp_integration.test.ts`

Notes:
- Integration tests that require live OpenAI calls will be **skipped by default** unless an API key is present, to keep CI/dev runs predictable.

---

## Planned File Changes (Explicit)

### Create

- `docs/MVP-TEMPLATE-REBUILD-PLAN.md` (THIS FILE)
- `src/entrypoints/wcp-entrypoint.ts`
- `jest.config.js`
- `tests/setup.ts`
- `tests/unit/test_wcp_tools.test.ts`
- `tests/integration/test_wcp_integration.test.ts`

### Modify

- `src/index.ts`
- `package.json`
  - Add Jest scripts (e.g., `test:jest`) while preserving existing `test` script used for the demo.
  - Add dev dependencies for Jest/ts-jest.
- `CHANGELOG.md` (required)
- `INDEX.md` (reflect new `src/entrypoints/` and real tests)
- `README.md` (update testing instructions to include Jest)

### No changes intended

- `src/mastra/index.ts`
- `src/mastra/agents/wcp-agent.ts`
- `src/mastra/tools/wcp-tools.ts`
- `showcase/scripts/showcase.ts`

---

## Jest / ESM Compatibility Notes

- Project uses `"type": "module"` and internal imports include `.js` extensions.
- Jest configuration will use `ts-jest/presets/default-esm` and `extensionsToTreatAsEsm: ['.ts']`.
- `moduleNameMapper` will map `^(\.{1,2}/.*)\.js$` → `$1` for TS resolution during tests.

---

## Test Strategy

### Unit

- Validate deterministic tools:
  - `extractWCPTool.execute({ context: { content } })`
  - `validateWCPTool.execute({ context: { role, hours, wage } })`

### Integration

- Validate “wiring” (Mastra registration + agent retrieval) and orchestration module.
- Live-LLM tests will be guarded:
  - Only run if `process.env.OPENAI_API_KEY` is set to a non-placeholder value.

---

## Documentation Updates (Required)

- `CHANGELOG.md`
  - Add entry under `[Unreleased]` → `Changed` for the re-organization.
  - Add entry under `[Unreleased]` → `Added` for Jest + test suite.
- `README.md`
  - Add/adjust “Running Tests” section to include Jest test runner.
- `INDEX.md`
  - Add new `src/entrypoints/` directory.
  - Update test counts and list real test files.

---

## Rollback Plan

If anything breaks:

- Revert `src/index.ts` to its prior standalone script.
- Remove Jest config + added dev dependencies.
- Remove `src/entrypoints/` module.

---

## Success Criteria

- `npm run test` behaves as before (demo script).
- New Jest tests run successfully:
  - `npm run test:jest` (or equivalent) executes unit tests without requiring OpenAI.
- No changes to agent/tool behavior.
- Docs updated: `CHANGELOG.md`, `README.md`, `INDEX.md`.

---

## Future Changes (Recommended)

These are **optional** improvements that are likely valuable next steps, but are **not part of the current MVP rebuild**.

### Testing

- Add a small “live LLM” test suite gated behind an environment flag
  - Example: `RUN_LIVE_LLM_TESTS=true` and `OPENAI_API_KEY` set
  - Keep default CI/dev runs fully offline and deterministic
- Add a minimal `tests/INDEX.md` once the tests directory grows
- Add `test:watch` and `test:ci` scripts

### Entrypoints / API boundaries

- Add a second entrypoint function for batch evaluation (still bounded)
  - Example: `generateWcpDecisions([{ content }...])` with concurrency limits
- Consider exporting a type-safe response shape for `generateWcpDecision(...)`
  - Today it forwards Mastra’s response object; a thin wrapper type could improve ergonomics

### Config / environment hygiene

- Implement `src/utils/env-validator.ts` (based on the `.example` file)
  - Validate `OPENAI_API_KEY` and optionally allow overriding model name
- Implement `src/config/app-config.ts` (based on the `.example` file)
  - Centralize defaults like model name, maxSteps, logging verbosity

### Tool robustness (still MVP-friendly)

- Improve `extractWCPTool` parsing for common variations
  - Example: multi-word roles (e.g., “Heavy Equipment Operator”), commas/newlines
- Add explicit validation for hours/wage ranges (the existing `.example` tests assume this)

### Documentation

- Add a short `docs/ARCHITECTURE.md` focused on runtime flow (entrypoint → mastra → agent → tools)
- Add a `docs/TESTING.md` describing when to use demo vs Jest vs live-LLM tests
