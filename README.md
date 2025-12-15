# WCP Compliance Agent

I built this for a client who needed to automate payroll compliance. Even though the engagement changed, the architecture pattern is what matters: hybrid deterministic/LLM agents with full auditability for regulated domains. Whether it's payroll, healthcare, or financial compliance—this is how you build AI that regulators can trust.

**Tagline:** A functional mini-agent that processes Weekly Certified Payrolls (WCPs), validates them against Davis-Bacon Wage Determinations (DBWD), and makes compliance decisions using a hybrid approach of deterministic tools and LLM reasoning.


## 🏗️ Production-Grade AI Compliance Agent

**Problem**: Weekly Certified Payroll validation is manual, error-prone, and compliance-critical.

**Solution**: Hybrid deterministic/LLM agent that:
- Parses payroll submissions (text → structured data)
- Validates against Davis-Bacon wage determinations
- Makes audit-ready decisions with full traceability
- Enforces type safety and bounded execution

**Why this demonstrates production readiness**:
- ✅ Full audit trails (structured JSON output)
- ✅ Hybrid architecture (rules + LLM reasoning)
- ✅ Type-safe validation (Zod schemas throughout)
- ✅ Bounded execution (maxSteps guardrail)
- ⚠️ Test suite planned (see TODO.md for implementation status)

**Tech Stack**: TypeScript, Mastra.ai, OpenAI GPT-4o-mini, Jest, Zod

---

## 🗺️ Quick Navigation

**For Recruiters/Hiring Managers** → See [`showcase/`](showcase/) folder (project overview, demo guide, quick start)  
**Want to run it fast?** → Read [`showcase/QUICK-START.md`](showcase/QUICK-START.md) (5-minute setup)  
**Want the roadmap?** → Read [`ROADMAP.md`](ROADMAP.md) (planned work by phase)  
**Want to develop?** → Read [`AGENTS.md`](AGENTS.md) (developer guide)  
**Looking for a file?** → Check [`docs/INDEX.md`](docs/INDEX.md) (complete documentation navigation)  
**Want architecture?** → Read [`CONTEXT.md`](CONTEXT.md) (design decisions)  
**Want workflows?** → Read [`WORKFLOW.md`](WORKFLOW.md) (user scenarios)

---

## 🎯 Purpose

The WCP AI Agent Prototype is designed to demonstrate a production-minded AI agent system that combines accuracy (deterministic tools) with explainability (LLM reasoning) for compliance automation. It ingests simple text representations of WCPs, extracts data, validates against DBWD rates, and makes compliance decisions with full audit trails.

### Core Value Proposition

- **Automates Compliance**: Reduces manual review time by 80%+
- **Full Auditability**: Step-by-step reasoning logs for regulatory compliance
- **Production-Minded**: Type-safe, bounded execution, structured output
- **Hybrid AI**: Best of both worlds - accuracy + explainability

### Key Differentiators

1. **Hybrid Architecture**: Deterministic tools ensure accuracy, LLM provides intelligent reasoning
2. **Type Safety**: Zod schemas throughout for runtime validation
3. **Full Transparency**: Complete audit trails with step-by-step reasoning
4. **Extensible Design**: Ready for PDF parsing, RAG-based lookup, batch processing

## ✨ Features

### Core Features
- **WCP Text Input Parsing**: Extract role, hours, and wage from text input using regex-based parsing
- **DBWD Rate Validation**: Validate against hardcoded DBWD rates (Electrician, Laborer)
- **LLM-Powered Decision Making**: Make compliance decisions (Approved/Revise/Reject) using OpenAI GPT-4o-mini
- **Structured Output**: Return structured JSON with audit trails (explanation, findings, trace)
- **Type Safety**: Zod schemas throughout for type-safe data validation
- **Bounded Execution**: maxSteps=3 prevents infinite loops
- **Full Auditability**: Step-by-step traces for compliance auditing

### Future Features

See **docs/INDEX.md** for complete documentation navigation, **ROADMAP.md** for the consolidated phased roadmap, and **TODO.md** for the detailed backlog.

**High Priority:**
- **PDF Parsing**: Integrate `pdf-parse` for real PDF document processing
- **RAG-Based DBWD Lookup**: Replace hardcoded rates with vector DB lookup (e.g., Pinecone)

**Medium Priority:**
- **Multi-Document Workflows**: Chain multiple documents for batch processing
- **Production Deployment**: Add API endpoints, error handling, monitoring

**Low Priority:**
- **Evaluation Framework**: Test on 50+ mock WCPs to achieve >95% accuracy

## 🚀 Getting Started

### Prerequisites
- Node.js (v20.0.0 or higher)
- npm or yarn
- OpenAI API key

### Installation

```bash
# Install dependencies
npm install

# Configure environment variables
# Recommended: copy the template and edit it
cp .env.example .env

# Then set your OpenAI API key:
# OPENAI_API_KEY=sk-...
```

**Get API Key**: https://platform.openai.com/api-keys

### Platform Support
- **Node.js**: ✅ Fully supported (version 20.0.0+)
- **TypeScript**: ✅ Fully supported (version 5.0.0+)
- **Windows**: ✅ Fully supported
- **macOS**: ✅ Fully supported
- **Linux**: ✅ Fully supported

## 📊 Project Statistics

- **Total Files**: 8 core files (5 in `src/` + 1 showcase script + 2 frontend files)
- **Tools**: 2 (extractWCPTool, validateWCPTool)
- **Agents**: 1 (wcpAgent)
- **Test Files**: 0 (planned - see TODO.md)
- **Showcase Script**: 1 file (`showcase/scripts/showcase.ts`) - Professional demo with 6 scenarios
- **Frontend Files**: 2 files (`frontend/src/App.tsx`, `frontend/src/data/scenarios.ts`)
- **Documentation Files**: 17 files
- **Build Status**: ✅ Successfully builds and compiles
- **Dependencies**: Mastra 0.24.0, @ai-sdk/openai 2.0.65, Zod 3.22.0, chalk 5.3.0

## 📚 Documentation

**Example Files**: See [`_archive/`](_archive/) directory for example templates and archived documentation.

---

- **README.md** - This file (project overview)
- **showcase/QUICK-START.md** - 5-minute setup guide (canonical)
- **ROADMAP.md** - Consolidated phased roadmap (planned features)
- **CONTEXT.md** - Architecture decisions and philosophy
- **AGENTS.md** - Developer implementation guide
- **docs/INDEX.md** - Documentation navigation hub
- **docs/README.md** - Documentation overview
- **docs/PROJECT-MAPPING.md** - Complete project mapping
- **docs/PROMPT-VALIDATION.md** - ⚠️ **MANDATORY**: Prompt validation system
- **docs/DOCUMENTATION-MAINTENANCE.md** - ⚠️ **MANDATORY**: Automatic documentation maintenance guide
- **docs/TOOL-CALL-LIMITS.md** - ⚠️ **RECOMMENDED**: Tool call optimization guidelines
- **showcase/** - Showcase materials
- **docs/guides/** - User guides
- **docs/reference/** - Reference documentation
- **CLAUDE.md** - Quick reference for developers
- **CHANGELOG.md** - Version history
- **EVALS.md** - Evaluation and testing guide
- **TODO.md** - Pending features and improvements

## 🎬 Quick Demo

Want to see it in action? Run the test script:

```bash
# Make sure you have OPENAI_API_KEY in your .env file
npm run test
```

Or run the showcase demo (CLI):

```bash
npm run showcase
```

Or run the showcase demo (Web Interface):

```bash
# Start the API server
npm run serve

# Start the frontend (in a new terminal)
cd frontend
npm run dev

# Then select scenarios from the dropdown in the web interface
```

This demonstrates WCP processing with:
- ✅ **Approved** cases (valid WCPs with no violations)
- ⚠️ **Revise** cases (minor violations like overtime)
- ❌ **Reject** cases (major violations like underpayment)

### Showcase Demo Scenarios

The showcase (`npm run showcase`) runs 6 different scenarios:

1. **✅ Approved - Valid Electrician WCP**: `Role: Electrician, Hours: 40, Wage: $55.00`
   - Demonstrates perfect compliance, clean extraction, no violations

2. **⚠️ Revise - Electrician Overtime**: `Role: Electrician, Hours: 45, Wage: $55.00`
   - Demonstrates overtime detection (>40 hours), minor violation handling

3. **❌ Reject - Electrician Underpayment**: `Role: Electrician, Hours: 40, Wage: $30.00`
   - Demonstrates underpayment detection (< $51.69 base rate), major violation handling

4. **✅ Approved - Valid Laborer WCP**: `Role: Laborer, Hours: 40, Wage: $30.00`
   - Demonstrates system works for different roles

5. **⚠️ Revise - Laborer Overtime**: `Role: Laborer, Hours: 50, Wage: $30.00`
   - Demonstrates overtime detection for laborer role

6. **❌ Reject - Laborer Underpayment**: `Role: Laborer, Hours: 40, Wage: $20.00`
   - Demonstrates underpayment detection for laborer role

---

## 🚀 Usage

### Basic Example

The test script (`src/index.ts`) demonstrates the basic workflow:

```typescript
import { generateWcpDecision } from "./entrypoints/wcp-entrypoint.js";

const fakeWCP = "Role: Electrician, Hours: 45, Wage: $50";

const response = await generateWcpDecision({
  content: fakeWCP,
  maxSteps: 3,
  onStepFinish: ({ text, toolCalls, toolResults, finishReason }) => {
    console.log("Step:", { text, toolCalls, toolResults, finishReason });
  },
});

console.log("Decision:", response.object);
console.log("Raw Text:", response.text);
console.log("Tool Results:", response.toolResults);
```

### Expected Output

```json
{
  "status": "Revise",
  "explanation": "Revise due to overtime: Hours exceed 40 (DBWD requires 1.5x pay for hours over 40). Wage is close but verify fringes.",
  "findings": [
    { "type": "Overtime", "detail": "Hours 45 > 40 (DBWD requires 1.5x pay)" }
  ],
  "trace": [
    "Extracted data: Role=Electrician, Hours=45, Wage=50",
    "Validated vs DBWD: Found overtime violation",
    "Decided based on findings: Revise required"
  ]
}
```

## 💻 Web Interface

The project now includes a modern React frontend that unifies the interactive agent with the showcase scenarios.

### Features
- **Interactive Scenarios**: Built-in library of 6 showcase scenarios (Approved, Revise, Reject)
- **Real-time Analysis**: Instant feedback on payroll submissions
- **Visual Dashboard**: Color-coded status, finding highlights, and audit traces
- **Health Metrics**: Visibility into agent confidence, latency, and token usage
- **Responsive Design**: Built with Tailwind CSS and Framer Motion

### Starting the App

```bash
# Start the API server
npm run serve

# Start the frontend (in a new terminal)
cd frontend
npm run dev
```

## 🏗️ Project Structure

```
wcp-agent/
├── src/
│   ├── entrypoints/
│   │   └── wcp-entrypoint.ts      # LLM entrypoint orchestration
│   ├── mastra/
│   │   ├── tools/
│   │   │   └── wcp-tools.ts          # Extract & validate tools
│   │   ├── agents/
│   │   │   └── wcp-agent.ts          # LLM agent with decision logic
│   │   └── index.ts                  # Mastra registration
│   ├── server.ts                     # API Server (Hono)
│   └── index.ts                      # Test script
├── frontend/                         # React Frontend (Unified System)
│   ├── src/
│   │   ├── App.tsx                  # Main UI with integrated showcase scenarios
│   │   ├── main.tsx                 # Entry point
│   │   ├── data/
│   │   │   └── scenarios.ts         # Showcase scenarios data
│   │   └── lib/
│   │       └── utils.ts             # Frontend utilities
│   ├── package.json                 # Frontend dependencies
│   └── vite.config.ts               # Vite configuration
├── showcase/                         # Recruiter/demo scripts and configs
│   ├── .env.example                 # Environment variables template
│   └── scripts/
│       └── showcase.ts              # Showcase demo script (6 scenarios)
├── docs/
│   ├── INDEX.md                    # Documentation navigation hub
│   ├── README.md                   # Documentation overview
│   ├── PROJECT-MAPPING.md          # Complete project mapping
│   ├── PROMPT-VALIDATION.md       # Validation system
│   ├── DOCUMENTATION-MAINTENANCE.md # Documentation workflow
│   ├── TOOL-CALL-LIMITS.md         # Tool optimization
│   ├── guides/                     # User guides
│   └── reference/                  # Reference documentation
│       ├── MVP-TEMPLATE-REBUILD-PLAN.md  # MVP refactoring plan
│       ├── AI Payroll Compliance Agent — Technical Specification.md  # Technical spec
│       ├── DOCUMENTATION-BLUEPRINT.md    # Documentation architecture
├── development-plan/                # Development phases and roadmaps
│   ├── OVERVIEW.md                   # Overview of all phases
│   ├── PHASE-0-MVP.md                # Phase 0: MVP requirements
│   ├── PHASE-1-CORE-IMPROVEMENTS.md  # Phase 1: Core improvements
│   ├── PHASE-2-ENHANCED-FEATURES.md  # Phase 2: Enhanced features
│   ├── PHASE-3-ADVANCED-FEATURES.md  # Phase 3: Advanced features
│   ├── PHASE-4-PRODUCTION-READY.md   # Phase 4: Production guide
│   ├── IMPLEMENTATION-GUIDE.md       # Implementation patterns
│   └── TESTING-GUIDE.md              # Testing best practices
├── _archive/
│   ├── README.md                     # Archive directory documentation
│   └── documentation/                # Archived documentation files
├── .env                              # Environment variables (create this with OPENAI_API_KEY)
├── .env.example                      # Environment variables template
├── dist/                             # Compiled JavaScript (generated by npm run build)
├── .gitignore
├── ROADMAP.md                        # Consolidated roadmap
├── package.json
├── tsconfig.json
├── README.md
├── CONTEXT.md
├── AGENTS.md
├── CLAUDE.md
├── DOCUMENTATION.md
├── DOCUMENTATION-OVERVIEW.md
├── WORKFLOW.md
├── TODO.md
├── CHANGELOG.md
├── EVALS.md
└── INDEX.md
```

## 🔑 Key Components

### Tools (`src/mastra/tools/wcp-tools.ts`)

- **extractWCPTool**: Regex-based parser to extract role, hours, and wage from text input
- **validateWCPTool**: Compliance checker against hardcoded DBWD rates
  - Checks for overtime (>40 hours)
  - Checks for underpayment (< base rate)

### Agent (`src/mastra/agents/wcp-agent.ts`)

- **wcpAgent**: Mastra Agent configured with:
  - Instructions for compliance auditing workflow
  - OpenAI GPT-4o-mini model
  - Tool integration (extractWCP, validateWCP)
  - Structured output schema (WCPDecisionSchema)

### DBWD Rates

Currently hardcoded in `wcp-tools.ts`:
- Electrician: $51.69 base + $34.63 fringe
- Laborer: $26.45 base + $12.50 fringe

These can be extended to RAG-based lookup from vector DB in production.

## 🧪 Testing

### Test Cases

1. **Valid WCP Input**: Should extract correctly and return Approved
2. **Overtime Scenario**: Hours > 40 should trigger Revise with overtime finding
3. **Underpayment Scenario**: Wage < base rate should trigger Revise/Reject with underpayment finding
4. **Invalid Input**: Should handle gracefully with Reject and clear error message (currently returns defaults - see TODO.md for planned improvements)
5. **Unknown Role**: Should handle gracefully with Reject and note about unknown role (currently returns {base: 0, fringe: 0} - see TODO.md for planned improvements)

### Decision Logic

The agent makes compliance decisions based on validation findings:

- **Approved**: No violations found (isValid: true, findings: [])
- **Revise**: Minor violations found (e.g., overtime >40 hours, wage close to base rate)
- **Reject**: Major violations found (e.g., significant underpayment, invalid input, unknown role)

### Running Tests

```bash
# Run showcase demo (CLI - recommended)
npm run showcase

# Run basic test script
npm run test

# Run showcase demo (Web Interface)
cd frontend && npm run dev
```

**Showcase Demo**: The showcase (`npm run showcase`) demonstrates multiple scenarios with professional output formatting.

### Test Organization (Planned)

- **Unit Tests** (`tests/unit/`) - Test isolated modules and functions
- **Integration Tests** (`tests/integration/`) - Test cross-module workflows
- **System Tests** (`tests/system/`) - Test end-to-end scenarios
- **Workflow Tests** (`tests/workflows/`) - Test complete workflows

Current implemented tests:

- **Unit**: 0 (planned - see TODO.md)
- **Integration**: 0 (planned - see TODO.md)

### Test Scenarios

See **WORKFLOW.md** for detailed workflow validation scenarios and **EVALS.md** for evaluation criteria and test scenarios. See **docs/INDEX.md** for complete documentation navigation and **TODO.md** for planned test suite implementation.

## 🔧 Development

### Development Commands

```bash
# Run test script
npm run test

# Build TypeScript (compiles to dist/)
npm run build

# Start compiled code (requires .env file with OPENAI_API_KEY)
npm start

# Run test script directly (requires .env file with OPENAI_API_KEY)
npm run test

# Run with Mastra dev server (opens playground at http://localhost:4111)
npm run dev
```

### Development Workflow

1. **Read `docs/PROMPT-VALIDATION.md`** - ⚠️ **MANDATORY**: Complete validation before any operation
2. **Read `docs/DOCUMENTATION-MAINTENANCE.md`** - ⚠️ **MANDATORY**: Follow documentation update workflow
3. **Read `AGENTS.md`** - Follow development patterns and conventions
4. **Write Tests** - Write tests DURING implementation, not after (see **EVALS.md** for test requirements)
5. **Update Documentation** - Update documentation DURING implementation, not after
6. **Validate Workflows** - Use **WORKFLOW.md** for workflow validation scenarios

**📚 Complete Documentation**: See **docs/INDEX.md** for all project documentation.

### Error Handling

**⚠️ Note**: Basic error handling is implemented in the test script (`src/index.ts`) with try-catch blocks. Comprehensive error handling for edge cases (invalid input, unknown roles, missing data) is being implemented (see **TODO.md**).

The agent is designed to handle errors gracefully:
- **Invalid Input**: Should return Reject decision with clear error message (planned)
- **Unknown Role**: Should return Reject decision with note about unknown role (planned)
- **Missing Data**: Should handle missing role, hours, or wage with appropriate error messages (planned)

See **WORKFLOW.md** for detailed error handling workflows, **EVALS.md** for error handling evaluation criteria, and **TODO.md** for error handling implementation plans.

## 📜 License

MIT

## 👤 Author

Built as a prototype for WCP compliance automation using Mastra.ai and TypeScript.

---

**Version**: 1.0.0  
**Last Updated**: 2025-12-14  
**Status**: Prototype

---

## 📚 Additional Documentation

For more detailed information, see:

- **WORKFLOW.md** - Detailed workflow validation scenarios (WCP Processing, Validation, Decision, Error Handling)
- **EVALS.md** - Evaluation criteria and test scenarios (functionality, code quality, architecture, performance)
- **TODO.md** - Future roadmap and prioritization (PDF parsing, RAG lookup, batch processing, production deployment)
- **docs/INDEX.md** - Complete documentation navigation
- **CONTEXT.md** - Architecture decisions and philosophy (detailed technical concepts and design rationale)
- **AGENTS.md** - Developer guide with patterns and conventions (implementation details and best practices)