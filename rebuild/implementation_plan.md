# Phase 5: Workflow UI & Full Integration / 工作流 UI 与完整集成

## Goal / 目标
Build a working **Dashboard** where authenticated users can create and monitor workflows. When a user creates a workflow, **Inngest** processes it in the background. The result updates in the database and shows on the dashboard.
构建一个可用的 **仪表板**，让经过身份验证的用户可以创建和监控工作流。当用户创建工作流时，**Inngest** 在后台处理它。结果更新到数据库并显示在仪表板上。

## Proposed Changes / 建议的变更

### 1. Workflow tRPC Router / 工作流 tRPC 路由器
#### [NEW] [src/server/api/routers/workflow.ts](file:///Users/anbanglee/Documents/nodebase2-tutorial/rebuild/src/server/api/routers/workflow.ts)
- `list` — List current user's workflows (protected)
- `create` — Create a new workflow (protected), triggers Inngest event
- `getById` — Get single workflow by ID (protected)

#### [MODIFY] [src/server/api/root.ts](file:///Users/anbanglee/Documents/nodebase2-tutorial/rebuild/src/server/api/root.ts)
- Add `workflow` router to the app router

### 2. Inngest Workflow Function / Inngest 工作流函数
#### [MODIFY] [src/inngest/functions/hello-world.ts](file:///Users/anbanglee/Documents/nodebase2-tutorial/rebuild/src/inngest/functions/hello-world.ts) → rename to `process-workflow.ts`
- Triggered by `workflow/created` event
- Simulates work (sleep 3s), then updates workflow status to `COMPLETED` in database

#### [MODIFY] [src/inngest/functions/index.ts](file:///Users/anbanglee/Documents/nodebase2-tutorial/rebuild/src/inngest/functions/index.ts)
- Export the new function

### 3. Dashboard Page / 仪表板页面
#### [NEW] [src/app/dashboard/page.tsx](file:///Users/anbanglee/Documents/nodebase2-tutorial/rebuild/src/app/dashboard/page.tsx)
- Shows user info (from auth session)
- Lists all workflows with status badges
- "New Workflow" button to create one
- Auto-refreshes to show status updates

### 4. Navigation / 导航
#### [MODIFY] [src/app/page.tsx](file:///Users/anbanglee/Documents/nodebase2-tutorial/rebuild/src/app/page.tsx)
- Add links to `/dashboard` and `/auth-test`

## Verification Plan / 验证计划
1. Login → go to Dashboard → create workflow → see status change from PENDING → COMPLETED
2. Check Inngest Dev Server for the triggered event
