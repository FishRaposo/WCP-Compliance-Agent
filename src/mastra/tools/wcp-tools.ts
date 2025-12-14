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

// External dependencies
import { createTool } from "@mastra/core/tools";
import { z } from "zod";

// Internal dependencies
import { WCPData, DBWDRates, Finding } from "../../types/index.js";

/**
 * DBWD (Davis-Bacon Wage Determinations) Rates
 * 
 * Hardcoded rates for prototype. In production, these would be:
 * - Loaded from RAG-based vector DB lookup
 * - Updated dynamically from official DBWD PDFs
 * - Cached for performance
 * 
 * Current rates (from DOL DC sample):
 * - Electrician: $51.69 base + $34.63 fringe
 * - Laborer: $26.45 base + $12.50 fringe
 * 
 * @see TODO.md - Item 3: RAG-Based DBWD Rate Lookup
 */
const DBWDRates = {
  "Electrician": { base: 51.69, fringe: 34.63 },
  "Laborer": { base: 26.45, fringe: 12.50 },
  // Add more from PDF: e.g., "Plumber": { base: 48.20, fringe: 28.10 }
};

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
export const extractWCPTool = createTool({
  id: "extract-wcp",
  description: "Extract hours, wage, and role from WCP text input.",
  inputSchema: z.object({
    content: z.string().describe("Raw WCP text (e.g., 'Role: Electrician, Hours: 45, Wage: $28')"),
  }),
  outputSchema: z.object({
    role: z.string(),
    hours: z.number(),
    wage: z.number(),
  }),
  execute: async ({ context }) => {
    const { content } = context;
    
    // Extract role using regex: "Role: Electrician" → "Electrician"
    // Case-insensitive match, defaults to "Unknown" if not found
    const roleMatch = content.match(/Role:\s*(\w+)/i) || ["", "Unknown"];
    
    // Extract hours using regex: "Hours: 45" → 45
    // Matches digits only, defaults to "0" if not found
    const hoursMatch = content.match(/Hours:\s*(\d+)/i) || ["", "0"];
    
    // Extract wage using regex: "Wage: $50" or "Wage: 50" → 50
    // Handles optional dollar sign, supports decimals, defaults to "0" if not found
    const wageMatch = content.match(/Wage:\s*\$?(\d+\.?\d*)/i) || ["", "0"];
    
    // Return structured data
    // Note: In production, would validate parsed values and handle errors
    // TODO: Add input validation (see TODO.md - Item 1)
    return {
      role: roleMatch[1],
      hours: parseFloat(hoursMatch[1]),
      wage: parseFloat(wageMatch[1]),
    };
  },
});

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
export const validateWCPTool = createTool({
  id: "validate-wcp",
  description: "Validate hours and wage against DBWD rates.",
  inputSchema: z.object({
    role: z.string(),
    hours: z.number(),
    wage: z.number(),
  }),
  outputSchema: z.object({
    findings: z.array(z.object({ type: z.string(), detail: z.string() })),
    isValid: z.boolean(),
  }),
  execute: async ({ context }) => {
    const { role, hours, wage } = context;
    
    // Look up DBWD rates for the role
    // Defaults to { base: 0, fringe: 0 } for unknown roles
    // TODO: Handle unknown roles more gracefully (see TODO.md - Item 1)
    const expected = DBWDRates[role as keyof typeof DBWDRates] || { base: 0, fringe: 0 };
    
    // Array to collect validation findings
    const findings = [];
    
    // Check for overtime violation: hours > 40
    // DBWD requires 1.5x pay for hours over 40
    if (hours > 40) {
      findings.push({ 
        type: "Overtime", 
        detail: `Hours ${hours} > 40 (DBWD requires 1.5x pay)` 
      });
    }
    
    // Check for underpayment violation: wage < base rate
    // DBWD requires wage >= base rate (fringe benefits are separate)
    if (wage < expected.base) {
      findings.push({ 
        type: "Underpay", 
        detail: `Wage $${wage} < $${expected.base} base (plus $${expected.fringe} fringe)` 
      });
    }
    
    // Return validation results
    // isValid is true only if no violations found
    return {
      findings,
      isValid: findings.length === 0,
    };
  },
});
