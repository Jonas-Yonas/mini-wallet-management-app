"use client";

import useSWR from "swr";
import { useSession } from "next-auth/react";
import { Wallet } from "@/types/wallet";

async function fetchWallet(url: string, userId: string): Promise<Wallet> {
  const controller = new AbortController();
  const timeout = setTimeout(
    () => controller.abort(),
    10000
  ); /** 10 second timeout */

  try {
    const res = await fetch(`${url}?userId=${userId}`, {
      signal: controller.signal,
      credentials: "include",
      cache: "no-store",
    });

    if (!res.ok) throw new Error(await res.text());
    return res.json();
  } finally {
    clearTimeout(timeout);
  }
}

export function useWallet() {
  const { data: session, status } = useSession();

  const { data, error, isLoading, mutate } = useSWR(
    status === "authenticated" && session?.user?.id
      ? ["/api/wallet", session.user.id]
      : null,
    ([url, userId]) => fetchWallet(url, userId),
    {
      revalidateOnFocus: false,
      shouldRetryOnError: true,
      errorRetryCount: 1,
    }
  );

  return {
    wallet: data,
    isLoading,
    error,
    mutate,
    isAuthenticated: status === "authenticated",
  };
}
