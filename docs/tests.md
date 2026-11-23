# Tests

Run `npm run build` then `npm test`. Native Node tests cover configuration validation, redaction, the API health endpoint, and refusal to listen on invalid configuration. Run `uv sync` and each service's documented `--health` and no-argument invocation to check Python scaffolds.

These are bootstrap slices of TC-DOC-001 and TC-SEC-002, not complete acceptance coverage. Full traceability is deferred to EP01-04 and CI scans to EP01-03. Source: [requirements document](https://docs.google.com/document/d/1rr4Ih0tonF6wPuXczgwWfhjLqFbL0TSR26J-hCuX8gA), read 2026-11-20; EP01-01, FR-DOC-01 and NFR-SEC-02.

Executed setup checks, the loopback sandbox limitation, scoped acceptance results and review outcome are recorded in [EP01-01 evidence](test-evidence/EP01-01.md). The issue remains in review pending commit-backed publication; full canonical tests are not marked complete.
