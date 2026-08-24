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
