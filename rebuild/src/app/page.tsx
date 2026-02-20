import Link from "next/link";

export default function Home() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center p-24">
            <h1 className="text-4xl font-bold">Welcome to Nodebase2</h1>
            <p className="mt-4 text-lg text-gray-600">
                Rebuilding from scratch, step by step.
            </p>
            <div className="mt-8 flex gap-4">
                <Link
                    href="/dashboard"
                    className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition"
                >
                    Dashboard
                </Link>
                <Link
                    href="/auth-test"
                    className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                >
                    Auth Test
                </Link>
            </div>
        </div>
    );
}
