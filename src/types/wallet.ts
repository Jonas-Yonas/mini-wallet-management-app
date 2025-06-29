export interface Transaction {
  id: string;
  amount: number;
  type: "CASH_IN" | "CASH_OUT";
  description: string | null;
  createdAt: Date | string;
  walletId: string;
}

export interface Wallet {
  id: string;
  balance: number;
  userId: string;
  transactions: Transaction[];
  createdAt: Date | string;
  updatedAt: Date | string;
}
