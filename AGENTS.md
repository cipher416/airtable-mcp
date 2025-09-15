# Repository Guidelines

## Project Structure & Module Organization
- Source lives in `src/`; tools are in `src/tools/` (one file per tool).
- Build output goes to `dist/` (e.g., `dist/http.js`).
- Config: `xmcp.config.ts`, TypeScript config in `tsconfig.json`.
- Environment: `.env` (local), `.env.example` (template). Do not commit secrets.

Example: `src/tools/listBases.ts`, `src/tools/getBaseSchema.ts`, `src/tools/listTableRecords.ts`.

## Build, Test, and Development Commands
- `npm run dev` — Start xMCP dev server (hot reload).
- `npm run build` — Bundle to `dist/` via `xmcp build`.
- `npm start` — Run production HTTP server (`node dist/http.js`).
- `npm run lint` — Type-check with `tsc --noEmit`.

Prereq: Node.js >= 20. Install deps with `npm install`.

## Coding Style & Naming Conventions
- Language: TypeScript (strict mode). Indent 2 spaces.
- Filenames: camelCase for tools (e.g., `listBases.ts`).
- Expose each tool as the default export; also export `metadata` and optional `schema` using `zod`.
- Prefer small, focused modules; avoid side effects. Return JSON strings where current tools do.

## Testing Guidelines
- No formal test suite yet. Validate via:
  - `npm run dev` and exercise endpoints/tools.
  - Type safety: `npm run lint` and pre-commit hook (`npx tsc --noEmit`).
- If adding tests, co-locate as `*.test.ts` near the tool or create `tests/` with clear naming.

## Commit & Pull Request Guidelines
- Use Conventional Commits: `feat: …`, `fix: …`, `chore: …` (matches history).
- PRs should include:
  - Purpose and scope, linked issues.
  - How to run/verify (commands, sample inputs), and any API changes.
  - Update README if adding/removing tools or env vars; add to `.env.example` when new env is required.

## Security & Configuration Tips
- Required env: `AIRTABLE_API_KEY`, `AIRTABLE_API_URL`.
- Never log API keys. Use `.env` locally; keep `.env.example` in sync.
- Network calls use `fetch` with Bearer auth; handle non-OK responses with clear errors.

## Agent-Specific Notes (xMCP)
- Tools are auto-discovered from `src/tools/`.
- Metadata should set `annotations` (`readOnlyHint`, `destructiveHint`, `idempotentHint`).
- Example skeleton:
  ```ts
  export const schema = { /* zod fields */ };
  export const metadata = { name: "toolName", description: "…", annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true } };
  export default async function tool(args: InferSchema<typeof schema>) { /* … */ }
  ```
