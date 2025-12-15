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

    // Display structured decision output
    console.log("\nDecision:", JSON.stringify(response.object, null, 2));
    
    // Display raw text response (for debugging)
    console.log("\nRaw Text:", response.text);
    
    // Display tool execution results (for audit trail)
    console.log("\nTool Results:", JSON.stringify(response.toolResults, null, 2));
  } catch (error: any) {
    // Error handling: Log error message and stack trace
    console.error("Error:", error.message);
    if (error.stack) {
      console.error(error.stack);
    }
    process.exit(1);
  }
})();
