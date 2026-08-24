"use client";

import InfoModal from "@/components/InfoModal";
import { forgotPassword } from "@/lib/api/auth";
import { useState } from "react";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  async function handleForgotPassword() {
    setError("");

    setIsLoading(true);

    try {
      const result = await forgotPassword(email);

      setSuccessMessage(result.message);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Something went wrong");
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <section className="rounded-lg border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-muted/10 hover:shadow-md">
        <h1 className="mb-6 text-xl font-bold">Forgot Password</h1>

        <div className="space-y-5">
          <p className="text-sm text-muted">
            Enter your email address and we will send you a password reset link.
          </p>

          <div>
            <label htmlFor="email" className="mb-2 block font-medium">
              Email
            </label>

            <input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              className="w-full rounded-md border border-border bg-surface px-3 py-2 text-card-foreground outline-none focus:border-primary"
            />
          </div>

          {error && <p className="text-sm text-danger">{error}</p>}

          <button
            type="button"
            onClick={handleForgotPassword}
            disabled={isLoading || !email}
            className="cursor-pointer rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isLoading ? "Sending..." : "Send Reset Link"}
          </button>
        </div>
      </section>

      {successMessage && (
        <InfoModal
          title="Check Your Email"
          message={successMessage}
          onConfirm={() => {
            setSuccessMessage(null);
          }}
        />
      )}
    </>
  );
}
