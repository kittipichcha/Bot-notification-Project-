# Self-hosting

Install Node.js 24, npm, uv and Python 3.12. Run the root README commands. Use a private copy of `.env.example` as `.env`; all integration and tracing flags default to false. The API binds to loopback only.

Create independent platform applications and identities for each fork and use a fresh database when persistence is implemented. No provider, model, or storage connection exists in this scaffold. Prisma, PostgreSQL, and MongoDB are deferred to EP03; Docker deployment is deferred to EP09. BYOK and tracing are not implemented.
