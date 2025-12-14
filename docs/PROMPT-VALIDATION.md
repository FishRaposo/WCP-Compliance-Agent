# Prompt Validation System

**Purpose**: Autonomous validation system to ensure developers fully understand their tasks and operational context before executing any work.

**⚠️ MANDATORY**: Complete this validation BEFORE starting any task.

**Last Updated**: 2025-01-27  
**Version**: 1.0.0

---

## 🎯 Overview

This validation system ensures developers:

1. **Understand the task** - What needs to be done and why
2. **Understand the context** - Codebase, architecture, and constraints
3. **Understand the requirements** - Success criteria, constraints, and expectations
4. **Understand the process** - How to execute, validate, and document
5. **Can operate autonomously** - Have all information needed without human intervention

**This validation must be completed BEFORE any code changes, documentation updates, or system modifications.**

---

## 🔍 Pre-Operation Validation Checklist

### Phase 1: Task Understanding

**Objective**: Clearly understand what needs to be done and why.

**Checklist**:
- [ ] **What**: What is the specific task or feature being requested?
- [ ] **Why**: What is the business reason or technical need for this task?
- [ ] **Scope**: What is included in this task? What is explicitly excluded?
- [ ] **Constraints**: Are there any limitations, deadlines, or constraints?
- [ ] **Success Criteria**: How will I know when this task is complete?
- [ ] **Dependencies**: Are there any prerequisites or dependencies?
- [ ] **Impact**: What parts of the system will be affected?

**Confidence Level**: ___ / 10 (Must be ≥ 7/10 to proceed)

---

### Phase 2: Codebase Understanding

**Objective**: Understand the codebase architecture, patterns, and relevant code.

**Checklist**:
- [ ] **Architecture**: What is the overall architecture of the WCP AI Agent?
- [ ] **Relevant Files**: Which files will be affected by this change?
- [ ] **Patterns**: What patterns and conventions are used in this codebase?
- [ ] **Dependencies**: What dependencies and libraries are used?
- [ ] **Testing**: What is the testing structure and approach?
- [ ] **Code Locations**: Where is the relevant code located?
  - Tools: `src/mastra/tools/wcp-tools.ts`
  - Agents: `src/mastra/agents/wcp-agent.ts`
  - Mastra Registration: `src/mastra/index.ts`
  - Test Script: `src/index.ts`
- [ ] **Related Code**: Have I reviewed related code that might be affected?

**Confidence Level**: ___ / 10 (Must be ≥ 7/10 to proceed)

---

### Phase 3: Requirements Understanding

**Objective**: Understand functional, non-functional, and quality requirements.

**Checklist**:
- [ ] **Functional Requirements**: What functionality must be delivered?
- [ ] **Non-Functional Requirements**: What are the performance, security, or scalability requirements?
- [ ] **Quality Requirements**: What are the code quality standards?
- [ ] **Edge Cases**: What edge cases or error conditions must be handled?
- [ ] **User Impact**: How will users interact with this feature?
- [ ] **Backwards Compatibility**: Must this change be backwards compatible?
- [ ] **Documentation**: What documentation must be updated?

**Confidence Level**: ___ / 10 (Must be ≥ 7/10 to proceed)

---

### Phase 4: Process Understanding

**Objective**: Understand how to execute, test, and document the change.

**Checklist**:
- [ ] **Execution Plan**: Do I have a clear step-by-step execution plan?
- [ ] **Script-First Evaluation**: Should this task be automated with a script?
  - Is this a repetitive task that would benefit from automation?
  - Would a script improve consistency or reduce errors?
  - See `AGENTS.md` for script-first philosophy
- [ ] **Testing Plan**: What tests need to be written or updated?
  - Unit tests: `tests/unit/`
  - Integration tests: `tests/integration/`
  - System tests: `tests/system/`
  - Workflow tests: `tests/workflows/`
- [ ] **Test Execution**: When and how will tests be run?
- [ ] **Documentation Plan**: What documentation needs to be updated?
  - README.md, CONTEXT.md, AGENTS.md, CHANGELOG.md, etc.
  - See `docs/DOCUMENTATION-MAINTENANCE.md` for complete checklist
- [ ] **Validation Plan**: How will I validate that the change works correctly?

**Confidence Level**: ___ / 10 (Must be ≥ 7/10 to proceed)

---

### Phase 5: Autonomous Operation Capability

**Objective**: Ensure I have all information needed to complete the task without human intervention.

**Checklist**:
- [ ] **Information Completeness**: Do I have all the information needed?
- [ ] **Error Handling**: Do I know how to handle errors and edge cases?
- [ ] **Tool Call Limit Assessment** (REQUIRED):
  - [ ] **Planned Tool Calls**: Have I identified all tool calls needed?
  - [ ] **Batching Strategy**: Can I batch operations (e.g., multiple `read_file` calls in parallel)?
  - [ ] **Tool Efficiency**: Am I using the most efficient tools?
    - Use `grep` for exact string searches (faster than `codebase_search`)
    - Use `glob_file_search` for file pattern searches (faster than `list_dir`)
    - Use `codebase_search` for semantic searches (when exact patterns aren't known)
  - [ ] **Redundancy Avoidance**: Am I avoiding re-reading files or re-searching patterns?
  - [ ] **Information Caching**: Am I caching information to avoid redundant operations?
  - [ ] **Reference**: See `docs/TOOL-CALL-LIMITS.md` for complete optimization guidelines
- [ ] **Autonomous Execution**: Can I complete this task without asking for clarification?
- [ ] **Error Resolution**: Do I know how to resolve common errors?

**Confidence Level**: ___ / 10 (Must be ≥ 7/10 to proceed)

---

## ✅ Validation Self-Assessment

**Complete this self-assessment before proceeding:**

1. **Task Clarity**: Do I clearly understand what needs to be done? (Y/N)
2. **Codebase Understanding**: Do I understand the relevant code? (Y/N)
3. **Requirements Clarity**: Are the requirements clear and complete? (Y/N)
4. **Execution Plan**: Do I have a clear execution plan? (Y/N)
5. **Tool Call Optimization**: Have I optimized my tool usage? (Y/N)
6. **Autonomous Capability**: Can I complete this task autonomously? (Y/N)

**Overall Confidence**: ___ / 10 (Must be ≥ 7/10 to proceed)

---

## 🚦 Validation Gates

**All gates must pass before proceeding:**

### Gate 1: Task Understanding
- [ ] Task is clearly understood
- [ ] Scope is defined
- [ ] Success criteria are clear
- [ ] Confidence level ≥ 7/10

### Gate 2: Codebase Understanding
- [ ] Relevant code has been reviewed
- [ ] Architecture is understood
- [ ] Patterns and conventions are known
- [ ] Confidence level ≥ 7/10

### Gate 3: Requirements Understanding
- [ ] Functional requirements are clear
- [ ] Non-functional requirements are understood
- [ ] Edge cases are identified
- [ ] Confidence level ≥ 7/10

### Gate 4: Process Understanding
- [ ] Execution plan is clear
- [ ] Testing plan is defined
- [ ] Documentation plan is ready
- [ ] Script-first evaluation completed
- [ ] Confidence level ≥ 7/10

### Gate 5: Autonomous Operation Capability
- [ ] All information is available
- [ ] Tool call optimization completed
- [ ] Batching strategy verified
- [ ] Efficient tools chosen
- [ ] Redundancy avoided
- [ ] Error handling plan is ready
- [ ] Confidence level ≥ 7/10

**🚨 CRITICAL**: Do not proceed until ALL gates are passed.

---

## 📋 Task-Specific Checklists

### Feature Addition
- [ ] Phase 1-5 validation completed
- [ ] Feature design reviewed
- [ ] Test plan created
- [ ] Documentation plan ready
- [ ] Tool call optimization verified

### Bug Fix
- [ ] Phase 1-5 validation completed
- [ ] Bug root cause identified
- [ ] Fix approach planned
- [ ] Test plan for regression created
- [ ] Tool call optimization verified

### Refactoring
- [ ] Phase 1-5 validation completed
- [ ] Refactoring scope defined
- [ ] Impact analysis completed
- [ ] Test coverage verified
- [ ] Tool call optimization verified

### Documentation Update
- [ ] Phase 1-5 validation completed
- [ ] Documentation scope defined
- [ ] Related files identified
- [ ] Update plan ready
- [ ] Tool call optimization verified

---

## 🔧 Error Resolution Guidance

**If confidence level < 7/10:**

1. **Review Documentation**: Read relevant documentation (README.md, CONTEXT.md, AGENTS.md)
2. **Search Codebase**: Use `codebase_search` to find similar implementations
3. **Ask Questions**: If still unclear, ask for clarification
4. **Re-validate**: Complete validation again after gathering more information

**Common Issues:**

- **Unclear Requirements**: Review task description, check related documentation
- **Unknown Codebase**: Read CONTEXT.md and AGENTS.md, explore codebase
- **Missing Information**: Search codebase, check documentation, ask for clarification
- **Tool Call Limits**: Optimize tool usage, batch operations, cache information

---

## 📚 Related Documentation

- **AGENTS.md** - Developer guide with patterns and conventions
- **CONTEXT.md** - Project architecture and philosophy
- **docs/DOCUMENTATION-MAINTENANCE.md** - Documentation update guidelines
- **docs/PROMPT-VALIDATION-QUICK.md** - Quick 5-minute validation checklist
- **docs/TOOL-CALL-LIMITS.md** - Tool call optimization guidelines (if available)

---

**Last Updated**: 2025-01-27  
**Version**: 1.0.0
