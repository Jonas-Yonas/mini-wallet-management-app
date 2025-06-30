import Link from "next/link";

interface Transaction {
  id: string;
  amount: number;
  type: "CASH_IN" | "CASH_OUT";
  description: string | null;
  createdAt: Date | string;
}

interface RecentTransactionsProps {
  transactions: Transaction[];
}

export default function RecentTransactions({
  transactions,
}: RecentTransactionsProps) {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-4">
        Recent Transactions
      </h2>

      <div className="space-y-4">
        {transactions.length === 0 ? (
          <p className="text-sm text-gray-500">No transactions yet</p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {transactions.map((transaction) => (
              <li key={transaction.id} className="py-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div
                      className={`p-3 w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-lg font-semibold shadow-sm ${
                        transaction.type === "CASH_IN"
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {transaction.type === "CASH_IN" ? "+" : "-"}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {transaction.description || "No description"}
                      </p>
                      <p className="text-xs text-gray-500">
                        {new Date(transaction.createdAt).toLocaleDateString(
                          "en-US",
                          {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          }
                        )}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`text-sm font-medium ${
                      transaction.type === "CASH_IN"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {transaction.type === "CASH_IN" ? "+" : "-"}$
                    {transaction.amount.toFixed(2)}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="mt-4">
        <Link
          href="/transactions/history"
          className="text-sm font-medium text-green-600 hover:text-green-500"
        >
          View all transactions →
        </Link>
      </div>
    </div>
  );
}
