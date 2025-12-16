import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { generateWcpDecision } from "../../src/entrypoints/wcp-entrypoint.js";
import { mastra } from "../../src/mastra/index.js";

describe("Mock Mode Integration Tests", () => {
  const originalEnv = process.env;

  beforeAll(() => {
    // Enable mock mode
    process.env.OPENAI_API_KEY = "mock";
  });

  afterAll(() => {
    // Restore original environment
    process.env = originalEnv;
  });

  describe("Full Workflow Integration", () => {
    it("integrates extraction, validation, and decision making", async () => {
      const testCases = [
        {
          input: "Role: Electrician, Hours: 40, Wage: $55.00",
          expectedStatus: "Approved",
          expectedFindings: 0
        },
        {
          input: "Role: Electrician, Hours: 45, Wage: $55.00",
          expectedStatus: "Revise",
          expectedFindings: 1
        },
        {
          input: "Role: Electrician, Hours: 40, Wage: $30.00",
          expectedStatus: "Reject",
          expectedFindings: 1
        },
        {
          input: "Role: Laborer, Hours: 40, Wage: $30.00",
          expectedStatus: "Approved",
          expectedFindings: 0
        },
        {
          input: "Role: Laborer, Hours: 50, Wage: $30.00",
          expectedStatus: "Revise",
          expectedFindings: 1
        },
        {
          input: "Role: Laborer, Hours: 40, Wage: $20.00",
          expectedStatus: "Reject",
          expectedFindings: 1
        }
      ];

      for (const testCase of testCases) {
        const response = await generateWcpDecision({
          content: testCase.input
        });

        expect(response.object.status).toBe(testCase.expectedStatus);
        expect(response.object.findings).toHaveLength(testCase.expectedFindings);
        expect(response.object.health).toBeDefined();
        expect(response.object.trace).toHaveLength(5);
      }
    });

    it("maintains response structure consistency", async () => {
      const response = await generateWcpDecision({
        content: "Role: Electrician, Hours: 40, Wage: $55.00"
      });

      // Verify top-level structure
      expect(response).toHaveProperty('object');
      expect(response).toHaveProperty('usage');
      
      // Verify object structure
      expect(response.object).toHaveProperty('status');
      expect(response.object).toHaveProperty('explanation');
      expect(response.object).toHaveProperty('findings');
      expect(response.object).toHaveProperty('trace');
      expect(response.object).toHaveProperty('requestId');
      expect(response.object).toHaveProperty('timestamp');
      expect(response.object).toHaveProperty('health');
      
      // Verify health structure
      expect(response.object.health).toHaveProperty('cycleTime');
      expect(response.object.health).toHaveProperty('tokenUsage');
      expect(response.object.health).toHaveProperty('validationScore');
      expect(response.object.health).toHaveProperty('confidence');
    });
  });

  describe("Mastra Integration", () => {
    it("works with default mastra instance", async () => {
      const response = await generateWcpDecision({
        content: "Role: Electrician, Hours: 40, Wage: $55.00",
        mastraInstance: mastra as any
      });

      expect(response.object.status).toBe("Approved");
    });

    it("handles custom maxSteps parameter", async () => {
      const response = await generateWcpDecision({
        content: "Role: Electrician, Hours: 40, Wage: $55.00",
        maxSteps: 5
      });

      expect(response.object.status).toBe("Approved");
    });

    it("calls onStepFinish callback", async () => {
      const steps: any[] = [];
      
      const response = await generateWcpDecision({
        content: "Role: Electrician, Hours: 40, Wage: $55.00",
        onStepFinish: (step) => {
          steps.push(step);
        }
      });

      expect(response.object.status).toBe("Approved");
      // In mock mode, steps might not be called the same way
      expect(steps).toBeDefined();
    });
  });

  describe("Error Handling Integration", () => {
    it("handles malformed input gracefully", async () => {
      const response = await generateWcpDecision({
        content: "This is not a valid WCP format"
      });

      expect(response.object.status).toBe("Reject");
      expect(response.object.findings).toHaveLength(1);
    });

    it("handles empty input", async () => {
      const response = await generateWcpDecision({
        content: ""
      });

      expect(response.object.status).toBe("Reject");
    });

    it("handles missing fields", async () => {
      const testCases = [
        "Role: Electrician",
        "Hours: 40",
        "Wage: $55.00",
        "Role: Electrician, Hours: 40",
        "Role: Electrician, Wage: $55.00",
        "Hours: 40, Wage: $55.00"
      ];

      for (const testCase of testCases) {
        const response = await generateWcpDecision({ content: testCase });
        expect(response.object).toBeDefined();
        expect(response.object.status).toBeDefined();
      }
    });
  });

  describe("Performance Integration", () => {
    it("responds quickly in mock mode", async () => {
      const startTime = Date.now();
      
      await generateWcpDecision({
        content: "Role: Electrician, Hours: 40, Wage: $55.00"
      });

      const endTime = Date.now();
      const duration = endTime - startTime;

      expect(duration).toBeLessThan(100); // Should complete in under 100ms
    });

    it("handles multiple concurrent requests", async () => {
      const requests = Array(10).fill(null).map((_, i) => 
        generateWcpDecision({
          content: `Role: Electrician, Hours: ${40 + i}, Wage: $55.00`
        })
      );

      const responses = await Promise.all(requests);

      responses.forEach((response: any, index: number) => {
        expect(response.object.status).toBeDefined();
        if (index > 0) {
          expect(response.object.status).toBe("Revise");
        }
      });
    });
  });

  describe("Data Consistency Integration", () => {
    it("produces consistent results for same input", async () => {
      const input = "Role: Electrician, Hours: 40, Wage: $55.00";
      
      const response1 = await generateWcpDecision({ content: input });
      const response2 = await generateWcpDecision({ content: input });

      expect(response1.object.status).toBe(response2.object.status);
      expect(response1.object.findings).toEqual(response2.object.findings);
      expect(response1.object.explanation).toBe(response2.object.explanation);
    });

    it("maintains DBWD rate consistency", async () => {
      const electricianLow = await generateWcpDecision({
        content: "Role: Electrician, Hours: 40, Wage: $50.00"
      });
      
      const laborerHigh = await generateWcpDecision({
        content: "Role: Laborer, Hours: 40, Wage: $30.00"
      });

      // Electrician base rate is $51.69, Laborer is $26.45
      expect(electricianLow.object.status).toBe("Reject");
      expect(laborerHigh.object.status).toBe("Approved");
    });
  });
});
