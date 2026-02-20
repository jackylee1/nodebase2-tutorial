import { inngest } from "@/inngest/client";
import { prisma } from "@/lib/db";

export const processWorkflow = inngest.createFunction(
    { id: "process-workflow" },
    { event: "workflow/created" },
    async ({ event, step }) => {
        const { workflowId } = event.data;

        // Step 1: Simulate processing
        await step.sleep("simulate-processing", "3s");

        // Step 2: Update workflow status
        await step.run("update-status", async () => {
            await prisma.workflow.update({
                where: { id: workflowId },
                data: {
                    status: "COMPLETED",
                    result: `Workflow ${workflowId} processed successfully at ${new Date().toISOString()}`,
                },
            });
        });

        return { success: true, workflowId };
    }
);
