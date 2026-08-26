import Sidebar from "@/components/Sidebar";
import ForgotPasswordForm from "./ForgotPasswordForm";

export default async function ForgotPasswordPage() {
  return (
    <div className="mx-auto max-w-6xl">
      <div className="grid h-full grid-cols-1 gap-8 md:grid-cols-[1fr_280px] items-start">
        <ForgotPasswordForm />
        <Sidebar />
      </div>
    </div>
  );
}
