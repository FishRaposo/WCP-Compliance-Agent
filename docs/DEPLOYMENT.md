# Deployment Guide

## Vercel Deployment

### Prerequisites
- Vercel account
- GitHub repository connected to Vercel

### Configuration Files Created
1. **vercel.json** - Configures serverless function deployment
2. **api/index.ts** - Vercel serverless function adapter

### Environment Variables Required
Set these in Vercel dashboard under Project Settings → Environment Variables:
- `OPENAI_API_KEY` - Your OpenAI API key
- `NODE_ENV` - Set to "production"
- `ALLOWED_ORIGINS` - Comma-separated list of allowed origins (optional)

### Deployment Steps
1. Push changes to GitHub
2. Vercel will automatically deploy
3. Configure environment variables in Vercel dashboard
4. Redeploy from Vercel dashboard

### Alternative Deployment Options

#### Railway
Better for long-running Node.js servers:
1. Connect Railway to GitHub
2. Set environment variables
3. Deploy automatically

#### Render
Simple Node.js deployment:
1. Connect Render to GitHub
2. Choose "Web Service"
3. Set build command: `npm run build`
4. Set start command: `npm run serve`

### Troubleshooting
- **"No Output Directory" error**: Fixed with vercel.json
- **Build failures**: Check TypeScript compilation
- **Runtime errors**: Verify environment variables
- **CORS issues**: Configure ALLOWED_ORIGINS
