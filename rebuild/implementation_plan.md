# Phase 4: Background Workflows (Inngest) / 后台工作流 (Inngest)

## Goal Description / 目标描述
Integrate **Inngest** to handle durable background workflows and event-driven logic.
集成 **Inngest** 以处理持久的后台工作流和事件驱动的逻辑。

## User Review Required / 用户审查要求
> [!NOTE]
> We will verify the setup using the Inngest Dev Server (`npx inngest-cli@latest dev`).
> 我们将使用 Inngest 开发服务器 (`npx inngest-cli@latest dev`) 验证设置。

## Proposed Changes / 建议的变更

### 1. Dependencies / 依赖项
-   `npm install inngest`
    -   Core SDK. / 核心 SDK。
-   `npm install -D inngest-cli` (optional, can run via npx) / (可选，可通过 npx 运行)

### 2. Inngest Setup / Inngest 设置
#### [NEW] [src/inngest/client.ts](file:///Users/anbanglee/Documents/nodebase2-tutorial/rebuild/src/inngest/client.ts)
-   Initialize Inngest client with App ID.
-   使用 App ID 初始化 Inngest 客户端。

#### [NEW] [src/app/api/inngest/route.ts](file:///Users/anbanglee/Documents/nodebase2-tutorial/rebuild/src/app/api/inngest/route.ts)
-   API Route to serve Inngest functions.
-   用于提供 Inngest 函数的 API 路由。

### 3. Example Workflow / 示例工作流
#### [NEW] [src/inngest/functions/hello-world.ts](file:///Users/anbanglee/Documents/nodebase2-tutorial/rebuild/src/inngest/functions/hello-world.ts)
-   A simple event-triggered function to test the setup.
-   一个简单的事件触发函数，用于测试设置。
#### [NEW] [src/inngest/functions/index.ts](file:///Users/anbanglee/Documents/nodebase2-tutorial/rebuild/src/inngest/functions/index.ts)
-   Export all functions.
-   导出所有函数。

## Verification Plan / 验证计划
### Automated / 自动
-   Trigger the "test/hello.world" event via Inngest Dev Server UI.
-   通过 Inngest 开发服务器 UI 触发 "test/hello.world" 事件。

### Manual / 手动
-   Run `npx inngest-cli@latest dev` and check if it connects to the Next.js app.
-   运行 `npx inngest-cli@latest dev` 并检查它是否连接到 Next.js 应用程序。
