# Prompt Validation - Quick Checklist

**Purpose**: Rapid validation checklist for developers. Complete this BEFORE any operation.

**Full Version**: See `docs/PROMPT-VALIDATION.md` for detailed validation.

**Last Updated**: 2025-01-27

---

## ⚡ 5-Minute Quick Validation

### Phase 1: Task Understanding (1 minute)
- [ ] **What**: Task clearly understood?
- [ ] **Why**: Business reason clear?
- [ ] **Scope**: What's included/excluded?
- [ ] **Success**: How will I know it's complete?

### Phase 2: Codebase Understanding (1 minute)
- [ ] **Architecture**: Understand WCP AI Agent structure?
- [ ] **Files**: Know which files will be affected?
  - Tools: `src/mastra/tools/wcp-tools.ts`
  - Agents: `src/mastra/agents/wcp-agent.ts`
  - Mastra: `src/mastra/index.ts`
  - Test: `src/index.ts`
- [ ] **Patterns**: Understand code patterns?

### Phase 3: Requirements Understanding (1 minute)
- [ ] **Functional**: Requirements clear?
- [ ] **Quality**: Code quality standards known?
- [ ] **Edge Cases**: Edge cases identified?
- [ ] **Documentation**: Documentation plan ready?

### Phase 4: Process Understanding (1 minute)
- [ ] **Plan**: Execution plan clear?
- [ ] **Script-First**: Should this be automated?
- [ ] **Tests**: Test plan defined?
- [ ] **Docs**: Documentation checklist ready?

### Phase 5: Autonomous Operation (1 minute)
- [ ] **Information**: All information available?
- [ ] **Tool Calls**: Tool usage optimized?
  - Batched operations?
  - Efficient tools chosen?
  - Redundancy avoided?
- [ ] **Errors**: Error handling plan ready?
- [ ] **Autonomous**: Can complete without help?

---

## 🚦 Go/No-Go Decision

**✅ GO if:**
- All gates checked above
- Confidence ≥ 7/10 in all areas
- Execution plan clear
- Documentation checklist ready
- Tool call optimization verified

**⛔ NO-GO if:**
- Any gate unchecked
- Confidence < 7/10 in any area
- Missing information
- Ambiguous requirements
- Tool calls not optimized

---

## 📋 Quick Confidence Check

Rate your confidence (1-10) for each phase:

- **Phase 1 (Task)**: ___ / 10
- **Phase 2 (Codebase)**: ___ / 10
- **Phase 3 (Requirements)**: ___ / 10
- **Phase 4 (Process)**: ___ / 10
- **Phase 5 (Autonomous)**: ___ / 10

**Overall Confidence**: ___ / 10 (Must be ≥ 7/10 to proceed)

---

## 🔧 If Confidence < 7/10

1. **Review**: Read relevant documentation (README.md, CONTEXT.md, AGENTS.md)
2. **Search**: Use `codebase_search` to find similar implementations
3. **Ask**: If still unclear, ask for clarification
4. **Re-validate**: Complete validation again after gathering information

---

## 📚 Related Documentation

- **Full Validation**: `docs/PROMPT-VALIDATION.md` - Complete 5-phase validation system
- **Developer Guide**: `AGENTS.md` - Patterns and conventions
- **Project Context**: `CONTEXT.md` - Architecture and philosophy
- **Documentation Maintenance**: `docs/DOCUMENTATION-MAINTENANCE.md` - Update guidelines

---

**Last Updated**: 2025-01-27
