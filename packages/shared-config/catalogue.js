const fs = require('node:fs');
const path = require('node:path');
const Ajv = require('ajv');
const addFormats = require('ajv-formats');
const version = '1.0.0';
const base = `https://notification.local/contracts/${version}/`;
function loadContractCatalogue(root) {
  const schemasByName = Object.create(null), schemasById = Object.create(null);
  const files = fs.readdirSync(root).filter(f => f.endsWith('.schema.json')).sort();
  for (const file of files) {
    if (!/^[a-z][a-z0-9-]*\.schema\.json$/.test(file)) throw Error('Invalid catalogue filename');
    const schema = JSON.parse(fs.readFileSync(path.join(root, file), 'utf8'));
    const expected = base + file;
    if (schema.$id !== expected || schemasById[expected] || schema.$schema !== 'http://json-schema.org/draft-07/schema#') throw Error('Invalid catalogue identity');
    schemasByName[file.slice(0, -12)] = schema; schemasById[expected] = schema;
  }
  const walk = (value, rootSchema, atRoot = false) => {
    if (!value || typeof value !== 'object') return;
    if (!atRoot && ('$id' in value || '$schema' in value)) throw Error('Nested schema identity');
    if ('$ref' in value) {
      if (typeof value.$ref !== 'string') throw Error('Invalid schema reference');
      const [target, fragment = ''] = value.$ref.split('#');
      if (value.$ref.split('#').length > 2) throw Error('Invalid schema reference');
      const uri = new URL(target || '', rootSchema.$id).href;
      let node = schemasById[uri];
      const pointer = decodeURIComponent(fragment);
      if (!node || (pointer && !pointer.startsWith('/'))) throw Error('Unknown schema reference');
      for (const part of pointer ? pointer.slice(1).split('/') : []) {
        if (/~(?![01])/.test(part)) throw Error('Invalid JSON pointer');
        const key = part.replace(/~1/g, '/').replace(/~0/g, '~');
        if (Array.isArray(node) && !/^(0|[1-9][0-9]*)$/.test(key)) throw Error('Invalid array index');
        if (!node || typeof node !== 'object' || !Object.hasOwn(node,key)) throw Error('Unknown JSON pointer');
        node = node[key];
      }
    }
    for (const child of Object.values(value)) walk(child,rootSchema);
  };
  const ajv = new Ajv({strict:true}); addFormats(ajv);
  for (const schema of Object.values(schemasById)) { walk(schema,schema,true); if (!ajv.validateSchema(schema)) throw Error('Invalid schema'); ajv.addSchema(schema); }
  for (const schema of Object.values(schemasById)) ajv.getSchema(schema.$id);
  return {version,schemasByName,schemasById,validator:ajv};
}
module.exports = {loadContractCatalogue};
