import { describe, it, expect } from "@jest/globals";
import { extractWCPTool, validateWCPTool } from "../../src/mastra/tools/wcp-tools.js";

describe("extractWCPTool", () => {
  it("extracts role, hours, and wage from a standard string", async () => {
    const result = await extractWCPTool.execute({
      context: { content: "Role: Electrician, Hours: 40, Wage: $55.00" },
      runtimeContext: undefined as any,
    });

    expect(result).toEqual({
      role: "Electrician",
      hours: 40,
      wage: 55,
    });
  });

  it("defaults missing fields to Unknown/0", async () => {
    const result = await extractWCPTool.execute({
      context: { content: "No structured fields" },
      runtimeContext: undefined as any,
    });

    expect(result).toEqual({
      role: "Unknown",
      hours: 0,
      wage: 0,
    });
  });
});

describe("validateWCPTool", () => {
  it("returns isValid=true when there are no findings", async () => {
    const result = await validateWCPTool.execute({
      context: { role: "Electrician", hours: 40, wage: 55 },
      runtimeContext: undefined as any,
    });

    expect(result).toEqual({ findings: [], isValid: true });
  });

  it("detects overtime when hours > 40", async () => {
    const result = await validateWCPTool.execute({
      context: { role: "Electrician", hours: 45, wage: 55 },
      runtimeContext: undefined as any,
    });

    expect(result.isValid).toBe(false);
    expect(result.findings).toContainEqual(
      expect.objectContaining({ type: "Overtime" }),
    );
  });

  it("detects underpayment when wage < base", async () => {
    const result = await validateWCPTool.execute({
      context: { role: "Electrician", hours: 40, wage: 30 },
      runtimeContext: undefined as any,
    });

    expect(result.isValid).toBe(false);
    expect(result.findings).toContainEqual(
      expect.objectContaining({ type: "Underpay" }),
    );
  });

  it("flags unknown roles as invalid", async () => {
    const result = await validateWCPTool.execute({
      context: { role: "UnknownRole", hours: 40, wage: 10 },
      runtimeContext: undefined as any,
    });

    expect(result.isValid).toBe(false);
    expect(result.findings).toContainEqual(
      expect.objectContaining({ type: "Unknown Role" }),
    );
  });
});
