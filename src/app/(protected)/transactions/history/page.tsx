"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useWallet } from "@/hooks/useWallet";
import TransactionList from "@/app/components/transactions/TransactionList";
import LoadingSpinner from "@/app/components/ui/LoadingSpinner";

export default function TransactionHistoryPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const { wallet, isLoading, error } = useWallet();

  if (status === "loading") {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-4">
        <LoadingSpinner size="lg" />
        <p className="text-gray-600">Loading your experience ...</p>
      </div>
    );
  }

  if (!session) {
    router.push("/login");
    return null;
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-4">
        <LoadingSpinner size="lg" />
        <p className="text-gray-600">Loading your transactions ...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-md mx-auto bg-white rounded-lg shadow p-6 text-center">
        <p className="text-red-500 mb-4">
          Error: {error.message || "Failed to load transactions"}
        </p>
        <div className="flex gap-3 justify-center">
          <button
            onClick={() => router.refresh()}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Retry
          </button>
          <button
            onClick={() => router.push("/dashboard")}
            className="px-4 py-2 border border-gray-300 rounded-md"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Transaction History</h1>
        <button
          onClick={() => router.push("/transactions/transaction-form")}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 cursor-pointer"
        >
          New Transaction
        </button>
      </div>

      {!wallet?.transactions?.length ? (
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <p className="text-gray-600 mb-4">No transactions found</p>
        </div>
      ) : (
        <TransactionList transactions={wallet.transactions} />
      )}
    </div>
  );
}
