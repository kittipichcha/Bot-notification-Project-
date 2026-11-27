const path = require('node:path');
const { isDeepStrictEqual } = require('node:util');
const Ajv = require('ajv');
const addFormats = require('ajv-formats');
const { loadContractCatalogue } = require('./catalogue');
const catalogue = require('../contracts/api-catalogue.json');
const openapi = require('../contracts/openapi.json');

const entries = new Map(catalogue.entries.map(entry => [entry.id, entry]));
const releases = ['P0', 'P1', 'P2'];
const platformRelease = { DISCORD: 'P0', GOOGLE_CALENDAR: 'P1', GMAIL: 'P2', LINE: 'P2', GITHUB: 'P2' };
const laterActions = new Set(['BOT_CONNECTION', 'PEOPLE_EDIT', 'TRIGGER_POLICY']);
const systemEvents = new Set(['help', 'setup', 'mention', 'approval', 'removal', 'status']);
const valid = () => ({ valid: true, errors: [] });
const invalid = (code, path) => ({ valid: false, errors: [{ code, path }] });
const record = value => value !== null && typeof value === 'object' &&
  (Object.getPrototypeOf(value) === Object.prototype || Object.getPrototypeOf(value) === null);
const permitted = (minimum, release) => releases.includes(minimum) && releases.indexOf(minimum) <= releases.indexOf(release);

function available(entry, release, context) {
  if (entry.id === 'API-023' && release === 'P0') return context.lifecycleMetadataEnabled === true;
  return permitted(entry.release, release);
}

// A route list is an explicit declaration supplied by the handler owner.
// Checking a declaration never creates a handler or modifies a router.
function validateRouteRegistration(routes, { release, lifecycleMetadataEnabled = false } = {}) {
  if (!releases.includes(release)) return invalid('INVALID_RELEASE', '/release');
  if (!Array.isArray(routes)) return invalid('INVALID_ROUTES', '/routes');
  const errors = [];
  const seen = new Set();
  routes.forEach((route, index) => {
    const path = '/routes/' + index;
    const entry = record(route) && entries.get(route.id);
    if (!entry || route.method !== entry.method || route.path !== entry.path) {
      errors.push({ code: 'UNKNOWN_ROUTE', path });
      return;
    }
    if (seen.has(entry.id)) errors.push({ code: 'DUPLICATE_ROUTE', path });
    seen.add(entry.id);
    if (entry.deferred && !(entry.id === 'API-023' && lifecycleMetadataEnabled && route.lifecycleOnly === true)) {
      errors.push({ code: 'DISABLED_ROUTE', path });
    }
  });
  return { valid: errors.length === 0, errors };
}

function parseFields(input, lowerCase = false) {
  if (input === undefined) return Object.create(null);
  const raw = input instanceof URLSearchParams || Array.isArray(input);
  if (!raw && !record(input)) return null;
  const result = Object.create(null);
  for (const pair of raw ? input : Object.entries(input)) {
    if (!Array.isArray(pair) || pair.length !== 2 || typeof pair[0] !== 'string') return null;
    const key = lowerCase ? pair[0].toLowerCase() : pair[0];
    if (Object.hasOwn(result, key)) return null;
    result[key] = pair[1];
  }
  return result;
}

function featureFields(id, path, body, release, ctx) {
  if (path.platform && !permitted(platformRelease[path.platform], release)) return false;
  if (['API-053', 'API-054'].includes(id) && !ctx.enabledAccountPlatforms?.includes(path.platform)) return false;
  if (release !== 'P0') return true;
  if ((path.agentRole && path.agentRole !== 'SIMPLE') || laterActions.has(path.action)) return false;
  if (!body) return true;
  if (laterActions.has(body.action) || [body.mode, body.current_mode, body.execution_mode].includes('langgraph')) return false;
  if (body.approval_type && body.approval_type !== 'TOOL_ACTION') return false;
  switch (id) {
    case 'API-003': return (body.items || []).every(bot => bot.platform === 'DISCORD' && (!bot.model || bot.model.role === 'SIMPLE'));
    case 'API-004': return body.bot.platform === 'DISCORD' && !body.connections.enabled && !body.connections.incoming.length &&
      !body.connections.outgoing.length && !body.triggers.enabled && body.models.every(model => model.role === 'SIMPLE') &&
      body.sessions.every(session => session.execution_mode === 'normal');
    case 'API-005': return !body.bot || body.bot.platform === 'DISCORD';
    case 'API-006': return body.agents.every(agent => agent.role === 'SIMPLE' && agent.model.role === 'SIMPLE') && body.supported_modes.every(mode => mode === 'normal');
    case 'API-007': return body.platforms.every(p => p.platform === 'DISCORD' || (!p.enabled && !p.setup_available));
    case 'API-008': return body.items.every(account => account.platform === 'DISCORD');
    case 'API-009': return body.platform === 'DISCORD';
    case 'API-011': return body.items.every(item => item.approval_type === 'TOOL_ACTION');
    case 'API-013': return body.items.every(item => item.execution_mode === 'normal');
    case 'API-023': return body.platform === 'DISCORD' && body.triggers.every(item => item.default_system && systemEvents.has(item.event_type));
    case 'API-052': return !body.role || body.role === 'SIMPLE';
    case 'API-055': return body.platform === 'DISCORD';
    default: return true;
  }
}

function createApiValidators(root = path.join(__dirname, '../contracts')) {
  const { schemasById, schemasByName } = loadContractCatalogue(root);
  const ajv = new Ajv({ strict: true, ownProperties: true });
  addFormats(ajv);
  for (const schema of Object.values(schemasById)) ajv.addSchema(schema);
  const api = schemasByName.api;
  const check = (ref, value) => ajv.getSchema(ref.replace('./api.schema.json#', api.$id + '#'))(value);
  const isUuid = ajv.compile({ type: 'string', format: 'uuid' });
  const isReviewed = ajv.getSchema(api.$id + '#/definitions/ReviewedJsonSchema');
  // Resolver callbacks come only from the caller's trusted service context.
  // Look up exact installed definition identities without remote resolution.
  function localDefinition(ref) {
    if (typeof ref !== 'string') return null;
    const parts = ref.split('#/definitions/');
    if (parts.length !== 2 || !/^[A-Za-z][A-Za-z0-9]*$/.test(parts[1])) return null;
    const defs = schemasById[parts[0]]?.definitions;
    if (!defs || !Object.hasOwn(defs, parts[1])) return null;
    return { schema: defs[parts[1]], validate: ajv.getSchema(ref) };
  }

  function boundForm(formId, release, ctx) {
    if (!isUuid(formId)) return null;
    const form = ctx.resolveFormContract?.(formId);
    if (!form || !permitted(form.release, release) || !api.definitions.FormAction.enum.includes(form.action) ||
        (release === 'P0' && laterActions.has(form.action))) return null;
    const fields = localDefinition(form.fieldsSchemaRef), submit = localDefinition(form.submitSchemaRef);
    if (![fields, submit].every(def => def?.schema.type === 'object' && def.schema.additionalProperties === false && isReviewed(def.schema)) ||
        !submit.schema.required?.includes('revision')) return null;
    return { action: form.action, fields, submit };
  }

  function boundModel(selector, release, ctx) {
    const model = ctx.resolveModelContract?.(selector);
    if (!model || !permitted(model.release, release) || !isUuid(model.model_catalog_ref) ||
        typeof model.provider !== 'string' || !model.provider || typeof model.model_id !== 'string' || !model.model_id ||
        Object.keys(selector).some(key => model[key] !== selector[key])) return null;
    const params = localDefinition(model.parametersSchemaRef);
    if (params?.schema.type !== 'object' || params.schema.additionalProperties !== false ||
        !record(params.schema.properties) || !Object.values(params.schema.properties).every(rule =>
          ['boolean', 'integer', 'number', 'string'].includes(rule.type))) return null;
    return { model, params };
  }

  function modelListing(body, release, ctx) {
    const ids = body.models.map(m => m.model_catalog_ref);
    if (new Set(ids).size !== ids.length || ![body.supported_params, body.tool_constraints].every(map =>
      Object.keys(map).length === ids.length && ids.every(id => Object.hasOwn(map, id)))) return false;
    return body.models.every(item => {
      const binding = boundModel({ provider: item.provider, model_id: item.model_id, model_catalog_ref: item.model_catalog_ref }, release, ctx);
      if (!binding || !isDeepStrictEqual(body.supported_params[item.model_catalog_ref], binding.params.schema.properties)) return false;
      return (!binding.model.capabilities || isDeepStrictEqual(item.capabilities, binding.model.capabilities)) &&
        (!binding.model.tool_constraints || isDeepStrictEqual(body.tool_constraints[item.model_catalog_ref], binding.model.tool_constraints));
    });
  }

  function boundPayload(id, path, body, release, ctx, response) {
    if (id === 'API-061' || id === 'API-062') {
      const form = boundForm(path.formId, release, ctx);
      if (!form) return false;
      if (id === 'API-061' && response) return body.action === form.action && isDeepStrictEqual(body.fields, form.fields.schema);
      if (id === 'API-062' && !response) return form.submit.validate(body);
    }
    if (id === 'API-050' && response) return modelListing(body, release, ctx);
    if (['API-051', 'API-052'].includes(id) && !response) {
      const selector = id === 'API-051' ? { provider: body.provider, model_id: body.model_id } : { model_catalog_ref: body.model_catalog_ref };
      return !!boundModel(selector, release, ctx)?.params.validate(body.parameters);
    }
    if (id === 'API-020') {
      const selector = response ? ctx.tool : body;
      const tool = selector && ctx.resolveToolContract?.(selector.tool_id, selector.tool_version);
      if (!tool || tool.tool_id !== selector.tool_id || tool.version !== selector.tool_version || !permitted(tool.release, release)) return false;
      if (!response) return !!localDefinition(tool.input_schema_ref)?.validate(body.arguments);
      return !Object.hasOwn(body, 'result') || !!localDefinition(tool.result_schema_ref)?.validate(body.result);
    }
    return true;
  }

  function queryRules(id, op, query, headers, ctx) {
    const cursor = headers['x-page-cursor'];
    if (cursor !== undefined && (!op['x-page-size'] || typeof cursor !== 'string' || !cursor.length)) return false;
    if (['API-027', 'API-028'].includes(id) && typeof query.limit === 'string' && /^[1-9][0-9]*$/.test(query.limit)) query.limit = Number(query.limit);
    if (!check(op['x-query-schema'].$ref, query)) return false;
    if (id === 'API-027') {
      for (const key of ['level', 'service', 'event_type']) if (query[key] && !ctx.logFilters?.[key]?.includes(query[key])) return false;
      const elapsed = Date.parse(query.end_at) - Date.parse(query.start_at);
      if (query.start_at || query.end_at) return Number.isFinite(elapsed) && elapsed >= 0 && Number.isFinite(ctx.maxLogWindowMs) && elapsed <= ctx.maxLogWindowMs;
    }
    return true;
  }

  function validateRequest(id, input, release, ctx = {}) {
    const entry = entries.get(id);
    if (!releases.includes(release)) return invalid('INVALID_RELEASE', '/release');
    if (!entry) return invalid('UNKNOWN_ROUTE', '/route');
    const op = openapi.paths[entry.path]?.[entry.method.toLowerCase()];
    if (!available(entry, release, ctx) || !op) return invalid('FEATURE_DISABLED', '/route');
    try {
      if (!record(input) || Object.keys(input).some(k => !['path','query','body','headers'].includes(k))) return invalid('INVALID_REQUEST', '/request');
      const path = parseFields(input.path), query = parseFields(input.query), headers = parseFields(input.headers, true);
      if (!path || !check(op['x-path-schema'].$ref, path)) return invalid('INVALID_PATH', '/path');
      if (!query || !headers || !queryRules(id, op, query, headers, ctx)) return invalid('INVALID_QUERY', '/query');
      const body = input.body;
      if (op.requestBody && !(body === undefined && !op.requestBody.required)) {
        if (!check(op.requestBody.content['application/json'].schema.$ref, body)) return invalid('INVALID_BODY', '/body');
      } else if (body !== undefined) return invalid('INVALID_BODY', '/body');
      if (!featureFields(id, path, body, release, ctx)) return invalid('FEATURE_DISABLED', '/request');
      if (id === 'API-019' && ((body.remove_key && (body.enabled || body.api_key !== undefined)) || (body.enabled !== (body.export_mode === 'METADATA_ONLY')))) return invalid('INVALID_BODY', '/body');
      if (!boundPayload(id, path, body, release, ctx, false)) return invalid('INVALID_BINDING', '/request');
      return valid();
    } catch { return invalid('INVALID_REQUEST', '/request'); }
  }

  function validateHeaders(response, status, ctx) {
    // Metadata-only body checks need no HTTP adapter. Redirects must also prove their target.
    if (status !== 303 && ctx.headers === undefined) return true;
    const headers = parseFields(ctx.headers, true);
    if (!headers) return false;
    for (const [key, rule] of Object.entries(response.headers || {})) {
      const value = headers[key.toLowerCase()];
      if (value === undefined && !rule.required) continue;
      if (!ajv.compile(rule.schema)(value)) return false;
    }
    if (status !== 303) return true;
    const location = headers.location;
    if (location.startsWith('/')) return ctx.fixedRedirectPaths?.includes(location) === true;
    const url = new URL(location);
    return !url.username && !url.password && !url.hash && ctx.oauthRedirectEndpoints?.includes(url.origin + url.pathname) === true;
  }

  function validateResponse(id, status, body, release, ctx = {}) {
    const entry = entries.get(id);
    if (!releases.includes(release)) return invalid('INVALID_RELEASE', '/release');
    if (!entry) return invalid('UNKNOWN_ROUTE', '/route');
    const op = openapi.paths[entry.path]?.[entry.method.toLowerCase()];
    if (!available(entry, release, ctx) || !op) return invalid('FEATURE_DISABLED', '/route');
    const response = op.responses[status];
    if (!response || !/^[1-5][0-9]{2}$/.test(String(status))) return invalid('INVALID_STATUS', '/status');
    try {
      const numericStatus = Number(status);
      if (response.$ref) return check('./api.schema.json#/definitions/CanonicalError', body) ? valid() : invalid('INVALID_BODY', '/body');
      const ref = response.content?.['application/json'].schema.$ref;
      if (ref ? !check(ref, body) : body !== undefined) return invalid('INVALID_BODY', '/body');
      if (!validateHeaders(response, numericStatus, ctx)) return invalid('INVALID_HEADERS', '/headers');
      if (numericStatus < 400) {
        const path = ctx.path || {};
        if (!featureFields(id, path, body, release, ctx)) return invalid('FEATURE_DISABLED', '/response');
        if (!boundPayload(id, path, body, release, ctx, true)) return invalid('INVALID_BINDING', '/response');
        if (id === 'API-053' && body) {
          const target = new URL(body.authorization_url);
          if (target.username || target.password || target.hash || !ctx.oauthRedirectEndpoints?.includes(target.origin + target.pathname)) return invalid('INVALID_BINDING', '/response');
        }
      }
      return valid();
    } catch { return invalid('INVALID_RESPONSE', '/response'); }
  }
  return { validateRequest, validateResponse };
}

module.exports = { ...createApiValidators(), createApiValidators, validateRouteRegistration };
