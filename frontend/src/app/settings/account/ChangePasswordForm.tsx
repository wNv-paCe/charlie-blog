"use client";

import InfoModal from "@/components/InfoModal";
import { changePassword } from "@/lib/api/users";
import { useState } from "react";

export default function ChangePasswordForm() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  async function handleChangePassword() {
    setError("");

    if (newPassword !== confirmPassword) {
      setError("New passwords do not match");
      return;
    }

    setIsLoading(true);

    try {
      await changePassword({
        current_password: currentPassword,
        new_password: newPassword,
      });

      setSuccessMessage("Password changed successfully!");

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
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
        <h2 className="mb-6 text-xl font-bold">Change Password</h2>

        <div className="space-y-5">
          <div>
            <label
              htmlFor="current-password"
              className="mb-2 block font-medium"
            >
              Current Password
            </label>

            <input
              id="current-password"
              type="password"
              value={currentPassword}
              onChange={(event) => setCurrentPassword(event.target.value)}
              className="w-full rounded-md border border-border bg-surface px-3 py-2 text-card-foreground outline-none focus:border-primary"
            />
          </div>

          <div>
            <label htmlFor="new-password" className="mb-2 block font-medium">
              New Password
            </label>

            <input
              id="new-password"
              type="password"
              value={newPassword}
              onChange={(event) => setNewPassword(event.target.value)}
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
              type="password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              className="w-full rounded-md border border-border bg-surface px-3 py-2 text-card-foreground outline-none focus:border-primary"
            />
          </div>

          {error && <p className="text-sm text-danger">{error}</p>}

          <button
            type="button"
            onClick={handleChangePassword}
            disabled={isLoading}
            className="cursor-pointer rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isLoading ? "Changing..." : "Change Password"}
          </button>
        </div>
      </section>

      {successMessage && (
        <InfoModal
          title="Success"
          message={successMessage}
          onConfirm={() => {
            setSuccessMessage(null);
          }}
        />
      )}
    </>
  );
}
