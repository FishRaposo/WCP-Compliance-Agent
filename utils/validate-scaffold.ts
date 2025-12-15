#!/usr/bin/env node

/**
 * Scaffold Validation Utility
 * 
 * Validates that the project scaffolding is complete and follows patterns.
 * Checks for required directories, files, and structural integrity.
 * 
 * @file utils/validate-scaffold.ts
 * @usage ts-node utils/validate-scaffold.ts
 */

import * as fs from 'fs';
import * as path from 'path';

// ANSI color codes for terminal output
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m',
};

interface ValidationRule {
  type: 'directory' | 'file';
  path: string;
  description: string;
  optional?: boolean;
}

// Validation rules for project scaffolding
const VALIDATION_RULES: ValidationRule[] = [
  // Core directories
  { type: 'directory', path: 'src', description: 'Source code directory' },
  { type: 'directory', path: 'src/mastra', description: 'Mastra framework code' },
  { type: 'directory', path: 'src/mastra/tools', description: 'Mastra tools' },
  { type: 'directory', path: 'src/mastra/agents', description: 'Mastra agents' },
  { type: 'directory', path: 'src/entrypoints', description: 'Entry points' },
  { type: 'directory', path: 'src/utils', description: 'Utility modules' },
  { type: 'directory', path: 'src/middleware', description: 'Express middleware' },
  { type: 'directory', path: 'src/services', description: 'Business logic services' },
  { type: 'directory', path: 'src/types', description: 'TypeScript types' },
  
  // Test directories
  { type: 'directory', path: 'tests', description: 'Test suites' },
  { type: 'directory', path: 'tests/unit', description: 'Unit tests' },
  { type: 'directory', path: 'tests/integration', description: 'Integration tests' },
  { type: 'directory', path: 'tests/system', description: 'System tests' },
  { type: 'directory', path: 'tests/workflows', description: 'Workflow tests' },
  
  // Core files
  { type: 'file', path: 'src/index.ts', description: 'Main entry point' },
  { type: 'file', path: 'src/server.ts', description: 'API server' },
  { type: 'file', path: 'src/mastra/index.ts', description: 'Mastra registration' },
  { type: 'file', path: 'src/mastra/tools/wcp-tools.ts', description: 'WCP extraction & validation tools' },
  { type: 'file', path: 'src/mastra/agents/wcp-agent.ts', description: 'WCP compliance agent' },
  { type: 'file', path: 'src/entrypoints/wcp-entrypoint.ts', description: 'WCP entry point' },
  { type: 'file', path: 'src/types/index.ts', description: 'Shared types' },
  
  // Utility files
  { type: 'file', path: 'src/utils/config.ts', description: 'Configuration utility' },
  { type: 'file', path: 'src/utils/logger.ts', description: 'Logging utility' },
  { type: 'file', path: 'src/utils/errors.ts', description: 'Error handling utility' },
  
  // Middleware files
  { type: 'file', path: 'src/middleware/error-handler.ts', description: 'Error handling middleware' },
  { type: 'file', path: 'src/middleware/validation.ts', description: 'Validation middleware' },
  { type: 'file', path: 'src/middleware/security.ts', description: 'Security middleware' },
  
 // Service files
  { type: 'file', path: 'src/services/wcp-service.ts', description: 'WCP business logic service' },
  
  // Configuration files
  { type: 'file', path: 'package.json', description: 'Package configuration' },
  { type: 'file', path: 'tsconfig.json', description: 'TypeScript configuration' },
  { type: 'file', path: 'jest.config.js', description: 'Jest test configuration' },
  { type: 'file', path: '.env.example', description: 'Environment variables template', optional: true },
  
  // Test files (at least one per type)
  { type: 'file', path: 'tests/unit/test_wcp_tools.test.ts', description: 'Unit tests for WCP tools' },
  { type: 'file', path: 'tests/integration/test_wcp_integration.test.ts', description: 'Integration tests' },
  { type: 'file', path: 'tests/system/test_api_server.test.ts', description: 'System tests for API server' },
  { type: 'file', path: 'tests/workflows/test_wcp_workflow.test.ts', description: 'Workflow tests for WCP processing' },
];

interface ValidationResult {
  rule: ValidationRule;
  exists: boolean;
  passed: boolean;
}

function validatePath(rule: ValidationRule): ValidationResult {
  const fullPath = path.join(process.cwd(), rule.path);
  let exists = false;
  
  try {
    exists = rule.type === 'directory' 
      ? fs.existsSync(fullPath) && fs.statSync(fullPath).isDirectory()
      : fs.existsSync(fullPath) && fs.statSync(fullPath).isFile();
  } catch (error) {
    exists = false;
  }

  return {
    rule,
    exists,
    passed: exists || rule.optional === true,
  };
}

function printValidationHeader(): void {
  console.log('\n🔍 WCP AI Agent Scaffold Validation\n');
  console.log('=' .repeat(60));
}

function printValidationResult(result: ValidationResult): void {
  const icon = result.passed ? '✅' : '❌';
  const color = result.passed ? colors.green : colors.red;
  const typeIcon = result.rule.type === 'directory' ? '📁' : '📄';

  console.log(
    `${icon} ${color}${typeIcon} ${result.rule.path}${colors.reset}`
  );
  console.log(`   ${result.rule.description}`);

  if (!result.passed && !result.rule.optional) {
    console.log(`   ${colors.red}⚠️  Missing required ${result.rule.type}${colors.reset}`);
  } else if (result.rule.optional && !result.exists) {
    console.log(`   ${colors.yellow}⚠️  Missing optional ${result.rule.type}${colors.reset}`);
  }
  console.log();
}

function printSummary(results: ValidationResult[]): void {
  const total = results.length;
  const passed = results.filter(r => r.passed).length;
  const failed = total - passed;
  const required = results.filter(r => !r.rule.optional).length;
  const requiredPassed = results.filter(r => !r.rule.optional && r.passed).length;

  console.log('='.repeat(60));
  console.log('\n📊 Validation Summary\n');
  console.log(`Total checks: ${total}`);
  console.log(`${colors.green}Passed: ${passed}${colors.reset}`);
  console.log(`${colors.red}Failed: ${failed}${colors.reset}`);
  console.log(`\nRequired items: ${required}`);
  console.log(`${colors.green}Required passed: ${requiredPassed}${colors.reset}`);
  console.log(`${colors.red}Required missing: ${required - requiredPassed}${colors.reset}\n`);

  if (failed === 0) {
    console.log(`${colors.green}🎉 All validation checks passed!${colors.reset}`);
    console.log('   The scaffolding is complete and follows best practices.\n');
  } else {
    console.log(`${colors.red}⚠️  Some validation checks failed${colors.reset}`);
    console.log('   Please review the missing items above.\n');
  }

  console.log('='.repeat(60) + '\n');
}

function printRecommendations(): void {
  console.log('💡 Next Steps\n');
  console.log('1. Run tests: npm test');
  console.log('2. Build project: npm run build');
  console.log('3. Start server: npm run serve');
  console.log('4. Run showcase: npm run showcase\n');
}

// Main validation function
function validateScaffold(): void {
  printValidationHeader();

  const results = VALIDATION_RULES.map(rule => validatePath(rule));
  
  results.forEach(result => printValidationResult(result));
  
  printSummary(results);
  
  if (results.every(r => r.passed)) {
    printRecommendations();
  }

  // Exit with appropriate code
  const requiredFailed = results.filter(r => !r.rule.optional && !r.passed);
  process.exit(requiredFailed.length > 0 ? 1 : 0);
}

// Run validation
validateScaffold();
