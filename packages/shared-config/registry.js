const fs = require('node:fs');
const path = require('node:path');
const Ajv = require('ajv');
const addFormats = require('ajv-formats');
const YAML = require('yaml');
const {loadContractCatalogue} = require('./catalogue');
const root = path.resolve(__dirname, '../contracts');
const catalogue = loadContractCatalogue(root);
const ajv = catalogue.validator;
const schemas = Object.fromEntries(Object.entries(catalogue.schemasByName).map(([name,schema]) => [name,ajv.getSchema(schema.$id)]));
const base = 'https://notification.local/contracts/1.0.0/';
const roles = ['setup','invoke','connection','tool','trigger','response'];
const allowedSystemSlugs = Object.freeze(['help','setup','mention','approval','removal','status']);
const catalog = Object.freeze({discord_gateway:['trigger','connection'],authenticated_react_oauth2:['setup'],a2a_or_local:['invoke'],discord_safe:['tool'],discord_response:['response'],line_webhook:['trigger'],line_safe_text:['response'],composio_oauth:['setup'],composio:['connection','trigger'],gmail_safe:['tool'],calendar_safe:['tool'],github_safe:['tool']});
const releases = Object.freeze({discord:'P0',calendar:'P1',line:'P2',gmail:'P2',github:'P2'});
const read = file => YAML.parse(fs.readFileSync(file,'utf8'), {uniqueKeys:true});
const fail = code => { throw new Error('Invalid configuration: '+code); };
function validateBudget(value) { if (!schemas.budget(value)) fail('budget.schema'); if(value.inference_cap+value.hosting_cap>value.operating_cap || value.operating_cap+value.protected_reserve>value.monthly_cash_cap) fail('budget.limits'); return value; }
function deepFreeze(value) { if (value && typeof value === 'object') { Object.values(value).forEach(deepFreeze); Object.freeze(value); } return value; }
function validateFinalResponse(value) { return !!schemas.response(value); }
function validateModelProposal(value) { return !!ajv.getSchema(base+'response.schema.json#/definitions/ModelResponseProposal')(value); }
function validateResponse(value,spec) { return validateFinalResponse(value) && value.extra_response.every(c => spec.supported_response_components.includes(c.kind)); }
function validatePolicy(value,{modelCatalog={},roleCatalog={},deployment}={}) {
 if (!schemas.policy(value)) fail('policy.schema');
 const {release,trigger,model,agent,request,approval,bot_connection:connection}=value;
 if (trigger.schedule_enabled && (release==='P0' || !trigger.schedule_limits)) fail('policy.schedule');
 if (!agent.enabled_modes.includes(agent.default_mode) || (release==='P0' && agent.enabled_modes.includes('MULTI_AGENT'))) fail('policy.mode');
 for (const [id,role] of Object.entries(agent.role_definitions)) { const approved=Object.hasOwn(roleCatalog,id) && roleCatalog[id]; if (!approved || !agent.enabled_modes.includes(role.graph_mode) || !approved.graph_modes.includes(role.graph_mode) || role.capabilities.some(c=>!approved.capabilities.includes(c))) fail('policy.role'); }
 const pairs=new Set();
 for (const m of model.allowed_models) {
  const key=m.provider+'/'+m.model, approved=Object.hasOwn(modelCatalog,key) && modelCatalog[key]; if(pairs.has(key) || !approved || m.capabilities.some(c=>!approved.capabilities.includes(c))) fail('policy.model'); pairs.add(key);
  for (const [name,rule] of Object.entries(m.parameter_rules)) { const a=approved.parameter_rules[name]; if(!a || rule.type!==a.type || (a.minimum!==undefined && rule.minimum===undefined) || (a.maximum!==undefined && rule.maximum===undefined) || (a.enum && !rule.enum) || (rule.minimum!==undefined && (a.minimum===undefined || rule.minimum<a.minimum)) || (rule.maximum!==undefined && (a.maximum===undefined || rule.maximum>a.maximum)) || (rule.minimum!==undefined && rule.maximum!==undefined && rule.minimum>rule.maximum) || (rule.enum && (!a.enum || rule.enum.some(v=>!a.enum.includes(v))))) fail('policy.parameter'); if((rule.enum && rule.enum.some(v=>!parameterValid(v,{...rule,enum:undefined}) || !parameterValid(v,a))) || ((rule.minimum!==undefined || rule.maximum!==undefined) && !['number','integer'].includes(rule.type))) fail('policy.parameter'); if(rule.default!==undefined && (!parameterValid(rule.default,rule) || !parameterValid(rule.default,a))) fail('policy.parameter'); }
 }
 if(request.execution_enabled && (!request.deadline_ms || !request.retry_policy.backoff_ms || !model.allowed_models.length)) fail('policy.request');
 if(request.deadline_ms && request.retry_policy.backoff_ms * (request.retry_policy.model_retries+request.retry_policy.tool_retries)>request.deadline_ms) fail('policy.retry');
 if(approval.enabled && !approval.action_expiry_ms) fail('policy.approval');
 if(connection.enabled_modes.includes('CROSS_BOT_READ') && (release==='P0' || !connection.cross_bot_policy || !connection.invitation_max_age_ms || !['managed','self_hosted'].includes(deployment?.appMode) || !['local_only','outbound_only'].includes(deployment?.networkPolicy) || (deployment.appMode==='self_hosted' && deployment.networkPolicy==='local_only'))) fail('policy.connection');
 return value;
}
function parameterValid(v,r) { return (r.type==='integer'?Number.isInteger(v):typeof v===r.type) && (r.minimum===undefined || v>=r.minimum) && (r.maximum===undefined || v<=r.maximum) && (!r.enum || r.enum.includes(v)); }
function validateModelParameters(policy,provider,model,parameters) { const m=policy.model.allowed_models.find(x=>x.provider===provider && x.model===model); return !!m && parameters !== null && typeof parameters === 'object' && (Object.getPrototypeOf(parameters) === Object.prototype || Object.getPrototypeOf(parameters) === null) && Object.entries(parameters).every(([k,v])=>m.parameter_rules[k] && parameterValid(v,m.parameter_rules[k])); }
function schemaValidator(ref, validator = ajv) { if (typeof ref!=='string' || !/^https:\/\/notification\.local\/contracts\/1\.0\.0\/[a-z][a-z0-9-]*\.schema\.json#\/definitions\/[A-Za-z][A-Za-z0-9]*$/.test(ref)) return null; try { return validator.getSchema(ref) || null; } catch { return null; } }
class PlatformRegistry {
 static load(configPath,{schemaVersion,adapterCatalog,implementations={},resolveBotContext=()=>null,toolCatalog={},triggerCatalog={},platformReleases={},release='P0',schemaAdditions={}}) {
  let config; try { config=read(configPath); } catch { fail('platform.yaml'); }
  if(!schemas.platform(config) || config.schema_version!==schemaVersion) fail('platform.schema');
  const validator = new Ajv({strict:true}); addFormats(validator);
  for (const [name, original] of Object.entries(catalogue.schemasByName)) {
   const schema=structuredClone(original), additions=schemaAdditions[name] || {};
   for (const [key, definition] of Object.entries(additions)) {
    if (!/^[A-Za-z][A-Za-z0-9]*$/.test(key) || schema.definitions?.[key] || JSON.stringify(definition).match(/"\$(?:id|schema|ref)"/)) fail('tool.schema');
    schema.definitions ||= {}; schema.definitions[key]=structuredClone(definition);
   }
   if (!validator.validateSchema(schema)) fail('tool.schema'); validator.addSchema(schema);
  }
  if (Object.keys(schemaAdditions).some(name=>!catalogue.schemasByName[name])) fail('tool.schema');
  const keys=new Set(), toolIds=new Set();
  for(const p of config.platforms) {
   if(keys.has(p.platform_key)) fail('platform.duplicate'); keys.add(p.platform_key);
   const approvedRelease=releases[p.platform_key] || platformReleases[p.platform_key];
   if(!['P0','P1','P2'].includes(release) || !approvedRelease || p.release!==approvedRelease || (p.enabled && Number(p.release[1])>Number(release[1]))) fail('platform.release');
   const adapters={setup:p.setup_flow.adapter,invoke:p.invoke_adapter,connection:p.connection_adapter,tool:p.tool_registry.adapter,trigger:p.trigger_adapter,response:p.response_adapter};
   for(const role of roles) { const id=adapters[role]; if(id && (!adapterCatalog[id] || !adapterCatalog[id].includes(role))) fail('platform.adapter'); if(p.enabled && p.scheduler_support && release==='P0') fail('platform.schedule'); if(p.enabled && p.capabilities[role] && (!id || typeof implementations[id]?.[role] !== 'function')) fail('platform.implementation'); }
   for(const t of p.tool_registry.tools) { const approved=Object.hasOwn(toolCatalog,t.tool_id) && toolCatalog[t.tool_id]; if(toolIds.has(t.tool_id) || !approved || !require('node:util').isDeepStrictEqual(t,approved) || !adapterCatalog[t.adapter]?.includes('tool') || t.adapter!==p.tool_registry.adapter || (p.enabled && typeof implementations[t.adapter]?.tool !== 'function') || !schemaValidator(t.input_schema_ref,validator) || !schemaValidator(t.result_schema_ref,validator)) fail('tool.catalog'); toolIds.add(t.tool_id); }
   for(const t of p.default_event_policy) { const expected=triggerCatalog[t.event_slug]; if(t.payload_schema_ref!==base+'trigger.schema.json#/definitions/SystemEvent' || t.filter_schema_ref!==base+'trigger.schema.json#/definitions/SystemFilter' || t.source!==p.event_source_type || !allowedSystemSlugs.includes(t.event_slug) || (t.default_on_action && t.default_on_action!==t.event_slug) || !schemaValidator(t.payload_schema_ref,validator) || !schemaValidator(t.filter_schema_ref,validator) || !schemaValidator(t.filter_schema_ref,validator)(t.filters) || (expected && (expected.payload_schema_ref!==t.payload_schema_ref || expected.filter_schema_ref!==t.filter_schema_ref))) fail('trigger.catalog'); }
  }
  const callbacks = Object.fromEntries(Object.entries(implementations).map(([id, entries]) => [id, Object.freeze({...entries})]));
  return new PlatformRegistry(deepFreeze(config.platforms),Object.freeze(callbacks),resolveBotContext,validator);
 }
 constructor(specs,implementations,resolver,validator) { this.specs=specs; this.implementations=implementations; this.resolver=resolver; this.validator=validator; Object.freeze(this); }
 validateToolArguments(toolId,value) { return this.validateToolValue(toolId,'input_schema_ref',value); }
 validateToolResult(toolId,value) { return this.validateToolValue(toolId,'result_schema_ref',value); }
 validateToolValue(id,key,value) { const tool=this.specs.flatMap(p=>p.tool_registry.tools).find(t=>t.tool_id===id); const validate=tool && schemaValidator(tool[key],this.validator); return !!validate && !!validate(value); }
 resolve(key,botRef) { const p=this.specs.find(x=>x.platform_key===key); if(!p || !p.enabled) return {status:'NOT_CONFIGURED'}; const ctx=this.resolver(botRef); if(ctx?.installationReady!==true || ctx?.setupComplete!==true) return {status:'NOT_CONFIGURED'}; const adapters={setup:p.setup_flow.adapter,invoke:p.invoke_adapter,connection:p.connection_adapter,tool:p.tool_registry.adapter,trigger:p.trigger_adapter,response:p.response_adapter}; const hooks={}; for(const role of roles) if(p.capabilities[role] && Array.isArray(ctx.enabledFeatures) && ctx.enabledFeatures.includes(role) && Array.isArray(ctx.botGrants) && ctx.botGrants.includes(role) && typeof this.implementations[adapters[role]]?.[role]==='function') hooks[role]=this.implementations[adapters[role]][role]; return Object.keys(hooks).length ? {status:'READY',hooks} : {status:'NOT_CONFIGURED'}; }
}
function validateFixed(env=process.env) { try { const deployment={appMode:(env.APP_MODE ?? 'managed').trim(),networkPolicy:(env.NETWORK_POLICY ?? 'local_only').trim()}; const policy=validatePolicy(read(path.join(__dirname,'policy.yaml')),{deployment}); PlatformRegistry.load(path.join(__dirname,'platforms.yaml'),{schemaVersion:'1.0.0',adapterCatalog:catalog,release:policy.release}); validateBudget(read(path.join(__dirname,'budgets.yaml'))); return []; } catch(e) { return [String(e.message).startsWith('Invalid configuration: ') ? e.message.slice(23) : 'fixed.config']; } }
module.exports={PlatformRegistry,catalog,schemas,loadContractCatalogue,validateBudget,validatePolicy,validateModelParameters,validateFinalResponse,validateModelProposal,validateResponse,validateFixed};
