import { describe, expect, it, beforeEach } from "vitest";

import { createApp } from "../../src/app.js";

type Scenario = {
  input: string;
  expectedStatus: "Approved" | "Revise" | "Reject";
  expectedFindings?: string[];
};

const scenarios: Scenario[] = [
  {
    input: "Role: Electrician, Hours: 40, Wage: $55.00",
    expectedStatus: "Approved",
  },
  {
    input: "Role: Electrician, Hours: 45, Wage: $55.00",
    expectedStatus: "Revise",
    expectedFindings: ["Overtime"],
  },
  {
    input: "Role: Electrician, Hours: 40, Wage: $30.00",
    expectedStatus: "Reject",
    expectedFindings: ["Underpay"],
  },
  {
    input: "Role: Laborer, Hours: 40, Wage: $30.00",
    expectedStatus: "Approved",
  },
  {
    input: "Role: Laborer, Hours: 50, Wage: $30.00",
    expectedStatus: "Revise",
    expectedFindings: ["Overtime"],
  },
  {
    input: "Role: Laborer, Hours: 40, Wage: $20.00",
    expectedStatus: "Reject",
    expectedFindings: ["Underpay"],
  },
];

describe("Frontend scenario API compatibility", () => {
  beforeEach(() => {
    process.env.OPENAI_API_KEY = "mock";
  });

  it("supports both /analyze and /api/analyze routes", async () => {
    const app = createApp();

    for (const path of ["/analyze", "/api/analyze"]) {
      const res = await app.request(path, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: scenarios[0].input }),
      });

      expect(res.status).toBe(200);
      const data = await res.json();

      expect(data.status).toBe("Approved");
      expect(data.explanation).toBeTypeOf("string");
      expect(Array.isArray(data.findings)).toBe(true);
      expect(Array.isArray(data.trace)).toBe(true);
      expect(data.health).toBeTypeOf("object");
      expect(data.requestId).toBeTypeOf("string");
      expect(data.timestamp).toBeTypeOf("string");
    }
  });

  it("returns expected results for the 6 showcase scenarios", async () => {
    const app = createApp();

    for (const scenario of scenarios) {
      const res = await app.request("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: scenario.input }),
      });

      expect(res.status).toBe(200);
      const data = await res.json();

      expect(data.status).toBe(scenario.expectedStatus);
      if (scenario.expectedFindings) {
        const findingTypes = (data.findings as Array<{ type: string }>).map((f) => f.type);
        for (const expected of scenario.expectedFindings) {
          expect(findingTypes).toContain(expected);
        }
      }
    }
  });
});

