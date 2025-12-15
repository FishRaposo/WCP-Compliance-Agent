// Internal dependencies
import { mastra } from "../mastra/index.js";
import { WCPDecisionSchema } from "../mastra/agents/wcp-agent.js";
import { ExternalApiError, RateLimitError } from "../utils/errors.js";
import { generateMockWcpDecision, isMockMode } from "../utils/mock-responses.js";

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

  // Check if we're in mock mode
  if (isMockMode()) {
    console.log('🔧 Using mock mode - generating deterministic response');
    const mockDecision = generateMockWcpDecision(content);
    
    // Return in the same format as the real API
    return {
      object: {
        ...mockDecision,
        health: {
          cycleTime: 50, // Mock fast response
          tokenUsage: 0,
          validationScore: mockDecision.findings?.length === 0 ? 1.0 : 0.8,
          confidence: mockDecision.status === "APPROVED" ? 0.95 : 
                     mockDecision.status === "REVISE" ? 0.85 : 0.90,
        },
      },
      usage: { totalTokens: 0 }
    };
  }

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

  let response;
  try {
    const agent = await mastraInstance.getAgent("wcpAgent");

    response = await agent.generate(
      [{ role: "user", content }],
      {
        structuredOutput: { schema: WCPDecisionSchema },
        maxSteps,
        onStepFinish: wrappedOnStepFinish,
      },
    );
  } catch (error: any) {
    // Handle specific API errors
    if (error.status === 429) {
      throw new RateLimitError('OpenAI API rate limit exceeded', {
        retryAfter: error.headers?.['retry-after']
      });
    }
    if (error.code === 'insufficient_quota') {
      throw new ExternalApiError('OpenAI API quota exceeded', {
        code: error.code,
        type: 'quota_error'
      });
    }
    if (error.name === 'FetchError' || error.code === 'ENOTFOUND') {
      throw new ExternalApiError('Network connection failed', {
        originalError: error.message
      });
    }
    throw new ExternalApiError('OpenAI API error', {
      code: error.code || 'UNKNOWN_API_ERROR',
      message: error.message
    });
  }

  // Validate response.object after API call
  if (!response.object || typeof response.object !== 'object') {
    throw new ExternalApiError('Invalid agent response structure', {
      response,
      expected: 'WCPDecision object with status, explanation, findings, trace'
    });
  }

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