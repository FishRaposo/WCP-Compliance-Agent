/**
 * System Tests for WCP AI Agent
 * 
 * End-to-end system tests that verify the complete WCP processing workflow
 * without requiring actual LLM calls (using mocks).
 * 
 * @file tests/system/test_wcp_system.test.ts
 */

import { describe, it, expect, vi } from "vitest";
import { generateWcpDecision } from "../../src/entrypoints/wcp-entrypoint.js";

describe("WCP System Tests - Complete Workflow", () => {
  
  // Mock agent that simulates the complete workflow
  const createMockAgent = (status: string, findings: any[] = []) => {
    return {
      generate: vi.fn(async () => ({
        object: {
          status,
          explanation: `Decision: ${status}`,
          findings,
          trace: ["Extracted data", "Validated data", "Made decision"],
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

  it("processes valid WCP and returns Approved status", async () => {
    const mockAgent = createMockAgent("Approved");
    const getAgent = vi.fn(async () => mockAgent);

    const response = await generateWcpDecision({
      content: "Role: Electrician, Hours: 40, Wage: $55.00",
      mastraInstance: { getAgent },
      maxSteps: 3,
    });

    expect(response.object.status).toBe("Approved");
    expect(response.object.findings).toEqual([]);
    expect(response.object.health.validationScore).toBe(1.0);
    expect(response.object.health.confidence).toBe(0.95);
  });

  it("processes WCP with overtime and returns Revise status", async () => {
    const mockAgent = createMockAgent("Revise", [
      { type: "Overtime", detail: "Hours 45 > 40 (DBWD requires 1.5x pay)" }
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
    expect(response.object.health.validationScore).toBe(0.8);
    expect(response.object.health.confidence).toBe(0.85);
  });

  it("processes WCP with underpayment and returns Reject status", async () => {
    const mockAgent = createMockAgent("Reject", [
      { type: "Underpay", detail: "Wage $30 < $51.69 base (plus $34.63 fringe)" }
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
    expect(response.object.health.validationScore).toBe(0.8);
    expect(response.object.health.confidence).toBe(0.90);
  });

  it("handles unknown roles and returns Reject status", async () => {
    const mockAgent = createMockAgent("Reject", [
      { type: "Unknown Role", detail: "Role 'Plumber' not found in DBWD rates" }
    ]);
    const getAgent = vi.fn(async () => mockAgent);

    const response = await generateWcpDecision({
      content: "Role: Plumber, Hours: 40, Wage: $50.00",
      mastraInstance: { getAgent },
      maxSteps: 3,
    });

    expect(response.object.status).toBe("Reject");
    expect(response.object.findings.length).toBe(1);
    expect(response.object.findings[0].type).toBe("Unknown Role");
  });

  it("includes health metrics in response", async () => {
    const mockAgent = createMockAgent("Approved");
    const getAgent = vi.fn(async () => mockAgent);

    const response = await generateWcpDecision({
      content: "Role: Laborer, Hours: 40, Wage: $30.00",
      mastraInstance: { getAgent },
      maxSteps: 3,
    });

    expect(response.object.health).toBeDefined();
    expect(response.object.health.cycleTime).toBeGreaterThan(0);
    expect(response.object.health.tokenUsage).toBeGreaterThanOrEqual(0);
    expect(response.object.health.validationScore).toBeGreaterThanOrEqual(0);
    expect(response.object.health.confidence).toBeGreaterThanOrEqual(0);
  });
});