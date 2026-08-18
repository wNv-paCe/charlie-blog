import Link from "next/link";

type UserActionsProps = {
  onNavigate?: () => void;
};

export default function UserActions({ onNavigate }: UserActionsProps) {
  return (
    <div className="flex items-center gap-2">
      <Link
        href="/login"
        onClick={onNavigate}
        className="rounded-md border px-3 py-2"
      >
        Login
      </Link>

      <Link
        href="/register"
        onClick={onNavigate}
        className="rounded-md bg-white px-3 py-2 text-black"
      >
        Register
      </Link>
    </div>
  );
}
