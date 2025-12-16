import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { handle } from 'hono/vercel';

// Import from compiled output paths (relative to compiled location)
import { generateWcpDecision } from '../entrypoints/wcp-entrypoint.js';
import { formatApiError } from '../utils/errors.js';

const app = new Hono().basePath('/api');

// Enable CORS
app.use('/*', cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000', 'http://localhost:5173'],
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
    // Check if OPENAI_API_KEY is set
    if (!process.env.OPENAI_API_KEY) {
      return c.json({ 
        success: false, 
        error: {
          message: 'OpenAI API key not configured',
          code: 'CONFIG_ERROR',
          statusCode: 500
        }
      }, 500);
    }

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
    
    const errorResponse = formatApiError(error);
    return c.json(errorResponse, (errorResponse.error?.statusCode || 500) as any);
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
export default handle(app);
