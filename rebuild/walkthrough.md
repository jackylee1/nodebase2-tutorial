# Walkthrough: Nodebase2 Rebuild / 演练：Nodebase2 重建

## Phase 1: Foundation / 基础架构
**Goal**: Initialize project, configure Tailwind CSS v4, and setup shadcn/ui.
**目标**: 初始化项目，配置 Tailwind CSS v4，并设置 shadcn/ui。

### executed Commands / 执行的命令
```bash
# Project Initialization / 项目初始化
# (Assuming project created via Next.js CLI)
npm install

# Tailwind CSS v4 Configuration / 配置 Tailwind CSS v4
npm install tailwindcss @tailwindcss/postcss postcss
# (Created globals.css with @import "tailwindcss";)

# shadcn/ui Initialization / 初始化 shadcn/ui
# (Created components.json, utils.ts, and configured paths)
npm install class-variance-authority clsx lucide-react tailwind-merge tailwindcss-animate
```

## Phase 2: Database Integration / 数据库集成
**Goal**: Integrate Prisma ORM with PostgreSQL (Neon.tech).
**目标**: 将 Prisma ORM 与 PostgreSQL (Neon.tech) 集成。

### executed Commands / 执行的命令
```bash
# 1. Install Dependencies / 安装依赖
npm install -D prisma
npm install @prisma/client
npm install pg @prisma/adapter-pg
npm install -D @types/pg

# 2. Initialize Prisma / 初始化 Prisma
npx prisma init

# 3. Generate Client / 生成客户端
# (Ran after configuring schema.prisma and prisma.config.ts)
npx prisma generate

# 4. Verify Connection / 验证连接
# (Ran custom verification script)
npx tsx test-db-connection.ts
```

## Verification Results / 验证结果
-   **Database Connection**: `Successfully connected to the database`
-   **Prisma Client**: Generated successfully with `@prisma/adapter-pg`.

## Troubleshooting Summary / 故障排除摘要
(See `development_log.md` for details / 详情请见 `development_log.md`)
1.  **`datasource.url` error**: Moved URL config to `prisma.config.ts`.
2.  **`PrismaClient` constructor error**: Used `adapter` option instead of `datasources`.
3.  **Missing Adapter**: Installed `pg` and `@prisma/adapter-pg`.

## Phase 3: Authentication & API / 认证与 API
**Goal**: Implement secure authentication using Better-Auth and type-safe API communication using tRPC.
**目标**: 使用 Better-Auth 实现安全认证，并使用 tRPC 实现类型安全的 API 通信。

### executed Commands / 执行的命令
```bash
# 1. Install Dependencies / 安装依赖
npm install better-auth
npm install @trpc/server @trpc/client @trpc/react-query @tanstack/react-query zod

# 2. Configure Prisma / 配置 Prisma
# (Added models to schema.prisma)
npx prisma generate

# 3. Create Files / 创建文件
# (Created src/lib/auth.ts, src/server/api/trpc.ts, etc.)
# Manual file creation (see implementation plan)
```

### Files Created / 创建的文件
-   `src/lib/auth.ts` — Better-Auth config (Prisma adapter)
-   `src/lib/auth-client.ts` — Client-side auth hook
-   `src/app/api/auth/[...all]/route.ts` — Auth API route
-   `src/server/api/trpc.ts` — tRPC context & procedures
-   `src/server/api/root.ts` — Root router
-   `src/server/api/routers/auth.ts` — Auth router
-   `src/trpc/client.ts` — React tRPC client
-   `src/trpc/provider.tsx` — TRPCReactProvider
-   `src/app/api/trpc/[trpc]/route.ts` — tRPC API route
-   `src/components/auth-components.tsx` — SignIn/SignUp/SignOut
-   `src/app/auth-test/page.tsx` — Auth test page

### Troubleshooting / 故障排除
1. `fromNodeHeaders` type mismatch → removed, passed `headers` directly.
2. **Missing tRPC packages (500 error)** → `npm install` was cancelled, re-ran.
3. Unused import cleanup in `trpc.ts`.

## Phase 4: Background Workflows (Inngest) / 后台工作流
**Goal**: Integrate Inngest for event-driven background jobs.
**目标**: 集成 Inngest 以支持事件驱动的后台作业。

### Executed Commands / 执行的命令
```bash
# 1. Install Dependencies / 安装依赖
npm install inngest

# 2. Start Dev Server / 启动开发服务器
npx inngest-cli@latest dev --no-discovery -u http://localhost:3000/api/inngest
```

### Files Created / 创建的文件
-   `src/inngest/client.ts` — Inngest client (id: "nodebase2-rebuild")
-   `src/inngest/functions/hello-world.ts` — Test function
-   `src/inngest/functions/index.ts` — Function exports
-   `src/app/api/inngest/route.ts` — Inngest serve endpoint

### Troubleshooting / 故障排除
1. Port 8288 inaccessible → `npx inngest-cli dev` was cancelled. Used `--no-discovery -u` flag.

## Overall Status / 总体状态
-   **Next.js**: ✅ `http://localhost:3000` (HTTP 200)
-   **Inngest**: ✅ `http://localhost:8288`
-   **Database**: ✅ Connected to Neon PostgreSQL
