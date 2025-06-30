"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { LoginFormData, RegisterFormData } from "@/lib/validations/schemas";

export function useAuthForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (formData: LoginFormData) => {
    setIsLoading(true);
    setError("");

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email: formData.email,
        password: formData.password,
      });

      if (result?.error) {
        setError(result.error);
        return false;
      }
      router.push("/dashboard");
      return true;
    } catch (err) {
      setError(`An unexpected error occurred ${err}`);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (formData: RegisterFormData) => {
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          name: formData.name,
        }),
      });

      if (!response.ok) {
        let errorMessage = "Registration failed";

        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
        } catch (e) {
          errorMessage = "Unexpected server response. Please try again.";
          console.log(e);
        }

        setError(errorMessage);
        return false;
      }

      return true;
    } catch (err) {
      setError(`Network error occurred ${err}`);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    handleLogin,
    handleRegister,
    setError,
  };
}
