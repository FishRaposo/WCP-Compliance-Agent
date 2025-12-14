/**
 * Mastra Instance Registration
 *
 * Registers all agents, tools, and workflows with Mastra framework.
 *
 * Current Registration:
 * - Agents: wcpAgent (WCP compliance auditor)
 *
 * Future Registration (planned):
 * - Workflows: wcpWorkflow (multi-document processing)
 * - Scorers: wcpScorers (evaluation framework)
 * - Memory: Agent memory for context
 *
 * @file src/mastra/index.ts
 * @see AGENTS.md - Mastra registration patterns
 * @see TODO.md - Future enhancements and roadmap
 *
 * Note: Future registration plans are documented in TODO.md
 */
import { Mastra } from "@mastra/core";
/**
 * Mastra Instance
 *
 * Main Mastra instance for the WCP AI Agent Prototype.
 * Configured with agents, ready for extension with workflows and scorers.
 */
export declare const mastra: Mastra<{
    wcpAgent: import("@mastra/core").Agent<"wcp-reviewer", {
        extractWCP: import("@mastra/core/tools").Tool<import("zod").ZodObject<{
            content: import("zod").ZodString;
        }, "strip", import("zod").ZodTypeAny, {
            content: string;
        }, {
            content: string;
        }>, import("zod").ZodObject<{
            role: import("zod").ZodString;
            hours: import("zod").ZodNumber;
            wage: import("zod").ZodNumber;
        }, "strip", import("zod").ZodTypeAny, {
            role: string;
            hours: number;
            wage: number;
        }, {
            role: string;
            hours: number;
            wage: number;
        }>, any, any, import("@mastra/core").ToolExecutionContext<import("zod").ZodObject<{
            content: import("zod").ZodString;
        }, "strip", import("zod").ZodTypeAny, {
            content: string;
        }, {
            content: string;
        }>, any, any>> & {
            inputSchema: import("zod").ZodObject<{
                content: import("zod").ZodString;
            }, "strip", import("zod").ZodTypeAny, {
                content: string;
            }, {
                content: string;
            }>;
            outputSchema: import("zod").ZodObject<{
                role: import("zod").ZodString;
                hours: import("zod").ZodNumber;
                wage: import("zod").ZodNumber;
            }, "strip", import("zod").ZodTypeAny, {
                role: string;
                hours: number;
                wage: number;
            }, {
                role: string;
                hours: number;
                wage: number;
            }>;
            execute: (context: import("@mastra/core").ToolExecutionContext<import("zod").ZodObject<{
                content: import("zod").ZodString;
            }, "strip", import("zod").ZodTypeAny, {
                content: string;
            }, {
                content: string;
            }>, any, any>, options: import("@mastra/core").MastraToolInvocationOptions) => Promise<any>;
        };
        validateWCP: import("@mastra/core/tools").Tool<import("zod").ZodObject<{
            role: import("zod").ZodString;
            hours: import("zod").ZodNumber;
            wage: import("zod").ZodNumber;
        }, "strip", import("zod").ZodTypeAny, {
            role: string;
            hours: number;
            wage: number;
        }, {
            role: string;
            hours: number;
            wage: number;
        }>, import("zod").ZodObject<{
            findings: import("zod").ZodArray<import("zod").ZodObject<{
                type: import("zod").ZodString;
                detail: import("zod").ZodString;
            }, "strip", import("zod").ZodTypeAny, {
                type: string;
                detail: string;
            }, {
                type: string;
                detail: string;
            }>, "many">;
            isValid: import("zod").ZodBoolean;
        }, "strip", import("zod").ZodTypeAny, {
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
        }>, any, any, import("@mastra/core").ToolExecutionContext<import("zod").ZodObject<{
            role: import("zod").ZodString;
            hours: import("zod").ZodNumber;
            wage: import("zod").ZodNumber;
        }, "strip", import("zod").ZodTypeAny, {
            role: string;
            hours: number;
            wage: number;
        }, {
            role: string;
            hours: number;
            wage: number;
        }>, any, any>> & {
            inputSchema: import("zod").ZodObject<{
                role: import("zod").ZodString;
                hours: import("zod").ZodNumber;
                wage: import("zod").ZodNumber;
            }, "strip", import("zod").ZodTypeAny, {
                role: string;
                hours: number;
                wage: number;
            }, {
                role: string;
                hours: number;
                wage: number;
            }>;
            outputSchema: import("zod").ZodObject<{
                findings: import("zod").ZodArray<import("zod").ZodObject<{
                    type: import("zod").ZodString;
                    detail: import("zod").ZodString;
                }, "strip", import("zod").ZodTypeAny, {
                    type: string;
                    detail: string;
                }, {
                    type: string;
                    detail: string;
                }>, "many">;
                isValid: import("zod").ZodBoolean;
            }, "strip", import("zod").ZodTypeAny, {
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
            execute: (context: import("@mastra/core").ToolExecutionContext<import("zod").ZodObject<{
                role: import("zod").ZodString;
                hours: import("zod").ZodNumber;
                wage: import("zod").ZodNumber;
            }, "strip", import("zod").ZodTypeAny, {
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
}, Record<string, import("@mastra/core/workflows/legacy").LegacyWorkflow<import("@mastra/core/workflows/legacy").LegacyStep<string, any, any, import("@mastra/core/workflows/legacy").StepExecutionContext<any, import("@mastra/core/workflows/legacy").WorkflowContext<any, import("@mastra/core/workflows/legacy").LegacyStep<string, any, any, any>[], Record<string, any>>>>[], string, any, any>>, Record<string, import("@mastra/core/workflows").Workflow<any, any, any, any, any, any, any>>, Record<string, import("@mastra/core/vector").MastraVector<import("@mastra/core/vector/filter").VectorFilter>>, Record<string, import("@mastra/core/tts").MastraTTS>, import("@mastra/core/logger").IMastraLogger, Record<string, import("@mastra/core/mcp").MCPServerBase>, Record<string, import("@mastra/core/scores").MastraScorer<any, any, any, any>>>;
//# sourceMappingURL=index.d.ts.map