// Test serve function
console.log('Testing serve function...');

async function testServe() {
  try {
    console.log('1. Loading environment variables...');
    await import('dotenv/config');
    
    console.log('2. Validating environment...');
    const { validateEnvironmentOrExit } = await import('./dist/utils/env-validator.js');
    validateEnvironmentOrExit();
    
    console.log('3. Creating app...');
    const { createApp } = await import('./dist/app.js');
    const app = createApp();
    
    console.log('4. Loading serve function...');
    const { serve } = await import('@hono/node-server');
    console.log('Serve function loaded');
    
    console.log('5. Calling serve...');
    const port = parseInt(process.env.PORT || '3001', 10);
    console.log(`Calling serve with port ${port}...`);
    
    const server = serve({
      fetch: app.fetch,
      port,
    });
    
    console.log('6. Serve returned:', typeof server);
    console.log('Server started successfully!');
    
  } catch (error) {
    console.error('Error in test:', error);
    process.exit(1);
  }
}

testServe();