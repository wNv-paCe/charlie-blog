import { LoginForm } from "@/components/LoginForm";
import Sidebar from "@/components/Sidebar";

export default function LoginPage() {
  return (
    <div className="mx-auto w-full max-w-6xl">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-[1fr_280px] items-start">
        <LoginForm />
        <Sidebar />
      </div>
    </div>
  );
}
