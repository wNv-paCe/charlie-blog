import Sidebar from "@/components/Sidebar";
import { RegisterForm } from "./RegisterForm";
import { getCurrentUser, getSafeNext } from "@/lib/auth-server";
import { redirect } from "next/navigation";

type RegisterPageProps = {
  searchParams: Promise<{
    next?: string;
  }>;
};

export default async function RegisterPage({
  searchParams,
}: RegisterPageProps) {
  const user = await getCurrentUser();

  const { next } = await searchParams;
  const safeNext = getSafeNext(next);

  if (user) {
    redirect("/");
  }

  return (
    <div className="mx-auto w-full max-w-6xl">
      <div className="grid h-full grid-cols-1 gap-8 md:grid-cols-[1fr_280px] items-start">
        <RegisterForm next={safeNext} />
        <Sidebar />
      </div>
    </div>
  );
}
