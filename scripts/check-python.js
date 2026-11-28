const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const { spawnSync } = require('node:child_process');

const DEFAULT_ROOT = path.resolve(__dirname, '..');

const SERVICES = [
  { pkg: 'agent-worker', moduleName: 'agent_worker' },
  { pkg: 'a2a-server', moduleName: 'a2a_server' },
  { pkg: 'local-connector', moduleName: 'local_connector' },
];

function runUvPython(root, pkg, moduleName, extraArgs) {
  const args = ['run', '--locked', '--offline', '--no-sync'];
  const cacheDir = path.join(root, '.uv-cache');
  if (fs.existsSync(cacheDir)) {
    args.push('--cache-dir', cacheDir);
  }
  args.push('--package', pkg, 'python', '-m', moduleName, ...extraArgs);

  return spawnSync('uv', args, {
    cwd: root,
    encoding: 'utf8',
    windowsHide: true,
    timeout: 120000,
  });
}

function checkPythonServices(options = {}) {
  const root = path.resolve(options.root || DEFAULT_ROOT);
  const runner = options.runUvPython || runUvPython;
  const errors = [];

  for (const { pkg, moduleName } of SERVICES) {
    const health = runner(root, pkg, moduleName, ['--health']);
    if (health.error) {
      errors.push(`${pkg} (--health): ${health.error.message}`);
      continue;
    }
    if (health.status !== 0) {
      errors.push(`${pkg} (--health): expected exit 0, got ${health.status}: ${health.stderr || health.stdout}`);
    } else {
      try {
        const parsed = JSON.parse(health.stdout);
        assert.deepEqual(parsed, { status: 'ok', service: pkg, readiness: 'scaffold' });
      } catch (err) {
        errors.push(`${pkg} (--health): invalid health payload: ${err.message}`);
      }
    }

    const noop = runner(root, pkg, moduleName, []);
    if (noop.error) {
      errors.push(`${pkg} (no args): ${noop.error.message}`);
    } else {
      if (noop.status !== 0) {
        errors.push(`${pkg} (no args): expected exit 0, got ${noop.status}`);
      }
      if (noop.stdout !== '' || noop.stderr !== '') {
        errors.push(`${pkg} (no args): expected empty stdout/stderr, got stdout=${JSON.stringify(noop.stdout)} stderr=${JSON.stringify(noop.stderr)}`);
      }
    }

    const invalid = runner(root, pkg, moduleName, ['--invalid']);
    if (invalid.error) {
      errors.push(`${pkg} (--invalid): ${invalid.error.message}`);
    } else if (invalid.status !== 2) {
      errors.push(`${pkg} (--invalid): expected exit 2, got ${invalid.status}`);
    }
  }

  return { ok: errors.length === 0, errors };
}

if (require.main === module) {
  const res = checkPythonServices();
  if (!res.ok) {
    for (const err of res.errors) console.error(`ERROR: ${err}`);
    process.exitCode = 1;
  } else {
    console.log(`Python service scaffold checks passed (${SERVICES.length} services, 9 invocations).`);
  }
}

module.exports = { SERVICES, checkPythonServices };
