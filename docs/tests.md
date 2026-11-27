# Tests

Run `uv sync --locked --all-packages --cache-dir .uv-cache`, then `npm run build` and `npm test`. Native Node tests cover configuration validation, redaction, the API health endpoint, and refusal to listen on invalid configuration. Run each service's documented `--health` and no-argument invocation to check Python scaffolds.

The workspace cache also supplies the isolated offline generation test. If an existing virtual environment was installed using another cache, populate this cache once with `uv sync --locked --all-packages --cache-dir .uv-cache --reinstall`.

These are bootstrap slices of TC-DOC-001 and TC-SEC-002, not complete acceptance coverage. Full traceability is deferred to EP01-04 and CI scans to EP01-03. Source: [requirements document](https://docs.google.com/document/d/1rr4Ih0tonF6wPuXczgwWfhjLqFbL0TSR26J-hCuX8gA), read 2026-11-20; EP01-01, FR-DOC-01 and NFR-SEC-02.

Executed setup checks, the loopback sandbox limitation, scoped acceptance results, review outcome and published-commit verification are recorded in [EP01-01 evidence](test-evidence/EP01-01.md). EP01-01 scoped setup acceptance is complete; full canonical tests are not marked complete.

EP01-02 contract checks: run `npm run contracts:generate` to regenerate types and `npm run check:contracts` to validate the shared fixtures, registry and generation drift. The registry tests use mock callbacks; they do not establish provider integration readiness. See [EP01-02 evidence](test-evidence/EP01-02.md).

EP01-02 acceptance was updated on 2026-11-27 to the [revised specification](https://docs.google.com/document/d/1IBk94Bv_hGgs3iOWsoos_8Xq-nukPHN5osZ7oyIge_4/edit?tab=t.nwrjcdn6ttdu). Its primary test mapping is TC-DOC-001, TC-PLATFORM-005 and TC-CONTRACT-002; NFR-INT-01 governs the cross-language boundary. The earlier passing results remain scoped to the original document.

| Revised verification | Status / ownership |
| --- | --- |
| TC-CONTRACT-002: schema-version agreement and bidirectional serialization/validation round trips; EV-CONTRACT-002. | `tests/contract-parity.test.js`, `tests/contracts/roundtrip.ts` and `roundtrip.py`; verified on `aa74d94` in [EP01-02 evidence](test-evidence/EP01-02.md). |
| TC-PLATFORM-005: six registry roles plus a distinct reviewed tool and argument/result schema, not only empty mock tool lists. | `tests/registry.test.js`, `tests/catalogue.test.js`; mock callbacks establish the extension boundary. |
| TC-API-000: canonical P0 API inventory, DTOs, common errors and release-aware registration rules. | `tests/api-contracts.test.js`, `tests/contracts.test.js`; authorization/redaction and feature integration stay with EP11-05, EP12-01 and mapped API owners. |
| Canonical FinalResponse and rejected model-forged action references; TC-FORMAT-002/003 contract slice. | `tests/response.test.js`; renderer/approval/delivery behavior stays with EP05-05, EP07 and EP08. |
| TC-DOC-001: revised clauses, generated artifacts, tests, runtime owners and commit-backed evidence agree. | [Clause mapping](test-evidence/EP01-02-traceability.md), generation tests and generated consumers; whole-project traceability/CI automation remains EP01-04/03. |

Revised EP01-02 acceptance (AC1–AC8) is verified on `feat/ep01-02-contracts` (`aa74d94`) with 98/98 Node tests, 3/3 Python contract tests (35 shared fixtures), zero generation drift, and all 6 Python service scaffold checks recorded in [EP01-02 evidence](test-evidence/EP01-02.md). Runtime integration assertions for TC-API-000, TC-FORMAT-002/003 and downstream features remain with their mapped owners.

## EP01-03 CI quality, dependency, and secret gates

- `npm run check:format` (`scripts/check-format.js`): verifies UTF-8 without BOM, LF index EOL, single EOF newline, no trailing whitespace/tabs/conflict markers, JSON duplicate-key and 2-space indent checks, YAML unique-key and 2-space indent checks, `node --check` on `.js`, Python AST/4-space indent and TOML parsing, and `.github/workflows/*.yml` least-privilege `permissions:`, no `pull_request_target`, and 40-char commit-SHA action pinning.
- `npm run typecheck`: runs strict TypeScript typechecking across `@notification/api`, `@notification/web`, and `tests/contracts/{typecheck,roundtrip}.ts`.
- `npm run check:secrets` and `node scripts/check-secrets.js --self-test` (`scripts/check-secrets.js`): rejects tracked `.env*` files (except `.env.example`), private keys, provider/platform tokens, credentialed DB URIs, and non-placeholder secret env assignments while ensuring output always redacts matched values (`<REDACTED>`).
- `npm run check:deps` and `node scripts/check-deps.js --self-test` (`scripts/check-deps.js`): verifies lockfiles (`package-lock.json`, `uv.lock`), pinned dependencies, engine/Python version constraints, and fail-closed `npm audit` / `pip-audit` JSON evaluation (`--audit-npm`, `--audit-pip <json-path>`).
- `npm run check:python` (`scripts/check-python.js`): runs locked offline `--health`, no-arg, and `--invalid` CLI checks across `agent-worker`, `a2a-server`, and `local-connector`.
- `node --test tests/ci-gates.test.js`: unit and integration suite covering positive, negative, and boundary behavior for `check-format.js`, `check-secrets.js`, `check-deps.js`, and `check-pr-governance.js`.
- GitHub Actions workflows: [ci.yml](../.github/workflows/ci.yml) (`Format, Typecheck & Build`, `Tests & Contracts`, `Secret & Dependency Gates` including Gitleaks v8.30.1, `npm audit`, and `pip-audit`) and [pr-governance.yml](../.github/workflows/pr-governance.yml) (`PR Branch & Issue Gate` via `scripts/check-pr-governance.js`), paired with the declarative ruleset [main-protection.json](../.github/rulesets/main-protection.json). See [EP01-03 evidence](test-evidence/EP01-03.md).
