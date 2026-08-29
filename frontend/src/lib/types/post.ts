import { UserPublic } from "./user";

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

export type CommentAuthor = {
  id: number;
  username: string;
  image_path: string | null;
};

export type Comment = {
  id: number;
  content: string;
  created_at: string;
  deleted_at: string | null;
  parent_id: number | null;
  user: CommentAuthor | null;
};

export type CommentCreate = {
  content: string;
  parent_id?: number | null;
};

export type CommentUpdate = {
  content: string;
};
