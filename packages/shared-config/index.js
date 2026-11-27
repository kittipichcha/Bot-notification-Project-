const fields = ['DISCORD_APPLICATION_ID', 'DISCORD_PUBLIC_KEY', 'DISCORD_BOT_TOKEN', 'DISCORD_CLIENT_SECRET', 'DISCORD_REDIRECT_URI'];
const placeholder = /^(?:your(?:[_ -].*)?|change[_ -]?me|replace(?:[_ -].*)?|placeholder|example|<.*>|\$\{.*\})$/i;
function validate(env = process.env) {
  const errors = [];
  const value = (key, fallback) => env[key] === undefined ? fallback : env[key].trim();
  const check = (key, allowed, fallback) => { const v = value(key, fallback); if (!allowed.includes(v)) errors.push(key); return v; };
  check('APP_MODE', ['managed', 'self_hosted'], 'managed');
  check('NETWORK_POLICY', ['local_only', 'outbound_only'], 'local_only');
  const discord = check('DISCORD_ENABLED', ['true', 'false'], 'false');
  const line = check('LINE_ENABLED', ['false'], 'false');
  const tracing = check('TRACING_ENABLED', ['false'], 'false');
  const host = value('API_HOST', '127.0.0.1');
  if (!['127.0.0.1', 'localhost', '::1'].includes(host)) errors.push('API_HOST');
  const port = value('API_PORT', '3000');
  if (!/^\d+$/.test(port) || Number(port) > 65535) errors.push('API_PORT');
  if (discord === 'true') {
    for (const key of fields) if (!value(key, '') || placeholder.test(value(key, ''))) errors.push(key);
    if (!errors.includes('DISCORD_REDIRECT_URI')) {
      try { const url = new URL(value('DISCORD_REDIRECT_URI', '')); if (url.protocol !== 'https:' && !(url.protocol === 'http:' && ['localhost', '127.0.0.1', '[::1]'].includes(url.hostname))) throw Error(); }
      catch { errors.push('DISCORD_REDIRECT_URI'); }
    }
  }
  return { errors, host, port: Number(port) };
}
module.exports = { validate, ...require('./registry') };
