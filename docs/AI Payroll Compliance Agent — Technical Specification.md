# **AI Payroll Compliance Agent — Technical Specification**

**Use Case:** Weekly Certified Payroll (WCP) \+ Davis–Bacon Wage Decision (DBWD)  
 **Role:** AI Developer – Build Smart AI Systems

---

## **1\. Overview**

This document specifies a production-grade AI agent that reviews **Weekly Certified Payrolls (WCPs)** from subcontractors on federal projects.

The agent must:

* Read daily reports and payroll sheets

* Cross-check hours and totals

* Validate wage rates against the **Davis–Bacon Wage Decision (DBWD)**

* Automatically label each payroll as **Approved**, **Revision Needed**, or **Rejected**

* Provide a **clear, auditable explanation** for each decision

This is not a chatbot. It’s a **decision engine** designed for compliance-heavy, real-world workflows.

---

## **2\. Objectives**

### **Functional Objectives**

1. **Ingest & normalize documents**

   * WCP PDFs/CSVs and daily reports (PDF/CSV; optional scans via OCR)

2. **Extract structured data**

   * Employee names, job titles, localities, hours per day, total hours, base/fringe rates, signatures

3. **Deterministic validations**

   * Arithmetic checks (totals vs sums)

   * Overtime rules (baseline 40h/week; configurable)

   * Required fields & signatures

4. **DBWD validation (RAG)**

   * Map job titles to DBWD classifications

   * Retrieve prevailing wage (base \+ fringe) per locality/date

   * Compare reported vs required wages

5. **Decision generation**

   * Verdict: `APPROVE | REVISION | REJECT`

   * Reasons (structured codes \+ messages)

   * Citations (DBWD references/snippets)

6. **Auditability**

   * Store full **decision trace** (inputs, rules applied, retrieval hits, prompts, outputs)

   * Support replay/debugging

7. **Integration**

   * Provide a clean API to integrate with existing software (backend/UI)

### **Non-Functional Objectives**

* Accuracy: **≥ 90%** agreement with human reviewers on labeled set

* False-approve rate: **\< 2%**

* Latency: **P95 \< 20s** end-to-end for standard documents

* Explainability: every verdict has explicit reasons \+ citations

* Security & privacy: PII minimized, tenant isolation, encrypted storage

* Reliability: idempotent processing, retries, observability, clear failure modes

* Cost: controlled via caching, short contexts, efficient model usage

---

## **3\. Proposed Tech Stack**

* **Language:** TypeScript

* **Orchestration:** Mastra.ai (or similar TS agent framework)

* **LLM Provider:** OpenAI (e.g., GPT-4o / GPT-4.1 family)

* **RAG / Vector Store:** pgvector (Postgres) or Pinecone

* **Database:** Postgres (Supabase or managed instance)

* **API Hosting:** Node/Express or serverless (Vercel / similar)

* **Parsing:** `pdf-parse` / pdfminer; `tesseract.js` for OCR fallback

* **Telemetry:** OpenTelemetry \+ centralized logging

The design is framework-agnostic enough to swap Mastra for another TS agent framework if needed.

---

## **4\. High-Level Architecture**

**Design principle:** Separate **deterministic logic** (math, checks, rules) from **probabilistic reasoning** (fuzzy mapping, explanations). LLMs are used for reasoning, not raw truth.

### **Components**

1. **Ingestion Service**

   * Accepts uploads or URLs

   * Normalizes to a structured WCP representation

2. **Deterministic Validator**

   * Pure TypeScript rule engine

   * Performs arithmetic and structural checks

3. **DBWD RAG Service**

   * Ingests DBWD documents

   * Provides prevailing wage lookups with citations

4. **Decision Agent**

   * Runs in Mastra as an agent

   * Consumes normalized WCP, deterministic findings, and RAG results

   * Emits structured decision JSON

5. **Persistence Layer**

   * Stores normalized WCPs, decisions, and full traces for audit

6. **API Layer**

   * Exposes submit/status/decision/trace endpoints

7. **Observability**

   * Metrics, logs, distributed traces

### **Data Flow**

1. Client uploads WCP \+ daily reports → `/v1/wcp/submit`

2. Ingestion parses and normalizes into typed JSON (`TWCPReport`)

3. Deterministic validators compute findings (ERROR/WARN codes)

4. RAG service retrieves DBWD wage information (base \+ fringe \+ clause ref)

5. Decision Agent evaluates everything and outputs a decision

6. Decision and trace are persisted

7. Client fetches verdict and explanation via API

---

## **5\. Data Model**

### **TypeScript Zod Schemas**

import { z } from "zod";

export const EmployeeEntry \= z.object({  
  name: z.string(),  
  jobTitle: z.string(),  
  locality: z.string().optional(),             // county/zip/locality code  
  dates: z.array(z.string()),                  // ISO dates in this week  
  hoursByDay: z.record(z.string(), z.number()),// { "2025-10-20": 8, ... }  
  reportedBaseRate: z.number().nullable(),  
  reportedFringeRate: z.number().nullable(),  
  reportedTotalPay: z.number().nullable()  
});

export const WCPReport \= z.object({  
  subcontractor: z.string(),  
  projectId: z.string(),  
  weekStart: z.string(),  // ISO  
  weekEnd: z.string(),    // ISO  
  employees: z.array(EmployeeEntry),  
  reportedWeeklyHours: z.number().nullable(),  
  signatures: z.array(z.string()).optional(),  // signer roles  
  attachments: z.array(z.string()).optional()  // storage keys  
});

export type TWCPReport \= z.infer\<typeof WCPReport\>;

export const DecisionSchema \= z.object({  
  verdict: z.enum(\["APPROVE","REVISION","REJECT"\]),  
  reasons: z.array(z.object({  
    code: z.string(),                             // e.g. "TOTAL\_MISMATCH"  
    severity: z.enum(\["WARN","ERROR"\]),  
    details: z.string()  
  })),  
  citations: z.array(z.object({  
    ref: z.string(),                              // DBWD clause/page reference  
    snippet: z.string()  
  })),  
  confidence: z.number().min(0).max(1),  
  traceId: z.string()  
});

export type TDecision \= z.infer\<typeof DecisionSchema\>;

### **Database Tables (Postgres)**

* **docs**

  * `id`, `type` (`wcp`, `daily_report`, `dbwd`), `storage_key`, `sha256`, `uploaded_at`, `tenant_id`

* **wcp\_reports**

  * `id`, `doc_id`, `json`, `week_start`, `week_end`, `project_id`, `tenant_id`

* **dbwd\_records**

  * `id`, `locality_code`, `trade_key`, `base_rate`, `fringe_rate`, `effective_date`, `source_ref`, `raw_chunk`, `embedding`

* **decisions**

  * `id`, `report_id`, `verdict`, `reasons_json`, `citations_json`, `confidence`, `dbwd_version`, `created_at`

* **audit\_traces**

  * `id`, `report_id`, `trace_json`, `model_version`, `prompt_version`, `created_at`

* **mappings\_trade\_synonyms**

  * `id`, `alias`, `trade_key`, `confidence`, `updated_at`

* **users / tenants**

  * For authz and tenant isolation

Vector embeddings for DBWD can sit in pgvector or an external store like Pinecone.

---

## **6\. Pipelines & Logic**

### **6.1 Ingestion & Normalization**

* Parse PDFs/CSVs with `pdf-parse` / similar

* For scanned docs, OCR via `tesseract.js`, with basic image preprocessing

* Normalize all parsed data into `TWCPReport` using Zod:

  * If fields are missing/ambiguous, mark them and/or set WARN findings later

* Store raw doc \+ normalized JSON for audits

### **6.2 Deterministic Validation Rules**

Core rule functions (examples):

export function checkTotals(entries:{ hoursByDay: Record\<string, number\> }\[\], reported?: number){  
  const sum \= entries.reduce(  
    (a,e)=\> a \+ Object.values(e.hoursByDay).reduce((x,y)=\>x+y,0),  
    0  
  );  
  if (reported \== null) {  
    return \[{  
      code:"MISSING\_TOTAL",  
      severity:"WARN",  
      details:\`Calculated=${sum}, but weekly total missing\`  
    }\];  
  }  
  const ok \= Math.abs(sum \- reported) \< 0.25;  
  return ok ? \[\] : \[{  
    code:"TOTAL\_MISMATCH",  
    severity:"ERROR",  
    details:\`Calculated=${sum}, reported=${reported}\`  
  }\];  
}

export function checkOvertime(entries: TWCPReport\["employees"\]){  
  const findings \= \[\];  
  for (const e of entries){  
    const hours \= Object.values(e.hoursByDay).reduce((a,b)=\>a+b,0);  
    if (hours \> 40\) {  
      findings.push({  
        code:"OVERTIME",  
        severity:"WARN",  
        details:\`${e.name}: ${hours}h (baseline 40h)\`  
      });  
    }  
  }  
  return findings;  
}

export function ensureSignatures(signatures?: string\[\]){  
  return (\!signatures || signatures.length \=== 0\)  
    ? \[{  
        code:"MISSING\_SIGNATURE",  
        severity:"ERROR",  
        details:"No signatures found on WCP"  
      }\]  
    : \[\];  
}

Other rules can check:

* Missing required fields (job titles, localities, etc.)

* Negative or clearly invalid values

* Date ranges outside project window (if data is available)

### **6.3 DBWD Retrieval (RAG)**

* **ETL pipeline**:

  * Ingest DBWD documents (PDFs)

  * Split into logically meaningful chunks (trade × locality × section)

  * Store `raw_chunk` \+ `source_ref` (document, section, page)

  * Compute embeddings (`text-embedding-3-large` or similar) and store

* **Query flow**:

  * Map reported `jobTitle` to `trade_key` via `mappings_trade_synonyms`

  * Filter records by locality/date

  * Retrieve top-k candidates by cosine similarity

  * For each relevant worker, compute:

    * Required base/fringe

    * Under/overpayment

    * Clause reference (for citation)

### **6.4 Decision Agent (Mastra)**

Inputs:

* Normalized WCP summary

* Deterministic findings\[\] (structure \+ errors)

* DBWD results per employee (required vs reported wage, clause references)

Outputs:

* `TDecision` JSON (no free-text outside schema)

Prompt sketch:

System:  
You are a Davis–Bacon payroll compliance auditor.  
You receive:  
1\. A normalized weekly payroll summary.  
2\. Deterministic findings from code-level validators.  
3\. Davis–Bacon Wage Decision (DBWD) wage lookups with citations.

You must:  
\- Decide whether the payroll is APPROVE, REVISION, or REJECT.  
\- Use deterministic findings as ground truth for arithmetic and structure.  
\- Use DBWD results as the authority for wage requirements.  
\- Produce reasons and citations that a human auditor can understand.  
\- If evidence is incomplete, choose REVISION and say exactly what is missing.

Output strictly in JSON following the DecisionSchema. No additional text.

Controls:

* JSON mode \+ Zod validation; one repair retry on invalid JSON

* Max tool/agent loops (e.g. 3\) to avoid runaway iterations

* Confidence score based on:

  * Deterministic severity

  * Retrieval similarity scores

  * Internal model heuristic (optional)

* If confidence below threshold or conflicts (e.g. deterministic ERROR but agent suggests APPROVE), route to manual review

---

## **7\. API Design (v1)**

All endpoints are tenant-aware and authenticated (JWT / API key).

### **7.1 Submit WCP**

`POST /v1/wcp/submit`

* **Body**:

  * `multipart/form-data` with `file` fields, or

  * JSON with `{ reportUrl, dailyReportUrl }`

* **Headers**:

  * `Authorization: Bearer <token>`

  * Optional `Idempotency-Key`

**Response**:

 { "reportId": "wcp\_xxx", "status": "QUEUED" }

* 

### **7.2 Get Status**

`GET /v1/wcp/:reportId/status`

**Response**:

 { "reportId": "wcp\_xxx", "status": "QUEUED|PROCESSING|DONE|FAILED" }

* 

### **7.3 Get Decision**

`GET /v1/wcp/:reportId/decision`

* **Response**: `DecisionSchema` JSON

### **7.4 Get Trace**

`GET /v1/wcp/:reportId/trace`

**Response**:

 {  
  "traceId": "trace\_xxx",  
  "steps": \[  
    { "stage": "INGEST", "details": { ... } },  
    { "stage": "VALIDATION", "details": { ... } },  
    { "stage": "DBWD\_LOOKUP", "details": { ... } },  
    { "stage": "DECISION", "details": { ... } }  
  \]  
}

*  (PII redacted as configured)

### **7.5 Admin: DBWD Upload**

`POST /v1/admin/dbwd/upload`

* Upload new DBWD documents, run ETL, update corpus version.

### **7.6 Admin: Trade Synonyms**

`POST /v1/admin/trade-map`

* Link job title alias → canonical trade key.

---

## **8\. Observability**

* **Tracing:** OpenTelemetry spans around each stage (ingest, parse, validate, RAG, agent, persist)

* **Metrics:**

  * Latency: P50/P95 per stage \+ end-to-end

  * Verdict distribution (APPROVE / REVISION / REJECT)

  * Error codes frequency (e.g. `TOTAL_MISMATCH`, `UNDER_DBWD`)

  * RAG hit quality (similarity scores)

  * JSON repair rate

  * Model cost/usage

* **Logging:**

  * Structured JSON logs with:

    * `tenant_id`, `report_id`, `trace_id`, `model_version`, `prompt_version`

  * PII minimized/redacted

* **Dashboards & Alerts:**

  * Latency spikes

  * Cost anomalies

  * Elevated JSON repair or RAG miss rates

  * Increased false-approve risk patterns (from evals)

---

## **9\. Security & Compliance**

* **PII Handling:**

  * Store minimal necessary data

  * Encrypt at rest (DB and object storage)

  * Encrypt in transit (TLS)

  * Hash or tokenize sensitive identifiers where possible

* **Tenant Isolation:**

  * Tenant-scoped DB rows

  * API tokens bound to tenants/roles

* **Access Control:**

  * RBAC (admin, auditor, read-only)

* **Model Privacy:**

  * Avoid sending unnecessary PII to the model

  * Use provider options that disable training on customer data where available

* **Data Retention:**

  * Configurable per tenant

  * Support hard deletion of reports and traces

---

## **10\. Evaluation Strategy**

* **Golden Dataset:**

  * At least 100 WCPs with:

    * Human verdict: APPROVE / REVISION / REJECT

    * Human reasons / DBWD references

* **Metrics:**

  * Verdict accuracy (% match)

  * Reason overlap (e.g. Jaccard index on reason codes)

  * Citation validity (% of citations that truly support the reason)

  * Latency P95

  * False-approve rate (critical)

* **Adversarial Testing:**

  * Scanned/low-quality PDFs

  * Incomplete signatures

  * Edge cases in O/T and fringe

  * Job title synonyms/typos

* **Rollout Gates:**

  * ≥ 90% verdict agreement

  * ≥ 95% citation validity

  * False-approve \< 2%

  * P95 latency \< 20s

---

## **11\. Performance & Cost Management**

* Parsing parallelization (per page where applicable)

* Caching:

  * DBWD embeddings per locality/trade

  * Repeated WCP runs by hash

* Model choice:

  * Smaller models for extraction/normalization

  * Stronger model for decision justification

* Context discipline:

  * Send minimal relevant snippets to the LLM

  * Summaries instead of full raw docs where possible

---

## **12\. Failure Modes & Fallbacks**

* **Parsing fails:** return REVISION with specific feedback (“Unable to parse document; please rescan or upload structured file”)

* **OCR fails:** same as above, with hints on scan quality

* **RAG returns low-confidence:** mark wages as uncertain, auto REVISION with “DBWD lookup inconclusive”

* **JSON invalid:** one repair attempt; on repeated failure → human review queue

* **Deterministic vs Agent conflict:** if code flags ERROR but agent suggests APPROVE, force REVISION or REJECT and flag for QA

---

## **13\. CI/CD & Environments**

* **Environments:**

  * dev → stage → prod

* **CI:**

  * Linting, type-checking, unit tests, integration tests on sample docs

* **Config-as-Code:**

  * Prompts, thresholds, mappings versioned in repo

* **Deployment:**

  * Blue/green or canary for model/prompt changes

  * Shadow evals on production traffic before full rollout

---

## **14\. Milestones (90-Day Plan)**

**Milestone 1 (Days 1–15): Ingestion & Normalization**

* Implement PDF/CSV ingestion

* Normalize into `TWCPReport`

* Store raw \+ normalized in DB  
   **Deliverables:** submit/status API, Zod schemas, basic tests

---

**Milestone 2 (Days 16–30): Deterministic Validation Engine**

* Implement full set of arithmetic & structural validators

* Build evaluation harness for rules

* Achieve ≥ 95% agreement with manual arithmetic checks  
   **Deliverables:** validation module, rule tests, initial metrics

---

**Milestone 3 (Days 31–45): DBWD RAG Layer**

* ETL pipeline for DBWD documents

* Vector store or pgvector integration

* Retrieval service for wage lookups \+ citations  
   **Deliverables:** DBWD upload/admin endpoints, wage lookup API

---

**Milestone 4 (Days 46–60): Decision Agent & Explanations**

* Mastra agent integrating WCP summary, findings, and DBWD results

* JSON-only outputs, Zod-validated

* Full decision and trace persistence  
   **Deliverables:** decision endpoint, audit traces, golden set eval report

---

**Milestone 5 (Days 61–90): Hardening, Observability & Deployment**

* Metrics, logs, traces, dashboards, alerts

* Performance tuning to P95 \< 20s

* Security review and documentation

* Final CI/CD and runbooks  
   **Deliverables:** production-ready service, runbooks, handover docs

---

## **15\. Test Plan**

* **Unit Tests:** parsers, validators, DBWD retrieval functions, decision schema validation

* **Integration Tests:** end-to-end on small labeled dataset; check determinism of traces

* **Load Tests:** concurrent submissions, queue behavior, backpressure

* **Security Tests:** authZ, multitenancy, PII leakage checks

* **Regression Tests:** for each new model/prompt version, run against golden set

---

## **16\. Deliverables Summary**

* Production-ready TypeScript codebase (Mastra workflows/agents, services)

* Database schemas & migrations

* DBWD ETL \+ RAG retrieval layer

* REST API (submit/status/decision/trace) with auth & rate limits

* Evaluation harness \+ initial accuracy report

* Observability stack (metrics, traces, dashboards, alerts)

* Security & data-handling documentation

* Operational runbooks (incident handling, replay, rollback)

* Architecture & implementation documentation

---

## **17\. Risks & Mitigation**

* **Poor scan quality / bad input** → robust error detection \+ clear REVISION messages

* **Ambiguous job titles** → synonym mapping table \+ confidence thresholds \+ manual review

* **DBWD changes or new versions** → versioned corpus, re-evaluation jobs

* **Model drift or provider changes** → pinned model+prompt versions, regular eval runs

* **Cost overrun** → monitoring, caching, careful model selection

---

## **18\. Future Extensions**

Once the WCP agent is stable, the same architecture can be extended to:

* Subcontractor vetting and onboarding checks

* Invoice and timesheet reconciliation

* Automated compliance reports for regulators

* Broader document-based workflows (change orders, claims, RFIs)

The goal is to evolve from a **single WCP agent** to a **compliance intelligence platform** built on the same modular infrastructure.