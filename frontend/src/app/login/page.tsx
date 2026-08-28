import SessionExpiredModal from "@/components/SessionExpiredModal";
import { LoginForm } from "@/app/login/LoginForm";
import Sidebar from "@/components/Sidebar";
import { getCurrentUser, getSafeNext } from "@/lib/auth-server";
import { redirect } from "next/navigation";

type LoginPageProps = {
  searchParams: Promise<{
    reason?: string;
    next?: string;
  }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const user = await getCurrentUser();

  const { reason, next } = await searchParams;

  const safeNext = getSafeNext(next);

  if (user) {
    redirect("/");
  }

  return (
    <div className="mx-auto w-full max-w-6xl">
      <div className="grid h-full grid-cols-1 gap-8 md:grid-cols-[1fr_280px] items-start">
        <LoginForm next={safeNext} />
        <SessionExpiredModal
          show={reason === "session-expired"}
          next={safeNext}
        />
        <Sidebar />
      </div>
    </div>
  );
}
