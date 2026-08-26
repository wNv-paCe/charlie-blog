import Sidebar from "@/components/Sidebar";
import { RegisterForm } from "./RegisterForm";
import { getCurrentUser } from "@/lib/auth-server";
import { redirect } from "next/navigation";

export default async function RegisterPage() {
  const user = await getCurrentUser();

  if (user) {
    redirect("/");
  }

  return (
    <div className="mx-auto w-full max-w-6xl">
      <div className="grid h-full grid-cols-1 gap-8 md:grid-cols-[1fr_280px] items-start">
        <RegisterForm />
        <Sidebar />
      </div>
    </div>
  );
}
