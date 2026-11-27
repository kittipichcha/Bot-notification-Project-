# EP-01 Repository Foundation & Documentation

Sources: [current implementation backlog and traceability](https://docs.google.com/document/d/1IBk94Bv_hGgs3iOWsoos_8Xq-nukPHN5osZ7oyIge_4/edit?tab=t.nwrjcdn6ttdu) and [Configuration Reference](https://docs.google.com/document/d/1IBk94Bv_hGgs3iOWsoos_8Xq-nukPHN5osZ7oyIge_4/edit?tab=t.cggdcqingvu8).

Track the repository foundation in the [Bot Notification project Kanban](https://github.com/users/kittipichcha/projects/3). M1 is proposed for the four P0 foundation issues. Estimates remain unconfirmed.

## BACKLOG

- [EP01-03 / #3: CI gates](https://github.com/kittipichcha/Bot-notification-Project-/issues/3) — P0. Depends on #2, which depends on #1. Configure CI gates for formatting, type checks, unit and integration tests, dependency scans, and secret scans. Verify that a failed required check blocks merge. Requirements: `FR-DOC-01`, `NFR-OPS-02`. Tests: `TC-DOC-001`, `TC-OPS-002`.
- [EP01-04 / #4: Requirements and traceability](https://github.com/kittipichcha/Bot-notification-Project-/issues/4) — P0. Depends on #3, following #1 and #2. Add `docs/requirements.md`, `docs/tests.md`, the test-evidence schema, an ADR template, and a traceability checker. Verify that no requirement or test references are dangling. Requirements: `FR-DOC-01`, `BR-12`. Test: `TC-DOC-001`.
- [EP01-05 / #5: Agent policy and review](https://github.com/kittipichcha/Bot-notification-Project-/issues/5) — P1 Stretch. Depends on #1, #3 and #4. Add root and nested `AGENTS.md`, GitHub issue and PR templates, branch rules, and a review workflow. Verify the workflow with a sample review.


## NEEDS_DISCUSSION

None.

## READY

None.

## IN_PROGRESS

P0 completion requires verified acceptance criteria and commit-linked evidence for #1 through #4. #5 is P1 Stretch and is outside the P0 gate.


- [EP01-02 / #2: Canonical shared contracts](https://github.com/kittipichcha/Bot-notification-Project-/issues/2) — **P0 CORE; changes requested**. Depends on #1. Revised AC1–AC8 cover canonical API/DTO/route contracts, trusted FinalResponse, extensible tool catalogues, Configuration Reference policies, release gates and TC-CONTRACT-002 round-trip parity. Requirements: FR-DOC-01, FR-PLATFORM-04, NFR-INT-01. Primary tests: TC-DOC-001, TC-PLATFORM-005, TC-CONTRACT-002; TC-API-000 contract slice and response schema cases remain scoped to their owners.

  - Historical local tests from 2026-11-24 remain valid for the older foundation scope; the 2026-11-27 revised-source review found open contract gaps. Updated issue/mappings do not implement those fixes or prove revised acceptance. Code work, new tests, fresh review and commit-linked evidence remain pending. P0 runtime handlers, authorization, rendering and billing enforcement stay with their mapped feature issues.

## IN_REVIEW

None.

## BLOCKED

None recorded.

## DONE

- [EP01-01 / #1: Monorepo and fork setup](https://github.com/kittipichcha/Bot-notification-Project-/issues/1) — P0. Published in [ee1316c](https://github.com/kittipichcha/Bot-notification-Project-/commit/ee1316c82cdc99f09463c8b2f050a73d560db226); fresh-clone setup checks pass and independent review has no remaining findings. See [verification evidence](https://github.com/kittipichcha/Bot-notification-Project-/blob/main/docs/test-evidence/EP01-01.md).
