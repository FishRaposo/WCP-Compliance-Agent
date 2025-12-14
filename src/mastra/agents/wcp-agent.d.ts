/**
 * WCP Agent - Compliance Decision-Making
 *
 * LLM-powered agent that processes WCPs and makes compliance decisions.
 * Uses a hybrid approach: deterministic tools for accuracy + LLM for reasoning.
 *
 * Workflow:
 * 1. Extract data using extractWCPTool
 * 2. Validate data using validateWCPTool
 * 3. Make compliance decision (Approved/Revise/Reject)
 * 4. Generate explanation with audit trail
 *
 * @file src/mastra/agents/wcp-agent.ts
 * @see AGENTS.md for agent patterns
 * @see WORKFLOW.md for decision workflows
 * @see CONTEXT.md for architecture overview
 */
import { Agent } from "@mastra/core";
import { z } from "zod";
/**
 * WCP Decision Schema
 *
 * Structured output schema for compliance decisions.
 * Ensures type-safe, consistent responses with:
 * - status: Decision outcome (Approved/Revise/Reject)
 * - explanation: Human-readable justification
 * - findings: Array of violations found
 * - trace: Step-by-step reasoning log for auditability
 * - health: Performance and quality metrics
 *
 * @see WORKFLOW.md - Decision Workflow section
 */
declare const WCPDecisionSchema: z.ZodObject<{
    status: z.ZodEnum<["Approved", "Revise", "Reject"]>;
    explanation: z.ZodString;
    findings: z.ZodArray<z.ZodObject<{
        type: z.ZodString;
        detail: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: string;
        detail: string;
    }, {
        type: string;
        detail: string;
    }>, "many">;
    trace: z.ZodArray<z.ZodString, "many">;
    health: z.ZodObject<{
        cycleTime: z.ZodNumber;
        tokenUsage: z.ZodNumber;
        validationScore: z.ZodNumber;
        confidence: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        cycleTime: number;
        tokenUsage: number;
        validationScore: number;
        confidence: number;
    }, {
        cycleTime: number;
        tokenUsage: number;
        validationScore: number;
        confidence: number;
    }>;
}, "strip", z.ZodTypeAny, {
    status: "Approved" | "Revise" | "Reject";
    findings: {
        type: string;
        detail: string;
    }[];
    explanation: string;
    trace: string[];
    health: {
        cycleTime: number;
        tokenUsage: number;
        validationScore: number;
        confidence: number;
    };
}, {
    status: "Approved" | "Revise" | "Reject";
    findings: {
        type: string;
        detail: string;
    }[];
    explanation: string;
    trace: string[];
    health: {
        cycleTime: number;
        tokenUsage: number;
        validationScore: number;
        confidence: number;
    };
}>;
/**
 * WCP Agent
 *
 * Mastra Agent configured for WCP compliance auditing.
 *
 * Configuration:
 * - Model: OpenAI GPT-4o-mini (cost-effective reasoning)
 * - Tools: extractWCP, validateWCP
 * - Max Steps: 3 (bounded execution)
 * - Output: Structured JSON (WCPDecisionSchema)
 *
 * Decision Logic:
 * - Approved: No violations found
 * - Revise: Minor violations (e.g., overtime)
 * - Reject: Major violations (e.g., underpayment, unknown role)
 *
 * @see CONTEXT.md - Architecture section
 * @see WORKFLOW.md - Decision Workflow section
 */
export declare const wcpAgent: Agent<"wcp-reviewer", {
    extractWCP: import("@mastra/core/tools").Tool<z.ZodObject<{
        content: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        content: string;
    }, {
        content: string;
    }>, z.ZodObject<{
        role: z.ZodString;
        hours: z.ZodNumber;
        wage: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        role: string;
        hours: number;
        wage: number;
    }, {
        role: string;
        hours: number;
        wage: number;
    }>, any, any, import("@mastra/core").ToolExecutionContext<z.ZodObject<{
        content: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        content: string;
    }, {
        content: string;
    }>, any, any>> & {
        inputSchema: z.ZodObject<{
            content: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            content: string;
        }, {
            content: string;
        }>;
        outputSchema: z.ZodObject<{
            role: z.ZodString;
            hours: z.ZodNumber;
            wage: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            role: string;
            hours: number;
            wage: number;
        }, {
            role: string;
            hours: number;
            wage: number;
        }>;
        execute: (context: import("@mastra/core").ToolExecutionContext<z.ZodObject<{
            content: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            content: string;
        }, {
            content: string;
        }>, any, any>, options: import("@mastra/core").MastraToolInvocationOptions) => Promise<any>;
    };
    validateWCP: import("@mastra/core/tools").Tool<z.ZodObject<{
        role: z.ZodString;
        hours: z.ZodNumber;
        wage: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        role: string;
        hours: number;
        wage: number;
    }, {
        role: string;
        hours: number;
        wage: number;
    }>, z.ZodObject<{
        findings: z.ZodArray<z.ZodObject<{
            type: z.ZodString;
            detail: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            type: string;
            detail: string;
        }, {
            type: string;
            detail: string;
        }>, "many">;
        isValid: z.ZodBoolean;
    }, "strip", z.ZodTypeAny, {
        findings: {
            type: string;
            detail: string;
        }[];
        isValid: boolean;
    }, {
        findings: {
            type: string;
            detail: string;
        }[];
        isValid: boolean;
    }>, any, any, import("@mastra/core").ToolExecutionContext<z.ZodObject<{
        role: z.ZodString;
        hours: z.ZodNumber;
        wage: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        role: string;
        hours: number;
        wage: number;
    }, {
        role: string;
        hours: number;
        wage: number;
    }>, any, any>> & {
        inputSchema: z.ZodObject<{
            role: z.ZodString;
            hours: z.ZodNumber;
            wage: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            role: string;
            hours: number;
            wage: number;
        }, {
            role: string;
            hours: number;
            wage: number;
        }>;
        outputSchema: z.ZodObject<{
            findings: z.ZodArray<z.ZodObject<{
                type: z.ZodString;
                detail: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                type: string;
                detail: string;
            }, {
                type: string;
                detail: string;
            }>, "many">;
            isValid: z.ZodBoolean;
        }, "strip", z.ZodTypeAny, {
            findings: {
                type: string;
                detail: string;
            }[];
            isValid: boolean;
        }, {
            findings: {
                type: string;
                detail: string;
            }[];
            isValid: boolean;
        }>;
        execute: (context: import("@mastra/core").ToolExecutionContext<z.ZodObject<{
            role: z.ZodString;
            hours: z.ZodNumber;
            wage: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            role: string;
            hours: number;
            wage: number;
        }, {
            role: string;
            hours: number;
            wage: number;
        }>, any, any>, options: import("@mastra/core").MastraToolInvocationOptions) => Promise<any>;
    };
}, Record<string, import("@mastra/core").Metric>>;
export { WCPDecisionSchema };
//# sourceMappingURL=wcp-agent.d.ts.map