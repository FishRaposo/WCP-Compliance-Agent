# Operations Guide - WCP AI Agent Prototype

**Purpose**: Complete guide for deploying and operating the WCP AI Agent Prototype, including deployment instructions and troubleshooting.

**Last Updated**: 2025-12-14  
**Status**: Prototype  
**Version**: 1.0.0

---

## Table of Contents

- [Deployment](#deployment)
  - [Pre-Deployment Checklist](#pre-deployment-checklist)
  - [Deployment Steps](#deployment-steps)
  - [Monitoring & Maintenance](#monitoring--maintenance)
  - [Performance Monitoring](#performance-monitoring)
  - [Security Considerations](#security-considerations)
  - [Scaling Considerations](#scaling-considerations)
- [Troubleshooting](#troubleshooting)
  - [Common Issues](#common-issues)
  - [Error Messages](#error-messages)
  - [Diagnostics](#diagnostics)

---

## Deployment

### Pre-Deployment Checklist

#### ✅ System Requirements

- **Node.js**: v20.0.0 or higher
- **npm**: v9.0.0 or higher (or yarn/pnpm equivalent)
- **TypeScript**: v5.0.0 or higher (installed as dev dependency)
- **OpenAI API Key**: Valid API key with access to GPT-4o-mini

#### ✅ Dependencies Installed

```bash
# Install all dependencies
npm install

# Verify installation
npm list --depth=0
```

**Expected Output:**
```
wcp-ai-agent@1.0.0
├── @ai-sdk/openai@2.0.65
├── @mastra/core@0.24.0
├── @hono/node-server@^1.19.7
├── @types/jest@29.5.14
├── @types/node@20.0.0
├── chalk@5.3.0
├── cors@2.8.5
├── hono@4.11.0
├── jest@29.7.0
├── ts-jest@29.2.5
├── ts-node@10.9.0
├── typescript@5.0.0
└── zod@3.22.0
```

#### ✅ Configuration Complete

- [ ] `.env` file created with `OPENAI_API_KEY` set
- [ ] TypeScript compilation successful (`npm run build`)
- [ ] Test script runs successfully (`npm run test`)
- [ ] Showcase demo runs successfully (`npm run showcase`)
- [ ] Web interface starts successfully (`npm run serve`)

---

### Deployment Steps

#### Step 1: Environment Setup

**1.1 Clone or Navigate to Project**

```bash
# Navigate to project directory
cd "WCP AI Agent Prototype"
```

**1.2 Install Dependencies**

```bash
# Install all dependencies
npm install

# Verify installation
npm list --depth=0
```

**1.3 Configure Environment Variables**

Create `.env` file in project root:

```bash
# Windows PowerShell
echo "OPENAI_API_KEY=your_openai_api_key_here" > .env

# Linux/Mac
echo "OPENAI_API_KEY=your_openai_api_key_here" > .env
```

**⚠️ Important**: Replace `your_openai_api_key_here` with your actual OpenAI API key.

#### Step 2: Build and Verify

**2.1 Build TypeScript**

```bash
# Compile TypeScript to JavaScript
npm run build

# Verify build output
ls dist/
```

**Expected Output:**
```
dist/
├── index.js
├── server.js
├── entrypoints/
│   └── wcp-entrypoint.js
├── mastra/
│   ├── index.js
│   ├── agents/
│   │   └── wcp-agent.js
│   └── tools/
│       └── wcp-tools.js
└── types/
    └── index.js
```

**2.2 Run Test Script**

```bash
# Run basic test script
npm run test

# Or run showcase demo
npm run showcase
```

**2.3 Verify Web Interface**

```bash
# Start API server
npm run serve

# Start frontend (in new terminal)
cd frontend
npm run dev
```

The test script should:
- Successfully connect to OpenAI API
- Extract WCP data from text input
- Validate against DBWD rates
- Return structured decision output

#### Step 3: Production Deployment (Planned)

**⚠️ Note**: Production deployment is planned for future implementation (see TODO.md).

**Future Deployment Steps:**
1. Set up API endpoints (REST API)
2. Configure authentication/authorization
3. Set up rate limiting and security
4. Deploy to cloud platform (AWS, GCP, Azure)
5. Configure monitoring and logging
6. Set up CI/CD pipeline

---

### Monitoring & Maintenance

#### Log Monitoring

**Current Status**: ⚠️ **Limited** - Logging is planned for future implementation (see TODO.md).

**Planned Log Files Location**:
- **Main Log**: `logs/app.log` (planned)
- **Error Log**: `logs/error.log` (planned)
- **Audit Log**: `logs/audit.log` (planned - for compliance traces)

**Planned Monitor Commands**:
```bash
# Monitor logs (planned)
tail -f logs/app.log

# Monitor errors (planned)
tail -f logs/error.log

# Monitor audit trail (planned)
tail -f logs/audit.log
```

#### Health Monitoring

**Current Status**: ⚠️ **Not Implemented** - Health checks planned for Phase 4.

**Planned Health Check Script**:
```bash
# Health check endpoint (planned)
curl http://localhost:3000/health

# Expected response (planned)
{
  "status": "healthy",
  "version": "1.0.0",
  "timestamp": "2025-12-14T12:00:00Z"
}
```

---

### Performance Monitoring

#### Key Metrics to Monitor

**Current Status**: ⚠️ **Not Implemented** - Performance monitoring planned for Phase 4.

**Planned Metrics**:

**System Performance**:
- **API Response Time**: Target <5 seconds per WCP
- **Throughput**: Target 10+ WCPs per minute
- **Error Rate**: Target <1% errors
- **Memory Usage**: Monitor for leaks

**Business Metrics**:
- **Processing Accuracy**: Target >95% accuracy
- **Decision Distribution**: Track Approved/Revise/Reject ratios
- **Average Processing Time**: Track per WCP type

#### Monitoring Tools

**Planned Built-in Monitoring**:
- **OpenTelemetry**: Distributed tracing (planned)
- **Prometheus**: Metrics collection (planned)
- **Grafana**: Visualization dashboards (planned)

---

### Security Considerations

#### API Key Management

**Current**: API key stored in `.env` file (development only)

**Production Requirements** (Planned):
- Use environment variable management (AWS Secrets Manager, etc.)
- Never commit API keys to version control
- Rotate API keys regularly
- Use least-privilege access

#### Input Validation

**Current**: ⚠️ **Limited** - Basic validation in tools

**Production Requirements** (Planned):
- Comprehensive input sanitization
- Rate limiting per API key
- Request size limits
- Malformed input handling

#### Data Privacy

**Current**: No persistent storage

**Production Requirements** (Planned):
- Encrypt sensitive data at rest
- Encrypt data in transit (HTTPS)
- Implement data retention policies
- Compliance with regulations (GDPR, etc.)

#### Authentication & Authorization

**Current**: ⚠️ **Not Implemented** - Planned for Phase 4

**Production Requirements** (Planned):
- API key authentication
- Role-based access control (RBAC)
- JWT tokens for user sessions
- OAuth2 integration

---

### Scaling Considerations

#### Horizontal Scaling

**Current**: Single instance, no scaling

**Production Considerations** (Planned):
- Stateless design (ready for horizontal scaling)
- Load balancer configuration
- Session management (stateless)
- Database connection pooling

#### Vertical Scaling

**Current**: Single instance

**Production Considerations** (Planned):
- Increase Node.js memory limits
- Optimize for CPU-intensive operations
- Cache frequently accessed data (DBWD rates)
- Optimize LLM API calls

---

## Troubleshooting

### Common Issues

#### Issue 1: OpenAI API Key Missing

**Symptoms**:
```
Error [AI_LoadAPIKeyError]: OpenAI API key is missing. Pass it using the 'apiKey' parameter or the OPENAI_API_KEY environment variable.
```

**Cause**: `OPENAI_API_KEY` environment variable not set or `.env` file missing.

**Solution**:
```bash
# Create .env file with API key
echo "OPENAI_API_KEY=your_openai_api_key_here" > .env

# Verify .env file exists
cat .env

# Restart application
npm run test
```

#### Issue 2: TypeScript Compilation Errors

**Symptoms**:
```
error TS2589: Type instantiation is excessively deep and possibly infinite.
error TS2322: Type 'ZodObject<...>' is not assignable to type 'OutputSchema'.
```

**Cause**: TypeScript configuration or module resolution issues.

**Solution**:
```bash
# Verify tsconfig.json configuration
cat tsconfig.json

# Clean build directory
npm run clean

# Rebuild
npm run build

# If issues persist, check moduleResolution setting
# Should be "bundler" for ES modules
```

#### Issue 3: ES Module Import Errors

**Symptoms**:
```
Error [ERR_UNSUPPORTED_DIR_IMPORT]: Directory import '.../src/mastra' is not supported resolving ES modules
```

**Cause**: Missing `.js` extensions in import statements.

**Solution**:
```bash
# Verify imports have .js extensions
grep -r "from \"\./mastra\"" src/

# Should be:
# import { mastra } from "./mastra/index.js";

# Fix imports and rebuild
npm run build
```

#### Issue 4: Module Not Found Errors

**Symptoms**:
```
Error [ERR_MODULE_NOT_FOUND]: Cannot find module '.../dist/mastra/index'
```

**Cause**: Import paths missing `.js` extensions in compiled code.

**Solution**:
```bash
# Ensure source files use .js extensions
# Example: import { mastra } from "./mastra/index.js";

# Rebuild
npm run build

# Verify dist/ files have correct imports
cat dist/index.js | grep "from"
```

#### Issue 5: Dependencies Not Installed

**Symptoms**:
```
Error: Cannot find module '@mastra/core'
```

**Cause**: Dependencies not installed or incorrect versions.

**Solution**:
```bash
# Remove node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall dependencies
npm install

# Verify installation
npm list --depth=0
```

#### Issue 6: Frontend Build Issues

**Symptoms**:
```
Vite Error: Failed to resolve import "react" from "src/main.tsx"
```

**Cause**: Frontend dependencies not installed.

**Solution**:
```bash
# Navigate to frontend directory
cd frontend

# Install frontend dependencies
npm install

# Start frontend dev server
npm run dev
```

#### Issue 7: API Server Connection Issues

**Symptoms**:
```
Error: connect ECONNREFUSED 127.0.0.1:3000
```

**Cause**: API server not running or wrong port.

**Solution**:
```bash
# Start API server in one terminal
npm run serve

# Verify server is running
curl http://localhost:3000/health

# Start frontend in another terminal
cd frontend
npm run dev
```

---

### Common Error Messages

| Error | Cause | Solution |
|-------|-------|----------|
| `OpenAI API key is missing` | `.env` file missing or `OPENAI_API_KEY` not set | Create `.env` file with `OPENAI_API_KEY=your_key` |
| `Type instantiation is excessively deep` | TypeScript configuration issue | Check `tsconfig.json`, ensure `moduleResolution: "bundler"` |
| `Directory import is not supported` | Missing `.js` extensions in imports | Add `.js` extensions to all internal imports |
| `Cannot find module '@mastra/core'` | Dependencies not installed | Run `npm install` |
| `ERR_MODULE_NOT_FOUND` | Import path incorrect | Verify import paths use `.js` extensions |
| `Vite Error: Failed to resolve import` | Frontend dependencies not installed | Run `cd frontend && npm install` |
| `ECONNREFUSED 127.0.0.1:3000` | API server not running | Run `npm run serve` before starting frontend |

---

## Getting Help

If issue persists after trying solutions:

1. **Collect Diagnostics**:
   ```bash
   # System information
   node --version
   npm --version
   cat package.json | grep version
   
   # Build status
   npm run build
   
   # Test output
   npm run test
   ```

2. **Check Logs**:
   - Review console output for error messages
   - Check `.env` file exists and has correct format
   - Verify `dist/` directory exists after build
   - Check `frontend/dist/` directory exists after frontend build

3. **Report Issue**:
   - Include error message and stack trace
   - Include system information (Node.js version, OS)
   - Include steps to reproduce
   - Check `TODO.md` for known issues

---

## 📚 Related Documentation

- **README.md** - Project overview and quick start
- **QUICK-START.md** - 5-minute setup guide
- **CHANGELOG.md** - Version history and changes
- **TODO.md** - Known issues and planned improvements
- **AGENTS.md** - Developer implementation guide
- **docs/INDEX.md** - Complete documentation navigation

---

**Last Updated**: 2025-12-14  
**Status**: Prototype  
**Version**: 1.0.0
