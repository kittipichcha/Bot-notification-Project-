const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const { spawnSync } = require('node:child_process');

const DEFAULT_ROOT = path.resolve(__dirname, '..');

const FLOATING_NPM_PATTERNS = [
  /^(?:latest|next|canary|beta|alpha|rc)$/i,
  /^(?:x|\*)$/i,
  /^\d+\.(?:x|\*)(?:\.(?:x|\*))?$/i,
  /^\d+\.\d+\.(?:x|\*)$/i,
  /[><|]/,
  /^(?:git\+|https?:|file:|github:|gitlab:|bitbucket:)/i,
  /^workspace:/i,
];

const EXACT_PEP508_RE = /^[A-Za-z0-9][A-Za-z0-9._-]*(?:\[[A-Za-z0-9.,_-\s]+\])?\s*==\s*([A-Za-z0-9.+_-]+)$/;

function findPythonRunner(root) {
  const candidates = [];
  if (process.env.PYTHON) {
    candidates.push({ cmd: process.env.PYTHON, prefixArgs: [] });
  }
  const venvPy = process.platform === 'win32'
    ? path.join(root, '.venv', 'Scripts', 'python.exe')
    : path.join(root, '.venv', 'bin', 'python');
  if (fs.existsSync(venvPy)) {
    candidates.push({ cmd: venvPy, prefixArgs: [] });
  }
  candidates.push({ cmd: 'python3', prefixArgs: [] });
  candidates.push({ cmd: 'python', prefixArgs: [] });
  if (process.platform === 'win32') {
    candidates.push({ cmd: 'py', prefixArgs: ['-3'] });
    const pyenvBase = path.join(process.env.USERPROFILE || '', '.pyenv', 'pyenv-win', 'versions');
    if (fs.existsSync(pyenvBase)) {
      const dirs = fs.readdirSync(pyenvBase).filter((d) => d.startsWith('3.12')).sort().reverse();
      for (const dir of dirs) {
        const exe = path.join(pyenvBase, dir, 'python.exe');
        if (fs.existsSync(exe)) candidates.push({ cmd: exe, prefixArgs: [] });
      }
    }
    const uvPyBase = path.join(process.env.LOCALAPPDATA || '', 'uv', 'python');
    if (fs.existsSync(uvPyBase)) {
      const dirs = fs.readdirSync(uvPyBase).filter((d) => d.includes('3.12')).sort().reverse();
      for (const dir of dirs) {
        const exe = path.join(uvPyBase, dir, 'python.exe');
        if (fs.existsSync(exe)) candidates.push({ cmd: exe, prefixArgs: [] });
      }
    }
  }
  const uvArgs = ['run', '--no-sync', '--offline'];
  if (fs.existsSync(path.join(root, '.uv-cache'))) {
    uvArgs.push('--cache-dir', path.join(root, '.uv-cache'));
  }
  uvArgs.push('python');
  candidates.push({ cmd: 'uv', prefixArgs: uvArgs });

  for (const candidate of candidates) {
    const probe = spawnSync(
      candidate.cmd,
      [...candidate.prefixArgs, '-c', 'import sys, tomllib; assert sys.version_info >= (3, 11)'],
      { cwd: root, encoding: 'utf8', windowsHide: true },
    );
    if (!probe.error && probe.status === 0) {
      return candidate;
    }
  }
  return null;
}

function parseTomlFiles(root, files) {
  const runner = findPythonRunner(root);
  if (!runner) {
    throw new Error('Python >=3.11 interpreter is required to parse TOML dependency manifests');
  }
  const pyScript = [
    'import json, pathlib, sys, tomllib',
    'payload = json.loads(sys.stdin.read())',
    'out = {}',
    'for rel in payload["files"]:',
    '    p = pathlib.Path(payload["root"]) / rel',
    '    out[rel] = tomllib.loads(p.read_text(encoding="utf-8"))',
    'print(json.dumps(out))',
  ].join('\n');

  const res = spawnSync(runner.cmd, [...runner.prefixArgs, '-c', pyScript], {
    cwd: root,
    input: JSON.stringify({ root, files }),
    encoding: 'utf8',
    windowsHide: true,
    maxBuffer: 10 * 1024 * 1024,
  });
  if (res.error || res.status !== 0) {
    throw new Error(`TOML parsing failed: ${res.stderr || res.error?.message || res.status}`);
  }
  return JSON.parse(res.stdout);
}

function listPackageJsonPaths(root) {
  const paths = ['package.json'];
  for (const base of ['apps', 'packages']) {
    const dir = path.join(root, base);
    if (!fs.existsSync(dir)) continue;
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      if (!entry.isDirectory()) continue;
      const pkgRel = `${base}/${entry.name}/package.json`;
      if (fs.existsSync(path.join(root, pkgRel))) {
        paths.push(pkgRel);
      }
    }
  }
  return paths.sort();
}

function listPyprojectPaths(root) {
  const paths = [];
  if (fs.existsSync(path.join(root, 'pyproject.toml'))) {
    paths.push('pyproject.toml');
  }
  const servicesDir = path.join(root, 'services');
  if (fs.existsSync(servicesDir)) {
    for (const entry of fs.readdirSync(servicesDir, { withFileTypes: true })) {
      if (!entry.isDirectory()) continue;
      const rel = `services/${entry.name}/pyproject.toml`;
      if (fs.existsSync(path.join(root, rel))) {
        paths.push(rel);
      }
    }
  }
  return paths.sort();
}

function isFloatingNpmSpec(pkgName, spec) {
  if (typeof spec !== 'string' || !spec.trim()) return true;
  const trimmed = spec.trim();
  if (pkgName.startsWith('@notification/') && trimmed === '*') {
    return false;
  }
  if (trimmed === '*') return true;
  return FLOATING_NPM_PATTERNS.some((re) => re.test(trimmed));
}

function isExactPythonPin(spec) {
  if (typeof spec !== 'string' || !spec.trim()) return false;
  const withoutMarker = spec.split(';')[0].trim();
  const match = withoutMarker.match(EXACT_PEP508_RE);
  if (!match) return false;
  return !match[1].includes('*');
}

function checkPinning(options = {}) {
  const root = path.resolve(options.root || DEFAULT_ROOT);
  const errors = [];

  const pkgLockPath = path.join(root, 'package-lock.json');
  if (!fs.existsSync(pkgLockPath)) {
    errors.push('package-lock.json is missing');
  } else {
    try {
      const lock = JSON.parse(fs.readFileSync(pkgLockPath, 'utf8'));
      if (lock.lockfileVersion !== 3) {
        errors.push(`package-lock.json must have lockfileVersion === 3 (found ${lock.lockfileVersion})`);
      }
      for (const [key, meta] of Object.entries(lock.packages || {})) {
        if (!key || !key.includes('node_modules/') || meta.link) continue;
        if (typeof meta.integrity !== 'string' || !meta.integrity.startsWith('sha512-')) {
          errors.push(`package-lock.json entry "${key}" is missing sha512 integrity`);
        }
        if (typeof meta.resolved !== 'string' || !meta.resolved.startsWith('https://registry.npmjs.org/')) {
          errors.push(`package-lock.json entry "${key}" must resolve from https://registry.npmjs.org/`);
        }
      }
    } catch (err) {
      errors.push(`package-lock.json is invalid JSON: ${err.message}`);
    }
  }

  for (const rel of listPackageJsonPaths(root)) {
    const full = path.join(root, rel);
    try {
      const pkg = JSON.parse(fs.readFileSync(full, 'utf8'));
      if (rel === 'package.json') {
        if (!pkg.engines || typeof pkg.engines.node !== 'string' || !pkg.engines.node.trim()) {
          errors.push('package.json must declare engines.node');
        }
        if (!pkg.engines || typeof pkg.engines.npm !== 'string' || !pkg.engines.npm.trim()) {
          errors.push('package.json must declare engines.npm');
        }
      }
      for (const section of ['dependencies', 'devDependencies', 'optionalDependencies', 'peerDependencies']) {
        const deps = pkg[section];
        if (!deps || typeof deps !== 'object') continue;
        for (const [name, spec] of Object.entries(deps)) {
          if (isFloatingNpmSpec(name, spec)) {
            errors.push(`${rel}: ${section}.${name} has disallowed floating/unpinned spec "${spec}"`);
          }
        }
      }
    } catch (err) {
      errors.push(`${rel}: invalid JSON: ${err.message}`);
    }
  }

  const pyVersionPath = path.join(root, '.python-version');
  if (!fs.existsSync(pyVersionPath)) {
    errors.push('.python-version is missing');
  } else {
    const pyVer = fs.readFileSync(pyVersionPath, 'utf8').trim();
    if (pyVer !== '3.12') {
      errors.push(`.python-version must be "3.12" (found "${pyVer}")`);
    }
  }

  const uvLockRel = 'uv.lock';
  const hasUvLock = fs.existsSync(path.join(root, uvLockRel));
  if (!hasUvLock) {
    errors.push('uv.lock is missing');
  }

  const pyprojects = listPyprojectPaths(root);
  if (pyprojects.length === 0) {
    errors.push('No pyproject.toml found');
  }

  const tomlToParse = [...pyprojects, ...(hasUvLock ? [uvLockRel] : [])];
  if (tomlToParse.length > 0) {
    let parsed;
    try {
      parsed = parseTomlFiles(root, tomlToParse);
    } catch (err) {
      errors.push(err.message);
      parsed = {};
    }

    for (const rel of pyprojects) {
      const doc = parsed[rel];
      if (!doc) continue;
      const project = doc.project || {};
      if (project['requires-python'] !== '>=3.12,<3.13') {
        errors.push(`${rel}: project.requires-python must be ">=3.12,<3.13" (found "${project['requires-python'] || ''}")`);
      }
      if (Array.isArray(project.dependencies)) {
        for (const spec of project.dependencies) {
          if (!isExactPythonPin(spec)) {
            errors.push(`${rel}: project.dependencies entry "${spec}" must use an exact == version pin`);
          }
        }
      }
      const optDeps = project['optional-dependencies'];
      if (optDeps && typeof optDeps === 'object') {
        for (const [group, specs] of Object.entries(optDeps)) {
          if (!Array.isArray(specs)) continue;
          for (const spec of specs) {
            if (!isExactPythonPin(spec)) {
              errors.push(`${rel}: optional-dependencies.${group} entry "${spec}" must use an exact == version pin`);
            }
          }
        }
      }
      const depGroups = doc['dependency-groups'];
      if (depGroups && typeof depGroups === 'object') {
        for (const [group, entries] of Object.entries(depGroups)) {
          if (!Array.isArray(entries)) continue;
          for (const entry of entries) {
            if (typeof entry === 'string' && !isExactPythonPin(entry)) {
              errors.push(`${rel}: dependency-groups.${group} entry "${entry}" must use an exact == version pin`);
            }
          }
        }
      }
    }

    if (hasUvLock && parsed[uvLockRel]) {
      const lock = parsed[uvLockRel];
      if (lock.version !== 1) {
        errors.push(`uv.lock must have version = 1 (found ${lock.version})`);
      }
      const packages = Array.isArray(lock.package) ? lock.package : [];
      for (const pkg of packages) {
        const src = pkg.source || {};
        if (src.editable !== undefined || src.virtual !== undefined) continue;
        const hasSdist = pkg.sdist && typeof pkg.sdist === 'object';
        const sdistOk = !hasSdist || (typeof pkg.sdist.hash === 'string' && pkg.sdist.hash.startsWith('sha256:'));
        const wheels = Array.isArray(pkg.wheels) ? pkg.wheels : [];
        const wheelsOk = wheels.every((w) => typeof w.hash === 'string' && w.hash.startsWith('sha256:'));
        const hasAnyArtifact = hasSdist || wheels.length > 0;
        if (!hasAnyArtifact || !sdistOk || !wheelsOk) {
          errors.push(`uv.lock package "${pkg.name}" is missing sha256 artifact hashes`);
        }
      }
    }
  }

  return { ok: errors.length === 0, errors };
}

function evaluateNpmAuditReport(rawOrObj) {
  let report;
  try {
    report = typeof rawOrObj === 'string' ? JSON.parse(rawOrObj) : rawOrObj;
  } catch (err) {
    return {
      ok: false,
      error: `Invalid npm audit JSON output: ${err.message}`,
      findings: [],
    };
  }

  if (!report || typeof report !== 'object' || Array.isArray(report)) {
    return { ok: false, error: 'npm audit output must be a JSON object', findings: [] };
  }
  if (report.error) {
    const code = report.error.code || 'NPM_AUDIT_ERROR';
    const summary = report.error.summary || report.error.detail || 'npm audit reported an error';
    return { ok: false, error: `${code}: ${summary}`, findings: [] };
  }

  const disallowedSeverities = new Set(['moderate', 'high', 'critical']);
  const findings = [];
  const vulns = report.vulnerabilities;
  if (vulns && typeof vulns === 'object') {
    for (const [pkgKey, info] of Object.entries(vulns)) {
      if (!info || typeof info !== 'object') continue;
      const severity = String(info.severity || '').toLowerCase();
      if (!disallowedSeverities.has(severity)) continue;

      const viaList = Array.isArray(info.via) ? info.via : [];
      const advisory = viaList.find((v) => v && typeof v === 'object') || null;
      const title = advisory?.title || viaList.filter((v) => typeof v === 'string').join(', ') || 'Vulnerability reported';
      findings.push({
        package: info.name || pkgKey,
        severity,
        title,
        url: advisory?.url || null,
        range: info.range || advisory?.range || null,
        fixAvailable: info.fixAvailable ?? false,
      });
    }
  }

  const metaVulns = report.metadata?.vulnerabilities || {};
  const metaCount = ['moderate', 'high', 'critical'].reduce((sum, key) => sum + Number(metaVulns[key] || 0), 0);
  const ok = findings.length === 0 && metaCount === 0;
  const error = !ok && findings.length === 0 ? `npm audit metadata reported ${metaCount} moderate/high/critical vulnerabilities` : null;

  return { ok, error, findings };
}

function evaluatePipAuditReport(rawOrObj) {
  let report;
  try {
    report = typeof rawOrObj === 'string' ? JSON.parse(rawOrObj) : rawOrObj;
  } catch (err) {
    return {
      ok: false,
      error: `Invalid pip-audit JSON output: ${err.message}`,
      findings: [],
    };
  }

  if (!report || typeof report !== 'object') {
    return { ok: false, error: 'pip-audit output must be JSON', findings: [] };
  }
  if (!Array.isArray(report) && report.error) {
    return { ok: false, error: String(report.error), findings: [] };
  }

  const deps = Array.isArray(report) ? report : report.dependencies;
  if (!Array.isArray(deps)) {
    return { ok: false, error: 'pip-audit JSON missing "dependencies" array', findings: [] };
  }

  const findings = [];
  for (const dep of deps) {
    if (!dep || typeof dep !== 'object') continue;
    if (dep.skip_reason) {
      return {
        ok: false,
        error: `pip-audit skipped package "${dep.name}": ${dep.skip_reason}`,
        findings,
      };
    }
    const vulns = Array.isArray(dep.vulns) ? dep.vulns : [];
    for (const vuln of vulns) {
      findings.push({
        package: dep.name,
        version: dep.version,
        id: vuln.id,
        aliases: Array.isArray(vuln.aliases) ? vuln.aliases : [],
        fix_versions: Array.isArray(vuln.fix_versions) ? vuln.fix_versions : [],
      });
    }
  }

  return { ok: findings.length === 0, error: null, findings };
}

function runNpmAudit(root) {
  const npmCli = path.join(path.dirname(process.execPath), 'node_modules', 'npm', 'bin', 'npm-cli.js');
  const useNodeCli = fs.existsSync(npmCli);
  const cmd = useNodeCli ? process.execPath : (process.platform === 'win32' ? 'npm.cmd' : 'npm');
  const args = useNodeCli
    ? [npmCli, 'audit', '--audit-level=moderate', '--json']
    : ['audit', '--audit-level=moderate', '--json'];

  const res = spawnSync(cmd, args, {
    cwd: root,
    encoding: 'utf8',
    shell: !useNodeCli && process.platform === 'win32',
    windowsHide: true,
    maxBuffer: 10 * 1024 * 1024,
  });

  if (res.error) {
    return { ok: false, error: `Failed to execute npm audit: ${res.error.message}`, findings: [] };
  }
  if (!res.stdout || !res.stdout.trim()) {
    return { ok: false, error: `npm audit produced empty output: ${(res.stderr || '').trim()}`, findings: [] };
  }
  return evaluateNpmAuditReport(res.stdout);
}

function runSelfTest() {
  const npmVulnReport = {
    auditReportVersion: 2,
    vulnerabilities: {
      'example-pkg': {
        name: 'example-pkg',
        severity: 'high',
        via: [
          {
            source: 1001,
            name: 'example-pkg',
            title: 'Synthetic prototype pollution',
            url: 'https://github.com/advisories/GHSA-0000-0000-0001',
            severity: 'high',
            range: '<2.0.0',
          },
        ],
        range: '<2.0.0',
        fixAvailable: { name: 'example-pkg', version: '2.0.0', isSemVerMajor: true },
      },
    },
    metadata: {
      vulnerabilities: { info: 0, low: 0, moderate: 0, high: 1, critical: 0, total: 1 },
    },
  };

  const npmResult = evaluateNpmAuditReport(npmVulnReport);
  assert.equal(npmResult.ok, false);
  assert.equal(npmResult.findings.length, 1);
  assert.equal(npmResult.findings[0].package, 'example-pkg');
  assert.equal(npmResult.findings[0].severity, 'high');
  assert.equal(npmResult.findings[0].title, 'Synthetic prototype pollution');
  assert.deepEqual(npmResult.findings[0].fixAvailable, { name: 'example-pkg', version: '2.0.0', isSemVerMajor: true });

  const pipVulnReport = {
    dependencies: [
      {
        name: 'example-py',
        version: '1.0.0',
        vulns: [
          {
            id: 'PYSEC-2026-0001',
            aliases: ['CVE-2026-0001'],
            fix_versions: ['1.0.1'],
          },
        ],
      },
    ],
  };

  const pipResult = evaluatePipAuditReport(pipVulnReport);
  assert.equal(pipResult.ok, false);
  assert.equal(pipResult.findings.length, 1);
  assert.equal(pipResult.findings[0].package, 'example-py');
  assert.equal(pipResult.findings[0].id, 'PYSEC-2026-0001');
  assert.deepEqual(pipResult.findings[0].fix_versions, ['1.0.1']);

  assert.equal(evaluateNpmAuditReport({ vulnerabilities: {}, metadata: { vulnerabilities: { moderate: 0, high: 0, critical: 0 } } }).ok, true);
  assert.equal(evaluatePipAuditReport({ dependencies: [{ name: 'clean-pkg', version: '1.0.0', vulns: [] }] }).ok, true);

  return { ok: true };
}

function parseArgs(argv) {
  if (argv.length === 0) return { mode: 'pinning' };
  const mode = argv[0];
  if (mode === '--pinning' && argv.length === 1) return { mode: 'pinning' };
  if (mode === '--audit-npm' && argv.length === 1) return { mode: 'audit-npm' };
  if (mode === '--audit-pip' && argv.length === 2) return { mode: 'audit-pip', file: path.resolve(argv[1]) };
  if (mode === '--self-test' && argv.length === 1) return { mode: 'self-test' };
  throw new Error('Usage: check-deps.js [--pinning | --audit-npm | --audit-pip <json-path> | --self-test]');
}

if (require.main === module) {
  try {
    const args = parseArgs(process.argv.slice(2));
    if (args.mode === 'pinning') {
      const res = checkPinning();
      if (!res.ok) {
        for (const err of res.errors) console.error(`ERROR: ${err}`);
        process.exitCode = 1;
      } else {
        console.log('Dependency pinning and lockfile checks passed.');
      }
    } else if (args.mode === 'audit-npm') {
      const res = runNpmAudit(DEFAULT_ROOT);
      if (!res.ok) {
        if (res.error) console.error(`ERROR: ${res.error}`);
        if (res.findings.length > 0) console.error(JSON.stringify(res.findings, null, 2));
        process.exitCode = 1;
      } else {
        console.log('npm audit passed (0 moderate/high/critical vulnerabilities).');
      }
    } else if (args.mode === 'audit-pip') {
      const raw = fs.readFileSync(args.file, 'utf8');
      const res = evaluatePipAuditReport(raw);
      if (!res.ok) {
        if (res.error) console.error(`ERROR: ${res.error}`);
        if (res.findings.length > 0) console.error(JSON.stringify(res.findings, null, 2));
        process.exitCode = 1;
      } else {
        console.log('pip-audit report passed (0 vulnerabilities).');
      }
    } else if (args.mode === 'self-test') {
      runSelfTest();
      console.log('Dependency audit gate self-test passed.');
    }
  } catch (err) {
    console.error(err.message);
    process.exitCode = 1;
  }
}

module.exports = {
  checkPinning,
  evaluateNpmAuditReport,
  evaluatePipAuditReport,
  runSelfTest,
};
