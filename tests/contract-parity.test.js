const test = require('node:test');
const assert = require('node:assert/strict');
const path = require('node:path');
const {spawnSync} = require('node:child_process');
const {loadContractCatalogue,schemas} = require('../packages/shared-config');
const root = path.resolve(__dirname,'..');
function child(command,args,input) {
  const result=spawnSync(command,args,{cwd:root,input:JSON.stringify(input),encoding:'utf8',timeout:120000,env:{...process.env,UV_CACHE_DIR:path.join(root,'.uv-cache'),UV_LINK_MODE:'copy',PYTHONIOENCODING:'utf-8'}});
  assert.ifError(result.error); assert.equal(result.status,0,result.stdout+result.stderr); return JSON.parse(result.stdout);
}
function python(input) { return child('uv',['run','--locked','--offline','--no-sync','--package','agent-worker','python','tests/contracts/roundtrip.py'],input); }
function node(input) { return child(process.execPath,[__filename,'--child'],input); }
if (process.argv.includes('--child')) {
  const input=JSON.parse(require('node:fs').readFileSync(0,'utf8'));
  for (const [name,value] of Object.entries(input)) if (!schemas[name](value)) throw Error('Invalid contract: '+name);
  process.stdout.write(JSON.stringify(input));
} else {
  test('canonical inventories agree and both runtimes reject unsupported versions',()=>{
    const cat=loadContractCatalogue(path.join(root,'packages/contracts'));
    assert.deepEqual(python({action:'inventory'}),{version:cat.version,schemas:Object.fromEntries(Object.entries(cat.schemasByName).map(([name,s])=>[name,s.$id]))});
    const sample=python({action:'sample'}); sample.policy.schema_version='2.0.0';
    assert.equal(schemas.policy(sample.policy),false);
    const result=spawnSync('uv',['run','--locked','--offline','--no-sync','--package','agent-worker','python','tests/contracts/roundtrip.py'],{cwd:root,input:JSON.stringify({action:'validate',values:sample}),encoding:'utf8',timeout:120000,env:{...process.env,UV_CACHE_DIR:path.join(root,'.uv-cache'),UV_LINK_MODE:'copy',PYTHONIOENCODING:'utf-8'}});
    assert.ifError(result.error); assert.notEqual(result.status,0); assert.match(result.stderr,/Invalid contract/);
  });
  test('typed Node and Python DTOs survive both serialized round trips',()=>{
    const ts=child(process.execPath,['--experimental-strip-types','tests/contracts/roundtrip.ts'],null);
    assert.deepEqual(node(python({action:'validate',values:node(ts)})),ts);
    const py=python({action:'sample'});
    assert.deepEqual(python({action:'validate',values:node(py)}),py);
  });
}
