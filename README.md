# Notification Project

This repository is a self-hosted foundation. The API health endpoint and web page report scaffold status; they do not imply that integrations are ready.

Requirements: Node.js 24, npm, uv, and Python 3.12 (uv can install it). From the repository root:

Fork the repository using your Git host, then clone your fork and enter the checkout (replace the URL with your fork):

```sh
git clone <your-fork-url>
cd <checkout-directory>
npm ci
uv sync --locked --all-packages --cache-dir .uv-cache
npm run check:env
npm run build
npm test
npm run start:api
```

The tested runtime versions are Node.js 24.22.1, npm 11.19.1, uv 0.9.28 and Python 3.12.12. The lockfiles select NestJS 11.2.11, React 19.3.1, Vite 7.3.8 and TypeScript 5.9.3.

Run the Python scaffold checks from the repository root:

```sh
uv run --locked --package agent-worker python -m agent_worker --health
uv run --locked --package agent-worker python -m agent_worker
uv run --locked --package a2a-server python -m a2a_server --health
uv run --locked --package a2a-server python -m a2a_server
uv run --locked --package local-connector python -m local_connector --health
uv run --locked --package local-connector python -m local_connector
```

The API listens on loopback at http://127.0.0.1:3000/health by default. Run `npm run dev:web` in another terminal for the web scaffold. Copy `.env.example` to `.env` for local settings; root commands load it when present. Never commit credentials. See [self-hosting](docs/self-hosting.md), [platform setup](docs/platform-setup.md), and [tests](docs/tests.md).

Prisma, PostgreSQL, and MongoDB are deferred to EP03; Docker deployment is deferred to EP09. BYOK and tracing are opt-in future work and are not implemented.

Shared contract schemas and generation commands are documented in [contracts](packages/contracts/README.md). Platform and budget configuration is validated at startup; it does not enable integrations.
