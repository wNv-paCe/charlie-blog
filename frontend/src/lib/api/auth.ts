import { LoginResponse } from "../types/auth";
import { UserPrivate } from "../types/user";
import { API_URL } from "./client";
import { getApiError } from "./error";

export async function login(
  email: string,
  password: string,
): Promise<LoginResponse> {
  const response = await fetch(`${API_URL}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    credentials: "include",
    body: new URLSearchParams({
      username: email,
      password,
    }),
  });

  if (!response.ok) {
    throw await getApiError(response);
  }

  return response.json();
}

export async function register(
  username: string,
  email: string,
  password: string,
): Promise<UserPrivate> {
  const response = await fetch(`${API_URL}/api/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      email,
      password,
    }),
  });

  if (!response.ok) {
    throw await getApiError(response);
  }

  return response.json();
}

export async function logout(): Promise<{ message: string }> {
  const response = await fetch(`${API_URL}/api/auth/logout`, {
    method: "POST",
    credentials: "include",
  });

  if (!response.ok) {
    throw await getApiError(response);
  }

  return response.json();
}
