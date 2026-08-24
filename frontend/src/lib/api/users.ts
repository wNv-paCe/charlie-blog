import { PaginatedPostsResponse } from "../types/post";
import { UserPrivate, UserPublic } from "../types/user";
import { API_URL } from "./client";
import { getApiError } from "./error";

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
    throw await getApiError(response);
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
    throw await getApiError(response);
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
    throw await getApiError(response);
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
    throw await getApiError(response);
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
    throw await getApiError(response);
  }

  return response.json();
}

export async function deleteUser(userId: number): Promise<void> {
  const response = await fetch(`${API_URL}/api/users/${userId}`, {
    method: "DELETE",
    credentials: "include",
  });

  if (!response.ok) {
    throw await getApiError(response);
  }
}
