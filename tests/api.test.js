const { test } = require('node:test');
const assert = require('node:assert/strict');
const { spawn } = require('node:child_process');
const net = require('node:net');
const path = require('node:path');
const entry = path.resolve('apps/api/dist/main.js');
const cleanEnv = () => Object.fromEntries(Object.entries(process.env).filter(([key]) => !/^(APP_MODE|NETWORK_POLICY|API_HOST|API_PORT|DISCORD_|LINE_|TRACING_)/.test(key)));
const freePort = () => new Promise((resolve, reject) => { const server = net.createServer(); server.once('error', reject); server.listen(0, '127.0.0.1', () => { const port = server.address().port; server.close(() => resolve(port)); }); });
const exited = child => new Promise(resolve => child.once('exit', (code, signal) => resolve({code, signal})));
test('health endpoint reports scaffold readiness', async () => {
  const port = await freePort();
  const child = spawn(process.execPath, [entry], {env:{...cleanEnv(), API_PORT:String(port)}});
  const done = exited(child);
  try {
    let response;
    for (let i=0;i<100;i++) { try { response = await fetch('http://127.0.0.1:' + port + '/health'); break; } catch { await new Promise(r => setTimeout(r, 50)); } }
    assert.ok(response, 'API did not start'); assert.equal(response.status, 200);
    assert.deepEqual(await response.json(), {status:'ok', service:'api', readiness:'scaffold'});
  } finally { child.kill(); await done; }
});
test('invalid configuration exits without listening or leaking values', async () => {
  const port = await freePort(); const sentinel = 'sensitive-sentinel-value';
  const child = spawn(process.execPath, [entry], {env:{...cleanEnv(), API_PORT:String(port), DISCORD_ENABLED:'true', DISCORD_BOT_TOKEN:sentinel}});
  let output = ''; child.stdout.on('data', x => output += x); child.stderr.on('data', x => output += x);
  const result = await exited(child); assert.equal(result.code, 1); assert.ok(output.includes('DISCORD_APPLICATION_ID')); assert.ok(!output.includes(sentinel));
  await assert.rejects(fetch('http://127.0.0.1:' + port + '/health'));
});
