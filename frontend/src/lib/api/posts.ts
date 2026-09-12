import { PaginatedPostsResponse, Post } from "../types/post";
import { API_URL } from "./client";
import { getApiError } from "./error";

export async function getPosts(
  skip: number,
  limit: number,
): Promise<PaginatedPostsResponse> {
  const url = `${API_URL}/api/posts?skip=${skip}&limit=${limit}`;
  const response = await fetch(url, {
    cache: "no-store",
  });

  if (!response.ok) {
    const body = await response.text();

    console.error("getPosts failed", {
      url,
      status: response.status,
      statusText: response.statusText,
      body,
    });

    throw new Error(`Failed to fetch posts: ${response.status}`);
  }

  return response.json();
}

export async function getPost(id: number) {
  const response = await fetch(`${API_URL}/api/posts/${id}`, {
    cache: "no-store",
  });

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw await getApiError(response);
  }

  return response.json();
}

export async function createPost(
  title: string,
  content: string,
): Promise<Post> {
  const response = await fetch(`${API_URL}/api/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      title,
      content,
    }),
  });

  if (response.status === 401) {
    throw new Error("You must be logged in to create a post");
  }

  if (!response.ok) {
    throw await getApiError(response);
  }

  return response.json();
}

export async function updatePost(
  postId: number,
  data: { title?: string; content?: string },
): Promise<Post> {
  const response = await fetch(`${API_URL}/api/posts/${postId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });

  if (response.status === 401) {
    throw new Error("You must be logged in to update this post");
  }

  if (response.status === 403) {
    throw new Error("You are not authorized to update this post");
  }

  if (response.status === 404) {
    throw new Error("Post not found");
  }

  if (response.status === 400) {
    throw new Error("Cannot update a deleted comment");
  }

  if (!response.ok) {
    throw await getApiError(response);
  }

  return response.json();
}

export async function deletePost(postId: number): Promise<void> {
  const response = await fetch(`${API_URL}/api/posts/${postId}`, {
    method: "DELETE",
    credentials: "include",
  });

  if (response.status === 401) {
    throw new Error("Your session has expired. Please log in again");
  }

  if (response.status === 403) {
    throw new Error("You are not authorized to delete this post");
  }

  if (response.status === 404) {
    throw new Error("Post not found");
  }

  if (!response.ok) {
    throw await getApiError(response);
  }
}
