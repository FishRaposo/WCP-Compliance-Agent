import { describe, it, expect, vi } from "vitest";
import { generateWcpDecision } from "../../src/entrypoints/wcp-entrypoint.js";

describe("wcp entrypoint integration (no live LLM)", () => {
  it("requests the wcpAgent and calls generate with the expected options", async () => {
    const generate = vi.fn(async () => ({
      object: { status: "Approved" },
      text: "ok",
      toolResults: [],
    }));

    const getAgent = vi.fn(async () => ({ generate }));

    const response = await generateWcpDecision({
      content: "Role: Electrician, Hours: 40, Wage: $55.00",
      mastraInstance: { getAgent },
      maxSteps: 3,
    });

    expect(getAgent).toHaveBeenCalledWith("wcpAgent");
    expect(generate).toHaveBeenCalledTimes(1);

    // Verify the response structure
    expect(response).toBeDefined();
    expect(response.object).toBeDefined();
    expect(response.object.status).toBe("Approved");
    expect(response.text).toBe("ok");
    expect(response.toolResults).toEqual([]);
  });
});