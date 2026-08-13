export type UserPublic = {
  id: number;
  username: string;
  image_file: string | null;
  image_path: string | null;
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

export async function getPosts(
  skip: number,
  limit: number,
): Promise<PaginatedPostsResponse> {
  const response = await fetch(
    `http://localhost:8000/api/posts?skip=${skip}&limit=${limit}`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }

  return response.json();
}
