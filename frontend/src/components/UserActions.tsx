import Link from "next/link";
import { UserPrivate } from "@/lib/types/user";

type UserActionsProps = {
  user: UserPrivate | null;
  onNavigate?: () => void;
  currentPath: string;
};

export default function UserActions({
  user,
  onNavigate,
  currentPath,
}: UserActionsProps) {
  if (!user) {
    return (
      <div className="flex items-center gap-2">
        <Link
          href={`/login?next=${encodeURIComponent(currentPath)}`}
          onClick={onNavigate}
          className="rounded-md border border-white px-3 py-2 hover:bg-white hover:text-black"
        >
          Login
        </Link>

        <Link
          href={`/register?next=${encodeURIComponent(currentPath)}`}
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
        href="/settings/account"
        onClick={onNavigate}
        className="rounded-md bg-white text-black px-3 py-2"
      >
        {user.username}
      </Link>
    </div>
  );
}
