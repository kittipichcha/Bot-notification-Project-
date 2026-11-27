const fs = require('node:fs');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const { parse: parseYaml } = require('yaml');

const DEFAULT_ROOT = path.resolve(__dirname, '..');
const IGNORED_DIRS = new Set(['.git', '.idea', 'node_modules', '.venv', '.uv-cache', 'dist', '__pycache__']);
const TEXT_DECODER = new TextDecoder('utf-8', { fatal: true });
const WORKFLOW_SHA_RE = /^[^@\s]+@[0-9a-f]{40}$/;

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

function listRepoFiles(root) {
  const hasGit = fs.existsSync(path.join(root, '.git'));
  if (!hasGit) return walkFiles(root);

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

function readIndexEolMap(root) {
  const res = spawnSync('git', ['ls-files', '--eol'], {
    cwd: root,
    encoding: 'utf8',
    maxBuffer: 10 * 1024 * 1024,
    windowsHide: true,
  });
  if (res.status !== 0) {
    throw new Error(`git ls-files --eol failed in ${root}: ${res.stderr || res.error?.message || res.status}`);
  }
  const map = new Map();
  for (const line of res.stdout.split(/\r?\n/)) {
    if (!line.trim()) continue;
    const tabIdx = line.indexOf('\t');
    if (tabIdx === -1) continue;
    const meta = line.slice(0, tabIdx);
    const filePath = line.slice(tabIdx + 1).trim();
    const match = meta.match(/\bi\/([^\s]+)/);
    if (match) {
      map.set(filePath, match[1]);
    }
  }
  return map;
}

function checkJsonNoDuplicateKeys(text) {
  let i = 0;
  const len = text.length;

  function skipWs() {
    while (i < len && (text[i] === ' ' || text[i] === '\t' || text[i] === '\n' || text[i] === '\r')) i++;
  }

  function parseString() {
    if (text[i] !== '"') throw new Error(`Expected '"' at offset ${i}`);
    const start = i;
    i++;
    while (i < len) {
      const ch = text[i];
      if (ch === '\\') {
        i += 2;
      } else if (ch === '"') {
        i++;
        return JSON.parse(text.slice(start, i));
      } else {
        i++;
      }
    }
    throw new Error(`Unterminated JSON string at offset ${start}`);
  }

  function parseValue() {
    skipWs();
    if (i >= len) throw new Error('Unexpected end of JSON');
    const ch = text[i];
    if (ch === '{') {
      i++;
      skipWs();
      const keys = new Set();
      if (text[i] === '}') {
        i++;
        return;
      }
      while (true) {
        skipWs();
        const key = parseString();
        if (keys.has(key)) {
          throw new Error(`Duplicate JSON key "${key}"`);
        }
        keys.add(key);
        skipWs();
        if (text[i] !== ':') throw new Error(`Expected ':' after key "${key}" at offset ${i}`);
        i++;
        parseValue();
        skipWs();
        if (text[i] === ',') {
          i++;
        } else if (text[i] === '}') {
          i++;
          return;
        } else {
          throw new Error(`Expected ',' or '}' at offset ${i}`);
        }
      }
    }
    if (ch === '[') {
      i++;
      skipWs();
      if (text[i] === ']') {
        i++;
        return;
      }
      while (true) {
        parseValue();
        skipWs();
        if (text[i] === ',') {
          i++;
        } else if (text[i] === ']') {
          i++;
          return;
        } else {
          throw new Error(`Expected ',' or ']' at offset ${i}`);
        }
      }
    }
    if (ch === '"') {
      parseString();
      return;
    }
    const rest = text.slice(i);
    const match = rest.match(/^(?:true|false|null|-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?)/);
    if (!match) throw new Error(`Unexpected JSON token at offset ${i}`);
    i += match[0].length;
  }

  parseValue();
  skipWs();
  if (i !== len) throw new Error(`Trailing JSON content at offset ${i}`);
}

function checkTwoSpaceIndent(text, kind) {
  const lines = text.split(/\r?\n/);
  let prevIndent = 0;
  let blockScalarIndent = null;

  for (let idx = 0; idx < lines.length; idx++) {
    const line = lines[idx];
    if (!line.trim()) continue;
    const indent = line.match(/^ */)[0].length;

    if (kind === 'yaml') {
      if (blockScalarIndent !== null) {
        if (indent > blockScalarIndent) continue;
        blockScalarIndent = null;
      }
      if (/:\s*[|>][+-]?\d*\s*(?:#.*)?$/.test(line) || /^-\s+[|>][+-]?\d*\s*(?:#.*)?$/.test(line.trim())) {
        blockScalarIndent = indent;
      }
    }

    if (indent % 2 !== 0) {
      return `Line ${idx + 1}: expected 2-space indentation in ${kind.toUpperCase()} (found ${indent} spaces)`;
    }
    if (kind === 'json' && indent > prevIndent + 2) {
      return `Line ${idx + 1}: indentation jumped from ${prevIndent} to ${indent} spaces in JSON`;
    }
    prevIndent = indent;
  }
  return null;
}

function isWritePermission(value) {
  return value === 'write' || value === 'write-all';
}

function checkWorkflowPolicy(relPath, doc) {
  const errors = [];
  if (!doc || typeof doc !== 'object' || Array.isArray(doc)) {
    return [`${relPath}: workflow must parse to a YAML mapping`];
  }

  if (!Object.prototype.hasOwnProperty.call(doc, 'permissions') || doc.permissions === null || doc.permissions === undefined) {
    errors.push(`${relPath}: missing top-level "permissions:"`);
  } else if (typeof doc.permissions === 'string') {
    if (doc.permissions !== 'read-all') {
      errors.push(`${relPath}: top-level permissions "${doc.permissions}" is not allowed`);
    }
  } else if (typeof doc.permissions === 'object' && !Array.isArray(doc.permissions)) {
    for (const [scope, level] of Object.entries(doc.permissions)) {
      if (isWritePermission(level)) {
        errors.push(`${relPath}: top-level permission "${scope}: ${level}" grants write access`);
      }
    }
  } else {
    errors.push(`${relPath}: invalid top-level "permissions:" value`);
  }

  const triggers = doc.on;
  const hasPrTarget =
    triggers === 'pull_request_target' ||
    (Array.isArray(triggers) && triggers.includes('pull_request_target')) ||
    (triggers && typeof triggers === 'object' && Object.prototype.hasOwnProperty.call(triggers, 'pull_request_target'));
  if (hasPrTarget) {
    errors.push(`${relPath}: "pull_request_target" trigger is forbidden`);
  }

  const jobs = doc.jobs;
  if (jobs && typeof jobs === 'object' && !Array.isArray(jobs)) {
    for (const [jobId, job] of Object.entries(jobs)) {
      if (!job || typeof job !== 'object') continue;
      if (typeof job.permissions === 'string' && job.permissions !== 'read-all') {
        errors.push(`${relPath}: job "${jobId}" permissions "${job.permissions}" is not allowed`);
      } else if (job.permissions && typeof job.permissions === 'object') {
        for (const [scope, level] of Object.entries(job.permissions)) {
          if (isWritePermission(level)) {
            errors.push(`${relPath}: job "${jobId}" permission "${scope}: ${level}" grants write access`);
          }
        }
      }
      if (typeof job.uses === 'string' && !job.uses.startsWith('./') && !WORKFLOW_SHA_RE.test(job.uses)) {
        errors.push(`${relPath}: job "${jobId}" uses unpinned workflow "${job.uses}"`);
      }
      if (Array.isArray(job.steps)) {
        for (let idx = 0; idx < job.steps.length; idx++) {
          const step = job.steps[idx];
          if (step && typeof step.uses === 'string' && !step.uses.startsWith('./') && !WORKFLOW_SHA_RE.test(step.uses)) {
            errors.push(`${relPath}: job "${jobId}" step ${idx + 1} uses unpinned action "${step.uses}"`);
          }
        }
      }
    }
  }

  return errors;
}

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

function checkPythonAndTomlFiles(root, pyFiles, tomlFiles) {
  if (pyFiles.length === 0 && tomlFiles.length === 0) return [];
  const runner = findPythonRunner(root);
  if (!runner) {
    return ['Python >=3.11 interpreter is required to validate .py and .toml files, but none was found'];
  }

  const pyScript = [
    'import ast, json, pathlib, sys, tokenize, tomllib',
    'payload = json.loads(sys.stdin.read())',
    'errors = []',
    'for rel in payload["py"]:',
    '    p = pathlib.Path(payload["root"]) / rel',
    '    try:',
    '        src = p.read_text(encoding="utf-8")',
    '        ast.parse(src, filename=rel)',
    '        stack = [0]',
    '        with p.open("r", encoding="utf-8") as fh:',
    '            for tok in tokenize.generate_tokens(fh.readline):',
    '                if tok.type == tokenize.INDENT:',
    '                    n = len(tok.string)',
    '                    if n % 4 != 0 or n - stack[-1] != 4:',
    '                        errors.append(f"{rel}:{tok.start[0]}: expected 4-space Python indentation (got {n} from {stack[-1]})")',
    '                    stack.append(n)',
    '                elif tok.type == tokenize.DEDENT:',
    '                    if len(stack) > 1:',
    '                        stack.pop()',
    '    except Exception as exc:',
    '        errors.append(f"{rel}: Python validation failed: {exc}")',
    'for rel in payload["toml"]:',
    '    p = pathlib.Path(payload["root"]) / rel',
    '    try:',
    '        tomllib.loads(p.read_text(encoding="utf-8"))',
    '    except Exception as exc:',
    '        errors.append(f"{rel}: TOML validation failed: {exc}")',
    'print(json.dumps(errors))',
  ].join('\n');

  const res = spawnSync(runner.cmd, [...runner.prefixArgs, '-c', pyScript], {
    cwd: root,
    input: JSON.stringify({ root, py: pyFiles, toml: tomlFiles }),
    encoding: 'utf8',
    windowsHide: true,
    maxBuffer: 10 * 1024 * 1024,
  });

  if (res.error || res.status !== 0) {
    return [`Python/TOML validator subprocess failed: ${res.stderr || res.error?.message || res.status}`];
  }
  try {
    return JSON.parse(res.stdout);
  } catch (err) {
    return [`Python/TOML validator returned invalid output: ${err.message}`];
  }
}

function checkFormatting(options = {}) {
  const root = path.resolve(options.root || DEFAULT_ROOT);
  const isDefaultRoot = root === DEFAULT_ROOT;
  const hasGit = fs.existsSync(path.join(root, '.git'));
  const checkIndexEol = options.checkIndexEol !== undefined ? options.checkIndexEol : hasGit;
  const allowCr = options.allowCr !== undefined ? options.allowCr : (isDefaultRoot ? process.platform === 'win32' : false);
  const files = options.files ? [...options.files].sort() : listRepoFiles(root);
  const indexEol = checkIndexEol ? readIndexEolMap(root) : new Map();

  const errors = [];
  const pyFiles = [];
  const tomlFiles = [];

  for (const relRaw of files) {
    const rel = relRaw.replace(/\\/g, '/');
    const fullPath = path.join(root, rel);
    if (!fs.existsSync(fullPath) || !fs.statSync(fullPath).isFile()) {
      errors.push(`${rel}: file does not exist`);
      continue;
    }

    if (checkIndexEol && indexEol.has(rel)) {
      const eol = indexEol.get(rel);
      if (eol !== 'lf' && eol !== 'none') {
        errors.push(`${rel}: git index EOL must be lf or none (found ${eol})`);
      }
    }

    const buf = fs.readFileSync(fullPath);
    if (buf.length >= 3 && buf[0] === 0xef && buf[1] === 0xbb && buf[2] === 0xbf) {
      errors.push(`${rel}: UTF-8 BOM is forbidden`);
      continue;
    }

    let text;
    try {
      text = TEXT_DECODER.decode(buf);
    } catch {
      errors.push(`${rel}: invalid UTF-8 encoding`);
      continue;
    }

    if (!allowCr && text.includes('\r')) {
      errors.push(`${rel}: CRLF / raw CR line ending is forbidden`);
    }

    if (buf.length > 0) {
      if (!text.endsWith('\n')) {
        errors.push(`${rel}: missing trailing newline at EOF`);
      } else if (text.endsWith('\n\n') || text.endsWith('\r\n\r\n')) {
        errors.push(`${rel}: multiple trailing blank lines at EOF`);
      }
    }

    const baseName = path.basename(rel);
    const allowTabs = baseName === 'Makefile' || rel.endsWith('.mk');
    const lines = text.split(/\r?\n/);
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (/[ \t]+$/.test(line)) {
        errors.push(`${rel}:${i + 1}: trailing whitespace`);
      }
      if (!allowTabs && line.includes('\t')) {
        errors.push(`${rel}:${i + 1}: tab character is forbidden`);
      }
      if (/^(?:<{7}|={7}|>{7})(?:\s|$)/.test(line)) {
        errors.push(`${rel}:${i + 1}: merge conflict marker found`);
      }
    }

    const ext = path.extname(rel).toLowerCase();
    if (ext === '.json') {
      try {
        checkJsonNoDuplicateKeys(text);
        JSON.parse(text);
        if (text.includes('\n')) {
          const indentErr = checkTwoSpaceIndent(text, 'json');
          if (indentErr) errors.push(`${rel}: ${indentErr}`);
        }
      } catch (err) {
        errors.push(`${rel}: invalid JSON: ${err.message}`);
      }
    } else if (ext === '.yaml' || ext === '.yml') {
      try {
        const doc = parseYaml(text, { uniqueKeys: true });
        const trimmed = text.trimStart();
        if (trimmed && !trimmed.startsWith('{') && !trimmed.startsWith('[')) {
          const indentErr = checkTwoSpaceIndent(text, 'yaml');
          if (indentErr) errors.push(`${rel}: ${indentErr}`);
        }
        if (/^\.github\/workflows\/[^/]+\.ya?ml$/i.test(rel)) {
          errors.push(...checkWorkflowPolicy(rel, doc));
        }
      } catch (err) {
        errors.push(`${rel}: invalid YAML: ${err.message}`);
      }
    } else if (ext === '.js') {
      const check = spawnSync(process.execPath, ['--check', fullPath], {
        cwd: root,
        encoding: 'utf8',
        windowsHide: true,
      });
      if (check.error || check.status !== 0) {
        errors.push(`${rel}: JavaScript syntax error: ${(check.stderr || check.error?.message || '').trim()}`);
      }
    } else if (ext === '.py') {
      pyFiles.push(rel);
    } else if (ext === '.toml') {
      tomlFiles.push(rel);
    }
  }

  errors.push(...checkPythonAndTomlFiles(root, pyFiles, tomlFiles));

  return {
    ok: errors.length === 0,
    checkedCount: files.length,
    errors,
  };
}

function parseArgs(argv) {
  const options = {};
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === '--root') {
      const value = argv[++i];
      if (!value) throw new Error('Missing value for --root');
      options.root = path.resolve(value);
    } else if (arg === '--no-index-eol') {
      options.checkIndexEol = false;
    } else if (arg === '--allow-cr') {
      options.allowCr = true;
    } else if (arg === '--no-allow-cr') {
      options.allowCr = false;
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }
  return options;
}

if (require.main === module) {
  try {
    const result = checkFormatting(parseArgs(process.argv.slice(2)));
    if (!result.ok) {
      for (const err of result.errors) console.error(`ERROR: ${err}`);
      process.exitCode = 1;
    } else {
      console.log(`Formatting and hygiene checks passed (${result.checkedCount} files).`);
    }
  } catch (err) {
    console.error(err.message);
    process.exitCode = 1;
  }
}

module.exports = { checkFormatting, checkJsonNoDuplicateKeys, checkWorkflowPolicy };
