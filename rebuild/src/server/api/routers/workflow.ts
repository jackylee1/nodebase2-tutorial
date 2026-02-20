import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { prisma } from "@/lib/db";
import { inngest } from "@/inngest/client";

export const workflowRouter = createTRPCRouter({
    list: protectedProcedure.query(async ({ ctx }) => {
        return prisma.workflow.findMany({
            where: { userId: ctx.session.user.id },
            orderBy: { createdAt: "desc" },
        });
    }),

    getById: protectedProcedure
        .input(z.object({ id: z.string() }))
        .query(async ({ input, ctx }) => {
            return prisma.workflow.findFirst({
                where: { id: input.id, userId: ctx.session.user.id },
            });
        }),

    create: protectedProcedure.mutation(async ({ ctx }) => {
        const workflow = await prisma.workflow.create({
            data: {
                userId: ctx.session.user.id,
                status: "PENDING",
            },
        });

        // Trigger Inngest event
        await inngest.send({
            name: "workflow/created",
            data: { workflowId: workflow.id },
        });

        return workflow;
    }),
});
