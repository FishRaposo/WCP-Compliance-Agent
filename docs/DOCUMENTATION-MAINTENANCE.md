# Documentation Maintenance Guide

**Purpose**: Comprehensive guide for developers to automatically update documentation when making code changes.

**⚠️ MANDATORY**: This guide MUST be followed for EVERY code change.

**Last Updated**: 2025-01-27  
**Version**: 1.0.0

---

## 🎯 Quick Start

**🚨 PRIORITY #1: AUTOMATIC DOCUMENTATION UPDATES ARE MANDATORY**

**BEFORE ANY CODE CHANGE:**

1. **⚠️ MANDATORY: Read this file FIRST** (`docs/DOCUMENTATION-MAINTENANCE.md`)
   - **Understand that documentation updates are AUTOMATIC and MANDATORY**
   - **Documentation updates happen DURING implementation, not after**
   - **Code changes without documentation updates = INCOMPLETE WORK**

2. **⚠️ MANDATORY: Complete Prompt Validation** - Read and complete `docs/PROMPT-VALIDATION.md`
   - Include script-first evaluation in process understanding phase

3. **Identify your change type** - Feature, bug fix, refactor, test, etc.

4. **Copy the checklist** - Use the appropriate checklist below

5. **Keep checklist visible** - While coding, track what needs updating

6. **Update documentation DURING coding** - Not after:
   - ✅ **Update CHANGELOG.md immediately** (REQUIRED - no exceptions)
   - ✅ **Update other docs as you make changes**
   - ✅ **Update "Last Updated" dates in all modified files**

7. **Update ALL required docs** - Before marking complete, verify all items checked

**🚨 CRITICAL: Do not mark work complete until ALL documentation is updated.**

---

## 📋 Automatic Workflow (7 Steps)

### Step 0: Tool Call Limit Awareness (REQUIRED FIRST STEP)
1. ✅ **Assess and optimize tool usage** before ANY operation
   - Plan all tool calls needed (files to read, searches to perform)
   - Batch operations when possible (multiple `read_file` calls in parallel)
   - Choose efficient tools (`grep` vs `codebase_search`, `glob_file_search` vs `list_dir`)
   - Cache information - avoid re-reading files or re-searching patterns
   - See `docs/TOOL-CALL-LIMITS.md` for complete guidelines (if available)

### Step 1: Script-First Evaluation (REQUIRED SECOND STEP)
1. ✅ **Evaluate if task should be automated** (script vs manual)
2. ✅ **If repetitive/complex, create script** in `utils/` directory
   - Include error handling, logging, and documentation
   - See **AGENTS.md** for script-first philosophy
3. ✅ **Decision documented** (why script or why manual)

### Step 2: Prompt Validation (REQUIRED THIRD STEP)
1. ✅ **Complete prompt validation** (`docs/PROMPT-VALIDATION.md` or `docs/PROMPT-VALIDATION-QUICK.md`)
2. ✅ **Include tool call limit assessment** in Phase 5 (Autonomous Operation)
3. ✅ **Include script-first evaluation** in process understanding phase
4. ✅ **All validation gates passed** (Task, Codebase, Requirements, Process, Autonomy)
5. ✅ **All confidence levels ≥ 7/10**

**Only proceed to Step 3 when ALL validation gates are passed.**

### Step 3: Before Coding
1. ✅ **Read** `docs/DOCUMENTATION-MAINTENANCE.md` FIRST
2. ✅ **Identify** change type (feature/bug/test/refactor/architecture)
3. ✅ **Copy** the appropriate checklist from below
4. ✅ **TODO Management** (REQUIRED when creating todos):
   - **If creating todos via `todo_write` tool**: Update `TODO.md` immediately
   - Add new items to appropriate priority section (High/Medium/Low/Future)
   - Include status, priority, overview, requirements, technical details, and notes
   - Update prioritization summary table if counts change
5. ✅ **Keep checklist visible** while working

### Step 4: During Coding
1. ✅ Keep checklist visible
2. ✅ **Write tests alongside code implementation** (REQUIRED):
   - **Unit Tests** (`tests/unit/test_{module}.ts`) - Test isolated modules and functions
   - **Integration Tests** (`tests/integration/test_{feature}_integration.ts`) - Test cross-module workflows
   - **System Tests** (`tests/system/test_{scenario}.ts`) - Test end-to-end scenarios
   - **Workflow Tests** (`tests/workflows/test_{workflow_type}.ts`) - Test complete workflows
3. ✅ **Run tests immediately after writing** (REQUIRED - AUTOMATIC):
   - Run new/modified test files: `npm test tests/unit/test_module.test.ts` or `ts-node tests/unit/test_module.test.ts`
   - Verify new tests pass before continuing
   - Fix any failing tests immediately
4. ✅ **Run full test suite periodically**: `npm test` - Check for regressions
5. ✅ **Update existing tests** as code changes (all test types)
6. ✅ **Run updated tests** - Verify modified tests still pass
7. ✅ Note any unexpected impacts (new features, API changes, etc.)
8. ✅ Update module docstrings if adding new functionality
9. ✅ Add comments explaining non-obvious logic

### Step 5: After Coding (Before Marking Complete)
1. ✅ **Run Full Test Suite**: Execute `npm test` - **CRITICAL**: All tests must pass
   - Verify all new tests pass
   - Verify existing tests still pass (no regressions)
   - Run tests by type if needed (unit/integration/system/workflow)
2. ✅ **Fix any failing tests immediately** - Do not proceed until all tests pass
3. ✅ **Verify Test Coverage**: Ensure new/changed functionality has adequate tests
   - All new code has corresponding tests
   - All modified code has updated tests
   - Edge cases and error conditions are tested
4. ✅ **Update Test Documentation**: Update `tests/INDEX.md` if adding new test files (if available)
5. ✅ Update `CHANGELOG.md` - **REQUIRED FOR EVERY CHANGE**
6. ✅ Update other docs per checklist below
7. ✅ Update "Last Updated" dates in modified files
8. ✅ Verify version numbers are consistent (check `README.md`, `CHANGELOG.md`)

### Step 6: Verification
1. ✅ **All tests pass** (`npm test`) - **CRITICAL**: Must pass before marking complete
   - New tests pass
   - Existing tests still pass (no regressions)
   - All test types run successfully
2. ✅ **Test execution verified**:
   - Tests run automatically during implementation (not just after)
   - Tests are run after each significant change
   - Full test suite run before marking complete
3. ✅ **Test coverage is adequate**
4. ✅ All checklist items completed
5. ✅ Links are valid (no broken references)
6. ✅ Version numbers consistent across files
7. ✅ "Last Updated" dates are current (2025-01-27 or later)

---

## 🔄 Auto-Update Triggers by Change Type

### Feature Addition

**Files to Update:**
- [ ] `CHANGELOG.md` - **REQUIRED** - Add feature to "Added" section
- [ ] `README.md` - Update features list, usage examples
- [ ] `CONTEXT.md` - Update implemented features, architecture if needed
- [ ] `AGENTS.md` - Update patterns, examples if new pattern introduced
- [ ] `WORKFLOW.md` - Update workflows if user-facing feature
- [ ] `EVALS.md` - Update evaluation criteria, test scenarios
- [ ] `TODO.md` - Remove from pending if feature was planned

**Test Requirements:**
- [ ] **Unit Tests**: `tests/unit/test_{feature}.ts` - Test isolated feature logic
- [ ] **Integration Tests**: `tests/integration/test_{feature}_integration.ts` - Test cross-module integration
- [ ] **System Tests**: `tests/system/test_{feature}_system.ts` - Test end-to-end scenarios
- [ ] **Workflow Tests**: `tests/workflows/test_{feature}_workflow.ts` - Test complete workflows (if applicable)

**Documentation Requirements:**
- [ ] Feature description added to README.md
- [ ] Usage examples added to README.md or WORKFLOW.md
- [ ] Architecture changes documented in CONTEXT.md
- [ ] Code patterns documented in AGENTS.md (if new pattern)
- [ ] Test scenarios added to EVALS.md
- [ ] "Last Updated" dates updated in all modified files

---

### Bug Fix

**Files to Update:**
- [ ] `CHANGELOG.md` - **REQUIRED** - Add fix to "Fixed" section
- [ ] `README.md` - Update if fix affects user-facing behavior
- [ ] `AGENTS.md` - Update if fix reveals new pattern or best practice
- [ ] `EVALS.md` - Update if fix affects test scenarios
- [ ] `TODO.md` - Remove from pending if bug was tracked

**Test Requirements:**
- [ ] **Unit Tests**: `tests/unit/test_{bug_fix}.ts` - Test fix for isolated bug
- [ ] **Integration Tests**: `tests/integration/test_{bug_fix}_integration.ts` - Test fix in context
- [ ] **System Tests**: `tests/system/test_{bug_fix}_system.ts` - Test end-to-end fix
- [ ] **Regression Tests**: Ensure existing tests still pass

**Documentation Requirements:**
- [ ] Bug fix description added to CHANGELOG.md
- [ ] Root cause documented (if significant)
- [ ] Prevention strategy documented (if applicable)
- [ ] "Last Updated" dates updated in all modified files

---

### Test Updates

**Files to Update:**
- [ ] `CHANGELOG.md` - **REQUIRED** - Add test updates to "Changed" or "Fixed" section
- [ ] `EVALS.md` - Update if test scenarios change
- [ ] `AGENTS.md` - Update if testing patterns change
- [ ] `tests/INDEX.md` - Update if adding new test files (if available)

**Test Requirements:**
- [ ] **Unit Tests**: Updated/added as needed
- [ ] **Integration Tests**: Updated/added as needed
- [ ] **System Tests**: Updated/added as needed
- [ ] **Workflow Tests**: Updated/added as needed
- [ ] All tests pass after updates

**Documentation Requirements:**
- [ ] Test updates documented in CHANGELOG.md
- [ ] Test scenarios updated in EVALS.md
- [ ] Testing patterns updated in AGENTS.md (if changed)
- [ ] "Last Updated" dates updated in all modified files

---

### Refactoring

**Files to Update:**
- [ ] `CHANGELOG.md` - **REQUIRED** - Add refactoring to "Changed" section
- [ ] `CONTEXT.md` - Update if architecture changes
- [ ] `AGENTS.md` - Update if patterns change
- [ ] `README.md` - Update if user-facing API changes
- [ ] `EVALS.md` - Update if test scenarios change

**Test Requirements:**
- [ ] **Unit Tests**: Updated to match refactored code
- [ ] **Integration Tests**: Updated to match refactored workflows
- [ ] **System Tests**: Updated to match refactored scenarios
- [ ] **Workflow Tests**: Updated to match refactored workflows
- [ ] All tests pass after refactoring

**Documentation Requirements:**
- [ ] Refactoring description added to CHANGELOG.md
- [ ] Architecture changes documented in CONTEXT.md
- [ ] Pattern changes documented in AGENTS.md
- [ ] API changes documented in README.md (if applicable)
- [ ] "Last Updated" dates updated in all modified files

---

## 🚨 Common Mistakes to Avoid

1. **❌ Don't skip CHANGELOG.md** - It's REQUIRED for every change
2. **❌ Don't update docs after coding** - Update DURING coding
3. **❌ Don't skip tests** - Tests are REQUIRED, not optional
4. **❌ Don't skip "Last Updated" dates** - Update in all modified files
5. **❌ Don't skip version numbers** - Keep them consistent
6. **❌ Don't skip validation** - Complete prompt validation first
7. **❌ Don't skip tool call optimization** - Optimize before starting

---

## 📚 Related Documentation

- **Prompt Validation**: `docs/PROMPT-VALIDATION.md` - Complete validation system
- **Quick Validation**: `docs/PROMPT-VALIDATION-QUICK.md` - 5-minute checklist
- **Developer Guide**: `AGENTS.md` - Patterns and conventions
- **Project Context**: `CONTEXT.md` - Architecture and philosophy
- **Changelog**: `CHANGELOG.md` - Version history

---

**Last Updated**: 2025-01-27  
**Version**: 1.0.0
