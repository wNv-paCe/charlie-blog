import { Comment } from "../types/post";
import { API_URL } from "./client";
import { getApiError } from "./error";

export async function getComments(postId: number): Promise<Comment[]> {
  const response = await fetch(`${API_URL}/api/posts/${postId}/comments`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw await getApiError(response);
  }

  return response.json();
}

export async function createComment(
  postId: number,
  content: string,
): Promise<Comment> {
  const response = await fetch(`${API_URL}/api/posts/${postId}/comments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ content }),
  });

  if (response.status === 401) {
    throw new Error("You must be logged in to comment");
  }

  if (response.status === 404) {
    throw new Error("Post not found");
  }

  if (!response.ok) {
    throw await getApiError(response);
  }

  return response.json();
}
