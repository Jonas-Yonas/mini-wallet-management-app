import { Transaction } from "@/types/wallet";

interface TransactionListProps {
  transactions: Transaction[];
}

export default function TransactionList({
  transactions,
}: TransactionListProps) {
  return (
    <div className="overflow-hidden">
      <ul className="divide-y divide-gray-200">
        {transactions.map((transaction) => (
          <li key={transaction.id} className="py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div
                  className={`p-3 w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-lg font-semibold shadow-sm ${
                    transaction.type === "CASH_IN"
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {transaction.type === "CASH_IN" ? (
                    <span className="font-medium">+</span>
                  ) : (
                    <span className="font-medium">-</span>
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {transaction.description || "No description"}
                  </p>
                  <p className="text-xs text-gray-500">
                    {new Date(transaction.createdAt).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      }
                    )}
                  </p>
                </div>
              </div>
              <p
                className={`text-sm font-medium ${
                  transaction.type === "CASH_IN"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {transaction.type === "CASH_IN" ? "+" : "-"}$
                {transaction.amount.toFixed(2)}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
