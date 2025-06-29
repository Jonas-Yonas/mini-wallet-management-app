import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const registerSchema = loginSchema.extend({
  name: z.string().min(3, "Name must be at least 3 characters"),
});

export const transactionSchema = z.object({
  type: z.enum(["CASH_IN", "CASH_OUT"]),
  amount: z.number().min(0.01, "Amount must be greater than 0"),
  description: z.string().optional(),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type TransactionFormData = z.infer<typeof transactionSchema>;
