import { describe, it, expect, beforeAll, afterAll } from "vitest";
import request from "supertest";
import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

// Helper to wait for server to be ready
async function waitForServer(port: number, maxAttempts = 20, delay = 500): Promise<boolean> {
  for (let i = 0; i < maxAttempts; i++) {
    try {
      await request(`http://localhost:${port}`).get("/health");
      return true;
    } catch (error) {
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  return false;
}

describe.skip("API Feature Tests", () => {
  const originalEnv = process.env;
  let serverProcess: any;
  const serverPort = 3002;

  beforeAll(async () => {
    process.env = { ...originalEnv };
    process.env.OPENAI_API_KEY = "mock";
    process.env.PORT = serverPort.toString();
    
    const serverPath = `${process.cwd()}/dist/server.js`;
    serverProcess = exec(`node ${serverPath}`, {
      env: process.env,
      cwd: process.cwd()
    });

    // Wait for server to be ready
    const serverReady = await waitForServer(serverPort);
    if (!serverReady) {
      throw new Error(`Server failed to start on port ${serverPort}`);
    }
  }, 15000); // Increase timeout to 15 seconds

  afterAll(async () => {
    if (serverProcess) {
      serverProcess.kill();
    }
    process.env = originalEnv;
  });

  describe("Request/Response Features", () => {
    it("validates request structure", async () => {
      // Missing content field
      const response1 = await request(`http://localhost:${serverPort}`)
        .post("/analyze")
        .send({})
        .expect(400);

      expect(response1.body).toHaveProperty("success", false);
      expect(response1.body.error).toHaveProperty("code", "VALIDATION_ERROR");

      // Empty content
      const response2 = await request(`http://localhost:${serverPort}`)
        .post("/analyze")
        .send({ content: "" })
        .expect(400);

      expect(response2.body).toHaveProperty("success", false);
    });

    it("returns standardized response format", async () => {
      const response = await request(`http://localhost:${serverPort}`)
        .post("/analyze")
        .send({ content: "Role: Electrician, Hours: 40, Wage: $55.00" })
        .expect(200);

      expect(response.body).toHaveProperty("success", true);
      expect(response.body).toHaveProperty("data");
      expect(response.body.data).toHaveProperty("status");
      expect(response.body.data).toHaveProperty("explanation");
      expect(response.body.data).toHaveProperty("findings");
      expect(response.body.data).toHaveProperty("trace");
      expect(response.body.data).toHaveProperty("requestId");
      expect(response.body.data).toHaveProperty("timestamp");
      expect(response.body.data).toHaveProperty("health");
    });

    it("includes CORS headers", async () => {
      const response = await request(`http://localhost:${serverPort}`)
        .options("/analyze")
        .set("Origin", "http://localhost:3000")
        .expect(204);

      expect(response.headers['access-control-allow-origin']).toBeDefined();
      expect(response.headers['access-control-allow-methods']).toBeDefined();
    });
  });

  describe("Health Check Features", () => {
    it("provides detailed health information", async () => {
      const response = await request(`http://localhost:${serverPort}`)
        .get("/health")
        .expect(200);

      expect(response.body).toHaveProperty("status", "healthy");
      expect(response.body).toHaveProperty("timestamp");
      expect(response.body).toHaveProperty("version", "0.1.0");
      expect(response.body).toHaveProperty("uptime");
      expect(response.body).toHaveProperty("environment");
    });

    it("includes system metrics in health check", async () => {
      const response = await request(`http://localhost:${serverPort}`)
        .get("/health")
        .expect(200);

      expect(response.body.uptime).toBeGreaterThan(0);
      expect(response.body.environment).toBe("test");
    });
  });

  describe("Error Handling Features", () => {
    it("handles malformed JSON gracefully", async () => {
      const response = await request(`http://localhost:${serverPort}`)
        .post("/analyze")
        .set("Content-Type", "application/json")
        .send("{ invalid json }")
        .expect(400);

      expect(response.body).toHaveProperty("success", false);
      expect(response.body.error).toHaveProperty("code");
    });

    it("handles large payloads", async () => {
      const largeContent = "Role: Electrician, Hours: 40, Wage: $55.00 ".repeat(1000);
      
      const response = await request(`http://localhost:${serverPort}`)
        .post("/analyze")
        .send({ content: largeContent })
        .expect(200);

      expect(response.body.success).toBe(true);
    });

    it("rate limits requests if implemented", async () => {
      // This test would need implementation if rate limiting is added
      // For now, just verify multiple requests work
      const requests = Array(10).fill(null).map(() =>
        request(`http://localhost:${serverPort}`)
          .post("/analyze")
          .send({ content: "Role: Electrician, Hours: 40, Wage: $55.00" })
      );

      const responses = await Promise.all(requests);
      responses.forEach(response => {
        expect(response.status).toBe(200);
      });
    });
  });

  describe("Content Processing Features", () => {
    it("processes various input formats", async () => {
      const formats = [
        "Role: Electrician, Hours: 40, Wage: $55.00",
        "Role:Electrician,Hours:40,Wage:$55.00",
        "Role: Electrician Hours: 40 Wage: $55.00"
      ];

      for (const format of formats) {
        const response = await request(`http://localhost:${serverPort}`)
          .post("/analyze")
          .send({ content: format })
          .expect(200);

        expect(response.body.success).toBe(true);
        expect(response.body.data.status).toBe("APPROVED");
      }
    });

    it("handles special characters in input", async () => {
      const specialInputs = [
        "Role: Electrician, Hours: 40, Wage: $55.00!",
        "Role: Electrician, Hours: 40, Wage: $55.00?",
        "Role: Electrician, Hours: 40, Wage: $55.00 (USD)"
      ];

      for (const input of specialInputs) {
        const response = await request(`http://localhost:${serverPort}`)
          .post("/analyze")
          .send({ content: input })
          .expect(200);

        expect(response.body.success).toBe(true);
      }
    });
  });

  describe("Response Time Features", () => {
    it("includes processing time in response", async () => {
      const response = await request(`http://localhost:${serverPort}`)
        .post("/analyze")
        .send({ content: "Role: Electrician, Hours: 40, Wage: $55.00" })
        .expect(200);

      expect(response.body.data.health.cycleTime).toBeGreaterThan(0);
      expect(response.body.data.health.cycleTime).toBeLessThan(1000);
    });

    it("responds within SLA", async () => {
      const start = Date.now();
      
      await request(`http://localhost:${serverPort}`)
        .post("/analyze")
        .send({ content: "Role: Electrician, Hours: 40, Wage: $55.00" })
        .expect(200);

      const duration = Date.now() - start;
      expect(duration).toBeLessThan(500); // SLA: < 500ms
    });
  });

  describe("Security Features", () => {
    it("sanitizes input properly", async () => {
      const maliciousInputs = [
        "Role: <script>alert('xss')</script>, Hours: 40, Wage: $55.00",
        "Role: Electrician; DROP TABLE users; --, Hours: 40, Wage: $55.00"
      ];

      for (const input of maliciousInputs) {
        const response = await request(`http://localhost:${serverPort}`)
          .post("/analyze")
          .send({ content: input })
          .expect(200);

        expect(response.body.success).toBe(true);
        expect(response.body.data.explanation).not.toContain("<script>");
      }
    });

    it("doesn't leak sensitive information", async () => {
      const response = await request(`http://localhost:${serverPort}`)
        .post("/analyze")
        .send({ content: "Role: Electrician, Hours: 40, Wage: $55.00" })
        .expect(200);

      expect(response.body).not.toHaveProperty("apiKey");
      expect(response.body).not.toHaveProperty("internalError");
      expect(response.body.data).not.toHaveProperty("debug");
    });
  });
});
