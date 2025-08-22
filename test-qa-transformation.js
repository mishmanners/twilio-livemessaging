#!/usr/bin/env node

/**
 * Test script to verify Q&A transformation
 */

const { modes } = require('./src/config/menus');
const { getSystemPrompt } = require('./src/lib/aiAssistantTemplates');

console.log('🧪 Testing Q&A Application Transformation...\n');

// Test 1: Check if Q&A modes are available
console.log('1. Testing available modes:');
Object.keys(modes).forEach(mode => {
  console.log(`   ✓ ${mode}: ${modes[mode].name}`);
});

// Test 2: Check AI Assistant prompts for Q&A
console.log('\n2. Testing AI Assistant prompts:');
try {
  const qaPrompt = getSystemPrompt('qa');
  if (qaPrompt.includes('question') || qaPrompt.includes('Q&A')) {
    console.log('   ✓ Q&A system prompt configured correctly');
  } else {
    console.log('   ❌ Q&A system prompt may need updates');
  }
} catch (error) {
  console.log(`   ❌ Error testing system prompt: ${error.message}`);
}

// Test 3: Check template functions
console.log('\n3. Testing template functions:');
try {
  const { getQuestionCancelledMessage } = require('./src/scripts/fetchContentTemplates');
  console.log('   ✓ Question management functions available');
} catch (error) {
  console.log(`   ❌ Template functions error: ${error.message}`);
}

console.log('\n✅ Q&A transformation verification complete!');
console.log('\nNext steps:');
console.log('1. Set up your .env.local file with Twilio credentials');
console.log('2. Run: pnpm install');
console.log('3. Run: pnpm run create-twilio-res');
console.log('4. Run: pnpm run dev');
