const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const { compareArtifacts, files: list } = require('../scripts/contracts');
const root = path.resolve(__dirname, '..');
const script = path.join(root, 'scripts/contracts.js');
function run(...args) { return spawnSync(process.execPath, [script, ...args], { cwd: root, encoding: 'utf8', timeout: 1200000 }); }
function success(result) { assert.ifError(result.error); assert.equal(result.status, 0, result.stdout + result.stderr); }
function drift(result) { assert.ifError(result.error); assert.equal(result.status, 1, result.stdout + result.stderr); assert.match(result.stderr, /Generated contracts differ/); }
test('generation is deterministic and drift checks the complete artifact set', { timeout: 3600000 }, () => {
  const temp = fs.mkdtempSync(path.join(os.tmpdir(), 'generation-test-'));
  try {
    const a = path.join(temp, 'a'), b = path.join(temp, 'b');
    success(run('generate', '--output-root', a)); success(run('generate', '--output-root', b));
    assert.ok(compareArtifacts(a, b), 'output must be repeatable and independent of output path');
    success(run('check', '--output-root', a));
    const target = path.join(a, list(a)[0]), original = fs.readFileSync(target);
    fs.writeFileSync(target, 'tampered'); assert.equal(compareArtifacts(b, a), false); drift(run('check', '--output-root', a));
    fs.unlinkSync(target); assert.equal(compareArtifacts(b, a), false);
    fs.writeFileSync(target, original); fs.writeFileSync(path.join(a, 'extra'), 'extra'); assert.equal(compareArtifacts(b, a), false);
  } finally { fs.rmSync(temp, { recursive: true, force: true }); }
});
test('generated types compile for a consumer', () => {
  const result = spawnSync(process.execPath, [path.join(root, 'node_modules/typescript/bin/tsc'), '--noEmit', '--strict', 'tests/contracts/typecheck.ts', 'tests/contracts/roundtrip.ts'], { cwd: root, encoding: 'utf8' });
  assert.ifError(result.error); assert.equal(result.status, 0, result.stdout + result.stderr);
});
test('every canonical named definition is exported', () => {
  const dir = path.join(root, 'packages/contracts');
  for (const file of fs.readdirSync(dir).filter(f => f.endsWith('.schema.json'))) {
    const schema = JSON.parse(fs.readFileSync(path.join(dir, file), 'utf8'));
    const types = fs.readFileSync(path.join(root, 'packages/shared-types/generated/typescript', file.replace('.schema.json', '.d.ts')), 'utf8');
    for (const name of Object.keys(schema.definitions || {})) {
      assert.match(types, new RegExp(`export (?:type|interface|enum) ${name}\\b`), `${file}: ${name}`);
    }
  }
});

test('hyphenated catalogue names generate importable types', { timeout: 1200000 }, () => {
  const cache = path.join(root, '.uv-cache');
  const fixture = fs.mkdtempSync(path.join(cache, 'generation-names-'));
  try {
    for (const file of ['scripts/contracts.js', 'packages/shared-config/catalogue.js', 'pyproject.toml', 'uv.lock']) {
      const destination = path.join(fixture, file);
      fs.mkdirSync(path.dirname(destination), { recursive: true });
      fs.copyFileSync(path.join(root, file), destination);
    }
    fs.cpSync(path.join(root, 'packages/contracts'), path.join(fixture, 'packages/contracts'), { recursive: true });
    for (const service of ['agent-worker', 'a2a-server', 'local-connector']) {
      const source = path.join(root, 'services', service), destination = path.join(fixture, 'services', service);
      fs.mkdirSync(destination, { recursive: true });
      for (const file of ['pyproject.toml', 'README.md']) fs.copyFileSync(path.join(source, file), path.join(destination, file));
      fs.cpSync(path.join(source, 'src'), path.join(destination, 'src'), { recursive: true });
    }
    for (const [name, title] of [['tool-v2', 'ToolV2'], ['tool--v2', 'ToolDoubleV2']]) {
      const schema = { $schema: 'http://json-schema.org/draft-07/schema#', $id: `https://notification.local/contracts/1.0.0/${name}.schema.json`, title, type: 'object', properties: { value: { type: 'string' } }, required: ['value'], additionalProperties: false };
      fs.writeFileSync(path.join(fixture, 'packages/contracts', `${name}.schema.json`), JSON.stringify(schema));
    }
    for (const [name, title] of [['tool-v3', undefined], ['tool-v4', 'Example Tool']]) {
      const schema = { $schema: 'http://json-schema.org/draft-07/schema#', $id: `https://notification.local/contracts/1.0.0/${name}.schema.json`, title, definitions: {
        Input: { type: 'object', properties: { value: { type: 'string' } }, required: ['value'], additionalProperties: false },
        Result: { type: 'object', properties: { count: { type: 'integer' } }, required: ['count'], additionalProperties: false },
      } };
      if (title) Object.assign(schema, { type: 'object', properties: { value: { type: 'string' } }, required: ['value'], additionalProperties: false });
      fs.writeFileSync(path.join(fixture, 'packages/contracts', `${name}.schema.json`), JSON.stringify(schema));
    }
    fs.writeFileSync(path.join(fixture, 'packages/contracts/tool-v5.schema.json'), JSON.stringify({
      $schema: 'http://json-schema.org/draft-07/schema#',
      $id: 'https://notification.local/contracts/1.0.0/tool-v5.schema.json',
      title: 'EmptyExample', type: 'object', properties: {}, additionalProperties: false,
    }));
    const output = path.join(fixture, 'generated');
    success(spawnSync(process.execPath, [path.join(fixture, 'scripts/contracts.js'), 'generate', '--output-root', output], { cwd: fixture, env: { ...process.env, UV_CACHE_DIR: cache }, encoding: 'utf8', timeout: 1200000 }));
    const { validator } = require(path.join(fixture, 'packages/shared-config/catalogue')).loadContractCatalogue(path.join(fixture, 'packages/contracts'));
    const unrestricted = validator.getSchema('https://notification.local/contracts/1.0.0/tool-v3.schema.json');
    for (const value of [null, 'value', 42, [], {}]) assert.equal(unrestricted(value), true);
    for (const file of ['typescript/tool-v2.d.ts', 'typescript/tool--v2.d.ts', 'python/tool_v2.py', 'python/tool__v2.py']) assert.ok(fs.existsSync(path.join(output, file)), file);
    const consumer = path.join(fixture, 'consumer.ts');
    fs.writeFileSync(consumer, `import type { ToolV2 } from './generated/typescript/tool-v2';
import type { ToolDoubleV2 } from './generated/typescript/tool--v2';
import type { EmptyExample } from './generated/typescript/tool-v5';
import type { Tool_v2, Tool__v2, Tool_v3, Tool_v4, Contract746F6F6C2D7633, Contract746F6F6C2D7634 } from './generated/typescript';
const a: ToolV2 = { value: 'a' }; const b: ToolDoubleV2 = { value: 'b' };
const c: Tool_v2.ToolV2 = a; const d: Tool__v2.ToolDoubleV2 = b;
const e: Contract746F6F6C2D7633 = {}; const f: Contract746F6F6C2D7634 = { value: 'a' };
const input: Tool_v3.Input = { value: 'a' }; const result: Tool_v4.Result = { count: 1 };
const input4: Tool_v4.Input = input; const result3: Tool_v3.Result = result;
// @ts-expect-error required value must be a string
const invalid: Tool_v3.Input = { value: 1 };
const empty: EmptyExample = {};
void [c, d, e, f, input4, result3, invalid, empty];\n`);
    success(spawnSync(process.execPath, [path.join(root, 'node_modules/typescript/bin/tsc'), '--noEmit', '--strict', consumer], { cwd: fixture, encoding: 'utf8', timeout: 120000 }));
    const python = "import sys, typing\nsys.path.insert(0, sys.argv[1])\nfrom python.tool_v2 import ToolV2\nfrom python.tool__v2 import ToolDoubleV2\nfrom python.tool_v3 import Contract746F6F6C2D7633, Input as Input3, Result as Result3\nfrom python.tool_v4 import Contract746F6F6C2D7634, Input as Input4, Result as Result4\nassert ToolV2.__required_keys__ == ToolDoubleV2.__required_keys__ == {'value'}\nassert Contract746F6F6C2D7633 is typing.Any\nassert Contract746F6F6C2D7634.__required_keys__ == {'value'}\nassert Input3.__required_keys__ == Input4.__required_keys__ == {'value'}\nassert Result3.__required_keys__ == Result4.__required_keys__ == {'count'}\n";
    const pythonPath = path.join(root, '.venv', process.platform === 'win32' ? 'Scripts' : 'bin', process.platform === 'win32' ? 'python.exe' : 'python');
    const emptyCheck = "from python.tool_v5 import EmptyExample\nassert EmptyExample.__annotations__ == {}\nassert EmptyExample.__required_keys__ == frozenset()\nfrom agent_worker.contracts import ContractValidator\nvalidator = ContractValidator(sys.argv[2])\nassert all(validator.validate('tool-v3', value) for value in [None, 'value', 42, [], {}])\n";
    success(spawnSync(pythonPath, ['-c', python + emptyCheck, output, path.join(fixture, 'packages/contracts')], { cwd: fixture, encoding: 'utf8', timeout: 120000 }));
  } finally {
    assert.equal(path.dirname(fixture), cache);
    assert.ok(path.basename(fixture).startsWith('generation-names-'));
    fs.rmSync(fixture, { recursive: true, force: true });
  }
});
