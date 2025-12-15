/**
 * Basic Test Script
 * 
 * Simple test script for quick validation of the WCP AI Agent.
 * Demonstrates the core workflow: extract → validate → decide.
 * 
 * Usage:
 *   npm run test
 *   # or
 *   ts-node --esm src/index.ts
 * 
 * For a comprehensive showcase with multiple scenarios, use:
 *   npm run showcase
 * 
 * @file src/index.ts
 * @see README.md - For showcase demo and quick start instructions
 * @see showcase/README.md - Showcase folder documentation
 */

// Internal dependencies
import { generateWcpDecision } from "./entrypoints/wcp-entrypoint.js";
import { validateEnvironmentOrExit } from "./utils/env-validator.js";
import { formatApiError } from "./utils/errors.js";

// Validate environment before starting
validateEnvironmentOrExit();

/**
 * Main execution function
 * 
 * Workflow:
 * 1. Process a test WCP input
 * 2. Display structured decision output
 * 3. Handle errors gracefully
 */
(async () => {
  try {
    // Test WCP input: Electrician with 45 hours (overtime) and $50 wage
    // Expected: Revise status due to overtime (>40 hours)
    // Note: Would also trigger underpayment if wage < $51.69 base rate
    const fakeWCP = "Role: Electrician, Hours: 45, Wage: $50";

    console.log("Processing WCP:", fakeWCP);
    console.log("...\n");

    // Generate compliance decision using the agent
    // The agent will:
    // 1. Extract data using extractWCPTool
    // 2. Validate against DBWD rates using validateWCPTool
    // 3. Make decision (Approved/Revise/Reject) with explanation
    const response = await generateWcpDecision({
      content: fakeWCP,
      maxSteps: 3,
      onStepFinish: ({ text, toolCalls, toolResults, finishReason }) => {
        console.log("Step:", { text, toolCalls, toolResults, finishReason });
      },
    });

    // Validate response.object before using it
    if (!response.object) {
      const formattedError = formatApiError(new Error('LLM returned invalid response: missing object'));
      
      console.error("\n❌ Invalid Response Error:");
      console.error(`Error Code: ${formattedError.error.code}`);
      console.error(`Message: ${formattedError.error.message}`);
      console.error("Response:", response);
      
      // Exit with error code for CI/CD
      process.exit(1);
    }

    // Display structured decision output
    console.log("\nDecision:", JSON.stringify(response.object, null, 2));
    
    // Display raw text response (for debugging)
    console.log("\nRaw Text:", response.text);
    
    // Display tool execution results (for audit trail)
    console.log("\nTool Results:", JSON.stringify(response.toolResults, null, 2));
  } catch (error: any) {
    // Structured error handling with proper error formatting
    const formattedError = formatApiError(error);
    
    console.error("\n❌ Error occurred while processing WCP:");
    console.error(`Error Code: ${formattedError.error.code}`);
    console.error(`Message: ${formattedError.error.message}`);
    
    // Show details if available
    if (error && typeof error === 'object' && 'details' in error) {
      console.error("\nDetails:", (error as any).details);
    }
    
    // Exit with error code for CI/CD
    process.exit(1);
  }
})();