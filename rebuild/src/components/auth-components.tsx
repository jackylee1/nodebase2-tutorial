"use client";

import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const signIn = async () => {
        await authClient.signIn.email({
            email,
            password,
        }, {
            onSuccess: () => {
                router.push("/");
                router.refresh();
            },
            onError: (ctx) => {
                alert(ctx.error.message);
            }
        });
    };

    return (
        <div className="grid w-full max-w-sm items-center gap-1.5 p-4 border rounded-lg">
            <Label htmlFor="email">Email</Label>
            <Input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
            />
            <Label htmlFor="password">Password</Label>
            <Input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
            />
            <Button onClick={signIn}>Sign In</Button>
        </div>
    );
}

export function SignUp() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const router = useRouter();

    const signUp = async () => {
        await authClient.signUp.email({
            email,
            password,
            name,
        }, {
            onSuccess: () => {
                router.push("/");
                router.refresh();
            },
            onError: (ctx) => {
                alert(ctx.error.message);
            }
        });
    };

    return (
        <div className="grid w-full max-w-sm items-center gap-1.5 p-4 border rounded-lg mt-4">
            <Label htmlFor="name">Name</Label>
            <Input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
            />
            <Label htmlFor="email">Email</Label>
            <Input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
            />
            <Label htmlFor="password">Password</Label>
            <Input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
            />
            <Button onClick={signUp}>Sign Up</Button>
        </div>
    );
}

export function SignOut() {
    const router = useRouter();
    return (
        <Button
            variant="destructive"
            onClick={async () => {
                await authClient.signOut();
                router.push("/");
                router.refresh();
            }}
        >
            Sign Out
        </Button>
    );
}
