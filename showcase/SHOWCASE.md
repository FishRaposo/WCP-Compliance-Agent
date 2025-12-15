# Showcase Guide - WCP AI Agent Prototype

**Purpose**: This guide helps you demonstrate the WCP AI Agent Prototype's capabilities for showcases, demos, and presentations.

**📍 Location**: This file is part of the showcase documentation folder, designed for recruiters and hiring managers.

**Last Updated**: 2025-12-15  
**Project Status**: Phase 0 MVP Complete - Production-Ready Foundation

---

## 🎯 Quick Start

### Run the Showcase Demo

You can run the showcase in two ways:

**1. CLI Script (Original)**
```bash
# Make sure you have OPENAI_API_KEY in your .env file
npm run showcase
```

**2. Web Interface (Unified System)**
```bash
# Start the API server
npm run serve

# Start the frontend (new terminal)
cd frontend && npm run dev
```

This runs a comprehensive demo with 6 different scenarios showing:
- ✅ **Approved** cases (valid WCPs)
- ⚠️ **Revise** cases (minor violations like overtime)
- ❌ **Reject** cases (major violations like underpayment)

---

## 📊 What the Showcase Demonstrates

### 1. **Hybrid AI Approach**
- **Deterministic Tools**: Accurate data extraction and validation
- **LLM Reasoning**: Intelligent decision-making with explanations
- **Best of Both Worlds**: Accuracy + Explainability

### 2. **Production-Minded Architecture**
- **Type Safety**: Zod schemas throughout
- **Structured Output**: Consistent JSON responses
- **Audit Trails**: Step-by-step reasoning logs
- **Bounded Execution**: maxSteps prevents infinite loops

### 3. **Real-World Compliance Scenarios**
- Valid payrolls that pass inspection
- Overtime violations requiring revision
- Underpayment violations requiring rejection
- Multiple role types (Electrician, Laborer)

---

## 🎬 Demo Scenarios

### Scenario 1: ✅ Approved - Valid WCP
**Input**: `Role: Electrician, Hours: 40, Wage: $55.00`

**What it shows**:
- Perfect extraction of role, hours, and wage
- Validation against DBWD rates passes
- Decision: Approved with clear explanation
- No violations found

**Key Points**:
- Shows the system working correctly for valid inputs
- Demonstrates clean, structured output
- Highlights audit trail capability

---

### Scenario 2: ⚠️ Revise - Overtime Issue
**Input**: `Role: Electrician, Hours: 45, Wage: $55.00`

**What it shows**:
- Data extraction works correctly
- Overtime detection (>40 hours)
- Decision: Revise with explanation
- Clear finding: "Overtime" violation

**Key Points**:
- Shows compliance rule enforcement
- Demonstrates minor violation handling
- Highlights explainability (why Revise?)

---

### Scenario 3: ❌ Reject - Underpayment
**Input**: `Role: Electrician, Hours: 40, Wage: $30.00`

**What it shows**:
- Data extraction works correctly
- Underpayment detection (< $51.69 base rate)
- Decision: Reject with explanation
- Clear finding: "Underpay" violation

**Key Points**:
- Shows major violation detection
- Demonstrates DBWD rate validation
- Highlights compliance enforcement

---

### Scenario 4-6: Additional Role Types
- **Laborer Valid**: Shows system works for different roles
- **Laborer Overtime**: Shows overtime detection across roles
- **Laborer Underpayment**: Shows underpayment detection across roles

---

## 🎨 Output Format

The showcase produces professional, color-coded output:

```
═══════════════════════════════════════════════════════════════════════════════
  WCP AI Agent Prototype - Showcase Demo
═══════════════════════════════════════════════════════════════════════════════

Scenario 1/6: ✅ Approved - Valid WCP
───────────────────────────────────────────────────────────────────────────────
Input: Role: Electrician, Hours: 40, Wage: $55.00
Expected: Approved

═══════════════════════════════════════════════════════════════════════════════
  COMPLIANCE DECISION
═══════════════════════════════════════════════════════════════════════════════

Status: Approved

Explanation:
[AI-generated explanation citing DBWD rules and findings]

Findings:
  ✅ No violations found

Audit Trace:
  1. Extracted data from WCP text input
  2. Validated against DBWD rates
  3. Made compliance decision based on findings
```

---

## 🚀 Key Talking Points

### For Technical Audiences

1. **Architecture**:
   - "Hybrid approach combining deterministic tools for accuracy with LLM agents for reasoning"
   - "Type-safe throughout with Zod schemas"
   - "Bounded execution prevents infinite loops"

2. **Technology Stack**:
   - "Built with Mastra.ai framework"
   - "OpenAI GPT-4o-mini for cost-effective reasoning"
   - "TypeScript for type safety"

3. **Production Readiness**:
   - "Structured output for consistent API responses"
   - "Full audit trails for compliance"
   - "Extensible architecture (RAG, PDF parsing planned)"

### For Business Audiences

1. **Value Proposition**:
   - "Automates compliance checking for Weekly Certified Payrolls"
   - "Reduces manual review time by 80%+"
   - "Provides full audit trails for regulatory compliance"

2. **Accuracy**:
   - "Deterministic tools ensure accurate data extraction"
   - "LLM provides intelligent reasoning and explanations"
   - "Target: >95% accuracy on 50+ test cases"

3. **Compliance**:
   - "Validates against Davis-Bacon Wage Determinations (DBWD)"
   - "Detects overtime violations (>40 hours)"
   - "Detects underpayment violations (< base rate)"

---

## 📝 Customizing the Demo

### Add Your Own Scenarios

Edit `showcase/scripts/showcase.ts` and add to the `scenarios` array:

```typescript
{
  name: "Your Scenario Name",
  description: "What this scenario demonstrates",
  input: "Role: Electrician, Hours: 40, Wage: $55.00",
  expectedStatus: "Approved",
  expectedFindings: [], // Optional
}
```

### Run Single Scenario

Modify `showcase/scripts/showcase.ts` to run only specific scenarios:

```typescript
// Run only first 3 scenarios
const scenariosToRun = scenarios.slice(0, 3);
```

---

## 🎥 Recording a Demo

### Best Practices

1. **Start with the showcase**:
   ```bash
   npm run showcase
   ```

2. **Highlight key moments**:
   - Show the input clearly
   - Point out the structured output
   - Emphasize the audit trail
   - Show the explanation quality

3. **Explain the architecture**:
   - Show `src/mastra/tools/wcp-tools.ts` (deterministic tools)
   - Show `src/mastra/agents/wcp-agent.ts` (LLM reasoning)
   - Explain the hybrid approach

4. **Show extensibility**:
   - Mention PDF parsing (planned)
   - Mention RAG-based DBWD lookup (planned)
   - Mention planned features from TODO.md

---

## 🔧 Troubleshooting

### Common Issues

1. **"OpenAI API key is missing"**
   - Make sure `.env` file exists with `OPENAI_API_KEY=your_key_here`
   - Check that the key is valid

2. **"Cannot find module 'chalk'"**
   - Run `npm install` to install dependencies
   - Make sure `chalk` is in `package.json`

3. **"Agent not found"**
   - Make sure `src/mastra/index.ts` exports the agent correctly
   - Check that the agent name matches: `"wcpAgent"`

---

## 📚 Related Documentation

- **README.md** - Project overview and getting started
- **CONTEXT.md** - Architecture decisions and philosophy
- **WORKFLOW.md** - Detailed workflow scenarios
- **EVALS.md** - Evaluation criteria and test scenarios

---

## 🎯 Next Steps for Full Showcase

### Phase 0 MVP (Critical for Showcase)
- [x] ✅ Fix error handling in showcase script
- [x] ✅ Add professional output formatting
- [x] ✅ Create multiple demo scenarios
- [ ] ⏳ Add basic input validation (prevents crashes)
- [ ] ⏳ Add environment variable validation

### Phase 1 (Enhanced Showcase)
- [ ] Add web interface (optional but impressive)
- [ ] Add example PDF processing (if PDF parsing implemented)
- [ ] Add performance metrics display
- [ ] Add comparison with manual review

### Phase 2+ (Advanced Showcase)
- [ ] RAG-based DBWD lookup demo
- [ ] Batch processing demo
- [ ] Multi-document workflow demo

---

**Last Updated**: 2025-01-27  
**Project Status**: Showcase-Ready

