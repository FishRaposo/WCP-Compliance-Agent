import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { generateMockWcpDecision, isMockMode } from "../../src/utils/mock-responses.js";

describe("Mock Responses Unit Tests", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    // Save original environment
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    // Restore original environment
    process.env = originalEnv;
  });

  describe("isMockMode", () => {
    it("returns true when OPENAI_API_KEY is 'mock'", () => {
      process.env.OPENAI_API_KEY = "mock";
      expect(isMockMode()).toBe(true);
    });

    it("returns true when OPENAI_API_KEY is 'mock-key'", () => {
      process.env.OPENAI_API_KEY = "mock-key";
      expect(isMockMode()).toBe(true);
    });

    it("returns false for real API keys", () => {
      process.env.OPENAI_API_KEY = "sk-real-key-here";
      expect(isMockMode()).toBe(false);
    });

    it("returns false when OPENAI_API_KEY is undefined", () => {
      delete process.env.OPENAI_API_KEY;
      expect(isMockMode()).toBe(false);
    });
  });

  describe("generateMockWcpDecision", () => {
    it("approves valid electrician WCP", () => {
      const result = generateMockWcpDecision("Role: Electrician, Hours: 40, Wage: $55.00");

      expect(result.status).toBe("APPROVED");
      expect(result.findings).toEqual([]);
      expect(result.explanation).toContain("approved");
      expect(result.explanation).toContain("Electrician");
      expect(result.trace).toHaveLength(5);
    });

    it("approves valid laborer WCP", () => {
      const result = generateMockWcpDecision("Role: Laborer, Hours: 40, Wage: $30.00");

      expect(result.status).toBe("APPROVED");
      expect(result.findings).toEqual([]);
      expect(result.explanation).toContain("Laborer");
    });

    it("rejects underpaid electrician", () => {
      const result = generateMockWcpDecision("Role: Electrician, Hours: 40, Wage: $30.00");

      expect(result.status).toBe("REJECT");
      expect(result.findings).toHaveLength(1);
      expect(result.findings[0]).toMatchObject({
        type: "Underpay",
        detail: expect.stringContaining("below DBWD base rate")
      });
    });

    it("rejects underpaid laborer", () => {
      const result = generateMockWcpDecision("Role: Laborer, Hours: 40, Wage: $20.00");

      expect(result.status).toBe("REJECT");
      expect(result.findings).toHaveLength(1);
      expect(result.findings[0].type).toBe("Underpay");
    });

    it("revises electrician with overtime", () => {
      const result = generateMockWcpDecision("Role: Electrician, Hours: 45, Wage: $55.00");

      expect(result.status).toBe("REVISE");
      expect(result.findings).toHaveLength(1);
      expect(result.findings[0]).toMatchObject({
        type: "Overtime",
        detail: expect.stringContaining("exceeds 40 hours")
      });
    });

    it("revises laborer with overtime", () => {
      const result = generateMockWcpDecision("Role: Laborer, Hours: 50, Wage: $30.00");

      expect(result.status).toBe("REVISE");
      expect(result.findings).toHaveLength(1);
      expect(result.findings[0].type).toBe("Overtime");
    });

    it("rejects unknown role", () => {
      const result = generateMockWcpDecision("Role: Plumber, Hours: 40, Wage: $50.00");

      expect(result.status).toBe("REJECT");
      expect(result.findings).toHaveLength(1);
      expect(result.findings[0]).toMatchObject({
        type: "Invalid Role",
        detail: expect.stringContaining("Unknown role")
      });
    });

    it("rejects for both underpayment and overtime", () => {
      const result = generateMockWcpDecision("Role: Electrician, Hours: 45, Wage: $30.00");

      expect(result.status).toBe("REJECT");
      expect(result.findings).toHaveLength(2);
      expect(result.findings.map(f => f.type)).toContain("Underpay");
      expect(result.findings.map(f => f.type)).toContain("Overtime");
    });

    it("handles different input formats", () => {
      const testCases = [
        "Role: Electrician, Hours: 40, Wage: $55",
        "Role:Electrician,Hours:40,Wage:$55.00",
        "Role: Electrician Hours: 40 Wage: $55.00"
      ];

      for (const testCase of testCases) {
        const result = generateMockWcpDecision(testCase);
        expect(result.status).toBe("APPROVED");
      }
    });

    it("handles decimal hours", () => {
      const result = generateMockWcpDecision("Role: Electrician, Hours: 40.5, Wage: $55.00");

      expect(result.status).toBe("REVISE");
      expect(result.findings[0].type).toBe("Overtime");
    });

    it("handles decimal wages", () => {
      const result = generateMockWcpDecision("Role: Laborer, Hours: 40, Wage: $26.45");

      expect(result.status).toBe("APPROVED");
    });

    it("generates unique request IDs", () => {
      const result1 = generateMockWcpDecision("Role: Electrician, Hours: 40, Wage: $55.00");
      const result2 = generateMockWcpDecision("Role: Electrician, Hours: 40, Wage: $55.00");

      expect(result1.requestId).not.toBe(result2.requestId);
      expect(result1.requestId).toMatch(/^mock-\d+-[a-z0-9]+$/);
    });

    it("includes valid timestamp", () => {
      const result = generateMockWcpDecision("Role: Electrician, Hours: 40, Wage: $55.00");
      const timestamp = new Date(result.timestamp);

      expect(timestamp.getTime()).not.toBeNaN();
      expect(timestamp.getTime()).toBeLessThanOrEqual(Date.now());
    });

    it("generates correct audit trace", () => {
      const result = generateMockWcpDecision("Role: Electrician, Hours: 40, Wage: $55.00");

      expect(result.trace).toEqual([
        "Step 1: Extracted WCP data from input",
        "Step 2: Validated role against DBWD rates",
        "Step 3: Checked wage compliance",
        "Step 4: Checked overtime requirements",
        "Step 5: Generated compliance decision"
      ]);
    });

    it("handles malformed input gracefully", () => {
      const result = generateMockWcpDecision("Invalid input without proper format");

      expect(result.status).toBe("REJECT");
      expect(result.findings).toHaveLength(1);
      expect(result.findings[0].type).toBe("Invalid Role");
    });

    it("handles zero hours", () => {
      const result = generateMockWcpDecision("Role: Electrician, Hours: 0, Wage: $55.00");

      expect(result.status).toBe("APPROVED");
      expect(result.findings).toEqual([]);
    });

    it("handles very high hours", () => {
      const result = generateMockWcpDecision("Role: Electrician, Hours: 100, Wage: $55.00");

      expect(result.status).toBe("REVISE");
      expect(result.findings[0].type).toBe("Overtime");
    });
  });
});
