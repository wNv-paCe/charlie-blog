"use client";

import { useState } from "react";
import { createComment } from "@/lib/api/comments";
import { useRouter } from "next/navigation";

type CommentFormProps = {
  postId: number;
  parentId?: number | null;
  onCancel?: () => void;
};

export default function CommentForm({
  postId,
  parentId = null,
  onCancel,
}: CommentFormProps) {
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!content.trim()) {
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      await createComment(postId, {
        content: content.trim(),
        parent_id: parentId,
      });
      setContent("");
      onCancel?.();
      router.refresh();
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Failed to create comment");
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mb-4 flex flex-col gap-3">
      <input
        value={content}
        onChange={(event) => setContent(event.target.value)}
        placeholder={parentId ? "Write a replay..." : "Write a comment..."}
        className="w-full text-sm resize-y border-b border-border p-1 outline-none focus:border-b focus:border-foreground"
        disabled={isSubmitting}
      />

      {error && <p className="text-sm text-danger">{error}</p>}

      <div className="flex justify-end gap-2">
        {parentId !== null && (
          <button
            type="button"
            onClick={onCancel}
            disabled={isSubmitting}
            className="cursor-pointer rounded-md px-3 py-2 text-sm font-medium hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          disabled={isSubmitting || !content.trim()}
          className="cursor-pointer rounded-md border border-border px-3 py-2 text-sm bg-primary text-primary-foreground font-medium transition-opacity hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting ? "Posting..." : parentId ? "Reply" : "Comment"}
        </button>
      </div>
    </form>
  );
}
