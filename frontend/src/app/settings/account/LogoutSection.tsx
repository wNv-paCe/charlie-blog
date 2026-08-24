"use client";

import { logout } from "@/lib/api/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LogoutSection() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  async function handleLogout() {
    setError("");

    setIsLoading(true);

    try {
      await logout();

      router.push("/login");
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
  }

  return (
    <section className="rounded-lg border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-muted/10 hover:shadow-md">
      <h2 className="mb-6 text-xl font-bold">Logout</h2>

      <div className="space-y-5">
        {error && <p className="text-sm text-danger">{error}</p>}

        <button
          type="button"
          onClick={handleLogout}
          disabled={isLoading}
          className="cursor-pointer rounded-md bg-muted px-4 py-2 font-medium text-white transition-opacity hover:opacity-90 hover:text-black disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isLoading ? "Logout..." : "Logout"}
        </button>
      </div>
    </section>
  );
}
