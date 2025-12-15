# WORKFLOW.md - User Workflows & Validation Guide

**Purpose**: This document describes expected user workflows, navigation paths, and feature interactions. Use this for validation testing to ensure each workflow functions correctly.

**Last Updated**: 2025-01-27  
**Project Status**: Prototype

---

## 🎯 Workflow Overview

This guide covers all major user workflows in the WCP AI Agent Prototype. Each workflow includes:
- **Steps**: Detailed step-by-step instructions
- **Navigation**: Expected routes and transitions
- **UI States**: What the user should see at each step
- **Validation**: Key points to verify functionality
- **Success Criteria**: How to confirm the workflow completed successfully

---

## 📋 Table of Contents

1. [WCP Processing Workflow](#1-wcp-processing-workflow)
2. [Validation Workflow](#2-validation-workflow)
3. [Decision Workflow](#3-decision-workflow)
4. [Error Handling Workflow](#4-error-handling-workflow)

---

## 1. WCP Processing Workflow

### Workflow 1.1: Process WCP Text Input

**Trigger**: User provides WCP text input (e.g., "Role: Electrician, Hours: 45, Wage: $50")

**Steps**:

1. **Input Processing**
   - **From**: User input (text string)
   - **Action**: Agent receives WCP text input
   - **Expected**: Agent processes input through `extractWCPTool`
   - **Validation**: 
     - Input is received correctly
     - Agent calls `extractWCPTool` with input content
     - Tool extracts role, hours, and wage from input

2. **Data Extraction**
   - **From**: Raw WCP text input
   - **Action**: `extractWCPTool` parses input using regex patterns
   - **Expected**: Tool returns structured data (role, hours, wage)
   - **Validation**:
     - Role is extracted correctly (e.g., "Electrician")
     - Hours are extracted correctly (e.g., 45)
     - Wage is extracted correctly (e.g., 50)

3. **Data Validation**
   - **From**: Extracted data (role, hours, wage)
   - **Action**: Agent calls `validateWCPTool` with extracted data
   - **Expected**: Tool validates data against DBWD rates
   - **Validation**:
     - Tool checks for overtime (>40 hours)
     - Tool checks for underpayment (< base rate)
     - Tool returns findings array and validation status

4. **Decision Making**
   - **From**: Validation findings
   - **Action**: Agent makes compliance decision (Approve/Revise/Reject)
   - **Expected**: Agent returns structured decision with explanation
   - **Validation**:
     - Decision is made based on findings
     - Explanation cites DBWD rules and findings
     - Trace log includes step-by-step reasoning

**Success Criteria**:
- ✅ WCP text input is processed correctly
- ✅ Data is extracted accurately
- ✅ Data is validated against DBWD rates
- ✅ Decision is made with explanation and trace

---

## 2. Validation Workflow

### Workflow 2.1: Validate WCP Against DBWD Rates

**Trigger**: Extracted WCP data (role, hours, wage) needs validation

**Steps**:

1. **Rate Lookup**
   - **From**: Extracted role (e.g., "Electrician")
   - **Action**: Tool looks up DBWD rates for role
   - **Expected**: Tool retrieves base rate and fringe rate
   - **Validation**:
     - Base rate is retrieved (e.g., $51.69 for Electrician)
     - Fringe rate is retrieved (e.g., $34.63 for Electrician)
     - Unknown roles are handled gracefully

2. **Overtime Check**
   - **From**: Extracted hours (e.g., 45)
   - **Action**: Tool checks if hours > 40
   - **Expected**: Tool identifies overtime if hours > 40
   - **Validation**:
     - Overtime is detected correctly
     - Finding is added to findings array
     - Finding detail includes DBWD overtime requirement

3. **Underpayment Check**
   - **From**: Extracted wage (e.g., $50) and base rate (e.g., $51.69)
   - **Action**: Tool checks if wage < base rate
   - **Expected**: Tool identifies underpayment if wage < base rate
   - **Validation**:
     - Underpayment is detected correctly
     - Finding is added to findings array
     - Finding detail includes expected base rate and fringe

4. **Validation Result**
   - **From**: Validation findings
   - **Action**: Tool returns validation result
   - **Expected**: Tool returns findings array and validation status
   - **Validation**:
     - Findings array includes all violations
     - Validation status is correct (isValid: true/false)
     - Findings are formatted correctly

**Success Criteria**:
- ✅ DBWD rates are looked up correctly
- ✅ Overtime is detected correctly
- ✅ Underpayment is detected correctly
- ✅ Validation result is accurate

---

## 3. Decision Workflow

### Workflow 3.1: Make Compliance Decision

**Trigger**: Validation findings are available

**Steps**:

1. **Findings Analysis**
   - **From**: Validation findings array
   - **Action**: Agent analyzes findings
   - **Expected**: Agent identifies severity of violations
   - **Validation**:
     - Findings are analyzed correctly
     - Severity is assessed (minor vs major violations)
     - Decision logic is applied correctly

2. **Decision Making**
   - **From**: Findings analysis
   - **Action**: Agent makes decision (Approved/Revise/Reject)
   - **Expected**: Agent returns decision based on findings
   - **Validation**:
     - Decision is made correctly (Approved if no issues, Revise if minor, Reject if major)
     - Decision logic is consistent
     - Edge cases are handled correctly

3. **Explanation Generation**
   - **From**: Decision and findings
   - **Action**: Agent generates human-readable explanation
   - **Expected**: Agent returns explanation citing DBWD rules and findings
   - **Validation**:
     - Explanation is clear and accurate
     - Explanation cites DBWD rules
     - Explanation references specific findings

4. **Trace Log Generation**
   - **From**: Processing steps
   - **Action**: Agent generates trace log
   - **Expected**: Agent returns step-by-step reasoning log
   - **Validation**:
     - Trace log includes all steps
     - Trace log is detailed enough for audit
     - Trace log is formatted correctly

**Success Criteria**:
- ✅ Decision is made correctly
- ✅ Explanation is clear and accurate
- ✅ Trace log is complete
- ✅ Structured output matches schema

---

## 4. Error Handling Workflow

### Workflow 4.1: Handle Invalid Input

**Trigger**: Invalid WCP input (e.g., missing role, invalid format)

**Steps**:

1. **Input Validation**
   - **From**: Invalid WCP input
   - **Action**: Agent receives invalid input
   - **Expected**: Agent handles invalid input gracefully
   - **Validation**:
     - Invalid input is detected
     - Error is handled gracefully
     - Error message is clear

2. **Error Handling**
   - **From**: Invalid input error
   - **Action**: Agent handles error
   - **Expected**: Agent returns error response or Reject decision
   - **Validation**:
     - Error is handled correctly
     - Error message is informative
     - Decision is Reject with explanation

3. **Error Reporting**
   - **From**: Error handling
   - **Action**: Agent reports error
   - **Expected**: Agent returns error in structured format
   - **Validation**:
     - Error is reported correctly
     - Error message is clear
     - Error is logged for audit

**Success Criteria**:
- ✅ Invalid input is detected
- ✅ Error is handled gracefully
- ✅ Error message is clear
- ✅ Decision is Reject with explanation

---

## 5. Web Interface Workflow

### Workflow 5.1: Interactive Compliance Check

**Trigger**: User opens the Web Interface

**Steps**:

1. **Scenario Selection**
   - **From**: Scenario list (sidebar/menu)
   - **Action**: User selects a predefined scenario (e.g., "Revise - Overtime Issue")
   - **Expected**: Input area populates with scenario text, expected result is displayed
   - **Validation**:
     - Input text matches scenario
     - Expected status matches scenario definition

2. **Analysis Execution**
   - **From**: "Run Compliance Check" button
   - **Action**: User clicks button
   - **Expected**: Frontend sends request to API, displays loading state, then renders results
   - **Validation**:
     - Loading spinner appears
     - Result card appears upon completion
     - Status matches expected outcome (Passed/Failed indicator)

3. **Result Visualization**
   - **From**: Analysis completion
   - **Action**: UI renders result card
   - **Expected**: Status, Explanation, Findings, and Metrics are shown
   - **Validation**:
     - Status color is correct (Green/Yellow/Red)
     - Findings are listed if present
     - Health metrics (Confidence, Latency) are displayed

**Success Criteria**:
- ✅ User can load scenarios
- ✅ Analysis runs successfully
- ✅ Results are visualized correctly
- ✅ Scenario validation (Expected vs Actual) is shown

---

## 6. Validation Testing

### Test Scenarios

1. **Valid WCP Input**: Test with valid WCP text input
2. **Overtime Scenario**: Test with hours > 40
3. **Underpayment Scenario**: Test with wage < base rate
4. **Invalid Input**: Test with invalid or missing data
5. **Unknown Role**: Test with unknown role

### Test Execution

```bash
# Run test script
npm run test

# Or using ts-node directly (requires --esm flag for ES modules)
ts-node --esm src/index.ts
```

**⚠️ Note**: The test script has basic error handling (try-catch block). However, comprehensive error handling with specific error types and validation is still being implemented (see **TODO.md**).

### Expected Outputs

- **Approved**: No violations found
- **Revise**: Minor violations found (e.g., overtime)
- **Reject**: Major violations found (e.g., underpayment, invalid input)

---

**Last Updated**: 2025-01-27
