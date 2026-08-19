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

export async function getPosts(
  skip: number,
  limit: number,
): Promise<PaginatedPostsResponse> {
  const response = await fetch(
    `${API_URL}/api/posts?skip=${skip}&limit=${limit}`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }

  return response.json();
}

export async function getPost(id: number) {
  const response = await fetch(`${API_URL}/api/posts/${id}`);

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

export async function getUser(id: number): Promise<UserPublic | null> {
  const response = await fetch(`${API_URL}/api/users/${id}`);

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
  );

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error("Failed to fetch user posts");
  }

  return response.json();
}
