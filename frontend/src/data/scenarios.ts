import { ShowcaseScenario } from '../types';

export const scenarios: ShowcaseScenario[] = [
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
