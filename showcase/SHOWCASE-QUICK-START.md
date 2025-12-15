# Showcase Quick Start Guide

**Purpose**: Quick reference for running and demonstrating the WCP AI Agent Prototype showcase.

**Last Updated**: 2025-01-27

---

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment

Create `.env` file in project root:

```bash
OPENAI_API_KEY=your_openai_api_key_here
```

### 3. Run Showcase

```bash
npm run showcase
```

That's it! The showcase will run 6 scenarios automatically.

---

## 📊 What You'll See

The showcase demonstrates:

1. **✅ Approved** - Valid WCP (Electrician, 40 hours, $55)
2. **⚠️ Revise** - Overtime violation (Electrician, 45 hours, $55)
3. **❌ Reject** - Underpayment violation (Electrician, 40 hours, $30)
4. **✅ Approved** - Valid Laborer WCP
5. **⚠️ Revise** - Laborer overtime
6. **❌ Reject** - Laborer underpayment

---

## 🎯 Key Highlights

- **Hybrid AI**: Deterministic tools + LLM reasoning
- **Type Safety**: Zod schemas throughout
- **Audit Trails**: Step-by-step reasoning logs
- **Professional Output**: Color-coded, formatted results

---

## 📝 Customization

Edit `showcase/scripts/showcase.ts` to:
- Add more scenarios
- Change input values
- Modify output formatting

---

**See**: `SHOWCASE.md` for comprehensive guide with talking points.

