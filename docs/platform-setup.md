# Platform setup

Integrations and ingress are not implemented until EP08. Keep DISCORD_ENABLED and LINE_ENABLED false and do not enable handlers. Discord configuration validation can be exercised locally, but it does not connect to Discord.

For each deployment, create your own Discord application in the [Developer Portal](https://discord.com/developers/applications). Record its application ID and public key, create a bot and obtain its bot token, and obtain the OAuth2 client secret. Register your exact redirect URI under OAuth2. Use the OAuth2 URL generator to select the scopes required by your eventual integration (for example, bot and applications.commands for installing commands); select bot permissions only as needed. Never share tokens or client secrets. External OAuth callbacks require HTTPS; HTTP is permitted only on loopback for local development. Configure the registered redirect URI in DISCORD_REDIRECT_URI.

LINE administration and setup, including administrative claims, are disabled in the current release. For future integration, create your own [LINE Official Account](https://developers.line.biz/en/docs/messaging-api/getting-started/) and enable the Messaging API in LINE Official Account Manager to create a channel. Open that channel in the LINE Developers Console to obtain its channel ID, channel secret and channel access token. Keep them private. Webhook ingress and handler registration remain deferred to EP08.

When ingress is implemented, Discord interactions delivered over HTTP require verification of the signature against the raw request body and the application public key; Gateway delivery instead uses an outbound connection. See [Discord interaction delivery](https://github.com/discord/discord-api-docs/blob/main/developers/interactions/overview.mdx).

For future LINE webhooks, register an externally reachable HTTPS webhook URL in the channel settings and verify each request signature using the channel secret and raw request body before processing it. See [LINE webhook signature verification](https://developers.line.biz/en/docs/messaging-api/verify-webhook-signature/). These endpoints are not available in this scaffold.

The versioned platform registry is descriptive and defaults every provider capability to disabled. Configuring an adapter name alone cannot activate it: a trusted code callback, installation readiness, feature enablement and bot grant are also required. The current registry contains no provider implementations. LINE responses are text-only.
