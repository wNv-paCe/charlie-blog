import { UserPrivate } from "./api";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

type LoginResponse = {
  message: string;
};

export async function login(
  email: string,
  password: string,
): Promise<LoginResponse> {
  const response = await fetch(`${API_URL}/api/users/token`, {
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
    const data = await response.json();
    if (Array.isArray(data.detail)) {
      throw new Error(
        data.detail.map((error: { msg: string }) => error.msg).join(", "),
      );
    }
    throw new Error(data.detail || "Invalid email or password");
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
    const data = await response.json();
    if (Array.isArray(data.detail)) {
      throw new Error(
        data.detail.map((error: { msg: string }) => error.msg).join(", "),
      );
    }

    throw new Error(data.detail || "Failed to create account");
  }

  return response.json();
}
