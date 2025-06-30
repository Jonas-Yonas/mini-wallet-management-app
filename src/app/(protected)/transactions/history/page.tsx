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
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
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
      <div className="flex flex-wrap items-center justify-between gap-3 sm:gap-4 mb-6">
        <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">
          Transaction History
        </h1>

        {/** Desktop-only button */}
        <button
          onClick={() => router.push("/transactions/transaction-form")}
          className="hidden sm:inline-flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-md hover:bg-green-700 transition-all duration-150"
        >
          New Transaction
        </button>

        {/** Mobile-only button */}
        <button
          onClick={() => router.push("/transactions/transaction-form")}
          className="fixed top-20 right-6 sm:hidden bg-green-600 hover:bg-green-700 text-white p-2 rounded-full shadow-lg flex items-center justify-center transition"
          aria-label="New Transaction"
        >
          {/** Plus icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4v16m8-8H4"
            />
          </svg>
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
