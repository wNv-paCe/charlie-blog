import Link from "next/link";
import { UserPrivate } from "@/lib/api";

type UserActionsProps = {
  user: UserPrivate | null;
  onNavigate?: () => void;
};

export default function UserActions({ user, onNavigate }: UserActionsProps) {
  if (!user) {
    return (
      <div className="flex items-center gap-2">
        <Link
          href="/login"
          onClick={onNavigate}
          className="rounded-md border border-white px-3 py-2 hover:bg-white hover:text-black"
        >
          Login
        </Link>

        <Link
          href="/register"
          onClick={onNavigate}
          className="rounded-md bg-white px-3 py-2 text-black hover:bg-white/85"
        >
          Register
        </Link>
      </div>
    );
  }
  return (
    <div className="flex items-center gap-2">
      <Link
        href="/posts/new"
        onClick={onNavigate}
        className="rounded-md border px-3 py-2"
      >
        New Post
      </Link>

      <Link
        href={`/users/${user.id}`}
        onClick={onNavigate}
        className="rounded-md bg-white text-black px-3 py-2"
      >
        {user.username}
      </Link>
    </div>
  );
}
