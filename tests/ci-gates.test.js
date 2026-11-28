const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

const { checkFormatting } = require('../scripts/check-format');
const { scanSecrets, formatFindings } = require('../scripts/check-secrets');
const { checkPinning, evaluateNpmAuditReport, evaluatePipAuditReport } = require('../scripts/check-deps');
const { validateBranchName, extractIssueRefs, validatePrGovernance } = require('../scripts/check-pr-governance');

const REPO_ROOT = path.resolve(__dirname, '..');

function withTempDir(fn) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'ci-gates-test-'));
  try {
    return fn(dir);
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
}

function writeFixture(dir, relPath, content) {
  const full = path.join(dir, relPath);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, content, 'utf8');
}

function validWorkflowYaml(overrides = {}) {
  const perms = overrides.permissions !== undefined ? overrides.permissions : 'permissions:\n  contents: read\n';
  const trigger = overrides.trigger || 'on:\n  pull_request:\n    branches:\n      - main\n';
  const uses = overrides.uses || 'actions/checkout@3d3c42e5aac5ba805825da76410c181273ba90b1';
  const jobPerms = overrides.jobPermissions || '';
  return [
    'name: Sample',
    trigger.trimEnd(),
    perms ? perms.trimEnd() : '',
    'jobs:',
    '  check:',
    '    runs-on: ubuntu-latest',
    ...(jobPerms ? [jobPerms.trimEnd()] : []),
    '    steps:',
    `      - uses: ${uses}`,
    '      - run: echo ok',
  ].filter(Boolean).join('\n') + '\n';
}

test('checkFormatting passes on repository root', () => {
  const res = checkFormatting({ root: REPO_ROOT });
  assert.equal(res.ok, true, res.errors.join('\n'));
  assert.ok(res.checkedCount > 50);
});

test('checkFormatting rejects text hygiene violations', () => {
  withTempDir((dir) => {
    writeFixture(dir, 'trailing.txt', 'hello   \n');
    writeFixture(dir, 'tab.js', 'const x = 1;\n\tconst y = 2;\n');
    writeFixture(dir, 'crlf.txt', 'hello\r\n');
    writeFixture(dir, 'no-eof.txt', 'hello');
    writeFixture(dir, 'extra-eof.txt', 'hello\n\n');
    writeFixture(dir, 'conflict.txt', '<<<<<<< HEAD\na\n=======\nb\n>>>>>>> main\n');

    const res = checkFormatting({ root: dir, checkIndexEol: false });
    assert.equal(res.ok, false);
    const joined = res.errors.join('\n');
    assert.match(joined, /trailing\.txt:1: trailing whitespace/);
    assert.match(joined, /tab\.js:2: tab character is forbidden/);
    assert.match(joined, /crlf\.txt: CRLF/);
    assert.match(joined, /no-eof\.txt: missing trailing newline/);
    assert.match(joined, /extra-eof\.txt: multiple trailing blank lines/);
    assert.match(joined, /conflict\.txt:1: merge conflict marker/);
  });
});

test('checkFormatting rejects duplicate JSON keys and invalid JS/YAML/TOML/Python', () => {
  withTempDir((dir) => {
    writeFixture(dir, 'dup.json', '{\n  "a": 1,\n  "a": 2\n}\n');
    writeFixture(dir, 'bad.js', 'const x = ;\n');
    writeFixture(dir, 'bad.yml', 'a: 1\na: 2\n');
    writeFixture(dir, 'bad.toml', '[project\nname = "x"\n');
    writeFixture(dir, 'bad_indent.py', 'def f():\n  return 1\n');

    const res = checkFormatting({ root: dir, checkIndexEol: false });
    assert.equal(res.ok, false);
    const joined = res.errors.join('\n');
    assert.match(joined, /dup\.json:.*Duplicate JSON key "a"/);
    assert.match(joined, /bad\.js: JavaScript syntax error/);
    assert.match(joined, /bad\.yml: invalid YAML/);
    assert.match(joined, /bad\.toml: TOML validation failed/);
    assert.match(joined, /bad_indent\.py:2: expected 4-space Python indentation/);
  });
});

test('checkFormatting enforces GitHub workflow security policies', () => {
  withTempDir((dir) => {
    writeFixture(dir, '.github/workflows/good.yml', validWorkflowYaml());
    writeFixture(dir, '.github/workflows/unpinned.yml', validWorkflowYaml({ uses: 'actions/checkout@v7' }));
    writeFixture(dir, '.github/workflows/pr-target.yml', validWorkflowYaml({
      trigger: 'on:\n  pull_request_target:\n',
    }));
    writeFixture(dir, '.github/workflows/write-perm.yml', validWorkflowYaml({
      permissions: 'permissions:\n  contents: write\n',
    }));
    writeFixture(dir, '.github/workflows/no-perm.yml', validWorkflowYaml({ permissions: '' }));

    const res = checkFormatting({ root: dir, checkIndexEol: false });
    assert.equal(res.ok, false);
    const joined = res.errors.join('\n');
    assert.ok(!joined.includes('good.yml'), `Unexpected error for good.yml: ${joined}`);
    assert.match(joined, /unpinned\.yml:.*unpinned action/);
    assert.match(joined, /pr-target\.yml:.*pull_request_target/);
    assert.match(joined, /write-perm\.yml:.*grants write access/);
    assert.match(joined, /no-perm\.yml: missing top-level "permissions:"/);
  });
});

test('scanSecrets passes on repository root', () => {
  const res = scanSecrets({ root: REPO_ROOT });
  assert.equal(res.ok, true, JSON.stringify(res.findings));
});

test('scanSecrets detects synthetic secrets and redacts formatted output', () => {
  withTempDir((dir) => {
    const githubPat = ['ghp', '_'].join('') + Array.from({ length: 36 }, (_, i) => String.fromCharCode(97 + (i % 26))).join('');
    const discordTok = ['M' + 'A'.repeat(23), 'XyZaBc', 'Q'.repeat(27)].join('.');
    const awsKey = ['AKI', 'A'].join('') + Array.from({ length: 16 }, (_, i) => String.fromCharCode(48 + (i % 10))).join('');
    const pemHeader = ['-----BEGIN ', 'RSA ', 'PRIVATE KEY-----'].join('');
    const dbPass = ['MyS3cret', 'DbPass'].join('');
    const dbUri = ['postgresql://svc:', dbPass, '@db.internal:5432/prod'].join('');
    const envVal = ['custom', 'secret', 'assignment', '42'].join('_');

    writeFixture(dir, 'leaks.txt', [
      `token=${githubPat}`,
      `discord=${discordTok}`,
      `aws=${awsKey}`,
      pemHeader,
      `uri=${dbUri}`,
      `${['OPENAI', 'API', 'KEY'].join('_')}=${envVal}`,
    ].join('\n') + '\n');
    writeFixture(dir, '.env', `${['DISCORD', 'BOT', 'TOKEN'].join('_')}=${envVal}\n`);
    writeFixture(dir, '.env.example', `${['DISCORD', 'BOT', 'TOKEN'].join('_')}=\n${['OPENAI', 'API', 'KEY'].join('_')}=your-openai-key\n`);

    const res = scanSecrets({ path: dir });
    assert.equal(res.ok, false);
    const ruleIds = new Set(res.findings.map((f) => f.ruleId));
    assert.ok(ruleIds.has('github-token'));
    assert.ok(ruleIds.has('discord-bot-token'));
    assert.ok(ruleIds.has('aws-access-key'));
    assert.ok(ruleIds.has('private-key-pem'));
    assert.ok(ruleIds.has('credentialed-db-uri'));
    assert.ok(ruleIds.has('env-secret-assignment'));
    assert.ok(ruleIds.has('tracked-env-file'));
    assert.ok(res.findings.every((f) => f.file !== '.env.example'));

    const output = formatFindings(res.findings);
    const serialized = JSON.stringify(res);
    assert.ok(output.includes('<REDACTED>'));
    for (const raw of [githubPat, discordTok, awsKey, dbPass, envVal]) {
      assert.ok(!output.includes(raw), 'Formatted output leaked raw synthetic secret');
      assert.ok(!serialized.includes(raw), 'Scan result leaked raw synthetic secret');
    }
  });
});

test('checkPinning passes on repository root and rejects floating/unhashed fixtures', () => {
  const repoRes = checkPinning({ root: REPO_ROOT });
  assert.equal(repoRes.ok, true, repoRes.errors.join('\n'));

  withTempDir((dir) => {
    writeFixture(dir, '.python-version', '3.12\n');
    writeFixture(dir, 'package.json', JSON.stringify({
      name: 'fixture',
      private: true,
      engines: { node: '>=24 <25', npm: '>=11 <12' },
      dependencies: {
        '@notification/shared-config': '*',
        'floating-latest': 'latest',
        'floating-star': '*',
        'floating-range': '>=1.0.0',
        'git-dep': 'git+https://github.com/org/repo.git',
      },
    }, null, 2) + '\n');
    writeFixture(dir, 'package-lock.json', JSON.stringify({
      name: 'fixture',
      lockfileVersion: 3,
      packages: {
        'node_modules/bad-pkg': {
          version: '1.0.0',
          resolved: 'http://insecure.example.com/bad-pkg.tgz',
        },
      },
    }, null, 2) + '\n');
    writeFixture(dir, 'pyproject.toml', [
      '[project]',
      'name = "fixture"',
      'version = "0.1.0"',
      'requires-python = ">=3.12,<3.13"',
      'dependencies = ["jsonschema>=4.25.1"]',
    ].join('\n') + '\n');
    writeFixture(dir, 'uv.lock', [
      'version = 1',
      '',
      '[[package]]',
      'name = "jsonschema"',
      'version = "4.25.1"',
      'source = { registry = "https://pypi.org/simple" }',
      'wheels = [{ url = "https://files.pythonhosted.org/jsonschema.whl" }]',
    ].join('\n') + '\n');

    const res = checkPinning({ root: dir });
    assert.equal(res.ok, false);
    const joined = res.errors.join('\n');
    assert.ok(!joined.includes('@notification/shared-config'), 'Workspace * should be allowed');
    assert.match(joined, /floating-latest/);
    assert.match(joined, /floating-star/);
    assert.match(joined, /floating-range/);
    assert.match(joined, /git-dep/);
    assert.match(joined, /missing sha512 integrity/);
    assert.match(joined, /https:\/\/registry\.npmjs\.org\//);
    assert.match(joined, /exact == version pin/);
    assert.match(joined, /missing sha256 artifact hashes/);
  });
});

test('evaluateNpmAuditReport and evaluatePipAuditReport fail closed and report actionable details', () => {
  assert.equal(evaluateNpmAuditReport('not json').ok, false);
  assert.equal(evaluateNpmAuditReport({ error: { code: 'ENETUNREACH', summary: 'offline' } }).ok, false);

  const npmBad = evaluateNpmAuditReport({
    vulnerabilities: {
      lodash: {
        name: 'lodash',
        severity: 'high',
        via: [{ title: 'Prototype Pollution', url: 'https://github.com/advisories/GHSA-1', range: '<4.17.21' }],
        fixAvailable: true,
      },
    },
    metadata: { vulnerabilities: { moderate: 0, high: 1, critical: 0 } },
  });
  assert.equal(npmBad.ok, false);
  assert.equal(npmBad.findings[0].package, 'lodash');
  assert.equal(npmBad.findings[0].severity, 'high');
  assert.equal(npmBad.findings[0].title, 'Prototype Pollution');

  assert.equal(evaluatePipAuditReport('not json').ok, false);
  assert.equal(evaluatePipAuditReport({ dependencies: [{ name: 'x', version: '1.0', skip_reason: 'unresolvable' }] }).ok, false);

  const pipBad = evaluatePipAuditReport({
    dependencies: [
      {
        name: 'urllib3',
        version: '2.0.0',
        vulns: [{ id: 'PYSEC-2023-1', aliases: ['CVE-2023-1'], fix_versions: ['2.0.7'] }],
      },
    ],
  });
  assert.equal(pipBad.ok, false);
  assert.equal(pipBad.findings[0].package, 'urllib3');
  assert.equal(pipBad.findings[0].id, 'PYSEC-2023-1');
  assert.deepEqual(pipBad.findings[0].fix_versions, ['2.0.7']);
});

test('validateBranchName and extractIssueRefs handle valid and invalid inputs', () => {
  assert.equal(validateBranchName('feat/ep01-03-ci-gates').ok, true);
  assert.equal(validateBranchName('fix/12-token-refresh').ok, true);
  assert.equal(validateBranchName('main').ok, false);
  assert.equal(validateBranchName('feat/no-issue').ok, false);
  assert.equal(validateBranchName('feat/EP01-03-upper').ok, false);

  const commentOnly = extractIssueRefs({
    title: 'Add CI gates',
    body: '<!-- Closes #3 EP01-03 -->\nSummary only.',
    repoFullName: 'owner/repo',
  });
  assert.deepEqual(commentOnly.githubNumbers, []);
  assert.deepEqual(commentOnly.epIds, []);

  const invalidLinks = extractIssueRefs({
    title: 'Test #0',
    body: 'See https://github.com/owner/repo/pull/7 and other/repo#5',
    repoFullName: 'owner/repo',
  });
  assert.ok(invalidLinks.errors.some((e) => e.includes('#0')));
  assert.ok(invalidLinks.errors.some((e) => e.includes('/pull/7')));
  assert.ok(invalidLinks.errors.some((e) => e.includes('other/repo#5')));
});

test('validatePrGovernance enforces issue existence, type, and branch consistency', async () => {
  const repoFullName = 'kittipichcha/Bot-notification-Project-';

  const passWithGh = await validatePrGovernance({
    root: REPO_ROOT,
    event: {
      repository: { full_name: repoFullName },
      pull_request: {
        head: { ref: 'feat/ep01-03-ci-gates' },
        title: 'Configure CI gates',
        body: 'Closes #3',
      },
    },
    resolveGitHubIssue: async (_repo, num) => ({ number: num, title: 'EP01-03: Configure CI quality gates' }),
  });
  assert.equal(passWithGh.ok, true, passWithGh.errors.join('\n'));

  const passWithUrl = await validatePrGovernance({
    root: REPO_ROOT,
    event: {
      repository: { full_name: repoFullName },
      pull_request: {
        head: { ref: 'fix/12-token-refresh' },
        title: 'Fix token refresh',
        body: `Fixes https://github.com/${repoFullName}/issues/12`,
      },
    },
    resolveGitHubIssue: async (_repo, num) => ({ number: num, title: 'Fix token refresh' }),
  });
  assert.equal(passWithUrl.ok, true, passWithUrl.errors.join('\n'));

  const missingIssue = await validatePrGovernance({
    root: REPO_ROOT,
    event: {
      repository: { full_name: repoFullName },
      pull_request: {
        head: { ref: 'feat/ep01-03-ci-gates' },
        title: 'Configure CI gates',
        body: '<!-- Closes #3 -->',
      },
    },
  });
  assert.equal(missingIssue.ok, false);
  assert.ok(missingIssue.errors.some((e) => e.includes('must reference a tracked issue')));

  const notFoundIssue = await validatePrGovernance({
    root: REPO_ROOT,
    event: {
      repository: { full_name: repoFullName },
      pull_request: {
        head: { ref: 'feat/ep01-03-ci-gates' },
        title: 'Configure CI gates',
        body: 'Closes #999',
      },
    },
    resolveGitHubIssue: async () => {
      throw new Error('GitHub issue #999 lookup failed with HTTP 404');
    },
  });
  assert.equal(notFoundIssue.ok, false);
  assert.ok(notFoundIssue.errors.some((e) => e.includes('HTTP 404')));

  const prAsIssue = await validatePrGovernance({
    root: REPO_ROOT,
    event: {
      repository: { full_name: repoFullName },
      pull_request: {
        head: { ref: 'fix/7-something' },
        title: 'Fix',
        body: 'Closes #7',
      },
    },
    resolveGitHubIssue: async (_repo, num) => ({ number: num, title: 'Some PR', pull_request: {} }),
  });
  assert.equal(prAsIssue.ok, false);
  assert.ok(prAsIssue.errors.some((e) => e.includes('is a pull request, not an issue')));

  const missingEpDoc = await validatePrGovernance({
    root: REPO_ROOT,
    event: {
      repository: { full_name: repoFullName },
      pull_request: {
        head: { ref: 'feat/ep99-99-nonexistent' },
        title: 'EP99-99: Missing issue',
        body: 'Ref EP99-99',
      },
    },
  });
  assert.equal(missingEpDoc.ok, false);
  assert.ok(missingEpDoc.errors.some((e) => e.includes('EP99-99.md does not exist')));

  const branchMismatch = await validatePrGovernance({
    root: REPO_ROOT,
    event: {
      repository: { full_name: repoFullName },
      pull_request: {
        head: { ref: 'feat/ep01-03-ci-gates' },
        title: 'Configure CI gates',
        body: 'Closes #2',
      },
    },
    resolveGitHubIssue: async (_repo, num) => ({ number: num, title: 'EP01-02: Contracts' }),
  });
  assert.equal(branchMismatch.ok, false);
  assert.ok(branchMismatch.errors.some((e) => e.includes('requires linked issue "EP01-03"')));
});
