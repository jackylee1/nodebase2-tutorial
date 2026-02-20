"use client";

import { authClient } from "@/lib/auth-client";
import { api } from "@/trpc/client";
import { SignOut } from "@/components/auth-components";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
    const router = useRouter();
    const { data: session } = authClient.useSession();
    const utils = api.useUtils();

    const { data: workflows, isLoading } = api.workflow.list.useQuery(undefined, {
        enabled: !!session,
        refetchInterval: 3000, // Poll every 3s for status updates
    });

    const createWorkflow = api.workflow.create.useMutation({
        onSuccess: () => {
            utils.workflow.list.invalidate();
        },
    });

    if (!session) {
        return (
            <div className="container mx-auto py-10 text-center">
                <h1 className="text-2xl font-bold mb-4">Please sign in</h1>
                <Button onClick={() => router.push("/auth-test")}>Go to Sign In</Button>
            </div>
        );
    }

    return (
        <div className="container mx-auto py-10">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold">Dashboard</h1>
                    <p className="text-gray-600">
                        Welcome, {session.user.name} ({session.user.email})
                    </p>
                </div>
                <div className="flex gap-2">
                    <Button
                        onClick={() => createWorkflow.mutate()}
                        disabled={createWorkflow.isPending}
                    >
                        {createWorkflow.isPending ? "Creating..." : "+ New Workflow"}
                    </Button>
                    <SignOut />
                </div>
            </div>

            <div className="border rounded-lg">
                <div className="p-4 border-b bg-gray-50">
                    <h2 className="font-semibold">My Workflows</h2>
                </div>

                {isLoading ? (
                    <div className="p-8 text-center text-gray-500">Loading...</div>
                ) : !workflows?.length ? (
                    <div className="p-8 text-center text-gray-500">
                        No workflows yet. Click &quot;+ New Workflow&quot; to create one.
                    </div>
                ) : (
                    <div className="divide-y">
                        {workflows.map((wf) => (
                            <div key={wf.id} className="p-4 flex items-center justify-between">
                                <div>
                                    <p className="font-mono text-sm text-gray-500">{wf.id}</p>
                                    <p className="text-sm text-gray-400">
                                        Created: {new Date(wf.createdAt).toLocaleString()}
                                    </p>
                                    {wf.result && (
                                        <p className="text-sm text-green-600 mt-1">{wf.result}</p>
                                    )}
                                </div>
                                <span
                                    className={`px-3 py-1 rounded-full text-xs font-medium ${wf.status === "COMPLETED"
                                            ? "bg-green-100 text-green-800"
                                            : wf.status === "FAILED"
                                                ? "bg-red-100 text-red-800"
                                                : "bg-yellow-100 text-yellow-800"
                                        }`}
                                >
                                    {wf.status}
                                </span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
