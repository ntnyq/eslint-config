# Repository Guidelines

## Project Structure & Module Organization

This package publishes `@ntnyq/eslint-config`, an ESLint flat config preset. Core source lives in `src/`: `core.ts` composes configs, `configs/` contains one config module per feature, `eslint/` wraps plugins/parsers/processors, `utils/` holds shared helpers, and `types/` defines public option types. Tests are in `tests/`, scripts in `scripts/`, generated build output in `dist/`, and VitePress documentation in `docs/`.

## Build, Test, and Development Commands

- `pnpm install` installs dependencies with the pinned pnpm version.
- `pnpm dev` regenerates types and runs `tsdown` in watch mode.
- `pnpm build` runs `types:generate` and builds the library.
- `pnpm test` runs the Vitest suite.
- `pnpm lint` runs ESLint with cache.
- `pnpm format:check` verifies formatting with `oxfmt`.
- `pnpm typecheck` runs `tsgo --noEmit`.
- `pnpm release:check` runs the full pre-release validation loop.
- `pnpm docs:dev` starts the docs site locally.

## Coding Style & Naming Conventions

Use TypeScript ESM, two-space indentation, single quotes, and no semicolons, matching existing files. Let `oxfmt` and ESLint enforce style; avoid manual formatting churn. Name config factories `configXxx`, option types `ConfigXxxOptions`, and environment predicates `hasXxx`. Prefer existing helpers in `src/utils/` and keep optional-plugin behavior aligned with `peerDependenciesMeta`.

## Testing Guidelines

Vitest is the test framework. Put tests under `tests/` using `*.test.ts`, group behavior with `describe`, and prefer focused assertions over snapshots. When changing config composition, option resolution, package installation prompts, or generated types, add or update tests and run `pnpm test`. Use `pnpm release:check` before broad or release-facing changes.

## Commit & Pull Request Guidelines

Git history uses Conventional Commits, such as `feat: bump eslint-plugin-unicorn to v70`, `fix: patch eslint-typegen to fix types conflicts`, and `chore: release v7.0.0-beta.8`. Keep commits scoped and imperative. Pull requests should explain the change, link related issues when available, note docs updates, and include validation results such as `pnpm lint`, `pnpm test`, and `pnpm build`.

## Agent-Specific Instructions

For shell commands in this repository, prefix commands with `rtk` as configured in `~/.codex/RTK.md` (for example, `rtk pnpm test`) except `pnpm typecheck` command. Do not manually edit generated type output; run `pnpm types:generate` instead. Keep docs in `docs/configs/` synchronized with config behavior changes.
