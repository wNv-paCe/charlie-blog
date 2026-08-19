"use client";

import { useState } from "react";
import { register } from "@/lib/auth";
import { useRouter } from "next/navigation";
import SuccessModal from "@/components/SuccessModal";

export function RegisterForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const router = useRouter();

  async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setIsLoading(true);

    try {
      await register(username, email, password);

      setSuccessMessage("Registration successful!");
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
      <form
        onSubmit={handleSubmit}
        className="space-y-5 bg-card rounded-xl border border-border p-6"
      >
        <h2 className="font-bold text-3xl">Register</h2>
        {/* Username */}
        <div>
          <label htmlFor="username" className="mb-2 block font-medium">
            Username
          </label>

          <input
            id="username"
            name="username"
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            required
            autoComplete="username"
            className="w-full rounded-md border border-border bg-surface px-3 py-2 text-card-foreground outline-none focus:border-primary"
          />
        </div>

        {/* Email */}
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
            autoComplete="email"
            className="w-full rounded-md border border-border bg-surface px-3 py-2 text-card-foreground outline-none focus:border-primary"
          />
        </div>

        {/* Password */}
        <div>
          <label htmlFor="password" className="mb-2 block font-medium">
            Password
          </label>

          <input
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
            autoComplete="new-password"
            className="w-full rounded-md border border-border px-3 py-2 bg-surface text-card-foreground outline-none focus:border-primary"
          />
        </div>

        {/* Confirm Password */}
        <div>
          <label htmlFor="confirm-password" className="mb-2 block font-medium">
            Confirm Password
          </label>

          <input
            id="confirm-password"
            name="confirm-password"
            type="password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            required
            autoComplete="new-password"
            className="w-full rounded-md border border-border px-3 py-2 bg-surface text-card-foreground outline-none focus:border-primary"
          />
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}

        {/* Submit */}
        <button
          type="submit"
          disabled={isLoading}
          className="cursor-pointer rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isLoading ? "Registering..." : "Register"}
        </button>
      </form>

      {successMessage && (
        <SuccessModal
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
