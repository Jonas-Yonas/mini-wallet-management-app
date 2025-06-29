import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl text-gray-400 font-medium mb-6">
          Mini Wallet Management App
        </h1>
        <Link
          href="/login"
          className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-lg text-lg"
        >
          Go to Login
        </Link>
      </div>
    </main>
  );
}
