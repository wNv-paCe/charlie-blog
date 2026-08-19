import SessionExpiredModal from "@/components/SessionExpiredModal";
import { LoginForm } from "@/app/login/LoginForm";
import Sidebar from "@/components/Sidebar";

type LoginPageProps = {
  searchParams: Promise<{
    reason?: string;
  }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const { reason } = await searchParams;

  return (
    <div className="mx-auto w-full max-w-6xl">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-[1fr_280px] items-start">
        <LoginForm />
        <SessionExpiredModal show={reason === "session-expired"} />
        <Sidebar />
      </div>
    </div>
  );
}
