const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const { spawnSync } = require('node:child_process');
const { compile } = require('json-schema-to-typescript');

const root = path.resolve(__dirname, '..');
const { loadContractCatalogue } = require('../packages/shared-config/catalogue');
const { schemasByName, schemasById: catalog } = loadContractCatalogue(path.join(root, 'packages/contracts'));
const names = Object.keys(schemasByName).sort();
function rootName(name, schema) {
  return /^[A-Z][A-Za-z0-9]*$/.test(schema.title) && !/[0-9][a-z]/.test(schema.title)
    ? schema.title : `Contract${Buffer.from(name, 'utf8').toString('hex').toUpperCase()}`;
}

// Bundle only catalogued references, retaining local JSON pointers for the generators.
function bundle(schema) {
  const result = structuredClone(schema);
  const definitions = {};
  function visit(node, base, isRoot = false) {
    if (!node || typeof node !== 'object') return;
    if (node.$id && !isRoot) throw new Error('Nested schema IDs are not supported');
    if (node.$ref) {
      const ref = new URL(node.$ref, base);
      const id = `${ref.origin}${ref.pathname}`;
      if (!catalog[id]) throw new Error(`Unknown schema reference: ${id}`);
      const target = catalog[id];
      const key = names.find(name => schemasByName[name].$id === id);
      const fragment = decodeURIComponent(ref.hash.slice(1));
      if (fragment && !fragment.startsWith('/')) throw new Error('Unsupported schema fragment');
      let resolved = target;
      for (const part of fragment.slice(1).split('/').filter(Boolean)) {
        resolved = resolved?.[part.replace(/~1/g, '/').replace(/~0/g, '~')];
        if (resolved === undefined) throw new Error('Unknown schema fragment');
      }
      if (id !== schema.$id && !definitions[key]) {
        definitions[key] = structuredClone(target);
        delete definitions[key].$id;
        delete definitions[key].$schema;
        visit(definitions[key], id);
      }
      node.$ref = id === schema.$id ? `#${fragment}` : `#/definitions/__catalog_${key}${fragment}`;
    }
    for (const value of Object.values(node)) visit(value, base);
  }
  visit(result, schema.$id, true);
  result.definitions = { ...result.definitions, ...Object.fromEntries(Object.entries(definitions).map(([k, v]) => [`__catalog_${k}`, v])) };
  delete result.$id;
  return result;
}

async function generate(output) {
  fs.mkdirSync(path.join(output, 'typescript'), { recursive: true });
  fs.mkdirSync(path.join(output, 'python'), { recursive: true });
  for (const name of names) {
    const schema = bundle(schemasByName[name]);
    // Wrapping a root union exposes every named definition to both generators
    // while retaining the original union as its own named definition.
    const generatorSchema = structuredClone(schema);
    generatorSchema.title = rootName(name, schema);
    if (generatorSchema.anyOf || generatorSchema.oneOf) {
      const union = generatorSchema.anyOf ? 'anyOf' : 'oneOf';
      generatorSchema.definitions[generatorSchema.title] = { [union]: generatorSchema[union] };
      delete generatorSchema[union];
      generatorSchema.title = 'GeneratorWrapper';
      generatorSchema.type = 'object';
      generatorSchema.properties = Object.fromEntries(Object.keys(generatorSchema.definitions).map((key, index) => [
        `value${index}`, { $ref: `#/definitions/${key}` },
      ]));
    }
    const ts = await compile(generatorSchema, generatorSchema.title, { bannerComment: '', unreachableDefinitions: true });
    // Optional object properties can be undefined when read in TypeScript.
    const typescript = ts.replace(/\r\n/g, '\n').replace(/(\[k: string\]: [^;\n]+)(;)/g, '$1 | undefined$2');
    fs.writeFileSync(path.join(output, 'typescript', `${name}.d.ts`), typescript);
    const py = spawnSync('uv', ['run', '--locked', '--offline', 'datamodel-codegen', '--input-file-type', 'jsonschema', '--output-model-type', 'typing.TypedDict', '--target-python-version', '3.12', '--disable-timestamp', '--custom-file-header', '# Generated from canonical JSON Schema.', '--class-name', generatorSchema.title], {
      cwd: root, input: JSON.stringify(generatorSchema), encoding: 'utf8', env: { ...process.env, UV_CACHE_DIR: process.env.UV_CACHE_DIR || path.join(root, '.uv-cache') }, windowsHide: true, timeout: 180000,
    });
    if (py.error) throw py.error;
    if (py.status !== 0) throw new Error(py.stderr || `datamodel-codegen exited ${py.status}`);
    // Python evaluates type-alias right-hand sides immediately, including inside
    // generic containers. Quote recursive aliases emitted by the generator.
    const python = py.stdout.replace(/\r\n/g, '\n').replace(/^(\w+) = (.+)$/gm, (line, alias, expression) => {
      const self = new RegExp(`\\b${alias}\\b`, 'g');
      return `${alias} = ${expression.replace(self, `'${alias}'`)}`;
    });
    fs.writeFileSync(path.join(output, 'python', `${name.replace(/-/g, '_')}.py`), python);
  }
  fs.writeFileSync(path.join(output, 'typescript', 'index.d.ts'), names.map(n => `export type * as ${n[0].toUpperCase() + n.slice(1).replace(/-/g, '_')} from './${n}';\nexport type { ${rootName(n, schemasByName[n])} } from './${n}';`).join('\n') + '\n');
  fs.writeFileSync(path.join(output, 'python', '__init__.py'), '');
}
function files(dir, prefix = '') {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
    if (entry.name === '__pycache__' || entry.name.endsWith('.pyc')) return [];
    const relative = path.join(prefix, entry.name);
    return entry.isDirectory() ? files(path.join(dir, entry.name), relative) : [relative];
  }).sort();
}
function compareArtifacts(expectedDir, actualDir) {
  const expected = files(expectedDir), actual = files(actualDir);
  return JSON.stringify(expected) === JSON.stringify(actual) && expected.every(f => fs.readFileSync(path.join(expectedDir, f), 'utf8').replace(/\r\n/g, '\n') === fs.readFileSync(path.join(actualDir, f), 'utf8').replace(/\r\n/g, '\n'));
}
if (require.main === module) (async () => {
  const [action, flag, value] = process.argv.slice(2);
  if (!['generate', 'check'].includes(action) || (flag && (flag !== '--output-root' || !value)) || process.argv.length > 5) throw new Error('Usage: contracts.js generate|check [--output-root DIR]');
  const output = value ? path.resolve(value) : path.join(root, 'packages/shared-types/generated');
  if (action === 'generate') { await generate(output); return; }
  const temp = fs.mkdtempSync(path.join(os.tmpdir(), 'contracts-'));
  try {
    await generate(temp);
    if (!compareArtifacts(temp, output)) throw new Error('Generated contracts differ; run npm run contracts:generate');
  } finally { fs.rmSync(temp, { recursive: true, force: true }); }
})().catch(error => { console.error(error.stack); process.exitCode = 1; });

module.exports = { files, compareArtifacts, bundle };
