const {test}=require('node:test'); const assert=require('node:assert/strict'); const fs=require('node:fs'); const os=require('node:os'); const path=require('node:path'); const {loadContractCatalogue}=require('../packages/shared-config/catalogue');
test('catalogue accepts reviewed local additions and rejects untrusted identities and references',()=>{
 const dir=fs.mkdtempSync(path.join(os.tmpdir(),'catalogue-test-'));try{
 const schema={$schema:'http://json-schema.org/draft-07/schema#',$id:'https://notification.local/contracts/1.0.0/example.schema.json',title:'Example',type:'object',properties:{}};
 const file=path.join(dir,'example.schema.json'); const save=()=>fs.writeFileSync(file,JSON.stringify(schema));save();assert.ok(loadContractCatalogue(dir).schemasByName.example);
 schema.$id='https://notification.local/contracts/2.0.0/example.schema.json';save();assert.throws(()=>loadContractCatalogue(dir));schema.$id='https://notification.local/contracts/1.0.0/example.schema.json';schema.$ref='./example.schema.json#/properties';save();assert.ok(loadContractCatalogue(dir).schemasByName.example);schema.$ref='https://example.invalid/schema';save();assert.throws(()=>loadContractCatalogue(dir));
 }finally{fs.rmSync(dir,{recursive:true,force:true});}
});
