const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const assert = require('node:assert/strict');
const { spawnSync } = require('node:child_process');

const DEFAULT_ROOT = path.resolve(__dirname, '..');
const IGNORED_DIRS = new Set(['.git', '.idea', 'node_modules', '.venv', '.uv-cache', 'dist', '__pycache__']);

const PLACEHOLDER_VALUE_RE = /^(?:your[-_].*|placeholder.*|example.*|changeme.*|change-me.*|test[-_]?secret.*|dummy.*|redacted.*|token|secret|key|<[^>]*>|\$\{\{?[^}]*\}?\}?)$/i;

const SECRET_RULES = [
  {
    id: 'private-key-pem',
    regex: /-----BEGIN (?:RSA |EC |DSA |OPENSSH |PGP )?PRIVATE KEY-----/g,
  },
  {
    id: 'github-token',
    regex: /\b(?:gh[pousr]_[A-Za-z0-9]{36}|github_pat_[A-Za-z0-9_]{22,})\b/g,
  },
  {
    id: 'aws-access-key',
    regex: /\b(?:AKIA|ASIA)[0-9A-Z]{16}\b/g,
  },
  {
    id: 'slack-token',
    regex: /\bxox[baprs]-[0-9A-Za-z-]{10,}\b/g,
  },
  {
    id: 'provider-api-key',
    regex: /\b(?:sk-(?:proj-|ant-)?[A-Za-z0-9_-]{20,}|AIza[0-9A-Za-z_-]{35})\b/g,
  },
  {
    id: 'discord-bot-token',
    regex: /\b[MN][A-Za-z0-9]{23,28}\.[A-Za-z0-9_-]{6}\.[A-Za-z0-9_-]{27,38}\b/g,
  },
  {
    id: 'credentialed-db-uri',
    regex: /\b(?:postgres(?:ql)?|mongodb(?:\+srv)?|mysql|redis):\/\/([^:\s/@]+):([^@\s/'"`]+)@/gi,
    isAllowed: (match, groups) => PLACEHOLDER_VALUE_RE.test(groups[1] || ''),
  },
  {
    id: 'env-secret-assignment',
    regex: /\b(?:DISCORD_BOT_TOKEN|DISCORD_CLIENT_SECRET|DISCORD_PUBLIC_KEY|LINE_CHANNEL_SECRET|LINE_CHANNEL_ACCESS_TOKEN|OPENAI_API_KEY|GEMINI_API_KEY|ANTHROPIC_API_KEY|AWS_SECRET_ACCESS_KEY|GITHUB_TOKEN|NPM_TOKEN)\s*(?:=\s*['"]?([^\s'"#]{8,})['"]?|:\s*['"]([^\s'"#]{8,})['"]|:\s+([^\s'"#,}\[\]]{8,}))/gi,
    skipFile: (rel) => /\.sha256$/i.test(rel),
    isAllowed: (match, groups) => {
      const value = groups.find((g) => g !== undefined) || '';
      return PLACEHOLDER_VALUE_RE.test(value);
    },
  },
];

function walkFiles(dir, prefix = '') {
  if (!fs.existsSync(dir)) return [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const results = [];
  for (const entry of entries) {
    if (IGNORED_DIRS.has(entry.name)) continue;
    const rel = prefix ? `${prefix}/${entry.name}` : entry.name;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...walkFiles(full, rel));
    } else if (entry.isFile()) {
      results.push(rel);
    }
  }
  return results.sort();
}

function listFiles(root, useGit) {
  if (!useGit || !fs.existsSync(path.join(root, '.git'))) {
    return walkFiles(root);
  }
  const trackedRes = spawnSync('git', ['ls-files'], {
    cwd: root,
    encoding: 'utf8',
    maxBuffer: 10 * 1024 * 1024,
    windowsHide: true,
  });
  if (trackedRes.status !== 0) {
    throw new Error(`git ls-files failed in ${root}: ${trackedRes.stderr || trackedRes.error?.message || trackedRes.status}`);
  }
  const untrackedRes = spawnSync('git', ['ls-files', '--others', '--exclude-standard'], {
    cwd: root,
    encoding: 'utf8',
    maxBuffer: 10 * 1024 * 1024,
    windowsHide: true,
  });
  if (untrackedRes.status !== 0) {
    throw new Error(`git ls-files --others failed in ${root}: ${untrackedRes.stderr || untrackedRes.error?.message || untrackedRes.status}`);
  }
  const tracked = trackedRes.stdout.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
  const untracked = untrackedRes.stdout
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter((rel) => rel && !rel.startsWith('.idea/'));
  return [...new Set([...tracked, ...untracked])]
    .filter((rel) => fs.existsSync(path.join(root, rel)))
    .sort();
}

function redactMatch() {
  return '<REDACTED>';
}

function isDisallowedEnvFile(rel) {
  const base = path.basename(rel);
  if (base === '.env.example') return false;
  return base === '.env' || base.startsWith('.env.');
}

function scanSecrets(options = {}) {
  const normalized = typeof options === 'string' ? { path: options } : options;
  const targetDir = path.resolve(normalized.path || normalized.root || DEFAULT_ROOT);
  const useGit = !normalized.path && fs.existsSync(path.join(targetDir, '.git'));
  const files = normalized.files ? [...normalized.files].sort() : listFiles(targetDir, useGit);

  const findings = [];
  for (const relRaw of files) {
    const rel = relRaw.replace(/\\/g, '/');
    if (isDisallowedEnvFile(rel)) {
      findings.push({
        file: rel,
        line: 1,
        ruleId: 'tracked-env-file',
        secret: redactMatch(),
      });
    }

    const fullPath = path.join(targetDir, rel);
    if (!fs.existsSync(fullPath) || !fs.statSync(fullPath).isFile()) continue;

    const buf = fs.readFileSync(fullPath);
    if (buf.includes(0)) continue;
    const text = buf.toString('utf8');
    const lines = text.split(/\r?\n/);

    for (let idx = 0; idx < lines.length; idx++) {
      const lineText = lines[idx];
      for (const rule of SECRET_RULES) {
        if (rule.skipFile && rule.skipFile(rel)) continue;
        rule.regex.lastIndex = 0;
        let m;
        while ((m = rule.regex.exec(lineText)) !== null) {
          const groups = m.slice(1);
          if (rule.isAllowed && rule.isAllowed(m[0], groups)) {
            continue;
          }
          findings.push({
            file: rel,
            line: idx + 1,
            ruleId: rule.id,
            secret: redactMatch(m[0]),
          });
        }
      }
    }
  }

  return {
    ok: findings.length === 0,
    scannedCount: files.length,
    findings,
  };
}

function formatFindings(findings) {
  return findings.map((f) => JSON.stringify({
    file: f.file,
    line: f.line,
    ruleId: f.ruleId,
    secret: '<REDACTED>',
  })).join('\n');
}

function runSelfTest() {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'secret-gate-selftest-'));
  try {
    const syntheticGithubPat = ['ghp', '_'].join('') + Array.from({ length: 36 }, (_, i) => String.fromCharCode(65 + (i % 26))).join('');
    const syntheticAwsKey = ['AKI', 'A'].join('') + Array.from({ length: 16 }, (_, i) => String.fromCharCode(65 + (i % 26))).join('');
    const syntheticDiscordToken = [
      'M' + 'T'.repeat(23),
      'AbCdEf',
      'X'.repeat(27),
    ].join('.');
    const syntheticDbPass = ['Sup3r', 'S3cret', 'Pass'].join('');
    const syntheticDbUri = ['postgres://appuser:', syntheticDbPass, '@db.internal:5432/app'].join('');
    const syntheticPem = ['-----BEGIN ', 'PRIVATE KEY-----'].join('');

    const envLines = [
      `${['GITHUB', 'TOKEN'].join('_')}=${syntheticGithubPat}`,
      `AWS_ACCESS=${syntheticAwsKey}`,
      `BOT=${syntheticDiscordToken}`,
      `${['DATABASE', 'URL'].join('_')}=${syntheticDbUri}`,
      syntheticPem,
    ];
    fs.writeFileSync(path.join(tmpDir, 'leak.txt'), envLines.join('\n') + '\n', 'utf8');
    const envSecretVal = ['synthetic', 'env', 'secret', '98765'].join('_');
    fs.writeFileSync(
      path.join(tmpDir, '.env'),
      `${['DISCORD', 'BOT', 'TOKEN'].join('_')}=${envSecretVal}\n`,
      'utf8',
    );
    fs.writeFileSync(
      path.join(tmpDir, '.env.example'),
      [
        `${['DISCORD', 'BOT', 'TOKEN'].join('_')}=`,
        `${['OPENAI', 'API', 'KEY'].join('_')}=your-openai-key`,
        `${['DATABASE', 'URL'].join('_')}=postgres://user:placeholder@localhost:5432/db`,
      ].join('\n') + '\n',
      'utf8',
    );

    const result = scanSecrets({ path: tmpDir });
    assert.equal(result.ok, false, 'Self-test expected findings on synthetic leaks');
    assert.ok(result.findings.length >= 6, `Expected >= 6 findings, got ${result.findings.length}`);
    assert.ok(result.findings.every((f) => f.file !== '.env.example'), 'Should not flag .env.example placeholders');

    const formatted = formatFindings(result.findings);
    assert.ok(formatted.includes('<REDACTED>'), 'Formatted output must include <REDACTED>');
    for (const raw of [syntheticGithubPat, syntheticAwsKey, syntheticDiscordToken, syntheticDbPass, envSecretVal]) {
      assert.ok(!formatted.includes(raw), 'Formatted output must never expose raw synthetic token');
    }
    return { ok: true, findingCount: result.findings.length };
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
}

function parseArgs(argv) {
  const options = { selfTest: false };
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === '--path') {
      const value = argv[++i];
      if (!value) throw new Error('Missing value for --path');
      options.path = path.resolve(value);
    } else if (arg === '--self-test') {
      options.selfTest = true;
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }
  return options;
}

if (require.main === module) {
  try {
    const args = parseArgs(process.argv.slice(2));
    if (args.selfTest) {
      const res = runSelfTest();
      console.log(`Secret gate self-test passed (${res.findingCount} redacted findings verified).`);
    } else {
      const res = scanSecrets(args.path ? { path: args.path } : {});
      if (!res.ok) {
        console.error(formatFindings(res.findings));
        process.exitCode = 1;
      } else {
        console.log(`Secret scan passed (${res.scannedCount} files scanned, 0 findings).`);
      }
    }
  } catch (err) {
    console.error(err.message);
    process.exitCode = 1;
  }
}

module.exports = { scanSecrets, redactMatch, formatFindings, runSelfTest };
