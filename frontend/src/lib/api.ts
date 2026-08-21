export type UserPublic = {
  id: number;
  username: string;
  image_file: string | null;
  image_path: string | null;
};

export type UserPrivate = {
  id: number;
  username: string;
  image_file: string | null;
  image_path: string | null;
  email: string;
};

export type Post = {
  id: number;
  user_id: number;
  title: string;
  content: string;
  date_posted: string;
  author: UserPublic;
};

export type PaginatedPostsResponse = {
  posts: Post[];
  total: number;
  skip: number;
  limit: number;
  has_more: boolean;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Post API
export async function getPosts(
  skip: number,
  limit: number,
): Promise<PaginatedPostsResponse> {
  const response = await fetch(
    `${API_URL}/api/posts?skip=${skip}&limit=${limit}`,
    {
      cache: "no-store",
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch posts");
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
    throw new Error("Failed to fetch post");
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
    throw new Error("Invalid to create post");
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

  if (!response.ok) {
    throw new Error("Failed to update post");
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
    throw new Error("Failed to delete post");
  }
}

// User API
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
