"use client";

import { useState } from "react";
import { Comment } from "@/lib/types/post";
import { useRouter } from "next/navigation";
import { deleteComment } from "@/lib/api/comments";
import ConfirmModal from "@/components/ConfirmModal";

type CommentActionsProps = {
  comment: Comment;
  onEdit: () => void;
};

export default function CommentActions({
  comment,
  onEdit,
}: CommentActionsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const router = useRouter();

  function handleDeleteClick() {
    setIsOpen(false);
    setShowDeleteConfirm(true);
    setError(null);
  }

  async function handleDeleteConfirm() {
    setIsDeleting(true);
    setError("");

    try {
      await deleteComment(comment.id);
      setShowDeleteConfirm(false);
      router.refresh();
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
      <div className="relative ml-auto">
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="cursor-pointer rounded-md p-1 text-muted hover:bg-surface hover:text-foreground"
          aria-label="Comment actions"
          aria-expanded={isOpen}
        >
          ⋮
        </button>

        {isOpen && (
          <div className="absolute right-0 z-10 mt-1 w-24 rounded-md border border-border bg-card p-1 shadow-md">
            <button
              type="button"
              onClick={onEdit}
              className="w-full cursor-pointer rounded px-2 py-1.5 text-left text-sm hover:bg-hover"
            >
              Edit
            </button>

            <button
              type="button"
              onClick={handleDeleteClick}
              className="w-full cursor-pointer rounded px-2 py-1.5 text-left text-sm text-danger hover:bg-hover"
            >
              Delete
            </button>
          </div>
        )}
      </div>

      {showDeleteConfirm && (
        <ConfirmModal
          title="Delete comment?"
          message="Are you sure you want to delete this comment?"
          onConfirm={handleDeleteConfirm}
          onCancel={() => setShowDeleteConfirm(false)}
          confirmText="Delete"
          cancelText="Cancel"
          isLoading={isDeleting}
        />
      )}

      {error && (
        <p className="fixed bottom-4 left-1/2 z-60 -translate-x-1/2 rounded-md border border-danger bg-card px-4 py-2 text-danger shadow-md">
          {error}
        </p>
      )}
    </>
  );
}
