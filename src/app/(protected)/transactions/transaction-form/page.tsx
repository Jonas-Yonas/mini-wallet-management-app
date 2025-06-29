"use client";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import TransactionForm from "@/app/components/transactions/TransactionForm";
import LoadingSpinner from "@/app/components/ui/LoadingSpinner";

export default function NewTransactionPage() {
  const router = useRouter();
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-4">
        <LoadingSpinner size="lg" />
        <p className="text-gray-600">Loading transaction form ...</p>
      </div>
    );
  }

  if (!session) {
    router.push("/login");
    return null;
  }

  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">
          New Transaction
        </h1>
        <button
          onClick={() => router.back()}
          className="text-sm font-medium text-indigo-600 hover:text-indigo-500 cursor-pointer"
        >
          ← Back
        </button>
      </div>

      <TransactionForm />
    </main>
  );
}
