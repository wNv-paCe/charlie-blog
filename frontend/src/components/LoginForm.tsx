"use client";

import { useState } from "react";
import { login } from "@/lib/auth";
import { useRouter } from "next/navigation";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  return (
    <form
      onSubmit={async (event) => {
        event.preventDefault();

        setError("");
        setIsLoading(true);

        try {
          await login(email, password);
          router.push("/");
          router.refresh();
        } catch (error) {
          if (error instanceof Error) {
            setError(error.message);
          } else {
            setError("Something went wrong");
          }
        } finally {
          setIsLoading(false);
        }
      }}
      className="space-y-5 bg-card rounded-xl border border-border p-6"
    >
      <h2 className="font-bold text-3xl">Login</h2>
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
          autoComplete="current-password"
          className="w-full rounded-md border border-border px-3 py-2 bg-surface text-card-foreground outline-none focus:border-primary"
        />
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}

      {/* Submit */}
      <button
        type="submit"
        disabled={isLoading}
        className="cursor-pointer rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground transition-opacity hover:opacity-90"
      >
        {isLoading ? "Logging in..." : "Login"}
      </button>
    </form>
  );
}
