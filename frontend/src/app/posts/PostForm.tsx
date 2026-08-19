"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import InfoModel from "@/components/InfoModal";
import { createPost, updatePost } from "@/lib/api";

type PostFormProps = {
  mode: "create" | "edit";
  postId?: number;
  initialTitle?: string;
  initialContent?: string;
};

export function PostForm({
  mode,
  postId,
  initialTitle = "",
  initialContent = "",
}: PostFormProps) {
  const [createdPostId, setCreatedPostId] = useState<number | null>(null);
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const router = useRouter();
  const isEdit = mode === "edit";

  async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setIsLoading(true);

    try {
      if (isEdit) {
        await updatePost(postId!, {
          title,
          content,
        });
        setSuccessMessage("Post updated successfully!");
      } else {
        const post = await createPost(title, content);

        setCreatedPostId(post.id);
        setSuccessMessage("Post created successfully!");
      }
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

  function handleSuccessConfirm() {
    setSuccessMessage(null);

    if (isEdit) {
      router.push(`/posts/${postId}`);
    } else {
      router.push(`/posts/${createdPostId}`);
    }
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="space-y-5 bg-card rounded-xl border border-border p-6"
      >
        <h2 className="font-bold text-3xl">
          {isEdit ? "Edit Post" : "New Post"}
        </h2>

        {/* Title */}
        <div>
          <label htmlFor="title" className="mb-2 block font-medium">
            Title
          </label>

          <input
            id="title"
            name="title"
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            required
            className="w-full rounded-md border border-border bg-surface px-3 py-2 text-card-foreground outline-none focus:border-primary"
          />
        </div>

        {/* Content */}
        <div>
          <label htmlFor="content" className="mb-2 block font-medium">
            Content
          </label>

          <textarea
            id="content"
            name="content"
            value={content}
            onChange={(event) => setContent(event.target.value)}
            required
            rows={10}
            className="w-full rounded-md border border-border bg-surface px-3 py-2 text-card-foreground outline-none focus:border-primary"
          />
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}

        {/* Submit */}
        <button
          type="submit"
          disabled={isLoading}
          className="cursor-pointer rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isLoading
            ? isEdit
              ? "Saving..."
              : "Publishing..."
            : isEdit
              ? "Save Changes"
              : "Publish"}
        </button>
      </form>

      {successMessage && (
        <InfoModel
          title="Success"
          message={successMessage}
          onConfirm={handleSuccessConfirm}
        />
      )}
    </>
  );
}
