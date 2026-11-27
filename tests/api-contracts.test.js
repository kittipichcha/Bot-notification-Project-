const test = require('node:test');
const assert = require('node:assert/strict');
const { validateRouteRegistration } = require('../packages/shared-config/api-contracts');

const route = { id: 'API-001', method: 'GET', path: '/api/v1/auth/me' };
test('registration accepts canonical enabled declarations and rejects aliases and duplicates', () => {
  assert.equal(validateRouteRegistration([route], { release: 'P0' }).valid, true);
  assert.equal(validateRouteRegistration([{ ...route, path: '/auth/me' }], { release: 'P0' }).valid, false);
  assert.equal(validateRouteRegistration([route, route], { release: 'P0' }).valid, false);
  assert.equal(validateRouteRegistration([route], { release: 'unknown' }).valid, false);
});
test('deferred routes remain disabled and lifecycle metadata is conditional', () => {
  const webhook = { id: 'API-029', method: 'POST', path: '/webhooks/discord' };
  for (const release of ['P0', 'P1', 'P2']) assert.equal(validateRouteRegistration([webhook], { release }).valid, false);
  const lifecycle = { id: 'API-023', method: 'GET', path: '/api/v1/platforms/{platform}/triggers', lifecycleOnly: true };
  assert.equal(validateRouteRegistration([lifecycle], { release: 'P0' }).valid, false);
  assert.equal(validateRouteRegistration([lifecycle], { release: 'P0', lifecycleMetadataEnabled: true }).valid, true);
});
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { after } = require('node:test');
const { createApiValidators, validateRequest, validateResponse } = require('../packages/shared-config/api-contracts');
const inventory = require('../packages/contracts/api-catalogue.json').entries;
const openapi = require('../packages/contracts/openapi.json');
const schema = require('../packages/contracts/api.schema.json');
const root = path.resolve(__dirname, '../packages/contracts');
const scratch = fs.mkdtempSync(path.join(os.tmpdir(), 'api-contracts-'));
after(() => fs.rmSync(scratch, { recursive: true, force: true }));
for (const name of fs.readdirSync(root).filter(name => name.endsWith('.schema.json'))) {
  fs.copyFileSync(path.join(root, name), path.join(scratch, name));
}
const closed = (properties, required = Object.keys(properties)) => ({
  type: 'object', properties, required, additionalProperties: false
});
const nameField = { type: 'string', minLength: 1 };
const flagField = { type: 'boolean' };
const revision = { type: 'integer', minimum: 0 };
const confirm = { type: 'boolean', const: true };
const testDefs = {
  NameFields: closed({ display_name: nameField }),
  NameSubmit: closed({ display_name: nameField, revision }),
  StorageFields: closed({ managed_selected: flagField }),
  StorageSubmit: closed({ managed_selected: flagField, revision, confirmation: confirm }),
  ModelNumberParams: closed({ temperature: { type: 'number', minimum: 0, maximum: 1 } }, []),
  ModelOptionParams: closed({ format: { type: 'string', enum: ['text', 'json'] } }, []),
  ToolInput: closed({ label: nameField }),
  ToolOutput: closed({ found: flagField })
};
// These two model entries and form bindings exist only in the test catalogue.
const localApi = structuredClone(schema);
Object.assign(localApi.definitions, testDefs);
fs.writeFileSync(path.join(scratch, 'api.schema.json'), JSON.stringify(localApi));
const api = createApiValidators(scratch);
const first = '16771cce-3632-4524-845a-1837cc18db12';
const second = '26a6410d-b666-44d0-979e-1d419af08450';
const timestamp = '2026-11-27T12:34:56Z';
const ref = name => schema.$id + '#/definitions/' + name;
const forms = {
  [first]: { action: 'SETUP', release: 'P0', fieldsSchemaRef: ref('NameFields'), submitSchemaRef: ref('NameSubmit') },
  [second]: { action: 'STORAGE_CONFIG', release: 'P0', fieldsSchemaRef: ref('StorageFields'), submitSchemaRef: ref('StorageSubmit') }
};
const models = [
  { provider: 'test', model_id: 'numeric', model_catalog_ref: first, release: 'P0', parametersSchemaRef: ref('ModelNumberParams') },
  { provider: 'test', model_id: 'option', model_catalog_ref: second, release: 'P0', parametersSchemaRef: ref('ModelOptionParams') }
];
const context = {
  resolveFormContract: id => forms[id],
  resolveModelContract: selector => models.find(model => Object.entries(selector).every(([key, value]) => model[key] === value)),
  resolveToolContract: (id, version) => id === 'sample' && version === '1' && ({
    tool_id: id, version, input_schema_ref: ref('ToolInput'), result_schema_ref: ref('ToolOutput'), release: 'P0'
  }),
  lifecycleMetadataEnabled: true,
  enabledAccountPlatforms: ['DISCORD'],
  fixedRedirectPaths: ['/continue'],
  oauthRedirectEndpoints: ['https://provider.example/authorize'],
  tool: { tool_id: 'sample', tool_version: '1' }
};
const asId = n => 'API-' + String(n).padStart(3, '0');
const entries = new Map(inventory.map(row => [row.id, row]));
const canon = inventory.filter(e => !e.deferred || e.id === 'API-023');
const fixturePath = row => Object.fromEntries([...row.path.matchAll(/\{(\w+)\}/g)].map(([, key]) =>
  [key, ({ platform: 'DISCORD', action: 'SETUP', ticket: 'opaque-ticket', agentRole: 'SIMPLE' })[key] || first]));
const callback = { code: 'opaque', state: 'state' };
const requestBodies = {
  2: {}, 5: { name: 'แจ้งเตือน', revision: 1 }, 19: { enabled: false, export_mode: 'OFF', revision: 2 },
  20: { request_ref: first, step_id: 'step', tool_id: 'sample', tool_version: '1', arguments: { label: '日本語' }, idempotency_key: 'key', lease_ref: 'lease' },
  32: { session_ref: first, message: 'สวัสดี', client_event_ref: 'event' }, 34: {}, 35: {}, 36: {}, 37: {}, 38: {},
  39: { decision: 'APPROVE' }, 40: { tool_id: 'sample', resource_ref: 'scope', operation_set: ['READ'], audience: 'PRIVATE', expires_at: timestamp, revision: 0 },
  42: {}, 43: { session_ref: first, resource_ref: 'scope', allowed_read_operations: ['READ'], audience: 'PRIVATE', expires_at: timestamp },
  46: { mode: 'normal' }, 47: { operation: 'GRANT', grantee_ref: second, expected_revision: 0 }, 48: { managed_selected: true },
  49: { managed_selected: true, revision: 0 }, 51: { provider: 'test', model_id: 'numeric', parameters: { temperature: 0.5 }, confirm_cost: true },
  52: { model_catalog_ref: second, parameters: { format: 'json' }, revision: 0 }, 53: { requested_scopes: ['read'], form_ref: first },
  56: {}, 57: { target_ref: first, confirmation: true, revision: 0 }, 58: { action: 'SETUP', resource_ref: first }, 60: {},
  62: { display_name: 'new', revision: 1 }, 63: {}, 64: { ticket_ref: first }
};
const model = { provider: 'test', model_name: 'numeric', role: 'SIMPLE', credential_configured: false };
const bot = { bot_id: first, name: '通知', platform: 'DISCORD', status: 'READY', conversation_label: 'Group' };
const health = { status: 'READY', components: [{ name: 'api', status: 'READY' }] };
const storage = { managed_selected: true, app_data: { location: 'HOSTED', status: 'READY' }, checkpoint: { location: 'HOSTED', status: 'READY' } };
const command_sync = { status: 'PENDING', reason_code: null };
const page = items => ({ items, next_cursor: null });
const scope = { platforms: ['DISCORD'], tool_ids: ['sample'], operations: ['READ'], resource_labels: ['sample'], audience: 'PRIVATE', expires_at: null };
const acct = { account_ref: first, platform: 'DISCORD', label: null, status: 'ACTIVE', visible_scopes: [], audience: 'PRIVATE', can_revoke: true };
const request = { request_id: first, status: 'QUEUED', execution_mode: 'normal', trace_id: 'trace' };
const transition = { bot_id: first, status: 'STOPPED', trace_id: 'trace' };
const tracing = { enabled: false, export_mode: 'OFF', key_configured: false, workspace: null, project: null, destination_label: null, retention_notice: null, revision: 0 };
const grant = { grant_id: first, status: 'ACTIVE', revision: 0 };
const modelInfo = { model_catalog_ref: first, provider: 'test', model_id: 'numeric', display_name: 'Test model', capabilities: [] };
const ok = { valid: true, checks: ['managed storage'], warnings: [] };
const outcomes = {
  1: { user_ref: first, display_name: null, platform: 'DISCORD', expires_at: timestamp }, 2: undefined,
  3: page([{ ...bot, can_setup: true, model: null }]),
  4: { bot, revision: 0, models: [model], sessions: [{ session_ref: first, execution_mode: 'normal' }], storage, health,
    requests: { queued: 0, running: 1, waiting_approval: 0 }, approvals: { pending: 0 }, triggers: { enabled: false, release: 'P1', count: null, reason_code: 'FEATURE_DISABLED' },
    connections: { enabled: false, incoming: [], outgoing: [], pending_count: null }, command_sync },
  5: { bot, revision: 1, command_sync }, 6: { agents: [{ role: 'SIMPLE', model, parameters: {}, credential_configured: false, revision: 0 }], supported_modes: ['normal'] },
  7: { platforms: [{ platform: 'DISCORD', label: 'Discord', release: 'P0', enabled: true, setup_available: true, reason_code: null }] },
  8: page([acct]), 9: { platform: 'DISCORD', tools: [{ tool_id: 'sample', version: '1', label: 'Lookup', operation: 'READ', input_schema: testDefs.ToolInput, approval_required: false, sensitive: false, enabled: true }] },
  10: page([{ grant_id: first, tool_id: 'sample', scope, status: 'ACTIVE', expires_at: null, approval_required: false }]),
  11: page([{ approval_id: first, request_ref: null, approval_type: 'TOOL_ACTION', operation_label: 'Lookup', status: 'PENDING', expires_at: timestamp, can_decide: false }]),
  12: { approval_id: first, approval_type: 'TOOL_ACTION', status: 'PENDING', preview: { tool_id: 'sample', version: '1', operation: 'READ', target: 'record', changes: [{ field: 'title', before: null, after: 'masked' }] }, digest: 'digest', expires_at: timestamp, can_decide: false },
  13: page([{ request_id: first, status: 'QUEUED', queue_position: null, execution_mode: 'normal', created_at: timestamp, error_code: null, can_control: true }]),
  14: { ...storage, revision: 0 }, 15: { job_id: first, status: 'PENDING', completed_classes: [], pending_classes: ['messages'], error_code: null, updated_at: timestamp },
  16: { status: 'UP' }, 17: { status: 'READY' }, 18: tracing, 19: tracing, 20: { status: 'SUCCEEDED', result: { found: true }, retryable: false, trace_id: 'trace' },
  23: { platform: 'DISCORD', triggers: [{ event_type: 'help', label: 'Help', config_schema: closed({}), enabled: true, default_system: true, requires_approval: false }] },
  32: request, 33: { ...request, queue_position: null, error_code: null, can_control: true }, 34: request, 35: request, 36: request, 37: transition, 38: transition,
  39: { approval_id: first, approval_type: 'TOOL_ACTION', status: 'APPROVED', trace_id: 'trace' }, 40: grant, 41: { ...grant, scope }, 42: undefined,
  43: { consent_id: first, status: 'ACTIVE' }, 44: health, 45: { current_mode: 'normal' }, 46: { current_mode: 'normal' }, 47: grant, 48: ok, 49: { ...storage, revision: 1 },
  50: { models: [modelInfo], supported_params: { [first]: testDefs.ModelNumberParams.properties }, tool_constraints: { [first]: [] } },
  51: ok, 52: { ...model, revision: 1 }, 53: { authorization_url: 'https://provider.example/authorize?state=x' }, 54: undefined, 55: acct, 56: undefined,
  57: { job_id: first, status: 'PENDING' }, 58: { ticket_ref: first, private_delivery_ref: 'delivery', expires_at: timestamp }, 59: undefined, 60: { form_session_ref: second, expires_at: timestamp },
  61: { action: 'SETUP', fields: testDefs.NameFields, expires_at: timestamp, revision: 1 }, 62: { status: 'COMPLETED', revision: 2 }, 63: undefined, 64: undefined, 65: undefined
};
const error = { code: 'DENIED', message: 'Request denied.', field_errors: [], trace_id: 'trace', retryable: false };

test('all 80 source rows have unique identity, routes, operations and ownership', () => {
  assert.equal(inventory.length, 80);
  assert.equal(new Set(inventory.map(e => e.method + ' ' + e.path)).size, 80);
  assert.equal(new Set(inventory.map(e => e.operationId)).size, 80);
  inventory.forEach((e,index) => {
    assert.equal(e.id, asId(index+1));
    assert.match(e.requirements, /(?:N?FR)-/);
    assert.match(e.tests, /TC-/);
    assert.match(e.runtime_owner, /EP/);
    assert.ok(e.feature_gate && e.authorization);
  });
  assert.equal(canon.length, 55);
  assert.deepEqual(Object.keys(outcomes).map(Number), canon.map(e => Number(e.id.slice(-3))));
});

test('OpenAPI resolves every operation, parameter, request, success and error reference locally', () => {
  function visit(value) {
    if (!value || typeof value !== 'object') return;
    if (value.$ref) {
      const [file, fragment] = value.$ref.split('#');
      assert.ok(file === '' || file === './api.schema.json', value.$ref);
      let node = file ? schema : openapi;
      for (const part of fragment.slice(1).split('/')) {
        assert.ok(Object.hasOwn(node, part), value.$ref);
        node = node[part];
      }
    }
    Object.values(value).forEach(visit);
  }
  visit(openapi);
  for (const row of canon) {
    const op = openapi.paths[row.path][row.method.toLowerCase()];
    assert.equal(op.operationId, row.operationId);
    assert.ok(op['x-path-schema'] && op['x-query-schema']);
    assert.ok(op.responses['422'].$ref);
    assert.equal(!!op.requestBody, row.method !== 'GET');
  }
});

for (const row of canon) test(row.id + ' validates its canonical input, success and flat error', () => {
  const n = Number(row.id.slice(-3));
  const path = fixturePath(row);
  const query = [54,65].includes(n) ? callback : {};
  const input = { path, query, body: requestBodies[n] };
  assert.deepEqual(api.validateRequest(row.id, input, 'P0', context), { valid: true, errors: [] });
  assert.equal(api.validateRequest(row.id, { ...input, query: { ...query, unexpected: 'x' } }, 'P0', context).valid, false);
  const success = [32,34,35,36,57].includes(n) ? 202 : [40,43,58,60].includes(n) ? 201 :
    [2,42,56,63].includes(n) ? 204 : [54,59,64,65].includes(n) ? 303 : 200;
  const ctx = { ...context, path };
  if (success === 303) ctx.headers = { Location: n === 64 ? 'https://provider.example/authorize?state=s' : '/continue', 'Cache-Control': 'no-store', 'Referrer-Policy': 'no-referrer', 'Set-Cookie': 'opaque' };
  assert.deepEqual(api.validateResponse(row.id, success, outcomes[n], 'P0', ctx), { valid: true, errors: [] });
  assert.equal(api.validateResponse(row.id, success, { ...outcomes[n], unknown: true }, 'P0', ctx).valid, false);
  assert.equal(api.validateResponse(row.id, 403, error, 'P0', ctx).valid, true);
  assert.equal(api.validateResponse(row.id, 403, { error }, 'P0', ctx).valid, false);
});
test('closed schema validation rejects malformed and missing data, duplicates and invalid modes', () => {
  const bad = [
    [1, { body: {} }], [1, { path: { botId: first } }], [3, { query: { limit: 50 } }],
    [5, { path: { botId: 'not-a-uuid' }, body: requestBodies[5] }], [5, { path: { botId: first }, body: { name: 'x' } }],
    [5, { path: { botId: first }, body: { name: null, revision: 0 } }], [5, { path: { botId: first }, body: { name: 'x', revision: '0' } }],
    [46, { path: { sessionId: first }, body: { mode: 'SIMPLE' } }], [65, { query: [['code','x'], ['code','y'], ['state','s']] }],
    [65, { query: { code: 'x', error: 'denied', state: 's' } }], [65, { query: { state: 's' } }],
    [59, { path: { action: 'SETUP', ticket: 'secret' }, query: { ticket: 'secret' } }]
  ];
  for (const [n,input] of bad) assert.equal(validateRequest(asId(n), input, 'P0').valid, false, asId(n));
  for (const query of [new URLSearchParams('error=denied&state=s'), { code: 'opaque', state: 's', iss: 'issuer' }]) {
    assert.equal(validateRequest(asId(65), { query }, 'P0').valid, true);
  }
  assert.equal(validateRequest(asId(46), { path: { sessionId: first }, body: { mode: 'langgraph' } }, 'P0').errors[0].code, 'FEATURE_DISABLED');
  assert.equal(validateRequest(asId(1), {}, 'P9').valid, false);
  assert.equal(validateResponse(asId(1), 200, { ...outcomes[1], expires_at: 'Thursday' }, 'P0').valid, false);
  assert.equal(validateResponse(asId(1), 201, outcomes[1], 'P0').valid, false);
  assert.equal(validateResponse(asId(2), 204, null, 'P0').valid, false);
  assert.equal(validateResponse(asId(17), 503, { status: 'NOT_READY' }, 'P0').valid, true);
  assert.equal(validateResponse(asId(17), 503, error, 'P0').valid, false);
});

test('deferred contracts and provider-specific selectors cannot activate P0', () => {
  for (const row of inventory.filter(e => e.deferred)) {
    assert.equal(validateRequest(row.id, { path: fixturePath(row) }, 'P0').valid, false);
  }
  for (const id of [29,30,31]) assert.equal(validateRequest(asId(id), {}, 'P1').valid, false);
  assert.equal(validateRequest(asId(52), { path: { botId: first, agentRole: 'REVIEWER' }, body: requestBodies[52] }, 'P0', context).valid, false);
  assert.equal(validateRequest(asId(9), { path: { platform: 'GMAIL' } }, 'P0').valid, false);
  assert.equal(validateRequest(asId(53), { path: { platform: 'DISCORD' }, body: requestBodies[53] }, 'P0').valid, false);
  const watch = { ...outcomes[23], triggers: [{ ...outcomes[23].triggers[0], event_type: 'personal_watch' }] };
  assert.equal(validateResponse(asId(23), 200, watch, 'P0', context).valid, false);
  assert.equal(validateResponse(asId(23), 200, { ...watch, triggers: [{ ...watch.triggers[0], default_system: false }] }, 'P0', context).valid, false);
});

test('collection cursors stay in their declared transport and query filters are bounded', () => {
  assert.equal(validateRequest(asId(3), { headers: { 'X-Page-Cursor': 'opaque' } }, 'P0').valid, true);
  assert.equal(validateRequest(asId(3), { headers: [['X-Page-Cursor', 'x'], ['x-page-cursor', 'y']] }, 'P0').valid, false);
  const input = { path: { requestId: first }, query: new URLSearchParams('limit=100&cursor=x') };
  assert.equal(validateRequest(asId(28), input, 'P1').valid, true);
  for (const limit of [0,101,1.5,'1e1',null]) assert.equal(validateRequest(asId(28), { ...input, query: { limit } }, 'P1').valid, false);
  assert.equal(validateRequest(asId(28), { ...input, headers: { 'x-page-cursor': 'x' } }, 'P1').valid, false);
  const logs = { path: { botId: first }, query: { level: 'DEBUG', start_at: timestamp, end_at: timestamp } };
  assert.equal(validateRequest(asId(27), logs, 'P1').valid, false);
  assert.equal(validateRequest(asId(27), logs, 'P1', { logFilters: { level: ['DEBUG'] }, maxLogWindowMs: 1000 }).valid, true);
});

test('form fields and submissions bind to the exact local action-specific contract', () => {
  const submit = (formId, body, ctx=context) => api.validateRequest(asId(62), { path: { formId }, body }, 'P0', ctx);
  const storage = { managed_selected: true, revision: 1, confirmation: true };
  assert.equal(submit(second, storage).valid, true);
  for (const [formId,body] of [[first,storage],[second,requestBodies[62]],[first,{ display_name: 'x' }],
    [first,{ ...requestBodies[62], confirmation: true }],[second,{ managed_selected: true, revision: 1 }],
    [second,{ ...storage, confirmation: false }],[first,{ revision: 1, values: { display_name: 'x' } }],
    [first,{ ...requestBodies[62], action: 'SETUP' }]]) assert.equal(submit(formId,body).valid, false);
  for (const resolveFormContract of [undefined, () => null, () => ({ ...forms[first], action: 'PEOPLE_EDIT' }),
    () => ({ ...forms[first], release: 'P1' }), () => ({ ...forms[first], submitSchemaRef: 'https://example.test/schema' })]) {
    assert.equal(submit(first,requestBodies[62],{ resolveFormContract }).valid, false);
  }
  const output = { action: 'STORAGE_CONFIG', fields: testDefs.StorageFields, revision: 1, expires_at: timestamp };
  const ctx = { ...context, path: { formId: second } };
  assert.equal(api.validateResponse(asId(61),200,output,'P0',ctx).valid, true);
  for (const fields of [testDefs.NameFields, { ...testDefs.StorageFields, $id: 'remote' }, { $ref: 'https://external.example/schema' }]) {
    assert.equal(api.validateResponse(asId(61),200,{ ...output, fields },'P0',ctx).valid, false);
  }
});

test('model parameters and metadata must agree with the selected local model', () => {
  const input = (model_id,parameters,ctx=context) => api.validateRequest(asId(51), { body: { ...requestBodies[51], model_id, parameters, credential: 'test-secret' } }, 'P0', ctx);
  assert.equal(input('option',{ format: 'json' }).valid, true);
  for (const [id,p] of [['numeric',{ format:'json' }],['numeric',{ temperature:'1' }],['numeric',{ temperature:2 }],['option',{ format:'csv' }],['unknown',{}]]) {
    const result = input(id,p);
    assert.equal(result.valid,false);
    assert.equal(JSON.stringify(result).includes('test-secret'),false);
  }
  for (const ctx of [{}, { resolveModelContract: () => ({ ...models[0], release: 'P1' }) },
    { resolveModelContract: () => ({ ...models[0], parametersSchemaRef: 'https://remote.example/schema' }) }]) {
    assert.equal(input('numeric',{},ctx).valid,false);
  }
  const output = { ...outcomes[50], supported_params: { [first]: testDefs.ModelOptionParams.properties } };
  assert.equal(api.validateResponse(asId(50),200,output,'P0',context).valid,false);
  assert.equal(api.validateResponse(asId(52),200,{ ...outcomes[52], credential:'test-secret' },'P0',context).valid,false);
});

test('internal tool arguments and results resolve from trusted versioned declarations', () => {
  const body = requestBodies[20];
  assert.equal(api.validateRequest(asId(20),{ body },'P0').valid,false);
  assert.equal(api.validateRequest(asId(20),{ body:{...body,tool_version:'2'} },'P0',context).valid,false);
  assert.equal(api.validateRequest(asId(20),{ body:{...body,arguments:{actor: first}} },'P0',context).valid,false);
  assert.equal(api.validateResponse(asId(20),200,{ ...outcomes[20], result:{secret:'test-secret'} },'P0',context).valid,false);
});

test('redirects use the reviewed destination and fixed security headers', () => {
  const headers = { Location: '/continue', 'Cache-Control':'no-store', 'Referrer-Policy':'no-referrer', 'Set-Cookie':'opaque' };
  for (const location of ['//external.example','/continue?token=x','/unchecked','https://external.example/']) {
    assert.equal(api.validateResponse(asId(65),303,undefined,'P0',{ ...context,headers:{ ...headers,Location:location } }).valid,false);
  }
  assert.equal(api.validateResponse(asId(65),303,undefined,'P0',{ ...context,headers:{ ...headers,'Referrer-Policy':'origin' } }).valid,false);
  assert.equal(api.validateResponse(asId(64),303,undefined,'P0',context).valid,false);
});
