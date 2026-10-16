# M.E.C Empire Photography

Next.js App Router, React, TypeScript, Prisma and PostgreSQL foundation for the photography website. npm is the package manager; commit `package-lock.json` with dependency changes.

## Current milestone

The visual identity now follows the supplied black-and-gold brochures. Wedding, matric dance 2026, canvas and funeral packages have readable price lists alongside the original posters. Call and WhatsApp links use the supplied business numbers. WhatsApp opens a prefilled enquiry; it does not send a message automatically or reserve a booking. Brochure prices and booking guidance are supplied business content, not an online payment or availability system.

The homepage, filterable photography portfolio, service descriptions, database schema, container configuration and CI pipeline are implemented. Eight unique user-supplied photographs appear in their original proportions with their watermarks intact. Category buttons filter the collection; selecting a photo opens the original in a new tab. Automated booking, availability, admin, quotations and AI assistance remain future features.

Portfolio images live in `public/images/portfolio`; captions, dimensions, categories and alt text live in `src/services/portfolio.ts`. The gallery currently reads this static catalogue, not PostgreSQL. The supplied duplicate print photo is included only once. Images are served through Next.js image optimization; source JPEGs remain unchanged.

## Local development

Requirements: Node.js 22.12 or later, npm, and Docker Compose for the local PostgreSQL database.

```powershell
npm ci
Copy-Item .env.example .env
# Edit .env and replace the local password in both settings.
docker compose up -d db
npm run db:generate
npm run db:deploy
npm run dev
```

Visit http://localhost:3000. The starter page works without PostgreSQL; database-backed features will require it. Use URL-encoded credentials in `DATABASE_URL`. For Compose's interpolated connection string, use a local password consisting of URL-safe characters.

## Checks

```powershell
npm run lint
npm run typecheck
npm test
npm run db:generate
npx prisma validate
npm run build
```

`prisma validate` needs `DATABASE_URL` in `.env` or the environment. Tests render the homepage on the server and check its navigation, services and accurate launch messaging. Browser interaction and future booking behavior need additional tests as those features are built.

## Containers

After creating `.env`, run `docker compose up --build`. PostgreSQL becomes healthy, the one-shot migration container applies checked-in migrations, then the production web container starts at http://localhost:3000. The runtime uses an unprivileged user. `docker compose down` preserves the database volume. Containers are a local development baseline; production hosting is not configured.

## Structure

```text
.github/workflows/  CI and disabled deployment placeholder
public/images/     Photography assets
public/models/     Future 3D assets
src/app/           Pages, metadata and global styles
src/components/    Reusable UI
src/lib/           Shared configuration and utilities
src/services/      Service data and future business logic
src/types/         Shared TypeScript types
prisma/            PostgreSQL schema and committed migrations
tests/             Automated tests
```

The initial `PortfolioImage` model stores image metadata only. Prisma 7 reads its connection URL from `prisma.config.ts` and generates ignored client files into `src/generated/prisma`. A PostgreSQL driver adapter will be needed when implementing database queries. Add new schema changes with `npm run db:migrate -- --name descriptive_name`; review and commit generated SQL. Apply migrations with `npm run db:deploy` in release infrastructure. Never use development migration commands against production.

## GitHub workflow

`main` is the stable branch; `develop` is for integration; major features use `feature/*`. For each completed task, review and test only the relevant changes, make a conventional commit, push, verify the remote SHA, and inspect Actions before merging. Never force-push or commit secrets.

CI installs from the lockfile, generates Prisma, validates and applies migrations to an ephemeral PostgreSQL service, runs lint, TypeScript checks, tests and a production build. Deployment has no push trigger. Its manual placeholder fails explicitly until hosting, protected environments and secrets are configured.

## Next milestone

Dependency audit note (2026-10-16): the development-only `eslint-config-next → @next/eslint-plugin-next → fast-glob → micromatch → braces` chain has five high-severity audit entries originating from an upstream `braces` stack-exhaustion issue. npm's suggested downgrade to Next.js 14 lint configuration is incompatible with this Next.js 16 foundation. Do not use `npm audit fix --force`; recheck upstream releases before expanding the tooling. Prisma and Vitest were upgraded to remove their reported vulnerabilities.

Agree detailed booking rules and admin authentication before introducing automated reservations or public write endpoints. Database-backed portfolio administration can replace the static catalogue when that feature is implemented.
