import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { generateWcpDecision } from "../../src/entrypoints/wcp-entrypoint.js";
import { generateMockWcpDecision, isMockMode } from "../../src/utils/mock-responses.js";

describe("Compliance Feature Tests", () => {
  const originalEnv = process.env;

  beforeAll(() => {
    // Enable mock mode for feature tests
    process.env.OPENAI_API_KEY = "mock";
  });

  afterAll(() => {
    // Restore original environment
    process.env = originalEnv;
  });

  describe("Overtime Detection Feature", () => {
    it("detects overtime for electricians correctly", async () => {
      const response = await generateWcpDecision({
        content: "Role: Electrician, Hours: 45, Wage: $55.00"
      });

      expect(response.object.status).toBe("REVISE");
      expect(response.object.findings).toContainEqual(
        expect.objectContaining({
          type: "Overtime",
          detail: expect.stringContaining("exceeds 40 hours")
        })
      );
    });

    it("detects overtime for laborers correctly", async () => {
      const response = await generateWcpDecision({
        content: "Role: Laborer, Hours: 50, Wage: $30.00"
      });

      expect(response.object.status).toBe("REVISE");
      expect(response.object.findings).toContainEqual(
        expect.objectContaining({
          type: "Overtime"
        })
      );
    });

    it("approves when no overtime", async () => {
      const response = await generateWcpDecision({
        content: "Role: Electrician, Hours: 40, Wage: $55.00"
      });

      expect(response.object.status).toBe("APPROVED");
      expect(response.object.findings).toEqual([]);
    });
  });

  describe("Underpayment Detection Feature", () => {
    it("detects underpayment for electricians", async () => {
      const response = await generateWcpDecision({
        content: "Role: Electrician, Hours: 40, Wage: $30.00"
      });

      expect(response.object.status).toBe("REJECT");
      expect(response.object.findings).toContainEqual(
        expect.objectContaining({
          type: "Underpay",
          detail: expect.stringContaining("below DBWD base rate")
        })
      );
    });

    it("detects underpayment for laborers", async () => {
      const response = await generateWcpDecision({
        content: "Role: Laborer, Hours: 40, Wage: $20.00"
      });

      expect(response.object.status).toBe("REJECT");
      expect(response.object.findings).toContainEqual(
        expect.objectContaining({
          type: "Underpay"
        })
      );
    });

    it("approves when wage meets or exceeds base rate", async () => {
      const response = await generateWcpDecision({
        content: "Role: Laborer, Hours: 40, Wage: $30.00"
      });

      expect(response.object.status).toBe("APPROVED");
      expect(response.object.findings).toEqual([]);
    });
  });

  describe("Role Validation Feature", () => {
    it("rejects unknown roles", async () => {
      const response = await generateWcpDecision({
        content: "Role: Plumber, Hours: 40, Wage: $50.00"
      });

      expect(response.object.status).toBe("REJECT");
      expect(response.object.findings).toContainEqual(
        expect.objectContaining({
          type: "Invalid Role",
          detail: expect.stringContaining("Unknown role")
        })
      );
    });

    it("handles electrician role correctly", async () => {
      const response = await generateWcpDecision({
        content: "Role: Electrician, Hours: 40, Wage: $55.00"
      });

      expect(response.object.status).toBe("APPROVED");
      expect(response.object.explanation).toContain("Electrician");
    });

    it("handles laborer role correctly", async () => {
      const response = await generateWcpDecision({
        content: "Role: Laborer, Hours: 40, Wage: $30.00"
      });

      expect(response.object.status).toBe("APPROVED");
      expect(response.object.explanation).toContain("Laborer");
    });
  });

  describe("Audit Trail Feature", () => {
    it("includes complete audit trace", async () => {
      const response = await generateWcpDecision({
        content: "Role: Electrician, Hours: 45, Wage: $55.00"
      });

      expect(response.object.trace).toBeDefined();
      expect(response.object.trace).toHaveLength(5);
      expect(response.object.trace[0]).toContain("Extracted WCP data");
      expect(response.object.trace[1]).toContain("Validated role");
      expect(response.object.trace[2]).toContain("Checked wage");
      expect(response.object.trace[3]).toContain("Checked overtime");
      expect(response.object.trace[4]).toContain("Generated compliance decision");
    });

    it("provides detailed explanation", async () => {
      const response = await generateWcpDecision({
        content: "Role: Electrician, Hours: 40, Wage: $30.00"
      });

      expect(response.object.explanation).toBeDefined();
      expect(response.object.explanation).toContain("rejected");
      expect(response.object.explanation).toContain("compliance violations");
    });
  });

  describe("Health Metrics Feature", () => {
    it("includes health metrics in response", async () => {
      const response = await generateWcpDecision({
        content: "Role: Electrician, Hours: 40, Wage: $55.00"
      });

      expect(response.object.health).toBeDefined();
      expect(response.object.health.cycleTime).toBeGreaterThan(0);
      expect(response.object.health.tokenUsage).toBeGreaterThanOrEqual(0);
      expect(response.object.health.validationScore).toBeGreaterThanOrEqual(0);
      expect(response.object.health.validationScore).toBeLessThanOrEqual(1);
      expect(response.object.health.confidence).toBeGreaterThanOrEqual(0);
      expect(response.object.health.confidence).toBeLessThanOrEqual(1);
    });

    it("assigns high confidence to approved WCPs", async () => {
      const response = await generateWcpDecision({
        content: "Role: Electrician, Hours: 40, Wage: $55.00"
      });

      expect(response.object.health.confidence).toBe(0.95);
    });

    it("assigns lower confidence to revised WCPs", async () => {
      const response = await generateWcpDecision({
        content: "Role: Electrician, Hours: 45, Wage: $55.00"
      });

      expect(response.object.health.confidence).toBe(0.85);
    });
  });

  describe("Mock Mode Feature", () => {
    it("detects mock mode correctly", () => {
      expect(isMockMode()).toBe(true);
    });

    it("generates deterministic responses", async () => {
      const input = "Role: Electrician, Hours: 40, Wage: $55.00";
      
      const response1 = await generateWcpDecision({ content: input });
      const response2 = await generateWcpDecision({ content: input });

      expect(response1.object.status).toBe(response2.object.status);
      expect(response1.object.findings).toEqual(response2.object.findings);
    });

    it("returns zero token usage in mock mode", async () => {
      const response = await generateWcpDecision({
        content: "Role: Electrician, Hours: 40, Wage: $55.00"
      });

      expect(response.object.health.tokenUsage).toBe(0);
    });
  });

  describe("Edge Cases Feature", () => {
    it("handles decimal hours correctly", async () => {
      const response = await generateWcpDecision({
        content: "Role: Electrician, Hours: 40.5, Wage: $55.00"
      });

      expect(response.object.status).toBe("REVISE");
      expect(response.object.findings).toContainEqual(
        expect.objectContaining({ type: "Overtime" })
      );
    });

    it("handles decimal wages correctly", async () => {
      const response = await generateWcpDecision({
        content: "Role: Laborer, Hours: 40, Wage: $26.45"
      });

      expect(response.object.status).toBe("APPROVED");
    });

    it("handles different input formats", async () => {
      const testCases = [
        "Role: Electrician, Hours: 40, Wage: $55",
        "Role:Electrician,Hours:40,Wage:$55.00",
        "Role: Electrician Hours: 40 Wage: $55.00"
      ];

      for (const testCase of testCases) {
        const response = await generateWcpDecision({ content: testCase });
        expect(response.object).toBeDefined();
      }
    });
  });
});
