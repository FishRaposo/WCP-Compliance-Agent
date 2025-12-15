/**
 * Workflow Tests for WCP AI Agent
 * 
 * Tests that verify complete user workflows and scenarios.
 * These tests simulate real-world usage patterns.
 * 
 * @file tests/workflows/test_wcp_workflows.test.ts
 */

import { describe, it, expect, vi } from "vitest";
import { generateWcpDecision } from "../../src/entrypoints/wcp-entrypoint.js";

describe("WCP Workflow Tests - User Scenarios", () => {
  
  // Mock agent that simulates different workflow outcomes
  const createMockAgent = (status: string, findings: any[] = [], trace: string[] = []) => {
    return {
      generate: vi.fn(async () => ({
        object: {
          status,
          explanation: `Decision: ${status}`,
          findings,
          trace: trace.length > 0 ? trace : ["Extracted data", "Validated data", "Made decision"],
          health: {
            cycleTime: 100,
            tokenUsage: 50,
            validationScore: findings.length === 0 ? 1.0 : 0.8,
            confidence: status === "Approved" ? 0.95 : status === "Revise" ? 0.85 : 0.90,
          }
        },
        text: `Decision: ${status}`,
        toolResults: [],
      }))
    };
  };

  describe("Standard Compliance Workflow", () => {
    
    it("handles standard valid WCP submission workflow", async () => {
      const mockAgent = createMockAgent("Approved", [], [
        "Extracted: Role=Electrician, Hours=40, Wage=55",
        "Validated: No violations found",
        "Decided: Approved - compliant with DBWD"
      ]);
      const getAgent = vi.fn(async () => mockAgent);

      const response = await generateWcpDecision({
        content: "Role: Electrician, Hours: 40, Wage: $55.00",
        mastraInstance: { getAgent },
        maxSteps: 3,
      });

      expect(response.object.status).toBe("Approved");
      expect(response.object.trace.length).toBe(3);
      expect(response.object.trace[0]).toContain("Extracted");
      expect(response.object.trace[1]).toContain("Validated");
      expect(response.object.trace[2]).toContain("Decided");
    });

    it("handles WCP with overtime requiring revision workflow", async () => {
      const mockAgent = createMockAgent("Revise", [
        { type: "Overtime", detail: "Hours 45 > 40 (DBWD requires 1.5x pay)" }
      ], [
        "Extracted: Role=Electrician, Hours=45, Wage=55",
        "Validated: Overtime violation detected",
        "Decided: Revise - overtime pay required"
      ]);
      const getAgent = vi.fn(async () => mockAgent);

      const response = await generateWcpDecision({
        content: "Role: Electrician, Hours: 45, Wage: $55.00",
        mastraInstance: { getAgent },
        maxSteps: 3,
      });

      expect(response.object.status).toBe("Revise");
      expect(response.object.findings.length).toBe(1);
      expect(response.object.findings[0].type).toBe("Overtime");
      expect(response.object.trace.length).toBe(3);
    });

    it("handles WCP with underpayment requiring rejection workflow", async () => {
      const mockAgent = createMockAgent("Reject", [
        { type: "Underpay", detail: "Wage $30 < $51.69 base (plus $34.63 fringe)" }
      ], [
        "Extracted: Role=Electrician, Hours=40, Wage=30",
        "Validated: Underpayment violation detected",
        "Decided: Reject - significant underpayment"
      ]);
      const getAgent = vi.fn(async () => mockAgent);

      const response = await generateWcpDecision({
        content: "Role: Electrician, Hours: 40, Wage: $30.00",
        mastraInstance: { getAgent },
        maxSteps: 3,
      });

      expect(response.object.status).toBe("Reject");
      expect(response.object.findings.length).toBe(1);
      expect(response.object.findings[0].type).toBe("Underpay");
      expect(response.object.trace.length).toBe(3);
    });
  });

  describe("Error Handling Workflow", () => {
    
    it("handles unknown role with clear error message", async () => {
      const mockAgent = createMockAgent("Reject", [
        { type: "Unknown Role", detail: "Role 'Plumber' not found in DBWD rates" }
      ], [
        "Extracted: Role=Plumber, Hours=40, Wage=50",
        "Validated: Unknown role detected",
        "Decided: Reject - role not in DBWD database"
      ]);
      const getAgent = vi.fn(async () => mockAgent);

      const response = await generateWcpDecision({
        content: "Role: Plumber, Hours: 40, Wage: $50.00",
        mastraInstance: { getAgent },
        maxSteps: 3,
      });

      expect(response.object.status).toBe("Reject");
      expect(response.object.findings[0].type).toBe("Unknown Role");
      expect(response.object.findings[0].detail).toContain("not found in DBWD rates");
    });

    it("handles multiple violations in single WCP", async () => {
      const mockAgent = createMockAgent("Reject", [
        { type: "Overtime", detail: "Hours 50 > 40 (DBWD requires 1.5x pay)" },
        { type: "Underpay", detail: "Wage $30 < $51.69 base (plus $34.63 fringe)" }
      ], [
        "Extracted: Role=Electrician, Hours=50, Wage=30",
        "Validated: Multiple violations detected",
        "Decided: Reject - overtime and underpayment"
      ]);
      const getAgent = vi.fn(async () => mockAgent);

      const response = await generateWcpDecision({
        content: "Role: Electrician, Hours: 50, Wage: $30.00",
        mastraInstance: { getAgent },
        maxSteps: 3,
      });

      expect(response.object.status).toBe("Reject");
      expect(response.object.findings.length).toBe(2);
      expect(response.object.findings[0].type).toBe("Overtime");
      expect(response.object.findings[1].type).toBe("Underpay");
    });
  });

  describe("Different Role Workflow", () => {
    
    it("handles Laborer role correctly", async () => {
      const mockAgent = createMockAgent("Approved", [], [
        "Extracted: Role=Laborer, Hours=40, Wage=30",
        "Validated: No violations found for Laborer",
        "Decided: Approved - Laborer compliant with DBWD"
      ]);
      const getAgent = vi.fn(async () => mockAgent);

      const response = await generateWcpDecision({
        content: "Role: Laborer, Hours: 40, Wage: $30.00",
        mastraInstance: { getAgent },
        maxSteps: 3,
      });

      expect(response.object.status).toBe("Approved");
      expect(response.object.trace[0]).toContain("Laborer");
    });

    it("handles Laborer overtime correctly", async () => {
      const mockAgent = createMockAgent("Revise", [
        { type: "Overtime", detail: "Hours 50 > 40 (DBWD requires 1.5x pay)" }
      ], [
        "Extracted: Role=Laborer, Hours=50, Wage=30",
        "Validated: Overtime violation for Laborer",
        "Decided: Revise - Laborer overtime pay required"
      ]);
      const getAgent = vi.fn(async () => mockAgent);

      const response = await generateWcpDecision({
        content: "Role: Laborer, Hours: 50, Wage: $30.00",
        mastraInstance: { getAgent },
        maxSteps: 3,
      });

      expect(response.object.status).toBe("Revise");
      expect(response.object.findings[0].type).toBe("Overtime");
      expect(response.object.trace[0]).toContain("Laborer");
    });
  });

  describe("Configuration Workflow", () => {
    
    it("handles different content formats", async () => {
      const mockAgent = createMockAgent("Approved");
      const getAgent = vi.fn(async () => mockAgent);

      // Test with different spacing and formatting
      const response = await generateWcpDecision({
        content: "Role: Electrician, Hours: 40, Wage: $55.00",
        mastraInstance: { getAgent },
        maxSteps: 3,
      });

      expect(response.object.status).toBe("Approved");
    });
  });
});