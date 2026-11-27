const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const {schemas,validateResponse}=require('../packages/shared-config');
const fixtures=require('../packages/contracts/fixtures/manifest.json');
test('shared fixtures validate against canonical schemas',()=>{for(const f of fixtures) assert.equal(schemas[f.schema](f.value),f.valid,f.name);});
test('platform response components constrain valid trusted responses',()=>{const base={text:'hello',status:'SUCCESS',source_refs:[],stale:false,extra_response:[]};const line={supported_response_components:[]};assert.equal(validateResponse(base,line),true);assert.equal(validateResponse({...base,extra_response:[{kind:'TEXT',payload:{text:'hello'}}]},line),false);});
test('OpenAPI references resolve to canonical local definitions',()=>{const root=path.resolve('packages/contracts');const api=JSON.parse(fs.readFileSync(path.join(root,'openapi.json')));assert.equal(api.openapi,'3.1.0');const docs=fs.readdirSync(root).filter(x=>x.endsWith('.schema.json')).map(x=>JSON.parse(fs.readFileSync(path.join(root,x))));const ids=new Map(docs.map(x=>[x.$id,x]));ids.set('https://notification.local/contracts/1.0.0/openapi.json',api);function visit(o){if(!o||typeof o!=='object')return;if(o.$ref){const [id,fragment='']=o.$ref.split('#');let target=ids.get(new URL(id,'https://notification.local/contracts/1.0.0/openapi.json').href);assert.ok(target,o.$ref);for(const part of fragment.split('/').slice(1))target=target?.[part.replace(/~1/g,'/').replace(/~0/g,'~')];assert.ok(target,o.$ref);}Object.values(o).forEach(visit);}visit(api);});
