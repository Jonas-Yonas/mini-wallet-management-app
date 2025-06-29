"use client";

import { useSession } from "next-auth/react";
import useSWRMutation from "swr/mutation";
import { useRouter } from "next/navigation";

type TransactionData = {
  amount: number;
  type: string;
  description?: string;
};

export function useCreateTransaction() {
  const { data: session } = useSession();
  const router = useRouter();

  const fetcher = async (url: string, { arg }: { arg: TransactionData }) => {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.user?.token}`,
      },
      body: JSON.stringify({
        amount: arg.amount,
        type: arg.type,
        /** Description will be included if it exists */
        ...(arg.description ? { description: arg.description } : {}),
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to create transaction");
    }

    return response.json();
  };

  return useSWRMutation("/api/transactions", fetcher, {
    onSuccess: () => {
      router.push("/transactions/history");
    },
  });
}
