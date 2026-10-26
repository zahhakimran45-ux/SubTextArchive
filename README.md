# Subtext

> **Understand what happened. Remember what mattered. Find what you thought you had lost.**

Subtext is a private conversation intelligence platform with an integrated
personal memory archive (**Afterthought**) and a unified search experience
(**Recall**). It measures observable facts in conversations and never claims
to infer another person's hidden emotions, loyalty, or intentions from
statistics.

This repository contains the complete, runnable application — not a mockup.

## Capabilities

- **Subtext Analytics** — deterministic statistics from real imported
  messages: activity over time, participant comparison, hour/weekday heatmap,
  message-length distribution, observed response intervals, activity sessions,
  longest gaps, and two-period comparison, each with its calculation
  definition and sample size.
- **WhatsApp text import** — plain-text exports with 12/24-hour timestamps,
  bracketed and dashed headers, multiline messages, system messages, media and
  deleted placeholders, Unicode/emoji, CRLF/BOM handling, ambiguous-date
  warnings, and a review-before-persist preview.
- **Afterthought** — private memories with tags, moods, notes, event dates,
  pin/favorite/archive, explicit memory-to-memory links, and source references
  back to the original message. Works without any imported conversation.
- **Recall** — unified full-text search (FTS5 in local mode, Postgres
  `tsvector` in Supabase mode) with quoted phrases, keyword prefixes,
  participant/tag/type filters, deterministic natural-language date phrases,
  highlighted snippets, and an honest keyword fallback.
- **Privacy-first account model** — scrypt password hashing, random session
  tokens, per-user data isolation, JSON export, granular and account-wide
  deletion, and external AI processing that is off by default.
- **Demo workspace** — clearly labeled fictional conversations and memories,
  loaded through the real parser and import pipeline.

## Architecture

```
src/
  app/                 Next.js App Router (RSC pages, route handlers, server actions)
    (auth)/            login, signup, password reset
    (app)/             protected product shell (sidebar, top nav, mobile nav)
    api/               import parsing and data export endpoints
  components/          UI primitives (Radix), charts, feature components
  lib/                 pure, testable domain logic (no Next/runtime imports)
    whatsapp/          export parser and timestamp normalization
    analytics/         deterministic metrics + evidence-backed summaries
    search/            query parser and safe highlighting
  server/
    auth/              scrypt hashing, cookie sessions
    data/              repository contracts (the provider boundary)
    db/                SQLite connection, schema bootstrap, FTS migrations
    actions/           validated server actions (Zod at every boundary)
    demo/              fictional demo data generator
supabase/              Production PostgreSQL migrations, RLS, storage policies
tests/
  unit/                parser, timestamps, analytics, search, validation
  integration/         persistence, isolation, search, export, deletion
  e2e/                 Playwright workflows A–G (desktop + mobile projects)
```

The data layer sits behind `src/server/data/*`. The implemented **local
provider** uses SQLite (WAL) + FTS5 and cookie sessions so every feature runs
without external credentials. The [`supabase/`](./supabase/README.md) directory
contains production-ready PostgreSQL migrations (RLS, full-text search, storage
policies) and a reference adapter, but the Supabase **runtime** data provider is
not implemented in this build; selecting `DATA_PROVIDER=supabase` is rejected
by the production startup guard rather than silently falling back to SQLite.
See [`docs/DEPLOYMENT.md`](./docs/DEPLOYMENT.md) for the verified deployment
paths and exact environment variables.

## Requirements

- Node.js 20+
- npm 10+
- No external services are required to run the full application locally.

## Quick start

```bash
npm install
cp .env.example .env.local      # optional; sane defaults work without it
npm run dev                     # http://localhost:3000
```

Open the app, create an account, complete onboarding, and either load the
fictional demo workspace or import a WhatsApp `.txt` export.

## Exact command reference

| Command | Purpose |
| --- | --- |
| `npm run dev` | Development server with hot reload |
| `npm run build` | Production build (type checks + lint + static analysis) |
| `npm run start` | Serve the production build |
| `npm run typecheck` | Strict TypeScript check (`tsc --noEmit`) |
| `npm run lint` | ESLint (next/core-web-vitals) |
| `npm test` | Vitest unit + integration suite |
| `npm run test:e2e` | Playwright e2e (first run: `npx playwright install chromium`) |
| `npm run db:seed-demo` | Standalone demo account + session token (dev) |
| `npm run db:reset-local` | Delete the local SQLite database |

## Environment variables

All variables are documented in [`.env.example`](./.env.example) with safe
placeholders. Key ones:

- `DATA_PROVIDER` — only `local` is implemented in this build; `supabase` is
  reserved and rejected at runtime.
- `LOCAL_DATABASE_PATH` — SQLite file location (default `./data/subtext.sqlite`);
  must be set explicitly on serverless platforms such as Vercel.
- `LOCAL_SESSION_SECRET` — **required in production**, 32+ random characters;
  the development default and `.env.example` placeholders are refused.
- `MAX_IMPORT_BYTES`, `MAX_MESSAGES_PER_IMPORT` — import safeguards.
- `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`,
  `SUPABASE_SERVICE_ROLE_KEY` — forward-looking; parsed by config but unused at
  runtime until the Supabase adapter ships.
- `EMBEDDING_PROVIDER` — `off` by default; semantic search stays optional and
  consent-gated. Keyword search always works.

## Testing philosophy

- **Unit tests** pin the parser's tricky behaviors (multiline, ambiguous dates,
  impossible timestamps, Unicode), timezone conversion, response-time/session
  statistics, query parsing, and output escaping.
- **Integration tests** run against an isolated in-memory SQLite database and
  verify transactional imports, FTS results, tenant isolation, the memory-source
  deletion policy, exports, and account cascade.
- **E2E tests** drive the real UI: registration, onboarding, upload + preview +
  import, analytics, saving to Afterthought, Recall, export, deletion, cross-user
  denial, and mobile navigation.

## What Subtext deliberately does not do

- No relationship scores, emotional diagnosis, or claims about hidden intent.
- No social feeds, public profiles, or follower mechanics.
- No data sent to external AI services without explicit configuration and consent.
- No fabricated analytics or sample data presented as real user data.

See [`docs/`](./docs) for architecture definitions, the security model,
deployment instructions, and the honest limitations list.
