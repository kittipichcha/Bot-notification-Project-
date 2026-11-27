# Contracts

The draft-07 JSON Schemas use versioned IDs under `https://notification.local/contracts/1.0.0/`. These identify reviewed local files. The catalogue validates identities, versions and reference closure without fetching remote schemas. `api-catalogue.json` records the canonical API inventory and runtime owners; `openapi.json` describes the contracts. Contract declarations do not register handlers. The existing `/health` scaffold remains separate from future operational health endpoints.

Run `npm run contracts:generate` after schema edits, then `npm run check:contracts` to validate fixtures and confirm generated types have no drift. Run `npm run contracts:check` for the drift check alone. See [test evidence](../../docs/test-evidence/EP01-02.md) for scope and results.

Generation uses pinned `json-schema-to-typescript` and `datamodel-code-generator` tools. The script bundles trusted references, exposes named definitions to the generators and applies compatibility corrections for recursive Python aliases and optional TypeScript index signatures. Canonical schemas stay unchanged. Edit schemas and regenerate; never edit generated declarations manually. Tests compile TypeScript with strict checking, import Python declarations, check root unions and named exports, and validate serialized DTOs in separate Node/Python processes in both directions.

Added schema filenames may contain hyphens. TypeScript file paths retain them; namespace aliases and Python module filenames replace each hyphen with an underscore. Missing or descriptive schema titles receive a deterministic filename-derived root type name in generation input. Schema identities and validation rules remain unchanged.

For a definition-only schema with no root constraints, the TypeScript generator approximates the container root as an object; use its named argument/result definitions as DTOs. Runtime validation retains the unrestricted container semantics. The parity checks exercise canonical DTOs with explicit shapes.

`tool.schema.json` defines reviewed tool metadata and results. The registry resolves argument/result schemas from a developer-owned catalogue, requires registered implementations and checks roles, readiness, feature gates and grants before returning callbacks. Tests add local mock schemas and all six adapter roles; they make no provider calls. Trigger declarations keep approved system handlers separate from personal watches.

`response.schema.json` separates the trusted `FinalResponse` from `ModelResponseProposal`. Backend-created opaque action references belong only in trusted responses. The model proposal rejects executable references. Rendering, reference issuance, approval execution and delivery remain with downstream feature owners.

`policy.schema.json` and `packages/shared-config/policy.yaml` cover model, agent, request, approval, connection and response policies. Disabled features can leave unresolved production settings unset; enabling them requires valid explicit settings. Budget declarations preserve the protected reserve and shared model-call ceiling; they do not implement billing or provider enforcement.

API validators receive form/model schema resolvers only through trusted code context. Client payloads cannot select arbitrary schemas or supply resolver code. Form submissions and model parameters must also validate against the selected reviewed schema. P0 release gates remain enforced even when later-release declarations are present.

The authoritative source and clause-to-artifact/test/runtime-owner mapping are in [EP01-02](../../docs/issues/EP01-02.md) and its evidence. Generated declarations are build artifacts; runtime validators remain authoritative for incoming data.
