import { describe, it, expect, jest } from "@jest/globals";
import { generateWcpDecision } from "../../src/entrypoints/wcp-entrypoint.js";

describe("wcp entrypoint integration (no live LLM)", () => {
  it("requests the wcpAgent and calls generate with the expected options", async () => {
    const generate = jest.fn(async () => ({
      object: { status: "Approved" },
      text: "ok",
      toolResults: [],
    }));

    const getAgent = jest.fn(async () => ({ generate }));

    const response = await generateWcpDecision({
      content: "Role: Electrician, Hours: 40, Wage: $55.00",
      mastraInstance: { getAgent },
      maxSteps: 3,
    });

    expect(getAgent).toHaveBeenCalledWith("wcpAgent");
    expect(generate).toHaveBeenCalledTimes(1);

    const [, options] = generate.mock.calls[0];
    expect(options.maxSteps).toBe(3);
    expect(options.structuredOutput).toBeDefined();

    expect(response.object.status).toBe("Approved");
  });
});
