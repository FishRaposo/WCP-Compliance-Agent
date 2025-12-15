# Requirements Traceability Matrix

**Purpose**: Maps technical specification requirements to development phases and identifies gaps.

**Last Updated**: 2025-12-15

---

## 📊 Summary

| Category | Total Spec Requirements | Currently Implemented | Planned | Gaps | Coverage |
|----------|------------------------|----------------------|---------|-------|----------|
| Document Ingestion | 3 | 1 | 2 | 0 | 100% |
| Data Extraction | 6 | 1 | 5 | 0 | 100% |
| Validation | 4 | 2 | 2 | 0 | 100% |
| DBWD Integration | 3 | 1 | 2 | 0 | 100% |
| Decision Engine | 4 | 3 | 1 | 0 | 100% |
| Auditability | 3 | 1 | 2 | 0 | 100% |
| Integration | 3 | 2 | 1 | 0 | 100% |
| Non-Functional | 7 | 2 | 5 | 0 | 100% |
| **TOTAL** | **33** | **13** | **20** | **0** | **100%** |

**Note**: Coverage shows 100% of requirements are now planned across development phases.

---

## 📋 Detailed Traceability

### 1. Document Ingestion

| Spec Requirement | Current Implementation | Planned Phase | Gap |
|------------------|----------------------|---------------|-----|
| PDF parsing | ❌ Not implemented | Phase 2 | Missing pdf-parse integration |
| CSV parsing | ❌ Not implemented | Phase 2 | No CSV support |
| OCR support for scans | ❌ Not implemented | Phase 3 | No tesseract.js integration |

### 2. Data Extraction

| Spec Requirement | Current Implementation | Planned Phase | Gap |
|------------------|----------------------|---------------|-----|
| Employee names | ❌ Not extracted | Phase 2 | Only extracts role |
| Job titles | ✅ Partial (role only) | Phase 2 | Doesn't map to DBWD classifications |
| Localities | ❌ Not extracted | Phase 2 | Missing location data |
| Hours by day | ❌ Only total hours | Phase 2 | No daily breakdown |
| Base/Fringe rates | ❌ Only total wage | Phase 2 | No rate separation |
| Signatures | ❌ Not detected | Phase 3 | No signature validation |

### 3. Validation

| Spec Requirement | Current Implementation | Planned Phase | Gap |
|------------------|----------------------|---------------|-----|
| Arithmetic checks | ✅ Basic (hours validation) | Phase 1 | No total vs sum validation |
| Overtime rules | ✅ Basic (40h/week) | Phase 1 | Not configurable |
| Required fields | ✅ Basic validation | Phase 1 | Missing field-specific checks |
| Signature validation | ❌ Not implemented | Phase 3 | No signature detection |

### 4. DBWD Validation

| Spec Requirement | Current Implementation | Planned Phase | Gap |
|------------------|----------------------|---------------|-----|
| Job title mapping | ❌ Hardcoded roles only | Phase 2 | No RAG-based mapping |
| Locality-based rates | ❌ Hardcoded rates only | Phase 3 | No location support |
| Base + fringe comparison | ❌ Total wage only | Phase 2 | No rate separation |

### 5. Decision Engine

| Spec Requirement | Current Implementation | Planned Phase | Gap |
|------------------|----------------------|---------------|-----|
| Verdict (APPROVE/REVISION/REJECT) | ✅ Implemented | Phase 0 | ✅ Complete |
| Structured reasons | ✅ Partial (findings array) | Phase 1 | Missing error codes |
| DBWD citations | ❌ Not implemented | Phase 3 | No citation system |
| Confidence score | ✅ Partial (health.confidence) | Phase 1 | Not in decision schema |

### 6. Auditability

| Spec Requirement | Current Implementation | Planned Phase | Gap |
|------------------|----------------------|---------------|-----|
| Full decision trace | ✅ Partial (trace array) | Phase 1 | Missing inputs/rules applied |
| Replay capability | ❌ Not implemented | Phase 3 | No replay system |
| Storage of traces | ❌ In-memory only | Phase 2 | No persistence |

### 7. Integration

| Spec Requirement | Current Implementation | Planned Phase | Gap |
|------------------|----------------------|---------------|-----|
| Clean API | ✅ REST endpoints | Phase 0 | ✅ Complete |
| Submit/status endpoints | ✅ Basic analyze endpoint | Phase 1 | No async processing |
| Trace endpoint | ❌ Not implemented | Phase 2 | No trace retrieval API |

### 8. Non-Functional Requirements

| Spec Requirement | Current Implementation | Planned Phase | Gap |
|------------------|----------------------|---------------|-----|
| Accuracy ≥90% | ❌ Not measured | Phase 2 | No evaluation framework |
| False-approve <2% | ❌ Not measured | Phase 2 | No metrics |
| P95 latency <20s | ✅ <100ms in mock | Phase 1 | Not measured in production |
| Explainability | ✅ Partial explanations | Phase 1 | Missing citations |
| Security & privacy | ❌ Basic sanitization needed | Phase 1 | Missing PII handling |
| Reliability | ❌ No retries/circuit breaker | Phase 1 | Missing resilience |
| Cost control | ❌ No caching | Phase 2 | Missing optimization |

---

## 🚨 Critical Gaps

### Must Address for Production
1. **Full Data Model** - Current prototype only handles 3 fields vs 11 in spec
2. **DBWD RAG System** - Hardcoded rates vs dynamic lookup
3. **Persistence Layer** - No database integration
4. **Document Processing** - No PDF/CSV/OCR support
5. **Evaluation Framework** - No accuracy measurement

### Recommended Phase Updates
- **Phase 1**: Add persistence, evaluation metrics, full validation
- **Phase 2**: Add PDF parsing, RAG DBWD, expanded data extraction
- **Phase 3**: Add OCR, signatures, citations, replay system

---

## 📝 Updated Development Plan Recommendations

1. **Create Phase 1.5** for persistence and evaluation
2. **Split Phase 2** into 2A (parsing) and 2B (RAG)
3. **Add Phase 3** for advanced features (OCR, citations)
4. **Create data model migration plan** from simple to complex
5. **Define MVP+** as spec-compliant subset
