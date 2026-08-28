"use client";

import { useState } from "react";
import { createComment } from "@/lib/api/comments";
import { useRouter } from "next/navigation";

type CommentFormProps = {
  postId: number;
};

export default function CommentForm({ postId }: CommentFormProps) {
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
      await createComment(postId, content.trim());
      setContent("");
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
      <textarea
        value={content}
        onChange={(event) => setContent(event.target.value)}
        placeholder="Write a comment..."
        rows={1}
        className="w-full text-sm resize-y border-b border-border p-1 outline-none focus:border-b focus:border-foreground"
        disabled={isSubmitting}
      />

      {error && <p className="text-sm text-danger">{error}</p>}

      <button
        type="submit"
        disabled={isSubmitting || !content.trim()}
        className="cursor-pointer self-end rounded-md border border-border px-3 py-2 text-sm bg-primary text-primary-foreground font-medium transition-opacity hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isSubmitting ? "Comment..." : "Comment"}
      </button>
    </form>
  );
}
