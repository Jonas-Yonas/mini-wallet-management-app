"use client";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useCreateTransaction } from "@/hooks/useTransaction";
import { BsArrowDownCircle, BsArrowUpCircle } from "react-icons/bs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  TransactionFormData,
  transactionSchema,
} from "@/lib/validations/schemas";

export default function TransactionForm() {
  const { data: session } = useSession();
  const router = useRouter();
  const {
    trigger: createTransaction,
    isMutating: isPending,
    error,
  } = useCreateTransaction();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<TransactionFormData>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      type: "CASH_IN",
      amount: 0,
      description: "",
    },
  });

  const type = watch("type");

  const onSubmit = async (data: TransactionFormData) => {
    try {
      await createTransaction(data);
    } catch (err) {
      /** Error is already handled by SWR */
      console.log(err);
    }
  };

  if (!session) {
    return (
      <div className="bg-white shadow rounded-lg p-6 text-center">
        <p className="text-gray-700 mb-4">
          Please sign in to make transactions
        </p>
        <button
          onClick={() => router.push("/login")}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          Sign In
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white shadow rounded-lg p-6">
      {error && (
        <div className="rounded-md bg-red-50 p-4 mb-4">
          <p className="text-sm text-red-700">{error.message}</p>
        </div>
      )}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/** Transaction type */}
        <div className="mb-4">
          <label
            htmlFor="type"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Transaction Type
            <span className="text-red-500 ml-1">*</span>
          </label>
          <div className="relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500">
                {type === "CASH_IN" ? (
                  <BsArrowDownCircle className="h-5 w-5 text-green-500" />
                ) : (
                  <BsArrowUpCircle className="h-5 w-5 text-red-500" />
                )}
              </span>
            </div>
            <select
              id="type"
              {...register("type")}
              className="block w-full pl-10 pr-20 py-2.5 border border-gray-300 rounded-md 
                focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm
                bg-white hover:border-gray-400 transition-colors duration-200
                appearance-none"
            >
              <option value="CASH_IN">Cash In</option>
              <option value="CASH_OUT">Cash Out</option>
            </select>
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <span
                className={`text-sm ${
                  type === "CASH_IN" ? "text-green-500" : "text-red-500"
                }`}
              >
                {type === "CASH_IN" ? "Deposit" : "Withdrawal"}
              </span>
            </div>
          </div>
          {errors.type && (
            <p className="mt-1 text-sm text-red-600">{errors.type.message}</p>
          )}
          <p className="mt-1 text-xs text-gray-500">
            {type === "CASH_IN"
              ? "Money will be added to your wallet"
              : "Money will be deducted from your wallet"}
          </p>
        </div>

        {/** Amount to be credited or debited */}
        <div className="mb-4">
          <label
            htmlFor="amount"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Amount
            <span className="text-red-500 ml-1">*</span>
          </label>
          <div className="relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500">$</span>
            </div>
            <input
              type="number"
              id="amount"
              {...register("amount", {
                valueAsNumber: true,
                onChange: (e) => {
                  /** Prevent negative values */
                  const value = Math.max(0, parseFloat(e.target.value)) || 0;
                  setValue("amount", value);
                },
              })}
              onBlur={(e) => {
                /** Format to 2 decimal places on blur */
                if (e.target.value) {
                  setValue(
                    "amount",
                    parseFloat(parseFloat(e.target.value).toFixed(2))
                  );
                }
              }}
              className="block w-full pl-7 pr-12 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="0.00"
              step="0.01"
              min="0"
              inputMode="decimal"
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <span className="text-gray-500 text-sm">USD</span>
            </div>
          </div>
          {errors.amount && (
            <p className="mt-1 text-sm text-red-600">{errors.amount.message}</p>
          )}
          {watch("amount") > 0 && (
            <p className="mt-1 text-xs text-gray-500">
              {type === "CASH_IN" ? "Deposit" : "Withdrawal"} amount
            </p>
          )}
        </div>

        {/** Description */}
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            id="description"
            {...register("description")}
            rows={3}
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md min-h-28 p-2"
            placeholder="Description (optional)"
          />
        </div>

        {/** Action buttons */}
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => router.back()}
            className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isPending}
            className={`inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer ${
              isPending ? "opacity-75 cursor-not-allowed" : ""
            }`}
          >
            {isPending ? "Processing..." : "Submit Transaction"}
          </button>
        </div>
      </form>
    </div>
  );
}
