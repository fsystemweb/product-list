# AGENTS.md

`product-list` is an Angular product catalogue and dashboard that reads data from a GraphQL backend through Apollo. It is derived from the Modernize Angular Free template.

## Commands

- Install: `npm install` (CI uses `npm ci`)
- Dev server: `npm start`
- Build: `npm run build` (the `prebuild` hook runs `node replace-env.js`, which fills placeholders in `src/environments/environment.prod.ts` from env vars)
- Test: `npm test` (Jest); watch mode: `npm run test:watch`
- Lint: `npm run lint` (runs ESLint with `--fix` on `src/**/*.ts`)
- Format: `npm run format` (Prettier)
- GraphQL codegen: `npm run codegen` (regenerates `src/app/graphql/generated.ts` from `schema.graphql` + `src/app/graphql/*.graphql`; `npm run codegen:check` fails if the generated file is stale)

## Conventions

- Stack: Angular 19.2 with NgModules, Angular Material and CDK, Apollo Angular, RxJS 7.8, Sass, TypeScript 5.7, Jest 29 with `jest-preset-angular`, ESLint 9, Prettier 3. Package manager is npm (`package-lock.json`).
- `src/app/features/` has `dashboard` and `products`, each with its own module, routing module, `components`, `pages`, `models` and `resolvers`.
- `src/app/layout/` (header, sidebar, spinner), `src/app/services/`, `src/app/state/`, `src/app/models/`, `src/app/pipe/`; `src/app/vendor/material.module.ts` re-exports Material modules.
- `src/environments/` has `environment.ts` and `environment.prod.ts`; the latter is swapped in for production builds via `angular.json`.
- Config names (see `.env.example`): `GRAPHQL_SERVER_URL`, `GRAPHQL_SERVER_ID`, `GRAPHQL_SERVER_TOKEN`.
- GraphQL operations live in `src/app/graphql/*.graphql`, typed by GraphQL Codegen into `src/app/graphql/generated.ts` (never hand-edit the generated file; ESLint rules are relaxed for it). Raw `gql` definitions in services should be replaced by generated documents.
- When the backend is unreachable (network error), `DemoFallbackLink` (see `src/app/apollo.config.ts`) replays the operation against deterministic demo data from `src/app/graphql/demo-data.ts`. Setting `graphqlMockMode: true` in the environment serves demo data without ever contacting the backend.
- Apollo uses a cache-first policy; real-time accuracy is not required.
- Husky pre-commit runs `lint-staged` (ESLint and Prettier on staged files). CI (`.github/workflows/run-tests.yml`) runs `npm run lint` and `npm run test` on pull requests to `main`.
- `TODO.md` lists planned work (car shopping dropdown, e2e, FAQ chatbot, pagination).

## Boundaries

- Always: run `npm run lint` and `npm test` after changes; add tests for new logic.
- Ask first: adding a dependency, changing the GraphQL queries or models.
- Never: commit secrets or read .env files.
- Never: commit the output of `replace-env.js` (real values written into `environment.prod.ts`).
