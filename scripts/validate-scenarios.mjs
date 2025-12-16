// Validation script for all 6 demo scenarios
// Set mock mode before importing modules
process.env.OPENAI_API_KEY = 'mock';

import { generateWcpDecision } from './dist/entrypoints/wcp-entrypoint.js';

const scenarios = [
  {
    name: "✅ Scenario 1: Approved - Valid WCP (Electrician)",
    input: "Role: Electrician, Hours: 40, Wage: $55.00",
    expectedStatus: "Approved",
    expectedFindings: []
  },
  {
    name: "⚠️ Scenario 2: Revise - Overtime Issue (Electrician)",
    input: "Role: Electrician, Hours: 45, Wage: $55.00",
    expectedStatus: "Revise",
    expectedFindings: ["Overtime"]
  },
  {
    name: "❌ Scenario 3: Reject - Underpayment (Electrician)",
    input: "Role: Electrician, Hours: 40, Wage: $30.00",
    expectedStatus: "Reject",
    expectedFindings: ["Underpay"]
  },
  {
    name: "✅ Scenario 4: Approved - Laborer Valid",
    input: "Role: Laborer, Hours: 40, Wage: $30.00",
    expectedStatus: "Approved",
    expectedFindings: []
  },
  {
    name: "⚠️ Scenario 5: Revise - Laborer Overtime",
    input: "Role: Laborer, Hours: 50, Wage: $30.00",
    expectedStatus: "Revise",
    expectedFindings: ["Overtime"]
  },
  {
    name: "❌ Scenario 6: Reject - Laborer Underpayment",
    input: "Role: Laborer, Hours: 40, Wage: $20.00",
    expectedStatus: "Reject",
    expectedFindings: ["Underpay"]
  }
];

async function validateScenario(scenario, index) {
  console.log(`\n${'='.repeat(80)}`);
  console.log(`Testing ${scenario.name}`);
  console.log(`Input: "${scenario.input}"`);
  console.log(`Expected Status: ${scenario.expectedStatus}`);
  console.log(`Expected Findings: ${scenario.expectedFindings.join(', ') || 'None'}`);
  console.log('-'.repeat(80));

  try {
    const response = await generateWcpDecision({ content: scenario.input });
    const result = response.object;

    // Validate status
    const statusMatch = result.status === scenario.expectedStatus;
    console.log(`✓ Status: ${result.status} ${statusMatch ? '✅ PASS' : '❌ FAIL'}`);

    if (!statusMatch) {
      console.log(`  Expected: ${scenario.expectedStatus}`);
      console.log(`  Got: ${result.status}`);
    }

    // Validate findings
    let findingsMatch = true;
    if (scenario.expectedFindings.length === 0) {
      findingsMatch = result.findings.length === 0;
      console.log(`✓ Findings: ${result.findings.length === 0 ? 'None' : result.findings.map(f => f.type).join(', ')} ${findingsMatch ? '✅ PASS' : '❌ FAIL'}`);
    } else {
      for (const expectedFinding of scenario.expectedFindings) {
        const found = result.findings.some(f => f.type === expectedFinding);
        console.log(`✓ Finding "${expectedFinding}": ${found ? 'Found' : 'Missing'} ${found ? '✅ PASS' : '❌ FAIL'}`);
        if (!found) findingsMatch = false;
      }
    }

    // Display additional details
    console.log(`\nDetails:`);
    console.log(`  Explanation: ${result.explanation.substring(0, 100)}...`);
    console.log(`  Findings Count: ${result.findings.length}`);
    if (result.findings.length > 0) {
      result.findings.forEach((f, i) => {
        console.log(`    ${i + 1}. ${f.type}: ${f.detail.substring(0, 60)}...`);
      });
    }
    console.log(`  Audit Trace Steps: ${result.trace.length}`);
    console.log(`  Health Metrics:`);
    console.log(`    - Cycle Time: ${result.health.cycleTime}ms`);
    console.log(`    - Token Usage: ${result.health.tokenUsage}`);
    console.log(`    - Validation Score: ${result.health.validationScore}`);
    console.log(`    - Confidence: ${result.health.confidence}`);

    return statusMatch && findingsMatch;
  } catch (error) {
    console.log(`❌ ERROR: ${error.message}`);
    console.error(error);
    return false;
  }
}

async function runValidation() {
  console.log('\n🚀 Starting WCP AI Agent Demo - 6 Scenarios Validation\n');
  console.log(`Environment: ${process.env.OPENAI_API_KEY === 'mock' ? 'Mock Mode' : 'Real OpenAI Mode'}`);
  console.log(`Date: ${new Date().toISOString()}`);

  const results = [];

  for (let i = 0; i < scenarios.length; i++) {
    const passed = await validateScenario(scenarios[i], i);
    results.push({ scenario: scenarios[i].name, passed });
  }

  // Summary
  console.log(`\n${'='.repeat(80)}`);
  console.log('📊 VALIDATION SUMMARY');
  console.log('='.repeat(80));

  results.forEach((r, i) => {
    console.log(`${i + 1}. ${r.scenario}: ${r.passed ? '✅ PASS' : '❌ FAIL'}`);
  });

  const passCount = results.filter(r => r.passed).length;
  const totalCount = results.length;
  const passRate = (passCount / totalCount * 100).toFixed(1);

  console.log('\n' + '='.repeat(80));
  console.log(`Results: ${passCount}/${totalCount} scenarios passed (${passRate}%)`);
  console.log('='.repeat(80));

  if (passCount === totalCount) {
    console.log('\n🎉 ALL SCENARIOS PASSED! The demo is working perfectly.');
  } else {
    console.log(`\n⚠️ ${totalCount - passCount} scenario(s) failed. Please review the failures above.`);
  }

  return passCount === totalCount;
}

// Run validation
runValidation()
  .then(success => {
    process.exit(success ? 0 : 1);
  })
  .catch(error => {
    console.error('\n💥 Fatal error during validation:', error);
    process.exit(1);
  });
