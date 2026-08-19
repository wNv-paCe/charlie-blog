"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { deletePost } from "@/lib/api";
import ConfirmModal from "@/components/ConfirmModal";
import InfoModal from "@/components/InfoModal";

type PostActionsProps = {
  postId: number;
  userId: number;
};

export default function PostActions({ postId, userId }: PostActionsProps) {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const router = useRouter();

  async function handleDelete() {
    setError("");
    setIsDeleting(true);

    try {
      await deletePost(postId);

      setShowConfirmModal(false);
      setSuccessMessage("Post deleted successfully!");
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Something went wrong");
      }
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <>
      <div className="flex shrink-0 items-center gap-2">
        <Link
          href={`/posts/${postId}/edit`}
          className="rounded-md border border-border px-3 py-1.5 text-sm font-medium hover:bg-muted hover:text-black"
        >
          Edit
        </Link>

        <button
          type="button"
          onClick={() => setShowConfirmModal(true)}
          className="cursor-pointer rounded-md border border-danger px-3 py-1.5 text-sm font-medium text-danger hover:bg-danger hover:text-white"
        >
          Delete
        </button>
      </div>

      {error && <p className="mt-2 text-sm text-danger">{error}</p>}

      {showConfirmModal && (
        <ConfirmModal
          title="Delete Post?"
          message="Are you sure you want to delete this post? This action cannot be undone."
          confirmText={isDeleting ? "Deleting..." : "Delete"}
          cancelText="Cancel"
          onConfirm={handleDelete}
          onCancel={() => {
            if (!isDeleting) {
              setShowConfirmModal(false);
            }
          }}
        />
      )}

      {successMessage && (
        <InfoModal
          title="Success"
          message={successMessage}
          onConfirm={() => {
            setSuccessMessage(null);
            router.push(`/users/${userId}/posts`);
          }}
        />
      )}
    </>
  );
}
