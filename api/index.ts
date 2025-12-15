import { Hono } from 'hono';
import { cors } from 'hono/cors';

// Import from source for Vercel, it will handle TypeScript compilation
import { generateWcpDecision } from '../src/entrypoints/wcp-entrypoint.js';
import { formatApiError } from '../src/utils/errors.js';

const app = new Hono();

// Enable CORS
app.use('/*', cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000'],
  credentials: true
}));

// Health check endpoint
app.get('/health', (c) => {
  return c.json({ 
    status: "healthy",
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version || "0.1.0"
  });
});

// WCP Analysis endpoint
app.post('/analyze', async (c) => {
  try {
    const body = await c.req.json();
    const { content } = body;
    
    if (!content) {
      return c.json({ 
        success: false, 
        error: {
          message: 'Content field is required',
          code: 'VALIDATION_ERROR',
          statusCode: 400
        }
      }, 400);
    }
    
    const result = await generateWcpDecision({ content });
    return c.json(result.object);
  } catch (error) {
    console.error('Error in /analyze:', error);
    return c.json(formatApiError(error), 500);
  }
});

// Root endpoint
app.get('/', (c) => {
  return c.json({
    message: 'WCP AI Agent API',
    version: process.env.npm_package_version || "0.1.0",
    endpoints: {
      health: '/health',
      analyze: '/analyze (POST)'
    }
  });
});

// Export for Vercel
export default app;
