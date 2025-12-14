/**
 * Showcase Demo Script
 * 
 * Professional demo script demonstrating the WCP AI Agent Prototype with 6 scenarios.
 * 
 * Scenarios:
 * - ✅ Approved: Valid WCP with no violations
 * - ⚠️ Revise: Minor violations (overtime)
 * - ❌ Reject: Major violations (underpayment)
 * 
 * Usage:
 *   npm run showcase
 * 
 * Output:
 *   - Color-coded professional formatting
 *   - Multiple scenarios with clear explanations
 *   - Summary report at the end
 * 
 * @file showcase/scripts/showcase.ts
 * @see README.md - Project overview and showcase information
 * @see docs/showcase/README.md - Showcase folder documentation
 */

// External dependencies
import chalk from "chalk";

// Internal dependencies
// Note: Import paths are relative to showcase/ folder
// Using compiled dist files for clean source/compiled separation
import { mastra } from "../../dist/mastra/index.js";
import { WCPDecisionSchema } from "../../dist/mastra/agents/wcp-agent.js";
import { generateWcpDecision } from "../../dist/entrypoints/wcp-entrypoint.js";

/**
 * Showcase Scenario Interface
 * 
 * Defines the structure for showcase demo scenarios.
 * Each scenario tests a specific compliance case.
 */
interface ShowcaseScenario {
  /** Display name for the scenario (e.g., "✅ Approved - Valid WCP") */
  name: string;
  /** Human-readable description of what this scenario tests */
  description: string;
  /** WCP input text to process (e.g., "Role: Electrician, Hours: 40, Wage: $55.00") */
  input: string;
  /** Expected compliance decision status */
  expectedStatus: "Approved" | "Revise" | "Reject";
  /** Optional: Expected violation types (e.g., ["Overtime", "Underpay"]) */
  expectedFindings?: string[];
}

/**
 * Showcase Demo Scenarios
 * 
 * Array of test scenarios demonstrating different compliance cases:
 * - Approved: Valid WCPs with no violations
 * - Revise: Minor violations requiring correction (e.g., overtime)
 * - Reject: Major violations requiring rejection (e.g., underpayment)
 */
const scenarios: ShowcaseScenario[] = [
  {
    name: "✅ Approved - Valid WCP",
    description: "A valid WCP with no violations - should be approved",
    input: "Role: Electrician, Hours: 40, Wage: $55.00",
    expectedStatus: "Approved",
  },
  {
    name: "⚠️ Revise - Overtime Issue",
    description: "WCP with overtime hours (>40) - requires revision",
    input: "Role: Electrician, Hours: 45, Wage: $55.00",
    expectedStatus: "Revise",
    expectedFindings: ["Overtime"],
  },
  {
    name: "❌ Reject - Underpayment",
    description: "WCP with wage below DBWD base rate - major violation",
    input: "Role: Electrician, Hours: 40, Wage: $30.00",
    expectedStatus: "Reject",
    expectedFindings: ["Underpay"],
  },
  {
    name: "✅ Approved - Laborer Valid",
    description: "Valid Laborer WCP with no violations",
    input: "Role: Laborer, Hours: 40, Wage: $30.00",
    expectedStatus: "Approved",
  },
  {
    name: "⚠️ Revise - Laborer Overtime",
    description: "Laborer WCP with overtime - requires revision",
    input: "Role: Laborer, Hours: 50, Wage: $30.00",
    expectedStatus: "Revise",
    expectedFindings: ["Overtime"],
  },
  {
    name: "❌ Reject - Laborer Underpayment",
    description: "Laborer WCP with wage below base rate",
    input: "Role: Laborer, Hours: 40, Wage: $20.00",
    expectedStatus: "Reject",
    expectedFindings: ["Underpay"],
  },
];

/**
 * Print Showcase Header
 * 
 * Displays a formatted header for the showcase demo.
 * Shows project name, approach, and technology stack.
 */
function printHeader(): void {
  console.log("\n" + chalk.bold.cyan("=".repeat(80)));
  console.log(chalk.bold.cyan("  WCP AI Agent Prototype - Showcase Demo"));
  console.log(chalk.bold.cyan("=".repeat(80)));
  console.log(chalk.gray("  Demonstrating hybrid AI approach: Deterministic tools + LLM reasoning"));
  console.log(chalk.gray("  Framework: Mastra.ai | Model: OpenAI GPT-4o-mini"));
  console.log(chalk.bold.cyan("=".repeat(80)) + "\n");
}

/**
 * Print Scenario Header
 * 
 * Displays formatted header for a single scenario.
 * Shows scenario number, name, description, input, and expected results.
 * 
 * @param scenario - The showcase scenario to display
 * @param index - Zero-based index of the scenario in the scenarios array
 */
function printScenarioHeader(scenario: ShowcaseScenario, index: number): void {
  console.log("\n" + chalk.bold.yellow("─".repeat(80)));
  console.log(chalk.bold.white(`Scenario ${index + 1}/${scenarios.length}: ${scenario.name}`));
  console.log(chalk.gray(`  ${scenario.description}`));
  console.log(chalk.bold.yellow("─".repeat(80)));
  console.log(chalk.cyan("Input:") + ` ${chalk.white(scenario.input)}`);
  console.log(chalk.cyan("Expected:") + ` ${chalk.white(scenario.expectedStatus)}`);
  if (scenario.expectedFindings) {
    console.log(chalk.cyan("Expected Findings:") + ` ${chalk.white(scenario.expectedFindings.join(", "))}`);
  }
  console.log();
}

/**
 * Print Compliance Decision
 * 
 * Displays a formatted compliance decision output.
 * Shows status (color-coded), explanation, findings, and audit trace.
 * 
 * @param decision - The compliance decision object from the agent
 *                   Expected structure: { status, explanation, findings, trace }
 */
function printDecision(decision: any): void {
  console.log(chalk.bold.green("\n" + "═".repeat(80)));
  console.log(chalk.bold.white("  COMPLIANCE DECISION"));
  console.log(chalk.bold.green("═".repeat(80)) + "\n");

  // Status with color coding: Green for Approved, Yellow for Revise, Red for Reject
  const statusColor = 
    decision.status === "Approved" ? chalk.green :
    decision.status === "Revise" ? chalk.yellow :
    chalk.red;
  
  console.log(chalk.bold("Status:") + ` ${statusColor.bold(decision.status)}`);
  console.log();

  // Human-readable explanation citing DBWD rules and findings
  console.log(chalk.bold("Explanation:"));
  console.log(chalk.white(decision.explanation));
  console.log();

  // Violations found during validation
  if (decision.findings && decision.findings.length > 0) {
    console.log(chalk.bold("Findings:"));
    decision.findings.forEach((finding: any, index: number) => {
      // Color code: Yellow for Overtime (minor), Red for Underpay (major)
      const findingColor = finding.type === "Overtime" ? chalk.yellow : chalk.red;
      console.log(`  ${index + 1}. ${findingColor(finding.type)}: ${chalk.white(finding.detail)}`);
    });
    console.log();
  } else {
    console.log(chalk.green("  ✅ No violations found"));
    console.log();
  }

  // Step-by-step reasoning log for auditability
  if (decision.trace && decision.trace.length > 0) {
    console.log(chalk.bold("Audit Trace:"));
    decision.trace.forEach((step: string, index: number) => {
      console.log(chalk.gray(`  ${index + 1}. ${step}`));
    });
    console.log();
  }
}

/**
 * Print Showcase Summary
 * 
 * Displays a summary report of all showcase scenarios.
 * Shows total scenarios, success count, and detailed results for each scenario.
 * 
 * @param results - Array of scenario results with success status
 *                  Each result contains: scenario, decision, and success boolean
 */
function printSummary(results: Array<{ scenario: ShowcaseScenario; decision: any; success: boolean }>): void {
  console.log("\n" + chalk.bold.cyan("=".repeat(80)));
  console.log(chalk.bold.white("  SHOWCASE SUMMARY"));
  console.log(chalk.bold.cyan("=".repeat(80)) + "\n");

  // Calculate statistics
  const total = results.length;
  const successful = results.filter(r => r.success).length;
  const failed = total - successful;

  // Display summary statistics
  console.log(chalk.bold(`Total Scenarios: ${total}`));
  console.log(chalk.green(`✅ Successful: ${successful}`));
  if (failed > 0) {
    console.log(chalk.red(`❌ Failed: ${failed}`));
  }
  console.log();

  // Display detailed results for each scenario
  // Shows whether expected status matches actual status
  results.forEach((result, index) => {
    const status = result.success ? chalk.green("✓") : chalk.red("✗");
    const actualStatus = 
      result.decision?.status === "Approved" ? chalk.green(result.decision.status) :
      result.decision?.status === "Revise" ? chalk.yellow(result.decision.status) :
      result.decision?.status === "Reject" ? chalk.red(result.decision.status) :
      chalk.red("Error");
    
    console.log(`${status} Scenario ${index + 1}: ${chalk.white(result.scenario.name)}`);
    console.log(`    Expected: ${chalk.white(result.scenario.expectedStatus)} | Actual: ${actualStatus}`);
  });

  console.log("\n" + chalk.bold.cyan("=".repeat(80)) + "\n");
}

/**
 * Run Showcase Demo
 * 
 * Main function that executes all showcase scenarios.
 * Processes each scenario, displays results, and generates summary report.
 * 
 * Workflow:
 * 1. Display header
 * 2. Get WCP agent instance
 * 3. Process each scenario sequentially
 * 4. Display decision for each scenario
 * 5. Validate results against expected outcomes
 * 6. Display summary report
 * 
 * @throws {Error} If agent cannot be retrieved or fatal error occurs
 */
async function runShowcase(): Promise<void> {
  printHeader();

  // Track results for each scenario
  const results: Array<{ scenario: ShowcaseScenario; decision: any; success: boolean }> = [];

  try {
    // Process each scenario sequentially
    for (let i = 0; i < scenarios.length; i++) {
      const scenario = scenarios[i];
      printScenarioHeader(scenario, i);

      try {
        // Generate compliance decision for this scenario using the entrypoint
        const response = await generateWcpDecision({
          content: scenario.input,
          maxSteps: 3,
          onStepFinish: ({ text, toolCalls, toolResults, finishReason }: {
            text?: string;
            toolCalls?: any;
            toolResults?: any;
            finishReason?: string;
          }) => {
            // Silent step tracking for cleaner output
            // Uncomment for debugging:
            // console.log(chalk.gray(`  Step: ${finishReason} | Tools: ${toolCalls?.length || 0}`));
          },
        });

        // Validate and display decision
        if (response.object) {
          const decision = response.object;
          printDecision(decision);

          // Validate that actual status matches expected status
          const success = decision.status === scenario.expectedStatus;
          results.push({ scenario, decision, success });

          // Warn if status doesn't match expected
          if (!success) {
            console.log(chalk.red(`⚠️  Warning: Expected ${scenario.expectedStatus}, got ${decision.status}`));
          }
        } else {
          // Handle case where agent didn't return structured output
          console.log(chalk.red("❌ Error: No decision object returned"));
          results.push({ scenario, decision: null, success: false });
        }
      } catch (error: any) {
        console.log(chalk.red(`❌ Error processing scenario: ${error.message}`));
        results.push({ scenario, decision: null, success: false });
      }

      // Add 1-second delay between scenarios for readability
      if (i < scenarios.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }

    // Display final summary report
    printSummary(results);
  } catch (error: any) {
    // Handle fatal errors (agent retrieval, etc.)
    console.error(chalk.red("\n❌ Fatal Error:"));
    console.error(chalk.red(error.message));
    if (error.stack) {
      console.error(chalk.gray(error.stack));
    }
    process.exit(1);
  }
}

/**
 * Entry Point
 * 
 * Execute the showcase demo and handle any uncaught errors.
 */
runShowcase().catch((error) => {
  console.error(chalk.red("Fatal error:"), error);
  process.exit(1);
});

