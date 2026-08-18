# ZGX Demo Display Agent Guide

## Parallel simulation ownership

Simulation builders own exactly one directory under `src/features/simulations/<demo-slug>/`.
Builders may read the whole repository, but must not edit:

- `src/features/simulations/contracts.ts`
- `src/features/simulations/registry.ts`
- `src/features/simulations/shared/**`
- routing, global styles, the central catalog, or another simulation

Only the integration workstream updates the registry or shared contracts. If a builder needs shared functionality, report the requested change in the handoff instead of editing shared files.

## Module requirements

Every simulation module must:

- Export a `SimulationModule` from `index.ts`.
- Use deterministic local mock data only.
- Support initial, processing, success, empty, error, and reset states.
- Work with keyboard navigation and reduced-motion preferences.
- Reuse the shared simulation shell and primitives.
- Include focused tests for its primary workflow and reset behavior.
- Include complete discussion, competitive, and workload-stack configuration.

## Validation

Before handoff, run:

```bash
npm run lint
npx tsc --noEmit
npm test
npm run build
```

## Handoff format

Report:

1. Files changed
2. Customer workflow implemented
3. States and interactions covered
4. Validation results
5. Requested shared changes, or `None`

## Branch naming

Use `codex/demo-<demo-slug>` for simulation branches. Never run multiple active builders in the same physical worktree.
