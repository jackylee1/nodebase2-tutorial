# Phase 3: Authentication & API (Better-Auth + tRPC) / 认证与 API

## Goal Description / 目标描述
Implement secure authentication using **Better-Auth** and type-safe API communication using **tRPC**.
使用 **Better-Auth** 实现安全认证，并使用 **tRPC** 实现类型安全的 API 通信。

## User Review Required / 用户审查要求
> [!IMPORTANT]
> We will be adding new tables to the database for authentication. You will need to run `npx prisma migrate dev` or `npx prisma db push` (or `generate` if using Neon branching) to apply changes.
> 我们将为认证添加新的数据库表。你需要运行 `npx prisma migrate dev` 或 `npx prisma db push`（或者如果使用 Neon 分支则运行 `generate`）来应用更改。

## Proposed Changes / 建议的变更

### 1. Dependencies / 依赖项
-   `npm install better-auth @better-auth/cli`
    -   Core authentication library. / 核心认证库。
-   `npm install @trpc/server @trpc/client @trpc/react-query @tanstack/react-query zod`
    -   tRPC and validation libraries. / tRPC 和验证库。

### 2. Database Schema / 数据库架构
#### [MODIFY] [prisma/schema.prisma](file:///Users/anbanglee/Documents/nodebase2-tutorial/rebuild/prisma/schema.prisma)
-   Add Better-Auth required models: `Session`, `Account`, `Verification`.
-   添加 Better-Auth 所需的模型：`Session`, `Account`, `Verification`。
-   Update `User` model with auth fields.
-   更新 `User` 模型，添加认证字段。

### 3. Authentication Configuration / 认证配置
#### [NEW] [src/lib/auth.ts](file:///Users/anbanglee/Documents/nodebase2-tutorial/rebuild/src/lib/auth.ts)
-   Configure Better-Auth with Prisma adapter.
-   使用 Prisma 适配器配置 Better-Auth。
#### [NEW] [src/app/api/auth/[...all]/route.ts](file:///Users/anbanglee/Documents/nodebase2-tutorial/rebuild/src/app/api/auth/[...all]/route.ts)
-   API route handler for auth endpoints.
-   认证端点的 API 路由处理程序。

### 4. tRPC Setup / tRPC 设置
#### [NEW] [src/server/api/trpc.ts](file:///Users/anbanglee/Documents/nodebase2-tutorial/rebuild/src/server/api/trpc.ts)
-   tRPC initialization and context (including auth session).
-   tRPC 初始化和上下文（包括认证会话）。
#### [NEW] [src/server/api/routers/auth.ts](file:///Users/anbanglee/Documents/nodebase2-tutorial/rebuild/src/server/api/routers/auth.ts)
-   Example auth router. / 示例认证路由器。
#### [NEW] [src/server/api/root.ts](file:///Users/anbanglee/Documents/nodebase2-tutorial/rebuild/src/server/api/root.ts)
-   Root router merging all routers. / 合并所有路由器的根路由器。
#### [NEW] [src/trpc/client.ts](file:///Users/anbanglee/Documents/nodebase2-tutorial/rebuild/src/trpc/client.ts)
-   tRPC client configuration. / tRPC 客户端配置。
#### [NEW] [src/trpc/provider.tsx](file:///Users/anbanglee/Documents/nodebase2-tutorial/rebuild/src/trpc/provider.tsx)
-   React Query provider wrapper. / React Query 提供程序包装器。

## Verification Plan / 验证计划
### Automated / 自动
-   Script to emulate a sign-in flow (or check auth status).
-   模拟登录流程（或检查认证状态）的脚本。

### Manual / 手动
-   Visit `/api/auth/providers` to see better-auth is running.
-   访问 `/api/auth/providers` 查看 better-auth 是否在运行。
-   Check database for created tables.
-   检查数据库中是否创建了表。
