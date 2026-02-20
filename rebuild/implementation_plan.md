# Alignment Plan: Match Rebuild to Original 5 Phases
# 对齐计划：将重建项目与原始 5 个阶段匹配

## Original Development Order (from directories)
## 原始开发顺序（来自目录）

| Order | Directory | What It Adds |
|-------|-----------|-------------|
| 1 | `nodebase2` | Base Next.js 15 + Tailwind CSS v4 + biome |
| 2 | `nodebase2 2` / `nodebase2 4` | + Prisma + shadcn/ui (all components) + react-hook-form + zod + sonner |
| 3 | `nodebase2 5` | + tRPC v11 + Better-Auth + auth pages + login/signup + server-only |
| 4 | `nodebase2 3` | + Inngest + mprocs + `dev:all` script |

---

## Phase 1: `nodebase2` → Base Project ✅ (Already Done)
Our rebuild matches this. No changes needed.

---

## Phase 2: `nodebase2 2` → Prisma + shadcn/ui ✅ (Mostly Done)
**Status**: Rebuild already has Prisma. But uses `@prisma/adapter-pg` (original uses simple `new PrismaClient()`).

### Differences to fix:
- Original `db.ts` uses simple singleton with `import { PrismaClient } from "../generated/prisma"` (Prisma generates to `src/generated/prisma`)
- Original uses `Prisma 6.x`, our rebuild uses `Prisma 7.x` (requires adapter) — **keep our approach** since we're on v7
- shadcn/ui: original installs ALL components; we only have button/input/label — **need more components**

---

## Phase 3: `nodebase2 5` → tRPC v11 + Better-Auth (Needs Major Rework)

### tRPC — Must migrate to v11 API pattern
Original structure:
```
src/trpc/
├── init.ts          ← createTRPCContext, baseProcedure, protectedProcedure, createCallerFactory
├── client.tsx       ← TRPCReactProvider, useTRPC (via createTRPCContext from @trpc/tanstack-react-query)
├── server.tsx       ← createTRPCOptionsProxy, caller, getQueryClient
├── query-client.ts  ← makeQueryClient()
└── routers/_app.ts  ← flat appRouter with getUsers
```

Our rebuild structure (WRONG):
```
src/server/api/trpc.ts     ← init (uses old API)
src/server/api/root.ts     ← router
src/trpc/client.ts         ← uses createTRPCReact (old)
src/trpc/provider.tsx      ← provider (separate file)
```

**Changes needed**:
1. `src/trpc/init.ts` [NEW] — match original exactly
2. `src/trpc/client.tsx` [REWRITE] — use `createTRPCContext`/`useTRPC` from `@trpc/tanstack-react-query`
3. `src/trpc/server.tsx` [NEW] — `createTRPCOptionsProxy` + `caller`
4. `src/trpc/query-client.ts` [NEW] — shared `makeQueryClient()`
5. `src/trpc/routers/_app.ts` [MOVE+REWRITE] — flat router with `getUsers` using `protectedProcedure`
6. Delete `src/server/` directory
7. Delete `src/trpc/provider.tsx`
8. Install `@trpc/tanstack-react-query`, `server-only`, `client-only`

### Auth — Must match original patterns
1. `src/lib/auth.ts` [MODIFY] — add `autoSignIn: true`
2. `src/lib/auth-client.ts` [MODIFY] — `createAuthClient()` with no args
3. `src/lib/auth-utils.ts` [NEW] — `requireAuth()`, `requireUnauth()`
4. `src/features/auth/components/login-form.tsx` [NEW] — react-hook-form + Card UI
5. `src/features/auth/components/register-form.tsx` [NEW] — with confirmPassword
6. `src/features/auth/components/auth-layout.tsx` [NEW] — centered layout with logo
7. `src/app/(auth)/layout.tsx` [NEW] — wraps AuthLayout
8. `src/app/(auth)/login/page.tsx` [NEW] — uses `requireUnauth`
9. `src/app/(auth)/signup/page.tsx` [NEW]
10. `src/app/logout.tsx` [NEW] — LogoutButton component
11. `src/app/page.tsx` [REWRITE] — protected server component with `requireAuth`, `caller.getUsers()`
12. `src/app/client.tsx` [NEW] — client component example
13. `src/app/layout.tsx` [MODIFY] — add `Toaster` from sonner
14. Install `react-hook-form`, `@hookform/resolvers`, `sonner`
15. Install shadcn components: `card`, `form`, `sonner`

### Prisma Schema — Match original
- Account model needs `idToken`, `scope`, `accessTokenExpiresAt`, `refreshTokenExpiresAt` fields
- Workflow model should be `{ id, name }` (not `{ id, userId, status, result }`)

---

## Phase 4: `nodebase2 3` → Inngest + mprocs (Partially Done)
1. `src/inngest/client.tsx` [MODIFY] — change id to "nodebase"
2. `src/inngest/functions.ts` [REWRITE] — single file, `helloWorld` sleeps 3×5s then creates Workflow with name
3. `mprocs.yaml` [MODIFY] — match original
4. `package.json` [MODIFY] — add `"inngest"` and `"dev:all"` scripts

---

## Dependencies to Install
```bash
npm install @trpc/tanstack-react-query server-only client-only react-hook-form @hookform/resolvers sonner
npx shadcn@latest add card form sonner -y
```

## Verification Plan
1. `/login` and `/signup` pages render with Card UI
2. Sign up → auto redirect to `/`
3. Home page shows user data from `caller.getUsers()`
4. Inngest hello-world event creates Workflow in DB
