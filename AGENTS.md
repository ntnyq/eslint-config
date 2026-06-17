# Agent Guide

This repository publishes an ESLint flat config package. Keep changes small, type-safe, and aligned with existing config patterns.

## Quick Start

- Runtime: Node.js ^22.13.0 or >=24
- Package manager: pnpm (packageManager is pnpm@11.7.0)
- Install: pnpm install
- Main validation loop: pnpm lint && pnpm test && pnpm build

## High-Value Commands

- pnpm dev: Generate types and run tsdown in watch mode
- pnpm build: Generate types and build dist output
- pnpm test: Run vitest suite
- pnpm typecheck: Run tsgo --noEmit
- pnpm types:generate: Regenerate src/types/typegen.d.ts
- pnpm docs:dev: Run VitePress docs locally
- pnpm docs:build: Build VitePress docs

## Project Map

- src/core.ts: Entry point with defineESLintConfig and config composition order
- src/configs/: Individual config modules (one feature per file)
- src/types/config.ts: Public options types
- src/utils/: Option resolution, environment detection, and helper logic
- src/globs.ts: Shared glob constants used across configs
- scripts/generateType.ts: Generates src/types/typegen.d.ts
- tests/index.test.ts: Core behavior tests and mocking patterns
- docs/: VitePress docs; docs/configs contains per-config pages

## Change Rules

- Do not manually edit src/types/typegen.d.ts. Regenerate with pnpm types:generate.
- Keep docs and implementation aligned when changing config behavior.
- Follow existing naming patterns:
  - config functions: configXxx
  - option types: ConfigXxxOptions
  - env checks: hasXxx
- Avoid mutating shared option objects or arrays in place.
- Prefer extending existing helpers in src/utils before introducing new patterns.

## Common Workflows

### Add a new config module

1. Add src/configs/newFeature.ts exporting configNewFeature and ConfigNewFeatureOptions.
2. Export it from src/configs/index.ts.
3. Wire it into src/core.ts with proper option resolution and ordering.
4. Extend public options in src/types/config.ts.
5. Add or update docs page in docs/configs/.
6. Run pnpm types:generate, pnpm lint, pnpm test, pnpm build.

### Update an existing config

1. Update rules and options in the target src/configs file.
2. Preserve override behavior and existing option merge patterns.
3. Update matching docs page under docs/configs/.
4. Run pnpm lint and pnpm test (plus pnpm build if behavior changed broadly).

## Link-First References

- Repository usage and API overview: [README](./README.md)
- Docs entry: [docs/index.md](./docs/index.md)
- Config docs index: [docs/configs/index.md](./docs/configs/index.md)
- User guide: [docs/guide/index.md](./docs/guide/index.md)
- FAQ: [docs/faq.md](./docs/faq.md)
- Commands plugin docs: [src/commands/README.md](./src/commands/README.md)

## Practical Guardrails For Agents

- Prefer minimal diffs over refactors.
- Do not introduce new dependencies unless required.
- Keep optional-plugin behavior consistent with peerDependenciesMeta.
- For docs command examples, always provide a target file path for inspect-config usage.
- If touched files affect published output, ensure dist build still succeeds.
