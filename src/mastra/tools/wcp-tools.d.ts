/**
 * WCP Tools - Data Extraction and Validation
 *
 * This module provides deterministic tools for WCP (Weekly Certified Payroll) processing:
 * - extractWCPTool: Extracts role, hours, and wage from text input
 * - validateWCPTool: Validates extracted data against DBWD rates
 *
 * @file src/mastra/tools/wcp-tools.ts
 * @see AGENTS.md for usage patterns
 * @see WORKFLOW.md for workflow scenarios
 */
import { z } from "zod";
/**
 * Extract WCP Tool
 *
 * Extracts role, hours, and wage from WCP text input using regex patterns.
 *
 * Input: Raw WCP text (e.g., "Role: Electrician, Hours: 45, Wage: $50")
 * Output: Structured data { role: string, hours: number, wage: number }
 *
 * Future: Will support PDF parsing via pdf-parse library
 *
 * @see TODO.md - Item 2: PDF Parsing Integration
 */
export declare const extractWCPTool: import("@mastra/core/tools").Tool<z.ZodObject<{
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
/**
 * Validate WCP Tool
 *
 * Validates extracted WCP data against DBWD rates.
 * Checks for:
 * - Overtime violations (hours > 40)
 * - Underpayment violations (wage < base rate)
 *
 * Input: Extracted data { role: string, hours: number, wage: number }
 * Output: Validation results { findings: array, isValid: boolean }
 *
 * @see WORKFLOW.md - Validation Workflow section
 */
export declare const validateWCPTool: import("@mastra/core/tools").Tool<z.ZodObject<{
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
//# sourceMappingURL=wcp-tools.d.ts.map