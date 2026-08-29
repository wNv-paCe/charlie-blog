"use client";

import { useState } from "react";
import { Comment } from "@/lib/types/post";
import { updateComment } from "@/lib/api/comments";
import { useRouter } from "next/navigation";

type CommentEditFormProps = {
  comment: Comment;
  onCancel: () => void;
  onSaved: () => void;
};

export default function CommentEditForm({
  comment,
  onCancel,
  onSaved,
}: CommentEditFormProps) {
  const [content, setContent] = useState(comment.content);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedContent = content.trim();

    if (!trimmedContent) {
      return;
    }

    setIsSaving(true);
    setError("");

    try {
      await updateComment(comment.id, { content: trimmedContent });

      router.refresh();
      onSaved();
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Something went wrong");
      }
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-1 flex flex-col gap-3">
      <input
        value={content}
        onChange={(event) => setContent(event.target.value)}
        disabled={isSaving}
        className="w-full resize-y border-b border-border bg-background p-2 text-sm outline-none focus:border-foreground"
      />

      {error && <p className="text-sm text-danger">{error}</p>}

      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={onCancel}
          disabled={isSaving}
          className="cursor-pointer rounded-md px-3 py-2 text-sm hover:bg-hover disabled:cursor-not-allowed disabled:opacity-50"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={isSaving || !content.trim()}
          className="cursor-pointer rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSaving ? "Saving..." : "Save"}
        </button>
      </div>
    </form>
  );
}
