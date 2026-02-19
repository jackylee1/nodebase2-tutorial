# AI Development Notes — Nodebase2 Rebuild
# AI 开发笔记 — Nodebase2 重建

> **Author**: AI Assistant (Antigravity)
> **Project**: Nodebase2 Rebuild
> **Path**: `/Users/anbanglee/Documents/nodebase2-tutorial/rebuild`
> **Created**: 2026-02-19
> **Purpose**: This is a standalone AI-authored document, separate from the project's standard documentation files (`walkthrough.md`, `development_log.md`, `conversation_log.md`, `task.md`). It synthesizes the full project timeline, architecture decisions, error resolutions, user preferences, and lessons learned from all conversations and logs.
> **说明**: 这是一份独立的 AI 编写的文档，与项目的标准文档文件分开。它综合了所有对话和日志中的完整项目时间线、架构决策、错误解决、用户偏好和经验教训。

---

## 1. Project Overview / 项目概述

**Nodebase2 Rebuild** is a fullstack Next.js application built as a tutorial project. The architecture is:

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Framework | Next.js 15 (Turbopack) | App Router, SSR |
| Styling | Tailwind CSS v3 + shadcn/ui | UI Components |
| Database | PostgreSQL (Neon.tech) | Persistent Storage |
| ORM | Prisma 7 + `@prisma/adapter-pg` | Type-safe DB access |
| Auth | Better-Auth | Email/Password auth |
| API | tRPC | Type-safe client-server communication |
| Background Jobs | Inngest | Durable workflows |

---

## 2. Full Timeline / 完整时间线

### Phase 1: Foundation ✅
**What happened**: Project scaffolding.
- Created `src/app`, `src/lib`, `src/components` directories.
- Set up `layout.tsx`, `page.tsx`, `globals.css`.
- Configured Tailwind CSS v4 and shadcn/ui (components.json, utils.ts).
- **No issues encountered.**

### Phase 2: Database Integration (Prisma) ✅
**What happened**: Integrated Prisma ORM with PostgreSQL.

**Key decisions**:
- Used **Neon.tech** for hosted PostgreSQL (user's choice).
- Used **singleton pattern** for PrismaClient in `src/lib/db.ts` (prevents hot-reload connection leaks in Next.js dev mode).

**Errors encountered (5 total)**:
1. `datasource.url` deprecated in Prisma 7 schema → moved to `prisma.config.ts`.
2. `PrismaClient` constructor rejected `datasourceUrl` → Prisma 7 API changed.
3. `PrismaClient` constructor rejected `datasources` → needed driver adapter instead.
4. Verification script failed → missing `import "dotenv/config"`.
5. `DATABASE_URL` was a placeholder → user manually replaced with Neon connection string.

**Resolution path**: Installed `pg` + `@prisma/adapter-pg`. Configured `PrismaPg` adapter in `db.ts`.

**Commands executed**:
```bash
npm install -D prisma
npm install @prisma/client pg @prisma/adapter-pg
npm install -D @types/pg
npx prisma init
npx prisma generate
npx tsx test-db-connection.ts  # Verification → "Successfully connected"
```

### Phase 3: Authentication & API (Better-Auth + tRPC) ✅
**What happened**: Set up authentication and type-safe API layer.

**Files created**:
- `src/lib/auth.ts` — Better-Auth config with Prisma adapter
- `src/lib/auth-client.ts` — Client-side auth hook
- `src/app/api/auth/[...all]/route.ts` — Auth API catch-all route
- `src/server/api/trpc.ts` — tRPC context with auth session
- `src/server/api/root.ts` — Root router
- `src/server/api/routers/auth.ts` — Example auth router
- `src/trpc/client.ts` — React tRPC client
- `src/trpc/provider.tsx` — TRPCReactProvider wrapping layout
- `src/app/api/trpc/[trpc]/route.ts` — tRPC API route
- `src/components/auth-components.tsx` — SignIn/SignUp/SignOut components
- `src/app/auth-test/page.tsx` — Test page for auth flow

**Schema changes**: Added `Session`, `Account`, `Verification` models. Updated `User` model with `emailVerified`, relations, `@@map("user")`.

**Errors encountered (3 total)**:
1. `fromNodeHeaders` type mismatch → Next.js App Router uses Web `Headers`, not Node.js `IncomingHttpHeaders`. Fixed by removing `fromNodeHeaders`, passing `headers` directly.
2. **Critical: 500 error on ALL pages** → `@trpc/react-query` and other tRPC packages were never installed because the `npm install` command was cancelled mid-execution. Fixed by re-running install.
3. Unused `fromNodeHeaders` import left behind → cleaned up.

**Commands executed**:
```bash
npm install better-auth
npm install @trpc/server @trpc/client @trpc/react-query @tanstack/react-query zod
npx prisma generate
```

### Phase 4: Background Workflows (Inngest) ✅
**What happened**: Integrated Inngest for event-driven background jobs.

**Files created**:
- `src/inngest/client.ts` — Inngest client (id: "nodebase2-rebuild")
- `src/inngest/functions/hello-world.ts` — Test function triggered by `test/hello.world`
- `src/inngest/functions/index.ts` — Function exports
- `src/app/api/inngest/route.ts` — Inngest serve endpoint

**Errors encountered (1 total)**:
1. Inngest Dev Server not starting on port 8288 → the `npx inngest-cli dev` command was also cancelled. Fixed by running with explicit flags: `npx inngest-cli@latest dev --no-discovery -u http://localhost:3000/api/inngest`.

**Commands executed**:
```bash
npm install inngest
npx inngest-cli@latest dev --no-discovery -u http://localhost:3000/api/inngest
```

### Database Migration (Post Phase 4) ✅
**What happened**: Applied the full schema to Neon PostgreSQL.

**Commands executed**:
```bash
npx prisma db push
# 🚀 Your database is now in sync with your Prisma schema. Done in 20.24s
```

**Tables created**: `user`, `session`, `account`, `verification`, `Workflow` in `neondb`.

---

## 3. Architecture Map / 架构图

```
src/
├── app/
│   ├── layout.tsx          ← Wrapped with TRPCReactProvider
│   ├── page.tsx            ← Home page
│   ├── globals.css
│   ├── auth-test/page.tsx  ← Auth verification page
│   └── api/
│       ├── auth/[...all]/route.ts  ← Better-Auth handler
│       ├── trpc/[trpc]/route.ts    ← tRPC handler
│       └── inngest/route.ts        ← Inngest handler
├── components/
│   └── auth-components.tsx ← SignIn, SignUp, SignOut
├── inngest/
│   ├── client.ts           ← Inngest client instance
│   └── functions/
│       ├── hello-world.ts  ← Test workflow
│       └── index.ts        ← Function exports
├── lib/
│   ├── auth.ts             ← Better-Auth server config
│   ├── auth-client.ts      ← Better-Auth React client
│   └── db.ts               ← Prisma Client singleton (PrismaPg adapter)
├── server/api/
│   ├── trpc.ts             ← tRPC init, context, procedures
│   ├── root.ts             ← Root router
│   └── routers/auth.ts     ← Auth router (getSession, getSecretMessage)
└── trpc/
    ├── client.ts           ← createTRPCReact<AppRouter>
    └── provider.tsx        ← TRPCReactProvider + QueryClient
```

---

## 4. User Preferences & Working Agreements / 用户偏好和工作约定

Based on our interactions, here are the established working agreements:

1. **Documentation updates are mandatory** — User explicitly asked to never forget updating `walkthrough.md`, `development_log.md`, and `conversation_log.md` after EVERY step.
2. **Bilingual documentation** — All documentation should include both English and Chinese (中英双语).
3. **Step-by-step confirmation** — User prefers to approve each step before proceeding.
4. **Record ALL commands** — Every command executed must be logged in documentation.
5. **Record ALL errors** — Every error and its solution must be documented in `development_log.md`.
6. **Project-local documentation** — All `.md` files must be copied to the project root (not just in the AI brain directory).
7. **Full conversation recording** — User wants the complete dialogue history preserved.

---

## 5. Current State / 当前状态

| Item | Status |
|------|--------|
| Next.js Dev Server | ✅ Running on `http://localhost:3000` (HTTP 200) |
| Inngest Dev Server | ✅ Running on `http://localhost:8288` |
| Database (Neon) | ✅ Connected |
| Auth (Better-Auth) | ✅ Configured (email/password) |
| tRPC | ✅ Configured (server + client) |
| All 4 Phases | ✅ Complete |

---

## 6. Lessons Learned / 经验教训

1. **Prisma 7 breaking changes are significant** — The removal of `datasource.url` from schema and the requirement for driver adapters is a major shift. Always check version-specific docs.
2. **Cancelled `npm install` commands are silent failures** — When the user cancels a command, packages may not be installed even though the code already references them. Always verify `package.json` after installation.
3. **Next.js App Router uses Web Standards** — Use Web `Headers`, not Node.js `IncomingHttpHeaders`. Don't use `fromNodeHeaders` from `better-auth/node`.
4. **Inngest CLI needs explicit URL** — Use `--no-discovery -u http://localhost:3000/api/inngest` for reliable local development.
5. **Documentation must be proactive** — Update docs immediately after every change, don't wait for user reminders.

---

*This document is maintained by the AI assistant and will be updated as the project progresses.*
