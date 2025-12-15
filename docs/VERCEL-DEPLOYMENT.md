# Vercel Deployment Guide

## Overview
The WCP AI Agent is deployed as a Node.js serverless function on Vercel, not as a static site.

## Configuration

### 1. vercel.json
```json
{
  "version": 2,
  "framework": null,
  "buildCommand": "npm run build",
  "builds": [
    {
      "src": "api/index.ts",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "api/index.ts"
    }
  ],
  "functions": {
    "api/index.ts": {
      "maxDuration": 10
    }
  },
  "env": {
    "NODE_ENV": "production"
  }
}
```

### 2. Vercel Project Settings
In Vercel Dashboard → Project Settings → Build & Output Settings:
- **Framework Preset**: Other
- **Build Command**: `npm run build`
- **Output Directory**: *Leave blank* (not applicable for serverless)
- **Install Command**: `npm install`

### 3. Environment Variables
Required in Vercel Environment Variables:
- `OPENAI_API_KEY`: Your OpenAI API key
- `NODE_ENV`: production (set automatically)

## Deployment Steps

1. Push changes to GitHub
2. Vercel automatically triggers deployment
3. Configure environment variables in Vercel dashboard
4. Redeploy if needed

## Troubleshooting

### "No Output Directory named 'build'" Error
This error occurs when Vercel thinks it's deploying a static site.

**Solution**:
1. Check Framework Preset is set to "Other"
2. Ensure Output Directory is blank
3. Verify vercel.json has `"framework": null`

### Build Failures
- Check TypeScript compilation: `npm run build`
- Verify all dependencies are installed
- Check for missing environment variables

### Runtime Errors
- Verify OPENAI_API_KEY is set correctly
- Check function logs in Vercel dashboard
- Ensure API routes are properly configured

## API Endpoints

Once deployed, your API will be available at:
- `https://your-app.vercel.app/health` - Health check
- `https://your-app.vercel.app/analyze` - WCP analysis (POST)

## Testing Deployment

```bash
# Health check
curl https://your-app.vercel.app/health

# Analyze WCP
curl -X POST https://your-app.vercel.app/analyze \
  -H "Content-Type: application/json" \
  -d '{"content": "Role: Electrician, Hours: 45, Wage: $55.00"}'
```

## Monitoring

- View function logs in Vercel dashboard
- Monitor execution time and errors
- Check usage metrics under Functions tab
