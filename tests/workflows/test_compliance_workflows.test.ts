import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { generateWcpDecision } from "../../src/entrypoints/wcp-entrypoint.js";

describe("Compliance Workflow Tests", () => {
  const originalEnv = process.env;

  beforeAll(() => {
    process.env.OPENAI_API_KEY = "mock";
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  describe("Standard WCP Processing Workflow", () => {
    it("processes valid electrician WCP through complete workflow", async () => {
      const input = "Role: Electrician, Hours: 40, Wage: $55.00";
      
      const response = await generateWcpDecision({ content: input });
      
      // Step 1: Extraction verification
      expect(response.object.explanation).toContain("Electrician");
      expect(response.object.explanation).toContain("40");
      expect(response.object.explanation).toContain("$55");
      
      // Step 2: Validation verification
      expect(response.object.status).toBe("APPROVED");
      expect(response.object.findings).toEqual([]);
      
      // Step 3: Decision verification
      expect(response.object.explanation).toContain("approved");
      
      // Step 4: Audit trail verification
      expect(response.object.trace).toHaveLength(5);
      expect(response.object.trace[0]).toBe("Step 1: Extracted WCP data from input");
      expect(response.object.trace[4]).toBe("Step 5: Generated compliance decision");
      
      // Step 5: Health metrics
      expect(response.object.health.validationScore).toBe(1.0);
      expect(response.object.health.confidence).toBe(0.95);
    });

    it("processes valid laborer WCP through complete workflow", async () => {
      const input = "Role: Laborer, Hours: 40, Wage: $30.00";
      
      const response = await generateWcpDecision({ content: input });
      
      expect(response.object.status).toBe("APPROVED");
      expect(response.object.explanation).toContain("Laborer");
      expect(response.object.findings).toEqual([]);
    });
  });

  describe("Overtime Violation Workflow", () => {
    it("handles electrician overtime workflow correctly", async () => {
      const input = "Role: Electrician, Hours: 45, Wage: $55.00";
      
      const response = await generateWcpDecision({ content: input });
      
      // Workflow steps for overtime
      expect(response.object.status).toBe("REVISE");
      expect(response.object.findings).toHaveLength(1);
      expect(response.object.findings[0].type).toBe("Overtime");
      expect(response.object.findings[0].detail).toContain("Hours 45");
      
      // Explanation should mention revision needed
      expect(response.object.explanation).toContain("revision");
      expect(response.object.explanation).toContain("overtime");
      
      // Health metrics should reflect revision status
      expect(response.object.health.validationScore).toBe(0.8);
      expect(response.object.health.confidence).toBe(0.85);
    });

    it("handles extreme overtime workflow", async () => {
      const input = "Role: Electrician, Hours: 60, Wage: $55.00";
      
      const response = await generateWcpDecision({ content: input });
      
      expect(response.object.status).toBe("REVISE");
      expect(response.object.findings[0].detail).toContain("Hours 60");
    });

    it("handles fractional overtime hours", async () => {
      const input = "Role: Electrician, Hours: 40.5, Wage: $55.00";
      
      const response = await generateWcpDecision({ content: input });
      
      expect(response.object.status).toBe("REVISE");
      expect(response.object.findings[0].type).toBe("Overtime");
    });
  });

  describe("Underpayment Violation Workflow", () => {
    it("handles electrician underpayment workflow", async () => {
      const input = "Role: Electrician, Hours: 40, Wage: $30.00";
      
      const response = await generateWcpDecision({ content: input });
      
      // Workflow should detect underpayment
      expect(response.object.status).toBe("REJECT");
      expect(response.object.findings).toHaveLength(1);
      expect(response.object.findings[0].type).toBe("Underpay");
      expect(response.object.findings[0].detail).toContain("$30/hr");
      expect(response.object.findings[0].detail).toContain("$51.69/hr");
      
      // Explanation should be clear about rejection
      expect(response.object.explanation).toContain("rejected");
      expect(response.object.explanation).toContain("compliance violations");
      
      // Health metrics should reflect rejection
      expect(response.object.health.confidence).toBe(0.90);
    });

    it("handles laborer underpayment workflow", async () => {
      const input = "Role: Laborer, Hours: 40, Wage: $20.00";
      
      const response = await generateWcpDecision({ content: input });
      
      expect(response.object.status).toBe("REJECT");
      expect(response.object.findings[0].detail).toContain("$20/hr");
      expect(response.object.findings[0].detail).toContain("$26.45/hr");
    });

    it("handles exact base rate payment", async () => {
      const input = "Role: Laborer, Hours: 40, Wage: $26.45";
      
      const response = await generateWcpDecision({ content: input });
      
      // Should be approved when exactly at base rate
      expect(response.object.status).toBe("APPROVED");
      expect(response.object.findings).toEqual([]);
    });
  });

  describe("Multiple Violations Workflow", () => {
    it("handles both overtime and underpayment", async () => {
      const input = "Role: Electrician, Hours: 45, Wage: $30.00";
      
      const response = await generateWcpDecision({ content: input });
      
      // Should reject due to underpayment even with overtime
      expect(response.object.status).toBe("REJECT");
      expect(response.object.findings).toHaveLength(2);
      
      const findingTypes = response.object.findings.map((f: any) => f.type);
      expect(findingTypes).toContain("Overtime");
      expect(findingTypes).toContain("Underpay");
      
      // Explanation should mention rejection
      expect(response.object.explanation).toContain("rejected");
    });

    it("prioritizes rejection over revision", async () => {
      const input = "Role: Electrician, Hours: 45, Wage: $30.00";
      
      const response = await generateWcpDecision({ content: input });
      
      // Underpayment is more severe than overtime
      expect(response.object.status).toBe("REJECT");
    });
  });

  describe("Invalid Role Workflow", () => {
    it("handles unknown role workflow", async () => {
      const input = "Role: Plumber, Hours: 40, Wage: $50.00";
      
      const response = await generateWcpDecision({ content: input });
      
      expect(response.object.status).toBe("REJECT");
      expect(response.object.findings).toHaveLength(1);
      expect(response.object.findings[0].type).toBe("Invalid Role");
      expect(response.object.findings[0].detail).toContain("Plumber");
      expect(response.object.findings[0].detail).toContain("Electrician or Laborer");
    });

    it("rejects incorrect case in roles (pending Phase 2)", async () => {
      const testCases = [
        "Role: electrician, Hours: 40, Wage: $55.00",
        "Role: ELECTRICIAN, Hours: 40, Wage: $55.00",
        "Role: laborer, Hours: 40, Wage: $30.00",
        "Role: LABORER, Hours: 40, Wage: $30.00"
      ];

      for (const testCase of testCases) {
        const response = await generateWcpDecision({ content: testCase });
        // Phase 2 TODO: Support case-insensitive matching
        // Current behavior: Rejects if case doesn't match DBWD exactly ("Electrician", "Laborer")
        expect(response.object.status).toBe("REJECT");
        expect(response.object.findings[0].type).toBe("Invalid Role");
      }
    });
  });

  describe("Edge Case Workflows", () => {
    it("handles zero hours workflow", async () => {
      const input = "Role: Electrician, Hours: 0, Wage: $55.00";
      
      const response = await generateWcpDecision({ content: input });
      
      expect(response.object.status).toBe("APPROVED");
      expect(response.object.findings).toEqual([]);
    });

    it("handles maximum reasonable hours", async () => {
      const input = "Role: Electrician, Hours: 80, Wage: $55.00";
      
      const response = await generateWcpDecision({ content: input });
      
      expect(response.object.status).toBe("REVISE");
      expect(response.object.findings[0].type).toBe("Overtime");
    });

    it("handles very high wage", async () => {
      const input = "Role: Electrician, Hours: 40, Wage: $200.00";
      
      const response = await generateWcpDecision({ content: input });
      
      expect(response.object.status).toBe("APPROVED");
      expect(response.object.explanation).toContain("$200/hr");
    });

    it("handles malformed but parseable input", async () => {
      const testCases = [
        "Role:Electrician,Hours:40,Wage:$55.00",
        "Role: Electrician Hours: 40 Wage: $55.00",
        "Role: Electrician, Hours:40, Wage:$55"
      ];

      for (const testCase of testCases) {
        const response = await generateWcpDecision({ content: testCase });
        expect(response.object.status).toBe("APPROVED");
      }
    });
  });

  describe("Audit Trail Workflow", () => {
    it("maintains complete audit trail for all decisions", async () => {
      const testCases = [
        { input: "Role: Electrician, Hours: 40, Wage: $55.00", status: "APPROVED" },
        { input: "Role: Electrician, Hours: 45, Wage: $55.00", status: "REVISE" },
        { input: "Role: Electrician, Hours: 40, Wage: $30.00", status: "REJECT" }
      ];

      for (const testCase of testCases) {
        const response = await generateWcpDecision({ content: testCase.input });
        
        // Verify audit trail completeness
        expect(response.object.trace).toHaveLength(5);
        expect(response.object.trace).toEqual([
          "Step 1: Extracted WCP data from input",
          "Step 2: Validated role against DBWD rates",
          "Step 3: Checked wage compliance",
          "Step 4: Checked overtime requirements",
          "Step 5: Generated compliance decision"
        ]);
        
        // Verify request metadata
        // Mock ID format: mock-{timestamp}-{random}
        expect(response.object.requestId).toMatch(/^mock-\d+-[a-z0-9]+$/);
        expect(response.object.timestamp).toBeDefined();
        
        // Verify decision matches expected
        expect(response.object.status).toBe(testCase.status);
      }
    });
  });

  describe("Performance Workflow", () => {
    it("completes workflow within acceptable time", async () => {
      const start = Date.now();
      
      const response = await generateWcpDecision({
        content: "Role: Electrician, Hours: 40, Wage: $55.00"
      });
      
      const duration = Date.now() - start;
      
      expect(response.object).toBeDefined();
      expect(response.object.health.cycleTime).toBeLessThan(100);
      expect(duration).toBeLessThan(100);
    });

    it("handles batch processing workflow", async () => {
      const inputs = [
        "Role: Electrician, Hours: 40, Wage: $55.00",
        "Role: Electrician, Hours: 45, Wage: $55.00",
        "Role: Laborer, Hours: 40, Wage: $30.00"
      ];

      const results = await Promise.all(
        inputs.map(input => generateWcpDecision({ content: input }))
      );

      expect(results).toHaveLength(3);
      expect(results[0].object.status).toBe("APPROVED");
      expect(results[1].object.status).toBe("REVISE");
      expect(results[2].object.status).toBe("APPROVED");
    });
  });
});
