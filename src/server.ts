import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { generateWcpDecision } from "./entrypoints/wcp-entrypoint.js";
import { validateEnvironmentOrExit } from "./utils/env-validator.js";
import { formatApiError, ValidationError } from "./utils/errors.js";

// Validate environment before starting server
validateEnvironmentOrExit();

const app = new Hono();

// Enable CORS with configurable origins
app.use("/*", cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000'],
  credentials: true
}));

// Health check endpoint with version info
app.get("/health", (c) => {
  return c.json({ 
    status: "healthy",
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version || "0.0.0"
  });
});

// WCP Analysis endpoint
app.post("/analyze", async (c) => {
  try {
    const body = await c.req.json();
    const { content } = body;

    // Input validation with structured error
    if (!content) {
      const error = new ValidationError("Content is required");
      return c.json(formatApiError(error), 400);
    }

    if (typeof content !== 'string') {
      const error = new ValidationError("Content must be a string");
      return c.json(formatApiError(error), 400);
    }

    // Call the agent entrypoint
    const result = await generateWcpDecision({
      content,
      maxSteps: parseInt(process.env.AGENT_MAX_STEPS || '3', 10),
    });

    // Add request ID for audit trail
    const requestId = c.req.header('x-request-id') || crypto.randomUUID();
    
    return c.json({
      ...result.object,
      requestId,
      timestamp: new Date().toISOString()
    });
  } catch (error: any) {
    console.error("Error analyzing WCP:", error);
    const formattedError = formatApiError(error);
    return c.json(formattedError, formattedError.error.statusCode as any);
  }
});

const port = 3000;
console.log(`Server is running on http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port,
});
