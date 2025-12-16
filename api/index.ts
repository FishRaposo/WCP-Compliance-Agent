import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { handle } from 'hono/vercel';

// Import from source for Vercel, it will handle TypeScript compilation
import { generateWcpDecision } from '../src/entrypoints/wcp-entrypoint';
import { formatApiError } from '../src/utils/errors';

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
    
    // Ensure we always return valid JSON
    const errorResponse = formatApiError(error);
    return c.json(errorResponse, (errorResponse.error?.statusCode || 500) as any);
  }
});

// API health check
app.get('/api/health', (c) => {
  return c.json({ 
    status: "healthy",
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version || "0.1.0"
  });
});

// API analyze endpoint (alternative path)
app.post('/api/analyze', async (c) => {
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
    console.error('Error in /api/analyze:', error);
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

// Debug endpoint
app.get('/debug', (c) => {
  return c.json({
    timestamp: new Date().toISOString(),
    env: {
      NODE_ENV: process.env.NODE_ENV,
      OPENAI_API_KEY_SET: !!process.env.OPENAI_API_KEY,
      VERCEL: !!process.env.VERCEL,
      CI: !!process.env.CI
    },
    imports: {
      wcpEntrypoint: typeof generateWcpDecision,
      formatApiError: typeof formatApiError
    }
  });
});

// Export for Vercel
export default handle(app);
