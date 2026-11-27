const { test } = require('node:test');
const assert = require('node:assert/strict');
const { spawn, spawnSync } = require('node:child_process');
const net = require('node:net');
const path = require('node:path');
const { schemas } = require('../packages/shared-config');
const entry = path.resolve('apps/api/dist/main.js');
const cleanEnv = () => Object.fromEntries(Object.entries(process.env).filter(([key]) => !/^(APP_MODE|NETWORK_POLICY|API_HOST|API_PORT|DISCORD_|LINE_|TRACING_)/.test(key)));
const freePort = () => new Promise((resolve, reject) => { const server = net.createServer(); server.once('error', reject); server.listen(0, '127.0.0.1', () => { const port = server.address().port; server.close(() => resolve(port)); }); });
const exited = child => new Promise(resolve => child.once('exit', (code, signal) => resolve({code, signal})));
const HEALTH_STARTUP_DEADLINE_MS = 15000;
test('health endpoint reports scaffold readiness', async () => {
  const port = await freePort();
  const child = spawn(process.execPath, [entry], {env:{...cleanEnv(), API_PORT:String(port)}});
  let output = '', exitResult, lastFetchCode;
  child.stdout.on('data', x => output += x); child.stderr.on('data', x => output += x);
  const done = exited(child).then(result => { exitResult = result; return result; });
  const started = Date.now();
  try {
    let response;
    while (!response && !exitResult && Date.now() - started < HEALTH_STARTUP_DEADLINE_MS) {
      const remaining = HEALTH_STARTUP_DEADLINE_MS - (Date.now() - started);
      try { response = await fetch('http://127.0.0.1:' + port + '/health', {signal:AbortSignal.timeout(Math.max(1, remaining))}); }
      catch (error) { lastFetchCode = error.cause?.code || error.code || error.message; }
      if (!response && !exitResult) await Promise.race([done, new Promise(r => setTimeout(r, Math.min(50, Math.max(0, HEALTH_STARTUP_DEADLINE_MS - (Date.now() - started)))))]);
    }
    assert.ok(response, `API did not start after ${Date.now() - started}ms; exit=${JSON.stringify(exitResult)}; last fetch=${lastFetchCode}; output=${output}`);
    assert.equal(response.status, 200);
    const body = await response.json(); assert.deepEqual(body, {status:'ok', service:'api', readiness:'scaffold'}); assert.ok(schemas.api(body));
  } finally { child.kill(); await done; }
});
test('API root schema is compiled once and validates health responses', () => {
  const script = `
    const assert = require('node:assert/strict');
    const Ajv = require('ajv');
    const original = Ajv.prototype._compileSchemaEnv;
    let count = 0;
    Ajv.prototype._compileSchemaEnv = function(env) {
      if (env.schema.$id === 'https://notification.local/contracts/1.0.0/api.schema.json') count++;
      return original.call(this, env);
    };
    const { schemas } = require('./packages/shared-config');
    assert.equal(count, 1);
    assert.ok(schemas.api({status:'ok', service:'api', readiness:'scaffold'}));
    assert.equal(schemas.api({status:'ok'}), false);
  `;
  const result = spawnSync(process.execPath, ['-e', script], {encoding:'utf8'});
  assert.equal(result.status, 0, result.stderr || result.stdout || String(result.error));
});
test('invalid fixed config exits before listening without leaking values', async () => {
  const port = await freePort(); const sentinel = 'private-config-sentinel';
  const script = `const fs = require('node:fs'); const original = fs.readFileSync; fs.readFileSync = function(file, ...args) { if (String(file).endsWith('platforms.yaml')) return ${JSON.stringify(sentinel)}; return original.call(this, file, ...args); }; require(${JSON.stringify(entry)});`;
  const child = spawn(process.execPath, ['-e', script], {env:{...cleanEnv(), API_PORT:String(port)}});
  let output = ''; child.stdout.on('data', x => output += x); child.stderr.on('data', x => output += x);
  const result = await exited(child); assert.equal(result.code, 1); assert.ok(output.includes('platform.schema')); assert.ok(!output.includes(sentinel));
  await assert.rejects(fetch('http://127.0.0.1:' + port + '/health'));
});
test('invalid configuration exits without listening or leaking values', async () => {
  const port = await freePort(); const sentinel = 'sensitive-sentinel-value';
  const child = spawn(process.execPath, [entry], {env:{...cleanEnv(), API_PORT:String(port), DISCORD_ENABLED:'true', DISCORD_BOT_TOKEN:sentinel}});
  let output = ''; child.stdout.on('data', x => output += x); child.stderr.on('data', x => output += x);
  const result = await exited(child); assert.equal(result.code, 1); assert.ok(output.includes('DISCORD_APPLICATION_ID')); assert.ok(!output.includes(sentinel));
  await assert.rejects(fetch('http://127.0.0.1:' + port + '/health'));
});
