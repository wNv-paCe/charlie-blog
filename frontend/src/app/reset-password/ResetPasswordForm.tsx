"use client";

import InfoModal from "@/components/InfoModal";
import { resetPassword } from "@/lib/api/auth";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function ResetPasswordForm() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const router = useRouter();

  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  async function handleResetPassword() {
    setError("");

    if (!token) {
      setError("Invalid or missing reset token");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setIsLoading(true);

    try {
      await resetPassword({
        token,
        new_password: password,
      });

      setSuccessMessage("Password reset successfully. You can now log in.");
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
        <h1 className="mb-6 text-xl font-bold">Reset Password</h1>

        {token ? (
          <div className="space-y-5">
            <div>
              <label htmlFor="new-password" className="mb-2 block font-medium">
                New Password
              </label>

              <input
                id="new-password"
                name="new-password"
                type="password"
                minLength={8}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
                className="w-full rounded-md border border-border bg-surface px-3 py-2 text-card-foreground outline-none focus:border-primary"
              />
            </div>

            <div>
              <label
                htmlFor="confirm-password"
                className="mb-2 block font-medium"
              >
                Confirm Password
              </label>

              <input
                id="confirm-password"
                name="confirm-password"
                type="password"
                minLength={8}
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                required
                className="w-full rounded-md border border-border bg-surface px-3 py-2 text-card-foreground outline-none focus:border-primary"
              />
            </div>

            {error && <p className="text-sm text-danger">{error}</p>}

            <button
              type="button"
              onClick={handleResetPassword}
              disabled={isLoading || !password || !confirmPassword}
              className="cursor-pointer rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isLoading ? "Resetting..." : "Reset Password"}
            </button>
          </div>
        ) : (
          <p className="text-lg text-danger">Invalid or missing reset token.</p>
        )}
      </section>

      {successMessage && (
        <InfoModal
          title="Password Reset"
          message={successMessage}
          onConfirm={() => {
            setSuccessMessage(null);
            router.push("/login");
            router.refresh();
          }}
        />
      )}
    </>
  );
}
