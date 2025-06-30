"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function BalanceCard({ balance }: { balance: number }) {
  const { data: session } = useSession();
  const [lowBalanceAlert, setLowBalanceAlert] = useState(false);

  useEffect(() => {
    /** Show alert if balance is below $100 - can be configurable elsewhere */
    setLowBalanceAlert(balance < 100);
  }, [balance]);

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-medium text-gray-900">Wallet Balance</h2>
          <p className="mt-2 text-3xl font-bold text-gray-900">
            ${balance.toFixed(2)}
          </p>
          {session?.user?.name && (
            <p className="text-sm text-gray-500">for {session.user.name}</p>
          )}
        </div>
        {lowBalanceAlert && (
          <div className="flex-shrink-0">
            <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
              Low Balance
            </div>
          </div>
        )}
      </div>
      <div className="mt-6">
        <Link
          href="/transactions/transaction-form"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          New Transaction
        </Link>
      </div>
    </div>
  );
}
