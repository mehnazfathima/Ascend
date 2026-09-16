# ASCEND

**Learn. Understand. Build.**

An interactive learning platform that takes you from your first AI concept to
building real-world AI projects — a living knowledge map, not a course.

## Stack

- **Next.js 16** (App Router, Turbopack) + **TypeScript** + **Tailwind CSS v4**
- **shadcn/ui** (Base UI under the hood, not Radix) for primitives
- **Framer Motion** for animation, **React Three Fiber / drei** for the one
  place 3D earns its keep (the landing page's knowledge-map visualization)
- **Prisma 6** + **SQLite** for local dev (zero install — schema is written to
  be Postgres-portable, so production is a one-line datasource swap)
- **NextAuth v5** (Credentials provider, JWT sessions) for auth

## Getting started

```bash
npm install
cp .env.example .env        # fill in AUTH_SECRET (see the comment in .env.example)
npm run db:push             # create the local SQLite database from the schema
npm run db:seed             # seed levels, concepts, skill test, arena, careers, projects
npm run dev
```

Open http://localhost:3000. Sign up for an account, or promote a user to
admin directly in the DB (`role: "ADMIN"` on the `User` row) to access
`/admin`.

## Content model

Nearly everything a student sees — concepts, explanations, arena challenges,
skill test questions, career paths, project templates — is database-driven
(see `prisma/schema.prisma`) and editable from `/admin` without touching
frontend code. The `prisma/seed*.ts` scripts are the reference implementation
of that content and a good template for adding more.

SQLite has no native enum or array-column type, so enum-like fields (role,
status, difficulty, etc.) are plain `String` columns validated against the
TS unions in `src/lib/constants.ts`, and list fields are JSON strings parsed
via helpers in `src/lib/content-types.ts`. This keeps the schema portable —
switching `DATABASE_URL` to a Postgres connection string is the only change
needed to move off SQLite.

## Project structure

```
prisma/               schema + seed scripts
src/app/               routes (App Router)
  (auth)/               login, signup, password reset — shared auth layout
  (app)/                the authenticated product shell (sidebar/topbar)
  admin/                admin panel (role-gated)
  skill-test/, career/  public, unauthenticated funnel pages
src/components/
  ui/                  shadcn primitives
  marketing/           landing page
  layout/               app shell, nav
  concept/, visualizers/  the concept-card system + interactive visualizers
  arena/, roadmap/, skill-test/, projects/, admin/   feature UI
src/lib/
  auth.ts, auth.config.ts   NextAuth (split for edge-safe middleware)
  roadmap-engine.ts          rule-based roadmap generator
  skill-test-engine.ts        scoring/analysis
  actions/, queries/          server actions + data-fetching per feature
```

## Known local-dev tradeoffs

- **SQLite, not Postgres.** Chosen for zero-setup local dev. Swap
  `datasource.provider`/`url` in `prisma/schema.prisma` and `DATABASE_URL`
  to move to Postgres before deploying — no application code depends on
  SQLite-specific behavior.
- **Password reset has no email provider wired up.** In dev, the reset link
  is shown directly on the "check your email" screen instead of being
  emailed. Wire a real provider (e.g. Resend) before shipping.
