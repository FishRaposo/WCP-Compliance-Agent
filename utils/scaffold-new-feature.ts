#!/usr/bin/env node

/**
 * New Feature Scaffolding Utility
 * 
 * Scaffolds a new feature with all required files and tests.
 * Follows project patterns and conventions automatically.
 * 
 * @file utils/scaffold-new-feature.ts
 * @usage ts-node utils/scaffold-new-feature.ts <featureName>
 */

import * as fs from 'fs';
import * as path from 'path';
import { execSync } from 'child_process';

// Feature template interfaces
interface FeatureTemplate {
  name: string;
  description: string;
  files: Array<{
    path: string;
    template: string;
  }>;
}

// Parse feature name from command line
const featureName = process.argv[2];

if (!featureName) {
  console.error('\n❌ Error: Feature name is required\n');
  console.log('Usage: ts-node utils/scaffold-new-feature.ts <featureName>');
  console.log('Example: ts-node utils/scaffold-new-feature.ts pdf-processor\n');
  process.exit(1);
}

// Convert kebab-case or snake_case to PascalCase for class names
function toPascalCase(str: string): string {
  return str
    .replace(/[-_](.)/g, (_, char) => char.toUpperCase())
    .replace(/^(.)/, (_, char) => char.toUpperCase());
}

// Convert to kebab-case for filenames
function toKebabCase(str: string): string {
  return str.replace(/([A-Z])/g, '-$1').toLowerCase().replace(/^-/, '');
}

const pascalFeatureName = toPascalCase(featureName);
const kebabFeatureName = toKebabCase(featureName);

console.log(`\n🚀 Scaffolding new feature: ${pascalFeatureName}\n`);

// Feature templates
const templates: FeatureTemplate = {
  name: pascalFeatureName,
  description: `${pascalFeatureName} feature for WCP AI Agent`,
  files: [
    // Service file
    {
      path: `src/services/${kebabFeatureName}.ts`,
      template: `/**
 * ${pascalFeatureName} Service
 * 
 * Business logic for ${featureName} feature.
 * 
 * @file src/services/${kebabFeatureName}.ts
 */

import { getLogger } from '../utils/logger.js';

const logger = getLogger('services:${kebabFeatureName.replace('-', '')}');

export class ${pascalFeatureName}Service {
  constructor() {}

  async initialize(): Promise<void> {
    logger.info('Initializing ${pascalFeatureName}Service');
  }

  async process(data: any): Promise<any> {
    logger.debug('Processing ${featureName}', { input: data });
    throw new Error('Method not implemented');
  }
}

// Singleton instance
export const ${pascalFeatureName.toLowerCase()}Service = new ${pascalFeatureName}Service();
`,
    },
    // Unit tests
    {
      path: `tests/unit/test_${kebabFeatureName}.test.ts`,
      template: `/**
 * Unit Tests - ${pascalFeatureName}
 * 
 * @file tests/unit/test_${kebabFeatureName}.test.ts
 */

import { describe, it, expect, beforeEach } from '@jest/globals';
import { ${pascalFeatureName}Service } from '../../src/services/${kebabFeatureName}';

describe('${pascalFeatureName}Service', () => {
  let service: ${pascalFeatureName}Service;

  beforeEach(() => {
    service = new ${pascalFeatureName}Service();
  });

  describe('process', () => {
    it('should process data correctly', async () => {
      // TODO: Implement test
      expect(service).toBeDefined();
    });
  });
});
`,
    },
    // Integration tests
    {
      path: `tests/integration/test_${kebabFeatureName}_integration.test.ts`,
      template: `/**
 * Integration Tests - ${pascalFeatureName}
 * 
 * @file tests/integration/test_${kebabFeatureName}_integration.test.ts
 */

import { describe, it, expect } from '@jest/globals';

describe('${pascalFeatureName} Integration', () => {
  describe('service integration', () => {
    it('should integrate with other services', async () => {
      // TODO: Implement integration test
      expect(true).toBe(true);
    });
  });
});
`,
    },
    // API endpoint (if applicable)
    {
      path: `src/routes/${kebabFeatureName}.ts`,
      template: `/**
 * ${pascalFeatureName} API Routes
 * 
 * @file src/routes/${kebabFeatureName}.ts
 */

import type { Router } from 'express';
import { ${pascalFeatureName}Service } from '../services/${kebabFeatureName}';
import { getLogger } from '../utils/logger.js';
import { asyncErrorHandler } from '../middleware/error-handler.js';

const logger = getLogger('routes:${kebabFeatureName.replace('-', '')}');
const service = new ${pascalFeatureName}Service();

export function register${pascalFeatureName}Routes(router: Router): void {
  router.post('/${kebabFeatureName}', asyncErrorHandler(async (req, res) => {
    logger.debug('Processing ${featureName} request');
    const result = await service.process(req.body);
    res.json({ success: true, data: result });
  }));
}
`,
    },
    // Documentation
    {
      path: `docs/features/${kebabFeatureName}.md`,
      template: `# ${pascalFeatureName} Feature

## Overview

${pascalFeatureName} feature for WCP AI Agent.

## Features

- Feature 1
- Feature 2
- Feature 3

## Usage

\`\`\`typescript
import { ${pascalFeatureName}Service } from '../services/${kebabFeatureName}';

const service = new ${pascalFeatureName}Service();
const result = await service.process(data);
\`\`\`

## API Endpoints

- POST /api/${kebabFeatureName} - Process ${featureName}

## Testing

\`\`\`bash
npm test tests/unit/test_${kebabFeatureName}.test.ts
\`\`\`

## TODO

- [ ] Implement core functionality
- [ ] Add comprehensive tests
- [ ] Add API documentation
- [ ] Update README
`,
    },
  ],
};

// Create directories
console.log('📁 Creating directories...\n');

const directories = [
  'src/services',
  'src/routes',
  'tests/unit',
  'tests/integration',
  'docs/features',
];

directories.forEach(dir => {
  const fullPath = path.join(process.cwd(), dir);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
    console.log(`  ✓ Created ${dir}/`);
  }
});

console.log('\n📄 Creating files...\n');

// Create files
let created = 0;
let skipped = 0;

templates.files.forEach(file => {
  const fullPath = path.join(process.cwd(), file.path);
  
  if (fs.existsSync(fullPath)) {
    console.log(`  ⏭️  Skipped ${file.path} (already exists)`);
    skipped++;
  } else {
    fs.writeFileSync(fullPath, file.template);
    console.log(`  ✓ Created ${file.path}`);
    created++;
  }
});

console.log(`\n📊 Summary: ${created} files created, ${skipped} files skipped\n`);

// Update exports if needed
console.log('🔧 Updating exports...\n');

// Update main index.ts if it exists
const mainIndexPath = path.join(process.cwd(), 'src/index.ts');
if (fs.existsSync(mainIndexPath)) {
  const content = fs.readFileSync(mainIndexPath, 'utf8');
  const exportLine = `export { ${pascalFeatureName}Service } from './services/${kebabFeatureName}';
`;
  
  if (!content.includes(exportLine.trim())) {
    fs.appendFileSync(mainIndexPath, exportLine);
    console.log(`  ✓ Updated src/index.ts with ${pascalFeatureName}Service export`);
  }
}

// Update service index
const servicesIndexPath = path.join(process.cwd(), 'src/services/index.ts');
const serviceExport = `export { ${pascalFeatureName}Service, ${pascalFeatureName.toLowerCase()}Service } from './${kebabFeatureName}';
`;

if (fs.existsSync(servicesIndexPath)) {
  const content = fs.readFileSync(servicesIndexPath, 'utf8');
  if (!content.includes(serviceExport.trim())) {
    fs.appendFileSync(servicesIndexPath, serviceExport);
    console.log(`  ✓ Updated src/services/index.ts`);
  }
} else {
  fs.writeFileSync(servicesIndexPath, serviceExport);
  console.log(`  ✓ Created src/services/index.ts`);
}

console.log(`\n✨ Feature "${pascalFeatureName}" scaffolded successfully!\n`);
console.log('Next steps:');
console.log(`  1. Implement feature logic in src/services/${kebabFeatureName}.ts`);
console.log(`  2. Write tests in tests/unit/test_${kebabFeatureName}.test.ts`);
console.log(`  3. Run tests: npm test tests/unit/test_${kebabFeatureName}.test.ts`);
console.log(`  4. Update documentation in docs/features/${kebabFeatureName}.md\n`);

process.exit(0);
