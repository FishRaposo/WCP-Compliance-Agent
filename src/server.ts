import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { generateWcpDecision } from "./entrypoints/wcp-entrypoint.js";

const app = new Hono();

// Enable CORS
app.use("/*", cors());

// Health check endpoint
app.get("/health", (c) => c.json({ status: "ok" }));

// WCP Analysis endpoint
app.post("/analyze", async (c) => {
  try {
    const body = await c.req.json();
    const { content } = body;

    if (!content) {
      return c.json({ error: "Content is required" }, 400);
    }

    // Call the agent entrypoint
    // We'll pass a dummy callback for onStepFinish if we want to stream logs later,
    // but for now we just want the final result.
    // The entrypoint already handles health metrics generation.
    const result = await generateWcpDecision({
      content,
      maxSteps: 3,
    });

    return c.json(result.object);
  } catch (error: any) {
    console.error("Error analyzing WCP:", error);
    return c.json(
      {
        error: "Failed to analyze WCP",
        details: error.message,
      },
      500
    );
  }
});

const port = 3000;
console.log(`Server is running on http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port,
});
