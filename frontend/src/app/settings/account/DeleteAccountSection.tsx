"use client";

import ConfirmModal from "@/components/ConfirmModal";
import { logout } from "@/lib/api/auth";
import { deleteUser } from "@/lib/api/users";
import { AlertTriangle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

type DeleteAccountSectionProps = {
  userId: number;
};

export default function DeleteAccountSection({
  userId,
}: DeleteAccountSectionProps) {
  const router = useRouter();

  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleDeleteAccount() {
    setError("");
    setIsLoading(true);

    try {
      await deleteUser(userId);

      // remove cookie
      await logout();

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
      setShowConfirm(false);
    }
  }

  return (
    <>
      <section className="rounded-lg border border-danger bg-card p-6 shadow-sm transition-shadow hover:shadow-muted/10 hover:shadow-md">
        <div className="flex items-center gap-2">
          <AlertTriangle className="text-danger size={24}" />
          <h2 className="text-xl font-bold text-danger">Danger Zone</h2>
        </div>

        <p className="mt-4 text-sm text-muted">
          Permanently delete your account and all posts. This action cannot be
          undone.
        </p>

        {error && <p className="mt-4 text-sm text-danger">{error}</p>}

        <button
          type="button"
          onClick={() => setShowConfirm(true)}
          disabled={isLoading}
          className="mt-5 cursor-pointer rounded-md bg-danger px-4 py-2 font-medium text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isLoading ? "Deleting..." : "Delete Account"}
        </button>
      </section>

      {showConfirm && (
        <ConfirmModal
          title="Delete Account?"
          message="This action is permanent. All your posts and profile data will be deleted."
          confirmText="Delete Account"
          cancelText="Cancel"
          icon={AlertTriangle}
          onConfirm={handleDeleteAccount}
          onCancel={() => setShowConfirm(false)}
          isLoading={isLoading}
        />
      )}
    </>
  );
}
