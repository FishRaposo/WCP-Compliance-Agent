# Tool Call Optimization Guidelines

**Purpose**: Comprehensive guide for optimizing tool call usage to maximize efficiency and minimize redundant operations when working with AI agents.

**⚠️ RECOMMENDED**: This document is referenced throughout the project documentation and should be consulted before any operation.

**Last Updated**: 2025-01-27  
**Version**: 1.0.0

---

## 🎯 Overview

Tool call optimization is critical for efficient AI agent operations. This guide provides principles, strategies, and examples for minimizing tool calls while maximizing information gathering and code quality.

**Key Principle**: Every tool call should be intentional, efficient, and avoid redundancy.

---

## 📋 Core Principles

### 1. Batch Operations

**Principle**: Group related operations together to minimize round trips.

**✅ Do:**
```typescript
// Batch multiple read_file calls in parallel
const [file1, file2, file3] = await Promise.all([
  read_file("file1.ts"),
  read_file("file2.ts"),
  read_file("file3.ts")
]);
```

**❌ Don't:**
```typescript
// Sequential reads when parallel is possible
const file1 = await read_file("file1.ts");
const file2 = await read_file("file2.ts");
const file3 = await read_file("file3.ts");
```

### 2. Tool Selection

**Principle**: Choose the most efficient tool for the task.

**Tool Selection Guide:**

| Task | Efficient Tool | Less Efficient Alternative |
|------|---------------|---------------------------|
| Exact string search | `grep` | `codebase_search` |
| File pattern search | `glob_file_search` | `list_dir` + filter |
| Semantic search | `codebase_search` | Multiple `grep` calls |
| File existence check | `glob_file_search` | `read_file` + catch error |
| Directory listing | `list_dir` | `glob_file_search` with pattern |

**Examples:**

**✅ Use `grep` for exact patterns:**
```bash
# Fast: Exact string match
grep -r "extractWCPTool" src/
```

**✅ Use `codebase_search` for semantic queries:**
```bash
# Better: Semantic understanding needed
codebase_search("How does WCP extraction work?")
```

**✅ Use `glob_file_search` for file patterns:**
```bash
# Fast: File pattern matching
glob_file_search("**/*.test.ts")
```

### 3. Information Caching

**Principle**: Cache information from previous operations to avoid re-reading or re-searching.

**✅ Do:**
```typescript
// Cache file content after first read
let cachedFile: string | null = null;

function getFileContent() {
  if (!cachedFile) {
    cachedFile = read_file("file.ts");
  }
  return cachedFile;
}
```

**❌ Don't:**
```typescript
// Re-reading the same file multiple times
const content1 = read_file("file.ts"); // First read
const content2 = read_file("file.ts"); // Redundant read
```

### 4. Redundancy Avoidance

**Principle**: Never perform the same operation twice.

**Common Redundancies to Avoid:**
- Reading the same file multiple times
- Searching for the same pattern multiple times
- Listing the same directory multiple times
- Checking the same condition multiple times

**✅ Do:**
```typescript
// Read once, use multiple times
const config = await read_file("config.json");
const dbHost = config.database.host;
const dbPort = config.database.port;
```

**❌ Don't:**
```typescript
// Reading config multiple times
const dbHost = (await read_file("config.json")).database.host;
const dbPort = (await read_file("config.json")).database.port;
```

### 5. Planning Before Execution

**Principle**: Plan all tool calls before starting operations.

**Planning Checklist:**
- [ ] What files need to be read?
- [ ] What searches need to be performed?
- [ ] What operations can be batched?
- [ ] What information can be cached?
- [ ] What operations are redundant?

**Example Planning:**

**Before Starting:**
1. Read: `src/index.ts`, `src/mastra/tools/wcp-tools.ts`, `src/mastra/agents/wcp-agent.ts`
2. Search: `grep` for "extractWCP" usage
3. Cache: File contents for multiple uses
4. Batch: All file reads in parallel

**Execution:**
```typescript
// Planned batch operation
const [index, tools, agent] = await Promise.all([
  read_file("src/index.ts"),
  read_file("src/mastra/tools/wcp-tools.ts"),
  read_file("src/mastra/agents/wcp-agent.ts")
]);

// Use cached content
const toolUsage = grep("extractWCP", index);
```

---

## 🔧 Tool-Specific Guidelines

### File Reading (`read_file`)

**When to Use:**
- Need full file content
- Analyzing code structure
- Reading configuration files

**Optimization:**
- Batch multiple reads in parallel
- Cache content for multiple uses
- Use `offset` and `limit` for large files

**Example:**
```typescript
// Batch file reads
const files = await Promise.all([
  read_file("file1.ts"),
  read_file("file2.ts"),
  read_file("file3.ts")
]);
```

### Pattern Searching (`grep`)

**When to Use:**
- Exact string matches
- Finding all occurrences
- Simple pattern matching

**Optimization:**
- Use specific patterns (avoid wildcards when possible)
- Limit search scope with `path` parameter
- Use `output_mode: "files_with_matches"` when only file names needed

**Example:**
```typescript
// Efficient: Specific pattern, limited scope
grep("extractWCPTool", { path: "src/", output_mode: "files_with_matches" });
```

### Semantic Search (`codebase_search`)

**When to Use:**
- Understanding concepts
- Finding related code
- Complex queries

**Optimization:**
- Use specific, focused queries
- Limit scope with `target_directories`
- Combine with `grep` for exact matches

**Example:**
```typescript
// Efficient: Focused query, limited scope
codebase_search("How does WCP validation work?", { target_directories: ["src/mastra/tools"] });
```

### File Discovery (`glob_file_search`)

**When to Use:**
- Finding files by pattern
- File existence checks
- Directory exploration

**Optimization:**
- Use specific patterns
- Avoid recursive searches when not needed
- Cache results for multiple uses

**Example:**
```typescript
// Efficient: Specific pattern
glob_file_search("**/*.test.ts", { target_directory: "tests" });
```

### Directory Listing (`list_dir`)

**When to Use:**
- Exploring directory structure
- Getting file lists
- Understanding organization

**Optimization:**
- Use `ignore_globs` to filter unwanted files
- Cache results for multiple uses
- Prefer `glob_file_search` for pattern matching

**Example:**
```typescript
// Efficient: Filtered listing
list_dir("src/", { ignore_globs: ["**/*.test.ts", "**/node_modules/**"] });
```

---

## 📊 Optimization Strategies

### Strategy 1: Information Gathering Phase

**Approach**: Gather all needed information upfront, then process.

**Steps:**
1. Identify all information needs
2. Batch all read operations
3. Batch all search operations
4. Cache all results
5. Process cached information

**Example:**
```typescript
// Phase 1: Gather all information
const [config, sourceFiles, testFiles] = await Promise.all([
  read_file("package.json"),
  glob_file_search("src/**/*.ts"),
  glob_file_search("tests/**/*.test.ts")
]);

// Phase 2: Process cached information
const dependencies = config.dependencies;
const sourceCount = sourceFiles.length;
const testCount = testFiles.length;
```

### Strategy 2: Incremental Processing

**Approach**: Process information as it's gathered, but batch operations.

**Steps:**
1. Batch initial information gathering
2. Process first batch
3. Determine next batch based on results
4. Repeat until complete

**Example:**
```typescript
// Batch 1: Initial files
const [file1, file2] = await Promise.all([
  read_file("file1.ts"),
  read_file("file2.ts")
]);

// Process and determine next batch
const imports = extractImports(file1, file2);
const importFiles = imports.map(imp => `src/${imp}.ts`);

// Batch 2: Imported files
const importedFiles = await Promise.all(
  importFiles.map(file => read_file(file))
);
```

### Strategy 3: Lazy Loading

**Approach**: Only gather information when needed, but cache results.

**Steps:**
1. Identify required vs. optional information
2. Gather required information first
3. Cache optional information gathering functions
4. Execute optional gathering only if needed

**Example:**
```typescript
// Required: Always needed
const config = await read_file("package.json");

// Optional: Only if needed
const getOptionalInfo = async () => {
  if (!cachedOptionalInfo) {
    cachedOptionalInfo = await read_file("optional.ts");
  }
  return cachedOptionalInfo;
};
```

---

## ⚠️ Common Mistakes

### Mistake 1: Sequential Operations When Parallel is Possible

**❌ Don't:**
```typescript
const file1 = await read_file("file1.ts");
const file2 = await read_file("file2.ts");
const file3 = await read_file("file3.ts");
```

**✅ Do:**
```typescript
const [file1, file2, file3] = await Promise.all([
  read_file("file1.ts"),
  read_file("file2.ts"),
  read_file("file3.ts")
]);
```

### Mistake 2: Using Semantic Search for Exact Matches

**❌ Don't:**
```typescript
codebase_search("extractWCPTool function definition");
```

**✅ Do:**
```typescript
grep("extractWCPTool", { path: "src/" });
```

### Mistake 3: Re-reading Files

**❌ Don't:**
```typescript
const content1 = await read_file("file.ts");
// ... later ...
const content2 = await read_file("file.ts"); // Redundant
```

**✅ Do:**
```typescript
const content = await read_file("file.ts");
// Use cached content
const content1 = content;
const content2 = content;
```

### Mistake 4: Not Planning Tool Calls

**❌ Don't:**
```typescript
// Ad-hoc tool calls without planning
const file1 = await read_file("file1.ts");
// Realize need for file2
const file2 = await read_file("file2.ts");
// Realize need for file3
const file3 = await read_file("file3.ts");
```

**✅ Do:**
```typescript
// Plan all tool calls first
const [file1, file2, file3] = await Promise.all([
  read_file("file1.ts"),
  read_file("file2.ts"),
  read_file("file3.ts")
]);
```

---

## 📈 Optimization Checklist

Before starting any operation, complete this checklist:

- [ ] **Planning**: Identified all needed information and tool calls
- [ ] **Batching**: Grouped related operations for parallel execution
- [ ] **Tool Selection**: Chose most efficient tool for each task
- [ ] **Caching**: Identified information that can be cached
- [ ] **Redundancy Check**: Ensured no duplicate operations
- [ ] **Scope Limitation**: Limited searches to relevant directories
- [ ] **Output Mode**: Used appropriate output mode (content/files/count)

---

## 🔗 Related Documentation

- **AGENTS.md** - Tool call limit awareness section (mandatory)
- **docs/PROMPT-VALIDATION.md** - Phase 5 includes tool call limit assessment
- **docs/DOCUMENTATION-MAINTENANCE.md** - Step 0: Tool call limit awareness
- **CLAUDE.md** - Mandatory steps include tool call optimization

---

## 📚 Quick Reference

### Tool Efficiency Ranking

1. **Most Efficient**: `grep` (exact patterns), `glob_file_search` (file patterns)
2. **Moderately Efficient**: `read_file` (with caching), `list_dir` (filtered)
3. **Less Efficient**: `codebase_search` (semantic queries - use when needed)

### Batch Operation Priority

1. **High Priority**: File reads, directory listings
2. **Medium Priority**: Pattern searches, file discoveries
3. **Low Priority**: Single operations, cached results

### Caching Priority

1. **Always Cache**: Configuration files, frequently accessed files
2. **Consider Caching**: Search results, directory listings
3. **Don't Cache**: One-time operations, dynamic content

---

**Last Updated**: 2025-01-27  
**Version**: 1.0.0  
**Maintained By**: WCP AI Agent Prototype Team


