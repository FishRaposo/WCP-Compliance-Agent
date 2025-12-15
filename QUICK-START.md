# ⚡ Quick Start - WCP AI Agent Prototype

**Get running in 60 seconds with our automated setup!**

## 🚀 One-Command Setup

```bash
# Clone and setup in one command
git clone <repository-url> wcp-ai-agent
cd wcp-ai-agent
npm run setup
```

That's it! The setup wizard will:
- ✅ Check prerequisites (Node.js 20+)
- ✅ Install all dependencies
- ✅ Configure your OpenAI API key
- ✅ Validate everything works
- ✅ Run a quick demo

## 🎯 What Happens Next?

After setup, you'll see:

```
🎉 Welcome to WCP AI Agent Prototype!

Quick Start Commands:
  npm run showcase    # Run full demo (6 scenarios)
  npm run serve        # Start API server
  npm test             # Run tests

Ready to automate WCP compliance! 🚀
```

## 🧪 Try It Out

### Option 1: See the Demo
```bash
npm run showcase
```
Watch 6 compliance scenarios in action!

### Option 2: Test the API
```bash
# Start server
npm run serve

# In another terminal:
curl -X POST http://localhost:3000/analyze \
  -H "Content-Type: application/json" \
  -d '{"content": "Role: Electrician, Hours: 45, Wage: $50"}'
```

### Option 3: Use the Web UI
```bash
# Terminal 1: Start API
npm run serve

# Terminal 2: Start frontend
cd frontend && npm run dev

# Open: http://localhost:5173
```

## 🔧 Need Help?

**Missing API Key?**
```bash
npm run setup  # Re-run to configure
```

**Something went wrong?**
```bash
# Check everything is working
npm run validate

# Reinstall if needed
rm -rf node_modules package-lock.json
npm install
npm run setup
```

## 📚 Want to Learn More?

- **[showcase/README.md](showcase/README.md)** - Showcase documentation
- **[README.md](README.md)** - Full project documentation
- **[TODO.md](TODO.md)** - Development roadmap

---

*Setup takes ~60 seconds on a typical connection. OpenAI API key required.*
