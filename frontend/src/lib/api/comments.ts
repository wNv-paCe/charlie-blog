import { Comment, CommentCreate, CommentUpdate } from "../types/post";
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
  data: CommentCreate,
): Promise<Comment> {
  const response = await fetch(`${API_URL}/api/posts/${postId}/comments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
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

export async function updateComment(
  commentId: number,
  data: CommentUpdate,
): Promise<Comment> {
  const response = await fetch(`${API_URL}/api/comments/${commentId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });

  if (response.status === 401) {
    throw new Error("Your session has expired. Please log in again");
  }

  if (response.status === 403) {
    throw new Error("You are not authorized to update this comment");
  }

  if (response.status === 404) {
    throw new Error("Comment not found");
  }

  if (response.status === 400) {
    throw new Error("Cannot update a deleted comment");
  }

  return response.json();
}

export async function deleteComment(commentId: number): Promise<void> {
  const response = await fetch(`${API_URL}/api/comments/${commentId}`, {
    method: "DELETE",
    credentials: "include",
  });

  if (response.status === 401) {
    throw new Error("Your session has expired. Please log in again");
  }

  if (response.status === 403) {
    throw new Error("You are not authorized to delete this comment");
  }

  if (response.status === 404) {
    throw new Error("Comment not found");
  }

  if (!response.ok) {
    throw await getApiError(response);
  }
}
