import { createTRPCRouter } from "./trpc";
import { authRouter } from "./routers/auth";
import { workflowRouter } from "./routers/workflow";

export const appRouter = createTRPCRouter({
    auth: authRouter,
    workflow: workflowRouter,
});

export type AppRouter = typeof appRouter;
