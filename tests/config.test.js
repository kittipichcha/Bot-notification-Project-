const { test } = require('node:test');
const assert = require('node:assert/strict');
const { validate } = require('../packages/shared-config');
const valid = { DISCORD_ENABLED:'true', DISCORD_APPLICATION_ID:'123', DISCORD_PUBLIC_KEY:'key', DISCORD_BOT_TOKEN:'token', DISCORD_CLIENT_SECRET:'secret', DISCORD_REDIRECT_URI:'https://example.org/callback' };
test('defaults and valid Discord configuration', () => { assert.deepEqual(validate({}).errors, []); assert.deepEqual(validate(valid).errors, []); });
test('each Discord field is required and placeholders are rejected', () => {
  for (const key of Object.keys(valid).slice(1)) {
    for (const input of ['', '  ', 'YOUR_VALUE', 'change-me', '${DISCORD_BOT_TOKEN}', '${...}']) assert.ok(validate({...valid,[key]:input}).errors.includes(key), key);
  }
});
test('invalid modes, flags, address, port and callback are rejected', () => {
  for (const [key, value] of Object.entries({ APP_MODE:'cloud', NETWORK_POLICY:'public', DISCORD_ENABLED:'yes', LINE_ENABLED:'true', TRACING_ENABLED:'true', API_HOST:'0.0.0.0', API_PORT:'65536' })) assert.ok(validate({[key]:value}).errors.includes(key), key);
  assert.ok(validate({...valid, DISCORD_REDIRECT_URI:'http://example.org/callback'}).errors.includes('DISCORD_REDIRECT_URI'));
  assert.deepEqual(validate({...valid, DISCORD_REDIRECT_URI:'http://127.0.0.1:3000/callback', API_PORT:'0'}).errors, []);
});

test('deliberate AC4 sample failure', () => { assert.equal(1, 2); });

