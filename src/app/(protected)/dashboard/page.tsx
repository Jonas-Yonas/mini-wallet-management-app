"use client";

import BalanceCard from "@/app/components/dashboard/BalanceCard";
import RecentTransactions from "@/app/components/dashboard/RecentTransactions";
import LoadingSpinner from "@/app/components/ui/LoadingSpinner";
import { useWallet } from "@/hooks/useWallet";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { BsExclamationTriangle } from "react-icons/bs";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const { wallet, isLoading, error } = useWallet();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login");
    }
  }, [status, router]);

  if (!session || status !== "authenticated") {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-4">
        <LoadingSpinner size="lg" />
        <p className="text-gray-600">Checking session ...</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-4">
        <LoadingSpinner size="lg" />
        <p className="text-gray-600">Loading dashboard ...</p>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 p-4">Error: {error.message}</div>;
  }

  if (!wallet) {
    return (
      <div className="p-4 rounded-lg bg-yellow-50 border border-yellow-200">
        <div className="flex">
          <div className="flex-shrink-0">
            <BsExclamationTriangle
              className="h-5 w-5 text-yellow-400"
              aria-hidden="true"
            />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-yellow-800">
              Wallet not found
            </h3>
            <div className="mt-2 text-sm text-yellow-700">
              <p>
                Please check if your wallet is properly set up or contact
                support.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 top-16">
      <h1 className="text-2xl font-semibold text-gray-900">
        Welcome back, {session.user?.name}
      </h1>

      <div className="mt-8 grid grid-cols-1 gap-6">
        <BalanceCard balance={wallet.balance} />
        <RecentTransactions transactions={wallet.transactions} />
      </div>
    </div>
  );
}
