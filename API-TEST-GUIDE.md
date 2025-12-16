# API Testing Guide

## Local API Testing

### Test the API endpoint manually:

1. **Start the server:**
   ```bash
   npm run serve
   ```

2. **Test health endpoint:**
   ```bash
   curl http://localhost:3000/health
   ```

3. **Test analyze endpoint:**
   ```bash
   curl -X POST http://localhost:3000/api/analyze \
     -H "Content-Type: application/json" \
     -d '{"content": "Role: Electrician, Hours: 45, Wage: $50"}'
   ```

## Vercel Deployment

### Deploy to Vercel:

1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Deploy:**
   ```bash
   vercel
   ```

3. **The API will be available at:**
   - `https://your-project.vercel.app/api/health`
   - `https://your-project.vercel.app/api/analyze`

## API Endpoints

### GET /api/health
Returns health status of the API

**Response:**
```json
{
  "status": "healthy",
  "timestamp": "2025-12-16T18:28:56.029Z",
  "version": "0.1.0"
}
```

### POST /api/analyze
Analyzes WCP compliance

**Request:**
```json
{
  "content": "Role: Electrician, Hours: 45, Wage: $50"
}
```

**Response:**
```json
{
  "status": "Reject",
  "explanation": "DBWD compliance violations detected...",
  "findings": [
    {
      "type": "Overtime",
      "detail": "Hours 45 > 40 (DBWD requires 1.5x pay)"
    },
    {
      "type": "Underpay",
      "detail": "Wage $50 < $51.69 base (plus $34.63 fringe)"
    }
  ],
  "trace": [...],
  "health": {
    "cycleTime": 210,
    "tokenUsage": 420,
    "validationScore": 0.92,
    "confidence": 0.92
  }
}
```

## Common Issues

### 500 Error - OpenAI API Key Not Configured
**Solution:** Ensure `OPENAI_API_KEY` is set in Vercel environment variables

### 500 Error - Module Not Found
**Solution:** Run `npm run build` locally to verify compilation, then redeploy

### CORS Issues
**Solution:** Update `ALLOWED_ORIGINS` in Vercel environment variables
