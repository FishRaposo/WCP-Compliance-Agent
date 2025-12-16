#!/usr/bin/env node

/**
 * Interactive Setup Script for WCP AI Agent Prototype
 * 
 * This script provides a seamless onboarding experience by:
 * 1. Checking prerequisites
 * 2. Installing dependencies
 * 3. Setting up environment variables
 * 4. Validating the setup
 * 5. Running a quick test
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import readline from 'readline';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Color utilities
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  cyan: '\x1b[36m',
  blue: '\x1b[34m'
};

function color(text, color) {
  return `${colors[color]}${text}${colors.reset}`;
}

function log(message, colorName = 'reset') {
  console.log(color(message, colorName));
}

function success(message) {
  log(`✅ ${message}`, 'green');
}

function warning(message) {
  log(`⚠️  ${message}`, 'yellow');
}

function error(message) {
  log(`❌ ${message}`, 'red');
}

function info(message) {
  log(`ℹ️  ${message}`, 'cyan');
}

function header(message) {
  log(`\n${'='.repeat(60)}`, 'bright');
  log(message, 'bright');
  log('='.repeat(60), 'bright');
}

// Ask user for input
function ask(question) {
  return new Promise((resolve) => {
    rl.question(`${color(question, 'cyan')} `, resolve);
  });
}

// Check if command exists
async function commandExists(command) {
  try {
    const { execSync } = await import('child_process');
    execSync(`${command} --version`, { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
}

// Execute command with promise
async function execCommand(command, cwd = projectRoot) {
  try {
    const { stdout, stderr } = await execAsync(command, { cwd });
    return { stdout, stderr };
  } catch (error) {
    throw error;
  }
}

// Check prerequisites
async function checkPrerequisites() {
  header('CHECKING PREREQUISITES');
  
  // Check Node.js version
  const nodeVersion = process.version;
  const majorVersion = parseInt(nodeVersion.slice(1).split('.')[0]);
  
  if (majorVersion < 20) {
    error(`Node.js v20.0.0+ required. Found: ${nodeVersion}`);
    info('Please upgrade Node.js: https://nodejs.org/');
    process.exit(1);
  }
  success(`Node.js version: ${nodeVersion}`);
  
  // Check npm
  if (!await commandExists('npm')) {
    error('npm is not installed or not in PATH');
    process.exit(1);
  }
  success('npm is available');
  
  // Check if git is initialized
  const gitDir = path.join(projectRoot, '.git');
  if (fs.existsSync(gitDir)) {
    success('Git repository initialized');
  } else {
    warning('Git not initialized - consider running: git init');
  }
}

// Install dependencies
async function installDependencies() {
  header('INSTALLING DEPENDENCIES');
  
  try {
    info('Running: npm install...');
    const { stdout, stderr } = await execCommand('npm install');
    success('Dependencies installed successfully');
  } catch (err) {
    error('Failed to install dependencies');
    error(err.message);
    process.exit(1);
  }
}

// Setup environment
async function setupEnvironment() {
  header('SETTING UP ENVIRONMENT');
  
  const envPath = path.join(projectRoot, '.env');
  const envExamplePath = path.join(projectRoot, '.env.example');
  
  // Check if .env already exists
  if (fs.existsSync(envPath)) {
    const existingEnv = fs.readFileSync(envPath, 'utf8');
    if (existingEnv.includes('OPENAI_API_KEY=')) {
      success('.env file already exists with API key');
      return;
    } else {
      warning('.env file exists but missing API key');
    }
  }
  
  // Copy .env.example if .env doesn't exist
  if (!fs.existsSync(envPath)) {
    if (fs.existsSync(envExamplePath)) {
      fs.copyFileSync(envExamplePath, envPath);
      success('Created .env file from .env.example');
    } else {
      error('.env.example file not found');
      process.exit(1);
    }
  }
  
  // Get OpenAI API key
  info('\nOpenAI API Key is required for the WCP AI Agent to work.');
  info('Get your API key at: https://platform.openai.com/api-keys');
  info('OR use "mock" to test without an API key\n');
  
  const apiKey = await ask('Enter your OpenAI API key (sk-...) or "mock" for testing');
  
  if (!apiKey || (!apiKey.startsWith('sk-') && apiKey !== 'mock')) {
    error('Invalid API key format. Should start with "sk-" or be "mock"');
    process.exit(1);
  }
  
  // Update .env with API key
  let envContent = fs.readFileSync(envPath, 'utf8');
  envContent = envContent.replace(
    /OPENAI_API_KEY=.*/,
    `OPENAI_API_KEY=${apiKey}`
  );
  fs.writeFileSync(envPath, envContent);
  
  success('OpenAI API key configured');
  
  // Ask for optional settings
  const useDefaults = await ask('Use default settings for other options? (Y/n)');
  
  if (useDefaults.toLowerCase() !== 'n') {
    success('Using default settings');
  } else {
    const model = await ask('OpenAI model (gpt-4o-mini) [default: gpt-4o-mini]');
    if (model) {
      envContent = envContent.replace(
        /OPENAI_MODEL=.*/,
        `OPENAI_MODEL=${model}`
      );
    }
    
    const maxSteps = await ask('Max agent steps (3) [default: 3]');
    if (maxSteps && !isNaN(maxSteps)) {
      envContent = envContent.replace(
        /AGENT_MAX_STEPS=.*/,
        `AGENT_MAX_STEPS=${maxSteps}`
      );
    }
    
    fs.writeFileSync(envPath, envContent);
    success('Custom settings applied');
  }
}

// Validate setup
async function validateSetup() {
  header('VALIDATING SETUP');
  
  try {
    // Try to run the validation
    const { stdout, stderr } = await execCommand('node dist/index.js');
    success('Setup validation passed');
    return true;
  } catch (err) {
    // If dist doesn't exist, try building first
    if (err.message.includes('Cannot find module')) {
      info('Building project...');
      try {
        await execCommand('npm run build');
        const { stdout } = await execCommand('node dist/index.js');
        success('Setup validation passed');
        return true;
      } catch (buildErr) {
        error('Build failed');
        error(buildErr.message);
        return false;
      }
    }
    
    error('Setup validation failed');
    error(err.message);
    return false;
  }
}

// Run quick demo
async function runDemo() {
  header('RUNNING QUICK DEMO');
  
  try {
    info('Running showcase demo (3 scenarios)...');
    const { stdout, stderr } = await execCommand('npm run showcase');
    success('Demo completed successfully');
  } catch (err) {
    warning('Demo failed - but setup is complete');
    info('You can run the demo later with: npm run showcase');
  }
}

// Show next steps
function showNextSteps() {
  header('SETUP COMPLETE!');
  
  console.log(color('\n🎉 Welcome to WCP AI Agent Prototype!', 'green'));
  console.log(color('\nQuick Start Commands:', 'bright'));
  console.log(color('  npm run showcase    # Run full demo (6 scenarios)', 'cyan'));
  console.log(color('  npm run serve        # Start API server', 'cyan'));
  console.log(color('  npm test             # Run tests', 'cyan'));
  console.log(color('\nWeb Interface:', 'bright'));
  console.log(color('  Terminal 1: npm run serve', 'cyan'));
  console.log(color('  Terminal 2: cd frontend && npm run dev', 'cyan'));
  console.log(color('  Then open: http://localhost:5173', 'cyan'));
  console.log(color('\nDocumentation:', 'bright'));
  console.log(color('  README.md            # Project overview', 'cyan'));
  console.log(color('  showcase/            # Showcase documentation', 'cyan'));
  console.log(color('  TODO.md              # Development roadmap', 'cyan'));
  
  console.log(color('\n' + '='.repeat(60), 'bright'));
  console.log(color('Ready to automate WCP compliance! 🚀', 'green'));
}

// Main setup flow
async function main() {
  console.log(color('\n🏗️  WCP AI Agent Prototype - Setup Wizard', 'bright'));
  console.log(color('This will guide you through the complete setup process.\n', 'cyan'));
  
  try {
    await checkPrerequisites();
    await installDependencies();
    await setupEnvironment();
    
    const isValid = await validateSetup();
    
    if (isValid) {
      const runDemoAnswer = await ask('Run quick demo now? (Y/n)');
      if (runDemoAnswer.toLowerCase() !== 'n') {
        console.log(color('\n🎉 Running quick demo...', 'bright'));
        console.log(color('Run: npm run showcase', 'cyan'));
        console.log(color('This will demonstrate all 6 compliance scenarios.\n', 'cyan'));
      }
    }
    
    showNextSteps();
  } catch (err) {
    error(`Setup failed: ${err.message}`);
    process.exit(1);
  } finally {
    rl.close();
  }
}

// Handle Ctrl+C gracefully
process.on('SIGINT', () => {
  console.log(color('\n\nSetup cancelled by user.', 'yellow'));
  rl.close();
  process.exit(0);
});

// Run setup
main().catch(console.error);
