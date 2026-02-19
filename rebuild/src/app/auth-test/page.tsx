"use client";

import { SignIn, SignUp, SignOut } from "@/components/auth-components";
import { authClient } from "@/lib/auth-client";
import { api } from "@/trpc/client";

export default function AuthPage() {
    const { data: session } = authClient.useSession();
    const { data: secretMessage } = api.auth.getSecretMessage.useQuery(undefined, {
        enabled: !!session
    });

    return (
        <div className="container mx-auto py-10">
            <h1 className="text-2xl font-bold mb-4">Authentication Test</h1>

            {session ? (
                <div className="space-y-4">
                    <p>Signed in as: {session.user.email} ({session.user.name})</p>
                    <SignOut />

                    <div className="mt-8 p-4 bg-slate-100 rounded">
                        <h2 className="font-bold">tRPC Secret Message:</h2>
                        <p>{secretMessage || "Loading secret..."}</p>
                    </div>
                </div>
            ) : (
                <div className="space-y-8">
                    <div>
                        <h2 className="text-xl font-semibold mb-2">Sign In</h2>
                        <SignIn />
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold mb-2">Sign Up</h2>
                        <SignUp />
                    </div>
                </div>
            )}
        </div>
    );
}
