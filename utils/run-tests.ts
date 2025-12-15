#!/usr/bin/env node

/**
 * Test Runner Utility
 * 
 * Comprehensive test runner for all test suites with options for:
 * - Running specific test types (unit, integration, system, workflow)
 * - Running failed tests only
 * - Generating coverage reports
 * - CI/CD integration
 * 
 * @file utils/run-tests.ts
 * @usage npm run test:utils or ts-node utils/run-tests.ts [options]
 */

import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

// Test configuration
interface TestConfig {
  type: string;
  pattern: string;
  description: string;
}

const TEST_TYPES: TestConfig[] = [
  { type: 'unit', pattern: 'tests/unit/**/*.test.ts', description: 'Unit tests' },
  { type: 'integration', pattern: 'tests/integration/**/*.test.ts', description: 'Integration tests' },
  { type: 'system', pattern: 'tests/system/**/*.test.ts', description: 'System tests' },
  { type: 'workflow', pattern: 'tests/workflows/**/*.test.ts', description: 'Workflow tests' },
];

// Command line arguments
const args = process.argv.slice(2);
const options = {
  help: args.includes('--help') || args.includes('-h'),
  unit: args.includes('--unit'),
  integration: args.includes('--integration'),
  system: args.includes('--system'),
  workflow: args.includes('--workflow'),
  coverage: args.includes('--coverage') || args.includes('-c'),
  watch: args.includes('--watch') || args.includes('-w'),
  verbose: args.includes('--verbose') || args.includes('-v'),
  failed: args.includes('--failed') || args.includes('-f'),
};

// Show help
if (options.help) {
  console.log(`
WCP AI Agent Test Runner

Usage: ts-node utils/run-tests.ts [options]

Options:
  --unit              Run unit tests only
  --integration       Run integration tests only
  --system            Run system tests only
  --workflow          Run workflow tests only
  --coverage, -c      Generate coverage report
  --watch, -w         Watch mode (re-run on file changes)
  --verbose, -v       Verbose output
  --failed, -f        Run only failed tests from last run
  --help, -h          Show this help

Examples:
  ts-node utils/run-tests.ts                    # Run all tests
  ts-node utils/run-tests.ts --unit             # Run unit tests only
  ts-node utils/run-tests.ts --coverage         # Run with coverage
  ts-node utils/run-tests.ts --unit --verbose   # Verbose unit tests
  ts-node utils/run-tests.ts --failed           # Re-run failed tests
  `);
  process.exit(0);
}

// Determine which tests to run
function getTestPatterns(): string[] {
  const patterns: string[] = [];

  if (options.unit) patterns.push(TEST_TYPES[0].pattern);
  if (options.integration) patterns.push(TEST_TYPES[1].pattern);
  if (options.system) patterns.push(TEST_TYPES[2].pattern);
  if (options.workflow) patterns.push(TEST_TYPES[3].pattern);

  // If no specific type selected, run all
  if (patterns.length === 0) {
    return TEST_TYPES.map(t => t.pattern);
  }

  return patterns;
}

// Build Jest command
function buildJestCommand(patterns: string[]): string {
  const parts = ['npx jest'];

  // Add test patterns
  parts.push(patterns.map(p => `"${p}"`).join(' '));

  // Add options
  if (options.coverage) parts.push('--coverage');
  if (options.watch) parts.push('--watch');
  if (options.verbose) parts.push('--verbose');

  // Force exit for CI environments
  if (!options.watch && process.env.CI) {
    parts.push('--forceExit');
  }

  return parts.join(' ');
}

// Run tests
function runTests(): void {
  const patterns = getTestPatterns();
  const command = buildJestCommand(patterns);

  console.log('\n🧪 WCP AI Agent Test Runner\n');
  console.log(`Running: ${patterns.join(', ')}\n`);
  
  if (options.coverage) {
    console.log('📊 Coverage report will be generated\n');
  }

  try {
    execSync(command, {
      stdio: 'inherit',
      cwd: process.cwd(),
    });

    console.log('\n✅ All tests passed!\n');
    process.exit(0);
  } catch (error) {
    console.log('\n❌ Some tests failed\n');
    process.exit(1);
  }
}

// Create failed tests file for --failed option
function createFailedTestsFile(): void {
  const failedFile = path.join(process.cwd(), '.jest-failed-tests.json');
  
  // This would typically be populated by Jest's --listTests or similar
  // For now, we'll create an empty file if it doesn't exist
  if (!fs.existsSync(failedFile)) {
    fs.writeFileSync(failedFile, JSON.stringify([]));
  }
}

// Main execution
if (options.failed) {
  createFailedTestsFile();
  console.log('Running failed tests (feature requires Jest cache setup)');
}

runTests();
