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
import { ValidationError, ConfigError } from "../../utils/errors.js";

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
    
    // Input validation with structured errors
    if (!content || content.trim().length === 0) {
      throw new ValidationError("Input content cannot be empty");
    }

    if (content.length > 10000) {
      throw new ValidationError("Input content too long (max 10,000 characters)");
    }

    // Extract role using regex: "Role: Electrician" → "Electrician"
    const roleMatch = content.match(/Role:\s*(\w+)/i);
    if (!roleMatch) {
      throw new ValidationError("Could not extract role from content. Expected format: 'Role: <role>'");
    }
    const role = roleMatch[1];
    
    // Extract hours using regex: "Hours: 45" → 45
    const hoursMatch = content.match(/Hours:\s*(\d+)/i);
    if (!hoursMatch) {
      throw new ValidationError("Could not extract hours from content. Expected format: 'Hours: <number>'");
    }
    const hours = parseFloat(hoursMatch[1]);
    
    // Extract wage using regex: "Wage: $50" or "Wage: 50" → 50
    const wageMatch = content.match(/Wage:\s*\$?(\d+\.?\d*)/i);
    if (!wageMatch) {
      throw new ValidationError("Could not extract wage from content. Expected format: 'Wage: $<number>' or 'Wage: <number>'");
    }
    const wage = parseFloat(wageMatch[1]);

    // Validate parsed values with business rules
    if (isNaN(hours)) {
      throw new ValidationError(`Invalid hours value: ${hoursMatch[1]}. Hours must be a valid number.`);
    }

    if (hours < 0) {
      throw new ValidationError(`Hours cannot be negative: ${hours}`);
    }

    if (hours > 168) {
      throw new ValidationError(`Hours exceed maximum (168 hours in 24 days): ${hours}`);
    }

    if (isNaN(wage)) {
      throw new ValidationError(`Invalid wage value: ${wageMatch[1]}. Wage must be a valid number.`);
    }

    if (wage < 0) {
      throw new ValidationError(`Wage cannot be negative: $${wage}`);
    }

    if (wage > 1000) {
      throw new ValidationError(`Wage exceeds reasonable maximum ($1000/hr): $${wage}`);
    }
    
    return {
      role,
      hours,
      wage,
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
    
    // Validate input parameters
    if (typeof role !== 'string' || role.trim().length === 0) {
      throw new ValidationError('Role must be a non-empty string', { received: role });
    }
    
    if (typeof hours !== 'number' || isNaN(hours)) {
      throw new ValidationError('Hours must be a valid number', { received: hours });
    }
    
    if (hours < 0) {
      throw new ValidationError('Hours cannot be negative', { received: hours });
    }
    
    if (hours > 168) {
      throw new ValidationError('Hours exceed maximum (168 hours in 24 days)', { received: hours });
    }
    
    if (typeof wage !== 'number' || isNaN(wage)) {
      throw new ValidationError('Wage must be a valid number', { received: wage });
    }
    
    if (wage < 0) {
      throw new ValidationError('Wage cannot be negative', { received: wage });
    }
    
    // Look up DBWD rates for the role
    const expected = DBWDRates[role as keyof typeof DBWDRates];
    
    // Array to collect validation findings
    const findings = [];

    if (!expected) {
      findings.push({
        type: "Unknown Role",
        detail: `Role '${role}' not found in DBWD rates`
      });
    }
    
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
    if (expected && wage < expected.base) {
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