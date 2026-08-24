import { PaginatedPostsResponse } from "../types/post";
import { UserPrivate, UserPublic } from "../types/user";
import { API_URL } from "./client";

export async function changePassword(data: {
  current_password: string;
  new_password: string;
}): Promise<{ message: string }> {
  const response = await fetch(`${API_URL}/api/users/me/password`, {
    method: "PATCH",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const data = await response.json();
    if (Array.isArray(data.detail)) {
      throw new Error(
        data.detail.map((error: { msg: string }) => error.msg).join(", "),
      );
    }

    throw new Error(data.detail || "Failed to change password");
  }

  return response.json();
}

export async function getUser(id: number): Promise<UserPublic | null> {
  const response = await fetch(`${API_URL}/api/users/${id}`, {
    cache: "no-cache",
  });

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error("Failed to fetch user");
  }

  return response.json();
}

export async function getUserPosts(
  id: number,
  skip: number,
  limit: number,
): Promise<PaginatedPostsResponse | null> {
  const response = await fetch(
    `${API_URL}/api/users/${id}/posts?skip=${skip}&limit=${limit}`,
    { cache: "no-cache" },
  );

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error("Failed to fetch user posts");
  }

  return response.json();
}

export async function updateUser(
  userId: number,
  data: { username: string; email: string },
): Promise<UserPrivate> {
  const response = await fetch(`${API_URL}/api/users/${userId}`, {
    method: "PATCH",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
    cache: "no-cache",
  });

  if (!response.ok) {
    const errorData = await response.json();

    throw new Error(errorData.detail || "Failed to update user");
  }

  return response.json();
}

export async function uploadProfilePicture(
  userId: number,
  file: File,
): Promise<UserPrivate> {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${API_URL}/api/users/${userId}/picture`, {
    method: "PATCH",
    credentials: "include",
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json();

    throw new Error(errorData.detail || "Failed to upload profile picture");
  }

  return response.json();
}
