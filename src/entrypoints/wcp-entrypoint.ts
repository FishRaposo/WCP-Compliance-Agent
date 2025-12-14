// Internal dependencies
import { mastra } from "../mastra/index.js";
import { WCPDecisionSchema } from "../mastra/agents/wcp-agent.js";

type StepFinishCallback = (args: {
  text?: string;
  toolCalls?: unknown;
  toolResults?: unknown;
  finishReason?: string;
}) => void;

export async function generateWcpDecision(args: {
  content: string;
  mastraInstance?: { getAgent: (name: string) => Promise<{ generate: Function }> };
  maxSteps?: number;
  onStepFinish?: StepFinishCallback;
}) {
  const { content, mastraInstance = mastra, maxSteps = 3, onStepFinish } = args;

  // Track timing
  const startTime = Date.now();
  let totalTokenUsage = 0;

  // Wrap step callback to track tokens
  const wrappedOnStepFinish: StepFinishCallback = (stepData) => {
    // Extract token usage if available
    if (stepData.toolResults && Array.isArray(stepData.toolResults)) {
      // Try to extract token usage from tool results
      stepData.toolResults.forEach((result: any) => {
        if (result?.usage?.totalTokens) {
          totalTokenUsage += result.usage.totalTokens;
        }
      });
    }
    
    if (onStepFinish) {
      onStepFinish(stepData);
    }
  };

  const agent = await mastraInstance.getAgent("wcpAgent");

  const response = await agent.generate(
    [{ role: "user", content }],
    {
      structuredOutput: { schema: WCPDecisionSchema },
      maxSteps,
      onStepFinish: wrappedOnStepFinish,
    },
  );

  // Calculate final metrics
  const endTime = Date.now();
  const cycleTime = endTime - startTime;

  // If response doesn't include health metrics, add them
  if (response.object && !response.object.health) {
    response.object = {
      ...response.object,
      health: {
        cycleTime,
        tokenUsage: totalTokenUsage || response.usage?.totalTokens || 0,
        validationScore: response.object.findings?.length === 0 ? 1.0 : 0.8,
        confidence: response.object.status === "Approved" ? 0.95 : 
                   response.object.status === "Revise" ? 0.85 : 0.90,
      },
    };
  }

  return response;
}
