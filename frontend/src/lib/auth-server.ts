import { cookies } from "next/headers";
import { UserPrivate } from "./api";
import { redirect } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getCurrentUser(): Promise<UserPrivate | null> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token");

  if (!accessToken) {
    return null;
  }

  const response = await fetch(`${API_URL}/api/users/me`, {
    headers: {
      Cookie: `access_token=${accessToken.value}`,
    },
    cache: "no-store",
  });

  if (response.status === 401) {
    return null;
  }

  if (!response.ok) {
    throw new Error("Failed to fetch current user");
  }

  return response.json();
}

export async function requireCurrentUser(next?: string): Promise<UserPrivate> {
  const user = await getCurrentUser();

  if (!user) {
    const loginUrl = next
      ? `/login?reason=session-expired&next=${encodeURIComponent(next)}`
      : "/login?reason=session-expired";

    redirect(loginUrl);
  }

  return user;
}
